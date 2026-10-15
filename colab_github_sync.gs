/**
 * Selected Google Colab notebooks -> public GitHub repository
 * Publishes only shortcuts placed in the designated Google Drive folder.
 * Never alters source notebooks. Automated secret checks are not exhaustive.
 */
const SYNC_CONFIG = Object.freeze({
  driveFolderId: '10VjsyjdPnKEdJYbntobmc75RCag6gFd9',
  githubOwner: 'Biologist1',
  githubRepository: 'colab-research-notebooks',
  githubBranch: 'main',
  githubFolder: 'notebooks',
  maxNotebookBytes: 2500000
});

/** Run this ONCE after the first manual test and storing GITHUB_TOKEN. */
function installAutomaticSync() {
  const token = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');
  if (!token) throw new Error('Set Script Property GITHUB_TOKEN first.');
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'syncSelectedNotebooks')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('syncSelectedNotebooks').timeBased().everyMinutes(15).create();
  console.log('Automated synchronization enabled (every ~15 min).');
}

/** Runs manually or via a time-based Apps Script trigger. */
function syncSelectedNotebooks() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try {
    const props = PropertiesService.getScriptProperties();
    const token = props.getProperty('GITHUB_TOKEN');
    if (!token) throw new Error('Missing GITHUB_TOKEN in Script Properties');
    const files = DriveApp.getFolderById(SYNC_CONFIG.driveFolderId).getFiles();
    let uploaded = 0, unchanged = 0, ignored = 0, blocked = 0;
    while (files.hasNext()) {
      const shortcut = files.next();
      if (shortcut.getMimeType() !== 'application/vnd.google-apps.shortcut') {
        ignored++;
        continue;
      }
      let notebookName = shortcut.getName();
      try {
        const id = shortcut.getTargetId();
        if (!id) throw new Error('Missing shortcut target.');
        const resourceKey = shortcut.getTargetResourceKey();
        const file = resourceKey
          ? DriveApp.getFileByIdAndResourceKey(id, resourceKey)
          : DriveApp.getFileById(id);
        notebookName = file.getName();
        if (file.getMimeType() !== 'application/vnd.google.colaboratory' &&
            !notebookName.toLowerCase().endsWith('.ipynb')) {
          throw new Error('Not a Colab / Jupyter notebook.');
        }
        const destName = safeFileName(notebookName, file.getId());
        const path = SYNC_CONFIG.githubFolder + '/' + destName;
        const cleaned = sanitizeNotebook(file.getBlob().getDataAsString('UTF-8'));
        const fingerprint = sha256(path + '\n' + cleaned);
        const key = 'SYNC_HASH_' + id;
        if (props.getProperty(key) === fingerprint) { unchanged++; continue; }
        uploadToGitHub(token, path, cleaned);
        props.setProperty(key, fingerprint);
        uploaded++;
        console.log('Published: ' + destName);
      } catch (e) {
        blocked++;
        console.error('Skipped: ' + notebookName + ': ' + String(e.message || e));
      }
    }
    console.log(JSON.stringify({uploaded, unchanged, ignored, blocked}));
    if (blocked) throw new Error('Some notebooks were blocked: ' + blocked);
  } finally {
    lock.releaseLock();
  }
}

function sanitizeNotebook(raw) {
  if (raw.length > 18000000) throw new Error('Notebook exceeds size limit.');
  let nb;
  try { nb = JSON.parse(raw); }
  catch (_) { throw new Error('Notebook is not valid JSON.'); }
  if (!nb || nb.nbformat !== 4 || !Array.isArray(nb.cells)) {
    throw new Error('Unsupported notebook format.');
  }
  const cells = nb.cells.map(cell => {
    if (!['code', 'markdown', 'raw'].includes(cell.cell_type)) {
      throw new Error('Unsupported cell type.');
    }
    const text = Array.isArray(cell.source) ?
      cell.source.join('') : String(cell.source || '');
    checkForSecrets(text);
    const cleanCell = {
      cell_type: cell.cell_type,
      metadata: {},
      source: text.split(/(?<=\n)/)
    };
    if (typeof cell.id === 'string') cleanCell.id = cell.id;
    if (cell.cell_type === 'code') {
      cleanCell.execution_count = null;
      cleanCell.outputs = [];
    }
    return cleanCell;
  });
  const clean = {
    cells: cells,
    metadata: {
      kernelspec: {display_name: 'Python 3', language: 'python', name: 'python3'},
      language_info: {name: 'python'}
    },
    nbformat: 4, nbformat_minor: 5
  };
  const result = JSON.stringify(clean, null, 2) + '\n';
  if (Utilities.newBlob(result).getBytes().length > SYNC_CONFIG.maxNotebookBytes) {
    throw new Error('Cleaned notebook is too large.');
  }
  return result;
}

function checkForSecrets(source) {
  const tests = [
    /\b(?:github_pat_|gh[pousr]_[A-Za-z0-9_]{20,}|sk-(?:proj-)?[A-Za-z0-9_-]{20,}|AIza[0-9A-Za-z_-]{25,}|AKIA[0-9A-Z]{16})/i,
    /-----BEGIN\s+(?:RSA\s+|EC\s+|OPENSSH\s+)?PRIVATE KEY-----/i,
    /\b(?:api[_-]?key|password|passwd|access[_-]?token|secret[_-]?key|client[_-]?secret|authorization)\b\s*[:=]\s*['"][^'"\n]{8,}['"]/i,
    /\b[A-Z0-9_]*(?:API_KEY|TOKEN|SECRET|PASSWORD)\s*=\s*[A-Za-z0-9_\-]{12,}\b/,
    /data:image\/[a-zA-Z0-9.+-]+;base64,/i
  ];
  for (const test of tests) {
    if (test.test(source)) throw new Error('Potential secret or embedded image detected.');
  }
}

function safeFileName(name, id) {
  const stem = String(name).replace(/\.ipynb$/i, '')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^[.-]+|[.-]+$/g, '').slice(0, 80) || 'notebook';
  return stem + '-' + id.slice(0, 8) + '.ipynb';
}

function sha256(s) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, s);
  return bytes.map(b => ('0' + (b & 255).toString(16)).slice(-2)).join('');
}

function uploadToGitHub(token, path, content) {
  const url = 'https://api.github.com/repos/' +
    encodeURIComponent(SYNC_CONFIG.githubOwner) + '/' +
    encodeURIComponent(SYNC_CONFIG.githubRepository) +
    '/contents/' + path.split('/').map(encodeURIComponent).join('/');
  const headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'ColabSelectiveSync'
  };
  const previous = UrlFetchApp.fetch(url + '?ref=' +
    encodeURIComponent(SYNC_CONFIG.githubBranch), {
      method: 'get', headers: headers, muteHttpExceptions: true
    });
  const status = previous.getResponseCode();
  if (status !== 200 && status !== 404) {
    throw new Error('GitHub GET failed (HTTP ' + status + ').');
  }
  const payload = {
    message: 'Sync selected Colab notebook: ' + path.split('/').pop(),
    content: Utilities.base64Encode(Utilities.newBlob(content).getBytes()),
    branch: SYNC_CONFIG.githubBranch
  };
  if (status === 200) {
    const current = JSON.parse(previous.getContentText());
    if (!current.sha) throw new Error('Existing GitHub file SHA missing.');
    payload.sha = current.sha;
  }
  const response = UrlFetchApp.fetch(url, {
    method: 'put', headers: headers,
    contentType: 'application/json',
    payload: JSON.stringify(payload), muteHttpExceptions: true
  });
  if (![200, 201].includes(response.getResponseCode())) {
    throw new Error('GitHub PUT failed (HTTP ' + response.getResponseCode() + ').');
  }
}

# Colab Research Notebooks

This public repository is for **selected, reviewed Google Colab notebooks** belonging to [Dr. Gülsüm Meço](https://github.com/Biologist1). It supports a reproducible research portfolio in AI-supported education, computer vision, image segmentation and educational technology.

**Status:** Repository configured. Automated synchronization requires a one-time authorization in Google Apps Script and a repository-scoped GitHub token. No private research notebooks have been published as part of this setup.

## Selective synchronization

- **Source:** your private Google Drive staging folder (`GitHub_Yayinlanacak_Notebooklar`), whose ID is stored only in your Apps Script Properties.
- **Selection:** add **Drive shortcuts**, not copies or originals, for notebooks you explicitly choose to publish.
- **Destination:** `notebooks/` in this repository.
- **Cadence:** approximately every 15 minutes, after a one-time Apps Script trigger is installed.
- **Sanitization:** notebook execution outputs and nonessential metadata are removed; basic secret patterns are checked before upload. **Automated checks cannot guarantee privacy or confidentiality.**

**Important:** Verify that a notebook is suitable for public distribution *before* adding its shortcut. GitHub history retains prior versions of published content. Removing a shortcut does not remove previously published versions.

## Finish setting up

See [KURULUM.md](KURULUM.md) and copy [colab_github_sync.gs](colab_github_sync.gs) into a Google Apps Script project.

## Other profiles

- [GitHub academic profile](https://github.com/Biologist1)
- [Kaggle](https://www.kaggle.com/glsmmeo)


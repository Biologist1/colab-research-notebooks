# Colab → GitHub: Güvenli otomatik eşitleme kurulumu

**GitHub:** [Biologist1/colab-research-notebooks](https://github.com/Biologist1/colab-research-notebooks) (herkese açık)  
**Seçim klasörü:** [GitHub_Yayinlanacak_Notebooklar](https://drive.google.com/drive/folders/10VjsyjdPnKEdJYbntobmc75RCag6gFd9) (Google Drive, özel)  
**Script:** [colab_github_sync.gs](colab_github_sync.gs)

## A. GitHub erişim anahtarını oluştur (tek seferlik)

1. [Fine-grained Personal Access Token oluştur](https://github.com/settings/personal-access-tokens/new).
2. **Resource owner:** `Biologist1`.
3. **Repository access:** `Only select repositories` → `colab-research-notebooks`.
4. **Repository permissions:** `Contents: Read and write`; diğer izinleri açma.
5. Son kullanma tarihi seçerek token oluştur. Süresi dolduğunda yenilemen gerekecek.
6. Token'ı **ChatGPT sohbetine, GitHub deposuna, notebook'lara, paylaşılan dosyalara veya ekran görüntüsüne koyma**.

## B. Google Apps Script'i kur

1. [Yeni Apps Script projesi aç](https://script.google.com/home/projects/create).
2. Proje adı: `Selected Colab to GitHub`.
3. Depodaki [colab_github_sync.gs](colab_github_sync.gs) dosyasının tamamını aç, kopyala ve Apps Script'teki `Code.gs` dosyasına yapıştır.
4. Kaydet.
5. Solda **Project Settings / Proje Ayarları** (dişli) → **Script properties / Komut dosyası özellikleri** → **Add script property**.
6. **Property / Özellik:** `GITHUB_TOKEN`; **Value / Değer:** GitHub'dan oluşturduğun token. Kaydet. Token'ı kodun içine ekleme.
7. Üstteki fonksiyon menüsünden `syncSelectedNotebooks` seç ve **Run / Çalıştır** de. Google izin ekranı gelirse yalnızca bu projenin ihtiyaç duyduğu Drive, GitHub bağlantısı (dış istek) ve komut dosyası izinlerini onayla.
8. Drive seçim klasörü boşken testte `uploaded: 0`, `blocked: 0` beklenir; GitHub'a notebook aktarılmaz.
9. Ardından `installAutomaticSync` fonksiyonunu **bir kez** çalıştır. Bu, yaklaşık **15 dakikada bir** eşitleme tetikleyicisi kurar. İlk izin ve test tamamlanmadan otomatik aktarım etkin değildir.

## C. Sadece yayımlamak istediklerini seç

1. [Colab Notebooks klasörüne](https://drive.google.com/drive/folders/1sX1GZ_ryr1mRRAKyBWLvelufnFB2202u) gir.
2. Yayımlamak istediğin notebook'a **sağ tık → Düzenle/Organize → Kısayol ekle (Add shortcut)**.
3. Kısayolu **GitHub_Yayinlanacak_Notebooklar** klasörüne yerleştir.
4. **Önemli:** Orijinal notebook'u **taşıma**, ayrı kopya yapma. Kısayol, orijinal dosyadaki sonraki değişikliklerin izlenmesini sağlar.
5. Önce notebook'u elle gözden geçir. İçinde şifre, API anahtarı, e-posta/isim gibi özel bilgiler, gizli araştırma verileri, yayın öncesi sonuçlar veya lisans kısıtlı içerik bulunmamalı.
6. `syncSelectedNotebooks` fonksiyonunu tekrar çalıştır veya 15 dakikalık kontrolü bekle. Dosyalar GitHub'da `notebooks/` altında görünür.
7. Kaynak notebook daha sonra değişince temizlenmiş kodun yeni sürümü GitHub'a gönderilir.

## Güvenlik ve sınırlar

- Yalnızca seçim klasöründeki **Drive kısayolları** işlenir; aynı klasördeki diğer dosyalar yok sayılır.
- Kaynak notebook'a dokunulmaz.
- Kod ve Markdown hücreleri korunur; çalıştırma çıktıları, hücre ekleri ve birçok üstveri GitHub'a gönderilmez.
- Kodda bazı token ve parola kalıpları taranır. **Bu güvenlik taraması kusursuz değildir.** Herkese açık yayımdan önce manuel kontrol zorunludur.
- Notebook çok büyükse otomatik engellenebilir.
- Kısayolu silmek GitHub'a daha önce aktarılan dosyayı veya commit geçmişini **silmez**. Gerekirse herkese açıklığı değiştir ve gerekiyorsa Git geçmişinden hassas içeriği temizle.
- Zamanlama anlık değil, yaklaşık 15 dakikadır.
- Token süresi dolarsa veya GitHub erişimi geri alınırsa eşitleme durur.
- Apps Script ilk kez Google izinlerini senin oturumunda gerektirir. **Şifreni/token'ını asla sohbet üzerinden paylaşma.**

## Kontrol

- Apps Script → **Executions / Yürütmeler**: hata günlükleri.
- GitHub → [notebooks/](https://github.com/Biologist1/colab-research-notebooks/tree/main/notebooks) (ilk aktarım olana dek mevcut olmayabilir).
- GitHub `401/403`: token süresi veya izinlerini kontrol et.
- Hata `Potential secret`: notebook kodunu incele; otomatik yayımlanmaz.
- Hata `Invalid notebook`: Colab dosyasının içerik biçimi kontrol edilmeli.

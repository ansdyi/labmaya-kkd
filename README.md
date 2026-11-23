# Lab Maya RPL – SMK TEXAR Klari Karawang
Media pembelajaran interaktif (HTML + CSS + JavaScript murni). Tanpa backend, tanpa API, tanpa internet.

## Cara menjalankan
1. Ekstrak ZIP, lalu klik dua kali `index.html` (Chrome, Edge, atau Firefox terbaru).
2. Alternatif (disarankan untuk penyimpanan progres yang stabil): buka terminal di folder ini, jalankan `python -m http.server 8000`, lalu buka `http://localhost:8000`.
3. Di HP/tablet: salin folder ke perangkat atau unggah ke GitHub Pages (lihat bawah). Gunakan mode lanskap.

## Mengunggah ke GitHub Pages (gratis)
1. Buat repositori publik baru di GitHub.
2. Unggah seluruh isi folder ini (`index.html`, `css`, `js`, `assets`) ke cabang `main`.
3. Settings > Pages > Source: Deploy from a branch > `main` / root > Save.
4. Tunggu 1–2 menit; alamat situs muncul di halaman Pages.

## Layar penuh dan HP
- Tombol "Layar Penuh" ada di halaman awal dan di panel suara (ikon ⛶) pada semua halaman. Setelah aktif, layar penuh tetap berlaku di semua halaman.
- Di HP (Android/Chrome) ketukan pertama otomatis meminta layar penuh dan mengunci mode lanskap. Jika HP dalam posisi tegak, muncul pesan agar HP diputar.
- iPhone tidak mendukung layar penuh dari halaman web: buka situs di Safari, ketuk Bagikan > Tambah ke Layar Utama, lalu buka dari ikon (mode layar penuh lewat `manifest.json`).
- Situs bisa dibuka di laptop maupun HP dari alamat GitHub Pages yang sama.

## Alur halaman
Splash (3 detik) > Halaman Awal > Panduan > Peta Aktivitas > Hardware, Software, Klasifikasi, Simulasi Memilih Alat, Simulasi Merakit Komputer, Evaluasi > Hasil > Rangkuman. Semua halaman memakai gambar mockup 1440x900 (`assets/bg/`).

## Struktur
- `index.html` – kerangka halaman.
- `css/style.css` – seluruh tampilan.
- `js/data.js` – **konten yang mudah diedit guru** (aktivitas, narasi, jalur file audio, logo, gambar karakter).
- `js/explore.js` – isi hardware/software (`DATA.hardware`, `DATA.software`).
- `js/classify.js` – 10 kartu klasifikasi (`DATA.classify`).
- `js/simulate.js` – 4 skenario dan kunci jawaban (`DATA.sim`: `need` wajib, `ok` pelengkap).
- `js/quiz.js` – 10 soal kuis (`DATA.quiz`) dan halaman Penutup.
- `js/audio.js`, `js/extras.js` – sistem suara dan narasi.
- `js/app.js` – navigasi, panel suara, dan inisialisasi.
- Urutan `<script>` di `index.html` jangan diubah.

## Audio dan suara pemandu
- Narasi memakai rekaman manusia di `assets/audio/` dan diputar otomatis saat halaman dibuka: `vo-home.mp3` (halaman awal), `vo-guide.mp3` (panduan), `vo-menu.mp3` (peta aktivitas), `vo-hardware.mp3`, `vo-software.mp3`, `vo-classify.mp3`, `vo-simulate.mp3`, `vo-result.mp3` (hasil evaluasi, dari 11.mp3), `vo-assemble.mp3` (simulasi merakit komputer), `vo-summary.mp3` (rangkuman). Halaman kuis belum punya rekaman; tambahkan `quiz:"assets/audio/vo-quiz.mp3"` di `DATA.audioFiles.voice` bila ingin.
- Ganti rekaman dengan menimpa file bernama sama. Jalur file diatur di `DATA.audioFiles.voice` pada `js/data.js`.
- Suara sintetis perangkat TIDAK dipakai (nonaktif). Untuk menyalakan sebagai cadangan, ubah `ttsOn:false` menjadi `true` di `js/audio.js`.
- Layar sambutan: browser memblokir suara otomatis, jadi pengguna mengetuk layar sekali untuk memulai musik dan suara sambutan.
- Musik latar memakai `assets/audio/bgm.mp3` (potongan 4 menit pertama dari Backsound_Jazz.mp3 milik Anda; file asli 63 menit/151 MB terlalu besar untuk GitHub). Untuk bagian lain dari rekaman, potong dengan ffmpeg: `ffmpeg -ss MULAI -t 240 -i Backsound_Jazz.mp3 -ac 2 -ar 32000 -b:a 64k bgm.mp3`.
- Kunci SFX yang dikenali: `hover, click, pop, drop, whoosh, good, bad, win`.

## Gambar karakter
Latar halaman adalah gambar mockup (`assets/bg/`) dengan area klik di atasnya. Karakter dipotong dari mockup (`assets/chars/`, WebP transparan) dan digerakkan halus sendiri tanpa mengganggu komponen lain. Logo asli sudah terpasang.

## Progres
Tersimpan di localStorage browser (per perangkat). Tombol "Ulangi dari Awal" di halaman Penutup menghapus progres.

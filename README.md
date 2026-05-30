# InstaCheck · Vol. 01

> *Cek pertemanan Instagram dengan presisi.*  
> Alat web ringan untuk mencari tahu siapa yang tidak berteman balik di Instagram —  
> aman, privat, dan diproses sepenuhnya di perangkat Anda.

<p align="center">
  <img src="https://img.shields.io/badge/HTML-Living%20Standard%202026-efe7d2?style=flat&logo=html5&logoColor=15140f&labelColor=efe7d2&color=ed6f5c" alt="HTML Living Standard 2026">
  <img src="https://img.shields.io/badge/CSS-Snapshot%202026-efe7d2?style=flat&logo=css3&logoColor=15140f&labelColor=efe7d2&color=ed6f5c" alt="CSS Snapshot 2026">
  <img src="https://img.shields.io/badge/JS-ECMAScript%202026-efe7d2?style=flat&logo=javascript&logoColor=15140f&labelColor=efe7d2&color=ed6f5c" alt="ECMAScript 2026">
  <img src="https://img.shields.io/badge/Design-Atelier%20Zero-efe7d2?style=flat&labelColor=efe7d2&color=15140f" alt="Design System: Atelier Zero">
  <img src="https://img.shields.io/badge/Privacy-First-efe7d2?style=flat&labelColor=efe7d2&color=10b981" alt="Privacy First">
  <img src="https://img.shields.io/github/license/faizabdillahh/instacheck?style=flat&labelColor=efe7d2&color=15140f" alt="License MIT">
  <img src="https://img.shields.io/github/stars/faizabdillahh/instacheck?style=flat&labelColor=efe7d2&color=ed6f5c" alt="GitHub stars">
</p>

---

## Daftar Isi

1. [Tentang](#tentang)
2. [Fitur](#fitur)
3. [Mengapa InstaCheck?](#mengapa-instacheck)
4. [Cara Kerja & Privasi](#cara-kerja--privasi)
5. [Memulai](#memulai)
6. [Panduan Pengguna](#panduan-pengguna)
7. [Teknologi & Desain](#teknologi--desain)
8. [Pengembangan](#pengembangan)
9. [Berkontribusi](#berkontribusi)
10. [Lisensi](#lisensi)
11. [Penghargaan](#penghargaan)

---

## Tentang

**InstaCheck** adalah sebuah *single‑page tool* yang membantu Anda mengaudit daftar pertemanan Instagram.  
Ia membandingkan daftar **pengikut** dan **yang diikuti** dari arsip data Instagram resmi, lalu menampilkan:

- Akun yang **Anda ikuti** tetapi **tidak mengikuti balik**.
- Akun yang **mengikuti Anda** tetapi **tidak Anda ikuti balik**.

Semua pemrosesan terjadi di **browser Anda sendiri** — tidak ada data yang dikirim ke server mana pun.  
Antarmukanya dibangun dengan pendekatan editorial ala majalah cetak berkualitas tinggi, membuat pengalaman mengecek pertemanan terasa seperti membaca katalog museum.


---

## Fitur

- **Analisis dua arah** – tahu siapa yang tidak follow‑back, dan siapa yang belum Anda follow‑back.
- **Privasi mutlak** – file JSON dari Instagram diproses secara lokal, tidak pernah meninggalkan perangkat.
- **Antarmuka editorial** – desain *Atelier Zero*: kertas hangat, aksen coral, angka Romawi, dan animasi yang halus.
- **Responsif penuh** – dioptimalkan untuk perangkat mobile, tablet, dan desktop.
- **Ekspor hasil** – simpan daftar temuan sebagai file `.txt` dengan satu klik.
- **Panduan langkah‑demi‑langkah** – mencakup prosedur terbaru (Mei 2026) melalui **Pusat Akun** Instagram.
- **Tanpa ketergantungan** – murni HTML, CSS, dan JavaScript. Tidak perlu framework atau build tools.

---

## Mengapa InstaCheck?

Alat serupa sering kali meminta Anda untuk login atau memberikan akses API, sehingga berisiko terhadap privasi.  
InstaCheck mengambil jalur berbeda:

- Anda **mengunduh sendiri** arsip data dari Instagram (format JSON resmi).
- Anda **menyeret & melepas** file tersebut ke halaman ini.
- Browser Anda menghitung perbedaan dalam hitungan milidetik.
- Hasil langsung ditampilkan — dan Anda bisa mengekspornya.

Tidak ada pelacakan, tidak ada iklan, tidak ada pengumpulan data. Hanya kode terbuka yang bisa Anda periksa sendiri.

---

## Cara Kerja & Privasi

```text
 [Instagram] → [Unduhan ZIP] → [Ekstrak JSON] → [InstaCheck (lokal)] → [Hasil]
```

1. Instagram menyediakan riwayat pengikut / mengikuti dalam file JSON.
2. Anda mengunggah dua file (`followers_1.json` dan `following.json`).
3. Skrip di browser mengekstrak nama pengguna dan melakukan operasi *set difference*.
4. Hasilnya ditampilkan di layar, dan Anda dapat mengekspornya sebagai teks.

**Data Anda tidak pernah dikirim ke server, disimpan di cloud, atau dibagikan kepada pihak ketiga.**  
Kode sumber tersedia untuk diaudit siapa pun.

---

## Memulai

### Prasyarat

- Browser modern (Chrome, Firefox, Safari, Edge) yang mendukung ES2026.
- Koneksi internet hanya untuk memuat font dari Google Fonts; setelah dimuat, alat dapat berjalan sepenuhnya offline.
- File data Instagram Anda (lihat panduan di bawah).

### Menjalankan Secara Lokal

1. **Clone repositori ini**
   ```bash
   git clone https://github.com/faizabdillahh/instacheck.git
   cd instacheck
   ```
2. **Buka `index.html`** di browser Anda.  
   Tidak perlu server lokal — cukup buka file secara langsung.
3. Ikuti panduan di halaman untuk mengunduh data Instagram Anda.

### Live Demo

Kunjungi **[halaman demo](https://faizabdillahh.github.io/instacheck)** (tersedia jika GitHub Pages diaktifkan) untuk langsung mencoba tanpa mengunduh repositori.

---

## Panduan Pengguna

### 1. Dapatkan Data dari Instagram (Mei 2026)

#### Melalui Aplikasi HP (Android / iOS)
1. Buka profil → menu **☰** → pilih **Pusat Akun** (Accounts Center).
2. Gulir ke **Informasi dan izin Anda** → **Ekspor informasi Anda**.
3. Ketuk **Buat ekspor**, pilih akun Instagram Anda.
4. Pilih **Ekspor ke perangkat**, centang **Pengikut dan mengikuti**.
5. Format: **JSON**, rentang waktu: **Semua waktu**.
6. Verifikasi dengan kata sandi, lalu tunggu email dari Instagram (maks. 48 jam).
7. Unduh ZIP, ekstrak, dan cari dua file:
   - `followers_1.json`
   - `following.json`

#### Melalui Browser Web (PC / Laptop)
1. Buka [Instagram.com](https://instagram.com) → **Pengaturan**.
2. Klik **Pusat Akun Meta** → **Informasi dan izin Anda** → **Ekspor informasi Anda**.
3. Ikuti langkah yang sama seperti di atas.

> **Catatan:** File unduhan hanya berlaku **4 hari** setelah tautan dikirim.

### 2. Analisis di InstaCheck

1. Seret & lepas (atau klik) untuk mengunggah `followers_1.json` dan `following.json` ke kartu masing‑masing.
2. Setelah kedua file dimuat, tombol **"Analisis ↗"** akan aktif.
3. Klik tombol tersebut. Hasil akan muncul dalam dua tab:
   - *Kamu follow, mereka tidak* — akun yang Anda ikuti tapi tidak mengikuti balik.
   - *Mereka follow, kamu tidak* — akun yang mengikuti Anda tapi belum Anda ikuti kembali.
4. Gunakan tombol **"Ekspor TXT ↗"** untuk menyimpan daftar.

---

## Teknologi & Desain

### Standar Web

- **HTML:** [WHATWG Living Standard 2026](https://html.spec.whatwg.org/)
- **CSS:** [W3C CSS Snapshot 2026](https://www.w3.org/TR/css-2026/)
- **JavaScript:** [ECMAScript 2026 (ES17)](https://tc39.es/ecma262/)

### Sistem Desain

InstaCheck mengadopsi **Atelier Zero** — sebuah sistem visual editorial yang terinspirasi oleh majalah cetak berkualitas tinggi (*Monocle*, *Apartamento*, *IDEA*).  

**Karakteristik Utama:**
- Palet kertas hangat (`#efe7d2`), tinta dalam (`#15140f`), aksen coral (`#ed6f5c`).
- Tipografi campuran: *Inter Tight* (display), *Playfair Display Italic* (emphasis), *Inter* (body), *JetBrains Mono* (monospace).
- Angka Romawi untuk penanda bagian.
- Noise kertas latar, side rails, dan pulse dot editorial.
- Animasi subtle dengan durasi pendek (`0.18s`) dan fungsi easing eksponensial.

---

## Pengembangan

Tidak diperlukan alat build atau *package manager*.  
Cukup edit file langsung:

```
instacheck/
├── index.html       # Struktur halaman
├── styles.css       # Gaya dan animasi
├── app.js           # Logika pemrosesan file & UI
└── README.md        # Dokumentasi ini
```

Untuk memeriksa atau menyesuaikan desain, lihat `styles.css` — semua token warna dan tipografi berada di dalam *custom properties* di root.

---

## Berkontribusi

Kontribusi sangat disambut! Baik itu perbaikan bug, peningkatan UI, atau terjemahan panduan.

1. **Fork** repositori ini.
2. Buat branch fitur: `git checkout -b fitur/nama-fitur`.
3. Commit perubahan Anda: `git commit -m 'Menambah fitur keren'`.
4. Push ke branch: `git push origin fitur/nama-fitur`.
5. Buka **Pull Request**.

Atau, jika Anda menemukan masalah atau ide, silakan buka [Issues](https://github.com/faizabdillahh/instacheck/issues).

---

## Lisensi

Proyek ini dilisensikan di bawah **MIT License** — lihat [LICENSE](LICENSE) untuk detailnya.  
Dengan kata lain: bebas digunakan, dimodifikasi, dan didistribusikan, asalkan tetap menyertakan lisensi asli.

---

## Penghargaan

- Sistem desain Atelier Zero terinspirasi oleh karya editorial *Monocle*, *Apartamento*, dan *IDEA*.
- Font *Inter*, *Inter Tight*, *Playfair Display*, dan *JetBrains Mono* — tersedia secara terbuka melalui Google Fonts.
- Ikon SVG dibuat manual tanpa emoji, menjaga kemurnian cetak.
- Dibangun dengan keyakinan bahwa alat privasi harus indah, tidak hanya fungsional.

---

<p align="center">
  <i>Disunting di Banjarnegara · Edisi 2026 · FIN.</i><br>
  <sub><code>7.3994° S · 109.6963° E</code></sub>
</p>

---
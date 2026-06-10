# Website Interaktif Matematika: Fungsi Invers

Website edukasi mandiri untuk mempelajari konsep Fungsi Invers secara mendalam melalui materi terstruktur, visualisasi grafik interaktif, dan sistem latihan soal dengan feedback instan.

## 🎯 Fitur Utama

- **📚 Materi Lengkap**: 10 section materi dari definisi hingga fungsi khusus
- **📊 Visualisasi Grafik**: Grafik interaktif menggunakan Canvas API untuk memahami hubungan f(x) dan f⁻¹(x)
- **✍️ 30+ Soal Latihan**: Soal bertingkat (mudah, sedang, sulit) dengan pembahasan detail
- **💾 Progress Tracking**: Semua progress tersimpan otomatis di localStorage
- **🌙 Dark/Light Mode**: Tema yang dapat disesuaikan dengan preferensi
- **📱 Fully Responsive**: Optimal untuk desktop, tablet, dan mobile
- **🚀 Zero Dependencies**: Tanpa framework, murni Vanilla JavaScript
- **⚡ Offline-Ready**: Berfungsi 100% offline setelah dimuat pertama kali

## 🛠️ Teknologi

- **HTML5** - Struktur semantik
- **CSS3** - Design tokens & responsive layout
- **Vanilla JavaScript** - Tidak ada dependencies eksternal
- **Canvas API** - Visualisasi grafik real-time
- **localStorage** - Persistent data storage

## 📁 Struktur Proyek

```
fungsi-invers/
│
├── index.html              # Entry point (SPA)
├── css/
│   ├── reset.css          # CSS reset minimal
│   ├── variables.css      # Design tokens (warna, font, spacing)
│   ├── layout.css         # Grid, sidebar, responsive
│   ├── components.css     # Card, button, badge, form
│   ├── typography.css     # Heading, paragraph, formula
│   └── animations.css     # Transitions, keyframes
│
├── js/
│   ├── main.js            # Init, event listener global
│   ├── navigation.js      # Sidebar, scroll spy, progress
│   ├── materi.js          # Tabs, copy formula, theme toggle
│   ├── grafik.js          # Canvas rendering grafik
│   ├── soal.js            # Engine soal & latihan
│   ├── storage.js         # localStorage management
│   └── utils.js           # Helper functions
│
├── data/
│   └── soal.json          # Bank 30 soal terstruktur
│
├── assets/
│   └── favicon.svg        # Icon website
│
└── README.md              # Dokumentasi
```

## 🚀 Cara Menggunakan

### Metode 1: Langsung Buka

1. Download atau clone repository ini
2. Buka file `index.html` di browser modern (Chrome, Firefox, Edge, Safari)
3. Mulai belajar!

### Metode 2: Local Server (Opsional)

Jika ingin menggunakan local server:

```bash
# Menggunakan Python 3
python -m http.server 8000

# Atau menggunakan Node.js (dengan npx http-server)
npx http-server -p 8000
```

Kemudian buka `http://localhost:8000` di browser.

## 📖 Panduan Penggunaan

### Navigasi

- **Sidebar**: Klik section untuk melompat ke materi tertentu
- **Progress Ring**: Melihat persentase materi yang sudah dibaca
- **Checkmark (✓)**: Menandai section yang sudah selesai dibaca

### Visualisasi Grafik

1. Pilih fungsi dari dropdown
2. Toggle tampilan f(x), f⁻¹(x), dan garis y=x
3. Gunakan Zoom In/Out untuk melihat detail
4. Aktifkan "Titik contoh" untuk melihat pasangan (a,b) dan (b,a)

### Latihan Soal

**Mode Latihan:**
- **Urut**: Soal ditampilkan berurutan 1-30
- **Acak**: Soal diacak untuk variasi
- **Ujian**: 15 soal acak dengan timer 20 menit

**Filter:**
- Filter berdasarkan topik (Linear, Pecahan, Akar, dll.)
- Filter berdasarkan tingkat kesulitan (Mudah, Sedang, Sulit)

**Pembahasan:**
- Setiap soal dilengkapi langkah-langkah penyelesaian detail
- Verifikasi jawaban untuk memastikan kebenaran

### Fitur Lainnya

- **Copy Formula**: Klik pada formula untuk menyalin ke clipboard
- **Dark/Light Mode**: Toggle di pojok kanan atas
- **Reset Progress**: Button di section Rangkuman untuk mengulang dari awal

## 🎨 Design System

### Color Palette

```css
/* Primary */
--color-primary: #6C63FF;        /* Ungu - CTA, link aktif */

/* Semantic */
--color-success: #22C55E;        /* Hijau - Benar */
--color-danger: #EF4444;         /* Merah - Salah */
--color-warning: #F59E0B;        /* Kuning - Peringatan */
--color-info: #3B82F6;           /* Biru - Info */

/* Grafik */
--color-graph-f: #6C63FF;        /* Warna garis f(x) */
--color-graph-finv: #22C55E;     /* Warna garis f⁻¹(x) */
--color-graph-mirror: rgba(255,255,255,0.2); /* Garis y=x */
```

### Typography Scale

- **Hero Title**: 38px (--text-2xl)
- **Section Title**: 28px (--text-xl)
- **Subsection**: 21px (--text-lg)
- **Body Text**: 15px (--text-base)
- **Caption**: 13px (--text-sm)

### Spacing

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 40px
- 2xl: 64px

## 📊 Konten Materi

1. **Definisi** - Pengertian fungsi invers dengan notasi f⁻¹
2. **Syarat** - Bijektif (injektif & surjektif), Horizontal Line Test
3. **Cara Menentukan** - 5 langkah sistematis mencari invers
4. **Contoh Soal** - 4 tipe: Linear, Pecahan, Akar, Kuadrat
5. **Grafik Interaktif** - Visualisasi hubungan f dan f⁻¹
6. **Sifat-Sifat** - 9 sifat penting fungsi invers
7. **Komposisi** - Invers fungsi komposisi (f∘g)⁻¹ = g⁻¹∘f⁻¹
8. **Fungsi Khusus** - Tabel invers untuk eksponensial, logaritma, trigonometri
9. **Latihan Soal** - 30 soal dengan pembahasan
10. **Rangkuman** - Ringkasan 6 poin penting

## 🎯 Target Pengguna

- Siswa SMA kelas 10-12
- Mahasiswa semester 1 (Kalkulus dasar)
- Siapa saja yang ingin belajar fungsi invers secara mandiri

## ✨ Keunggulan

### Dibanding Buku Teks

- ✅ Interaktif dengan feedback instan
- ✅ Visualisasi grafik yang dapat dimanipulasi
- ✅ Progress tracking otomatis
- ✅ Akses kapan saja, di mana saja

### Dibanding Platform Online Lainnya

- ✅ Gratis 100%, tanpa iklan
- ✅ Tidak perlu login/registrasi
- ✅ Berfungsi offline
- ✅ Fokus pada 1 topik (fungsi invers) secara mendalam
- ✅ Bahasa Indonesia

## 🔒 Privacy & Data

- **Tidak ada tracking**: Website ini tidak menggunakan analytics atau cookies pihak ketiga
- **Data lokal**: Semua progress tersimpan di localStorage browser Anda
- **Tidak ada server**: Tidak ada data yang dikirim ke server eksternal
- **Open source**: Kode sumber terbuka untuk transparansi

## 🐛 Known Issues & Limitations

- Formula ditampilkan menggunakan karakter Unicode (tidak menggunakan MathJax/KaTeX untuk performa)
- Custom fungsi input belum diimplementasikan (hanya preset yang tersedia)
- Browser lama (IE11 ke bawah) tidak didukung

## 🚀 Future Enhancements (v2.0)

- [ ] Kuis interaktif dengan gamification
- [ ] Ekspor/impor progress sebagai JSON
- [ ] Mode challenge dengan leaderboard lokal
- [ ] Animasi transisi antar grafik f dan f⁻¹
- [ ] Support input custom function dengan parser matematika
- [ ] PWA (Progressive Web App) untuk install di home screen
- [ ] Dukungan multi-bahasa (English, dll.)

## 📄 License

MIT License - Bebas digunakan untuk tujuan pendidikan.

## 👨‍💻 Development

Dibuat dengan ❤️ menggunakan Vanilla JavaScript untuk pendidikan matematika yang lebih interaktif.

**Versi**: 1.0.0  
**Tanggal Rilis**: Juni 2026

---

**Selamat Belajar! 🎓**

Jika ada pertanyaan atau saran, silakan buka issue di repository ini.

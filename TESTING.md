# Testing Guide - Website Fungsi Invers

Panduan untuk menguji semua fitur website secara manual.

## ✅ Checklist Testing

### 1. Layout & Responsiveness

- [ ] Topbar muncul dengan logo dan judul
- [ ] Progress bar global terlihat dan berfungsi
- [ ] Sidebar muncul di desktop (> 768px)
- [ ] Hamburger menu muncul di mobile (< 768px)
- [ ] Sidebar dapat dibuka/tutup di mobile
- [ ] Layout responsif di berbagai ukuran layar (375px, 768px, 1024px, 1440px)

### 2. Theme Toggle

- [ ] Button dark/light mode di pojok kanan atas
- [ ] Klik untuk toggle antara dark dan light mode
- [ ] Theme tersimpan di localStorage
- [ ] Theme tetap sama setelah refresh

### 3. Navigation & Scroll Spy

- [ ] Sidebar link aktif sesuai section yang terlihat
- [ ] Klik sidebar link scroll ke section yang benar
- [ ] Progress ring di sidebar update sesuai scroll
- [ ] Checkmark (✓) muncul setelah section dibaca
- [ ] Progress bar global update sesuai materi yang dibaca
- [ ] URL hash berubah sesuai section yang aktif

### 4. Materi Section

#### Hero
- [ ] Title dan subtitle terlihat
- [ ] 3 feature cards terlihat dengan icon
- [ ] Button "Mulai Belajar" scroll ke definisi

#### Definisi
- [ ] Card accent dengan border kiri primary
- [ ] Formula inline dengan background surface-2
- [ ] Highlight box info terlihat
- [ ] Formula dapat diklik untuk copy

#### Syarat
- [ ] Tabel sifat injektif, surjektif, bijektif
- [ ] SVG grafik Horizontal Line Test
- [ ] Contoh fungsi tanpa invers

#### Cara Menentukan
- [ ] Steps component dengan nomor 1-5
- [ ] Setiap step punya title dan desc
- [ ] Garis penghubung antar step

#### Contoh Soal
- [ ] Tabs berfungsi (Linear, Pecahan, Akar, Kuadrat)
- [ ] Klik tab mengubah konten
- [ ] Solusi dan verifikasi terlihat
- [ ] Highlight box di setiap tab

### 5. Grafik Interaktif

- [ ] Canvas terlihat dan merender grafik
- [ ] Dropdown preset fungsi berfungsi
- [ ] Checkbox "Tampilkan f(x)" toggle garis f(x)
- [ ] Checkbox "Tampilkan f⁻¹(x)" toggle garis f⁻¹(x)
- [ ] Checkbox "Tampilkan y = x" toggle garis mirror
- [ ] Checkbox "Titik contoh" toggle titik sampel
- [ ] Button Zoom In memperbesar grafik
- [ ] Button Zoom Out memperkecil grafik
- [ ] Button Reset mengembalikan zoom default
- [ ] Grafik update saat theme berubah (warna dari CSS variables)
- [ ] Legend terlihat di bawah canvas

#### Test Setiap Preset:
1. [ ] f(x) = 2x + 1 → render benar
2. [ ] f(x) = x³ → render benar
3. [ ] f(x) = √x → render benar (domain x≥0)
4. [ ] f(x) = eˣ → render benar
5. [ ] f(x) = (2x+1)/(x−3) → render benar (asymptote x=3)

### 6. Sifat-Sifat

- [ ] Tabel dengan 9 sifat terlihat
- [ ] Tabel responsive (scroll horizontal di mobile)
- [ ] Hover row mengubah background
- [ ] Contoh penerapan sifat terlihat

### 7. Komposisi

- [ ] Teorema (f∘g)⁻¹ = g⁻¹∘f⁻¹ dijelaskan
- [ ] Analogi sepatu-kaos kaki
- [ ] Contoh perhitungan lengkap

### 8. Fungsi Khusus

- [ ] Tabel 12 fungsi dengan inversnya
- [ ] Formula terlihat jelas
- [ ] Syarat/domain tertera
- [ ] Warning box untuk fungsi trigonometri

### 9. Latihan Soal

#### Score Card
- [ ] Score ring terlihat
- [ ] Count benar/salah/belum update
- [ ] Total poin terlihat

#### Controls
- [ ] Radio button Mode (Urut, Acak, Ujian)
- [ ] Dropdown filter Topik
- [ ] Dropdown filter Tingkat
- [ ] Button "Mulai Latihan"

#### Mode Urut
- [ ] Klik "Mulai Latihan"
- [ ] Soal pertama muncul (INV-001)
- [ ] Badge topik dan tingkat terlihat
- [ ] Nomor soal (1/30) terlihat
- [ ] Poin soal terlihat
- [ ] Pertanyaan jelas
- [ ] 4 pilihan jawaban terlihat
- [ ] Klik pilihan → button "Jawab" enabled
- [ ] Klik "Jawab" → feedback muncul
- [ ] Jawaban benar → highlight hijau + animasi bounce
- [ ] Jawaban salah → highlight merah + reveal jawaban benar
- [ ] Button "Lihat Pembahasan" muncul
- [ ] Button "Lanjut" muncul
- [ ] Klik "Lanjut" → soal berikutnya
- [ ] Score card update setelah jawab

#### Modal Pembahasan
- [ ] Klik "Lihat Pembahasan" → modal muncul
- [ ] Langkah-langkah terlihat
- [ ] Jawaban lengkap terlihat
- [ ] Verifikasi terlihat
- [ ] Button close (X) berfungsi
- [ ] Button "Mengerti" berfungsi
- [ ] Klik backdrop → modal tutup
- [ ] ESC key → modal tutup

#### Mode Acak
- [ ] Soal diacak (tidak urut)
- [ ] Fitur lain sama dengan mode urut

#### Mode Ujian
- [ ] Timer 20:00 muncul di pojok kanan atas
- [ ] 15 soal dipilih acak
- [ ] Timer countdown setiap detik
- [ ] Timer berubah kuning saat < 5 menit
- [ ] Timer berubah merah + pulse saat < 1 menit
- [ ] Waktu habis → ujian selesai otomatis
- [ ] Alert hasil ujian muncul
- [ ] Tidak bisa kembali ke soal sebelumnya

#### Filter
- [ ] Filter "Linear" → hanya soal linear
- [ ] Filter "Pecahan" → hanya soal pecahan
- [ ] Filter "Akar/Kuadrat" → hanya soal akar
- [ ] Filter "Komposisi" → hanya soal komposisi
- [ ] Filter "Fungsi Khusus" → hanya soal khusus
- [ ] Filter "Mudah" → hanya soal mudah
- [ ] Filter "Sedang" → hanya soal sedang
- [ ] Filter "Sulit" → hanya soal sulit
- [ ] Kombinasi filter berfungsi

### 10. Rangkuman

- [ ] Summary list 6 poin terlihat
- [ ] Button "Ulangi Latihan" berfungsi
- [ ] Confirm dialog muncul sebelum reset
- [ ] Button "Reset Semua Progress" berfungsi
- [ ] Confirm dialog muncul sebelum reset all
- [ ] Card "Selamat" terlihat

### 11. Footer

- [ ] Footer terlihat di bawah
- [ ] Text copyright terlihat

### 12. localStorage

- [ ] Buka DevTools → Application → Local Storage
- [ ] Key `fungsiInvers_progress` terlihat
- [ ] Data JSON valid
- [ ] Refresh page → data tetap ada
- [ ] Setelah jawab soal → data update
- [ ] Setelah scroll section → sectionsRead update

### 13. Toast Notifications

- [ ] Klik formula → toast "Disalin! ✓"
- [ ] Copy berhasil → text di clipboard
- [ ] Toggle theme → toast dengan icon tema
- [ ] Filter soal → toast "X soal tersedia"

### 14. Modal Welcome (First Visit)

- [ ] Clear localStorage
- [ ] Refresh page
- [ ] Modal "Selamat Datang!" muncul
- [ ] List fitur terlihat
- [ ] Button "Mulai Belajar" → scroll ke definisi

### 15. Accessibility

- [ ] Tab key → navigasi keyboard berfungsi
- [ ] Focus visible pada interactive elements
- [ ] aria-label pada button icon
- [ ] role="navigation" pada sidebar
- [ ] role="main" pada main content
- [ ] aria-selected pada tabs
- [ ] aria-modal pada modal

### 16. Performance

- [ ] Page load < 2 detik
- [ ] Canvas render smooth tanpa lag
- [ ] Scroll smooth
- [ ] No console errors
- [ ] No console warnings (kecuali yang expected)

### 17. Browser Compatibility

Test di browser:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### 18. Offline Functionality

- [ ] Load page dengan koneksi
- [ ] Disconnect internet
- [ ] Reload page → masih berfungsi (dari cache)
- [ ] Semua fitur tetap berfungsi offline

### 19. Edge Cases

- [ ] Resize window → layout adjust
- [ ] Rotate mobile device → responsif
- [ ] Zoom browser 50% → masih terbaca
- [ ] Zoom browser 200% → masih terbaca
- [ ] Open modal → scroll lock di background
- [ ] Multiple rapid clicks → tidak error

### 20. Data Integrity

- [ ] Jawab soal → poin bertambah
- [ ] Jawab soal benar 2x → poin tidak double
- [ ] Jawab soal salah lalu benar → status update
- [ ] Reset latihan → poin kembali 0
- [ ] Reset all → semua data hilang

## 🐛 Bug Report Template

Jika menemukan bug:

```
**Browser:** Chrome 120
**OS:** Windows 11
**Screen Size:** 1920x1080

**Steps to Reproduce:**
1. Buka index.html
2. Klik button X
3. ...

**Expected:** 
Should do Y

**Actual:** 
Did Z instead

**Screenshot:** 
[attach if possible]
```

## ✅ Acceptance Criteria

Website dianggap PASS jika:
- [ ] Semua 20 kategori di atas PASS
- [ ] Tidak ada console error
- [ ] Tidak ada visual bug
- [ ] Responsive di semua breakpoint
- [ ] Berfungsi offline
- [ ] localStorage berfungsi dengan baik

---

**Happy Testing! 🧪**

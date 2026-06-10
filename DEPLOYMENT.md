# Deployment Guide - Website Fungsi Invers

Panduan untuk men-deploy website ini ke berbagai platform hosting.

## 📦 Persiapan

Website ini adalah **static website** (HTML, CSS, JS murni) tanpa backend. Semua file dapat di-host di:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Cloudflare Pages
- Atau web hosting tradisional

## 🚀 Deployment Options

### 1. GitHub Pages (Gratis)

**Langkah:**

1. Push project ke GitHub repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/fungsi-invers.git
git push -u origin main
```

2. Buka repository di GitHub → Settings → Pages

3. Source: pilih branch `main`, folder `/` (root)

4. Save → tunggu beberapa menit

5. Website akan live di: `https://username.github.io/fungsi-invers/`

**Catatan:** Jika deploy di subfolder, pastikan update semua link relatif.

---

### 2. Netlify (Gratis)

**Metode A: Drag & Drop**

1. Buka [netlify.com](https://netlify.com)
2. Login dengan GitHub
3. Drag seluruh folder project ke Netlify Drop
4. Tunggu deploy selesai
5. Website live dengan subdomain random: `random-name-123.netlify.app`

**Metode B: Git Integration**

1. Push project ke GitHub (lihat langkah di atas)
2. Di Netlify: New Site → Import from Git
3. Pilih repository
4. Build settings:
   - Build command: (kosongkan)
   - Publish directory: `/`
5. Deploy site
6. Website live!

**Custom Domain (Optional):**
- Domain Settings → Add custom domain
- Update DNS di registrar domain Anda

---

### 3. Vercel (Gratis)

1. Push project ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import Project → pilih repository
4. Framework Preset: Other
5. Root Directory: `./`
6. Deploy
7. Website live di: `fungsi-invers.vercel.app`

---

### 4. Firebase Hosting (Gratis)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

4. Pilih:
   - Public directory: `.` (root)
   - Single-page app: No
   - Overwrite index.html: No

5. Deploy:
```bash
firebase deploy
```

6. Website live di: `project-name.web.app`

---

### 5. Cloudflare Pages (Gratis)

1. Push project ke GitHub
2. Buka [pages.cloudflare.com](https://pages.cloudflare.com)
3. Create a project → Connect to Git
4. Pilih repository
5. Build settings:
   - Build command: (kosongkan)
   - Build output directory: `/`
6. Save and Deploy
7. Website live di: `fungsi-invers.pages.dev`

---

### 6. cPanel / Traditional Hosting

1. Compress seluruh folder menjadi `.zip`
2. Login ke cPanel
3. File Manager → public_html
4. Upload zip file
5. Extract
6. Website live di: `yourdomain.com`

**Struktur di server:**
```
public_html/
├── index.html
├── css/
├── js/
├── data/
└── assets/
```

---

## 🔧 Konfigurasi Lanjutan

### Custom Domain

**Di Netlify/Vercel:**
1. Settings → Domains → Add custom domain
2. Update DNS di registrar:
   - A Record: `76.76.21.21` (Netlify) atau IP Vercel
   - CNAME: `www` → `random-name.netlify.app`

**Di Cloudflare Pages:**
1. Pages → Custom domains → Set up custom domain
2. DNS otomatis ter-configure jika domain di Cloudflare

---

### HTTPS / SSL

Semua platform modern (Netlify, Vercel, dll.) otomatis provide HTTPS gratis via Let's Encrypt.

**Manual (cPanel):**
1. cPanel → SSL/TLS Status
2. AutoSSL → Enable

---

### Performance Optimization

#### 1. Enable Gzip Compression

Tambahkan `.htaccess` (untuk Apache):
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript
</IfModule>
```

#### 2. Browser Caching

Tambahkan di `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

#### 3. CDN (Optional)

Untuk performa global yang lebih baik, gunakan:
- Cloudflare (gratis)
- BunnyCDN
- Amazon CloudFront

---

### Analytics (Optional)

Jika ingin tracking pengunjung, tambahkan script di `index.html` sebelum `</body>`:

**Google Analytics:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

**Plausible Analytics (privacy-friendly):**
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🧪 Pre-Deployment Checklist

Sebelum deploy, pastikan:

- [ ] Test di local terlebih dahulu
- [ ] Tidak ada console errors
- [ ] Semua link relatif (tidak hardcoded)
- [ ] File `soal.json` valid JSON
- [ ] Favicon terlihat
- [ ] Responsive di mobile
- [ ] Dark/Light mode berfungsi
- [ ] localStorage berfungsi
- [ ] Canvas grafik merender
- [ ] Soal bisa dijawab
- [ ] Modal pembahasan berfungsi

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push

**Netlify/Vercel/Cloudflare Pages:**
- Otomatis deploy setiap kali push ke branch `main`
- Preview deploy untuk pull request
- Rollback ke versi sebelumnya jika error

**Setup:**
1. Connect repository saat initial setup
2. Setiap `git push` → auto-deploy
3. Lihat build log jika ada error

---

## 🌐 Multi-Environment Setup

Jika ingin environment berbeda:

**Production:**
- Branch: `main`
- URL: `fungsi-invers.com`

**Staging:**
- Branch: `staging`
- URL: `staging.fungsi-invers.com`

**Development:**
- Branch: `dev`
- URL: `dev.fungsi-invers.com`

Setup di platform hosting:
1. Buat 3 sites berbeda
2. Connect ke branch yang berbeda
3. Setiap branch punya URL sendiri

---

## 📊 Monitoring

### Uptime Monitoring

Gunakan:
- **UptimeRobot** (gratis) - ping setiap 5 menit
- **Pingdom** (gratis tier)
- **StatusCake**

### Error Tracking

Jika ingin track JS errors di production, tambahkan:

**Sentry:**
```html
<script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js"></script>
<script>
  Sentry.init({ dsn: 'YOUR_DSN' });
</script>
```

---

## 🔒 Security Headers

Tambahkan security headers di platform hosting:

**Netlify:** Buat file `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "no-referrer-when-downgrade"
```

**Vercel:** Buat file `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

---

## 🎉 Post-Deployment

Setelah deploy:

1. ✅ Test semua fitur di production
2. ✅ Test di berbagai device (mobile, tablet, desktop)
3. ✅ Test di berbagai browser (Chrome, Firefox, Safari)
4. ✅ Lighthouse audit (Performance, Accessibility, SEO)
5. ✅ Share link dengan teman untuk feedback

---

## 📞 Troubleshooting

### Issue: 404 Not Found

**Solusi:**
- Pastikan `index.html` ada di root folder
- Check kapitalisasi nama file (case-sensitive di Linux server)

### Issue: Canvas tidak merender

**Solusi:**
- Check console untuk error
- Pastikan file `grafik.js` ter-load
- Verify Canvas API didukung browser

### Issue: localStorage tidak berfungsi

**Solusi:**
- Pastikan HTTPS (localStorage blocked di HTTP di some browsers)
- Check browser privacy settings
- Test di incognito mode

### Issue: CORS error saat load soal.json

**Solusi:**
- Pastikan `soal.json` di-host di same domain
- Jika local: gunakan local server, bukan `file://`

---

## 🚀 Recommendations

**Best Platform untuk Project Ini:**

1. **Netlify** ⭐⭐⭐⭐⭐
   - Gratis unlimited bandwidth
   - Auto HTTPS
   - Deploy preview
   - Custom domain gratis
   - Fast CDN

2. **Vercel** ⭐⭐⭐⭐⭐
   - Sama powerful dengan Netlify
   - Excellent performance
   - Good DX

3. **GitHub Pages** ⭐⭐⭐⭐
   - Gratis, no credit card
   - Langsung terintegrasi GitHub
   - Bagus untuk portfolio

---

**Selamat Deploy! 🎉**

Jika ada pertanyaan, buka issue di repository atau hubungi maintainer.

# Educativa.id - Internal Performance & Employee Identity System (IPEIS)

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white)

## 🚀 Live Demo
Project ini telah di-deploy menggunakan GitHub Pages dan dapat diakses melalui link berikut:  
**🔗 [Live Preview IPEIS Dashboard](https://nfrhndn.github.io/educativa-internal-dashboard/)**

---

## 📖 Deskripsi Proyek
**Internal Performance & Employee Identity System (IPEIS)** adalah sebuah proyek *front-end web application* yang dikembangkan selama masa magang (*internship*) sebagai **Front-End Developer di PT Educativa Cipta Nawasena (Educativa.id)**. 

Proyek ini bertujuan untuk membangun antarmuka sistem internal perusahaan yang digunakan untuk melacak performa karyawan (*KPI Tracker*), memantau absensi, serta melihat profil evaluasi secara berkala. Desain antarmuka dibuat agar terlihat modern, interaktif, responsif, dan memberikan pengalaman pengguna (*user experience*) yang sangat baik.

## ✨ Fitur Utama
1. **Dashboard Harian**: Ringkasan performa (*KPI Score*), tingkat absensi, serta interaksi visual berupa radar chart dan area chart untuk memantau perkembangan nilai karyawan.
2. **KPI Tracker Page**: Tampilan *detail* untuk indikator performa bulanan dengan *progress ring* dan grafik *sparkline* historis.
3. **Data Visualisasi Modern**: Terintegrasi secara penuh dengan **Chart.js** untuk render data evaluasi (Area Chart, Radar Chart, Doughnut Chart).
4. **Desain Responsif (Mobile-First approach)**: Layout sangat adaptif menggunakan spesifikasi CSS Grid dan Flexbox. Terdapat sistem navigasi cerdas yang berubah menjadi *bottom navigation* di tampilan *mobile*, dan tertutup secara otomatis (ikon saja) pada layar tablet.
5. **No-Framework Styling**: Dirancang murni menggunakan Vanilla CSS3 dengan arsitektur file yang terstruktur rapi untuk kemudahan *maintenance*.

## 🛠️ Tech Stack
Proyek ini sengaja dibangun tanpa menggunakan bantuan JS/CSS Framework untuk menunjukkan pemahaman fundamental *Front-End Development* yang kuat.
* **Semantic HTML5**: Untuk kerangka yang SEO-*friendly* dan standar aksesibilitas dasar.
* **Vanilla CSS3**: Styling menggunakan CSS variables, CSS Grid, Flexbox, dan *media queries*.
* **Vanilla JavaScript (ES6+)**: Logika interaksi navigasi DOM, inisialisasi modul, dan pengolahan data tiruan.
* **Chart.js (via CDN)**: Library eksternal untuk *rendering* grafik visualisasi data yang responsif.
* **Font Awesome & Google Fonts**: Penyedia font utama (Inter) dan ikon vektor di dalam antarmuka.

## 📂 Struktur Folder
```text
educativa-internal-dashboard/
├── assets/                 # Berisi semua gambar statis dan ikon format SVG.
├── css/
│   ├── style.css           # Variabel global (warna, font) dan global reset.
│   ├── layout.css          # Styling layout utama (Sidebar, Header, Navigasi).
│   ├── components.css      # Styling komponen (Card, Button, Progress Bar).
│   └── responsive.css      # Media queries khusus untuk tampilan mobile & tablet.
├── js/
│   ├── data.js             # Data dummy JSON object untuk semua grafik.
│   ├── navigation.js       # Logika fungsionalitas sidebar dan active class.
│   ├── dashboard.js        # Konfigurasi Chart.js khusus halaman Dashboard.
│   └── kpi.js              # Konfigurasi Chart.js khusus halaman KPI Tracker.
├── pages/
│   ├── dashboard.html      # Halaman utama aplikasi (Dashboard).
│   └── kpi.html            # Halaman detail indikator KPI.
└── index.html              # Halaman entri awal, auto-redirect ke halaman Dashboard.
```

## 💻 Cara Menjalankan Secara Lokal
Karena proyek ini berbasis teknologi web fundamental statis (tanpa *build-tools* atau dependencies `npm`), cara menjalankannya sangat mudah:
1. Clone repositori ini:
   ```bash
   git clone https://github.com/nfrhndn/educativa-internal-dashboard.git
   ```
2. Buka folder proyek tersebut.
3. Buka file `index.html` secara langsung menggunakan Browser (Chrome, Firefox, Safari) atau gunakan ekstensi *Live Server* di VS Code untuk pengalaman pengembangan terbaik.

---
*Dibuat untuk memenuhi kualifikasi KPI bulan April 2026 - Intern Front-End Developer Educativa.id*

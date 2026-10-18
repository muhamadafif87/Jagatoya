# JagaToya — Platform Irigasi Cerdas untuk Sawah Padi

Platform monitoring telemetri berbasis Internet of Things (IoT) yang dirancang untuk membantu petani dan kelompok tani memantau kondisi lahan sawah (kelembapan tanah, ketinggian genangan air, suhu mikro, dan kelembapan udara) secara presisi, hemat air, dan berbasis data.

---

## 🌾 Fitur Utama (MVP)

1. **Beranda & Edukasi Petani (`/`)**
   - Hero visual sawah Nusantara dengan cuplikan kartu sensor real-time.
   - Penjelasan masalah (kelangkaan air, kekeringan mendadak) & solusi telemetri JagaToya.
   - Fitur unggulan: Monitoring tanah, level air, peringatan ambang batas, dan arsitektur LoRa/GSM.
   - Alur cara kerja 4 langkah (Daftar, Pasang Node, Pantau Sawah, Kelola Air).
   - Penyelarasan aspirasi keberlanjutan (SDG 6 Air Bersih & SDG 2 Ketahanan Pangan).

2. **Dasbor Ringkasan Petani (`/dashboard`)**
   - Ringkasan KPI: Rata-rata Kelembapan Tanah, Ketinggian Air Genangan, Rasio Perangkat Online, Peringatan Aktif.
   - Grafik interaktif telemetri 24 jam terakhir (Recharts) dengan indikator status optimal.
   - Panel peringatan darurat terkini.
   - Tabel cepat status seluruh node sensor sawah.

3. **Manajemen Perangkat IoT (`/dashboard/devices`)**
   - Inventaris perangkat dengan indikator koneksi (`online`, `offline`, `stale`).
   - Filter status koneksi dan pencarian cepat berdasarkan nama/ID/petak.
   - Modal registrasi perangkat baru (simulasi alur registrasi ID barcode fisik).
   - Halaman detail perangkat (`/dashboard/devices/[id]`) lengkap dengan metrik real-time, grafik riwayat, dan formulir pengaturan ambang batas peringatan (*threshold*).

4. **Analitik & Telemetri Historis (`/dashboard/analytics`)**
   - Filter parameter sensor: Kelembapan Tanah (%), Ketinggian Air (cm), Suhu (°C), Kelembapan Udara (%).
   - Filter rentang waktu: 24 Jam, 7 Hari Terakhir, 30 Hari Terakhir.
   - Kartu statistik *null-safe*: Nilai Minimum, Rata-rata, Maksimum, dan Jumlah Sampel Valid.
   - Ekspor data riwayat sensor ke berkas **CSV**.
   - Log tabel telemetri deret waktu terkini (WIB).

5. **Pusat Notifikasi & Alarm (`/dashboard/notifications`)**
   - Pengelompokan tingkat urgensi: Kritis (*Critical*), Peringatan (*Warning*), Informasi (*Info*).
   - Filter belum dibaca dan aksi interaktif "Tandai Sudah Dibaca" / "Tandai Semua Dibaca".

6. **Pengaturan Akun & Saluran Alarm (`/dashboard/settings`)**
   - Data profil petani dan identitas kelompok tani.
   - Preferensi saluran peringatan darurat (WhatsApp, Email mingguan, SMS).
   - Transparansi arsitektur sistem dan kesiapan integrasi hardware.

7. **Alur Autentikasi Terbimbing (`/login`, `/register`, `/forgot-password`)**
   - Formulir login, pendaftaran petani, dan pemulihan kata sandi dengan validasi Zod & React Hook Form.
   - Edukasi transparan mengenai status mode demonstrasi (MVP) dan tombol akses cepat langsung ke dasbor simulasi.

---

## 🛠️ Arsitektur & Teknologi

- **Framework**: [Next.js](https://nextjs.org) (App Router, TypeScript)
- **Styling**: Vanilla CSS & Tailwind CSS v4 (`@theme` inline tokens)
- **Komponen Ikon**: `lucide-react`
- **Visualisasi Data**: `recharts`
- **Validasi Formulir**: `react-hook-form` + `zod`
- **Data Access Layer**: Pola *Service Factory* (`lib/services/contracts.ts` & `lib/services/index.ts`)
  - `NEXT_PUBLIC_DATA_MODE=demo` (default): Menggunakan fixtures deterministik (`lib/demo/fixtures.ts`).
  - `NEXT_PUBLIC_DATA_MODE=live`: Siap dihubungkan ke endpoint REST API / WebSocket broker MQTT nyata tanpa perlu merombak komponen UI.
- **Kepatuhan Data Agronomi**:
  - Missing value diperlakukan sebagai `null` (tidak pernah diganti paksa menjadi `0`).
  - Seluruh stempel waktu diselaraskan dengan zona waktu Indonesia Barat (WIB, UTC+7).

---

## 🚀 Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js versi 18.x atau lebih baru
- npm

### Langkah Instalasi
```bash
# 1. Pastikan dependensi telah terpasang
npm install

# 2. Jalankan server pengembangan lokal
npm run dev
```

Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

---

## 📂 Struktur Direktori Proyek

```
jagatoya/
├── app/
│   ├── dashboard/
│   │   ├── analytics/page.tsx      # Analitik & grafik deret waktu
│   │   ├── devices/
│   │   │   ├── [id]/page.tsx       # Detail perangkat & ambang batas
│   │   │   └── page.tsx            # Daftar inventaris perangkat IoT
│   │   ├── notifications/page.tsx  # Pusat notifikasi & alarm
│   │   ├── settings/page.tsx       # Profil & pengaturan saluran
│   │   ├── layout.tsx              # Shell dasbor (Sidebar + Header)
│   │   └── page.tsx                # Dasbor ringkasan sawah
│   ├── forgot-password/page.tsx    # Pemulihan sandi
│   ├── login/page.tsx              # Masuk ke akun / demo dasbor
│   ├── register/page.tsx           # Pendaftaran akun petani
│   ├── privacy/page.tsx            # Kebijakan privasi
│   ├── terms/page.tsx              # Syarat & ketentuan
│   ├── globals.css                 # Token desain & utilitas Tailwind v4
│   ├── layout.tsx                  # Root layout & SEO meta
│   └── page.tsx                    # Landing page publik
├── components/
│   ├── charts/
│   │   └── SensorHistoryChart.tsx  # Komponen grafik Recharts null-safe
│   ├── landing/                    # Komponen seksi landing page
│   ├── layout/                     # Header, Sidebar, Footer publik & dasbor
│   └── ui/                         # StatCard, StatusBadge, Skeleton, EmptyState
├── lib/
│   ├── analytics/utils.ts          # Utilitas kalkulasi statistik murni (null-safe)
│   ├── demo/fixtures.ts            # Data fixtures deterministik (perangkat & telemetri)
│   ├── services/                   # Service factory & adapter kontrak
│   └── utils.ts                    # Utilitas umum (cn)
├── types/
│   └── index.ts                    # Definisi tipe TypeScript lengkap
└── public/
    └── hero-rice-field.jpg         # Asset visual sawah resolusi tinggi
```

---

## 📄 Lisensi
Hak Cipta © 2026 JagaToya. Seluruh hak cipta dilindungi undang-undang.

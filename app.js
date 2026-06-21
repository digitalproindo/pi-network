// =========================================================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// =========================================================================
let currentUser = null;
let cart = [];
let userAddress = { nama: "", telepon: "", alamatLengkap: "" };
let isPiInitialized = false; // Penanda status inisialisasi SDK Blockchain
const ADMIN_WA = "6281234567890"; // Silakan ganti dengan nomor WhatsApp Admin Anda

// Mock Data Produk Lengkap (Gabungan Kategori & Format Diseragamkan)
const productsData = [
    // ================= KATEGORI: RUMAH =================
    {
        id: "house-001",
        category: "Rumah",
        name: "The Beverly Hills Modern Mansion",
        price: 3.25000,
        rating: "5.0",
        sold: 12,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Luas Tanah:</b> 2.500 m²<br>• <b>Kamar Tidur:</b> 7 Master Suite<br>• <b>Fasilitas:</b> Infinity Pool, Home Cinema, Wine Cellar<br>• <b>Lokasi:</b> Beverly Hills, California<br>• <b>Garasi:</b> Kapasitas 10 Mobil Mewah`
    },
    {
        id: "house-002",
        category: "Rumah",
        name: "Zen Waterfront Villa",
        price: 3.18000,
        rating: "5.0",
        sold: 8,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Pemandangan:</b> Akses Langsung ke Danau Privasi<br>• <b>Gaya:</b> Arsitektur Minimalis Modern<br>• <b>Fasilitas:</b> Dermaga Pribadi, Spa & Sauna, Gym<br>• <b>Sistem:</b> Full Smart Home Technology<br>• <b>Keamanan:</b> Biometric Entry System`
    },
    {
        id: "house-003",
        category: "Rumah",
        name: "Penthouse Skyline Duplex",
        price: 2.12000,
        rating: "4.9",
        sold: 24,
        images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lantai:</b> Lantai 50 & 51 (Top Floor)<br>• <b>Pemandangan:</b> 360° City Skyline View<br>• <b>Interior:</b> Marmer Italia & Panel Emas<br>• <b>Fasilitas:</b> Private Rooftop Garden & Jacuzzi<br>• <b>Layanan:</b> 24/7 Concierge Service`
    },
    {
        id: "house-004",
        category: "Rumah",
        name: "Tropical Cliffside Sanctuary",
        price: 4.15500,
        rating: "5.0",
        sold: 5,
        images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> Tebing Uluwatu, Bali<br>• <b>Konsep:</b> Open Living Space with Ocean View<br>• <b>Fasilitas:</b> Private Beach Access, Deck Yoga<br>• <b>Struktur:</b> Kayu Ulin & Batu Alam Lokal<br>• <b>Kamar:</b> 5 Suite dengan Semi-Outdoor Bathroom`
    },
    {
        id: "house-005",
        category: "Rumah",
        name: "The Glass House Estate",
        price: 3.21000,
        rating: "4.9",
        sold: 15,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Material Dominan:</b> Kaca Tempered & Baja Hitam<br>• <b>Privasi:</b> Smart Glass (Bisa Buram Otomatis)<br>• <b>Lansekap:</b> Koi Pond Keliling Bangunan<br>• <b>Ruang:</b> Galeri Seni Pribadi & Studio Musik<br>• <b>Luas:</b> Kavling Sudut 3.000 m²`
    },
    {
        id: "house-006",
        category: "Rumah",
        name: "Mediterranean Seafront Palace",
        price: 3.28000,
        rating: "5.0",
        sold: 3,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> French Riviera (Cote d'Azur)<br>• <b>Atap:</b> Terakota Tradisional Spanyol<br>• <b>Taman:</b> Kebun Zaitun & Citrus<br>• <b>Fasilitas:</b> Lapangan Tenis Pribadi, Helipad<br>• <b>Kamar Mandi:</b> Perlengkapan Emas 24 Karat`
    },
    {
        id: "house-007",
        category: "Rumah",
        name: "The Urban Luxury Loft",
        price: 2.08800,
        rating: "4.8",
        sold: 42,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Tipe:</b> Industrial Luxury Loft<br>• <b>Tinggi Plafon:</b> 6 Meter (Double Height Ceiling)<br>• <b>Fitur:</b> Tangga Melingkar Besi Kustom<br>• <b>Lokasi:</b> Pusat Distrik Finansial<br>• <b>Sistem:</b> Voice Controlled Home Automation`
    },
    {
        id: "house-008",
        category: "Rumah",
        name: "The Floating Diamond Villa",
        price: 2.19500,
        rating: "5.0",
        sold: 7,
        images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 550 m² (Struktur Terapung)<br>• <b>Lokasi:</b> Maladewa (Private Lagoon)<br>• <b>Fitur:</b> Kamar Tidur Bawah Laut, Dek Berjemur 360°<br>• <b>Material:</b> Kaca Anti-Karat & Kayu Jati Reklamasi<br>• <b>Energi:</b> Kemandirian Energi dengan Panel Surya Laut`
    },
    {
        id: "house-009",
        category: "Rumah",
        name: "Cyber-Tech Underground Bunker",
        price: 3.16000,
        rating: "5.0",
        sold: 2,
        images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 900 m² (Kedalaman 15 Meter)<br>• <b>Keamanan:</b> Pintu Anti-Ledakan, Sistem Filtrasi Udara Nuklir<br>• <b>Fasilitas:</b> Kebun Hidroponik Indoor, Simulator Golf<br>• <b>Teknologi:</b> AI Butler terintegrasi ke seluruh ruangan<br>• <b>Lantai:</b> Epoxy Resin Anti-Statis & Dinding Beton Ekspos`
    },
    {
        id: "house-010",
        category: "Rumah",
        name: "Aspen Snow Peak Lodge",
        price: 3.13500,
        rating: "4.9",
        sold: 9,
        images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 3.500 m² / LB 700 m²<br>• <b>Lokasi:</b> Aspen, Colorado (Ski-in/Ski-out Access)<br>• <b>Fitur:</b> Perapian Batu Alam Raksasa, Kolam Air Hangat Outdoor<br>• <b>Material:</b> Kayu Pinus Tua & Batu Granit Pegunungan<br>• <b>Ruangan:</b> Ruang Simpan Perlengkapan Ski Khusus`
    },
    {
        id: "house-011",
        category: "Rumah",
        name: "Mediterranean Cliff Villa",
        price: 3.27000,
        rating: "5.0",
        sold: 4,
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 2.200 m² / LB 950 m²<br>• <b>Pemandangan:</b> Laut Mediterania (Amalfi Coast)<br>• <b>Fasilitas:</b> Lift Tebing Pribadi, Bar Tepi Kolam, Bioskop Terbuka<br>• <b>Interior:</b> Keramik Hand-Painted Italia & Furnitur Putih Bersih<br>• <b>Lanskap:</b> Kebun Vertikal & Pohon Lemon`
    },
    {
        id: "house-012",
        category: "Rumah",
        name: "The Brutalist Cube Estate",
        price: 3.11000,
        rating: "4.8",
        sold: 11,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 1.500 m² / LB 800 m²<br>• <b>Gaya:</b> Brutalisme Kontemporer (Raw Concrete)<br>• <b>Ruangan:</b> Studio Lukis & Ruang Musik Kedap Suara<br>• <b>Fitur:</b> Skylight Masif di Tengah Rumah<br>• <b>Sistem:</b> Smart Lighting System yang mengikuti ritme sirkadian`
    },
    {
        id: "house-013",
        category: "Rumah",
        name: "Amazonian Eco-Mansion",
        price: 3.14500,
        rating: "4.9",
        sold: 6,
        images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 10.000 m² / LB 650 m² (Floating on tents)<br>• <b>Konsep:</b> Regenerative Architecture (Mandiri Air & Limbah)<br>• <b>Fitur:</b> Dinding Tanaman Hidup, Kolam Renang Air Hujan<br>• <b>Material:</b> Bambu Laminasi & Atap Daun Rumbia Sintetis<br>• <b>Lokasi:</b> Hutan Lindung Tropis`
    },
    {
        id: "house-014",
        category: "Rumah",
        name: "Dubai Sky-High Villa",
        price: 4.35000,
        rating: "5.0",
        sold: 19,
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 1.100 m² (Penthouse 3 Lantai)<br>• <b>Fasilitas:</b> Kolam Renang Kaca Gantung, Helipad Gedung<br>• <b>Interior:</b> Aksen Emas 24K & Kristal Baccarat<br>• <b>Pemandangan:</b> Burj Khalifa & Palm Jumeirah<br>• <b>Layanan:</b> Private Chef & Sopir Rolls-Royce`
    },
    {
        id: "house-015",
        category: "Rumah",
        name: "The Vineyard Ranch Estate",
        price: 2.17500,
        rating: "4.9",
        sold: 14,
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 15 Hektar / LB 1.300 m²<br>• <b>Fitur:</b> Perkebunan Anggur Pribadi, Pabrik Pengolahan Wine<br>• <b>Fasilitas:</b> Lapangan Berkuda, Kandang Kuda Premium<br>• <b>Interior:</b> Gaya Farmhouse Modern dengan Kayu Oak Ekspos<br>• <b>Dapur:</b> Outdoor BBQ Station & Pizza Wood-Oven`
    },
    { 
        id: 'house-016', 
        category: "Rumah",
        name: "Smart Home System Pro", 
        price: 0.500,
        rating: "4.8",
        sold: 154, 
        images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], 
        desc: "• <b>Tipe Layanan:</b> Paket Instalasi Smart Home Berbasis IoT<br>• <b>Integrasi:</b> Amankan Kontrol Rumah Anda Lewat Pi Browser<br>• <b>Fitur:</b> Automasi Lampu, Sensor Gerak, & Pintu Pintar Terpusat"
    },
    { 
        id: 'house-017', 
        category: "Rumah",
        name: "Sofa Minimalis 2 Seater - Modern Grey", 
        price: 0.05,
        rating: "4.7",
        sold: 68, 
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], 
        desc: "• <b>Dimensi:</b> Ukuran Presisi 150 cm x 80 cm<br>• <b>Kapasitas:</b> Nyaman Untuk Ruang Tamu Skala Kecil<br>• <b>Material:</b> Kain Lembut Breathable & Busa Kepadatan Tinggi Anti-Kempes"
    },
    { 
        id: 'house-018', 
        category: "Rumah",
        name: "Lampu Gantung Industrial - Model Black Dome", 
        price: 0.015,
        rating: "4.9",
        sold: 215, 
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"], 
        desc: "• <b>Jenis:</b> Lampu Dekoratif Plafon Gantung<br>• <b>Dimensi:</b> Diameter Kap Lingkar Masif 30 cm<br>• <b>Estetika:</b> Nuansa Industrial Sangat Cocok Untuk Kafe Atau Rumah Anda"
    },
    { 
        id: 'house-019', 
        category: "Rumah",
        name: "Rak Buku Kayu 5 Tingkat - Slim Design", 
        price: 0.03,
        rating: "4.6",
        sold: 89, 
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"], 
        desc: "• <b>Tipe:</b> Furnitur Penyimpanan Vertikal Hemat Ruang<br>• <b>Dimensi:</b> Tinggi Presisi 180 cm / Lebar Struktur 40 cm<br>• <b>Ketahanan:</b> Mudah Dirakit & Sanggup Menahan Beban Buku Berat"
    },
    { 
        id: 'house-020', 
        category: "Rumah",
        name: "Karpet Bulu Lembut 160x210 - Creamy White", 
        price: 0.012,
        rating: "4.8",
        sold: 340, 
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"], 
        desc: "• <b>Jenis:</b> Karpet Lantai Kamar & Ruang Keluarga Premium<br>• <b>Fitur:</b> Sangat Lembut Di Kulit, Hangat, & Sangat Mudah Dibersihkan<br>• <b>Desain:</b> Memberikan Efek Visual Elegan Pada Interior Rumah"
    },
    { 
        id: 'house-021', 
        category: "Rumah",
        name: "Set Gorden Jendela - Model Smokering Minimalis", 
        price: 0.008,
        rating: "4.7",
        sold: 195, 
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"], 
        desc: "• <b>Dimensi:</b> Kain Blackout Gorden Ukuran 140 cm x 220 cm<br>• <b>Varian:</b> Tersedia Dalam Berbagai Pilihan Warna Netral<br>• <b>Efektivitas:</b> Mampu Menghalau Silau Sinar Matahari Hingga 90%"
    },
    { 
        id: 'house-022', 
        category: "Rumah",
        name: "Jam Dinding Kayu - Tipe Scandinavian", 
        price: 0.005,
        rating: "4.9",
        sold: 520, 
        images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"], 
        desc: "• <b>Jenis:</b> Jam Dinding Estetik Desain Minimalis Skandinavia<br>• <b>Dimensi:</b> Ukuran Diameter Proporsional 35 cm<br>• <b>Mesin:</b> Teknologi Sweep Movement Tanpa Suara Detak (Hening)"
    },
    { 
        id: 'house-023', 
        category: "Rumah",
        name: "Tanaman Hias Artificial - Model Monstera Large", 
        price: 0.01,
        rating: "4.8",
        sold: 285, 
        images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"], 
        desc: "• <b>Tipe:</b> Tanaman Palsu Replika Detail Mirip Asli<br>• <b>Kelengkapan:</b> Sudah Dilengkapi Pot Keramik Putih Tebal<br>• <b>Ukuran:</b> Tinggi Komponen 80 cm, Berikan Kesan Asri Tanpa Perawatan"
    },

    // ================= KATEGORI: HERBAL =================
    { 
        id: 'herb-001', 
        category: "Herbal", 
        name: "COCO Pro Kunyit", 
        price: 0.00006,
        discount: 5, 
        rating: "4.9",
        sold: 430,
        images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
        desc: "• <b>Tipe:</b> Super Food Obat Masa Depan<br>• <b>Keunggulan:</b> Cocopro Biotech 10 Probiotik Multi strain<br>• <b>Komposisi:</b> Madu, Air Kelapa, Kunyit, Kurma<br>• <b>Formula:</b> Bioteknologi Khusus Live Probiotic<br>• <b>Khasiat:</b> Immune Support, High Antioksidant, Improved Digestion"
    },
    { 
        id: 'herb-002', 
        category: "Herbal", 
        name: "An-Nisa", 
        price: 0.00010,
        discount: 5, 
        rating: "5.0",
        sold: 312,
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
        desc: "• <b>Manfaat Utama:</b> Mengatasi Keputihan & Gatal-gatal<br>• <b>Fungsi Medis:</b> Membunuh Bakteri & Melancarkan Menstruasi<br>• <b>Proteksi Rahim:</b> Mengatasi Nyeri Haid & Mencegah Kanker Rahim<br>• <b>Terapi Internal:</b> Membasmi Mioma / Kista & Merapatkan Otot Organ V<br>• <b>Hormonal:</b> Memperbaiki & Memperbanyak Hormon Kewanitaan"
    },
    { 
        id: 'herb-003', 
        category: "Herbal", 
        name: "Ar-Rizal", 
        price: 0.00010,
        discount: 5, 
        rating: "4.9",
        sold: 285,
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
        desc: "• <b>Fungsi Vital:</b> Mengencangkan & Menguatkan Mr.P<br>• <b>Kesehatan Tubuh:</b> Menguatkan Jantung & Meningkatkan Gairah<br>• <b>Durasi:</b> Mengatasi Ejakulasi Dini & Memperlama Hubungan Pasutri<br>• <b>Sirkulasi:</b> Melancarkan Aliran Darah Ke Alat Vital<br>• <b>Hormon:</b> Meningkatkan & Memperbanyak Kualitas Hormon Pria"
    },
    { 
        id: 'herb-004', 
        category: "Herbal", 
        name: "Nabidz Dessert", 
        price: 0.00012,
        discount: 0,
        rating: "4.8",
        sold: 96,
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
        desc: "• <b>Bahan Baku:</b> Buah Anggur Merah Hasil Fermentasi Esterifikasi Biokimia<br>• <b>Proses:</b> Olahan Istihalah Microbiome & Asam Organik<br>• <b>Fungsi Utama:</b> Meningkatkan Kualitas Pencernaan<br>• <b>Imunitas:</b> Memperkuat 90% Pondasi Sistem Imun Tubuh"
    },
    { 
        id: 'herb-005', 
        category: "Herbal", 
        name: "COCO Pro 10", 
        price: 0.00006, 
        rating: "4.9",
        sold: 520,
        images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
        desc: "• <b>Tipe:</b> Super Food Obat Masa Depan<br>• <b>Keunggulan:</b> Formula Suplemen Imun Tubuh Multi Strain Bioteknologi<br>• <b>Komposisi:</b> Air Kelapa Pilihan, Madu Alami, Kunyit, Serta Kurma<br>• <b>Khasiat:</b> Melancarkan Sistem Pencernaan & Meningkatkan Energi Tubuh"
    },

    // ================= KATEGORI: ELEKTRONIK =================
    { 
        id: 'elec-001', 
        category: "Elektronik", 
        name: "Premium Smartphone X", 
        price: 1.200, 
        rating: "4.9",
        sold: 142,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], 
        desc: "• <b>Spesifikasi:</b> Gadget Premium Performa Ekstrim Tinggi<br>• <b>Kamera:</b> Lensa Resolusi Tinggi dengan Fitur Malam Pro<br>• <b>Daya:</b> Baterai Tahan Lama yang Dioptimalkan Untuk Aktivitas Harian"
    },
    { 
        id: 'elec-002', 
        category: "Elektronik", 
        name: "Smartphone Pi-Phone X - 256GB Platinum", 
        price: 0.15, 
        rating: "5.0",
        sold: 38,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"], 
        desc: "• <b>Layar:</b> Panel Masif AMOLED Lebar 6.7 Inci<br>• <b>Komputasi:</b> RAM 12GB dengan Penyimpanan Internal 256GB<br>• <b>Konektivitas:</b> Baterai 5000mAh, Dukungan Native Ekosistem Pi App"
    },
    { 
        id: 'elec-003', 
        category: "Elektronik", 
        name: "Wireless Earbuds Pro - Noise Cancelling", 
        price: 0.02, 
        rating: "4.8",
        sold: 210,
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"], 
        desc: "• <b>Suara:</b> Audio Berkualitas Tinggi High-Fidelity Sound<br>• <b>Sertifikasi:</b> Proteksi Tahan Air & Keringat Standar IPX5<br>• <b>Daya:</b> Daya Tahan Operasional Hingga 24 Jam dengan Casing"
    },
    {
        id: "elec-004",
        category: "Elektronik",
        name: "iPhone 15 Pro Max 512GB",
        price: 0.00250,
        rating: "4.9",
        sold: 95,
        images: ["https://i.ibb.co.com/kgxjnpyp/Desain-tanpa-judul-20260207-181545-0000.png"],
        desc: `• <b>Layar:</b> 6.7" Super Retina XDR OLED<br>• <b>Chipset:</b> A17 Pro (3nm)<br>• <b>Material:</b> Titanium Grade 5`
    },
    {
        id: "elec-005",
        category: "Elektronik",
        name: "Samsung Galaxy S24 Ultra",
        price: 0.00235,
        rating: "5.0",
        sold: 114,
        images: ["https://i.ibb.co.com/RprpNpf6/Desain-tanpa-judul-20260207-182139-0000.png"],
        desc: `• <b>Layar:</b> 6.8" Dynamic LTPO AMOLED 2X<br>• <b>AI:</b> Galaxy AI (Circle to Search)`
    },

    // ================= KATEGORI: MOTOR =================
    { 
        id: 'bike-001', 
        category: "Motor", 
        name: "Motor Sport 250cc - Black Matte", 
        price: 0.002, 
        rating: "4.8",
        sold: 45,
        images: ["https://i.ibb.co.com/spcrbbKT/Motor-250cc-Terbaik.jpg"], 
        desc: "• <b>Performa:</b> Akselerasi Instan Cepat & Responsif<br>• <b>Pengereman:</b> Sistem Keamanan Dual-Channel ABS System<br>• <b>Desain:</b> Konstruksi Aerodinamis Modern Untuk Kota Maupun Touring"
    },
    { 
        id: 'bike-002', 
        category: "Motor", 
        name: "Motor Sport 250cc - Kawasaki Ninja H2R Model Kit", 
        price: 0.002, 
        rating: "4.9",
        sold: 18,
        images: ["https://i.ibb.co.com/Fkp8tHJH/58942-kawasaki-ninja-h2r-model-kit-motosiklet-112-39198-1.jpg"], 
        desc: "• <b>Status Kendaraan:</b> Motor Produksi Massal Terkencang Di Dunia<br>• <b>Ketentuan:</b> Edisi Khusus Sirkuit Balap (Track Only)<br>• <b>Sasis:</b> Rangka Kokoh Desain Trellis Hijau Khas Pabrikan Kawasaki"
    },
    {
        id: "bike-003",
        category: "Motor",
        name: "Ducati Panigale V4 R",
        price: 0.01500,
        rating: "5.0",
        sold: 3,
        images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 998cc Desmosedici Stradale V4 R<br>• <b>Tenaga:</b> 218 HP @ 15.500 RPM<br>• <b>Fitur:</b> Sayap Karbon (Aero Winglets), Öhlins Suspension`
    },
    {
        id: "bike-004",
        category: "Motor",
        name: "Kawasaki Ninja H2R (Asli)",
        price: 0.01800,
        rating: "5.0",
        sold: 2,
        images: ["https://i.ibb.co.com/jZ6LvJTB/Desain-tanpa-judul-20260207-131613-0000.png"],
        desc: `• <b>Mesin:</b> 998cc In-line Four with Supercharger<br>• <b>Tenaga:</b> 310 HP (Paling bertenaga di dunia)<br>• <b>Top Speed:</b> 400+ km/jam`
    },
    {
        id: "bike-005",
        category: "Motor",
        name: "BMW M 1000 RR",
        price: 0.01250,
        rating: "4.9",
        sold: 7,
        images: ["https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 999cc Water-cooled Inline 4-Cylinder<br>• <b>Fitur M:</b> Velg Karbon M, Kursi M, Knalpot Akrapovic Titanium`
    },
    {
        id: "bike-006",
        category: "Motor",
        name: "Harley-Davidson CVO Road Glide",
        price: 0.01400,
        rating: "4.8",
        sold: 14,
        images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> Milwaukee-Eight® VVT 121 (1.977cc)<br>• <b>Gaya:</b> Grand American Touring Luxury`
    },
    {
        id: "bike-007",
        category: "Motor",
        name: "MV Agusta Rush 1000 cc",
        price: 0.01650,
        rating: "5.0",
        sold: 1,
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: `• <b>Konsep:</b> Hyper-Naked Drag Bike Luxury<br>• <b>Mesin:</b> 998cc 16-valve DOHC Inline 4`
    },
    {
        id: "bike-008",
        category: "Motor",
        name: "Aprilia RSV4 Xtrenta",
        price: 0.01900,
        rating: "5.0",
        sold: 4,
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: `• <b>Teknologi:</b> MotoGP Derived Aerodynamics<br>• <b>Mesin:</b> 1.099cc V4 Longitudinal 65°`
    },
    {
        id: "bike-009",
        category: "Motor",
        name: "Triumph Rocket 3 TFC",
        price: 0.00950,
        rating: "4.9",
        sold: 9,
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 2.458cc (Mesin motor terbesar di dunia)<br>• <b>Torsi:</b> 225 Nm (Akselerasi instan)`
    },
    {
        id: "bike-010",
        category: "Motor",
        name: "Arch Motorcycle KRGT-1",
        price: 0.02500,
        rating: "5.0",
        sold: 2,
        images: ["https://i.ibb.co.com/d4dwYps4/Desain-tanpa-judul-20260207-132911-0000.png"],
        desc: `• <b>Pembuat:</b> Co-founded by Keanu Reeves<br>• <b>Mesin:</b> 2.032cc S&S Cycle V-Twin`
    },
    {
        id: "bike-011",
        category: "Motor",
        name: "Honda Gold Wing Tour DCT",
        price: 0.00850,
        rating: "4.9",
        sold: 16,
        images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 1.833cc Liquid-cooled 6-cylinder Boxer<br>• <b>Transmisi:</b> 7-speed Automatic Dual Clutch (DCT)`
    },

    // ================= KATEGORI: MOBIL =================
    { 
        id: 'car-001', 
        category: "Mobil", 
        name: "Sedan Sport Luxury - Tipe S1", 
        price: 0.0005, 
        rating: "4.7",
        sold: 55,
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], 
        desc: "• <b>Dapur Pacu:</b> Mesin Turbo Bertenaga 2.0L Performance<br>• <b>Interior:</b> Balutan Kursi Kulit Premium & Panoramic Sunroof<br>• <b>Proteksi:</b> Keamanan Mengemudi dengan Smart Driving Assist"
    },
    {
        id: "car-002",
        category: "Mobil",
        name: "Toyota Fortuner 2.8 GR Sport",
        price: 0.15000,
        discount: 5,
        rating: "4.9",
        sold: 124,
        images: ["https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1000&auto=format&fit=crop"],
        desc: `• <b>Mesin:</b> 2.800 cc Diesel Turbo<br>• <b>Transmisi:</b> Otomatis 6-Speed<br>• <b>Tenaga:</b> 203.9 PS / 500 Nm`
    },
    {
        id: "car-003",
        category: "Mobil",
        name: "Honda CR-V 2.0 RS e:HEV Hybrid",
        price: 0.18500,
        discount: 10,
        rating: "5.0",
        sold: 86,
        images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1000&auto=format&fit=crop"],
        desc: `• <b>Mesin:</b> 2.0L i-VTEC + Electric Motor (Hybrid)<br>• <b>Transmisi:</b> e-CVT<br>• <b>Fitur:</b> Panoramic Sunroof & BOSE Audio`
    },
    {
        id: "car-004",
        category: "Mobil",
        name: "Lamborghini Aventador SVJ",
        price: 0.08500,
        rating: "5.0",
        sold: 5,
        images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.5L V12 Naturally Aspirated<br>• <b>Akselerasi:</b> 0-100 km/h dalam 2.8 detik`
    },
    {
        id: "car-005",
        category: "Mobil",
        name: "Bentley Continental GT Mulliner",
        price: 0.06500,
        rating: "4.9",
        sold: 8,
        images: ["https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.0L W12 TSI Twin-Turbo<br>• <b>Interior:</b> Diamond-in-Diamond Quilting`
    },
    {
        id: "car-006",
        category: "Mobil",
        name: "Ferrari SF90 Stradale",
        price: 0.09200,
        rating: "5.0",
        sold: 4,
        images: ["https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Sistem:</b> Plug-in Hybrid AWD<br>• <b>Mesin:</b> 4.0L V8 Turbo + 3 Motor Listrik`
    },
    {
        id: "car-007",
        category: "Mobil",
        name: "Mercedes-Maybach S-Class S680",
        price: 0.04500,
        rating: "4.9",
        sold: 12,
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.0L V12 Biturbo<br>• <b>Kursi:</b> Executive Rear Seats with Massage Function`
    },
    {
        id: "car-008",
        category: "Mobil",
        name: "Porsche 911 GT3 RS",
        price: 0.05800,
        rating: "5.0",
        sold: 19,
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"],
        desc: `• <b>Mesin:</b> 4.0L Naturally Aspirated Boxer-6<br>• <b>Sayap:</b> Active Rear Wing with DRS`
    },
    {
        id: "car-009",
        category: "Mobil",
        name: "Aston Martin DBS Volante",
        price: 0.07200,
        rating: "4.8",
        sold: 6,
        images: ["https://i.ibb.co.com/GvnNVhbt/Desain-tanpa-judul-20260207-115657-0000.png"],
        desc: `• <b>Konfigurasi:</b> Convertible<br>• <b>Mesin:</b> 5.2L V12 Twin-Turbo`
    },
    {
        id: "car-010",
        category: "Mobil",
        name: "Bugatti Chiron Super Sport",
        price: 0.25000,
        rating: "5.0",
        sold: 1,
        images: ["https://i.ibb.co.com/mFMXn0VQ/Desain-tanpa-judul-20260207-120754-0000.png"],
        desc: `• <b>Mesin:</b> 8.0L W16 Quad-Turbocharged<br>• <b>Tenaga:</b> 1.600 PS (1.578 HP)`
    },
    {
        id: "car-011",
        category: "Mobil",
        name: "McLaren 720S Spider",
        price: 0.06800,
        rating: "4.9",
        sold: 9,
        images: ["https://i.ibb.co.com/KjcpvFzt/Desain-tanpa-judul-20260207-121412-0000.png"],
        desc: `• <b>Mesin:</b> 4.0L V8 Twin-Turbo<br>• <b>Sasis:</b> Monocage II-S Carbon Fiber`
    },
    {
        id: "car-012",
        category: "Mobil",
        name: "Range Rover SV Autobiography",
        price: 0.04000,
        rating: "4.8",
        sold: 15,
        images: ["https://i.ibb.co.com/zV8hJbjn/Desain-tanpa-judul-20260207-122051-0000.png"],
        desc: `• <b>Tipe:</b> Long Wheelbase Luxury SUV<br>• <b>Mesin:</b> 5.0L Supercharged V8`
    },
    {
        id: "car-013",
        category: "Mobil",
        name: "Rolls-Royce Phantom Series II",
        price: 0.15000,
        rating: "5.0",
        sold: 2,
        images: ["https://i.ibb.co.com/7xshksJQ/Desain-tanpa-judul-20260207-114554-0000.png"],
        desc: `• <b>Mesin:</b> 6.75L V12 Twin-Turbo<br>• <b>Fitur:</b> Starlight Headliner, Magic Carpet Ride`
    },

    // ================= KATEGORI: EMAS =================
    {
        id: "gold-001",
        category: "Emas",
        name: "Emas Antam Logam Mulia 1 Gram",
        price: 0.00015,
        rating: "4.9",
        sold: 1500,
        images: ["https://i.ibb.co.com/WW2GjHH3/Desain-tanpa-judul-20260207-134044-0000.png"],
        desc: `• <b>Berat:</b> 1 Gram<br>• <b>Kemurnian:</b> 999.9 (24 Karat)<br>• <b>Fitur:</b> QR Code CertiEye`
    },
    {
        id: "gold-002",
        category: "Emas",
        name: "Emas Antam Logam Mulia 2 Gram",
        price: 0.00029,
        rating: "4.9",
        sold: 840,
        images: ["https://i.ibb.co.com/WWSt12zP/Desain-tanpa-judul-20260207-134711-0000.png"],
        desc: `• <b>Berat:</b> 2 Gram<br>• <b>Kemurnian:</b> Fine Gold 999.9`
    },
    {
        id: "gold-003",
        category: "Emas",
        name: "Emas Antam Logam Mulia 5 Gram",
        price: 0.00072,
        rating: "5.0",
        sold: 620,
        images: ["https://i.ibb.co.com/JW7Tk9kZ/Desain-tanpa-judul-20260207-141911-0000.png"],
        desc: `• <b>Berat:</b> 5 Gram<br>• <b>Kemurnian:</b> 99.99% Emas Murni`
    },
    {
        id: "gold-004",
        category: "Emas",
        name: "Emas Antam Logam Mulia 10 Gram",
        price: 0.00142,
        rating: "4.9",
        sold: 410,
        images: ["https://i.ibb.co.com/qMTw7ZPb/Desain-tanpa-judul-20260207-142456-0000.png"],
        desc: `• <b>Berat:</b> 10 Gram<br>• <b>Sertifikat:</b> LBMA (London Bullion Market)`
    },
    {
        id: "gold-005",
        category: "Emas",
        name: "Emas Antam Logam Mulia 25 Gram",
        price: 0.00350,
        rating: "5.0",
        sold: 185,
        images: ["https://i.ibb.co.com/K8jSt3G/Desain-tanpa-judul-20260207-145416-0000.png"],
        desc: `• <b>Berat:</b> 25 Gram<br>• <b>Sertifikat:</b> Akreditasi KAN`
    },
    {
        id: "gold-006",
        category: "Emas",
        name: "Emas Antam Logam Mulia 50 Gram",
        price: 0.00690,
        rating: "5.0",
        sold: 94,
        images: ["https://i.ibb.co.com/GvbphD6M/Desain-tanpa-judul-20260207-143702-0000.png"],
        desc: `• <b>Berat:</b> 50 Gram<br>• <b>Kemurnian:</b> 24 Karat (99.99%)`
    },
    {
        id: "gold-007",
        category: "Emas",
        name: "Emas Antam Logam Mulia 100 Gram",
        price: 0.01370,
        rating: "5.0",
        sold: 52,
        images: ["https://i.ibb.co.com/PzwYFNZ8/Desain-tanpa-judul-20260207-150017-0000.png"],
        desc: `• <b>Berat:</b> 100 Gram<br>• <b>Nilai:</b> Instrumen lindung nilai terbaik`
    },
    {
        id: "gold-008",
        category: "Emas",
        name: "Emas Antam Logam Mulia 250 Gram",
        price: 0.03400,
        rating: "5.0",
        sold: 14,
        images: ["https://i.ibb.co.com/hx080kjJ/Desain-tanpa-judul-20260207-150526-0000.png"],
        desc: `• <b>Berat:</b> 250 Gram<br>• <b>Bentuk:</b> Cast Bar (Emas Tuang)`
    },
    {
        id: "gold-009",
        category: "Emas",
        name: "Emas Antam Logam Mulia 500 Gram",
        price: 0.06400,
        rating: "5.0",
        sold: 8,
        images: ["https://i.ibb.co.com/hx080kjJ/Desain-tanpa-judul-20260207-150526-0000.png"],
        desc: `• <b>Berat:</b> 500 Gram<br>• <b>Bentuk:</b> Cast Bar Premium`
    }
];

// =========================================================================
// 2. PI NETWORK SDK INITIALIZATION
// =========================================================================
window.initPi = async () => {
    try {
        if (window.Pi) {
            // Menginisialisasi SDK dengan versi terbaru
            await window.Pi.init({ version: "2.0", sandbox: false });
            isPiInitialized = true;
            console.log("Pi Network SDK Berhasil Diinisialisasi.");
            
            // Otomatis jalankan autentikasi setelah SDK siap
            await window.handleAuth();
        } else {
            console.warn("Membuka di luar Pi Browser. SDK tidak terdeteksi.");
        }
    } catch (err) {
        console.error("Gagal menginisialisasi Pi SDK:", err);
    }
};

window.handleAuth = async () => {
    try {
        if (!window.Pi) return;
        const scopes = ['username', 'payments'];
        
        // Melakukan otentikasi user
        const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
        currentUser = auth.user;
        console.log("User Berhasil Login:", currentUser.username);
        
        // Update UI Tombol Login jika ada di halaman profile/navigasi
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.innerText = `Halo, ${currentUser.username}`;
            loginBtn.onclick = null;
        }
    } catch (err) {
        console.error("Autentikasi gagal:", err);
    }
};

// Penanganan otomatis jika ada transaksi gantung dari sesi sebelumnya
async function onIncompletePaymentFound(payment) {
    console.log("Menemukan pembayaran tertunda (Incomplete Payment):", payment.identifier);
    try {
        await fetch('https://www.ptdigitalproindo.com/api/incomplete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
        });
    } catch (e) {
        console.error("Gagal sinkronisasi transaksi incomplete:", e);
    }
}

// =========================================================================
// 3. PRODUCT RENDERING ENGINE
// =========================================================================
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #999; padding: 20px;">Produk tidak ditemukan.</p>`;
        return;
    }

    container.innerHTML = products.map(product => `
        <div style="background: white; border: 1px solid #f1f5f9; border-radius: 16px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between;">
            <img src="${product.images[0]}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 12px; margin-bottom: 10px;">
            <div style="text-align: left;">
                <h4 style="margin: 0 0 6px 0; font-size: 0.9rem; color: #333; font-weight: 700;">${product.name}</h4>
                <div style="font-size: 1.1rem; font-weight: 800; color: #b71c1c; margin-bottom: 10px;">π ${product.price.toFixed(5)}</div>
            </div>
            <button onclick="window.addToCart('${product.id}')" style="background: #6748d7; color: white; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer; width: 100%;">+ Keranjang</button>
        </div>
    `).join('');
}

// =========================================================================
// 4. CART & SHIPPING ADDRESS ACTIONS
// =========================================================================
window.showAddressForm = () => {
    const overlay = document.createElement('div');
    overlay.id = "address-overlay";
    overlay.style.cssText = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
    overlay.innerHTML = `
        <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:350px; color:#333; position:relative; font-family:'Inter', sans-serif;">
            <div onclick="document.getElementById('address-overlay').remove()" style="position:absolute; top:15px; right:15px; width:30px; height:30px; background:#f2f2f2; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; color:#666;">✕</div>
            <h3 style="margin-top:0; margin-bottom:20px; text-align:center;">Alamat Pengiriman</h3>
            <div style="margin-bottom:12px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">Nama Penerima</label><input type="text" id="ship-name" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" value="${userAddress.nama || ''}"></div>
            <div style="margin-bottom:12px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">No HP/WA</label><input type="number" id="ship-phone" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" value="${userAddress.telepon || ''}"></div>
            <div style="margin-bottom:20px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">Alamat Lengkap</label><textarea id="ship-address" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; height:80px; box-sizing:border-box; resize:none;">${userAddress.alamatLengkap || ''}</textarea></div>
            <button onclick="saveAddress()" style="width:100%; background:#6748d7; color:white; border:none; padding:14px; border-radius:10px; font-weight:bold; cursor:pointer;">Simpan Alamat</button>
        </div>`;
    document.body.appendChild(overlay);
};

window.saveAddress = () => {
    userAddress = {
        nama: document.getElementById('ship-name').value,
        telepon: document.getElementById('ship-phone').value,
        alamatLengkap: document.getElementById('ship-address').value
    };
    
    if(!userAddress.nama || !userAddress.alamatLengkap) {
        return alert("Mohon lengkapi data!"); 
    }
    
    // Efek Suara (Digital Pro Success Chime)
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') { audioCtx.resume(); }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); 
        osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.08); 
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35); 
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) { console.log("Audio diblokir:", e); }

    const currentOverlay = document.getElementById('address-overlay');
    if (currentOverlay) currentOverlay.remove();
    
    window.updateCartUI();

    // Popup Sukses Alamat Disimpan
    const successPopup = document.createElement('div');
    successPopup.id = "digital-pro-success-alert";
    successPopup.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px); z-index: 100005; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; opacity: 0; transition: opacity 0.3s ease; font-family: 'Inter', sans-serif;";
    successPopup.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a0033 0%, #0b2135 100%); border: 2px solid #FFD700; padding: 30px 20px; border-radius: 24px; max-width: 320px; width: 100%; text-align: center; box-shadow: 0 15px 50px rgba(212, 175, 55, 0.2); transform: scale(0.8); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
            <div style="background: rgba(255, 215, 0, 0.1); width: 65px; height: 65px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 20px; border: 2px solid #FFD700;"><span style="font-size: 28px;">📍</span></div>
            <h3 style="color: #FFD700; margin: 0 0 8px 0; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; font-size: 1.2rem;">Alamat Disimpan!</h3>
            <p style="color: #dfcbf2; margin: 0 0 25px 0; font-size: 0.9rem; line-height: 1.4;">Data pengiriman logistik Anda telah berhasil diperbarui di sistem kami.</p>
            <button onclick="document.getElementById('digital-pro-success-alert').remove()" style="background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%); color: #0b2135; border: none; padding: 12px 0; width: 100%; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3); text-transform: uppercase; letter-spacing: 0.5px;">Lanjutkan</button>
        </div>`;
    document.body.appendChild(successPopup);
    
    setTimeout(() => {
        successPopup.style.opacity = "1";
        successPopup.children[0].style.transform = "scale(1)";
    }, 50);
};

window.addToCart = (id) => {
    const p = productsData.find(x => x.id === id);
    if(p) { 
        cart.push(p); 
        
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') { audioCtx.resume(); }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime); 
            osc.frequency.setValueAtTime(1396.91, audioCtx.currentTime + 0.07); 
            gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        } catch (e) { console.log("Audio block:", e); }
        
        let popupContainer = document.getElementById('digital-pro-popup-container');
        if (!popupContainer) {
            popupContainer = document.createElement('div');
            popupContainer.id = 'digital-pro-popup-container';
            popupContainer.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -100%) scale(0.8); background: linear-gradient(135deg, #1a0033 0%, #3d0066 100%); color: white; padding: 25px; border-radius: 16px; box-shadow: 0 10px 40px rgba(212, 175, 55, 0.25); border: 2px solid #d4af37; z-index: 100005; display: flex; flex-direction: column; align-items: center; gap: 12px; opacity: 0; pointer-events: none; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); max-width: 85%; width: 310px; text-align: center; font-family: 'Inter', sans-serif;`;
            
            popupContainer.innerHTML = `
                <div style="background: rgba(212, 175, 55, 0.1); width: 55px; height: 55px; border-radius: 50%; display: flex; justify-content: center; align-items: center; border: 2px dashed #d4af37; margin-bottom: 2px;"><span style="font-size: 24px; color: #d4af37;">🛒</span></div>
                <div id="dp-popup-title" style="font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">SUKSES KERANJANG</div>
                <img id="dp-popup-img" src="${p.images[0]}" style="width: 85px; height: 85px; object-fit: cover; border-radius: 12px; border: 2px solid #d4af37; box-shadow: 0 5px 15px rgba(0,0,0,0.4); margin: 4px 0;">
                <div id="dp-popup-text" style="font-size: 12px; color: #dfcbf2; line-height: 1.4; font-weight: 500; padding: 0 10px;">${p.name} telah aman ditambahkan ke keranjang belanja digital Anda.</div>
                <button onclick="closeDigitalProPopup()" style="background: linear-gradient(90deg, #d4af37 0%, #b89324 100%); color: #1a0033; border: none; padding: 10px 25px; border-radius: 25px; font-size: 12px; font-weight: 700; cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3); margin-top: 5px;">KONFIRMASI</button>
            `;
            document.body.appendChild(popupContainer);
        } else {
            document.getElementById('dp-popup-img').src = p.images[0];
            document.getElementById('dp-popup-text').innerHTML = `${p.name} telah aman ditambahkan ke keranjang belanja digital Anda.`;
        }
        
        setTimeout(() => {
            popupContainer.style.transform = 'translate(-50%, -50%) scale(1)';
            popupContainer.style.opacity = '1';
            popupContainer.style.pointerEvents = 'auto';
        }, 10);
        
        window.cartAutoCloseTimer = setTimeout(closeDigitalProPopup, 4000); 
    }
};

window.closeDigitalProPopup = () => {
    clearTimeout(window.cartAutoCloseTimer);
    let popupContainer = document.getElementById('digital-pro-popup-container');
    if (popupContainer) {
        popupContainer.style.transform = 'translate(-50%, -100%) scale(0.8)';
        popupContainer.style.opacity = '0';
        popupContainer.style.pointerEvents = 'none';
        window.updateCartUI();
    }
};

window.removeFromCart = (index) => {
    cart.splice(index, 1); 
    window.updateCartUI(); 
};

window.updateCartUI = () => {
    const grid = document.getElementById('cart-items');
    if (!grid) return;

    if (cart.length === 0) {
        grid.innerHTML = `
            <div style="text-align:center; padding:80px 24px; font-family:'Inter', sans-serif;">
                <div style="margin-bottom: 25px;"><img src="https://cdn-icons-png.flaticon.com/512/1162/1162499.png" style="width: 120px; opacity: 0.8;"></div>
                <h2 style="color:#1a1a1a; margin-bottom:12px; font-size:1.5rem; font-weight:800;">Keranjang Anda Kosong</h2>
                <p style="color:#64748b; font-size:1rem; line-height:1.5; margin-bottom:30px;">Sepertinya Anda belum menambahkan produk premium.</p>
                <button onclick="switchPage('home')" style="background:#6748d7; color:white; border:none; padding:16px 40px; border-radius:18px; font-weight:700; cursor:pointer;">Mulai Belanja</button>
            </div>`;
        return;
    }

    const total = cart.reduce((s, i) => s + i.price, 0).toFixed(5);
    grid.innerHTML = `
        <div style="padding: 15px; font-family:'Inter', sans-serif;">
            <div onclick="window.showAddressForm()" style="background:#fdfaff; padding:15px; border-radius:15px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; border:1px dashed #6748d7; cursor:pointer;">
                <div style="display:flex; align-items:center; gap:12px; text-align:left;">
                    <span>📍</span>
                    <div>
                        <div style="font-size:0.7rem; color:#6748d7; font-weight:bold;">ALAMAT PENGIRIMAN</div>
                        <div style="font-size:0.85rem; font-weight:700;">${userAddress.nama ? userAddress.nama + ' (' + userAddress.telepon + ')' : 'Klik untuk lengkapi alamat'}</div>
                    </div>
                </div>
                <span>></span>
            </div>
            <div>
                ${cart.map((item, index) => `
                    <div style="display:flex; align-items:center; gap:12px; background:white; padding:12px; margin-bottom:12px; border-radius:18px; position:relative; border: 1px solid #f1f5f9;">
                        <img src="${item.images[0]}" style="width:70px; height:70px; border-radius:12px; object-fit:cover;">
                        <div style="flex:1; text-align:left;">
                            <div style="font-size:0.85rem; font-weight:700; color:#333;">${item.name}</div>
                            <div style="font-size:1rem; font-weight:800; color:#b71c1c;">π ${item.price.toFixed(5)}</div>
                        </div>
                        <div onclick="window.removeFromCart(${index})" style="position:absolute; top:10px; right:10px; width:26px; height:26px; background:#fff1f1; color:#ff4d4f; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; cursor:pointer; font-size:11px;">✕</div>
                    </div>
                `).join('')}
            </div>
            <div style="background:white; padding:20px; border-radius:22px; margin-top:20px; border: 1px solid #f1f5f9;">
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; color:#64748b;"><span>Subtotal (${cart.length} Produk)</span><span>π ${total}</span></div>
                <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:1.1rem; font-weight:800; border-top:2px solid #f8fafc; padding-top:15px;"><span>Total Tagihan</span><span style="color:#b71c1c;">π ${total}</span></div>
                <button style="width:100%; padding:16px; border-radius:16px; background:#6748d7; color:white; font-weight:800; border:none; cursor:pointer;" onclick="window.handlePayment(${total}, 'Total Keranjang')">CHECKOUT SEKARANG 🚀</button>
            </div>
        </div>`;
};

window.switchPage = (pageId) => {
    ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => {
        const el = document.getElementById(p);
        if(el) el.classList.add('hidden');
    });
    const activePage = document.getElementById(`page-${pageId}`);
    if(activePage) activePage.classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${pageId}`);
    if(activeNav) activeNav.classList.add('active');
    
    if(pageId === 'home') renderProducts(productsData, 'main-grid');
};

// =========================================================================
// 5. GATEWAY PI BLOCKCHAIN & ALERTS PROMPTS
// =========================================================================
window.handlePayment = async (amount, name) => {
    if (!isPiInitialized) {
        alert("Koneksi Blockchain belum siap. Mohon tunggu beberapa detik hingga inisialisasi selesai.");
        return;
    }
    if (!currentUser) { showLoginPrompt(); return; }
    if (!userAddress.nama) { showAddressPrompt(); return; }

    let detailedItemName = name;
    if (name === 'Total Keranjang' && cart.length > 0) {
        detailedItemName = `Keranjang (${cart.map(item => item.name).join(", ")})`;
    }

    const secureAmountString = parseFloat(amount).toFixed(7).toString();

    try {
        if (!window.Pi) {
            alert("Buka aplikasi ini dari dalam Pi Browser untuk melakukan pembayaran.");
            return;
        }

        await window.Pi.createPayment({
            amount: secureAmountString,
            memo: `Pembelian ${name}`,
            metadata: { 
                productName: detailedItemName,
                developer_domain: "www.ptdigitalproindo.com"
            },
        }, {
            onReadyForServerApproval: async (paymentId) => {
                const res = await fetch('https://www.ptdigitalproindo.com/api/approval', { 
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({paymentId}) 
                });
                return res.ok;
            },
            onReadyForServerCompletion: async (paymentId, txid) => {
                const res = await fetch('https://www.ptdigitalproindo.com/api/complete', { 
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({paymentId, txid}) 
                });
                if (res.ok) { 
                    showSuccessOverlay(secureAmountString, detailedItemName, txid);
                    if(name === 'Total Keranjang') { cart = []; window.updateCartUI(); }
                }
            },
            onCancel: () => { console.log("Pembayaran dibatalkan pembeli"); },
            onError: (error, payment) => { 
                console.error("Payment Error:", error); 
                if(payment) onIncompletePaymentFound(payment); 
            }
        });
    } catch (err) { 
        console.error("Execution Error:", err); 
    }
};

function showSuccessOverlay(amount, name, txid) {
    const excelWebhookUrl = "https://script.google.com/macros/s/AKfycbxhmcYyT3lBeLrm4dMGotKonJPwT9ZCMU1jRNMBD8CZITVD3Gyreuv_s81Vgw5Kra3b/exec";
    const dataTransaksi = {
        tanggal: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        penerima: userAddress.nama,
        username: currentUser ? currentUser.username : "Guest",
        item: name,
        total: amount,
        txid: txid,
        alamat: userAddress.alamatLengkap,
        telepon: userAddress.telepon
    };

    fetch(excelWebhookUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataTransaksi) })
    .catch(err => console.error("Gagal catat Excel:", err));

    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(5px);";
    
    const pesanWhatsApp = `*KONFIRMASI PEMBAYARAN PI NETWORK*%0A*PT. DIGITAL PRO INDO*%0A_______________________________%0A%0AHalo Admin, saya telah berhasil melakukan pembayaran produk premium melalui Pi Browser:%0A%0A*DETAIL TRANSAKSI:*%0A• *Item:* ${name}%0A• *Total:* ${amount} π%0A• *Status:* Success (Pi Network)%0A• *TXID:* \`${txid}\` %0A%0A*DATA PENGIRIMAN:*%0A• *Penerima:* ${userAddress.nama}%0A• *Telepon:* ${userAddress.telepon}%0A• *Alamat:* ${userAddress.alamatLengkap}%0A%0A_______________________________%0A*Mohon segera diproses dan informasikan nomor resi pengiriman. Terima kasih!*`;

    overlay.innerHTML = `
        <div style="background:white; padding:35px 25px; border-radius:30px; max-width:380px; width:100%; text-align:center; font-family:'Inter', sans-serif;">
            <div style="font-size:45px; margin-bottom:20px;">✅</div>
            <h2 style="color:#1a0033; margin:0; font-weight:800;">Pembayaran Berhasil!</h2>
            <p style="color:#64748b; margin-top:10px;">Data Pemesanan Anda telah tercatat di sistem kami.</p>
            <a href="https://wa.me/${ADMIN_WA}?text=${pesanWhatsApp}" target="_blank" style="display:block; background:#25D366; color:white; text-decoration:none; padding:18px; border-radius:15px; font-weight:bold; margin-top:20px;">KIRIM DATA KE WHATSAPP</a>
            <button onclick="location.reload()" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer;">Kembali ke Beranda</button>
        </div>`;
    document.body.appendChild(overlay);
}

function showLoginPrompt() {
    const overlay = document.createElement('div');
    overlay.id = "login-prompt-overlay";
    overlay.style.cssText = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10002; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
    overlay.innerHTML = `
        <div style="background:white; padding:30px 20px; border-radius:24px; max-width:320px; width:100%; text-align:center; font-family:'Inter', sans-serif;">
            <div style="font-size:40px; margin-bottom:15px;">🔒</div>
            <h3 style="margin:0 0 10px 0; color:#333; font-weight:800;">Otentikasi Diperlukan</h3>
            <p style="color:#666; font-size:0.9rem; line-height:1.4; margin:0 0 20px 0;">Silakan lakukan login akun Pi Network Anda terlebih dahulu sebelum bertransaksi.</p>
            <button onclick="document.getElementById('login-prompt-overlay').remove(); window.handleAuth();" style="background:#6748d7; color:white; border:none; padding:14px; width:100%; border-radius:12px; font-weight:bold; cursor:pointer;">Hubungkan Pi Wallet</button>
            <button onclick="document.getElementById('login-prompt-overlay').remove()" style="background:none; border:none; color:#999; margin-top:15px; cursor:pointer; font-size:0.85rem;">Nanti Saja</button>
        </div>`;
    document.body.appendChild(overlay);
}

function showAddressPrompt() {
    const overlay = document.createElement('div');
    overlay.id = "address-prompt-overlay";
    overlay.style.cssText = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10002; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
    overlay.innerHTML = `
        <div style="background:white; padding:30px 20px; border-radius:24px; max-width:320px; width:100%; text-align:center; font-family:'Inter', sans-serif;">
            <div style="font-size:40px; margin-bottom:15px;">📍</div>
            <h3 style="margin:0 0 10px 0; color:#333; font-weight:800;">Alamat Belum Lengkap</h3>
            <p style="color:#666; font-size:0.9rem; line-height:1.4; margin:0 0 20px 0;">Mohon isi data pengiriman logistik Anda agar item dapat kami kirimkan ke tujuan.</p>
            <button onclick="document.getElementById('address-prompt-overlay').remove(); window.showAddressForm();" style="background:#6748d7; color:white; border:none; padding:14px; width:100%; border-radius:12px; font-weight:bold; cursor:pointer;">Isi Alamat Sekarang</button>
        </div>`;
    document.body.appendChild(overlay);
}

// =========================================================================
// 6. SIDEBAR MENU & BANNER LOGIC
// =========================================================================
window.toggleMenu = () => {
    const nav = document.getElementById("sideNav");
    if (!nav) return;
    nav.style.width = (nav.style.width === "250px") ? "0px" : "250px";
};

window.toggleDropdown = () => {
    const dropdown = document.getElementById("aboutDropdown");
    const btn = document.querySelector(".dropdown-btn");
    if (!dropdown) return;
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        if(btn) btn.classList.remove("active");
    } else {
        dropdown.style.display = "block";
        if(btn) btn.classList.add("active");
    }
};

// =========================================================================
// 7. CORE PIPELINE (DOM LOAD INITIALIZATION)
// =========================================================================
document.addEventListener("DOMContentLoaded", async () => {
    // 🌟 1. LANGSUNG EKSEKUSI RENDER AGAR PRODUK TIDAK KOSONG
    renderProducts(productsData, 'main-grid');

    // 2. Hubungkan pipa pencarian input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filtered = productsData.filter(p => p.name.toLowerCase().includes(keyword) || p.category.toLowerCase().includes(keyword));
            const sResult = document.getElementById('search-results');
            if (!sResult) return;
            if (keyword === "") {
                sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #999; padding: 20px;">Cari produk premium favoritmu...</p>`;
            } else {
                renderProducts(filtered, 'search-results');
            }
        });
    }

    // 3. Deteksi klik di luar untuk menutup SideNav
    window.addEventListener('click', function(event) {
        const nav = document.getElementById("sideNav");
        const menuIcon = document.querySelector('.menu-icon');
        if (nav && nav.style.width === "250px" && menuIcon) {
            if (!nav.contains(event.target) && !menuIcon.contains(event.target)) {
                nav.style.width = "0px";
            }
        }
    });

    // 4. Rotasi Banner Otomatis
    const banners = [
        "https://i.ibb.co.com/0jLfN5Sq/Ubay.png", 
        "https://i.ibb.co.com/SwjWGRKm/ORANG-PERTAMA-20260205-094439-0000.png", 
        "https://i.ibb.co.com/Q5bxMN0/Banner-dpi.png", 
        "https://i.ibb.co.com/W4RZCvCL/ORANG-PERTAMA-20260205-080941-0000.png"
    ];
    let idx = 0;
    setInterval(() => { 
        const img = document.getElementById('banner-img');
        if(img) { idx = (idx + 1) % banners.length; img.src = banners[idx]; }
    }, 4000);

    // 5. Jalankan pipeline login otomatis Pi Network SDK
    await window.initPi();

    // 6. Bind tombol login manual awal sebelum ter-otentikasi
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn && !currentUser) {
        loginBtn.onclick = window.handleAuth;
    }
});

// =========================================================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// =========================================================================
let currentUser = null;
let cart = [];
let userAddress = { nama: "", telepon: "", alamatLengkap: "" };
let isPiInitialized = false; // Penanda status inisialisasi SDK Blockchain
const ADMIN_WA = "6281234567890"; // Silakan ganti dengan nomor WhatsApp Admin Anda

// Mock Data Produk (Pastikan ID unik dan format harga sesuai)
const productsData = [
    {
        id: "prod-001",
        name: "Smartphone Premium Pro Max 5G",
        price: 0.00050,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"],
        rating: "4.9",
        sold: 142,
        category: "elektronik",
        desc: "Spesifikasi Flagship tertinggi dengan kapasitas RAM 12GB, Internal 512GB. Mendukung jaringan Pi Decentralized Web3 secara instan."
    },
    {
        id: "prod-002",
        name: "Laptop Eksekutif Core i9 Ultrabook",
        price: 0.00120,
        discount: 5,
        images: ["https://images.unsplash.com/photo-1496181130204-755241524eab?w=500"],
        rating: "5.0",
        sold: 38,
        category: "elektronik",
        desc: "Laptop tipis premium untuk kebutuhan bisnis dan komputasi berat. Baterai tahan hingga 18 jam penggunaan aktif."
    },
    {
        id: "prod-003",
        name: "Jam Tangan Pintar Pro Chrono",
        price: 0.00015,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
        rating: "4.8",
        sold: 210,
        category: "aksesoris",
        desc: "Smartwatch dengan sensor kesehatan terlengkap: Detak jantung, EKG, tekanan darah, dan pelacak GPS terintegrasi."
    },
    {
        id: "prod-001",
        name: "Smartphone Premium Pro Max 5G",
        price: 0.00050,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"],
        rating: "4.9",
        sold: 142,
        category: "elektronik",
        desc: "Spesifikasi Flagship tertinggi dengan kapasitas RAM 12GB, Internal 512GB. Kamera 200MP Ultra-Vision dan baterai silikon-karbon tahan lama. Mendukung ekosistem Pi Decentralized Web3 secara instan."
    },
    {
        id: "prod-002",
        name: "Laptop Eksekutif Core i9 Ultrabook",
        price: 0.00120,
        discount: 5,
        images: ["https://images.unsplash.com/photo-1496181130204-755241524eab?w=500"],
        rating: "5.0",
        sold: 38,
        category: "elektronik",
        desc: "Laptop super tipis premium untuk kebutuhan bisnis, pemrograman, dan komputasi berat. Ditenagai prosesor Intel Core i9 generasi terbaru, RAM 32GB, dan layar OLED 4K BrightView. Baterai tahan hingga 18 jam penggunaan aktif."
    },
    {
        id: "prod-003",
        name: "Jam Tangan Pintar Pro Chrono",
        price: 0.00015,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
        rating: "4.8",
        sold: 210,
        category: "aksesoris",
        desc: "Smartwatch tangguh dengan material Titanium kelas militer. Memiliki sensor kesehatan terlengkap: pemantau detak jantung, EKG, tekanan darah, saturasi oksigen darah (SpO2), dan pelacak navigasi GPS dual-frekuensi terintegrasi."
    },
    {
        id: "prod-004",
        name: "Wireless Noise-Cancelling Headphones Pro",
        price: 0.00025,
        discount: 15,
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
        rating: "4.9",
        sold: 95,
        category: "elektronik",
        desc: "Nikmati kemurnian suara studio di mana saja dengan Active Noise Cancellation (ANC) adaptif terbaik kelasnya. Driver audio kustom menghasilkan bass bertenaga dan nada tinggi yang jernih. Dilengkapi busa memori premium yang sangat empuk."
    },
    {
        id: "prod-005",
        name: "Kamera Mirrorless Ultra HD 8K Cine",
        price: 0.00210,
        discount: 8,
        images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"],
        rating: "5.0",
        sold: 14,
        category: "elektronik",
        desc: "Alat tempur sempurna bagi konten kreator profesional dan sineas. Mampu merekam video berkualitas bioskop hingga resolusi 8K tanpa batas waktu. Dilengkapi sistem autofokus berbasis AI yang super cepat membidik objek bergerak."
    },
    {
        id: "prod-006",
        name: "Kacamata Pintar Augmented Reality (AR)",
        price: 0.00085,
        discount: 12,
        images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500"],
        rating: "4.7",
        sold: 43,
        category: "aksesoris",
        desc: "Melangkah ke masa depan metaverse dengan kacamata pintar AR stylish ini. Menampilkan navigasi *real-time*, notifikasi mengambang, penerjemah bahasa instan langsung di depan mata Anda, serta kamera dokumentasi HD tersembunyi."
    },
    {
        id: "prod-007",
        name: "Dompet Perangkat Keras Crypto (Hardware Wallet)",
        price: 0.00018,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500"],
        rating: "4.9",
        sold: 312,
        category: "aksesoris",
        desc: "Proteksi penuh aset digital dan koin Pi Network Anda dengan sistem keamanan enkripsi tingkat militer paling mutakhir. Perangkat offline (cold storage) ini mencegah risiko peretasan, phising, dan malware jaringan komputer secara total."
    },
    {
        id: "prod-008",
        name: "Tas Ransel Anti-Maling Premium Web3",
        price: 0.00011,
        discount: 20,
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
        rating: "4.8",
        sold: 520,
        category: "aksesoris",
        desc: "Ransel ergonomis tahan air yang dirancang khusus untuk para digital nomad. Dilengkapi ritsleting tersembunyi, slot pengunci nomor TSA, material antipotong, kompartemen laptop beludru, serta colokan charger USB eksternal yang praktis."
    },
    {
        id: "house-001",
        name: "The Beverly Hills Modern Mansion",
        price: 3.25000,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        rating: "4.8",
        sold: 20,
        category: "Rumah",
        desc: `• <b>Luas Tanah:</b> 2.500 m²<br>• <b>Kamar Tidur:</b> 7 Master Suite<br>• <b>Fasilitas:</b> Infinity Pool, Home Cinema, Wine Cellar<br>• <b>Lokasi:</b> Beverly Hills, California<br>• <b>Garasi:</b> Kapasitas 10 Mobil Mewah`
     },
    {
        id: "p1",
        name: "Smartphone Premium Pro Max XTRA",
        price: 0.00050,
        category: "gadget",
        discount: "-10%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.9,
        terjual: 142,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p2",
        name: "Laptop Eksekutif Core i9 Ultrabook",
        price: 0.00120,
        category: "elektronik",
        discount: "-5%",
        badge: "XTRA Gratis Ongkir+",
        rating: 5.0,
        terjual: 38,
        images: ["https://images.unsplash.com/photo-1496181130204-755241524eab?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p3",
        name: "Jam Tangan Pintar Pro Chrono",
        price: 0.00015,
        category: "aksesoris",
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.8,
        terjual: 95,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p4",
        name: "Wireless Earbuds Noise Cancelling Pro",
        price: 0.00008,
        category: "gadget",
        discount: "-15%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.7,
        terjual: 210,
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p5",
        name: "Tablet Pro 11-inch Super AMOLED",
        price: 0.00045,
        category: "gadget",
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.9,
        terjual: 64,
        images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p6",
        name: "Kamera Mirrorless 4K Ultra HD",
        price: 0.00150,
        category: "elektronik",
        discount: "-8%",
        badge: "XTRA Gratis Ongkir+",
        rating: 5.0,
        terjual: 19,
        images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p7",
        name: "Mechanical Keyboard RGB Wireless",
        price: 0.00007,
        category: "aksesoris",
        discount: "-12%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.8,
        terjual: 115,
        images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p8",
        name: "Gaming Mouse Ergonomis 16000 DPI",
        price: 0.00004,
        category: "aksesoris",
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.6,
        terjual: 180,
        images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p9",
        name: "Smart TV 4K LED 55-inch",
        price: 0.00095,
        category: "elektronik",
        discount: "-20%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.9,
        terjual: 42,
        images: ["https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p10",
        name: "Kopi Mesin Espresso Otomatis",
        price: 0.00035,
        category: "elektronik",
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.8,
        terjual: 53,
        images: ["https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p11",
        name: "Kacamata Hitam Polarized Aviator",
        price: 0.00003,
        category: "fashion",
        discount: "-5%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.5,
        terjual: 320,
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p12",
        name: "Tas Ransel Eksklusif Anti Air",
        price: 0.00006,
        category: "fashion",
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.7,
        terjual: 245,
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p13",
        name: "Sepatu Sneakers Running Pro Fly",
        price: 0.00012,
        category: "fashion",
        discount: "-10%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.8,
        terjual: 198,
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p14",
        name: "Air Purifier HEPA Filter Pintar",
        price: 0.00022,
        category: "elektronik",
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.9,
        terjual: 77,
        images: ["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p15",
        name: "Powerbank Fast Charging 30000mAh",
        price: 0.00003,
        category: "aksesoris",
        discount: "-15%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.6,
        terjual: 412,
        images: ["https://images.unsplash.com/photo-1609592424109-dd9892f1b177?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p16",
        name: "Speaker Bluetooth Bass Booster HD",
        price: 0.00009,
        category: "elektronik",
        discount: "-8%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.7,
        terjual: 156,
        images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p17",
        name: "Drone Quadcopter 4K GPS Pro",
        price: 0.00085,
        category: "elektronik",
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.9,
        terjual: 23,
        images: ["https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p18",
        name: "Lampu Meja Belajar Cerdas LED",
        price: 0.00003,
        category: "aksesoris",
        discount: "-25%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.5,
        terjual: 289,
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p19",
        name: "Gimbal Stabilizer Smartphone 3-Axis",
        price: 0.00014,
        category: "aksesoris",
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.7,
        terjual: 84,
        images: ["https://images.unsplash.com/photo-1584438784894-089d6a128f3e?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "p20",
        name: "Mikrofon Kondensor Podcast Pro",
        price: 0.00008,
        category: "elektronik",
        discount: "-10%",
        badge: "XTRA Gratis Ongkir+",
        rating: 4.8,
        terjual: 132,
        images: ["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop&q=60"]
    },
    {
        id: "house-001",
        category: "Rumah",
        name: "The Beverly Hills Modern Mansion",
        price: 3.25000,
        discount: null,
        badge: "Premium Pro",
        rating: 5.0,
        terjual: 1,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Luas Tanah:</b> 2.500 m²<br>• <b>Kamar Tidur:</b> 7 Master Suite<br>• <b>Fasilitas:</b> Infinity Pool, Home Cinema, Wine Cellar<br>• <b>Lokasi:</b> Beverly Hills, California<br>• <b>Garasi:</b> Kapasitas 10 Mobil Mewah`
    },
    {
        id: "house-002",
        category: "Rumah",
        name: "Zen Waterfront Villa",
        price: 3.18000,
        discount: null,
        badge: "Premium Pro",
        rating: 4.9,
        terjual: 2,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Pemandangan:</b> Akses Langsung ke Danau Privasi<br>• <b>Gaya:</b> Arsitektur Minimalis Modern<br>• <b>Fasilitas:</b> Dermaga Pribadi, Spa & Sauna, Gym<br>• <b>Sistem:</b> Full Smart Home Technology<br>• <b>Keamanan:</b> Biometric Entry System`
    },
    {
        id: "house-003",
        category: "Rumah",
        name: "Penthouse Skyline Duplex",
        price: 2.12000,
        discount: null,
        badge: "Best Seller",
        rating: 5.0,
        terjual: 1,
        images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lantai:</b> Lantai 50 & 51 (Top Floor)<br>• <b>Pemandangan:</b> 360° City Skyline View<br>• <b>Interior:</b> Marmer Italia & Panel Emas<br>• <b>Fasilitas:</b> Private Rooftop Garden & Jacuzzi<br>• <b>Layanan:</b> 24/7 Concierge Service`
    },
    {
        id: "house-005",
        category: "Rumah",
        name: "Tropical Cliffside Sanctuary",
        price: 4.15500,
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 5.0,
        terjual: 1,
        images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> Tebing Uluwatu, Bali<br>• <b>Konsep:</b> Open Living Space with Ocean View<br>• <b>Fasilitas:</b> Private Beach Access, Deck Yoga<br>• <b>Struktur:</b> Kayu Ulin & Batu Alam Lokal<br>• <b>Kamar:</b> 5 Suite dengan Semi-Outdoor Bathroom`
    },
    {
        id: "house-008",
        category: "Rumah",
        name: "The Glass House Estate",
        price: 3.21000,
        discount: null,
        badge: "Unique Design",
        rating: 4.8,
        terjual: 3,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Material Dominan:</b> Kaca Tempered & Baja Hitam<br>• <b>Privasi:</b> Smart Glass (Bisa Buram Otomatis)<br>• <b>Lansekap:</b> Koi Pond Keliling Bangunan<br>• <b>Ruang:</b> Galeri Seni Pribadi & Studio Musik<br>• <b>Luas:</b> Kavling Sudut 3.000 m²`
    },
    {
        id: "house-009",
        category: "Rumah",
        name: "Mediterranean Seafront Palace",
        price: 3.28000,
        discount: null,
        badge: "Luxury Pro",
        rating: 5.0,
        terjual: 1,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> French Riviera (Cote d'Azur)<br>• <b>Atap:</b> Terakota Tradisional Spanyol<br>• <b>Taman:</b> Kebun Zaitun & Citrus<br>• <b>Fasilitas:</b> Lapangan Tenis Pribadi, Helipad<br>• <b>Kamar Mandi:</b> Perlengkapan Emas 24 Karat`
    },
    {
        id: "house-010",
        category: "Rumah",
        name: "The Urban Luxury Loft",
        price: 2.08800,
        discount: null,
        badge: "Modern Tech",
        rating: 4.7,
        terjual: 4,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Tipe:</b> Industrial Luxury Loft<br>• <b>Tinggi Plafon:</b> 6 Meter (Double Height Ceiling)<br>• <b>Fitur:</b> Tangga Melingkar Besi Kustom<br>• <b>Lokasi:</b> Pusat Distrik Finansial<br>• <b>Sistem:</b> Voice Controlled Home Automation`
    },
    {
        id: "house-011",
        category: "Rumah",
        name: "The Floating Diamond Villa",
        price: 2.19500,
        discount: null,
        badge: "Oceanic Pro",
        rating: 5.0,
        terjual: 1,
        images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 550 m² (Struktur Terapung)<br>• <b>Lokasi:</b> Maladewa (Private Lagoon)<br>• <b>Fitur:</b> Kamar Tidur Bawah Laut, Dek Berjemur 360°<br>• <b>Material:</b> Kaca Anti-Karat & Kayu Jati Reklamasi<br>• <b>Energi:</b> Kemandirian Energi dengan Panel Surya Laut`
    },
    {
        id: "house-013",
        category: "Rumah",
        name: "Cyber-Tech Underground Bunker",
        price: 3.16000,
        discount: null,
        badge: "Futuristic",
        rating: 4.9,
        terjual: 2,
        images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 900 m² (Kedalaman 15 Meter)<br>• <b>Keamanan:</b> Pintu Anti-Ledakan, Sistem Filtrasi Udara Nuklir<br>• <b>Fasilitas:</b> Kebun Hidroponik Indoor, Simulator Golf<br>• <b>Teknologi:</b> AI Butler terintegrasi ke seluruh ruangan<br>• <b>Lantai:</b> Epoxy Resin Anti-Statis & Dinding Beton Ekspos`
    },
    {
        id: "house-014",
        category: "Rumah",
        name: "Aspen Snow Peak Lodge",
        price: 3.13500,
        discount: null,
        badge: "Winter Comfort",
        rating: 4.9,
        terjual: 1,
        images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 3.500 m² / LB 700 m²<br>• <b>Lokasi:</b> Aspen, Colorado (Ski-in/Ski-out Access)<br>• <b>Fitur:</b> Perapian Batu Alam Raksasa, Kolam Air Hangat Outdoor<br>• <b>Material:</b> Kayu Pinus Tua & Batu Granit Pegunungan<br>• <b>Ruangan:</b> Ruang Simpan Perlengkapan Ski Khusus`
    },
    {
        id: "house-015",
        category: "Rumah",
        name: "Mediterranean Cliff Villa",
        price: 3.27000,
        discount: null,
        badge: "Luxury Pro",
        rating: 5.0,
        terjual: 2,
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 2.200 m² / LB 950 m²<br>• <b>Pemandangan:</b> Laut Mediterania (Amalfi Coast)<br>• <b>Fasilitas:</b> Lift Tebing Pribadi, Bar Tepi Kolam, Bioskop Terbuka<br>• <b>Interior:</b> Keramik Hand-Painted Italia & Furnitur Putih Bersih<br>• <b>Lanskap:</b> Kebun Vertikal & Pohon Lemon`
    },
    {
        id: "house-016",
        category: "Rumah",
        name: "The Brutalist Cube Estate",
        price: 3.11000,
        discount: null,
        badge: "Artistic Design",
        rating: 4.6,
        terjual: 5,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 1.500 m² / LB 800 m²<br>• <b>Gaya:</b> Brutalisme Kontemporer (Raw Concrete)<br>• <b>Ruangan:</b> Studio Lukis & Ruang Musik Kedap Suara<br>• <b>Fitur:</b> Skylight Masif di Tengah Rumah<br>• <b>Sistem:</b> Smart Lighting System yang mengikuti ritme sirkadian`
    },
    {
        id: "house-017",
        category: "Rumah",
        name: "Amazonian Eco-Mansion",
        price: 3.14500,
        discount: null,
        badge: "Eco-Friendly",
        rating: 4.8,
        terjual: 3,
        images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 10.000 m² / LB 650 m² (Floating on stilts)<br>• <b>Konsep:</b> Regenerative Architecture (Mandiri Air & Limbah)<br>• <b>Fitur:</b> Dinding Tanaman Hidup, Kolam Renang Air Hujan<br>• <b>Material:</b> Bambu Laminasi & Atap Daun Rumbia Sintetis<br>• <b>Lokasi:</b> Hutan Lindung Tropis`
    },
    {
        id: "house-019",
        category: "Rumah",
        name: "Dubai Sky-High Villa",
        price: 4.35000,
        discount: null,
        badge: "Ultra Luxury",
        rating: 5.0,
        terjual: 1,
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 1.100 m² (Penthouse 3 Lantai)<br>• <b>Fasilitas:</b> Kolam Renang Kaca Gantung, Helipad Gedung<br>• <b>Interior:</b> Aksen Emas 24K & Kristal Baccarat<br>• <b>Pemandangan:</b> Burj Khalifa & Palm Jumeirah<br>• <b>Layanan:</b> Private Chef & Sopir Rolls-Royce`
    },
    {
        id: "house-020",
        category: "Rumah",
        name: "The Vineyard Ranch Estate",
        price: 2.17500,
        discount: null,
        badge: "Classic Ranch",
        rating: 4.9,
        terjual: 2,
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 15 Hektar / LB 1.300 m²<br>• <b>Fitur:</b> Perkebunan Anggur Pribadi, Pabrik Pengolahan Wine<br>• <b>Fasilitas:</b> Lapangan Berkuda, Kandang Kuda Premium<br>• <b>Interior:</b> Gaya Farmhouse Modern dengan Kayu Oak Ekspos<br>• <b>Dapur:</b> Outdoor BBQ Station & Pizza Wood-Oven`
    },
    {
        id: "house-smart",
        category: "Rumah",
        name: "Smart Home System Pro",
        price: 0.50000,
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.8,
        terjual: 45,
        images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"],
        desc: `• <b>Tipe:</b> Paket Instalasi Smart Home IoT<br>• <b>Fitur:</b> Kendali Penuh via Suara & Aplikasi Browser<br>• <b>Keamanan:</b> Integrasi Jaringan Enkripsi Ekosistem Pi`
    },
    {
        id: "house-sofa",
        category: "Rumah",
        name: "Sofa Minimalis 2 Seater - Modern Grey",
        price: 0.05000,
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.7,
        terjual: 88,
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"],
        desc: `• <b>Dimensi:</b> Ukuran Presisi 150 cm x 80 cm<br>• <b>Material:</b> Kain Premium Breathable & Busa Tahan Kempes<br>• <b>Desain:</b> Sangat Estetik untuk Ruang Tamu Minimalis`
    },
    {
        id: "house-lamp",
        category: "Rumah",
        name: "Lampu Gantung Industrial - Model Black Dome",
        price: 0.01500,
        discount: null,
        badge: "Dekorasi",
        rating: 4.6,
        terjual: 124,
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"],
        desc: `• <b>Spesifikasi:</b> Lampu Plafon Dekoratif Diameter 30 cm<br>• <b>Kesan Gaya:</b> Tampilan Estetik Industrial Kontemporer<br>• <b>Aplikasi:</b> Ideal untuk Cafe, Dapur, mau pun Ruang Kerja`
    },
    {
        id: "house-bookshelf",
        category: "Rumah",
        name: "Rak Buku Kayu 5 Tingkat - Slim Design",
        price: 0.03000,
        discount: null,
        badge: "Furniture",
        rating: 4.7,
        terjual: 62,
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"],
        desc: `• <b>Dimensi:</b> Tinggi 180 cm / Lebar Efisien 40 cm<br>• <b>Fitur:</b> Struktur Kokoh, Sangat Mudah Dirakit Sendiri<br>• <b>Fungsi:</b> Maksimalkan Penyimpanan Buku di Ruang Terbatas`
    },
    {
        id: "house-carpet",
        category: "Rumah",
        name: "Karpet Bulu Lembut 160x210 - Creamy White",
        price: 0.01200,
        discount: null,
        badge: "XTRA Gratis Ongkir+",
        rating: 4.8,
        terjual: 215,
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"],
        desc: `• <b>Spesifikasi:</b> Karpet Lantai Premium Ukuran 160 cm x 210 cm<br>• <b>Kelebihan:</b> Tekstur Sangat Lembut & Mudah Dibersihkan<br>• <b>Nuansa:</b> Menghadirkan Kesan Hangat di Dalam Kamar`
    },
    {
        id: "house-curtain",
        category: "Rumah",
        name: "Set Gorden Jendela - Model Smokering Minimalis",
        price: 0.00800,
        discount: null,
        badge: "Dekorasi",
        rating: 4.5,
        terjual: 340,
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"],
        desc: `• <b>Spesifikasi:</b> Kain Gorden Blackout Ukuran 140 cm x 220 cm<br>• <b>Performa:</b> Efektif Menghalau Sinar Matahari Hingga 90%<br>• <b>Desain:</b> Model Smokering Ringkas & Elegan`
    },
    {
        id: "house-clock",
        category: "Rumah",
        name: "Jam Dinding Kayu - Tipe Scandinavian",
        price: 0.00500,
        discount: null,
        badge: "Aksesoris",
        rating: 4.7,
        terjual: 195,
        images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"],
        desc: `• <b>Spesifikasi:</b> Jam Dinding Estetik Kayu Diameter 35 cm<br>• <b>Mesin:</b> Tipe Sweep Movement (Jarum Berputar Senyap)<br>• <b>Kelebihan:</b> Memberikan Sentuhan Minimalis Tanpa Suara`
    },
    {
        id: "house-plant",
        category: "Rumah",
        name: "Tanaman Hias Artificial - Model Monstera Large",
        price: 0.01000,
        discount: null,
        badge: "Dekorasi",
        rating: 4.8,
        terjual: 150,
        images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"],
        desc: `• <b>Spesifikasi:</b> Tanaman Imitasi Presisi Tinggi 80 cm<br>• <b>Kelengkapan:</b> Dilengkapi Pot Keramik Kokoh<br>• <b>Manfaat:</b> Hadirkan Nuansa Hijau Asri Tanpa Perawatan`
    },

    // -----------------------------------------------------------------
    // KATEGORI: HERBAL & KESEHATAN
    // -----------------------------------------------------------------
    {
        id: "herbal-002",
        category: "Herbal",
        name: "COCO Pro Kunyit",
        price: 0.00006,
        discount: "-5%",
        badge: "Immune Support",
        rating: 4.9,
        terjual: 530,
        images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"],
        desc: `• <b>Jenis:</b> Superfood Biotech Masa Depan<br>• <b>Kandungan:</b> 10 Multi-Strain Probiotik, Madu Alami, Air Kelapa, Kurma, Kunyit<br>• <b>Khasiat:</b> Formula Live Probiotic, Immune Support, Tinggi Antioksidan, Memperbaiki Pencernaan & Penambah Energi Alami`
    },
    {
        id: "herbal-003",
        category: "Herbal",
        name: "An-Nisa",
        price: 0.00010,
        discount: "-5%",
        badge: "Women Care",
        rating: 4.9,
        terjual: 412,
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"],
        desc: `• <b>Fungsi:</b> Solusi Lengkap Problem Kewanitaan<br>• <b>Khasiat Utama:</b> Mengatasi Keputihan & Gatal, Membunuh Bakteri, Melancarkan Menstruasi, Redakan Nyeri Haid<br>• <b>Proteksi:</b> Mencegah Kanker Rahim, Mioma/Kista, Merapatkan, Mengencangkan, serta Menyeimbangkan Hormon`
    },
    {
        id: "herbal-004",
        category: "Herbal",
        name: "Ar-Rizal",
        price: 0.00010,
        discount: "-5%",
        badge: "Men Stamina",
        rating: 5.0,
        terjual: 620,
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"],
        desc: `• <b>Fungsi:</b> Suplemen Kesehatan & Stamina Pria<br>• <b>Khasiat Utama:</b> Menguatkan & Mengencangkan Vitalitas, Meningkatkan Gairah & Kualitas Hormon, Mengatasi Ejakulasi Dini<br>• <b>Manfaat Medis:</b> Menguatkan Jantung & Melancarkan Sirkulasi Darah ke Alat Vital`
    },
    {
        id: "herbal-006",
        category: "Herbal",
        name: "Nabidz Dessert",
        price: 0.00012,
        discount: null,
        badge: "Microbiome Pro",
        rating: 4.8,
        terjual: 185,
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"],
        desc: `• <b>Bahan Baku:</b> Fermentasi Esterifikasi Biokimia Anggur Merah Murni<br>• <b>Proses:</b> Teknik Istihalah Microbiome & Asam Organik Kompleks<br>• <b>Fokus Utama:</b> Mengoptimalkan Pencernaan (Pusat 90% Sistem Imun Tubuh)`
// -----------------------------------------------------------------
    // KATEGORI: MOTOR
    // -----------------------------------------------------------------
    {
        id: "bike-001",
        name: "Ducati Panigale V4 R",
        price: 0.01500,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"],
        rating: "5.0",
        sold: 1,
        category: "Motor",
        desc: "Mesin: 998cc Desmosedici Stradale V4 R. Tenaga: 218 HP @ 15.500 RPM. Fitur: Sayap Karbon (Aero Winglets), Öhlins Suspension."
    },
    {
        id: "bike-002",
        name: "Kawasaki Ninja H2R (Track Only)",
        price: 0.01800,
        discount: 0,
        images: ["https://i.ibb.co.com/jZ6LvJTB/Desain-tanpa-judul-20260207-131613-0000.png"],
        rating: "5.0",
        sold: 1,
        category: "Motor",
        desc: "Mesin: 998cc In-line Four with Supercharger. Tenaga: 310 HP (Paling bertenaga di dunia). Top Speed: 400+ km/jam."
    },
    {
        id: "bike-003",
        name: "BMW M 1000 RR",
        price: 0.01250,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80"],
        rating: "5.0",
        sold: 2,
        category: "Motor",
        desc: "Mesin: 999cc Water-cooled Inline 4-Cylinder. Fitur M: Velg Karbon M, Kursi M, Knalpot Akrapovic Titanium."
    },
    {
        id: "bike-004",
        name: "Harley-Davidson CVO Road Glide",
        price: 0.01400,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"],
        rating: "4.9",
        sold: 2,
        category: "Motor",
        desc: "Mesin: Milwaukee-Eight® VVT 121 (1.977cc). Gaya: Grand American Touring Luxury."
    },
    {
        id: "bike-005",
        name: "MV Agusta Rush 1000 cc",
        price: 0.01650,
        discount: 0,
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        rating: "5.0",
        sold: 1,
        category: "Motor",
        desc: "Konsep: Hyper-Naked Drag Bike Luxury. Mesin: 998cc 16-valve DOHC Inline 4."
    },
    {
        id: "bike-006",
        name: "Aprilia RSV4 Xtrenta",
        price: 0.01900,
        discount: 0,
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        rating: "5.0",
        sold: 1,
        category: "Motor",
        desc: "Teknologi: MotoGP Derived Aerodynamics. Mesin: 1.099cc V4 Longitudinal 65°."
    },
    {
        id: "bike-007",
        name: "Triumph Rocket 3 TFC",
        price: 0.00950,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80"],
        rating: "4.8",
        sold: 3,
        category: "Motor",
        desc: "Mesin: 2.458cc (Mesin motor terbesar di dunia). Torsi: 225 Nm (Akselerasi instan)."
    },
    {
        id: "bike-008",
        name: "Arch Motorcycle KRGT-1",
        price: 0.02500,
        discount: 0,
        images: ["https://i.ibb.co.com/d4dwYps4/Desain-tanpa-judul-20260207-132911-0000.png"],
        rating: "5.0",
        sold: 1,
        category: "Motor",
        desc: "Pembuat: Co-founded by Keanu Reeves. Mesin: 2.032cc S&S Cycle V-Twin."
    },
    {
        id: "bike-010",
        name: "Honda Gold Wing Tour DCT",
        price: 0.00850,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"],
        rating: "4.9",
        sold: 5,
        category: "Motor",
        desc: "Mesin: 1.833cc Liquid-cooled 6-cylinder Boxer. Transmisi: 7-speed Automatic Dual Clutch (DCT)."
    },

    // -----------------------------------------------------------------
    // KATEGORI: MOBIL
    // -----------------------------------------------------------------
    {
        id: "car-001",
        name: "Toyota Fortuner 2.8 GR Sport 2024",
        price: 0.15000,
        discount: 5,
        images: ["https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1000&auto=format&fit=crop"],
        rating: "4.9",
        sold: 14,
        category: "Mobil",
        desc: "Mesin: 2.800 cc Diesel Turbo. Transmisi: Otomatis 6-Speed. Tenaga: 203.9 PS / 500 Nm."
    },
    {
        id: "car-002",
        name: "Honda CR-V 2.0 RS e:HEV Hybrid 2024",
        price: 0.18500,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1000&auto=format&fit=crop"],
        rating: "5.0",
        sold: 8,
        category: "Mobil",
        desc: "Mesin: 2.0L i-VTEC + Electric Motor (Hybrid). Transmisi: e-CVT. Fitur: Panoramic Sunroof & BOSE Audio."
    },
    {
        id: "car-003",
        name: "Rolls-Royce Phantom Series II",
        price: 0.15000,
        discount: 0,
        images: ["https://i.ibb.co.com/7xshksJQ/Desain-tanpa-judul-20260207-114554-0000.png"],
        rating: "5.0",
        sold: 1,
        category: "Mobil",
        desc: "Mesin: 6.75L V12 Twin-Turbo. Fitur: Starlight Headliner, Magic Carpet Ride."
    },
    {
        id: "car-004",
        name: "Lamborghini Aventador SVJ",
        price: 0.08500,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80"],
        rating: "5.0",
        sold: 2,
        category: "Mobil",
        desc: "Mesin: 6.5L V12 Naturally Aspirated. Akselerasi: 0-100 km/h dalam 2.8 detik."
    },
    {
        id: "car-005",
        name: "Bentley Continental GT Mulliner",
        price: 0.06500,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80"],
        rating: "4.9",
        sold: 3,
        category: "Mobil",
        desc: "Mesin: 6.0L W12 TSI Twin-Turbo. Interior: Diamond-in-Diamond Quilting."
    },
    {
        id: "car-006",
        name: "Ferrari SF90 Stradale",
        price: 0.09200,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80"],
        rating: "5.0",
        sold: 1,
        category: "Mobil",
        desc: "Sistem: Plug-in Hybrid AWD. Mesin: 4.0L V8 Turbo + 3 Motor Listrik."
    },
    {
        id: "car-007",
        name: "Mercedes-Maybach S-Class S680",
        price: 0.04500,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"],
        rating: "4.9",
        sold: 6,
        category: "Mobil",
        desc: "Mesin: 6.0L V12 Biturbo. Kursi: Executive Rear Seats with Massage Function."
    },
    {
        id: "car-008",
        name: "Porsche 911 GT3 RS",
        price: 0.05800,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"],
        rating: "5.0",
        sold: 4,
        category: "Mobil",
        desc: "Mesin: 4.0L Naturally Aspirated Boxer-6. Sayap: Active Rear Wing with DRS."
    },
    {
        id: "car-009",
        name: "Aston Martin DBS Volante",
        price: 0.07200,
        discount: 0,
        images: ["https://i.ibb.co.com/GvnNVhbt/Desain-tanpa-judul-20260207-115657-0000.png"],
        rating: "4.8",
        sold: 2,
        category: "Mobil",
        desc: "Konfigurasi: Convertible. Mesin: 5.2L V12 Twin-Turbo."
    },
    {
        id: "car-0010",
        name: "Bugatti Chiron Super Sport",
        price: 0.25000,
        discount: 0,
        images: ["https://i.ibb.co.com/mFMXn0VQ/Desain-tanpa-judul-20260207-120754-0000.png"],
        rating: "5.0",
        sold: 1,
        category: "Mobil",
        desc: "Mesin: 8.0L W16 Quad-Turbocharged. Tenaga: 1.600 PS (1.578 HP)."
    },
    {
        id: "car-0011",
        name: "McLaren 720S Spider",
        price: 0.06800,
        discount: 0,
        images: ["https://i.ibb.co.com/KjcpvFzt/Desain-tanpa-judul-20260207-121412-0000.png"],
        rating: "4.9",
        sold: 3,
        category: "Mobil",
        desc: "Mesin: 4.0L V8 Twin-Turbo. Sasis: Monocage II-S Carbon Fiber."
    },
    {
        id: "car-0012",
        name: "Range Rover SV Autobiography",
        price: 0.04000,
        discount: 0,
        images: ["https://i.ibb.co.com/zV8hJbjn/Desain-tanpa-judul-20260207-122051-0000.png"],
        rating: "4.9",
        sold: 5,
        category: "Mobil",
        desc: "Tipe: Long Wheelbase Luxury SUV. Mesin: 5.0L Supercharged V8."
    },

    // -----------------------------------------------------------------
    // KATEGORI: EMAS
    // -----------------------------------------------------------------
    {
        id: "gold-001",
        name: "Emas Antam Logam Mulia 1 Gram",
        price: 0.00015,
        discount: 0,
        images: ["https://i.ibb.co.com/WW2GjHH3/Desain-tanpa-judul-20260207-134044-0000.png"],
        rating: "4.9",
        sold: 1250,
        category: "Emas",
        desc: "Berat: 1 Gram. Kemurnian: 999.9 (24 Karat). Fitur: QR Code CertiEye."
    },
    {
        id: "gold-002",
        name: "Emas Antam Logam Mulia 2 Gram",
        price: 0.00029,
        discount: 0,
        images: ["https://i.ibb.co.com/WWSt12zP/Desain-tanpa-judul-20260207-134711-0000.png"],
        rating: "4.9",
        sold: 620,
        category: "Emas",
        desc: "Berat: 2 Gram. Kemurnian: Fine Gold 999.9."
    },
    {
        id: "gold-003",
        name: "Emas Antam Logam Mulia 5 Gram",
        price: 0.00072,
        discount: 0,
        images: ["https://i.ibb.co.com/JW7Tk9kZ/Desain-tanpa-judul-20260207-141911-0000.png"],
        rating: "4.9",
        sold: 430,
        category: "Emas",
        desc: "Berat: 5 Gram. Kemurnian: 99.99% Emas Murni."
    },
    {
        id: "gold-004",
        name: "Emas Antam Logam Mulia 10 Gram",
        price: 0.00142,
        discount: 0,
        images: ["https://i.ibb.co.com/qMTw7ZPb/Desain-tanpa-judul-20260207-142456-0000.png"],
        rating: "5.0",
        sold: 215,
        category: "Emas",
        desc: "Berat: 10 Gram. Sertifikat: LBMA (London Bullion Market)."
    },
    {
        id: "gold-005",
        name: "Emas Antam Logam Mulia 25 Gram",
        price: 0.00350,
        discount: 0,
        images: ["https://i.ibb.co.com/K8jSt3G/Desain-tanpa-judul-20260207-145416-0000.png"],
        rating: "4.9",
        sold: 95,
        category: "Emas",
        desc: "Berat: 25 Gram. Sertifikat: Akreditasi KAN."
    },
    {
        id: "gold-006",
        name: "Emas Antam Logam Mulia 50 Gram",
        price: 0.00690,
        discount: 0,
        images: ["https://i.ibb.co.com/GvbphD6M/Desain-tanpa-judul-20260207-143702-0000.png"],
        rating: "5.0",
        sold: 48,
        category: "Emas",
        desc: "Berat: 50 Gram. Kemurnian: 24 Karat (99.99%)."
    },
    {
        id: "gold-007",
        name: "Emas Antam Logam Mulia 100 Gram",
        price: 0.01370,
        discount: 0,
        images: ["https://i.ibb.co.com/PzwYFNZ8/Desain-tanpa-judul-20260207-150017-0000.png"],
        rating: "5.0",
        sold: 22,
        category: "Emas",
        desc: "Berat: 100 Gram. Nilai: Instrumen lindung nilai terbaik."
    },
    {
        id: "gold-010",
        name: "Emas Antam Logam Mulia 250 Gram",
        price: 0.03400,
        discount: 0,
        images: ["https://i.ibb.co.com/hx080kjJ/Desain-tanpa-judul-20260207-150526-0000.png"],
        rating: "5.0",
        sold: 7,
        category: "Emas",
        desc: "Berat: 250 Gram. Bentuk: Cast Bar (Emas Tuang)."
    },
    {
        id: "gold-011",
        name: "Emas Antam Logam Mulia 500 Gram",
        price: 0.06400,
        discount: 0,
        images: ["https://i.ibb.co.com/hx080kjJ/Desain-tanpa-judul-20260207-150526-0000.png"],
        rating: "5.0",
        sold: 3,
        category: "Emas",
        desc: "Berat: 500 Gram. Bentuk: Cast Bar Premium."
    },

    // -----------------------------------------------------------------
    // KATEGORI: GADGET
    // -----------------------------------------------------------------
    {
        id: "gadget-001",
        name: "iPhone 15 Pro Max 512GB",
        price: 0.00250,
        discount: 0,
        images: ["https://i.ibb.co.com/kgxjnpyp/Desain-tanpa-judul-20260207-181545-0000.png"],
        rating: "4.9",
        sold: 85,
        category: "Gadget",
        desc: "Layar: 6.7\" Super Retina XDR OLED. Chipset: A17 Pro (3nm). Material: Titanium Grade 5."
    },
    {
        id: "gadget-002",
        name: "Samsung Galaxy S24 Ultra",
        price: 0.00235,
        discount: 0,
        images: ["https://i.ibb.co.com/RprpNpf6/Desain-tanpa-judul-20260207-182139-0000.png"],
        rating: "4.9",
        sold: 92,
        category: "Gadget",
        desc: "Layar: 6.8\" Dynamic LTPO AMOLED 2X. AI: Galaxy AI (Circle to Search)."
    }
    ];
// =========================================================================
// 2. PI BLOCKCHAIN CORE INITIALIZATION (LOGIN OTOMATIS)
// =========================================================================
async function initPi() {
    try {
        if (window.Pi) {
            console.log("Pi SDK Terdeteksi. Menginisialisasi...");
            
            // 1. Daftarkan konfigurasi aplikasi sandbox/production
            await window.Pi.init({ version: "2.0", sandbox: false });
            isPiInitialized = true; 
            console.log("Pi SDK Berhasil Diinisialisasi.");
            
            // 2. Trigger autentikasi otomatis secara background
            const scopes = ['username', 'payments'];
            const auth = await window.Pi.authenticate(scopes, (payment) => {
                handleIncompletePayment(payment);
            });
            
            // Jika berhasil masuk secara otomatis
            currentUser = auth.user;
            console.log("Login Otomatis Berhasil:", currentUser.username);
            
            // Update UI Profil
            const profileDisplay = document.getElementById('profile-username') || document.querySelector('.username-text');
            if (profileDisplay) profileDisplay.innerText = currentUser.username;

            const profileAddress = document.getElementById('profile-address');
            if (profileAddress) profileAddress.innerText = currentUser.uid;

            // Atur tombol utama menjadi LOGOUT jika auto-login sukses
            configureLogoutButton();
        } else {
            console.warn("Membuka di luar Pi Browser. Fitur blockchain dinonaktifkan sementara.");
        }
    } catch (err) {
        console.error("Gagal Autentikasi Otomatis:", err);
        isPiInitialized = false;
    }
}

// Fungsi Wajib dari Pi Core Team untuk menyelesaikan transaksi yang menggantung (Incomplete Payment)
async function handleIncompletePayment(payment) {
    console.log("Menangani pembayaran gantung ditemukan:", payment.identifier);
    try {
        await fetch('https://www.ptdigitalproindo.com/api/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
        });
        console.log("Pembayaran gantung berhasil diselesaikan secara otomatis.");
    } catch (err) {
        console.error("Gagal menyelesaikan pembayaran gantung:", err);
    }
}

// Helper untuk menyetel tombol logout secara aman tanpa duplikasi event listener
function configureLogoutButton() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = null; 
        loginBtn.innerText = "LOGOUT";
        loginBtn.style.background = "linear-gradient(to right, #ef4444, #b91c1c)";
        
        const logoutAction = (e) => {
            e.preventDefault();
            e.stopPropagation();
            location.reload(); 
        };
        
        const newLoginBtn = loginBtn.cloneNode(true);
        newLoginBtn.addEventListener('click', logoutAction);
        if(loginBtn.parentNode) {
            loginBtn.parentNode.replaceChild(newLoginBtn, loginBtn);
        }
    }
}

// =========================================================================
// 3. PI AUTHENTICATION SYSTEMS (MANUAL RESIGN-IN LOGIC)
// =========================================================================
window.handleAuth = async () => {
    if (!isPiInitialized) {
        const tempOverlay = document.createElement('div');
        tempOverlay.style.cssText = "display:flex; justify-content:center; align-items:center; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); z-index:99999; font-family:'Inter', sans-serif;";
        tempOverlay.innerHTML = `
            <div style="background:#0b2135; border:2px solid #FFD700; padding:25px; border-radius:20px; text-align:center; max-width:280px;">
                <div style="font-size:30px; animation: spin 2s linear infinite;">🔄</div>
                <h4 style="color:#FFD700; margin:10px 0 5px;">Sinkronisasi Jaringan</h4>
                <p style="color:#fff; font-size:0.8rem; margin:0;">Menghubungkan ke Pi Blockchain Core. Mohon tunggu sekejap...</p>
            </div>
            <style>@keyframes spin { 100% { transform:rotate(360deg); } }</style>
        `;
        document.body.appendChild(tempOverlay);

        if (typeof initPi === 'function') { await initPi(); }

        if (!isPiInitialized) {
            tempOverlay.remove();
            alert("Gagal terhubung ke Pi Network. Pastikan Anda membuka aplikasi ini dari dalam Pi Browser resmi!");
            return;
        }
        tempOverlay.remove();
    }

    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = "display:flex; justify-content:center; align-items:center; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); backdrop-filter:blur(8px); z-index:9999;";
    loadingOverlay.innerHTML = `<div style="text-align:center;"><div class="hourglass" style="font-size:2rem; animation: flip 1s ease infinite;">⏳</div><p style="margin-top:20px; font-weight:bold; color:#f3e5f5; font-size:0.7rem; letter-spacing:2px;">MENGHUBUNGKAN...</p></div><style>@keyframes flip { 0%, 100% { transform:scale(1); } 50% { transform:scale(1.2) rotate(180deg); } }</style>`;
    document.body.appendChild(loadingOverlay);

    try {
        if (!window.Pi) { throw new Error("Gunakan Pi Browser."); }
        const scopes = ['username', 'payments'];
        
        const auth = await window.Pi.authenticate(scopes, (p) => {
            if (typeof handleIncompletePayment === 'function') handleIncompletePayment(p);
        });
        currentUser = auth.user;

        const profileDisplay = document.getElementById('profile-username') || document.querySelector('.username-text');
        if (profileDisplay) profileDisplay.innerText = currentUser.username;

        const profileAddress = document.getElementById('profile-address');
        if (profileAddress) profileAddress.innerText = currentUser.uid;
       
        loadingOverlay.innerHTML = `
            <div style="background: linear-gradient(135deg, #1a0033 0%, #0b2135 100%); border:3px solid #FFD700; border-radius:25px; padding:30px 20px; text-align:center; width:80%; max-width:320px; font-family:'Inter', sans-serif; box-shadow: 0 10px 40px rgba(212,175,55,0.35);">
                <div style="font-size: 40px; margin-bottom: 10px;">✨</div>
                <h2 style="color:#FFD700; margin:5px 0; font-weight:900; text-transform:uppercase; font-size:1.3rem; letter-spacing:1px;">Login Berhasil!</h2>
                <p style="color:#fff; margin: 10px 0 0 0; font-size:0.95rem;">Selamat datang kembali,<br><span style="color:#ba68c8; font-weight:bold; font-size:1.1rem;">@${currentUser.username}</span></p>
            </div>`;

        configureLogoutButton();
        setTimeout(() => { loadingOverlay.remove(); }, 2500);
    } catch (err) { 
        console.error(err); 
        loadingOverlay.remove();
        if (err.message !== "User cancelled login") {
            alert("Gagal Login: " + err.message);
        }
    }
};

function showLoginPrompt() {
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(8px); font-family:'Inter', sans-serif;";
    overlay.innerHTML = `
        <div style="background:#0b2135; border:2px solid #FFD700; padding:35px 25px; border-radius:25px; max-width:320px; width:100%; text-align:center;">
            <h2 style="color:#FFD700; margin:0; font-weight:800; text-transform:uppercase;">Selamat Datang</h2>
            <p style="color:#f8fafc; margin:15px 0 25px; font-size:0.95rem;">Silakan Login agar Anda bisa melanjutkan pembelian produk premium di Marketplace DIGITAL PRO INDO</p>
            <button id="modal-confirm-login-btn" style="background:linear-gradient(45deg, #FFD700, #FFA500); color:#0b2135; border:none; width:100%; padding:15px; border-radius:12px; font-weight:bold; cursor:pointer;">LOGIN SEKARANG</button>
            <button id="modal-cancel-login-btn" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer;">Mungkin Nanti</button>
        </div>`;
    document.body.appendChild(overlay);

    document.getElementById('modal-confirm-login-btn').addEventListener('click', function(e) {
        e.preventDefault();
        overlay.remove();
        window.handleAuth();
    });

    document.getElementById('modal-cancel-login-btn').addEventListener('click', function() {
        overlay.remove();
    });
}

function showAddressPrompt() {
    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(8px); font-family:'Inter', sans-serif;";
    overlay.innerHTML = `
        <div style="background:#0b2135; border:2px solid #FFD700; padding:35px 25px; border-radius:25px; max-width:320px; width:100%; text-align:center;">
            <div style="font-size: 50px; margin-bottom: 15px;">📍</div>
            <h2 style="color:#FFD700; margin:0; font-weight:800; text-transform:uppercase;">Alamat Kosong</h2>
            <p style="color:#f8fafc; margin:15px 0 25px; font-size:0.95rem;">Lengkapi alamat pengiriman Anda terlebih dahulu agar kami dapat mengirimkan produk dengan tepat.</p>
            <button id="modal-confirm-addr-btn" style="background:linear-gradient(45deg, #FFD700, #FFA500); color:#0b2135; border:none; width:100%; padding:15px; border-radius:12px; font-weight:bold; cursor:pointer;">LENGKAPI ALAMAT</button>
        </div>`;
    document.body.appendChild(overlay);

    document.getElementById('modal-confirm-addr-btn').addEventListener('click', function(e) {
        e.preventDefault();
        overlay.remove();
        if (typeof window.showAddressForm === 'function') window.showAddressForm();
    });
}

// =========================================================================
// 4. RENDERING & UI FUNCTIONS
// =========================================================================
function renderProducts(data, targetGridId) {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;
    grid.innerHTML = "";
    
    if (data.length === 0) {
        grid.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #999; padding: 20px;">Produk tidak ditemukan.</p>`;
        return;
    }

    data.forEach(p => {
        const displayPrice = p.price.toFixed(5); 
        const discountBadge = (p.discount && p.discount > 0) ? `<span class="discount-badge">-${p.discount}%</span>` : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-container" onclick="openProductDetail('${p.id}')">
                ${discountBadge} 
                <img src="${p.images[0]}" alt="${p.name}">
                <div class="xtra-label"><span class="xtra-text">XTRA</span><span class="ongkir-text">Gratis Ongkir+</span></div>
            </div>
            <div class="product-info">
                <h3 class="product-name" onclick="openProductDetail('${p.id}')">${p.name}</h3>
                <div class="price">${displayPrice} π</div>
                <div class="free-ship-tag"><img src="https://cdn-icons-png.flaticon.com/512/709/709790.png" width="12"> Gratis ongkir</div>
                <div class="card-bottom">
                    <div class="rating-text"><span class="star">★</span> ${p.rating} | ${p.sold} terjual</div>
                    <button class="btn-buy-now" onclick="event.stopPropagation(); window.handlePayment(${p.price}, '${p.name}')">Beli</button>
                </div>
            </div>`;
        grid.appendChild(card);
    });
}

window.openProductDetail = (productId) => {
    const p = productsData.find(x => x.id === productId);
    if (!p) return;

    const bNav = document.querySelector('.bottom-nav');
    if(bNav) bNav.style.display = 'none';

    document.getElementById('product-detail-page').scrollTop = 0;
    document.getElementById('detail-content').innerHTML = `
        <div style="background: white; min-height: 100vh; padding-bottom: 100px; font-family:'Inter', sans-serif; position: relative;">
            <div onclick="closeProductDetail()" style="position: fixed; top: 15px; left: 15px; z-index: 9999; background: #4a148c; width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid white; cursor: pointer;">
                <svg viewBox="0 0 24 24" style="width:28px; height:28px; fill:none; stroke:white; stroke-width:3;">
                    <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div style="width: 100%; height: 320px; background: #f1f5f9; overflow: hidden;">
                <img src="${p.images[0]}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="padding: 20px; background: white; border-radius: 30px 30px 0 0; margin-top: -30px; box-shadow: 0 -10px 20px rgba(0,0,0,0.05);">
                <h2 style="margin: 0; font-size: 1.4rem; color:#1a1a1a; font-weight: 800;">${p.name}</h2>
                <div style="font-size: 2.2rem; font-weight: 900; color: #b71c1c; margin: 10px 0;">π ${p.price.toFixed(5)}</div>
                <div style="background: #fdfdfd; padding: 20px; border-radius: 20px; border: 1px solid #f1f5f9; margin-top: 15px;">
                    <h4 style="margin: 0 0 10px 0; color: #4a148c; font-weight: 800; border-bottom: 2px solid #6748d7; width: fit-content; padding-bottom: 5px;">DETAIL SPESIFIKASI</h4>
                    <div style="line-height: 1.8; color: #475569; font-size: 0.95rem;">${p.desc}</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 12px; margin-top:30px;">
                    <button onclick="window.addToCart('${p.id}')" style="background: white; color: #4a148c; border: 2px solid #4a148c; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer;">+ Keranjang</button>
                    <button onclick="window.handlePayment(${p.price}, '${p.name}')" style="background: #4a148c; color: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer; box-shadow: 0 6px 20px rgba(74,20,140,0.3);">Beli Sekarang</button>
                </div>
            </div>
        </div>`;
    document.getElementById('product-detail-page').classList.remove('hidden');
};

window.closeProductDetail = () => {
    document.getElementById('product-detail-page').classList.add('hidden');
    const bNav = document.querySelector('.bottom-nav');
    if(bNav) bNav.style.display = 'flex';
};

window.filterCategory = (category, element) => {
    const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
    renderProducts(filtered, 'main-grid');
    if (element) {
        document.querySelectorAll('.category-pill').forEach(pill => pill.classList.remove('active'));
        element.classList.add('active');
    }
};

// =========================================================================
// 5. CART & SHIPPING ADDRESS ACTIONS
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
    
    // 🔊 EFEK SUARA ELEKTRONIK KUSTOM (DIGITAL PRO SUCCESS CHIME)
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

    // Tutup overlay form alamat asal
    const currentOverlay = document.getElementById('address-overlay');
    if (currentOverlay) currentOverlay.remove();
    
    window.updateCartUI();

    // 🌟 SEKSI DIGITAL PRO POPUP NOTIFIKASI KUSTOM ALAMAT DISIMPAN
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
// 6. GATEWAY PI BLOCKCHAIN & ALERTS PROMPTS
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
                if(payment) handleIncompletePayment(payment); 
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
        username: currentUser.username,
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

// =========================================================================
// 7. SIDEBAR MENU & BANNER LOGIC
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
// 8. CORE PIPELINE (DOM LOAD INITIALIZATION)
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
    await initPi();

    // 6. Bind tombol login manual awal sebelum ter-otentikasi
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn && !currentUser) {
        loginBtn.onclick = window.handleAuth;
    }
});

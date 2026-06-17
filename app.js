// 1. VARIABEL GLOBAL UTAMA
let currentUser = null;
let cart = [];
let userAddress = { nama: "", telepon: "", alamatLengkap: "" };

const ADMIN_WA = "6281906066757"; 
const excelWebhookUrl = "https://script.google.com/macros/s/AKfycbz_XXXXXXXXXXXXXX/exec"; // Ganti dengan URL Apps Script Anda jika ada

// 2. DATA PRODUK MARKETPLACE
const productsData = [
    {
        id: "house-001",
        category: "Rumah",
        name: "The Beverly Hills Modern Mansion",
        price: 0.25000,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Luas Tanah:</b> 2.500 mÂ²<br>â€¢ <b>Kamar Tidur:</b> 7 Master Suite<br>â€¢ <b>Fasilitas:</b> Infinity Pool, Home Cinema, Wine Cellar<br>â€¢ <b>Lokasi:</b> Beverly Hills, California<br>â€¢ <b>Garasi:</b> Kapasitas 10 Mobil Mewah`
    },
    {
        id: "house-002",
        category: "Rumah",
        name: "Zen Waterfront Villa",
        price: 0.18000,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Pemandangan:</b> Akses Langsung ke Danau Privasi<br>â€¢ <b>Gaya:</b> Arsitektur Minimalis Modern<br>â€¢ <b>Fasilitas:</b> Dermaga Pribadi, Spa & Sauna, Gym<br>â€¢ <b>Sistem:</b> Full Smart Home Technology<br>â€¢ <b>Keamanan:</b> Biometric Entry System`
    },
    {
        id: "house-003",
        category: "Rumah",
        name: "Penthouse Skyline Duplex",
        price: 0.12000,
        images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Lantai:</b> Lantai 50 & 51 (Top Floor)<br>â€¢ <b>Pemandangan:</b> 360Â° City Skyline View<br>â€¢ <b>Interior:</b> Marmer Italia & Panel Emas<br>â€¢ <b>Fasilitas:</b> Private Rooftop Garden & Jacuzzi<br>â€¢ <b>Layanan:</b> 24/7 Concierge Service`
    },
    {
        id: "house-005",
        category: "Rumah",
        name: "Tropical Cliffside Sanctuary",
        price: 0.15500,
        images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Lokasi:</b> Tebing Uluwatu, Bali<br>â€¢ <b>Konsep:</b> Open Living Space with Ocean View<br>â€¢ <b>Fasilitas:</b> Private Beach Access, Deck Yoga<br>â€¢ <b>Struktur:</b> Kayu Ulin & Batu Alam Lokal<br>â€¢ <b>Kamar:</b> 5 Suite dengan Semi-Outdoor Bathroom`
    },
    {
        id: "house-008",
        category: "Rumah",
        name: "The Glass House Estate",
        price: 0.21000,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Material Dominan:</b> Kaca Tempered & Baja Hitam<br>â€¢ <b>Privasi:</b> Smart Glass (Bisa Buram Otomatis)<br>â€¢ <b>Lansekap:</b> Koi Pond Keliling Bangunan<br>â€¢ <b>Ruang:</b> Galeri Seni Pribadi & Studio Musik<br>â€¢ <b>Luas:</b> Kavling Sudut 3.000 mÂ²`
    },
    {
        id: "house-009",
        category: "Rumah",
        name: "Mediterranean Seafront Palace",
        price: 0.28000,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Lokasi:</b> French Riviera (Cote d'Azur)<br>â€¢ <b>Atap:</b> Terakota Tradisional Spanyol<br>â€¢ <b>Taman:</b> Kebun Zaitun & Citrus<br>â€¢ <b>Fasilitas:</b> Lapangan Tenis Pribadi, Helipad<br>â€¢ <b>Kamar Mandi:</b> Perlengkapan Emas 24 Karat`
    },
    {
        id: "house-010",
        category: "Rumah",
        name: "The Urban Luxury Loft",
        price: 0.08800,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Tipe:</b> Industrial Luxury Loft<br>â€¢ <b>Tinggi Plafon:</b> 6 Meter (Double Height Ceiling)<br>â€¢ <b>Fitur:</b> Tangga Melingkar Besi Kustom<br>â€¢ <b>Lokasi:</b> Pusat Distrik Finansial<br>â€¢ <b>Sistem:</b> Voice Controlled Home Automation`
    },
    {
        id: "house-011",
        category: "Rumah",
        name: "The Floating Diamond Villa",
        price: 0.19500,
        images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Dimensi:</b> LB 550 mÂ² (Struktur Terapung)<br>â€¢ <b>Lokasi:</b> Maladewa (Private Lagoon)<br>â€¢ <b>Fitur:</b> Kamar Tidur Bawah Laut, Dek Berjemur 360Â°<br>â€¢ <b>Material:</b> Kaca Anti-Karat & Kayu Jati Reklamasi<br>â€¢ <b>Energi:</b> Kemandirian Energi dengan Panel Surya Laut`
    },
    {
        id: "house-013",
        category: "Rumah",
        name: "Cyber-Tech Underground Bunker",
        price: 0.16000,
        images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Dimensi:</b> LB 900 mÂ² (Kedalaman 15 Meter)<br>â€¢ <b>Keamanan:</b> Pintu Anti-Ledakan, Sistem Filtrasi Udara Nuklir<br>â€¢ <b>Fasilitas:</b> Kebun Hidroponik Indoor, Simulator Golf<br>â€¢ <b>Teknologi:</b> AI Butler terintegrasi ke seluruh ruangan<br>â€¢ <b>Lantai:</b> Epoxy Resin Anti-Statis & Dinding Beton Ekspos`
    },
    {
        id: "house-014",
        category: "Rumah",
        name: "Aspen Snow Peak Lodge",
        price: 0.13500,
        images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Dimensi:</b> LT 3.500 mÂ² / LB 700 mÂ²<br>â€¢ <b>Lokasi:</b> Aspen, Colorado (Ski-in/Ski-out Access)<br>â€¢ <b>Fitur:</b> Perapian Batu Alam Raksasa, Kolam Air Hangat Outdoor<br>â€¢ <b>Material:</b> Kayu Pinus Tua & Batu Granit Pegunungan<br>â€¢ <b>Ruangan:</b> Ruang Simpan Perlengkapan Ski Khusus`
    },
    {
        id: "house-015",
        category: "Rumah",
        name: "Mediterranean Cliff Villa",
        price: 0.27000,
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Dimensi:</b> LT 2.200 mÂ² / LB 950 mÂ²<br>â€¢ <b>Pemandangan:</b> Laut Mediterania (Amalfi Coast)<br>â€¢ <b>Fasilitas:</b> Lift Tebing Pribadi, Bar Tepi Kolam, Bioskop Terbuka<br>â€¢ <b>Interior:</b> Keramik Hand-Painted Italia & Furnitur Putih Bersih<br>â€¢ <b>Lanskap:</b> Kebun Vertikal & Pohon Lemon`
    },
    {
        id: "house-016",
        category: "Rumah",
        name: "The Brutalist Cube Estate",
        price: 0.11000,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Dimensi:</b> LT 1.500 mÂ² / LB 800 mÂ²<br>â€¢ <b>Gaya:</b> Brutalisme Kontemporer (Raw Concrete)<br>â€¢ <b>Ruangan:</b> Studio Lukis & Ruang Musik Kedap Suara<br>â€¢ <b>Fitur:</b> Skylight Masif di Tengah Rumah<br>â€¢ <b>Sistem:</b> Smart Lighting System yang mengikuti ritme sirkadian`
    },
    {
        id: "house-017",
        category: "Rumah",
        name: "Amazonian Eco-Mansion",
        price: 0.14500,
        images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Dimensi:</b> LT 10.000 mÂ² / LB 650 mÂ² (Floating on stilts)<br>â€¢ <b>Konsep:</b> Regenerative Architecture (Mandiri Air & Limbah)<br>â€¢ <b>Fitur:</b> Dinding Tanaman Hidup, Kolam Renang Air Hujan<br>â€¢ <b>Material:</b> Bambu Laminasi & Atap Daun Rumbia Sintetis<br>â€¢ <b>Lokasi:</b> Hutan Lindung Tropis`
    },
    {
        id: "house-019",
        category: "Rumah",
        name: "Dubai Sky-High Villa",
        price: 0.35000,
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Dimensi:</b> LB 1.100 mÂ² (Penthouse 3 Lantai)<br>â€¢ <b>Fasilitas:</b> Kolam Renang Kaca Gantung, Helipad Gedung<br>â€¢ <b>Interior:</b> Aksen Emas 24K & Kristal Baccarat<br>â€¢ <b>Pemandangan:</b> Burj Khalifa & Palm Jumeirah<br>â€¢ <b>Layanan:</b> Private Chef & Sopir Rolls-Royce`
    },
    {
        id: "house-020",
        category: "Rumah",
        name: "The Vineyard Ranch Estate",
        price: 0.17500,
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Dimensi:</b> LT 15 Hektar / LB 1.300 mÂ²<br>â€¢ <b>Fitur:</b> Perkebunan Anggur Pribadi, Pabrik Pengolahan Wine<br>â€¢ <b>Fasilitas:</b> Lapangan Berkuda, Kandang Kuda Premium<br>â€¢ <b>Interior:</b> Gaya Farmhouse Modern dengan Kayu Oak Ekspos<br>â€¢ <b>Dapur:</b> Outdoor BBQ Station & Pizza Wood-Oven`
    },
    { 
        id: 'p2', 
        name: "COCO Pro Kunyit", 
        price: 0.00006,
        discount: 5, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
        desc: "Super food Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma Dan Dengan Formula Bioteknologi Khusus Live probiotic, Immune support,High Antioksidant,Improved Digestion,Naturally Energizing.",
        rating: 5.0,
        sold: 3400,
        reviews: [{ user: "Sehat_Sentosa", comment: "Asam lambung saya membaik, terima kasih!" }]
    },
    { 
        id: 'p3', 
        name: "An-Nisa", 
        price: 0.00010,
        discount: 5, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
        desc: "Keputihan, Gatal-gatal ,Membunuh bakteri, Melancarkan menstruasi, Mengatasi nyeri haid, Mencegah kanker rahim, Membasmi mioma / Kista, Merapatkan dan mengencangkan.",
        rating: 5.0,
        sold: 3400,
        reviews: [{ user: "Rina_Store", comment: "Produk herbal terbaik tahun ini." }]
    },
    { 
        id: 'p4', 
        name: "Ar-Rizal", 
        price: 0.00010,
        discount: 5, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
        desc: "Mengencangkan Mr.P, Menguatkan Mr.P, Menguatkan Jantung, Meningkatkan gairah, Mengatasi ejakulasi dini, Suplemen terbaik buat Profil, Meningkatkan kwalitas Hormon.",
        rating: 5.0,
        sold: 3400,
        reviews: [{ user: "Sehat_Sentosa", comment: "Kualitas bintang 5!" }]
    },
    { 
        id: 'p3_smart', 
        name: "Smart Home System Pro", 
        price: 0.500, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], 
        desc: "Paket instalasi smart home berbasis IoT. Kontrol rumah Anda dengan integrasi Pi Browser yang aman dan cepat.",
        rating: 4.8,
        sold: 52
    },
    { 
        id: 'p4_phone', 
        name: "Premium Smartphone X", 
        price: 1.200, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], 
        desc: "Gadget premium dengan performa tinggi. Kamera resolusi tinggi dan baterai tahan lama untuk penggunaan harian.",
        rating: 4.7,
        sold: 89
    },
    { 
        id: 'p5', 
        name: "Sofa Minimalis 2 Seater - Modern Grey", 
        price: 0.05, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], 
        desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu kecil. Bahan kain breathable dan busa tahan kempes.",
        rating: 4.6,
        sold: 45
    },
    { 
        id: 'p6', 
        name: "Nabidz Dessert", 
        price: 0.00012,
        discount: 0,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
        desc: "Nabidz Dessert bahan baku buah anggur merah yang di fermentasi esterifikasi biokimia resep pribadi dan di padu dengan proses istihalah.",
        rating: 4.9,
        sold: 21
    },
    { 
        id: 'p7', 
        name: "Lampu Gantung Industrial - Model Black Dome", 
        price: 0.015, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"], 
        desc: "Lampu dekoratif plafon, diameter 30cm untuk kesan estetik industrial di cafe atau rumah Anda.",
        rating: 4.5,
        sold: 110
    },
    { 
        id: 'p8', 
        name: "Rak Buku Kayu 5 Tingkat - Slim Design", 
        price: 0.03, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"], 
        desc: "Rak buku hemat ruang, tinggi 180cm lebar 40cm. Mudah dirakit dan sanggup menahan beban berat.",
        rating: 4.7,
        sold: 76
    },
    { 
        id: 'p9', 
        name: "Karpet Bulu Lembut 160x210 - Creamy White", 
        price: 0.012, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"], 
        desc: "Karpet lantai premium, sangat lembut dan mudah dibersihkan. Memberikan kesan hangat pada kamar tidur.",
        rating: 4.8,
        sold: 230
    },
    { 
        id: 'p10', 
        name: "Set Gorden Jendela - Model Smokering Minimalis", 
        price: 0.008, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"], 
        desc: "Gorden blackout ukuran 140x220cm, tersedia berbagai warna. Menghalau sinar matahari hingga 90%.",
        rating: 4.6,
        sold: 150
    },
    { 
        id: 'p11', 
        name: "Jam Dinding Kayu - Tipe Scandinavian", 
        price: 0.005, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"], 
        desc: "Jam dinding estetik diameter 35cm, mesin sweep movement (tidak berdetak). Tenang dan elegan.",
        rating: 4.7,
        sold: 310
    },
    { 
        id: 'p12', 
        name: "Tanaman Hias Artificial - Model Monstera Large", 
        price: 0.01, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"], 
        desc: "Tanaman palsu mirip asli dengan pot keramik, tinggi 80cm. Memberikan kesan hijau tanpa perlu perawatan.",
        rating: 4.5,
        sold: 95
    },
    { 
        id: 'e1', 
        name: "Smartphone Pi-Phone X - 256GB Platinum", 
        price: 0.15, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"], 
        desc: "Layar AMOLED 6.7 inci, RAM 12GB, Baterai 5000mAh. Support native Pi App ekosistem.",
        rating: 4.9,
        sold: 140
    },
    { 
        id: 'e2', 
        name: "Wireless Earbuds Pro - Noise Cancelling", 
        price: 0.02, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"], 
        desc: "Audio High-Fidelity, tahan air IPX5. Baterai tahan hingga 24 jam dengan case pengisian.",
        rating: 4.7,
        sold: 420
    },
    { 
        id: 'hb4', 
        name: "COCO Pro 10", 
        price: 0.00006, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
        desc: "Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma.",
        rating: 5.0,
        sold: 1200
    },
    { 
        id: 'v1', 
        name: "Sedan Sport Luxury - Tipe S1", 
        price: 0.0005, 
        category: "Mobil", 
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], 
        desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof.",
        rating: 5.0,
        sold: 3
    },
    { 
        id: 'm1', 
        name: "Motor Sport 250cc - Black Matte", 
        price: 0.002, 
        category: "Motor", 
        images: ["https://i.ibb.co.com/spcrbbKT/Motor-250cc-Terbaik.jpg"], 
        desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern.",
        rating: 4.8,
        sold: 12
    },
    { 
        id: 'm1_alt', 
        name: "Motor Sport 250cc - Kawasaki Ninja H2R", 
        price: 0.002, 
        category: "Motor", 
        images: ["https://i.ibb.co.com/Fkp8tHJH/58942-kawasaki-ninja-h2r-model-kit-motosiklet-112-39198-1.jpg"], 
        desc: "KAWASAKI NINJA H2R (Model 2026) Status: Motor produksi massal terkencang di dunia.",
        rating: 4.8,
        sold: 12
    },
    {
        id: "bike-001",
        name: "Ducati Panigale V4 R",
        price: 0.01500,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Mesin:</b> 998cc Desmosedici Stradale V4 R<br>â€¢ <b>Tenaga:</b> 218 HP @ 15.500 RPM<br>â€¢ <b>Fitur:</b> Sayap Karbon (Aero Winglets), Ã–hlins Suspension`
    },
    {
        id: "bike-002",
        name: "Kawasaki Ninja H2R (Track Only)",
        price: 0.01800,
        category: "Motor",
        images: ["https://i.ibb.co.com/jZ6LvJTB/Desain-tanpa-judul-20260207-131613-0000.png"],
        desc: `â€¢ <b>Mesin:</b> 998cc In-line Four with Supercharger<br>â€¢ <b>Tenaga:</b> 310 HP (Paling bertenaga di dunia)<br>â€¢ <b>Top Speed:</b> 400+ km/jam`
    },
    {
        id: "bike-003",
        name: "BMW M 1000 RR",
        price: 0.01250,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Mesin:</b> 999cc Water-cooled Inline 4-Cylinder<br>â€¢ <b>Fitur M:</b> Velg Karbon M, Kursi M`
    },
    {
        id: "bike-004",
        name: "Harley-Davidson CVO Road Glide",
        price: 0.01400,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Mesin:</b> Milwaukee-EightÂ® VVT 121 (1.977cc)<br>â€¢ <b>Gaya:</b> Grand American Touring Luxury`
    },
    {
        id: "bike-005",
        name: "MV Agusta Rush 1000 cc",
        price: 0.01650,
        category: "Motor",
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: `â€¢ <b>Konsep:</b> Hyper-Naked Drag Bike Luxury<br>â€¢ <b>Mesin:</b> 998cc 16-valve DOHC Inline 4`
    },
    {
        id: "bike-006",
        name: "Aprilia RSV4 Xtrenta",
        price: 0.01900,
        category: "Motor",
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: `â€¢ <b>Teknologi:</b> MotoGP Derived Aerodynamics<br>â€¢ <b>Mesin:</b> 1.099cc V4 Longitudinal 65Â°`
    },
    {
        id: "bike-007",
        name: "Triumph Rocket 3 TFC",
        price: 0.00950,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80"],
        desc: `â€¢ <b>Mesin:</b> 2.458cc (Mesin motor terbesar di dunia)<br>â€¢ <b>Torsi:</b> 221 Nm`
    }
];

// 3. EVENT OTOMATIS SAAT WINDOW SELESAI DIMUAT (Mencegah Stuck Login)
window.onload = function() {
    console.log("Memeriksa kesiapan Pi SDK...");
    if (window.Pi) {
        // Inisialisasi Pi SDK Resmi Jaringan Utama
        window.Pi.init({ version: "2.0", sandbox: false });
        console.log("Pi SDK Berhasil Terinisialisasi.");
        
        // Jalankan Autentikasi Otomatis Pioneer Pi Network
        mulaiAutentikasiPiNetwork();
    } else {
        alert("Aplikasi ini harus dibuka langsung di dalam Pi Browser!");
    }
};

// 4. FUNGSI AUTENTIKASI UTAMA PI NETWORK
function mulaiAutentikasiPiNetwork() {
    const scopes = ['username', 'payments'];

    function onIncompletePaymentFound(payment) {
        console.log("Ditemukan pembayaran tertunda/gantung:", payment);
        // Kirim detail pembayaran tertunda ke backend Anda jika diperlukan
    }

    window.Pi.authenticate(scopes, onIncompletePaymentFound)
        .then(function(auth) {
            console.log("Otentikasi berhasil! Pioneer:", auth.user.username);
            currentUser = auth.user; 

            // Sembunyikan Overlay / Elemen Login secara mulus jika ada di HTML
            const elemenLogin = document.getElementById('page-login');
            if (elemenLogin) {
                elemenLogin.classList.add('hidden');
            }

            // Inisialisasi Toko Utama & Tampilan Produk
            inisialisasiMarketplaceToko();
        })
        .catch(function(error) {
            console.error("Kesalahan Otentikasi SDK Pi:", error);
            alert("Gagal memverifikasi identitas koin Pi Anda. Silakan refresh halaman.");
        });
}

// 5. INISIALISASI HALAMAN UTAMA & NAVIGASI TOKO
function inisialisasiMarketplaceToko() {
    renderDaftarProduk('Semua');
    setupAksiTombolNavigasi();
    perbaruiTampilanAngkaKeranjang();
    
    // Tampilkan username user yang login di UI (jika ada elemen berkait)
    const namaUserToko = document.getElementById('user-profile-name');
    if (namaUserToko) {
        namaUserToko.innerText = currentUser.username;
    }
}

// 6. FUNGSI RENDER DATA PRODUK
function renderDaftarProduk(kategoriDipilih = 'Semua') {
    const containerProduk = document.getElementById('products-container');
    if (!containerProduk) return;

    containerProduk.innerHTML = "";

    const produkTerfilter = productsData.filter(p => kategoriDipilih === 'Semua' || p.category === kategoriDipilih);

    produkTerfilter.forEach(produk => {
        const elemenKartu = document.createElement('div');
        elemenKartu.className = "bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-3 flex flex-col justify-between";
        
        elemenKartu.innerHTML = `
            <div>
                <img src="${produk.images[0]}" class="w-full h-40 object-cover rounded-lg mb-3" alt="${produk.name}">
                <span class="text-xs font-semibold px-2 py-1 bg-purple-50 text-purple-600 rounded">${produk.category}</span>
                <h3 class="font-bold text-sm text-gray-800 mt-2 line-clamp-2">${produk.name}</h3>
                <p class="text-xs text-gray-500 mt-1 line-clamp-3">${produk.desc.replace(/<br>/g, ' ')}</p>
            </div>
            <div class="mt-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-purple-700 font-extrabold text-sm">ð… ${produk.price.toFixed(5)}</span>
                </div>
                <button onclick="masukkanKeranjangToko('${produk.id}')" class="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-2 rounded-lg transition">
                    + Keranjang
                </button>
            </div>
        `;
        containerProduk.appendChild(elemenKartu);
    });
}

// 7. MANAJEMEN KERANJANG BELANJA
function masukkanKeranjangToko(idProduk) {
    const produkDipilih = productsData.find(p => p.id === idProduk);
    if (!produkDipilih) return;

    const itemDiKeranjang = cart.find(item => item.id === idProduk);
    if (itemDiKeranjang) {
        itemDiKeranjang.quantity += 1;
    } else {
        cart.push({ ...produkDipilih, quantity: 1 });
    }

    perbaruiTampilanAngkaKeranjang();
    alert(`Berhasil menambahkan "${produkDipilih.name}" ke keranjang!`);
}

function perbaruiTampilanAngkaKeranjang() {
    const totalItem = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badgeKeranjang = document.getElementById('cart-badge');
    if (badgeKeranjang) {
        badgeKeranjang.innerText = totalItem;
        badgeKeranjang.style.display = totalItem > 0 ? "block" : "none";
    }
}

// 8. SETUP NAVIGATION MENU TABS
function setupAksiTombolNavigasi() {
    const menuNavigasi = ['nav-home', 'nav-cari', 'nav-keranjang', 'nav-profile'];
    
    menuNavigasi.forEach(idMenu => {
        const tombol = document.getElementById(idMenu);
        if (tombol) {
            tombol.addEventListener('click', () => {
                // Atur class active state di menu navigasi
                menuNavigasi.forEach(m => document.getElementById(m)?.classList.remove('active', 'text-purple-600'));
                tombol.classList.add('active', 'text-purple-600');
                
                // Pindah halaman visual
                pindahHalamanVisual(idMenu);
            });
        }
    });
}

function pindahHalamanVisual(idMenuNavigasi) {
    const daftarHalaman = {
        'nav-home': 'page-home',
        'nav-cari': 'page-cari',
        'nav-keranjang': 'page-keranjang',
        'nav-profile': 'page-profile'
    };

    // Sembunyikan semua halaman terlebih dahulu
    Object.values(daftarHalaman).forEach(idHalaman => {
        document.getElementById(idHalaman)?.classList.add('hidden');
    });

    // Tampilkan halaman target pilihan
    const halamanTarget = daftarHalaman[idMenuNavigasi];
    document.getElementById(halamanTarget)?.classList.remove('hidden');

    if (idMenuNavigasi === 'nav-keranjang') {
        renderTampilanHalamanKeranjang();
    }
}

// 9. DETAIL HALAMAN KERANJANG & CHECKOUT
function renderTampilanHalamanKeranjang() {
    const kontainerKeranjang = document.getElementById('cart-items');
    if (!kontainerKeranjang) return;

    kontainerKeranjang.innerHTML = "";

    if (cart.length === 0) {
        kontainerKeranjang.innerHTML = `<p class="text-center text-gray-500 text-sm py-8">Keranjang belanja Anda masih kosong.</p>`;
        return;
    }

    let totalHargaPi = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        totalHargaPi += subtotal;

        const rowItem = document.createElement('div');
        rowItem.className = "flex items-center justify-between border-b border-gray-100 py-3";
        rowItem.innerHTML = `
            <div class="flex items-center gap-3">
                <img src="${item.images[0]}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-bold text-xs text-gray-800 line-clamp-1">${item.name}</h4>
                    <p class="text-xs text-purple-600">ð… ${item.price.toFixed(5)} x ${item.quantity}</p>
                </div>
            </div>
            <div class="text-right">
                <span class="font-bold text-xs text-gray-800">ð… ${subtotal.toFixed(5)}</span>
            </div>
        `;
        kontainerKeranjang.appendChild(rowItem);
    });

    // Tampilkan Summary Total Ringkasan
    const summaryCard = document.createElement('div');
    summaryCard.className = "mt-4 bg-purple-50 p-4 rounded-xl border border-purple-100";
    summaryCard.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            <span class="text-xs font-semibold text-gray-600">Total Pembayaran:</span>
            <span class="text-base font-extrabold text-purple-700">ð… ${totalHargaPi.toFixed(5)}</span>
        </div>
        <button onclick="bukaFormulirPengiriman(${totalHargaPi})" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg text-xs transition">
            Lanjut Proses Pemesanan
        </button>
    `;
    kontainerKeranjang.appendChild(summaryCard);
}

// 10. NOTIFIKASI INTEGRASI WHATSAPP & SINKRONISASI EXCEL
function bukaFormulirPengiriman(totalTagihan) {
    // Meminta input data pengiriman standar via prompt agar fleksibel di mobile phone
    const namaInput = prompt("Masukkan Nama Penerima:");
    if (!namaInput) return;
    const telpInput = prompt("Masukkan No. Telepon / WhatsApp Anda:");
    if (!telpInput) return;
    const alamatInput = prompt("Masukkan Alamat Lengkap Pengiriman:");
    if (!alamatInput) return;

    userAddress = { nama: namaInput, telepon: telpInput, alamatLengkap: alamatInput };

    // Eksekusi Pembuatan Alur Transaksi Pembayaran Pi Koin
    prosesPembayaranPiNetwork(totalTagihan);
}

// 11. SISTEM INTEGRASI METODE PEMBAYARAN PI NETWORK (NATIVE BLOCKCHAIN SDK)
function prosesPembayaranPiNetwork(totalTagihan) {
    const detailProdukRingkas = cart.map(i => `${i.name} (x${i.quantity})`).join(', ');

    const paymentData = {
        amount: totalTagihan,
        memo: `Belanja di PT Digital Pro Indo: ${detailProdukRingkas}`,
        metadata: {
            pioneer: currentUser.username,
            telepon: userAddress.telepon,
            alamat: userAddress.alamatLengkap
        }
    };

    const paymentCallbacks = {
        onReadyForServerApproval: function(paymentId) {
            console.log("Pembayaran terdaftar di Blockchain. ID:", paymentId);
            // Teruskan Approval Token ID ke Server Backend Developer Anda
        },
        onReadyForServerCompletion: function(paymentId, txid) {
            console.log("Transaksi Berhasil Dimatangkan! TXID:", txid);
            
            // Eksekusi sukses lokal terintegrasi
            kirimDataPesananKeExcelDanWA(totalTagihan, txid);
        },
        onCancel: function(paymentId) {
            console.log("Pembayaran dibatalkan oleh Pioneer.", paymentId);
        },
        onError: function(error, payment) {
            console.error("Gagal memproses koin Pi:", error);
        }
    };

    // Jalankan interface window pembayaran resmi Pi Wallet
    window.Pi.createPayment(paymentData, paymentCallbacks);
}

// 12. PUSH OUTPUT WEBHOOK GOOGLE SHEETS & REDIRECT WHATSAPP
function kirimDataPesananKeExcelDanWA(totalTagihan, txid) {
    const daftarBelanjaText = cart.map(i => `- ${i.name} [x${i.quantity}]`).join('\n');

    // Paket Data Webhook untuk dikirim ke Google Sheets (Excel)
    const payloadExcel = {
        tanggal: new Date().toLocaleString('id-ID'),
        usernamePi: currentUser.username,
        namaPenerima: userAddress.nama,
        noTelepon: userAddress.telepon,
        alamatLengkap: userAddress.alamatLengkap,
        itemPesanan: detailProdukRingkas,
        totalPi: totalTagihan,
        blockchainTxid: txid,
        status: "LUNAS (Pi Network)"
    };

    // Mengirim ke Google Excel secara Background Asynchronous
    fetch(excelWebhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadExcel)
    }).then(() => console.log("Berhasil mencatat transaksi ke data cloud Excel."));

    // Membuat Template Teks Link WhatsApp untuk konfirmasi Admin Toko
    const pesanWA = `Halo Admin PT Digital Pro Indo,\n\nSaya telah menyelesaikan pembayaran resmi melalui Pi Browser Wallet.\n\n*Detail Transaksi:*\nâ€¢ Akun Pi: ${currentUser.username}\nâ€¢ Nama Penerima: ${userAddress.nama}\nâ€¢ No. WA: ${userAddress.telepon}\nâ€¢ Alamat: ${userAddress.alamatLengkap}\n\n*Item Pesanan:*\n${daftarBelanjaText}\n\n*Total:* ð… ${totalTagihan.toFixed(5)}\n*TXID Blockchain:* ${txid}\n\nMohon segera diproses dan dikirimkan pesanan saya. Terima kasih!`;
    
    const URL_Redirect_WA = `https://api.whatsapp.com/send?phone=${ADMIN_WA}&text=${encodeURIComponent(pesanWA)}`;
    
    // Kosongkan keranjang setelah selesai transaksi sukses
    cart = [];
    perbaruiTampilanAngkaKeranjang();
    pindahHalamanVisual('nav-home');

    // Buka aplikasi WhatsApp secara otomatis
    window.location.href = URL_Redirect_WA;
}

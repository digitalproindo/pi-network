Saya akan mengirimkan file script app.js saya.berikut dibawah ini isinya
document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    let userAddress = { nama: "", telepon: "", alamatLengkap: "" };

    const ADMIN_WA = "6281906066757"; 

const productsData = [
    {
        id: "house-001",
        category: "Rumah",
        name: "The Beverly Hills Modern Mansion",
        price: 0.25000,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Luas Tanah:</b> 2.500 m²<br>
               • <b>Kamar Tidur:</b> 7 Master Suite<br>
               • <b>Fasilitas:</b> Infinity Pool, Home Cinema, Wine Cellar<br>
               • <b>Lokasi:</b> Beverly Hills, California<br>
               • <b>Garasi:</b> Kapasitas 10 Mobil Mewah`
    },
    {
        id: "house-002",
        category: "Rumah",
        name: "Zen Waterfront Villa",
        price: 0.18000,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Pemandangan:</b> Akses Langsung ke Danau Privasi<br>
               • <b>Gaya:</b> Arsitektur Minimalis Modern<br>
               • <b>Fasilitas:</b> Dermaga Pribadi, Spa & Sauna, Gym<br>
               • <b>Sistem:</b> Full Smart Home Technology<br>
               • <b>Keamanan:</b> Biometric Entry System`
    },
    {
        id: "house-003",
        category: "Rumah",
        name: "Penthouse Skyline Duplex",
        price: 0.12000,
        images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lantai:</b> Lantai 50 & 51 (Top Floor)<br>
               • <b>Pemandangan:</b> 360° City Skyline View<br>
               • <b>Interior:</b> Marmer Italia & Panel Emas<br>
               • <b>Fasilitas:</b> Private Rooftop Garden & Jacuzzi<br>
               • <b>Layanan:</b> 24/7 Concierge Service`
    },
    {
        id: "house-005",
        category: "Rumah",
        name: "Tropical Cliffside Sanctuary",
        price: 0.15500,
        images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> Tebing Uluwatu, Bali<br>
               • <b>Konsep:</b> Open Living Space with Ocean View<br>
               • <b>Fasilitas:</b> Private Beach Access, Deck Yoga<br>
               • <b>Struktur:</b> Kayu Ulin & Batu Alam Lokal<br>
               • <b>Kamar:</b> 5 Suite dengan Semi-Outdoor Bathroom`
    },
    {
        id: "house-008",
        category: "Rumah",
        name: "The Glass House Estate",
        price: 0.21000,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Material Dominan:</b> Kaca Tempered & Baja Hitam<br>
               • <b>Privasi:</b> Smart Glass (Bisa Buram Otomatis)<br>
               • <b>Lansekap:</b> Koi Pond Keliling Bangunan<br>
               • <b>Ruang:</b> Galeri Seni Pribadi & Studio Musik<br>
               • <b>Luas:</b> Kavling Sudut 3.000 m²`
    },
    {
        id: "house-009",
        category: "Rumah",
        name: "Mediterranean Seafront Palace",
        price: 0.28000,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> French Riviera (Cote d'Azur)<br>
               • <b>Atap:</b> Terakota Tradisional Spanyol<br>
               • <b>Taman:</b> Kebun Zaitun & Citrus<br>
               • <b>Fasilitas:</b> Lapangan Tenis Pribadi, Helipad<br>
               • <b>Kamar Mandi:</b> Perlengkapan Emas 24 Karat`
    },
    {
        id: "house-010",
        category: "Rumah",
        name: "The Urban Luxury Loft",
        price: 0.08800,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Tipe:</b> Industrial Luxury Loft<br>
               • <b>Tinggi Plafon:</b> 6 Meter (Double Height Ceiling)<br>
               • <b>Fitur:</b> Tangga Melingkar Besi Kustom<br>
               • <b>Lokasi:</b> Pusat Distrik Finansial<br>
               • <b>Sistem:</b> Voice Controlled Home Automation`
    },
    {
        id: "house-011",
        category: "Rumah",
        name: "The Floating Diamond Villa",
        price: 0.19500,
        images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 550 m² (Struktur Terapung)<br>
               • <b>Lokasi:</b> Maladewa (Private Lagoon)<br>
               • <b>Fitur:</b> Kamar Tidur Bawah Laut, Dek Berjemur 360°<br>
               • <b>Material:</b> Kaca Anti-Karat & Kayu Jati Reklamasi<br>
               • <b>Energi:</b> Kemandirian Energi dengan Panel Surya Laut`
    },
    {
        id: "house-013",
        category: "Rumah",
        name: "Cyber-Tech Underground Bunker",
        price: 0.16000,
        images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 900 m² (Kedalaman 15 Meter)<br>
               • <b>Keamanan:</b> Pintu Anti-Ledakan, Sistem Filtrasi Udara Nuklir<br>
               • <b>Fasilitas:</b> Kebun Hidroponik Indoor, Simulator Golf<br>
               • <b>Teknologi:</b> AI Butler terintegrasi ke seluruh ruangan<br>
               • <b>Lantai:</b> Epoxy Resin Anti-Statis & Dinding Beton Ekspos`
    },
    {
        id: "house-014",
        category: "Rumah",
        name: "Aspen Snow Peak Lodge",
        price: 0.13500,
        images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 3.500 m² / LB 700 m²<br>
               • <b>Lokasi:</b> Aspen, Colorado (Ski-in/Ski-out Access)<br>
               • <b>Fitur:</b> Perapian Batu Alam Raksasa, Kolam Air Hangat Outdoor<br>
               • <b>Material:</b> Kayu Pinus Tua & Batu Granit Pegunungan<br>
               • <b>Ruangan:</b> Ruang Simpan Perlengkapan Ski Khusus`
    },
    {
        id: "house-015",
        category: "Rumah",
        name: "Mediterranean Cliff Villa",
        price: 0.27000,
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 2.200 m² / LB 950 m²<br>
               • <b>Pemandangan:</b> Laut Mediterania (Amalfi Coast)<br>
               • <b>Fasilitas:</b> Lift Tebing Pribadi, Bar Tepi Kolam, Bioskop Terbuka<br>
               • <b>Interior:</b> Keramik Hand-Painted Italia & Furnitur Putih Bersih<br>
               • <b>Lanskap:</b> Kebun Vertikal & Pohon Lemon`
    },
    {
        id: "house-016",
        category: "Rumah",
        name: "The Brutalist Cube Estate",
        price: 0.11000,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 1.500 m² / LB 800 m²<br>
               • <b>Gaya:</b> Brutalisme Kontemporer (Raw Concrete)<br>
               • <b>Ruangan:</b> Studio Lukis & Ruang Musik Kedap Suara<br>
               • <b>Fitur:</b> Skylight Masif di Tengah Rumah<br>
               • <b>Sistem:</b> Smart Lighting System yang mengikuti ritme sirkadian`
    },
    {
        id: "house-017",
        category: "Rumah",
        name: "Amazonian Eco-Mansion",
        price: 0.14500,
        images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 10.000 m² / LB 650 m² (Floating on stilts)<br>
               • <b>Konsep:</b> Regenerative Architecture (Mandiri Air & Limbah)<br>
               • <b>Fitur:</b> Dinding Tanaman Hidup, Kolam Renang Air Hujan<br>
               • <b>Material:</b> Bambu Laminasi & Atap Daun Rumbia Sintetis<br>
               • <b>Lokasi:</b> Hutan Lindung Tropis`
    },
    {
        id: "house-019",
        category: "Rumah",
        name: "Dubai Sky-High Villa",
        price: 0.35000,
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 1.100 m² (Penthouse 3 Lantai)<br>
               • <b>Fasilitas:</b> Kolam Renang Kaca Gantung, Helipad Gedung<br>
               • <b>Interior:</b> Aksen Emas 24K & Kristal Baccarat<br>
               • <b>Pemandangan:</b> Burj Khalifa & Palm Jumeirah<br>
               • <b>Layanan:</b> Private Chef & Sopir Rolls-Royce`
    },
    {
        id: "house-020",
        category: "Rumah",
        name: "The Vineyard Ranch Estate",
        price: 0.17500,
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 15 Hektar / LB 1.300 m²<br>
               • <b>Fitur:</b> Perkebunan Anggur Pribadi, Pabrik Pengolahan Wine<br>
               • <b>Fasilitas:</b> Lapangan Berkuda, Kandang Kuda Premium<br>
               • <b>Interior:</b> Gaya Farmhouse Modern dengan Kayu Oak Ekspos<br>
               • <b>Dapur:</b> Outdoor BBQ Station & Pizza Wood-Oven`
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
        reviews: [
            { user: "Sehat_Sentosa", comment: "Asam lambung saya membaik, terima kasih!" },
            { user: "Rina_Store", comment: "Produk herbal terbaik tahun ini." }
        ]
    },
    { 
        id: 'p3', 
        name: "An-Nisa", 
        price: 0.00010,
        discount: 5, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
        desc: "Keputihan, Gatal-gatal ,Membunuh bakteri, Melancarkan menstruasi, Mengatasi nyeri haid, Mencegah kanker rahim, Membasmi mioma / Kista, Merapatkan dan mengencangkan, Mengatasi semua problem kewanitaan,Memperbaiki dan memperbanyak hormon",
        rating: 5.0,
        sold: 3400,
        reviews: [
            { user: "Sehat_Sentosa", comment: "Asam lambung saya membaik, terima kasih!" },
            { user: "Rina_Store", comment: "Produk herbal terbaik tahun ini." }
        ]
    },
    { 
        id: 'p4', 
        name: "Ar-Rizal", 
        price: 0.00010,
        discount: 5, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
        desc: "Mengencangkan Mr.P, Menguatkan Mr.P, Menguatkan Jantung, Meningkatkan gairah, Mengatasi ejakulasi dini, Suplemen terbaik buat Profil, Meningkatkan kwalitas Hormon, Memperlama hubungan Pasutri, Melancarkan sirkulasi darah ke alat vital,  Meningkatkan dan memperbanyak kwalitas Hormon",
        rating: 5.0,
        sold: 3400,
        reviews: [
            { user: "Sehat_Sentosa", comment: "Asam lambung saya membaik, terima kasih!" },
            { user: "Rina_Store", comment: "Produk herbal terbaik tahun ini." }
        ]
    },
    
    { 
        id: 'p3_smart', 
        name: "Smart Home System Pro", 
        price: 0.500, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], 
        desc: "Paket instalasi smart home berbasis IoT. Kontrol rumah Anda dengan integrasi Pi Browser yang aman dan cepat.",
        rating: 4.8,
        sold: 52,
        reviews: [
            { user: "GadgetFreak", comment: "Instalasinya cepat dan fiturnya lengkap." }
        ]
    },
    { 
        id: 'p4_phone', 
        name: "Premium Smartphone X", 
        price: 1.200, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], 
        desc: "Gadget premium dengan performa tinggi. Kamera resolusi tinggi dan baterai tahan lama untuk penggunaan harian.",
        rating: 4.7,
        sold: 89,
        reviews: [
            { user: "MobilePhotography", comment: "Kameranya luar biasa jernih!" }
        ]
    },
    { 
        id: 'p5', 
        name: "Sofa Minimalis 2 Seater - Modern Grey", 
        price: 0.05, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], 
        desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu kecil. Bahan kain breathable dan busa tahan kempes.",
        rating: 4.6,
        sold: 45,
        reviews: [
            { user: "InteriorLover", comment: "Warnanya elegan dan sangat empuk." }
        ]
    },
    { 
        id: 'p6', 
        name: "Nabidz Dessert ", 
        price: 0.00012,
        discount: 0,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
        desc: "Nabidz Dessert bahan baku buah anggur merah yang di fermentasi esterifikasi biokimia resep pribadi dan di padu dengan proses istihalah microbiome dan asam organik akan meningkatkan kualitas pencernaan dimana sistem imun 90% pada pencernaan.",
        rating: 4.9,
        sold: 21,
        reviews: [
            { user: "KayuSolid", comment: "Benar-benar kayu jati asli, berat dan kokoh." }
        ]
    },
    { 
        id: 'p7', 
        name: "Lampu Gantung Industrial - Model Black Dome", 
        price: 0.015, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"], 
        desc: "Lampu dekoratif plafon, diameter 30cm untuk kesan estetik industrial di cafe atau rumah Anda.",
        rating: 4.5,
        sold: 110,
        reviews: [
            { user: "CafeOwner", comment: "Bikin suasana ruangan jadi keren!" }
        ]
    },
    { 
        id: 'p8', 
        name: "Rak Buku Kayu 5 Tingkat - Slim Design", 
        price: 0.03, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"], 
        desc: "Rak buku hemat ruang, tinggi 180cm lebar 40cm. Mudah dirakit dan sanggup menahan beban berat.",
        rating: 4.7,
        sold: 76,
        reviews: [
            { user: "BookWorm", comment: "Solusi buat yang punya banyak buku di ruangan sempit." }
        ]
    },
    { 
        id: 'p9', 
        name: "Karpet Bulu Lembut 160x210 - Creamy White", 
        price: 0.012, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"], 
        desc: "Karpet lantai premium, sangat lembut dan mudah dibersihkan. Memberikan kesan hangat pada kamar tidur.",
        rating: 4.8,
        sold: 230,
        reviews: [
            { user: "CozyHome", comment: "Bulunya tebal dan tidak mudah rontok." }
        ]
    },
    { 
        id: 'p10', 
        name: "Set Gorden Jendela - Model Smokering Minimalis", 
        price: 0.008, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"], 
        desc: "Gorden blackout ukuran 140x220cm, tersedia berbagai warna. Menghalau sinar matahari hingga 90%.",
        rating: 4.6,
        sold: 150,
        reviews: [
            { user: "MamaRiri", comment: "Kainnya jatuh dan warnanya cantik." }
        ]
    },
    { 
        id: 'p11', 
        name: "Jam Dinding Kayu - Tipe Scandinavian", 
        price: 0.005, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"], 
        desc: "Jam dinding estetik diameter 35cm, mesin sweep movement (tidak berdetak). Tenang dan elegan.",
        rating: 4.7,
        sold: 310,
        reviews: [
            { user: "MinimalisArt", comment: "Sangat hening, cocok buat di kamar." }
        ]
    },
    { 
        id: 'p12', 
        name: "Tanaman Hias Artificial - Model Monstera Large", 
        price: 0.01, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"], 
        desc: "Tanaman palsu mirip asli dengan pot keramik, tinggi 80cm. Memberikan kesan hijau tanpa perlu perawatan.",
        rating: 4.5,
        sold: 95,
        reviews: [
            { user: "PlantParent", comment: "Mirip aslinya kalau dilihat dari jauh." }
        ]
    },
    { 
        id: 'e1', 
        name: "Smartphone Pi-Phone X - 256GB Platinum", 
        price: 0.15, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"], 
        desc: "Layar AMOLED 6.7 inci, RAM 12GB, Baterai 5000mAh. Support native Pi App ekosistem.",
        rating: 4.9,
        sold: 140,
        reviews: [
            { user: "TechReviewer", comment: "Performa kencang, support Pi OS dengan baik." }
        ]
    },
    { 
        id: 'e2', 
        name: "Wireless Earbuds Pro - Noise Cancelling", 
        price: 0.02, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"], 
        desc: "Audio High-Fidelity, tahan air IPX5. Baterai tahan hingga 24 jam dengan case pengisian.",
        rating: 4.7,
        sold: 420,
        reviews: [
            { user: "MusicLover", comment: "Bass-nya mantap, noise cancelling-nya oke." }
        ]
    },
    { 
        id: 'hb4', 
        name: "COCO Pro 10 ", 
        price: 0.00006, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
        desc: "Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma Dan Dengan Formula Bioteknologi Khusus Live probiotic, Immune support,High Antioksidant,Improved Digestion,Naturally Energizing.",
        rating: 5.0,
        sold: 1200,
        reviews: [
            { user: "Bunda_Ika", comment: "Anak-anak jadi jarang sakit minum ini." }
        ]
    },
    { 
        id: 'v1', 
        name: "Sedan Sport Luxury - Tipe S1", 
        price: 0.0005, 
        category: "Mobil", 
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], 
        desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof. Keamanan tingkat tinggi dengan smart driving assist.",
        rating: 5.0,
        sold: 3,
        reviews: [
            { user: "VVIP_Member", comment: "Mobil impian yang akhirnya terbeli dengan Pi." }
        ]
    },
    { 
        id: 'm1', 
        name: "Motor Sport 250cc - Black Matte", 
        price: 0.002, 
        category: "Motor", 
        images: ["https://i.ibb.co.com/spcrbbKT/Motor-250cc-Terbaik.jpg"], 
        desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern. Cocok untuk penggunaan dalam kota maupun touring.",
        rating: 4.8,
        sold: 12,
        reviews: [
            { user: "RiderPi", comment: "Tarikan enteng, tampilannya gahar banget." }
        ]
    },
    { 
        id: 'm1_alt', 
        name: "Motor Sport 250cc - Kawasaki Ninja H2R", 
        price: 0.002, 
        category: "Motor", 
        images: ["https://i.ibb.co.com/Fkp8tHJH/58942-kawasaki-ninja-h2r-model-kit-motosiklet-112-39198-1.jpg"], 
        desc: "KAWASAKI NINJA H2R (Model 2026) Status: Motor produksi massal terkencang di dunia (Khusus sirkuit/Track Only).Harga: Rp1,1 Miliar - Rp1,5 Miliar.Mesin: 998cc, 4-Silinder Segaris, dengan teknologi Supercharger.Tenaga: 310 HP (Mencapai 326 HP dengan Ram Air).Top Speed: ±400 km/jam.Material: Bodi Full Carbon Fiber & Rangka Trellis Hijau Khas Kawasaki.Aerodinamika: Dilengkapi sayap karbon (winglets) untuk stabilitas di kecepatan tinggi.Kaki-kaki: Rem Brembo Stylema, Suspensi Öhlins TTX36, dan ban slick balap.",
        rating: 4.8,
        sold: 12,
        reviews: [
            { user: "RiderPi", comment: "Tarikan enteng, tampilannya gahar banget." }
        ]
    },
    {
        id: "bike-001",
        name: "Ducati Panigale V4 R",
        price: 0.01500,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 998cc Desmosedici Stradale V4 R<br>
               • <b>Tenaga:</b> 218 HP @ 15.500 RPM<br>
               • <b>Fitur:</b> Sayap Karbon (Aero Winglets), Öhlins Suspension<br>
               • <b>Transmisi:</b> Ducati Quick Shift (DQS) Up/Down EVO 2<br>
               • <b>Berat:</b> 172 kg (Dry Weight)`
    },
    {
        id: "bike-002",
        name: "Kawasaki Ninja H2R (Track Only)",
        price: 0.01800,
        category: "Motor",
        images: ["https://i.ibb.co.com/jZ6LvJTB/Desain-tanpa-judul-20260207-131613-0000.png"],
        desc: `• <b>Mesin:</b> 998cc In-line Four with Supercharger<br>
               • <b>Tenaga:</b> 310 HP (Paling bertenaga di dunia)<br>
               • <b>Top Speed:</b> 400+ km/jam<br>
               • <b>Bodi:</b> Full Carbon Fiber Aerodynamic Bodywork<br>
               • <b>Rem:</b> Brembo Stylema Monobloc Calipers`
    },
    {
        id: "bike-003",
        name: "BMW M 1000 RR",
        price: 0.01250,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 999cc Water-cooled Inline 4-Cylinder<br>
               • <b>Fitur M:</b> Velg Karbon M, Kursi M, Knalpot Akrapovic Titanium<br>
               • <b>Elektronik:</b> 7 Mode Berkendara (Rain hingga Race Pro 3)<br>
               • <b>Akselerasi:</b> 0-100 km/jam dalam 3.1 detik<br>
               • <b>Instrumen:</b> 6.5-inch TFT Display M Animation`
    },
    {
        id: "bike-004",
        name: "Harley-Davidson CVO Road Glide",
        price: 0.01400,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> Milwaukee-Eight® VVT 121 (1.977cc)<br>
               • <b>Gaya:</b> Grand American Touring Luxury<br>
               • <b>Infotainment:</b> Skyline™ OS with 12.3-inch Touchscreen<br>
               • <b>Audio:</b> Rockford Fosgate Stage II Sound System<br>
               • <b>Cat:</b> Hand-painted Custom Paint Finish`
    },
    {
        id: "bike-005",
        name: "MV Agusta Rush 1000 cc",
        price: 0.01650,
        category: "Motor",
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: `• <b>Konsep:</b> Hyper-Naked Drag Bike Luxury<br>
               • <b>Mesin:</b> 998cc 16-valve DOHC Inline 4<br>
               • <b>Edisi:</b> Limited Edition (Hanya 300 unit di dunia)<br>
               • <b>Velg:</b> Forged Aluminium with Carbon Fiber Cover<br>
               • <b>Desain:</b> Knalpot Titanium SC-Project`
    },
    {
        id: "bike-006",
        name: "Aprilia RSV4 Xtrenta",
        price: 0.01900,
        category: "Motor",
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: `• <b>Teknologi:</b> MotoGP Derived Aerodynamics (Underwing)<br>
               • <b>Mesin:</b> 1.099cc V4 Longitudinal 65°<br>
               • <b>Tenaga:</b> 230 HP / Berat 166 kg<br>
               • <b>Sasis:</b> Frame Aluminium Adjustable<br>
               • <b>Filter Udara:</b> Sprint Filter Level MotoGP`
    },
    {
        id: "bike-007",
        name: "Triumph Rocket 3 TFC",
        price: 0.00950,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 2.458cc (Mesin motor terbesar di dunia)<br>
               • <b>Torsi:</b> 225 Nm (Akselerasi instan)<br>
               • <b>Material:</b> Carbon Fiber Bodywork & Arrow Silencers<br>
               • <b>Fitur:</b> Cornering ABS & Traction Control<br>
               • <b>Edisi:</b> Triumph Factory Custom (TFC)`
    },
    {
        id: "bike-008",
        name: "Arch Motorcycle KRGT-1",
        price: 0.02500,
        category: "Motor",
        images: ["https://i.ibb.co.com/d4dwYps4/Desain-tanpa-judul-20260207-132911-0000.png"],
        desc: `• <b>Pembuat:</b> Co-founded by Keanu Reeves<br>
               • <b>Mesin:</b> 2.032cc S&S Cycle V-Twin<br>
               • <b>Produksi:</b> Bespoke (Dibuat sesuai pesanan pembeli)<br>
               • <b>Material:</b> Billet Aluminium Frame & Carbon Wheels<br>
               • <b>Suspensi:</b> Öhlins Arch Proprietary Tuning`
    },
    {
        id: "bike-010",
        name: "Honda Gold Wing Tour DCT",
        price: 0.00850,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 1.833cc Liquid-cooled 6-cylinder Boxer<br>
               • <b>Transmisi:</b> 7-speed Automatic Dual Clutch (DCT)<br>
               • <b>Kenyamanan:</b> Airbag, Walk Mode (Mundur), Apple CarPlay<br>
               • <b>Suspensi:</b> Double Wishbone Front Suspension<br>
               • <b>Kapasitas:</b> Bagasi Luas & Sandaran Punggung Elektrik`
    },
    {
        id: "car-001",
        category: "Mobil",
        name: "Toyota Fortuner 2.8 GR Sport 2024",
        price: 0.15000,
        discount: 5,
        images: ["https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1000&auto=format&fit=crop"],
        desc: `
            <strong>Spesifikasi Utama:</strong><br>
            • Kondisi: Baru (Gress)<br>
            • Mesin: 2.800 cc Diesel Turbo (1GD-FTV)<br>
            • Transmisi: Otomatis 6-Speed<br>
            • Tenaga: 203.9 PS / 500 Nm<br>
            • Sistem Penggerak: 4x2 RWD<br><br>
            
            <strong>Fitur Premium:</strong><br>
            • Full GR Sport Bodykit<br>
            • Wireless Charger & NFC<br>
            • Toyota Safety Sense (TSS)<br>
            • Kamera 360 & Power Backdoor dengan Kick Sensor<br><br>
            
            <strong>Kelengkapan:</strong><br>
            Surat Lengkap (STNK & BPKB), Garansi Resmi Toyota 3 Tahun, Gratis Service & Oli.
        `
    },
    {
        id: "car-002",
        category: "Mobil",
        name: "Honda CR-V 2.0 RS e:HEV Hybrid 2024",
        price: 0.18500,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1000&auto=format&fit=crop"],
        desc: `
            <strong>Spesifikasi Utama:</strong><br>
            • Kondisi: Baru<br>
            • Mesin: 2.0L i-VTEC + Electric Motor (Hybrid)<br>
            • Transmisi: e-CVT<br>
            • Tenaga Gabungan: 207 PS<br>
            • Warna: Platinum White Pearl<br><br>
            
            <strong>Fitur Unggulan:</strong><br>
            • Honda SENSING™ Lengkap<br>
            • Panoramic Sunroof<br>
            • BOSE Premium Sound System (12 Speakers)<br>
            • Interactive Head-up Display<br><br>
            
            <strong>Catatan:</strong><br>
            Harga sudah termasuk BBN-KB (On The Road) dan asuransi all-risk 1 tahun.
        `
    },
    {
        id: "car-003",
        category: "Mobil",
        name: "Rolls-Royce Phantom Series II",
        price: 0.15000,
        images: ["https://i.ibb.co.com/7xshksJQ/Desain-tanpa-judul-20260207-114554-0000.png"],
        desc: `• <b>Mesin:</b> 6.75L V12 Twin-Turbo<br>
               • <b>Tenaga:</b> 563 HP / 900 Nm<br>
               • <b>Interior:</b> Kustom Hand-Stitched Leather<br>
               • <b>Fitur:</b> Starlight Headliner, Magic Carpet Ride Suspension<br>
               • <b>Warna:</b> Midnight Sapphire with Silver Upper`
    },
    {
        id: "car-004",
        category: "Mobil",
        name: "Lamborghini Aventador SVJ",
        price: 0.08500,
        images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.5L V12 Naturally Aspirated<br>
               • <b>Akselerasi:</b> 0-100 km/h dalam 2.8 detik<br>
               • <b>Aerodinamis:</b> ALA 2.0 (Aerodinamica Lamborghini Attiva)<br>
               • <b>Sasis:</b> Full Carbon Fiber Monocoque<br>
               • <b>Transmisi:</b> 7-Speed ISR (Independent Shifting Rods)`
    },
    {
        id: "car-005",
        category: "Mobil",
        name: "Bentley Continental GT Mulliner",
        price: 0.06500,
        images: ["https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.0L W12 TSI Twin-Turbo<br>
               • <b>Interior:</b> Diamond-in-Diamond Quilting<br>
               • <b>Fitur:</b> Bentley Rotating Display, Mulliner Clock<br>
               • <b>Velg:</b> 22-inch Mulliner Exclusive Wheels<br>
               • <b>Audio:</b> Naim for Bentley 2.200W Sound System`
    },
    {
        id: "car-006",
        category: "Mobil",
        name: "Ferrari SF90 Stradale",
        price: 0.09200,
        images: ["https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Sistem:</b> Plug-in Hybrid AWD<br>
               • <b>Mesin:</b> 4.0L V8 Turbo + 3 Motor Listrik<br>
               • <b>Total Tenaga:</b> 1.000 CV (986 HP)<br>
               • <b>Transmisi:</b> 8-Speed F1 Dual-Clutch<br>
               • <b>Top Speed:</b> 340 km/h`
    },
    {
        id: "car-007",
        category: "Mobil",
        name: "Mercedes-Maybach S-Class S680",
        price: 0.04500,
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.0L V12 Biturbo<br>
               • <b>Kursi:</b> Executive Rear Seats with Massage Function<br>
               • <b>Hiburan:</b> MBUX High-End Rear Seat Entertainment<br>
               • <b>Fitur:</b> Digital Light, Chauffeur Package<br>
               • <b>Audio:</b> Burmester 4D Surround Sound`
    },
    {
        id: "car-008",
        category: "Mobil",
        name: "Porsche 911 GT3 RS",
        price: 0.05800,
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 4.0L Naturally Aspirated Boxer-6<br>
               • <b>RPM:</b> Redline di 9.000 RPM<br>
               • <b>Sayap:</b> Active Rear Wing with DRS (Drag Reduction System)<br>
               • <b>Berat:</b> Konstruksi CFRP Ringan (1.450 kg)<br>
               • <b>Sasis:</b> Rear-axle Steering & PASM Sport Tuning`
    },
    {
        id: "car-009",
        category: "Mobil",
        name: "Aston Martin DBS Volante",
        price: 0.07200,
        images: ["https://i.ibb.co.com/GvnNVhbt/Desain-tanpa-judul-20260207-115657-0000.png"],
        desc: `• <b>Konfigurasi:</b> Convertible (Atap Terbuka)<br>
               • <b>Mesin:</b> 5.2L V12 Twin-Turbo<br>
               • <b>Tenaga:</b> 715 BHP / 900 Nm<br>
               • <b>Rem:</b> Carbon Ceramic Brake System<br>
               • <b>Atap:</b> 8-layer Insulated Fabric Roof`
    },
    {
        id: "car-0010",
        category: "Mobil",
        name: "Bugatti Chiron Super Sport",
        price: 0.25000,
        images: ["https://i.ibb.co.com/mFMXn0VQ/Desain-tanpa-judul-20260207-120754-0000.png"],
        desc: `• <b>Mesin:</b> 8.0L W16 Quad-Turbocharged<br>
               • <b>Tenaga:</b> 1.600 PS (1.578 HP)<br>
               • <b>Ban:</b> Michelin Pilot Sport Cup 2 (Special Edition)<br>
               • <b>Bodi:</b> Longtail Aerodynamics Carbon Fiber<br>
               • <b>Akselerasi:</b> 0-200 km/h dalam 5.8 detik`
    },
    {
        id: "car-0011",
        category: "Mobil",
        name: "McLaren 720S Spider",
        price: 0.06800,
        images: ["https://i.ibb.co.com/KjcpvFzt/Desain-tanpa-judul-20260207-121412-0000.png"],
        desc: `• <b>Mesin:</b> 4.0L V8 Twin-Turbo<br>
               • <b>Sasis:</b> Monocage II-S Carbon Fiber<br>
               • <b>Pintu:</b> Double-Hinged Dihedral Doors<br>
               • <b>Suspensi:</b> Proactive Chassis Control II<br>
               • <b>Interior:</b> Alcantara & Bridge of Weir Leather`
    },
    {
        id: "car-0012",
        category: "Mobil",
        name: "Range Rover SV Autobiography",
        price: 0.04000,
        images: ["https://i.ibb.co.com/zV8hJbjn/Desain-tanpa-judul-20260207-122051-0000.png"],
        desc: `• <b>Tipe:</b> Long Wheelbase (LWB) Luxury SUV<br>
               • <b>Mesin:</b> 5.0L Supercharged V8<br>
               • <b>Belakang:</b> Hot Stone Massage Seats & Deployable Tables<br>
               • <b>Velg:</b> 23-inch Forged Wheels<br>
               • <b>Cat:</b> SV Bespoke Premium Palette`
    },
    {
        id: "gold-001",
        category: "Emas",
        name: "Emas Antam Logam Mulia 1 Gram",
        price: 0.00015,
        images: ["https://i.ibb.co.com/WW2GjHH3/Desain-tanpa-judul-20260207-134044-0000.png"],
        desc: `• <b>Berat:</b> 1 Gram<br>
               • <b>Kemurnian:</b> 999.9 (24 Karat)<br>
               • <b>Sertifikat:</b> CertiCard (New Press)<br>
               • <b>Dimensi:</b> 13 x 7.8 x 0.5 mm<br>
               • <b>Fitur:</b> QR Code autentikasi aplikasi CertiEye`
    },
    {
        id: "gold-002",
        category: "Emas",
        name: "Emas Antam Logam Mulia 2 Gram",
        price: 0.00029,
        images: ["https://i.ibb.co.com/WWSt12zP/Desain-tanpa-judul-20260207-134711-0000.png"],
        desc: `• <b>Berat:</b> 2 Gram<br>
               • <b>Kemurnian:</b> Fine Gold 999.9<br>
               • <b>Ketebalan:</b> 0.85 mm<br>
               • <b>Sertifikat:</b> Terintegrasi dalam kemasan CertiCard<br>
               • <b>Produksi:</b> PT Antam Tbk (Logam Mulia)`
    },
    {
        id: "gold-003",
        category: "Emas",
        name: "Emas Antam Logam Mulia 5 Gram",
        price: 0.00072,
        images: ["https://i.ibb.co.com/JW7Tk9kZ/Desain-tanpa-judul-20260207-141911-0000.png"],
        desc: `• <b>Berat:</b> 5 Gram<br>
               • <b>Kemurnian:</b> 99.99% Emas Murni<br>
               • <b>Dimensi:</b> 20.5 x 12.3 mm<br>
               • <b>Keamanan:</b> Barcode unik pada kemasan<br>
               • <b>Investasi:</b> Likuiditas tinggi, mudah dijual kembali`
    },
    {
        id: "gold-004",
        category: "Emas",
        name: "Emas Antam Logam Mulia 10 Gram",
        price: 0.00142,
        images: ["https://i.ibb.co.com/qMTw7ZPb/Desain-tanpa-judul-20260207-142456-0000.png"],
        desc: `• <b>Berat:</b> 10 Gram<br>
               • <b>Kemurnian:</b> Au 999.9<br>
               • <b>Desain:</b> Motif Klasik Antam<br>
               • <b>Sertifikat:</b> LBMA (London Bullion Market Association)<br>
               • <b>Kelengkapan:</b> Nota resmi pembelian digital`
    },
    {
        id: "gold-005",
        category: "Emas",
        name: "Emas Antam Logam Mulia 25 Gram",
        price: 0.00350,
        images: ["https://i.ibb.co.com/K8jSt3G/Desain-tanpa-judul-20260207-145416-0000.png"],
        desc: `• <b>Berat:</b> 25 Gram<br>
               • <b>Kemurnian:</b> 999.9 Fine Gold<br>
               • <b>Dimensi:</b> 34 x 20.4 mm<br>
               • <b>Sertifikat:</b> Akreditasi KAN (Komite Akreditasi Nasional)<br>
               • <b>Proteksi:</b> Teknologi kemasan anti-pemalsuan`
    },
    {
        id: "gold-006",
        category: "Emas",
        name: "Emas Antam Logam Mulia 50 Gram",
        price: 0.00690,
        images: ["https://i.ibb.co.com/GvbphD6M/Desain-tanpa-judul-20260207-143702-0000.png"],
        desc: `• <b>Berat:</b> 50 Gram<br>
               • <b>Bentuk:</b> Bar (Batangan)<br>
               • <b>Kemurnian:</b> 24 Karat (99.99%)<br>
               • <b>Sertifikat:</b> Global Standard LBMA<br>
               • <b>Dimensi:</b> 42.5 x 25.5 mm`
    },
    {
        id: "gold-007",
        category: "Emas",
        name: "Emas Antam Logam Mulia 100 Gram",
        price: 0.01370,
        images: ["https://i.ibb.co.com/PzwYFNZ8/Desain-tanpa-judul-20260207-150017-0000.png"],
        desc: `• <b>Berat:</b> 100 Gram<br>
               • <b>Kemurnian:</b> Au 999.9<br>
               • <b>Sertifikat:</b> Terpisah (Sertifikat Kertas Klasik/CertiCard)<br>
               • <b>Dimensi:</b> 50 x 30 mm<br>
               • <b>Nilai:</b> Instrumen lindung nilai (Hedging) terbaik`
    },
    {
        id: "gold-010",
        category: "Emas",
        name: "Emas Antam Logam Mulia 250 Gram",
        price: 0.03400,
        images: ["https://i.ibb.co.com/hx080kjJ/Desain-tanpa-judul-20260207-150526-0000.png"],
        desc: `• <b>Berat:</b> 250 Gram<br>
               • <b>Bentuk:</b> Cast Bar (Emas Tuang)<br>
               • <b>Kemurnian:</b> 999.9 Fine Gold<br>
               • <b>Standar:</b> Akreditasi Internasional LBMA<br>
               • <b>Status:</b> Barang koleksi & Investasi institusi`
    },
    {
        id: "gold-010",
        category: "Emas",
        name: "Emas Antam Logam Mulia 500 Gram",
        price: 0.06400,
        images: ["https://i.ibb.co.com/vvvCTrw1/Desain-tanpa-judul-20260207-151033-0000.png"],
        desc: `• <b>Berat:</b> 250 Gram<br>
               • <b>Bentuk:</b> Cast Bar (Emas Tuang)<br>
               • <b>Kemurnian:</b> 999.9 Fine Gold<br>
               • <b>Standar:</b> Akreditasi Internasional LBMA<br>
               • <b>Status:</b> Barang koleksi & Investasi institusi`
    },
    {
        id: "gold-010",
        category: "Emas",
        name: "Emas Antam Logam Mulia 500 Gram",
        price: 0.06400,
        images: ["https://i.ibb.co.com/vvvCTrw1/Desain-tanpa-judul-20260207-151033-0000.png"],
        desc: `• <b>Berat:</b> 250 Gram<br>
               • <b>Bentuk:</b> Cast Bar (Emas Tuang)<br>
               • <b>Kemurnian:</b> 999.9 Fine Gold<br>
               • <b>Standar:</b> Akreditasi Internasional LBMA<br>
               • <b>Status:</b> Barang koleksi & Investasi institusi`
    },
    {
Dan masih ada sambungannya dan saya akan mengirimkannya
    

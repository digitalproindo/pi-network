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
       Saya akan mengirimkan sambungannya.
    

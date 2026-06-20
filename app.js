// =========================================================================
// POP-UP KUSTOM DIGITAL PREMIUM (TAMBAHKAN KODE INI DI BARISaling ATAS)
// =========================================================================
function tampilkanDpiAlert(judul, pesan, tipe = 'sukses') {
    if (!document.getElementById('dpiModalStyle')) {
        const modalStyle = document.createElement('style');
        modalStyle.id = 'dpiModalStyle';
        modalStyle.innerHTML = `
            .dpi-custom-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(13, 3, 26, 0.85); backdrop-filter: blur(8px);
                display: flex; justify-content: center; align-items: center; z-index: 100000;
                opacity: 0; transition: opacity 0.3s ease;
            }
            .dpi-custom-modal-box {
                background: linear-gradient(135deg, #1a0033 0%, #3d0066 100%);
                border: 2px solid var(--border-color, #d4af37); border-radius: 16px;
                width: 85%; max-width: 320px; padding: 25px; text-align: center;
                box-shadow: 0 10px 30px rgba(212, 175, 55, 0.25);
                transform: scale(0.8); transition: transform 0.3s ease;
            }
            .dpi-custom-modal-overlay.show { opacity: 1; }
            .dpi-custom-modal-overlay.show .dpi-custom-modal-box { transform: scale(1); }
            .dpi-modal-icon-container {
                width: 60px; height: 60px; background: var(--bg-icon, rgba(212, 175, 55, 0.1));
                border: 2px dashed var(--border-icon, #d4af37); border-radius: 50%;
                display: flex; justify-content: center; align-items: center; margin: 0 auto 15px auto;
                animation: pulseGold 2s infinite;
            }
            .dpi-modal-icon-container i { font-size: 26px; color: var(--border-icon, #d4af37); }
            .dpi-modal-title { color: #ffffff; font-size: 15px; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px; }
            .dpi-modal-text { color: #dfcbf2; font-size: 12px; line-height: 1.5; margin-bottom: 20px; }
            .dpi-modal-btn {
                background: var(--bg-btn, linear-gradient(90deg, #d4af37 0%, #b89324 100%)); color: var(--text-btn, #1a0033);
                border: none; padding: 11px 24px; font-size: 12px; font-weight: 700; border-radius: 25px;
                cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }
            @keyframes pulseGold {
                0% { box-shadow: 0 0 0 0 var(--pulse-color, rgba(212, 175, 55, 0.4)); }
                70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
                100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
            }
        `;
        document.head.appendChild(modalStyle);
    }

    const overlay = document.createElement('div');
    overlay.className = 'dpi-custom-modal-overlay';
    
    if (tipe === 'peringatan') {
        overlay.style.setProperty('--border-color', '#ff4d4d');
        overlay.style.setProperty('--bg-icon', 'rgba(255, 77, 77, 0.1)');
        overlay.style.setProperty('--border-icon', '#ff4d4d');
        overlay.style.setProperty('--bg-btn', '#ff4d4d');
        overlay.style.setProperty('--text-btn', '#ffffff');
        overlay.style.setProperty('--pulse-color', 'rgba(255, 77, 77, 0.4)');
    }

    const ikon = tipe === 'peringatan' ? 'fa-triangle-exclamation' : 'fa-circle-check';

    overlay.innerHTML = `
        <div class="dpi-custom-modal-box">
            <div class="dpi-modal-icon-container"><i class="fa-solid ${ikon}"></i></div>
            <div class="dpi-modal-title">${judul}</div>
            <div class="dpi-modal-text">${pesan}</div>
            <button class="dpi-modal-btn" id="closeDpiModalBtn">KONFIRMASI</button>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('show'), 10);

    document.getElementById('closeDpiModalBtn').addEventListener('click', function() {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    });
}

// =========================================================================
// 1. GLOBAL STATE & CONFIGURATION (KODE ASLI BAWAAN ANDA SEBELUMNYA)
// =========================================================================
let currentUser = null;
let cart = [];
let userAddress = { nama: "", telepon: "", alamatLengkap: "" };
const ADMIN_WA = "6281906066757"; 


// =========================================================================
// 1. GLOBAL STATE & CONFIGURATION
// =========================================================================
let currentUser = null;
let cart = [];
let userAddress = { nama: "", telepon: "", alamatLengkap: "" };
const ADMIN_WA = "6281906066757"; 

// =========================================================================
// 2. PRODUCTS DATA SOURCE
// =========================================================================
const productsData = [
    {
        id: "house-001",
        category: "Rumah",
        name: "The Beverly Hills Modern Mansion",
        price: 3.25000,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Luas Tanah:</b> 2.500 m²<br>• <b>Kamar Tidur:</b> 7 Master Suite<br>• <b>Fasilitas:</b> Infinity Pool, Home Cinema, Wine Cellar<br>• <b>Lokasi:</b> Beverly Hills, California<br>• <b>Garasi:</b> Kapasitas 10 Mobil Mewah`
    },
    {
        id: "house-002",
        category: "Rumah",
        name: "Zen Waterfront Villa",
        price: 3.18000,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Pemandangan:</b> Akses Langsung ke Danau Privasi<br>• <b>Gaya:</b> Arsitektur Minimalis Modern<br>• <b>Fasilitas:</b> Dermaga Pribadi, Spa & Sauna, Gym<br>• <b>Sistem:</b> Full Smart Home Technology<br>• <b>Keamanan:</b> Biometric Entry System`
    },
    {
        id: "house-003",
        category: "Rumah",
        name: "Penthouse Skyline Duplex",
        price: 2.12000,
        images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lantai:</b> Lantai 50 & 51 (Top Floor)<br>• <b>Pemandangan:</b> 360° City Skyline View<br>• <b>Interior:</b> Marmer Italia & Panel Emas<br>• <b>Fasilitas:</b> Private Rooftop Garden & Jacuzzi<br>• <b>Layanan:</b> 24/7 Concierge Service`
    },
    {
        id: "house-005",
        category: "Rumah",
        name: "Tropical Cliffside Sanctuary",
        price: 4.15500,
        images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> Tebing Uluwatu, Bali<br>• <b>Konsep:</b> Open Living Space with Ocean View<br>• <b>Fasilitas:</b> Private Beach Access, Deck Yoga<br>• <b>Struktur:</b> Kayu Ulin & Batu Alam Lokal<br>• <b>Kamar:</b> 5 Suite dengan Semi-Outdoor Bathroom`
    },
    {
        id: "house-008",
        category: "Rumah",
        name: "The Glass House Estate",
        price: 3.21000,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Material Dominan:</b> Kaca Tempered & Baja Hitam<br>• <b>Privasi:</b> Smart Glass (Bisa Buram Otomatis)<br>• <b>Lansekap:</b> Koi Pond Keliling Bangunan<br>• <b>Ruang:</b> Galeri Seni Pribadi & Studio Musik<br>• <b>Luas:</b> Kavling Sudut 3.000 m²`
    },
    {
        id: "house-009",
        category: "Rumah",
        name: "Mediterranean Seafront Palace",
        price: 3.28000,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> French Riviera (Cote d'Azur)<br>• <b>Atap:</b> Terakota Tradisional Spanyol<br>• <b>Taman:</b> Kebun Zaitun & Citrus<br>• <b>Fasilitas:</b> Lapangan Tenis Pribadi, Helipad<br>• <b>Kamar Mandi:</b> Perlengkapan Emas 24 Karat`
    },
    {
        id: "house-010",
        category: "Rumah",
        name: "The Urban Luxury Loft",
        price: 2.08800,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Tipe:</b> Industrial Luxury Loft<br>• <b>Tinggi Plafon:</b> 6 Meter (Double Height Ceiling)<br>• <b>Fitur:</b> Tangga Melingkar Besi Kustom<br>• <b>Lokasi:</b> Pusat Distrik Finansial<br>• <b>Sistem:</b> Voice Controlled Home Automation`
    },
    {
        id: "house-011",
        category: "Rumah",
        name: "The Floating Diamond Villa",
        price: 2.19500,
        images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 550 m² (Struktur Terapung)<br>• <b>Lokasi:</b> Maladewa (Private Lagoon)<br>• <b>Fitur:</b> Kamar Tidur Bawah Laut, Dek Berjemur 360°<br>• <b>Material:</b> Kaca Anti-Karat & Kayu Jati Reklamasi<br>• <b>Energi:</b> Kemandirian Energi dengan Panel Surya Laut`
    },
    {
        id: "house-013",
        category: "Rumah",
        name: "Cyber-Tech Underground Bunker",
        price: 3.16000,
        images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 900 m² (Kedalaman 15 Meter)<br>• <b>Keamanan:</b> Pintu Anti-Ledakan, Sistem Filtrasi Udara Nuklir<br>• <b>Fasilitas:</b> Kebun Hidroponik Indoor, Simulator Golf<br>• <b>Teknologi:</b> AI Butler terintegrasi ke seluruh ruangan<br>• <b>Lantai:</b> Epoxy Resin Anti-Statis & Dinding Beton Ekspos`
    },
    {
        id: "house-014",
        category: "Rumah",
        name: "Aspen Snow Peak Lodge",
        price: 3.13500,
        images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 3.500 m² / LB 700 m²<br>• <b>Lokasi:</b> Aspen, Colorado (Ski-in/Ski-out Access)<br>• <b>Fitur:</b> Perapian Batu Alam Raksasa, Kolam Air Hangat Outdoor<br>• <b>Material:</b> Kayu Pinus Tua & Batu Granit Pegunungan<br>• <b>Ruangan:</b> Ruang Simpan Perlengkapan Ski Khusus`
    },
    {
        id: "house-015",
        category: "Rumah",
        name: "Mediterranean Cliff Villa",
        price: 3.27000,
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 2.200 m² / LB 950 m²<br>• <b>Pemandangan:</b> Laut Mediterania (Amalfi Coast)<br>• <b>Fasilitas:</b> Lift Tebing Pribadi, Bar Tepi Kolam, Bioskop Terbuka<br>• <b>Interior:</b> Keramik Hand-Painted Italia & Furnitur Putih Bersih<br>• <b>Lanskap:</b> Kebun Vertikal & Pohon Lemon`
    },
    {
        id: "house-016",
        category: "Rumah",
        name: "The Brutalist Cube Estate",
        price: 3.11000,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 1.500 m² / LB 800 m²<br>• <b>Gaya:</b> Brutalisme Kontemporer (Raw Concrete)<br>• <b>Ruangan:</b> Studio Lukis & Ruang Musik Kedap Suara<br>• <b>Fitur:</b> Skylight Masif di Tengah Rumah<br>• <b>Sistem:</b> Smart Lighting System yang mengikuti ritme sirkadian`
    },
    {
        id: "house-017",
        category: "Rumah",
        name: "Amazonian Eco-Mansion",
        price: 3.14500,
        images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 10.000 m² / LB 650 m² (Floating on stilts)<br>• <b>Konsep:</b> Regenerative Architecture (Mandiri Air & Limbah)<br>• <b>Fitur:</b> Dinding Tanaman Hidup, Kolam Renang Air Hujan<br>• <b>Material:</b> Bambu Laminasi & Atap Daun Rumbia Sintetis<br>• <b>Lokasi:</b> Hutan Lindung Tropis`
    },
    {
        id: "house-019",
        category: "Rumah",
        name: "Dubai Sky-High Villa",
        price: 4.35000,
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LB 1.100 m² (Penthouse 3 Lantai)<br>• <b>Fasilitas:</b> Kolam Renang Kaca Gantung, Helipad Gedung<br>• <b>Interior:</b> Aksen Emas 24K & Kristal Baccarat<br>• <b>Pemandangan:</b> Burj Khalifa & Palm Jumeirah<br>• <b>Layanan:</b> Private Chef & Sopir Rolls-Royce`
    },
    {
        id: "house-020",
        category: "Rumah",
        name: "The Vineyard Ranch Estate",
        price: 2.17500,
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Dimensi:</b> LT 15 Hektar / LB 1.300 m²<br>• <b>Fitur:</b> Perkebunan Anggur Pribadi, Pabrik Pengolahan Wine<br>• <b>Fasilitas:</b> Lapangan Berkuda, Kandang Kuda Premium<br>• <b>Interior:</b> Gaya Farmhouse Modern dengan Kayu Oak Ekspos<br>• <b>Dapur:</b> Outdoor BBQ Station & Pizza Wood-Oven`
    },
    { 
        id: 'p2', 
        name: "COCO Pro Kunyit", 
        price: 0.00006,
        discount: 5, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
        desc: "Super food Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma Dan Dengan Formula Bioteknologi Khusus Live probiotic, Immune support,High Antioksidant,Improved Digestion,Naturally Energizing."
    },
    { 
        id: 'p3', 
        name: "An-Nisa", 
        price: 0.00010,
        discount: 5, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
        desc: "Keputihan, Gatal-gatal ,Membunuh bakteri, Melancarkan menstruasi, Mengatasi nyeri haid, Mencegah kanker rahim, Membasmi mioma / Kista, Merapatkan dan mengencangkan, Mengatasi semua problem kewanitaan,Memperbaiki dan memperbanyak hormon"
    },
    { 
        id: 'p4', 
        name: "Ar-Rizal", 
        price: 0.00010,
        discount: 5, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
        desc: "Mengencangkan Mr.P, Menguatkan Mr.P, Menguatkan Jantung, Meningkatkan gairah, Mengatasi ejakulasi dini, Suplemen terbaik buat Profil, Meningkatkan kwalitas Hormon, Memperlama hubungan Pasutri, Melancarkan sirkulasi darah ke alat vital, Meningkatkan dan memperbanyak kwalitas Hormon"
    },
    { 
        id: 'p3_smart', 
        name: "Smart Home System Pro", 
        price: 0.500, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], 
        desc: "Paket instalasi smart home berbasis IoT. Kontrol rumah Anda dengan integrasi Pi Browser yang aman dan cepat."
    },
    { 
        id: 'p4_phone', 
        name: "Premium Smartphone X", 
        price: 1.200, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], 
        desc: "Gadget premium dengan performa tinggi. Kamera resolusi tinggi dan baterai tahan lama untuk penggunaan harian."
    },
    { 
        id: 'p5', 
        name: "Sofa Minimalis 2 Seater - Modern Grey", 
        price: 0.05, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], 
        desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu kecil. Bahan kain breathable dan busa tahan kempes."
    },
    { 
        id: 'p6', 
        name: "Nabidz Dessert", 
        price: 0.00012,
        discount: 0,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
        desc: "Nabidz Dessert bahan baku buah anggur merah yang di fermentasi esterifikasi biokimia resep pribadi dan di padu dengan proses istihalah microbiome dan asam organik akan meningkatkan kualitas pencernaan dimana sistem imun 90% pada pencernaan."
    },
    { 
        id: 'p7', 
        name: "Lampu Gantung Industrial - Model Black Dome", 
        price: 0.015, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"], 
        desc: "Lampu dekoratif plafon, diameter 30cm untuk kesan estetik industrial di cafe atau rumah Anda."
    },
    { 
        id: 'p8', 
        name: "Rak Buku Kayu 5 Tingkat - Slim Design", 
        price: 0.03, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"], 
        desc: "Rak buku hemat ruang, tinggi 180cm lebar 40cm. Mudah dirakit dan sanggup menahan beban berat."
    },
    { 
        id: 'p9', 
        name: "Karpet Bulu Lembut 160x210 - Creamy White", 
        price: 0.012, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"], 
        desc: "Karpet lantai premium, sangat lembut dan mudah dibersihkan. Memberikan kesan hangat pada kamar tidur."
    },
    { 
        id: 'p10', 
        name: "Set Gorden Jendela - Model Smokering Minimalis", 
        price: 0.008, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"], 
        desc: "Gorden blackout ukuran 140x220cm, tersedia berbagai warna. Menghalau sinar matahari hingga 90%."
    },
    { 
        id: 'p11', 
        name: "Jam Dinding Kayu - Tipe Scandinavian", 
        price: 0.005, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"], 
        desc: "Jam dinding estetik diameter 35cm, mesin sweep movement (tidak berdetak). Tenang dan elegan."
    },
    { 
        id: 'p12', 
        name: "Tanaman Hias Artificial - Model Monstera Large", 
        price: 0.01, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"], 
        desc: "Tanaman palsu mirip asli dengan pot keramik, tinggi 80cm. Memberikan kesan hijau tanpa perlu perawatan."
    },
    { 
        id: 'e1', 
        name: "Smartphone Pi-Phone X - 256GB Platinum", 
        price: 0.15, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"], 
        desc: "Layar AMOLED 6.7 inci, RAM 12GB, Baterai 5000mAh. Support native Pi App ekosistem."
    },
    { 
        id: 'e2', 
        name: "Wireless Earbuds Pro - Noise Cancelling", 
        price: 0.02, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"], 
        desc: "Audio High-Fidelity, tahan air IPX5. Baterai tahan hingga 24 jam dengan case pengisian."
    },
    { 
        id: 'hb4', 
        name: "COCO Pro 10", 
        price: 0.00006, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
        desc: "Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma Dan Dengan Formula Bioteknologi Khusus Live probiotic, Immune support,High Antioksidant,Improved Digestion,Naturally Energizing."
    },
    { 
        id: 'v1', 
        name: "Sedan Sport Luxury - Tipe S1", 
        price: 0.0005, 
        category: "Mobil", 
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], 
        desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof. Keamanan tingkat tinggi dengan smart driving assist."
    },
    { 
        id: 'm1', 
        name: "Motor Sport 250cc - Black Matte", 
        price: 0.002, 
        category: "Motor", 
        images: ["https://i.ibb.co.com/spcrbbKT/Motor-250cc-Terbaik.jpg"], 
        desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern. Cocok untuk penggunaan dalam kota maupun touring."
    },
    { 
        id: 'm1_alt', 
        name: "Motor Sport 250cc - Kawasaki Ninja H2R", 
        price: 0.002, 
        category: "Motor", 
        images: ["https://i.ibb.co.com/Fkp8tHJH/58942-kawasaki-ninja-h2r-model-kit-motosiklet-112-39198-1.jpg"], 
        desc: "KAWASAKI NINJA H2R (Model 2026) Status: Motor produksi massal terkencang di dunia (Khusus sirkuit/Track Only). Rangka Trellis Hijau Khas Kawasaki."
    },
    {
        id: "bike-001",
        name: "Ducati Panigale V4 R",
        price: 0.01500,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 998cc Desmosedici Stradale V4 R<br>• <b>Tenaga:</b> 218 HP @ 15.500 RPM<br>• <b>Fitur:</b> Sayap Karbon (Aero Winglets), Öhlins Suspension`
    },
    {
        id: "bike-002",
        name: "Kawasaki Ninja H2R (Track Only)",
        price: 0.01800,
        category: "Motor",
        images: ["https://i.ibb.co.com/jZ6LvJTB/Desain-tanpa-judul-20260207-131613-0000.png"],
        desc: `• <b>Mesin:</b> 998cc In-line Four with Supercharger<br>• <b>Tenaga:</b> 310 HP (Paling bertenaga di dunia)<br>• <b>Top Speed:</b> 400+ km/jam`
    },
    {
        id: "bike-003",
        name: "BMW M 1000 RR",
        price: 0.01250,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 999cc Water-cooled Inline 4-Cylinder<br>• <b>Fitur M:</b> Velg Karbon M, Kursi M, Knalpot Akrapovic Titanium`
    },
    {
        id: "bike-004",
        name: "Harley-Davidson CVO Road Glide",
        price: 0.01400,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> Milwaukee-Eight® VVT 121 (1.977cc)<br>• <b>Gaya:</b> Grand American Touring Luxury`
    },
    {
        id: "bike-005",
        name: "MV Agusta Rush 1000 cc",
        price: 0.01650,
        category: "Motor",
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: `• <b>Konsep:</b> Hyper-Naked Drag Bike Luxury<br>• <b>Mesin:</b> 998cc 16-valve DOHC Inline 4`
    },
    {
        id: "bike-006",
        name: "Aprilia RSV4 Xtrenta",
        price: 0.01900,
        category: "Motor",
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: `• <b>Teknologi:</b> MotoGP Derived Aerodynamics<br>• <b>Mesin:</b> 1.099cc V4 Longitudinal 65°`
    },
    {
        id: "bike-007",
        name: "Triumph Rocket 3 TFC",
        price: 0.00950,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 2.458cc (Mesin motor terbesar di dunia)<br>• <b>Torsi:</b> 225 Nm (Akselerasi instan)`
    },
    {
        id: "bike-008",
        name: "Arch Motorcycle KRGT-1",
        price: 0.02500,
        category: "Motor",
        images: ["https://i.ibb.co.com/d4dwYps4/Desain-tanpa-judul-20260207-132911-0000.png"],
        desc: `• <b>Pembuat:</b> Co-founded by Keanu Reeves<br>• <b>Mesin:</b> 2.032cc S&S Cycle V-Twin`
    },
    {
        id: "bike-010",
        name: "Honda Gold Wing Tour DCT",
        price: 0.00850,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 1.833cc Liquid-cooled 6-cylinder Boxer<br>• <b>Transmisi:</b> 7-speed Automatic Dual Clutch (DCT)`
    },
    {
        id: "car-001",
        category: "Mobil",
        name: "Toyota Fortuner 2.8 GR Sport 2024",
        price: 0.15000,
        discount: 5,
        images: ["https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1000&auto=format&fit=crop"],
        desc: `• Mesin: 2.800 cc Diesel Turbo<br>• Transmisi: Otomatis 6-Speed<br>• Tenaga: 203.9 PS / 500 Nm`
    },
    {
        id: "car-002",
        category: "Mobil",
        name: "Honda CR-V 2.0 RS e:HEV Hybrid 2024",
        price: 0.18500,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1000&auto=format&fit=crop"],
        desc: `• Mesin: 2.0L i-VTEC + Electric Motor (Hybrid)<br>• Transmisi: e-CVT<br>• Fitur: Panoramic Sunroof & BOSE Audio`
    },
    {
        id: "car-003",
        category: "Mobil",
        name: "Rolls-Royce Phantom Series II",
        price: 0.15000,
        images: ["https://i.ibb.co.com/7xshksJQ/Desain-tanpa-judul-20260207-114554-0000.png"],
        desc: `• <b>Mesin:</b> 6.75L V12 Twin-Turbo<br>• <b>Fitur:</b> Starlight Headliner, Magic Carpet Ride`
    },
    {
        id: "car-004",
        category: "Mobil",
        name: "Lamborghini Aventador SVJ",
        price: 0.08500,
        images: ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.5L V12 Naturally Aspirated<br>• <b>Akselerasi:</b> 0-100 km/h dalam 2.8 detik`
    },
    {
        id: "car-005",
        category: "Mobil",
        name: "Bentley Continental GT Mulliner",
        price: 0.06500,
        images: ["https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.0L W12 TSI Twin-Turbo<br>• <b>Interior:</b> Diamond-in-Diamond Quilting`
    },
    {
        id: "car-006",
        category: "Mobil",
        name: "Ferrari SF90 Stradale",
        price: 0.09200,
        images: ["https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Sistem:</b> Plug-in Hybrid AWD<br>• <b>Mesin:</b> 4.0L V8 Turbo + 3 Motor Listrik`
    },
    {
        id: "car-007",
        category: "Mobil",
        name: "Mercedes-Maybach S-Class S680",
        price: 0.04500,
        images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 6.0L V12 Biturbo<br>• <b>Kursi:</b> Executive Rear Seats with Massage Function`
    },
    {
        id: "car-008",
        category: "Mobil",
        name: "Porsche 911 GT3 RS",
        price: 0.05800,
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Mesin:</b> 4.0L Naturally Aspirated Boxer-6<br>• <b>Sayap:</b> Active Rear Wing with DRS`
    },
    {
        id: "car-009",
        category: "Mobil",
        name: "Aston Martin DBS Volante",
        price: 0.07200,
        images: ["https://i.ibb.co.com/GvnNVhbt/Desain-tanpa-judul-20260207-115657-0000.png"],
        desc: `• <b>Konfigurasi:</b> Convertible<br>• <b>Mesin:</b> 5.2L V12 Twin-Turbo`
    },
    {
        id: "car-0010",
        category: "Mobil",
        name: "Bugatti Chiron Super Sport",
        price: 0.25000,
        images: ["https://i.ibb.co.com/mFMXn0VQ/Desain-tanpa-judul-20260207-120754-0000.png"],
        desc: `• <b>Mesin:</b> 8.0L W16 Quad-Turbocharged<br>• <b>Tenaga:</b> 1.600 PS (1.578 HP)`
    },
    {
        id: "car-0011",
        category: "Mobil",
        name: "McLaren 720S Spider",
        price: 0.06800,
        images: ["https://i.ibb.co.com/KjcpvFzt/Desain-tanpa-judul-20260207-121412-0000.png"],
        desc: `• <b>Mesin:</b> 4.0L V8 Twin-Turbo<br>• <b>Sasis:</b> Monocage II-S Carbon Fiber`
    },
    {
        id: "car-0012",
        category: "Mobil",
        name: "Range Rover SV Autobiography",
        price: 0.04000,
        images: ["https://i.ibb.co.com/zV8hJbjn/Desain-tanpa-judul-20260207-122051-0000.png"],
        desc: `• <b>Tipe:</b> Long Wheelbase Luxury SUV<br>• <b>Mesin:</b> 5.0L Supercharged V8`
    },
    {
        id: "gold-001",
        category: "Emas",
        name: "Emas Antam Logam Mulia 1 Gram",
        price: 0.00015,
        images: ["https://i.ibb.co.com/WW2GjHH3/Desain-tanpa-judul-20260207-134044-0000.png"],
        desc: `• <b>Berat:</b> 1 Gram<br>• <b>Kemurnian:</b> 999.9 (24 Karat)<br>• <b>Fitur:</b> QR Code CertiEye`
    },
    {
        id: "gold-002",
        category: "Emas",
        name: "Emas Antam Logam Mulia 2 Gram",
        price: 0.00029,
        images: ["https://i.ibb.co.com/WWSt12zP/Desain-tanpa-judul-20260207-134711-0000.png"],
        desc: `• <b>Berat:</b> 2 Gram<br>• <b>Kemurnian:</b> Fine Gold 999.9`
    },
    {
        id: "gold-003",
        category: "Emas",
        name: "Emas Antam Logam Mulia 5 Gram",
        price: 0.00072,
        images: ["https://i.ibb.co.com/JW7Tk9kZ/Desain-tanpa-judul-20260207-141911-0000.png"],
        desc: `• <b>Berat:</b> 5 Gram<br>• <b>Kemurnian:</b> 99.99% Emas Murni`
    },
    {
        id: "gold-004",
        category: "Emas",
        name: "Emas Antam Logam Mulia 10 Gram",
        price: 0.00142,
        images: ["https://i.ibb.co.com/qMTw7ZPb/Desain-tanpa-judul-20260207-142456-0000.png"],
        desc: `• <b>Berat:</b> 10 Gram<br>• <b>Sertifikat:</b> LBMA (London Bullion Market)`
    },
    {
        id: "gold-005",
        category: "Emas",
        name: "Emas Antam Logam Mulia 25 Gram",
        price: 0.00350,
        images: ["https://i.ibb.co.com/K8jSt3G/Desain-tanpa-judul-20260207-145416-0000.png"],
        desc: `• <b>Berat:</b> 25 Gram<br>• <b>Sertifikat:</b> Akreditasi KAN`
    },
    {
        id: "gold-006",
        category: "Emas",
        name: "Emas Antam Logam Mulia 50 Gram",
        price: 0.00690,
        images: ["https://i.ibb.co.com/GvbphD6M/Desain-tanpa-judul-20260207-143702-0000.png"],
        desc: `• <b>Berat:</b> 50 Gram<br>• <b>Kemurnian:</b> 24 Karat (99.99%)`
    },
    {
        id: "gold-007",
        category: "Emas",
        name: "Emas Antam Logam Mulia 100 Gram",
        price: 0.01370,
        images: ["https://i.ibb.co.com/PzwYFNZ8/Desain-tanpa-judul-20260207-150017-0000.png"],
        desc: `• <b>Berat:</b> 100 Gram<br>• <b>Nilai:</b> Instrumen lindung nilai terbaik`
    },
    {
        id: "gold-010",
        category: "Emas",
        name: "Emas Antam Logam Mulia 250 Gram",
        price: 0.03400,
        images: ["https://i.ibb.co.com/hx080kjJ/Desain-tanpa-judul-20260207-150526-0000.png"],
        desc: `• <b>Berat:</b> 250 Gram<br>• <b>Bentuk:</b> Cast Bar (Emas Tuang)`
    },
    {
        id: "gold-011",
        category: "Emas",
        name: "Emas Antam Logam Mulia 500 Gram",
        price: 0.06400,
        images: ["https://vvvCTrw1/Desain-tanpa-judul-20260207-151033-0000.png"],
        desc: `• <b>Berat:</b> 500 Gram<br>• <b>Bentuk:</b> Cast Bar Premium`
    },
    {
        id: "gadget-001",
        category: "Gadget",
        name: "iPhone 15 Pro Max 512GB",
        price: 0.00250,
        images: ["https://i.ibb.co.com/kgxjnpyp/Desain-tanpa-judul-20260207-181545-0000.png"],
        desc: `• <b>Layar:</b> 6.7" Super Retina XDR OLED<br>• <b>Chipset:</b> A17 Pro (3nm)<br>• <b>Material:</b> Titanium Grade 5`
    },
    {
        id: "gadget-002",
        category: "Gadget",
        name: "Samsung Galaxy S24 Ultra",
        price: 0.00235,
        images: ["https://i.ibb.co.com/RprpNpf6/Desain-tanpa-judul-20260207-182139-0000.png"],
        desc: `• <b>Layar:</b> 6.8" Dynamic LTPO AMOLED 2X<br>• <b>AI:</b> Galaxy AI (Circle to Search)`
    }
];

// Otomatis isi properti rating default jika tidak ada
productsData.forEach(p => {
    if(!p.rating) p.rating = 4.8;
    if(!p.sold) p.sold = Math.floor(Math.random() * 100) + 10;
    if(!p.reviews) p.reviews = [{user: "Pembeli", comment: "Barang bagus sesuai pesanan."}];
});

// =========================================================================
// 3. PI INITIALIZATION & FUNCTION UTILITIES (DENGAN LOGIN OTOMATIS)
// =========================================================================
async function initPi() {
    try {
        if (window.Pi) {
            // Aktifkan mode sandbox: true untuk pengujian testnet
            await window.Pi.init({ version: "2.0", sandbox: true });
            console.log("Pi SDK Berhasil Diinisialisasi");

            // Paksa login otomatis demi verifikasi Robot App Studio
            const scopes = ['username', 'payments'];
            window.Pi.authenticate(scopes, (p) => handleIncompletePayment(p))
                .then(function(auth) {
                    currentUser = auth.user;
                    console.log("Login otomatis sukses! Pengguna:", currentUser.username);

                    const profileDisplay = document.getElementById('profile-username') || document.querySelector('.username-text');
                    if (profileDisplay) profileDisplay.innerText = currentUser.username;

                    const profileAddress = document.getElementById('profile-address');
                    if (profileAddress) profileAddress.innerText = currentUser.uid;

                    const loginBtn = document.getElementById('login-btn');
                    if (loginBtn) {
                        loginBtn.innerText = "LOGOUT";
                        loginBtn.style.background = "linear-gradient(to right, #ef4444, #b91c1c)";
                        loginBtn.onclick = () => location.reload();
                    }
                })
                .catch(function(error) {
                    console.error("Gagal Autentikasi Otomatis:", error);
                });
        }
    } catch (e) { 
        console.error("Init Error:", e); 
    }
}

async function handleIncompletePayment(p) {
    await fetch('https://www.ptdigitalproindo.com/api/complete', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({ paymentId: p.identifier, txid: p.transaction.txid }) 
    });
}

// =========================================================================
// 4. RENDERING & UI FUNCTIONS
// =========================================================================
function renderProducts(data, targetGridId) {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;
    grid.innerHTML = "";
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
    overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
    overlay.innerHTML = `
        <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:350px; color:#333; position:relative;">
            <div onclick="document.getElementById('address-overlay').remove()" style="position:absolute; top:15px; right:15px; width:30px; height:30px; background:#f2f2f2; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; color:#666;">✕</div>
            <h3 style="margin-top:0; margin-bottom:20px; text-align:center;">Alamat Pengiriman</h3>
            <div style="margin-bottom:12px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">Nama Penerima</label><input type="text" id="ship-name" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" value="${userAddress.nama}"></div>
            <div style="margin-bottom:12px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">No HP/WA</label><input type="number" id="ship-phone" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" value="${userAddress.telepon}"></div>
            <div style="margin-bottom:20px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">Alamat Lengkap</label><textarea id="ship-address" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; height:80px; box-sizing:border-box; resize:none;">${userAddress.alamatLengkap}</textarea></div>
            <button onclick="saveAddress()" style="width:100%; background:#6748d7; color:white; border:none; padding:14px; border-radius:10px; font-weight:bold; cursor:pointer;">Simpan Alamat</button>
        </div>`;
    document.body.appendChild(overlay);
};

// =========================================================================
// MODIFIKASI FORM ALAMAT DIGITAL PREMIUM (GANTI TOTAL DI APP.JS)
// =========================================================================

// 1. Fungsi Pembuat Elemen Pop-up Digital Kustom
function tampilkanDpiAlert(judul, pesan, tipe = 'sukses') {
    if (!document.getElementById('dpiModalStyle')) {
        const modalStyle = document.createElement('style');
        modalStyle.id = 'dpiModalStyle';
        modalStyle.innerHTML = `
            .dpi-custom-modal-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(13, 3, 26, 0.85); backdrop-filter: blur(8px);
                display: flex; justify-content: center; align-items: center; z-index: 100000;
                opacity: 0; transition: opacity 0.3s ease;
            }
            .dpi-custom-modal-box {
                background: linear-gradient(135deg, #1a0033 0%, #3d0066 100%);
                border: 2px solid var(--border-color, #d4af37); border-radius: 16px;
                width: 85%; max-width: 320px; padding: 25px; text-align: center;
                box-shadow: 0 10px 30px rgba(212, 175, 55, 0.25);
                transform: scale(0.8); transition: transform 0.3s ease;
            }
            .dpi-custom-modal-overlay.show { opacity: 1; }
            .dpi-custom-modal-overlay.show .dpi-custom-modal-box { transform: scale(1); }
            .dpi-modal-icon-container {
                width: 60px; height: 60px; background: var(--bg-icon, rgba(212, 175, 55, 0.1));
                border: 2px dashed var(--border-icon, #d4af37); border-radius: 50%;
                display: flex; justify-content: center; align-items: center; margin: 0 auto 15px auto;
                animation: pulseGold 2s infinite;
            }
            .dpi-modal-icon-container i { font-size: 26px; color: var(--border-icon, #d4af37); }
            .dpi-modal-title { color: #ffffff; font-size: 15px; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px; }
            .dpi-modal-text { color: #dfcbf2; font-size: 12px; line-height: 1.5; margin-bottom: 20px; }
            .dpi-modal-btn {
                background: var(--bg-btn, linear-gradient(90deg, #d4af37 0%, #b89324 100%)); color: var(--text-btn, #1a0033);
                border: none; padding: 11px 24px; font-size: 12px; font-weight: 700; border-radius: 25px;
                cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
            }
            @keyframes pulseGold {
                0% { box-shadow: 0 0 0 0 var(--pulse-color, rgba(212, 175, 55, 0.4)); }
                70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
                100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
            }
        `;
        document.head.appendChild(modalStyle);
    }

    const overlay = document.createElement('div');
    overlay.className = 'dpi-custom-modal-overlay';
    
    if (tipe === 'peringatan') {
        overlay.style.setProperty('--border-color', '#ff4d4d');
        overlay.style.setProperty('--bg-icon', 'rgba(255, 77, 77, 0.1)');
        overlay.style.setProperty('--border-icon', '#ff4d4d');
        overlay.style.setProperty('--bg-btn', '#ff4d4d');
        overlay.style.setProperty('--text-btn', '#ffffff');
        overlay.style.setProperty('--pulse-color', 'rgba(255, 77, 77, 0.4)');
    }

    const ikon = tipe === 'peringatan' ? 'fa-triangle-exclamation' : 'fa-circle-check';

    overlay.innerHTML = `
        <div class="dpi-custom-modal-box">
            <div class="dpi-modal-icon-container"><i class="fa-solid ${ikon}"></i></div>
            <div class="dpi-modal-title">${judul}</div>
            <div class="dpi-modal-text">${pesan}</div>
            <button class="dpi-modal-btn" id="closeDpiModalBtn">KONFIRMASI</button>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('show'), 10);

    document.getElementById('closeDpiModalBtn').addEventListener('click', function() {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 300);
    });
}

// 2. Fungsi Utama saat Tombol Simpan Alamat di-Klik (Menggantikan Fungsi Lama)
window.saveAddress = () => {
    userAddress = {
        nama: document.getElementById('ship-name').value,
        telepon: document.getElementById('ship-phone').value,
        alamatLengkap: document.getElementById('ship-address').value
    };
    
    // Peringatan jika data nama atau alamat kosong
    if(!userAddress.nama || !userAddress.alamatLengkap) {
        return tampilkanDpiAlert("DATA BELUM LENGKAP", "Mohon lengkapi nama dan alamat lengkap pengiriman Anda sebelum melanjutkan.", "peringatan");
    }
    
    // Hapus form overlay pengisian alamat
    const addressOverlay = document.getElementById('address-overlay');
    if(addressOverlay) {
        addressOverlay.remove();
    }
    
    // Munculkan Pop-up Digital Sukses
    tampilkanDpiAlert(
        "ALAMAT DIKUNCI SUKSES", 
        "Konfirmasi sukses! Data pengiriman Anda kini telah terenkripsi aman di sistem premium Digital Pro Indo."
    );
    
    // Perbarui antarmuka keranjang belanja
    if(typeof window.updateCartUI === 'function') {
        window.updateCartUI();
    }
};

    
    // Perbarui antarmuka keranjang belanja
    if(typeof window.updateCartUI === 'function') {
        window.updateCartUI();
    }
};


window.addToCart = (id) => {
    const p = productsData.find(x => x.id === id);
    if(p) { 
        cart.push(p); 
        alert("✅ Berhasil ditambah ke keranjang!"); 
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
        <div style="padding: 15px;">
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
function showLoginPrompt() {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(8px);";
    overlay.innerHTML = `
        <div style="background:#0b2135; border:2px solid #FFD700; padding:35px 25px; border-radius:25px; max-width:320px; width:100%; text-align:center;">
            <h2 style="color:#FFD700; margin:0; font-weight:800; text-transform:uppercase;">Selamat Datang</h2>
            <p style="color:#f8fafc; margin:15px 0 25px; font-size:0.95rem;">Silakan Login agar Anda bisa melanjutkan pembelian produk premium di Marketplace DIGITAL PRO INDO</p>
            <button onclick="this.parentElement.parentElement.remove(); window.handleAuth();" style="background:linear-gradient(45deg, #FFD700, #FFA500); color:#0b2135; border:none; width:100%; padding:15px; border-radius:12px; font-weight:bold; cursor:pointer;">LOGIN SEKARANG</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer;">Mungkin Nanti</button>
        </div>`;
    document.body.appendChild(overlay);
}

function showAddressPrompt() {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(8px);";
    overlay.innerHTML = `
        <div style="background:#0b2135; border:2px solid #FFD700; padding:35px 25px; border-radius:25px; max-width:320px; width:100%; text-align:center;">
            <div style="font-size: 50px; margin-bottom: 15px;">📍</div>
            <h2 style="color:#FFD700; margin:0; font-weight:800; text-transform:uppercase;">Alamat Kosong</h2>
            <p style="color:#f8fafc; margin:15px 0 25px; font-size:0.95rem;">Lengkapi alamat pengiriman Anda terlebih dahulu agar kami dapat mengirimkan produk dengan tepat.</p>
            <button onclick="this.parentElement.parentElement.remove(); window.showAddressForm();" style="background:linear-gradient(45deg, #FFD700, #FFA500); color:#0b2135; border:none; width:100%; padding:15px; border-radius:12px; font-weight:bold; cursor:pointer;">LENGKAPI ALAMAT</button>
        </div>`;
    document.body.appendChild(overlay);
}

window.handlePayment = async (amount, name) => {
    if (!currentUser) { showLoginPrompt(); return; }
    if (!userAddress.nama) { showAddressPrompt(); return; }

    let detailedItemName = name;
    if (name === 'Total Keranjang' && cart.length > 0) {
        detailedItemName = `Keranjang (${cart.map(item => item.name).join(", ")})`;
    }

    try {
        await window.Pi.createPayment({
            amount: parseFloat(amount),
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
                    showSuccessOverlay(amount, detailedItemName, txid);
                    if(name === 'Total Keranjang') { cart = []; updateCartUI(); }
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
    overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(5px);";
    
    const pesanWhatsApp = `*KONFIRMASI PEMBAYARAN PI NETWORK*%0A*PT. DIGITAL PRO INDO*%0A_______________________________%0A%0AHalo Admin, saya telah berhasil melakukan pembayaran produk premium melalui Pi Browser:%0A%0A*DETAIL TRANSAKSI:*%0A• *Item:* ${name}%0A• *Total:* ${amount} π%0A• *Status:* Success (Pi Network)%0A• *TXID:* \`${txid}\` %0A%0A*DATA PENGIRIMAN:*%0A• *Penerima:* ${userAddress.nama}%0A• *Telepon:* ${userAddress.telepon}%0A• *Alamat:* ${userAddress.alamatLengkap}%0A%0A_______________________________%0A*Mohon segera diproses dan informasikan nomor resi pengiriman. Terima kasih!*`;

    overlay.innerHTML = `
        <div style="background:white; padding:35px 25px; border-radius:30px; max-width:380px; width:100%; text-align:center;">
            <div style="font-size:45px; margin-bottom:20px;">✅</div>
            <h2 style="color:#1a0033; margin:0; font-weight:800;">Pembayaran Berhasil!</h2>
            <p style="color:#64748b; margin-top:10px;">Data Pemesanan Anda telah tercatat di sistem kami.</p>
            <a href="https://wa.me/${ADMIN_WA}?text=${pesanWhatsApp}" target="_blank" style="display:block; background:#25D366; color:white; text-decoration:none; padding:18px; border-radius:15px; font-weight:bold; margin-top:20px;">KIRIM DATA KE WHATSAPP</a>
            <button onclick="location.reload()" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer;">Kembali ke Beranda</button>
        </div>`;
    document.body.appendChild(overlay);
}

// =========================================================================
// 7. PI AUTHENTICATION SYSTEMS (MANUAL LOGIN BUTTON)
// =========================================================================
window.handleAuth = async () => {
    const successSound = new Audio("assets/sound-effect.mp3");
    successSound.load(); 

    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = "display:flex; justify-content:center; align-items:center; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); backdrop-filter:blur(8px); z-index:9999;";
    loadingOverlay.innerHTML = `<div style="text-align:center;"><div class="hourglass">⏳</div><p style="margin-top:20px; font-weight:bold; color:#f3e5f5; font-size:0.7rem; letter-spacing:2px;">MENGHUBUNGKAN...</p></div>`;
    document.body.appendChild(loadingOverlay);

    try {
        const scopes = ['username', 'payments'];
        const auth = await window.Pi.authenticate(scopes, (p) => handleIncompletePayment(p));
        currentUser = auth.user;

        const profileDisplay = document.getElementById('profile-username') || document.querySelector('.username-text');
        if (profileDisplay) profileDisplay.innerText = currentUser.username;

        const profileAddress = document.getElementById('profile-address');
        if (profileAddress) profileAddress.innerText = currentUser.uid;
       
        successSound.play().catch(e => console.log("Audio play blocked"));

        loadingOverlay.innerHTML = `
            <div style="background-color:#0b2135; border:3px solid #FFD700; border-radius:15px; padding:20px; text-align:center; width:75%; max-width:300px;">
                <h2 style="color:#FFD700; margin:5px 0; font-weight:900; text-transform:uppercase;">Login Berhasil!</h2>
                <p style="color:#fff; margin-bottom:5px;">Selamat datang, <br><span style="color:#ba68c8; font-weight:bold;">@${currentUser.username}</span></p>
            </div>`;

        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.innerText = "LOGOUT";
            loginBtn.style.background = "linear-gradient(to right, #ef4444, #b91c1c)";
            loginBtn.onclick = () => location.reload();
        }

        setTimeout(() => { loadingOverlay.remove(); }, 3000);

    } catch (err) { 
        console.error(err); 
        loadingOverlay.remove();
        if (err.message !== "User cancelled login") alert("Gagal Login: " + err.message);
    }
};

// =========================================================================
// 8. SIDEBAR MENU & BANNER LOGIC
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
// 9. CORE PIPELINE (DOM LOAD INITIALIZATION)
// =========================================================================
document.addEventListener("DOMContentLoaded", async () => {
    renderProducts(productsData, 'main-grid');

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filtered = productsData.filter(p => p.name.toLowerCase().includes(keyword) || p.category.toLowerCase().includes(keyword));
            const sResult = document.getElementById('search-results');
            if (!sResult) return;
            if (keyword === "") {
                sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #999; padding: 20px;">Cari produk premium favoritmu...</p>`;
            } else if (filtered.length > 0) {
                renderProducts(filtered, 'search-results');
            } else {
                sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; padding: 20px;">Produk "${keyword}" tidak ditemukan.</p>`;
            }
        });
    }

    window.addEventListener('click', function(event) {
        const nav = document.getElementById("sideNav");
        const menuIcon = document.querySelector('.menu-icon');
        if (nav && nav.style.width === "250px" && menuIcon) {
            if (!nav.contains(event.target) && !menuIcon.contains(event.target)) {
                nav.style.width = "0px";
            }
        }
    });

    const banners = [
        "https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", 
        "https://i.ibb.co.com/SwjWGRKm/ORANG-PERTAMA-20260205-094439-0000.png", 
        "https://i.ibb.co.com/Gvc69SRX/Salinan-dari-Salinan-dari-ORANG-PERTAMA-20260217-012738-0000.png", 
        "https://i.ibb.co.com/W4RZCvCL/ORANG-PERTAMA-20260205-080941-0000.png"
    ];
    let idx = 0;
    setInterval(() => { 
        const img = document.getElementById('banner-img');
        if(img) { idx = (idx + 1) % banners.length; img.src = banners[idx]; }
    }, 4000);

    // Sambungkan Pi SDK & Memicu Autentikasi Otomatis
    await initPi();

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = window.handleAuth;
    }
});

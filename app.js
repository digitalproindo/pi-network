document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    let userAddress = { nama: "", telepon: "", alamatLengkap: "" };

    const ADMIN_WA = "6281906066757"; 

const productsData = [
    { 
        id: 'p1', 
        name: "Rumah Ultra-Modern", 
        price: 1.800,
        discount: 10, 
        category: "Rumah", 
        images: ["https://i.ibb.co.com/dwZVX86G/1770232154053.png"], 
        desc: "Rumah mewah dua lantai dengan estetika geometris futuristik yang mengutamakan transparansi kaca dan material premium.Spesifikasi Utama Material: Dinding panel marmer Travertine, beton halus, dan kaca floor-to-ceiling.Pintu Utama: Pivot door kayu solid setinggi 4 meter dengan akses biometrik.Pencahayaan: Sistem Hidden LED linear pada alur masuk (driveway) dan plafon.Lantai: Marmer Italia (interior) dan batu alam antislip (eksterior).Fitur Unggulan Smart Home: Kendali penuh via AI untuk lampu, suhu, dan keamanan.Lansekap: Kolam refleksi air di sekeliling bangunan dan taman minimalis.Area Parkir: Driveway melingkar yang luas dengan pencahayaan futuristik.",
        rating: 4.9,
        sold: 1250,
        reviews: [
            { user: "Pioneer_Ace", comment: "Sangat megah dan mewah" },
            { user: "NodeMaster", comment: "Wajib punya sebagai Pioner." }
        ]
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
        id: 'p4', 
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
        id: "car-001",
        category: "Mobil",
        name: "Toyota Fortuner 2.8 GR Sport 2024",
        price: 0.15000, // Harga dalam Pi (Contoh)
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
        images: ["https://images.unsplash.com/photo-1596728663340-a309e992af68?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Tipe:</b> Long Wheelbase (LWB) Luxury SUV<br>
               • <b>Mesin:</b> 5.0L Supercharged V8<br>
               • <b>Belakang:</b> Hot Stone Massage Seats & Deployable Tables<br>
               • <b>Velg:</b> 23-inch Forged Wheels<br>
               • <b>Cat:</b> SV Bespoke Premium Palette`
    }
];

productsData.forEach(p => {
    if(!p.rating) p.rating = 4.8;
    if(!p.sold) p.sold = Math.floor(Math.random() * 100) + 10;
    if(!p.reviews) p.reviews = [{user: "Pembeli", comment: "Barang bagus sesuai pesanan."}];
});

    async function initPi() {
        try {
            await Pi.init({ version: "2.0", sandbox: false });
        } catch (e) { console.error("Init Error:", e); }
    }

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

    window.saveAddress = () => {
        userAddress = {
            nama: document.getElementById('ship-name').value,
            telepon: document.getElementById('ship-phone').value,
            alamatLengkap: document.getElementById('ship-address').value
        };
        if(!userAddress.nama || !userAddress.alamatLengkap) return alert("Mohon lengkapi data!");
        document.getElementById('address-overlay').remove();
        alert("Alamat disimpan.");
    };

function renderProducts(data, targetGridId) {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;
    grid.innerHTML = "";
    data.forEach(p => {
        const displayPrice = p.price.toFixed(5); 
        const discountBadge = (p.discount && p.discount > 0) 
            ? `<span class="discount-badge">-${p.discount}%</span>` 
            : '';

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

    window.handlePayment = async (amount, name) => {
        if (!currentUser) return alert("Silakan Login di Profil!");
        if (!userAddress.nama) { alert("Isi alamat pengiriman dulu!"); window.showAddressForm(); return; }
        try {
            await Pi.createPayment({
                amount: parseFloat(amount),
                memo: `Pembelian ${name}`,
                metadata: { productName: name },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    const res = await fetch('/api/approve', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId}) });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    const res = await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId, txid}) });
                    if (res.ok) { 
                        showSuccessOverlay(amount, name, txid);
                        if(name === 'Total Keranjang') { cart = []; updateCartUI(); }
                    }
                },
                onCancel: () => {},
                onError: (e, p) => { if(p) handleIncompletePayment(p); }
            });
        } catch (err) { console.error(err); }
    };

    function showSuccessOverlay(amount, name, txid) {
        const overlay = document.createElement('div');
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(5px);";
        
        const pesanWhatsApp = `*KONFIRMASI PEMBAYARAN PI NETWORK* %0A` +
                              `*PT. DIGITAL PRO INDO*%0A` +
                              `_______________________________%0A%0A` +
                              `Halo Admin, saya telah berhasil melakukan pembayaran produk premium melalui Pi Browser:%0A%0A` +
                              ` *DETAIL TRANSAKSI:*%0A` +
                              `• *Item:* ${name}%0A` +
                              `• *Total:* ${amount} π%0A` +
                              `• *Status:* Success (Pi Network)%0A` +
                              `• *TXID:* \`${txid}\` %0A%0A` +
                              ` *DATA PENGIRIMAN:*%0A` +
                              `• *Penerima:* ${userAddress.nama}%0A` +
                              `• *Telepon:* ${userAddress.telepon}%0A` +
                              `• *Alamat:* ${userAddress.alamatLengkap}%0A%0A` +
                              `_______________________________%0A` +
                              ` *Mohon segera diproses dan informasikan nomor resi pengiriman. Terima kasih!*`;

        overlay.innerHTML = `
            <div style="background:white; padding:35px 25px; border-radius:30px; max-width:380px; width:100%; text-align:center; font-family:'Inter', sans-serif; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                <div style="width: 80px; height: 80px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <span style="font-size: 45px;">✅</span>
                </div>
                <h2 style="color:#1a0033; margin:0; font-weight:800; font-size: 1.6rem;">Pembayaran Berhasil!</h2>
                <a href="https://wa.me/${ADMIN_WA}?text=${pesanWhatsApp}" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:10px; background:#25D366; color:white; text-decoration:none; padding:18px; border-radius:15px; font-weight:bold; font-size:1.05rem; margin-top:20px;">
                    KIRIM DATA KE WHATSAPP
                </a>
                <button onclick="location.reload()" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer;">Kembali ke Beranda</button>
            </div>`;
        document.body.appendChild(overlay);
    }

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
                <div style="margin-bottom: 25px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/1162/1162499.png" alt="Cart" style="width: 120px; opacity: 0.8;">
                </div>
                
                <h2 style="color:#1a1a1a; margin-bottom:12px; font-size:1.5rem; font-weight:800;">Keranjang Anda Kosong</h2>
                
                <p style="color:#64748b; font-size:1rem; line-height:1.5; margin-bottom:30px; max-width:280px; margin-left:auto; margin-right:auto;">
                    Sepertinya Anda belum menambahkan produk premium ke keranjang.
                </p>
                
                <button onclick="switchPage('home')" style="background:#6748d7; color:white; border:none; padding:16px 40px; border-radius:18px; font-weight:700; font-size:1rem; cursor:pointer; box-shadow: 0 10px 20px rgba(103,72,215,0.3); transition: transform 0.2s;">
                    Mulai Belanja
                </button>
            </div>`;
        return;
    }

    const total = cart.reduce((s, i) => s + i.price, 0).toFixed(5);
    grid.innerHTML = `
        <div style="padding: 15px;">
            <div onclick="window.showAddressForm()" style="background:#fdfaff; padding:15px; border-radius:15px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; border:1px dashed #6748d7; cursor:pointer;">
                <div style="display:flex; align-items:center; gap:12px; text-align:left;">
                    <span style="font-size:1.2rem;">📍</span>
                    <div>
                        <div style="font-size:0.7rem; color:#6748d7; font-weight:bold; text-transform:uppercase;">Alamat Pengiriman</div>
                        <div style="font-size:0.85rem; font-weight:700; color:#1a1a1a;">
                            ${userAddress.nama ? userAddress.nama + ' (' + userAddress.telepon + ')' : 'Klik untuk lengkapi alamat'}
                        </div>
                    </div>
                </div>
                <span style="color:#6748d7; font-weight:bold;">></span>
            </div>

            <div id="cart-list">
                ${cart.map((item, index) => `
                    <div style="display:flex; align-items:center; gap:12px; background:white; padding:12px; margin-bottom:12px; border-radius:18px; position:relative; box-shadow: 0 4px 10px rgba(0,0,0,0.03); border: 1px solid #f1f5f9;">
                        <img src="${item.images[0]}" style="width:70px; height:70px; border-radius:12px; object-fit:cover;">
                        <div style="flex:1; text-align:left;">
                            <div style="font-size:0.85rem; font-weight:700; color:#333; margin-bottom:4px; padding-right:25px; line-height:1.3;">${item.name}</div>
                            <div style="font-size:1rem; font-weight:800; color:#b71c1c;">π ${item.price.toFixed(5)}</div>
                        </div>
                        <div onclick="window.removeFromCart(${index})" style="position:absolute; top:10px; right:10px; width:26px; height:26px; background:#fff1f1; color:#ff4d4f; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; cursor:pointer; font-size:11px; border: 1px solid #ffccc7;">✕</div>
                    </div>
                `).join('')}
            </div>

            <div style="background:white; padding:20px; border-radius:22px; margin-top:20px; border: 1px solid #f1f5f9; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.9rem; color:#64748b;">
                    <span>Subtotal (${cart.length} Produk)</span>
                    <span>π ${total}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:1.1rem; font-weight:800; color:#1a1a1a; border-top:2px solid #f8fafc; padding-top:15px;">
                    <span>Total Tagihan</span>
                    <span style="color:#b71c1c;">π ${total}</span>
                </div>
                <button class="btn-buy-now" style="width:100%; padding:16px; border-radius:16px; font-size:1.05rem; font-weight:800; border:none; box-shadow: 0 6px 15px rgba(103,72,215,0.3); background:#6748d7; color:white; cursor:pointer;" onclick="window.handlePayment(${total}, 'Total Keranjang')">
                    CHECKOUT SEKARANG 🚀
                </button>
            </div>
        </div>
    `;
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

    window.closeProductDetail = () => {
        document.getElementById('product-detail-page').classList.add('hidden');
    };

    window.closeProductDetail = () => {
    // Sembunyikan halaman detail
    document.getElementById('product-detail-page').classList.add('hidden');
    
    // TAMPILKAN KEMBALI NAVIGASI BAWAH
    const bNav = document.querySelector('.bottom-nav');
    if(bNav) {
        bNav.style.display = 'flex'; // Mengembalikan ke tampilan semula
    }
};

window.openProductDetail = (productId) => {
    const p = productsData.find(x => x.id === productId);
    if (!p) return;

    // SEMBUNYIKAN NAVIGASI BAWAH
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

            <div style="width: 100%; height: 320px; background: #f1f5f9; overflow: hidden; position: relative;">
                <img src="${p.images[0]}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
            </div>
            
            <div style="padding: 20px; position: relative; z-index: 10; background: white; border-radius: 30px 30px 0 0; margin-top: -30px; box-shadow: 0 -10px 20px rgba(0,0,0,0.05);">
                <h2 style="margin: 0; font-size: 1.4rem; color:#1a1a1a; font-weight: 800;">${p.name}</h2>
                <div style="font-size: 2.2rem; font-weight: 900; color: #b71c1c; margin: 10px 0;">π ${p.price.toFixed(5)}</div>
                
                <div style="background: #fdfdfd; padding: 20px; border-radius: 20px; border: 1px solid #f1f5f9; margin-top: 15px;">
                    <h4 style="margin: 0 0 10px 0; color: #4a148c; font-weight: 800; border-bottom: 2px solid #6748d7; width: fit-content; padding-bottom: 5px;">
                        DETAIL SPESIFIKASI
                    </h4>
                    <div style="line-height: 1.8; color: #475569; font-size: 0.95rem;">
                        ${p.desc}
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 12px; margin-top:30px;">
                    <button onclick="window.addToCart('${p.id}')" style="background: white; color: #4a148c; border: 2px solid #4a148c; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer;">+ Keranjang</button>
                    <button onclick="window.handlePayment(${p.price}, '${p.name}')" style="background: #4a148c; color: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer; box-shadow: 0 6px 20px rgba(74,20,140,0.3);">Beli Sekarang</button>
                </div>
            </div>
        </div>`;
        
    document.getElementById('product-detail-page').classList.remove('hidden');
};

window.filterCategory = (category, element) => {
    const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
    renderProducts(filtered, 'main-grid');
    if (element) {
        document.querySelectorAll('.category-pill').forEach(pill => pill.classList.remove('active'));
        element.classList.add('active');
    }
};

    async function handleIncompletePayment(p) {
        await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId: p.identifier, txid: p.transaction.txid}) });
    }

    const banners = ["https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", "https://i.ibb.co.com/SwjWGRKm/ORANG-PERTAMA-20260205-094439-0000.png", "https://i.ibb.co.com/W4RZCvCL/ORANG-PERTAMA-20260205-080941-0000.png"];
    let idx = 0;
    setInterval(() => { 
        const img = document.getElementById('banner-img');
        if(img) { idx = (idx + 1) % banners.length; img.src = banners[idx]; }
    }, 4000);

const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = productsData.filter(p => p.name.toLowerCase().includes(keyword) || p.category.toLowerCase().includes(keyword));
        const sResult = document.getElementById('search-results');
        if (keyword === "") {
            sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #999; padding: 20px;">Cari produk premium favoritmu...</p>`;
        } else if (filtered.length > 0) {
            renderProducts(filtered, 'search-results');
        } else {
            sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; padding: 20px;">Produk "${keyword}" tidak ditemukan.</p>`;
        }
    });
}

    window.handleAuth = async () => {
    console.log("Tombol login diklik");
    alert("Apakah Anda Ingin login..."); // Alert untuk memastikan fungsi jalan

    try {
        const scopes = ['username', 'payments'];
        const auth = await Pi.authenticate(scopes, (p) => handleIncompletePayment(p));
        currentUser = auth.user;
        
        // Update Tombol di pojok kanan atas
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.innerText = "LOGOUT";
            loginBtn.style.background = "linear-gradient(to right, #ef4444, #b91c1c)";
            loginBtn.onclick = () => location.reload();
        }

        // Update di Halaman Profil
        if (document.getElementById('profile-username')) {
            document.getElementById('profile-username').innerText = `@${currentUser.username}`;
        }
        if (document.getElementById('profile-address')) {
            document.getElementById('profile-address').innerText = currentUser.uid;
        }

        alert("Berhasil Login: " + currentUser.username);
    } catch (err) { 
        console.error(err); 
        alert("Gagal Login: " + err.message); 
    }
};

    renderProducts(productsData, 'main-grid');

    // 2. Inisialisasi Pi SDK secara aman
    try {
        await initPi();
        console.log("Pi SDK siap digunakan");
    } catch (err) {
        console.error("Pi SDK gagal muat: ", err);
        // Tetap biarkan aplikasi jalan meskipun SDK gagal
    }

    // 3. Pasang fungsi klik pada tombol login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = window.handleAuth;
    }
}); // Penutup DOMContentLoaded (pastikan tanda ini jangan dihapus)
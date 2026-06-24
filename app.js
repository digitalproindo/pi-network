// =========================================================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// =========================================================================
window.currentUser = null; // 🔴 Diubah menggunakan window. agar menjadi Global
let cart = [];
let userAddress = { nama: "", telepon: "", alamatLengkap: "" };
let isPiInitialized = false; 
const ADMIN_WA = "6281906066757";

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

    // -----------------------------------------------------------------
    // KATEGORI: RUMAH (HOME & LIVING)
    // -----------------------------------------------------------------
    {
        id: "home-001",
        name: "Sofa Minimalis Scandinavian 3 Seater",
        price: 0.00045,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"],
        rating: "4.8",
        sold: 22,
        category: "Rumah",
        desc: "Sofa ruang tamu dengan kain rami premium, busa anti amblas, dan rangka kayu mahoni kokoh. Desain estetik modern."
    },
    {
        id: "home-002",
        name: "Kasur Springbed Orthopedic Luxury King Size",
        price: 0.00065,
        discount: 15,
        images: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500"],
        rating: "4.9",
        sold: 14,
        category: "Rumah",
        desc: "Kasur kesehatan tulang belakang menggunakan pocket spring premium dan lapisan latex alami. Garansi per hingga 10 tahun."
    },
    {
        id: "home-003",
        name: "Set Meja Makan Kayu Jati Solid",
        price: 0.00085,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500"],
        rating: "5.0",
        sold: 5,
        category: "Rumah",
        desc: "Satu set meja makan mewah dengan 4 kursi minimalis. Terbuat dari kayu jati asli Jepara dengan finishing halus tahan air."
    },

    // -----------------------------------------------------------------
    // KATEGORI: HERBAL & KESEHATAN
    // -----------------------------------------------------------------
    {
        id: "herb-001",
        name: "Madu Alami Murni Baduy Torgal",
        price: 0.00002,
        discount: 5,
        images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500"],
        rating: "4.9",
        sold: 412,
        category: "Herbal",
        desc: "Madu murni mentah (raw honey) langsung dari hutan Baduy. Kaya akan antioksidan untuk menjaga stamina dan imunitas tubuh."
    },
    {
        id: "herb-002",
        name: "Kapsul Minyak Habbatussauda Premium",
        price: 0.00003,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1611070973770-b1a672610042?w=500"],
        rating: "4.8",
        sold: 310,
        category: "Herbal",
        desc: "Ekstrak minyak jintan hitam murni dalam kemasan kapsul mudah ditelan. Berkhasiat menormalkan tekanan darah dan kolesterol."
    },
    {
        id: "herb-003",
        name: "Teh Herbal Daun Kelor Moringa",
        price: 0.00001,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500"],
        rating: "4.7",
        sold: 189,
        category: "Herbal",
        desc: "Teh celup organik dari daun kelor pilihan. Kaya akan nutrisi, asam amino, serta berfungsi sebagai detoksifikasi racun tubuh."
    },

    // -----------------------------------------------------------------
    // KATEGORI: GADGET
    // -----------------------------------------------------------------
    {
        id: "gadget-001",
        name: "iPhone 15 Pro Max 512GB Titanium",
        price: 0.00250,
        discount: 0,
        images: ["https://i.ibb.co.com/kgxjnpyp/Desain-tanpa-judul-20260207-181545-0000.png"],
        rating: "4.9",
        sold: 85,
        category: "Gadget",
        desc: "Layar: 6.7 inci Super Retina XDR OLED. Chipset: A17 Pro (3nm). Kamera periskop 5x optical zoom dan material kokoh Titanium Grade 5."
    },
    {
        id: "gadget-002",
        name: "Samsung Galaxy S24 Ultra 5G",
        price: 0.00235,
        discount: 0,
        images: ["https://i.ibb.co.com/RprpNpf6/Desain-tanpa-judul-20260207-182139-0000.png"],
        rating: "4.9",
        sold: 92,
        category: "Gadget",
        desc: "Layar: 6.8 inci Dynamic LTPO AMOLED 2X. Dilengkapi S-Pen bawaan, kamera 200MP, dan fitur canggih Galaxy AI Circle to Search."
    },
    {
        id: "gadget-003",
        name: "Smartwatch AMOLED Series 9 Sport",
        price: 0.00018,
        discount: 12,
        images: ["https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500"],
        rating: "4.8",
        sold: 67,
        category: "Gadget",
        desc: "Jam tangan pintar pelacak olahraga komprehensif. Monitor detak jantung, kadar oksigen darah SpO2, dan ketahanan air hingga kedalaman 50 meter."
    },

    // -----------------------------------------------------------------
    // KATEGORI: ELEKTRONIK
    // -----------------------------------------------------------------
    {
        id: "elec-001",
        name: "Smart TV 4K Ultra HD 55 Inch Android OS",
        price: 0.00060,
        discount: 8,
        images: ["https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500"],
        rating: "4.9",
        sold: 45,
        category: "Elektronik",
        desc: "Televisi pintar beresolusi tajam dengan fitur Voice Control Google Assistant, Dolby Audio, serta dukungan aplikasi streaming Youtube, Netflix."
    },
    {
        id: "elec-002",
        name: "Air Conditioner AC Inverter 1 PK Hemat Energi",
        price: 0.00038,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500"],
        rating: "4.8",
        sold: 29,
        category: "Elektronik",
        desc: "Pendingin ruangan dengan teknologi pintar Inverter yang mendinginkan lebih cepat sekaligus menghemat konsumsi listrik bulanan hingga 60%."
    },
    {
        id: "elec-003",
        name: "Kulkas Side-by-Side 4 Pintu Premium",
        price: 0.00095,
        discount: 5,
        images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500"],
        rating: "5.0",
        sold: 12,
        category: "Elektronik",
        desc: "Kulkas berkapasitas ekstra besar dengan kompartemen higienis anti bakteri, teknologi pendinginan merata ganda, serta panel kontrol layar sentuh."
    },

    // -----------------------------------------------------------------
    // KATEGORI: JASA (SERVICES)
    // -----------------------------------------------------------------
    {
        id: "jasa-001",
        name: "Jasa Pembuatan Landing Page Web3 & Pi-App",
        price: 0.00025,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"],
        rating: "5.0",
        sold: 18,
        category: "Jasa",
        desc: "Pengembangan web interaktif modern yang siap diintegrasikan dengan Pi Sandbox SDK SDK ekosistem, responsif, dan ramah SEO."
    },
    {
        id: "jasa-002",
        name: "Jasa Desain Arsitektur Rumah & Rendering 3D",
        price: 0.00030,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500"],
        rating: "4.9",
        sold: 9,
        category: "Jasa",
        desc: "Pembuatan denah bangunan, fasad rumah minimalis/mewah beserta gambar kerja konstruksi lengkap dan visualisasi realistis 3D."
    },
    {
        id: "jasa-003",
        name: "Paket Jasa Legalitas Pembuatan PT / CV Lengkap",
        price: 0.00040,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1450133064473-71024230f91b?w=500"],
        rating: "4.9",
        sold: 15,
        category: "Jasa",
        desc: "Pengurusan izin usaha komprehensif berbadan hukum resmi termasuk akta notaris, SK Kemenkumham, NPWP Badan, hingga NIB OSS RBA."
    },

    // -----------------------------------------------------------------
    // KATEGORI: MAKANAN (FOOD)
    // -----------------------------------------------------------------
    {
        id: "food-001",
        name: "Rendang Daging Sapi Minang Kemasan Vakum",
        price: 0.00001,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500"],
        rating: "4.9",
        sold: 230,
        category: "Makan",
        desc: "Daging rendang otentik bumbu rempah Padang asli seberat 500g. Dikemas steril dengan metode vakum udara, awet tanpa pengawet."
    },
    {
        id: "food-002",
        name: "Sambal Cumi Ciamik Premium",
        price: 0.000003,
        discount: 5,
        images: ["https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=500"],
        rating: "4.8",
        sold: 560,
        category: "Makan",
        desc: "Sambal bawang pedas nampol dipadu potongan daging cumi asin melimpah. Fresh dimasak setiap hari, siap santap dengan nasi hangat."
    },
    {
        id: "food-003",
        name: "Kue Lapis Legit Spesial Full Wisman",
        price: 0.00004,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"],
        rating: "5.0",
        sold: 43,
        category: "Makan",
        desc: "Kue lapis premium ukuran 20x20cm bertekstur sangat lembut dan wangi menggoda berkat penggunaan mentega Wijsman murni."
    },

    // -----------------------------------------------------------------
    // KATEGORI: MINUMAN (BEVERAGES)
    // -----------------------------------------------------------------
    {
        id: "drink-001",
        name: "Kopi Arabika Gayo Single Origin 250g",
        price: 0.000007,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500"],
        rating: "4.9",
        sold: 175,
        category: "Minuman",
        desc: "Biji kopi atau bubuk kopi Arabika dataran tinggi Gayo Aceh. Proses cuci medium roasted dengan cita rasa asam buah yang bersih."
    },
    {
        id: "drink-002",
        name: "Matcha Latte Bubuk Premium Organik",
        price: 0.000005,
        discount: 10,
        images: ["https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500"],
        rating: "4.8",
        sold: 120,
        category: "Minuman",
        desc: "Bubuk teh hijau murni racikan kualitas impor Jepang (Uji Matcha). Mudah larut untuk disajikan hangat ataupun dicampur es susu."
    },
    {
        id: "drink-003",
        name: "Sari Lemon Murni Perasan Asli",
        price: 0.000004,
        discount: 0,
        images: ["https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500"],
        rating: "4.7",
        sold: 210,
        category: "Minuman",
        desc: "100% konsentrat jus perasan lemon lokal segar berukuran 500ml tanpa tambahan air dan gula. Sangat baik untuk diet sehat harian."
    },
    {
        id: "house-001",
        category: "Rumah",
        name: "The Beverly Hills Modern Mansion",
        price: 3.25000,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        desc: "Luas Tanah: 2.500 m2. Kamar Tidur: 7 Master Suite. Fasilitas: Infinity Pool, Home Cinema, Wine Cellar. Lokasi: Beverly Hills, California. Garasi: Kapasitas 10 Mobil Mewah."
    },
    {
        id: "house-002",
        category: "Rumah",
        name: "Zen Waterfront Villa",
        price: 3.18000,
        discount: 0,
        rating: "4.9",
        sold: 2,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
        desc: "Pemandangan: Akses Langsung ke Danau Privasi. Gaya: Arsitektur Minimalis Modern. Fasilitas: Dermaga Pribadi, Spa dan Sauna, Gym. Sistem: Full Smart Home Technology. Keamanan: Biometric Entry System."
    },
    {
        id: "house-003",
        category: "Rumah",
        name: "Penthouse Skyline Duplex",
        price: 2.12000,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"],
        desc: "Lantai: Lantai 50 dan 51 (Top Floor). Pemandangan: 360 derajat City Skyline View. Interior: Marmer Italia dan Panel Emas. Fasilitas: Private Rooftop Garden dan Jacuzzi. Layanan: 24/7 Concierge Service."
    },
    {
        id: "house-005",
        category: "Rumah",
        name: "Tropical Cliffside Sanctuary",
        price: 4.15500,
        discount: 0,
        rating: "4.9",
        sold: 3,
        images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"],
        desc: "Lokasi: Tebing Uluwatu, Bali. Konsep: Open Living Space with Ocean View. Fasilitas: Private Beach Access, Deck Yoga. Struktur: Kayu Ulin dan Batu Alam Lokal. Kamar: 5 Suite dengan Semi-Outdoor Bathroom."
    },
    {
        id: "house-008",
        category: "Rumah",
        name: "The Glass House Estate",
        price: 3.21000,
        discount: 0,
        rating: "4.8",
        sold: 2,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
        desc: "Material Dominan: Kaca Tempered dan Baja Hitam. Privasi: Smart Glass (Bisa Buram Otomatis). Lansekap: Koi Pond Keliling Bangunan. Ruang: Galeri Seni Pribadi dan Studio Musik. Luas: Kavling Sudut 3.000 m2."
    },
    {
        id: "house-009",
        category: "Rumah",
        name: "Mediterranean Seafront Palace",
        price: 3.28000,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: "Lokasi: French Riviera (Cote d'Azur). Atap: Terakota Tradisional Spanyol. Taman: Kebun Zaitun dan Citrus. Fasilitas: Lapangan Tenis Pribadi, Helipad. Kamar Mandi: Perlengkapan Emas 24 Karat."
    },
    {
        id: "house-010",
        category: "Rumah",
        name: "The Urban Luxury Loft",
        price: 2.08800,
        discount: 5,
        rating: "4.7",
        sold: 4,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
        desc: "Tipe: Industrial Luxury Loft. Tinggi Plafon: 6 Meter (Double Height Ceiling). Fitur: Tangga Melingkar Besi Kustom. Lokasi: Pusat Distrik Finansial. Sistem: Voice Controlled Home Automation."
    },
    {
        id: "house-011",
        category: "Rumah",
        name: "The Floating Diamond Villa",
        price: 2.19500,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"],
        desc: "Dimensi: LB 550 m2 (Struktur Terapung). Lokasi: Maladewa (Private Lagoon). Fitur: Kamar Tidur Bawah Laut, Dek Berjemur 360 derajat. Material: Kaca Anti-Karat dan Kayu Jati Reklamasi. Energi: Kemandirian Energi dengan Panel Surya Laut."
    },
    {
        id: "house-013",
        category: "Rumah",
        name: "Cyber-Tech Underground Bunker",
        price: 3.16000,
        discount: 0,
        rating: "4.9",
        sold: 2,
        images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80"],
        desc: "Dimensi: LB 900 m2 (Kedalaman 15 Meter). Keamanan: Pintu Anti-Ledakan, Sistem Filtrasi Udara Nuklir. Fasilitas: Kebun Hidroponik Indoor, Simulator Golf. Teknologi: AI Butler terintegrasi ke seluruh ruangan. Lantai: Epoxy Resin Anti-Statis dan Dinding Beton Ekspos."
    },
    {
        id: "house-014",
        category: "Rumah",
        name: "Aspen Snow Peak Lodge",
        price: 3.13500,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80"],
        desc: "Dimensi: LT 3.500 m2 / LB 700 m2. Lokasi: Aspen, Colorado (Ski-in/Ski-out Access). Fitur: Perapian Batu Alam Raksasa, Kolam Air Hangat Outdoor. Material: Kayu Pinus Tua dan Batu Granit Pegunungan. Ruangan: Ruang Simpan Perlengkapan Ski Khusus."
    },
    {
        id: "house-015",
        category: "Rumah",
        name: "Mediterranean Cliff Villa",
        price: 3.27000,
        discount: 0,
        rating: "4.9",
        sold: 2,
        images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"],
        desc: "Dimensi: LT 2.200 m2 / LB 950 m2. Pemandangan: Laut Mediterania (Amalfi Coast). Fasilitas: Lift Tebing Pribadi, Bar Tepi Kolam, Bioskop Terbuka. Interior: Keramik Hand-Painted Italia dan Furnitur Putih Bersih. Lanskap: Kebun Vertikal dan Pohon Lemon."
    },
    {
        id: "house-016",
        category: "Rumah",
        name: "The Brutalist Cube Estate",
        price: 3.11000,
        discount: 0,
        rating: "4.8",
        sold: 3,
        images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
        desc: "Dimensi: LT 1.500 m2 / LB 800 m2. Gaya: Brutalisme Kontemporer (Raw Concrete). Ruangan: Studio Lukis dan Ruang Musik Kedap Suara. Fitur: Skylight Masif di Tengah Rumah. Sistem: Smart Lighting System yang mengikuti ritme sirkadian."
    },
    {
        id: "house-017",
        category: "Rumah",
        name: "Amazonian Eco-Mansion",
        price: 3.14500,
        discount: 10,
        rating: "4.9",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80"],
        desc: "Dimensi: LT 10.000 m2 / LB 650 m2 (Floating on stilts). Konsep: Regenerative Architecture (Mandiri Air dan Limbah). Fitur: Dinding Tanaman Hidup, Kolam Renang Air Hujan. Material: Bambu Laminasi dan Atap Daun Rumbia Sintetis. Lokasi: Hutan Lindung Tropis."
    },
    {
        id: "house-019",
        category: "Rumah",
        name: "Dubai Sky-High Villa",
        price: 4.35000,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"],
        desc: "Dimensi: LB 1.100 m2 (Penthouse 3 Lantai). Fasilitas: Kolam Renang Kaca Gantung, Helipad Gedung. Interior: Aksen Emas 24K dan Kristal Baccarat. Pemandangan: Burj Khalifa dan Palm Jumeirah. Layanan: Private Chef dan Sopir Rolls-Royce."
    },
    {
        id: "house-020",
        category: "Rumah",
        name: "The Vineyard Ranch Estate",
        price: 2.17500,
        discount: 0,
        rating: "4.9",
        sold: 2,
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"],
        desc: "Dimensi: LT 15 Hektar / LB 1.300 m2. Fitur: Perkebunan Anggur Pribadi, Pabrik Pengolahan Wine. Fasilitas: Lapangan Berkuda, Kandang Kuda Premium. Interior: Gaya Farmhouse Modern dengan Kayu Oak Ekspos. Dapur: Outdoor BBQ Station dan Pizza Wood-Oven."
    },
    { 
        id: "p2", 
        category: "Herbal", 
        name: "COCO Pro Kunyit", 
        price: 0.00006,
        discount: 5, 
        rating: "4.9",
        sold: 340,
        images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
        desc: "Super food Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa, Kunyit, Kurma. Dengan Formula Bioteknologi Khusus Live probiotic, Immune support, High Antioksidant, Improved Digestion, Naturally Energizing."
    },
    { 
        id: "p3", 
        category: "Herbal", 
        name: "An-Nisa", 
        price: 0.00010,
        discount: 5, 
        rating: "4.8",
        sold: 195,
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
        desc: "Mengatasi keputihan, gatal-gatal, membunub bakteri, melancarkan menstruasi, mengatasi nyeri haid, mencegah kanker rahim, membasmi mioma / kista, merapatkan dan mengencangkan, serta memperbaiki hormon kewanitaan."
    },
    { 
        id: "p4", 
        category: "Herbal", 
        name: "Ar-Rizal", 
        price: 0.00010,
        discount: 5, 
        rating: "4.9",
        sold: 220,
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
        desc: "Mengencangkan dan menguatkan, menguatkan kerja jantung, meningkatkan gairah, mengatasi ejakulasi dini, suplemen stamina terbaik, meningkatkan kualitas hubungan pasutri, serta melancarkan sirkulasi darah."
    },
    { 
        id: "p3_smart", 
        category: "Rumah", 
        name: "Smart Home System Pro", 
        price: 0.500, 
        discount: 0,
        rating: "4.9",
        sold: 18,
        images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], 
        desc: "Paket instalasi smart home berbasis IoT. Kontrol rumah Anda dengan integrasi Pi Browser yang aman, cerdas, dan cepat."
    },
    { 
        id: "p4_phone", 
        category: "Elektronik", 
        name: "Premium Smartphone X", 
        price: 1.200, 
        discount: 10,
        rating: "4.8",
        sold: 55,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], 
        desc: "Gadget premium dengan performa tinggi. Kamera resolusi tinggi dan baterai tahan lama untuk menunjang aktivitas harian Anda."
    },
    { 
        id: "p5", 
        category: "Rumah", 
        name: "Sofa Minimalis 2 Seater - Modern Grey", 
        price: 0.05, 
        discount: 0,
        rating: "4.7",
        sold: 42,
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], 
        desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu minimalis. Menggunakan bahan kain breathable dan busa empuk anti kempes."
    },
    { 
        id: "p6", 
        category: "Herbal", 
        name: "Nabidz Dessert", 
        price: 0.00012,
        discount: 0,
        rating: "5.0",
        sold: 60,
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
        desc: "Nabidz Dessert berbahan baku buah anggur merah yang difermentasi esterifikasi biokimia resep pribadi dipadu proses istihalah microbiome. Berfungsi meningkatkan kualitas pencernaan dan menguatkan sistem imun tubuh."
    },
    { 
        id: "p7", 
        category: "Rumah", 
        name: "Lampu Gantung Industrial - Model Black Dome", 
        price: 0.015, 
        discount: 5,
        rating: "4.8",
        sold: 23,
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"], 
        desc: "Lampu dekoratif plafon dengan diameter 30cm. Memberikan kesan estetik industrial yang kuat di cafe maupun rumah tinggal Anda."
    },
    { 
        id: "p8", 
        category: "Rumah", 
        name: "Rak Buku Kayu 5 Tingkat - Slim Design", 
        price: 0.03, 
        discount: 0,
        rating: "4.9",
        sold: 19,
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"], 
        desc: "Rak buku hemat ruang dengan tinggi 180cm dan lebar 40cm. Sangat mudah dirakit, kokoh, dan sanggup menahan beban berat buku."
    },
    { 
        id: "p9", 
        category: "Rumah", 
        name: "Karpet Bulu Lembut 160x210 - Creamy White", 
        price: 0.012, 
        discount: 10,
        rating: "4.7",
        sold: 88,
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"], 
        desc: "Karpet lantai premium yang sangat lembut di kulit dan mudah dibersihkan. Memberikan kesan hangat dan nyaman di dalam kamar tidur."
    },
    { 
        id: "p10", 
        category: "Rumah", 
        name: "Set Gorden Jendela - Model Smokering Minimalis", 
        price: 0.008, 
        discount: 0,
        rating: "4.8",
        sold: 104,
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"], 
        desc: "Gorden jenis blackout berukuran 140x220cm. Efektif menghalau pancaran sinar matahari dari luar hingga mencapai 90%."
    },
    { 
        id: "p11", 
        category: "Rumah", 
        name: "Jam Dinding Kayu - Tipe Scandinavian", 
        price: 0.005, 
        discount: 0,
        rating: "4.9",
        sold: 56,
        images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"], 
        desc: "Jam dinding estetik berdiameter 35cm. Menggunakan mesin sweep movement sehingga tidak berdetak, tenang, dan tampak elegan."
    },
    { 
        id: "p12", 
        category: "Rumah", 
        name: "Tanaman Hias Artificial - Model Monstera Large", 
        price: 0.01, 
        discount: 0,
        rating: "4.6",
        sold: 37,
        images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"], 
        desc: "Tanaman dekorasi palsu dengan detail mirip asli, sudah termasuk pot keramik cantik dengan tinggi total mencapai 80cm."
    },
    { 
        id: "e1", 
        category: "Elektronik", 
        name: "Smartphone Pi-Phone X - 256GB Platinum", 
        price: 0.15, 
        discount: 5,
        rating: "5.0",
        sold: 12,
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"], 
        desc: "Layar AMOLED 6.7 inci, RAM 12GB, internal storage 256GB, dan baterai besar 5000mAh. Mendukung ekosistem native Pi App secara penuh."
    },
    { 
        id: "e2", 
        category: "Elektronik", 
        name: "Wireless Earbuds Pro - Noise Cancelling", 
        price: 0.02, 
        discount: 0,
        rating: "4.8",
        sold: 74,
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"], 
        desc: "Kualitas audio High-Fidelity murni dengan sertifikasi tahan air IPX5. Baterai tahan hingga 24 jam pemakaian bersama case pengisian."
    },
    { 
        id: "hb4", 
        category: "Herbal", 
        name: "COCO Pro 10", 
        price: 0.00006, 
        discount: 0,
        rating: "4.9",
        sold: 150,
        images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
        desc: "Suplemen Cocopro Biotech 10 Probiotik Multi-strain. Kombinasi madu, air kelapa, kunyit, kurma dengan formula khusus pendukung imunitas tubuh."
    },
    { 
        id: "v1", 
        category: "Mobil", 
        name: "Sedan Sport Luxury - Tipe S1", 
        price: 0.0005, 
        discount: 0,
        rating: "5.0",
        sold: 2,
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], 
        desc: "Mesin Turbo 2.0L tangguh, interior dibalut kulit premium serta sistem keamanan berkendara tingkat tinggi Smart Driving Assist."
    },
    { 
        id: "m1", 
        category: "Motor", 
        name: "Motor Sport 250cc - Black Matte", 
        price: 0.002, 
        discount: 0,
        rating: "4.8",
        sold: 5,
        images: ["https://i.ibb.co.com/spcrbbKT/Motor-250cc-Terbaik.jpg"], 
        desc: "Akselerasi cepat responsif, dilengkapi sistem pengereman ABS, serta desain aerodinamis modern yang ideal untuk touring maupun harian."
    },
    {
        id: "bike-001",
        category: "Motor",
        name: "Ducati Panigale V4 R",
        price: 0.01500,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"],
        desc: "Mesin: 998cc Desmosedici Stradale V4 R. Tenaga: 218 HP @ 15.500 RPM. Fitur Unggulan: Sayap Karbon (Aero Winglets), Öhlins Suspension."
    },
    {
        id: "bike-002",
        category: "Motor",
        name: "Kawasaki Ninja H2R (Track Only)",
        price: 0.01800,
        discount: 0,
        rating: "5.0",
        sold: 2,
        images: ["https://i.ibb.co.com/jZ6LvJTB/Desain-tanpa-judul-20260207-131613-0000.png"],
        desc: "Mesin: 998cc In-line Four dengan Supercharger. Tenaga: 310 HP (Motor produksi massal paling bertenaga). Kecepatan Maksimal: 400+ km/jam."
    },
    {
        id: "bike-003",
        category: "Motor",
        name: "BMW M 1000 RR",
        price: 0.01250,
        discount: 0,
        rating: "4.9",
        sold: 1,
        images: ["https://images.unsplash.com/photo-1615172282427-9a57ef2d142e?auto=format&fit=crop&w=800&q=80"],
        desc: "Mesin: 999cc Water-cooled Inline 4-Cylinder. Fitur Eksklusif M: Velg Karbon M, Kursi balap M, Knalpot Akrapovic Titanium asli."
    },
    {
        id: "bike-004",
        category: "Motor",
        name: "Harley-Davidson CVO Road Glide",
        price: 0.01400,
        discount: 0,
        rating: "4.9",
        sold: 3,
        images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"],
        desc: "Mesin: Milwaukee-Eight VVT 121 bertenaga (1.977cc). Gaya: Grand American Touring Luxury dengan kenyamanan berkendara kelas satu."
    },
    {
        id: "bike-005",
        category: "Motor",
        name: "MV Agusta Rush 1000 cc",
        price: 0.01650,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: "Konsep Desain: Hyper-Naked Drag Bike Luxury. Sektor Dapur Pacu: Mesin 998cc 16-valve DOHC Inline 4 performa tinggi."
    },
    {
        id: "bike-006",
        category: "Motor",
        name: "Aprilia RSV4 Xtrenta",
        price: 0.01900,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://i.ibb.co.com/gMRDN2kp/Desain-tanpa-judul-20260207-132024-0000.png"],
        desc: "Teknologi Balap: MotoGP Derived Aerodynamics bawaan pabrik. Mesin: Sasis kokoh dengan mesin 1.099cc V4 Longitudinal 65 derajat."
    },
    {
        id: "bike-007",
        category: "Motor",
        name: "Triumph Rocket 3 TFC",
        price: 0.00950,
        discount: 5,
        rating: "4.8",
        sold: 4,
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=800&q=80"],
        desc: "Mesin: Kapasitas raksasa 2.458cc (Mesin motor terbesar di dunia saat ini). Torsi Maksimal: 225 Nm untuk akselerasi instan."
    },
    {
        id: "bike-008",
        category: "Motor",
        name: "Arch Motorcycle KRGT-1",
        price: 0.02500,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://i.ibb.co.com/d4dwYps4/Desain-tanpa-judul-20260207-132911-0000.png"],
        desc: "Pembuat Kustom: Co-founded by Keanu Reeves. Dapur pacu tangguh ditenagai oleh mesin 2.032cc SandS Cycle V-Twin."
    },
    {
        id: "bike-010",
        category: "Motor",
        name: "Honda Gold Wing Tour DCT",
        price: 0.00850,
        discount: 0,
        rating: "4.9",
        sold: 6,
        images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"],
        desc: "Mesin: 1.833cc Liquid-cooled 6-cylinder Boxer. Transmisi Pintar: 7-speed Automatic Dual Clutch Transmission (DCT)."
    },
    {
        id: "car-001",
        category: "Mobil",
        name: "Toyota Fortuner 2.8 GR Sport 2024",
        price: 0.15000,
        discount: 5,
        rating: "4.9",
        sold: 15,
        images: ["https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=1000&auto=format&fit=crop"],
        desc: "Mesin: 2.800 cc Diesel Turbo melimpah. Transmisi: Otomatis tangguh 6-Speed. Produksi Tenaga: Maksimal 203.9 PS / 500 Nm."
    },
    {
        id: "car-002",
        category: "Mobil",
        name: "Honda CR-V 2.0 RS e:HEV Hybrid 2024",
        price: 0.18500,
        discount: 10,
        rating: "5.0",
        sold: 9,
        images: ["https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1000&auto=format&fit=crop"],
        desc: "Mesin: Ramah lingkungan 2.0L i-VTEC + Electric Motor (Hybrid). Transmisi: e-CVT halus. Fitur mewah: Panoramic Sunroof dan BOSE Audio."
    },
    {
        id: "car-003",
        category: "Mobil",
        name: "Rolls-Royce Phantom Series II",
        price: 0.15000,
        discount: 0,
        rating: "5.0",
        sold: 1,
        images: ["https://i.ibb.co.com/7xshksJQ/Desain-tanpa-judul-20260207-114554-0000.png"],
        desc: "Dapur Pacu: Mesin 6.75L V12 Twin-Turbo super senyap. Kenyamanan Utama: Fitur plafon Starlight Headliner dan suspensi udara Magic Carpet Ride."
    },
    // -----------------------------------------------------------------
    // KATEGORI: MAKANAN (FOOD)
    // -----------------------------------------------------------------
    {
        id: "food-001",
        category: "Makanan",
        name: "Rendang Daging Sapi Minang Vakum",
        price: 0.000015,
        discount: 0,
        rating: "4.9",
        sold: 340,
        images: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500"],
        desc: "Daging rendang otentik dengan bumbu rempah Padang asli seberat 500 gram. Dikemas steril menggunakan metode vakum udara sehingga awet alami tanpa pengawet."
    },
    {
        id: "food-002",
        category: "Makanan",
        name: "Sambal Cumi Ciamik Premium",
        price: 0.000005,
        discount: 5,
        rating: "4.8",
        sold: 512,
        images: ["https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=500"],
        desc: "Sambal bawang pedas gurih dipadu dengan potongan daging cumi asin melimpah. Dimasak segar setiap hari dan siap disantap langsung bersama nasi hangat."
    },
    {
        id: "food-003",
        category: "Makanan",
        name: "Kue Lapis Legit Spesial Full Wisman",
        price: 0.000045,
        discount: 0,
        rating: "5.0",
        sold: 68,
        images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"],
        desc: "Kue lapis premium ukuran 20x20cm dengan tekstur super lembut, legit, dan aroma wangi yang menggoda berkat penggunaan mentega Wijsman murni 100 persen."
    },
    {
        id: "food-004",
        category: "Makanan",
        name: "Baso Aci Garut Instan Kuah Pedas",
        price: 0.000003,
        discount: 10,
        rating: "4.7",
        sold: 1250,
        images: ["https://images.unsplash.com/photo-1552611052-33e04de081de?w=500"],
        desc: "Paket lengkap baso aci instan khas Garut. Isi terdiri dari baso aci, cuanki lidah, siomay kering, pilus cikur, lengkap dengan bumbu gurih, minyak bawang, dan cabai kering."
    },
    {
        id: "food-005",
        category: "Makanan",
        name: "Keripik Singkong Balado Daun Jeruk",
        price: 0.000002,
        discount: 0,
        rating: "4.8",
        sold: 890,
        images: ["https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500"],
        desc: "Keripik singkong renyah dengan balutan bumbu balado basah yang manis pedas, ditambah taburan daun jeruk purut segar yang menambah aroma harum."
    },
    {
        id: "food-006",
        category: "Makanan",
        name: "Dendeng Sapi Batokok Asli Padang",
        price: 0.000022,
        discount: 0,
        rating: "4.9",
        sold: 145,
        images: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=500"],
        desc: "Daging sapi pilihan yang dipukul (batokok) hingga pipih dan empuk, disiram dengan sambal ijo khas Minang yang segar dan minyak kelapa murni."
    },
    {
        id: "food-007",
        category: "Makanan",
        name: "Dimsum Ayam Udang Premium Isi 10",
        price: 0.000006,
        discount: 5,
        rating: "4.9",
        sold: 620,
        images: ["https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500"],
        desc: "Dimsum premium berukuran besar dengan isian daging ayam cincang dan potongan udang utuh yang juicy. Sudah termasuk saus asam pedas manis."
    },
    {
        id: "food-008",
        category: "Makanan",
        name: "Bumbu Instan Nusantara Pack isi 5",
        price: 0.000004,
        discount: 12,
        rating: "4.8",
        sold: 430,
        images: ["https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500"],
        desc: "Paket praktis bumbu masak basah instan tanpa pengawet. Terdiri dari bumbu Soto Ayam, Rawon, Gulai, Semur, dan Rendang. Praktis tinggal tumis."
    },
    {
        id: "food-009",
        category: "Makanan",
        name: "Brownies Panggang Fudgy Almond Shaved",
        price: 0.000008,
        discount: 0,
        rating: "5.0",
        sold: 185,
        images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500"],
        desc: "Brownies panggang dengan tekstur fudgy yang padat dan cokelat yang sangat pekat (rich). Diberi taburan kacang almond dan chocochips di atasnya."
    },
    {
        id: "food-010",
        category: "Makanan",
        name: "Ayam Kampung Ungkep Bumbu Kuning",
        price: 0.000012,
        discount: 0,
        rating: "4.9",
        sold: 290,
        images: ["https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500"],
        desc: "Satu ekor ayam kampung asli yang sudah dipotong dan diungkep dengan bumbu kuning rempah tradisional. Tekstur daging empuk, meresap, siap digoreng atau dibakar."
    }
];
// =========================================================================
// 2. PI BLOCKCHAIN CORE INITIALIZATION (LOGIN OTOMATIS) - FIXED VERSION
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

            // =========================================================================
            // PERBAIKAN UTAMA: Ambil data status kemitraan & produk secara realtime 
            // tepat setelah User ID (UID) berhasil didapatkan dari server Pi Core Team.
            // =========================================================================
            if (typeof muatStatusKemitraan === "function") {
                console.log("Menjalankan sinkronisasi status kemitraan awal...");
                muatStatusKemitraan();
            }
            
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
// 3. PI AUTHENTICATION SYSTEMS (MANUAL RESIGN-IN LOGIC) - FIXED VERSION
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

        // =========================================================================
        // PERBAIKAN: Ambil status kemitraan setelah login manual sukses
        // =========================================================================
        if (typeof muatStatusKemitraan === "function") {
            muatStatusKemitraan();
        }

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
// 4. RENDERING & UI FUNCTIONS - FIXED VERSION
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
                    <button class="btn-buy-now" onclick="event.stopPropagation(); if(typeof currentUser !== 'undefined' && currentUser) { window.handlePayment(${p.price}, '${p.name}'); } else { if(typeof showLoginPrompt === 'function') showLoginPrompt(); else alert('Silakan login terlebih dahulu melalui menu Profil.'); }">Beli</button>
                </div>
            </div>`;
        grid.appendChild(card);
    });
}

window.openProductDetail = (productId) => {
    if (typeof productsData === 'undefined') return;
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
                    <button onclick="if(typeof currentUser !== 'undefined' && currentUser) { window.handlePayment(${p.price}, '${p.name}'); } else { if(typeof showLoginPrompt === 'function') showLoginPrompt(); else alert('Silakan login terlebih dahulu.'); }" style="background: #4a148c; color: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer; box-shadow: 0 6px 20px rgba(74,20,140,0.3);">Beli Sekarang</button>
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
    if (typeof productsData === 'undefined') return;
    const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
    renderProducts(filtered, 'main-grid');
    if (element) {
        document.querySelectorAll('.category-pill').forEach(pill => pill.classList.remove('active'));
        element.classList.add('active');
    }
};

// =========================================================================
// 5. CART & SHIPPING ADDRESS ACTIONS - FIXED VERSION
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
    const inputName = document.getElementById('ship-name');
    const inputPhone = document.getElementById('ship-phone');
    const inputAddr = document.getElementById('ship-address');

    if (!inputName || !inputPhone || !inputAddr) return;

    const valName = inputName.value.trim();
    const valPhone = inputPhone.value.trim();
    const valAddr = inputAddr.value.trim();
    
    if(!valName || !valPhone || !valAddr) {
        return alert("⚠️ Mohon lengkapi seluruh data alamat pengiriman Anda!"); 
    }

    // Set ke variabel global secara aman
    userAddress = { nama: valName, telepon: valPhone, alamatLengkap: valAddr };
    
    // 🔊 EFEK SUARA ELEKTRONIK KUSTOM
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

    // 🌟 SEKSI POPUP NOTIFIKASI KUSTOM ALAMAT DISIMPAN
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
    if (typeof productsData === 'undefined') return;
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
                
                <button style="width:100%; padding:16px; border-radius:16px; background:#6748d7; color:white; font-weight:800; border:none; cursor:pointer;" 
                        onclick="if(typeof currentUser === 'undefined' || !currentUser) { if(typeof showLoginPrompt === 'function') showLoginPrompt(); else alert('Silakan login terlebih dahulu.'); } else if(!userAddress.nama || !userAddress.alamatLengkap) { if(typeof showAddressPrompt === 'function') showAddressPrompt(); else alert('Silakan lengkapi alamat pengiriman Anda terlebih dahulu.'); } else { window.handlePayment(${total}, 'Total Keranjang'); }">
                    CHECKOUT SEKARANG 🚀
                </button>
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

    if(pageId === 'home' && typeof renderProducts === 'function' && typeof productsData !== 'undefined') {
        renderProducts(productsData, 'main-grid');
    }
    
    if(pageId === 'profile' && typeof muatStatusKemitraan === "function") {
        muatStatusKemitraan();
    }
};

// =========================================================================
// 6. GATEWAY PI BLOCKCHAIN & ALERTS PROMPTS - FIXED VERSION
// =========================================================================
window.handlePayment = async (amount, name) => {
    if (!isPiInitialized) {
        alert("Koneksi Blockchain belum siap. Mohon tunggu beberapa detik hingga inisialisasi selesai.");
        return;
    }
    if (!currentUser) { showLoginPrompt(); return; }
    if (!userAddress.nama) { showAddressPrompt(); return; }

    let detailedItemName = name;
    if (name === 'Total Keranjang' && typeof cart !== 'undefined' && cart.length > 0) {
        detailedItemName = `Keranjang (${cart.map(item => item.name).join(", ")})`;
    }

    // PERBAIKAN 1: Amankan konversi agar parameter angka maupun string tidak memicu eror .toFixed()
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
        alert("⚠️ Format harga tidak valid.");
        return;
    }
    const secureAmountString = parsedAmount.toFixed(7).toString();

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
                    if(name === 'Total Keranjang') { 
                        cart = []; 
                        if (typeof window.updateCartUI === 'function') window.updateCartUI(); 
                    }
                }
            },
            onCancel: () => { console.log("Pembayaran dibatalkan pembeli"); },
            onError: (error, payment) => { 
                console.error("Payment Error:", error); 
                if(payment && typeof handleIncompletePayment === 'function') handleIncompletePayment(payment); 
            }
        });
    } catch (err) { 
        console.error("Execution Error:", err); 
    }
};

function showSuccessOverlay(amount, name, txid) {
    // Gunakan SCRIPT_URL yang terpadu agar tidak terjadi bentrok variabel
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

    // PERBAIKAN 2: Gunakan URLSearchParams + metode POST biasa tanpa 'no-cors' agar data bodi masuk sempurna ke Google Sheets
    const googleFormBody = new URLSearchParams(dataTransaksi);

    fetch(excelWebhookUrl, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
        body: googleFormBody.toString() 
    })
    .then(() => console.log("Data pesanan berhasil disinkronkan ke server Google Sheets."))
    .catch(err => console.error("Gagal catat Excel:", err));

    const overlay = document.createElement('div');
    overlay.style.cssText = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(5px);";
    
    const pesanWhatsApp = `*KONFIRMASI PEMBAYARAN PI NETWORK*%0A*PT. DIGITAL PRO INDO*%0A_______________________________%0A%0AHalo Admin, saya telah berhasil melakukan pembayaran produk premium melalui Pi Browser:%0A%0A*DETAIL TRANSAKSI:*%0A• *Item:* ${encodeURIComponent(name)}%0A• *Total:* ${amount} π%0A• *Status:* Success (Pi Network)%0A• *TXID:* \`${txid}\` %0A%0A*DATA PENGIRIMAN:*%0A• *Penerima:* ${encodeURIComponent(userAddress.nama)}%0A• *Telepon:* ${userAddress.telepon}%0A• *Alamat:* ${encodeURIComponent(userAddress.alamatLengkap)}%0A%0A_______________________________%0A*Mohon segera diproses dan informasikan nomor resi pengiriman. Terima kasih!*`;

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
// 7. SIDEBAR MENU & BANNER LOGIC - FIXED VERSION
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
// 8. CORE PIPELINE (DOM LOAD INITIALIZATION) - FIXED & CLEAN VERSION
// =========================================================================
const SCRIPT_URL_AMAN = "https://script.google.com/macros/s/AKfycbxhmcYyT3lBeLrm4dMGotKonJPwT9ZCMU1jRNMBD8CZITVD3Gyreuv_s81Vgw5Kra3b/exec";
let statusKirimKomunitas = false;

document.addEventListener("DOMContentLoaded", async () => {
    // 1. LANGSUNG EKSEKUSI RENDER AGAR PRODUK TIDAK KOSONG
    if (typeof renderProducts === "function" && typeof productsData !== "undefined") {
        renderProducts(productsData, 'main-grid');
    }

    // =========================================================================
    // MODAL POPUP SUKSES PENDAFTARAN (DENGAN RE-ROUTE KE BERANDA SAAT CLOSE)
    // =========================================================================
    window.tampilkanModalSuksesDigital = () => {
        // Hapus modal jika ada duplikasi penggantung di DOM sebelum membuat baru
        const sisaModal = document.querySelectorAll('[id^="modal-sukses-komunitas"]');
        sisaModal.forEach(modal => modal.remove());

        const overlaySukses = document.createElement('div');
        overlaySukses.id = "modal-sukses-komunitas";
        overlaySukses.className = "modal-sukses-premium-pro";
        overlaySukses.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); backdrop-filter:blur(5px); z-index:100006; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; font-family:'Inter', sans-serif;";
        
        // Fungsi pembersih total untuk menutup modal dan kembali ke Beranda
        const aksiTutupDanKeBeranda = (e) => {
            if(e) { e.preventDefault(); e.stopPropagation(); }
            const semuaModalAktif = document.querySelectorAll('.modal-sukses-premium-pro');
            semuaModalAktif.forEach(m => m.remove());
            
            if (typeof window.switchPage === 'function') {
                window.switchPage('home'); // Memaksa UI kembali ke halaman Home Anda
            } else {
                location.reload(); 
            }
        };

        overlaySukses.innerHTML = `
            <div style="background: linear-gradient(135deg, #100a1c 0%, #07111a 100%); border: 2px solid #FFD700; padding: 40px 20px 30px; border-radius: 28px; max-width: 360px; width: 100%; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); position: relative;">
                
                <div class="tombol-silang-penutup" 
                     style="position: absolute; top: 18px; right: 18px; width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: bold; color: #ffffff; font-size: 14px; z-index: 100008;">
                     ✕
                </div>

                <div style="background: rgba(0, 242, 254, 0.1); width: 80px; height: 80px; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 25px; border: 3px solid #00f2fe;">
                    <span style="font-size: 35px; color: #00f2fe;">✓</span>
                </div>
                
                <h2 style="color: #ffffff; margin: 0 0 10px 0; font-weight: 800; font-size: 1.5rem;">Pendaftaran Berhasil!</h2>
                <p style="color: #94a3b8; margin: 0 0 25px 0; font-size: 0.95rem; line-height: 1.5;">Data Anda telah aman tersimpan dalam ekosistem database pusat.</p>
                
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 16px; text-align: left; margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: bold; margin-bottom: 5px;">
                        <span style="color: #64748b;">STATUS</span>
                        <span style="color: #FFA500;">PROSES REVIEW</span>
                    </div>
                    <p style="color: #94a3b8; margin: 0; font-size: 0.85rem; line-height: 1.4;">Tim kami sedang melakukan validasi berkas kemitraan wilayah Anda.</p>
                </div>

                <button onclick="window.location.href='whatsapp://chat?code=JSa1D2JnoNL5HE5ruEuJ5q'" style="background: linear-gradient(90deg, #00b09b 0%, #96c93d 100%); color: white; border: none; padding: 16px 0; width: 100%; border-radius: 16px; font-weight: 800; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 176, 155, 0.4); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">GABUNG GRUP WHATSAPP</button>
                
                <button class="tombol-nanti-penutup" style="background: transparent; color: #64748b; border: none; width: 100%; padding: 10px 0; font-weight: 600; font-size: 0.95rem; cursor: pointer;">Nanti Saja</button>
            </div>
        `;
        document.body.appendChild(overlaySukses);

        // Pasang Event Listener klik ke fungsi penutup Beranda
        overlaySukses.querySelector('.tombol-silang-penutup').addEventListener('click', aksiTutupDanKeBeranda);
        overlaySukses.querySelector('.tombol-nanti-penutup').addEventListener('click', aksiTutupDanKeBeranda);
    };

    // 2. Hubungkan pipa pencarian input
    const searchInput = document.getElementById('search-input');
    if (searchInput && typeof productsData !== "undefined") {
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
    if (typeof initPi === "function") {
        await initPi();
    }
    
    // 6. Bind tombol login manual awal sebelum ter-otentikasi
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn && (typeof currentUser === "undefined" || !currentUser)) {
        loginBtn.onclick = window.handleAuth;
    }

    // 7. PENANGANAN SUBMIT FORM KOMUNITAS
    const formAman = document.getElementById('formKomunitas');
    if (formAman) {
        formAman.addEventListener('submit', e => {
            e.preventDefault();
            
            if (statusKirimKomunitas) return;
            
            if (typeof currentUser === 'undefined' || !currentUser || !currentUser.uid) {
                alert("⚠️ Otorisasi login Pi Anda belum terbaca sempurna. Harap muat ulang Pi Browser Anda.");
                return;
            }

            const btnAman = document.getElementById('btnKirim');
            if (btnAman) {
                btnAman.innerText = "MENGIRIM...";
                btnAman.disabled = true;
            }

            const namaUser = formAman.querySelector('[name="nama"]') ? formAman.querySelector('[name="nama"]').value.trim() : "";
            const waUser = formAman.querySelector('[name="whatsapp"]') ? formAman.querySelector('[name="whatsapp"]').value.trim() : "";
            const provUser = document.getElementById('selectProvinsi') ? document.getElementById('selectProvinsi').value : "";
            const kotaUser = document.getElementById('selectKota') ? document.getElementById('selectKota').value : "";
            const kecUser = document.getElementById('selectKecamatan') ? document.getElementById('selectKecamatan').value : "";
            const kelUser = document.getElementById('selectKelurahan') ? document.getElementById('selectKelurahan').value : "";
            
            if (!namaUser || !waUser || !provUser || !kotaUser || !kecUser || !kelUser) {
                alert("⚠️ Mohon lengkapi semua pilihan wilayah Anda terlebih dahulu!");
                if (btnAman) {
                    btnAman.innerText = "DAFTAR SEKARANG";
                    btnAman.disabled = false;
                }
                return;
            }

            statusKirimKomunitas = true;

            const dataKomunitas = {
                nama: namaUser,
                whatsapp: waUser,
                provinsi: provUser,
                kota: kotaUser,
                kecamatan: kecUser,
                kelurahan: kelUser,
                uid: currentUser.uid
            };

            fetch(SCRIPT_URL_AMAN, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(dataKomunitas).toString()
            })
            .then(res => res.json())
            .then(response => {
                if (typeof window.closeKomunitasModal === "function") window.closeKomunitasModal();
                formAman.reset();
                
                // Memanggil modal baru yang bersih
                if (typeof window.tampilkanModalSuksesDigital === "function") {
                    window.tampilkanModalSuksesDigital();
                }
                
                // PERBAIKAN: SETTIMEOUT LAMA TELAH DIHAPUS AGAR TIDAK TERJADI BENTROK RE-ROUTE DI PI BROWSER
                
                if (typeof window.muatStatusKemitraan === "function") window.muatStatusKemitraan();
            })
            .catch(err => {
                console.error("Eror form komunitas:", err);
                if (typeof window.closeKomunitasModal === "function") window.closeKomunitasModal();
            })
            .finally(() => {
                statusKirimKomunitas = false;
                if (btnAman) {
                    btnAman.innerText = "DAFTAR SEKARANG";
                    btnAman.disabled = false;
                }
            });
        });
    }
});

// 2. FUNGSI SINKRONISASI STATUS KEMITRAAN DI HALAMAN PROFIL
window.muatStatusKemitraan = function() {
    const penunjukStatus = document.getElementById('partner-status');
    const labelLogistik = document.getElementById('logistik-share'); 
    const labelItem = document.getElementById('item-terproses');     
    
    if (typeof currentUser === "undefined" || !currentUser || !currentUser.uid) {
        if (penunjukStatus) {
            penunjukStatus.innerText = "BELUM LOGIN";
            penunjukStatus.style.background = "#f1f5f9";
            penunjukStatus.style.color = "#64748b";
        }
        return;
    }
    
    fetch(`${SCRIPT_URL_AMAN}?action=cekStatus&uid=${encodeURIComponent(currentUser.uid)}`)
    .then(res => {
        if (!res.ok) throw new Error("Respon jaringan dari Google Apps Script bermasalah");
        return res.json();
    })
    .then(data => {
        if (!data) return;
        
        if (data.status === "ditemukan") {
            const statusFinal = data.statusKemitraan ? data.statusKemitraan.toUpperCase() : "PROSES REVIEW";
            
            if (penunjukStatus) {
                penunjukStatus.innerText = statusFinal;
                
                if (statusFinal === "DISETUJUI") {
                    penunjukStatus.style.background = "#d1fae5"; 
                    penunjukStatus.style.color = "#065f46";      
                } else if (statusFinal === "PROSES REVIEW") {
                    penunjukStatus.style.background = "#fef3c7"; 
                    penunjukStatus.style.color = "#92400e";      
                } else {
                    penunjukStatus.style.background = "#fee2e2"; 
                    penunjukStatus.style.color = "#991b1b";
                }
            }
            
            if (labelLogistik) labelLogistik.innerText = data.logistikShare || "0.00 %";
            if (labelItem) labelItem.innerText = data.produkTerproses || "0 Item";
            
        } else {
            if (penunjukStatus) {
                penunjukStatus.innerText = "BELUM TERDAFTAR";
                penunjukStatus.style.background = "#f1f5f9";
                penunjukStatus.style.color = "#64748b";
            }
            if (labelLogistik) labelLogistik.innerText = "0.00 %";
            if (labelItem) labelItem.innerText = "0 Item";
        }
    })
    .catch(err => {
        console.error("Gagal melakukan sinkronisasi profil:", err);
    });
};            

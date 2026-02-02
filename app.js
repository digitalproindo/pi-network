document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];

    // --- 1. DATA PRODUK (DATABASE) ---
    const productsData = [
        {
            id: 'p1',
            name: "Mastering Pi Network 2026",
            price: 0.005,
            category: "E-Book",
            images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"],
            desc: "Panduan optimasi node dan ekosistem Pi terbaru."
        },
        {
            id: 'p2',
            name: "COCO Probiotik",
            price: 0.010,
            category: "Herbal",
            images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"],
            desc: "Lisensi aset digital premium Digital Pro Indo."
        },
        {
            id: 'p3',
            name: "Smart Home System Pro",
            price: 0.500,
            category: "Rumah",
            images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"],
            desc: "Paket instalasi smart home berbasis IoT."
        },
        {
            id: 'p4',
            name: "Premium Smartphone X",
            price: 1.200,
            category: "Elektronik",
            images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"],
            desc: "Gadget premium dengan performa tinggi."
        },
        {
        id: 'p5',
        name: "Sofa Minimalis 2 Seater - Modern Grey",
        price: 0.05,
        category: "Rumah",
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"],
        desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu kecil."
    },
    {
        id: 'p6',
        name: "Meja Makan Kayu Jati - Tipe Kolonial",
        price: 0.08,
        category: "Rumah",
        images: ["https://images.unsplash.com/photo-1577145946459-39a587ed522f?w=500&q=80"],
        desc: "Meja makan kokoh ukuran 120x60cm dengan finishing natural."
    },
    {
        id: 'p7',
        name: "Lampu Gantung Industrial - Model Black Dome",
        price: 0.015,
        category: "Rumah",
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"],
        desc: "Lampu dekoratif plafon, diameter 30cm untuk kesan estetik."
    },
    {
        id: 'p8',
        name: "Rak Buku Kayu 5 Tingkat - Slim Design",
        price: 0.03,
        category: "Rumah",
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"],
        desc: "Rak buku hemat ruang, tinggi 180cm lebar 40cm."
    },
    {
        id: 'p9',
        name: "Karpet Bulu Lembut 160x210 - Creamy White",
        price: 0.012,
        category: "Rumah",
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"],
        desc: "Karpet lantai premium, sangat lembut dan mudah dibersihkan."
    },
    {
        id: 'p10',
        name: "Set Gorden Jendela - Model Smokering Minimalis",
        price: 0.008,
        category: "Rumah",
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"],
        desc: "Gorden blackout ukuran 140x220cm, tersedia berbagai warna."
    },
    {
        id: 'p11',
        name: "Jam Dinding Kayu - Tipe Scandinavian",
        price: 0.005,
        category: "Rumah",
        images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"],
        desc: "Jam dinding estetik diameter 35cm, mesin sweep movement (tanpa suara)."
    },
    {
        id: 'p12',
        name: "Tanaman Hias Artificial - Model Monstera Large",
        price: 0.01,
        category: "Rumah",
        images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"],
        desc: "Tanaman palsu mirip asli dengan pot keramik, tinggi 80cm."
    },
    {
        id: 'e1',
        name: "Smartphone Pi-Phone X - 256GB Platinum",
        price: 0.15,
        category: "Elektronik",
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"],
        desc: "Layar AMOLED 6.7 inci, RAM 12GB, Baterai 5000mAh. Support Pi-App Ecosystem."
    },
    {
        id: 'e2',
        name: "Wireless Earbuds Pro - Noise Cancelling",
        price: 0.02,
        category: "Elektronik",
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"],
        desc: "Audio High-Fidelity, tahan air IPX5, daya tahan baterai hingga 24 jam."
    },
    {
        id: 'e3',
        name: "Smartwatch Ultra - Health & GPS Tracker",
        price: 0.045,
        category: "Elektronik",
        images: ["https://images.unsplash.com/photo-1508685096489-7aac296839c8?w=500&q=80"],
        desc: "Monitor detak jantung, oksigen darah, dan fitur pelacak olahraga profesional."
    },
    {
        id: 'e4',
        name: "Laptop Slim Pro 14 - M2 Chip 512GB SSD",
        price: 0.25,
        category: "Elektronik",
        images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"],
        desc: "Desain ultra tipis, layar Retina 2K, performa tinggi untuk editing video."
    },
    {
        id: 'e5',
        name: "Mechanical Keyboard RGB - Blue Switch",
        price: 0.015,
        category: "Elektronik",
        images: ["https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80"],
        desc: "Keyboard gaming dengan 18 mode lampu RGB dan tombol sangat responsif."
    },
    {
        id: 'e6',
        name: "Action Camera 4K - Ultra HD Waterproof",
        price: 0.035,
        category: "Elektronik",
        images: ["https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&q=80"],
        desc: "Rekam petualangan Anda dalam resolusi 4K 60fps. Termasuk casing anti air."
    },
    {
        id: 'e7',
        name: "Powerbank 20.000mAh - Fast Charging 22W",
        price: 0.007,
        category: "Elektronik",
        images: ["https://images.unsplash.com/photo-1609091839311-d5364f512c58?w=500&q=80"],
        desc: "Kapasitas jumbo, bisa cas 3 perangkat sekaligus. Desain elegan nan ringkas."
    },
    {
        id: 'e8',
        name: "Bluetooth Speaker Portable - Extra Bass",
        price: 0.012,
        category: "Elektronik",
        images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"],
        desc: "Suara jernih 360 derajat, baterai tahan 12 jam. Cocok untuk pesta outdoor."
    },
    {
        id: 'hb1',
        name: "Madu Hutan Murni - 500gr Premium",
        price: 0.005,
        category: "Herbal",
        images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80"],
        desc: "Madu asli dari hutan tropis tanpa bahan pengawet. Kaya nutrisi dan antioksidan."
    },
    {
        id: 'hb2',
        name: "Teh Hijau Organik - Daun Pilihan",
        price: 0.003,
        category: "Herbal",
        images: ["https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&q=80"],
        desc: "Teh hijau murni untuk detoksifikasi tubuh dan meningkatkan metabolisme."
    },
    {
        id: 'hb3',
        name: "Minyak Zaitun Extra Virgin - 250ml",
        price: 0.008,
        category: "Herbal",
        images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80"],
        desc: "Minyak zaitun kualitas terbaik untuk kesehatan jantung dan kecantikan kulit."
    },
    {
        id: 'hb4',
        name: "Ekstrak Kurma Pro - Booster Energi",
        price: 0.004,
        category: "Herbal",
        images: ["https://i.ibb.co.com/C5dj5y6j/IMG-20251130-WA0028.jpg"],
        desc: "Sari kurma pekat untuk meningkatkan stamina dan pemulihan tubuh."
    },
    {
        id: 'v1',
        name: "Sedan Sport Luxury - Tipe S1",
        price: 5.5, // Contoh harga Pi yang lebih tinggi untuk otomotif
        category: "Mobil",
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"],
        desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof."
    },
    {
        id: 'v2',
        name: "Electric SUV Family - Eco Edition",
        price: 4.8,
        category: "Mobil",
        images: ["https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&q=80"],
        desc: "Jarak tempuh 450km per charge, 7 Seater, Fitur Autopilot."
    },
    // Kategori Motor
    {
        id: 'm1',
        name: "Motor Sport 250cc - Black Matte",
        price: 1.2,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"],
        desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern."
    },
    {
        id: 'm2',
        name: "Skuter Matic Retro - Classic White",
        price: 0.65,
        category: "Motor",
        images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=500&q=80"],
        desc: "Desain klasik elegan, Irit bahan bakar, Kapasitas bagasi luas."
    }
    ];

    // --- 2. INISIALISASI SDK (MAINNET READY) ---
    async function initPi() {
        try {
            // sandbox: false mengarahkan ke Mainnet Pi Network
            await Pi.init({ version: "2.0", sandbox: false });
            console.log("Pi SDK Berhasil diinisialisasi (Mainnet)");
        } catch (e) {
            console.error("Gagal inisialisasi SDK:", e);
        }
    }

    // --- 3. LOGIKA RENDER PRODUK ---
    function renderProducts(data, targetGridId) {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";

        data.forEach(p => {
            grid.innerHTML += `
                <div class="product-card">
                    <div class="slider-container">
                        <div class="slider-wrapper">
                            <img src="${p.images[0]}" alt="${p.name}">
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${p.name}</h3>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="price">π ${p.price}</span>
                            <button class="btn-buy-now" onclick="handlePayment(${p.price}, '${p.name}')">Beli</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // --- 4. NAVIGASI & FILTER ---
    window.switchPage = (pageId) => {
        const pages = ['page-home', 'page-cari', 'page-keranjang', 'page-profile'];
        const navs = ['nav-home', 'nav-cari', 'nav-keranjang', 'nav-profile'];

        pages.forEach(p => document.getElementById(p).classList.add('hidden'));
        document.getElementById(`page-${pageId}`).classList.remove('hidden');

        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`).classList.add('active');
        
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
    };

    window.filterCategory = (category) => {
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
            if(pill.innerText.includes(category) || (category === 'all' && pill.innerText === 'Semua')) {
                pill.classList.add('active');
            }
        });

        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

    window.searchProduct = () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));
        renderProducts(filtered, 'search-results');
    };

    // --- 5. FUNGSI AUTH (LOGIN & LOGOUT TOGGLE) ---
async function handleAuth() {
    const loginBtn = document.getElementById('login-btn');

    // JIKA USER SUDAH LOGIN (Status: Logged In) -> MAKA JALANKAN PROSES LOGOUT
    if (currentUser) {
        const yakinLogout = confirm("Apakah Anda yakin ingin logout?");
        if (yakinLogout) {
            currentUser = null; // Hapus data user dari variabel
            
            // Kembalikan tampilan tombol ke posisi Login
            loginBtn.innerText = "Login";
            loginBtn.classList.remove('btn-logout-style'); // Hapus warna merah jika ada
            
            // Update UI Profil
            document.getElementById('profile-username').innerText = "Belum Login";
            document.getElementById('profile-address').innerText = "Silakan login untuk melihat detail akun.";
            
            alert("Anda telah logout.");
        }
        return; // Berhenti di sini
    }

    // JIKA USER BELUM LOGIN -> JALANKAN PROSES LOGIN PI
    loginBtn.innerText = "Loading...";
    loginBtn.disabled = true;

    try {
        const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
            handleIncompletePayment(payment);
        });
        
        currentUser = auth.user;
        
        // Ubah tombol menjadi "Logout" setelah berhasil login
        loginBtn.innerText = "Logout";
        loginBtn.disabled = false;
        loginBtn.classList.add('btn-logout-style'); // Tambahkan class untuk warna merah

        // Update UI Profil dengan data asli dari Pi Network
        document.getElementById('profile-username').innerText = currentUser.username;
        document.getElementById('profile-address').innerText = currentUser.uid;

        alert("Selamat datang, " + currentUser.username + "!");
    } catch (err) {
        console.error(err);
        loginBtn.innerText = "Login";
        loginBtn.disabled = false;
        alert("Gagal Login. Pastikan Anda berada di Pi Browser.");
    }
}

    // --- 6. SISTEM PEMBAYARAN (MAINNET) ---
    window.handlePayment = async function(amount, productName) {
        if (!currentUser) return alert("Silakan Login terlebih dahulu di menu Profil!");

        try {
            await Pi.createPayment({
                amount: amount,
                memo: `Pembelian ${productName} - Digital Pro Indo`,
                metadata: { productName: productName },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    // Endpoint approval backend Anda
                    const res = await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    // Endpoint completion backend Anda
                    const res = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    if (res.ok) alert(`Sukses! ${productName} berhasil dibeli.\nTXID: ${txid}`);
                },
                onCancel: (paymentId) => console.log("Pembayaran dibatalkan:", paymentId),
                onError: (error, payment) => {
                    if (payment) handleIncompletePayment(payment);
                    alert("Gagal membayar: " + error.message);
                }
            });
        } catch (err) {
            console.error("Payment error:", err);
        }
    };

    async function handleIncompletePayment(payment) {
        await fetch('/api/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
        });
    }

    // Inisialisasi awal
    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = handleAuth;
});
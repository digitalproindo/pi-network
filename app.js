document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    // Simpan data alamat
    let userAddress = { nama: "", telepon: "", alamatLengkap: "" };

    // --- KONFIGURASI ---
    const ADMIN_WA = "6282191851112"; 

    // --- 1. DATA PRODUK ---
    const productsData = [
        { id: 'p1', name: "Mastering Pi Network 2026", price: 0.005, category: "E-Book", images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"], desc: "Panduan optimasi node dan ekosistem Pi terbaru." },
        { id: 'p2', name: "COCO Probiotik", price: 0.010, category: "Herbal", images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], desc: "Lisensi aset digital premium Digital Pro Indo." },
        { id: 'p3', name: "Smart Home System Pro", price: 0.500, category: "Rumah", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], desc: "Paket instalasi smart home berbasis IoT." },
        { id: 'p4', name: "Premium Smartphone X", price: 1.200, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], desc: "Gadget premium dengan performa tinggi." },
        { id: 'p5', name: "Sofa Minimalis 2 Seater - Modern Grey", price: 0.05, category: "Rumah", images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu kecil." },
        { id: 'p6', name: "Meja Makan Kayu Jati - Tipe Kolonial", price: 0.08, category: "Rumah", images: ["https://images.unsplash.com/photo-1577145946459-39a587ed522f?w=500&q=80"], desc: "Meja makan kokoh ukuran 120x60cm dengan finishing natural." },
        { id: 'p7', name: "Lampu Gantung Industrial - Model Black Dome", price: 0.015, category: "Rumah", images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"], desc: "Lampu dekoratif plafon, diameter 30cm untuk kesan estetik." },
        { id: 'p8', name: "Rak Buku Kayu 5 Tingkat - Slim Design", price: 0.03, category: "Rumah", images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"], desc: "Rak buku hemat ruang, tinggi 180cm lebar 40cm." },
        { id: 'p9', name: "Karpet Bulu Lembut 160x210 - Creamy White", price: 0.012, category: "Rumah", images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"], desc: "Karpet lantai premium, sangat lembut dan mudah dibersihkan." },
        { id: 'p10', name: "Set Gorden Jendela - Model Smokering Minimalis", price: 0.008, category: "Rumah", images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"], desc: "Gorden blackout ukuran 140x220cm, tersedia berbagai warna." },
        { id: 'p11', name: "Jam Dinding Kayu - Tipe Scandinavian", price: 0.005, category: "Rumah", images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"], desc: "Jam dinding estetik diameter 35cm, mesin sweep movement." },
        { id: 'p12', name: "Tanaman Hias Artificial - Model Monstera Large", price: 0.01, category: "Rumah", images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"], desc: "Tanaman palsu mirip asli dengan pot keramik, tinggi 80cm." },
        { id: 'e1', name: "Smartphone Pi-Phone X - 256GB Platinum", price: 0.15, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"], desc: "Layar AMOLED 6.7 inci, RAM 12GB, Baterai 5000mAh." },
        { id: 'e2', name: "Wireless Earbuds Pro - Noise Cancelling", price: 0.02, category: "Elektronik", images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"], desc: "Audio High-Fidelity, tahan air IPX5." },
        { id: 'e3', name: "Smartwatch Ultra - Health & GPS Tracker", price: 0.045, category: "Elektronik", images: ["https://images.unsplash.com/photo-1508685096489-7aac296839c8?w=500&q=80"], desc: "Monitor detak jantung, oksigen darah." },
        { id: 'e4', name: "Laptop Slim Pro 14 - M2 Chip 512GB SSD", price: 0.25, category: "Elektronik", images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"], desc: "Desain ultra tipis, layar Retina 2K." },
        { id: 'e5', name: "Mechanical Keyboard RGB - Blue Switch", price: 0.015, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80"], desc: "Keyboard gaming dengan 18 mode lampu RGB." },
        { id: 'e6', name: "Action Camera 4K - Ultra HD Waterproof", price: 0.035, category: "Elektronik", images: ["https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=500&q=80"], desc: "Rekam petualangan Anda dalam resolusi 4K 60fps." },
        { id: 'e7', name: "Powerbank 20.000mAh - Fast Charging 22W", price: 0.007, category: "Elektronik", images: ["https://images.unsplash.com/photo-1609091839311-d5364f512c58?w=500&q=80"], desc: "Kapasitas jumbo, bisa cas 3 perangkat sekaligus." },
        { id: 'e8', name: "Bluetooth Speaker Portable - Extra Bass", price: 0.012, category: "Elektronik", images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"], desc: "Suara jernih 360 derajat, baterai tahan 12 jam." },
        { id: 'hb1', name: "Madu Hutan Murni - 500gr Premium", price: 0.005, category: "Herbal", images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80"], desc: "Madu asli dari hutan tropis tanpa bahan pengawet." },
        { id: 'hb2', name: "Teh Hijau Organik - Daun Pilihan", price: 0.003, category: "Herbal", images: ["https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500&get=80"], desc: "Teh hijau murni untuk detoksifikasi tubuh." },
        { id: 'hb3', name: "Minyak Zaitun Extra Virgin - 250ml", price: 0.008, category: "Herbal", images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80"], desc: "Minyak zaitun kualitas terbaik untuk kesehatan jantung." },
        { id: 'hb4', name: "Ekstrak Kurma Pro - Booster Energi", price: 0.004, category: "Herbal", images: ["https://i.ibb.co.com/C5dj5y6j/IMG-20251130-WA0028.jpg"], desc: "Sari kurma pekat untuk meningkatkan stamina." },
        { id: 'v1', name: "Sedan Sport Luxury - Tipe S1", price: 5.5, category: "Mobil", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof." },
        { id: 'v2', name: "Electric SUV Family - Eco Edition", price: 4.8, category: "Mobil", images: ["https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&q=80"], desc: "Jarak tempuh 450km per charge, 7 Seater." },
        { id: 'm1', name: "Motor Sport 250cc - Black Matte", price: 1.2, category: "Motor", images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"], desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern." },
        { id: 'm2', name: "Skuter Matic Retro - Classic White", price: 0.65, category: "Motor", images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=500&q=80"], desc: "Desain klasik elegan, Irit bahan bakar." }
    ];

    // --- 2. INISIALISASI ---
    async function initPi() {
        try {
            await Pi.init({ version: "2.0", sandbox: false });
        } catch (e) { console.error(e); }
    }

    // --- REVISI FORM ALAMAT DENGAN TOMBOL (X) ---
    window.showAddressForm = () => {
        const overlay = document.createElement('div');
        overlay.id = "address-overlay";
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        
        overlay.innerHTML = `
            <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:350px; color:#333; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: fadeIn 0.3s ease; position:relative;">
                
                <div onclick="document.getElementById('address-overlay').remove()" 
                     style="position:absolute; top:15px; right:15px; width:30px; height:30px; background:#f2f2f2; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; color:#666; font-family:Arial, sans-serif;">
                     ✕
                </div>

                <h3 style="margin-top:0; margin-bottom:20px; text-align:center; font-family:sans-serif;">Alamat Pengiriman</h3>
                
                <div style="margin-bottom:12px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">Nama Penerima</label>
                    <input type="text" id="ship-name" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" placeholder="Masukkan nama" value="${userAddress.nama}">
                </div>

                <div style="margin-bottom:12px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">No HP/WA</label>
                    <input type="number" id="ship-phone" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" placeholder="Contoh: 0812..." value="${userAddress.telepon}">
                </div>

                <div style="margin-bottom:20px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">Alamat Lengkap</label>
                    <textarea id="ship-address" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; height:80px; box-sizing:border-box; font-family:sans-serif; resize:none;" placeholder="Nama jalan, RT/RW, Kecamatan">${userAddress.alamatLengkap}</textarea>
                </div>

                <button onclick="saveAddress()" style="width:100%; background:#6748d7; color:white; border:none; padding:14px; border-radius:10px; font-weight:bold; font-size:1rem; cursor:pointer;">Simpan Alamat</button>
            </div>
            <style>
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            </style>`;
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

    // --- 4. RENDER BERANDA ---
    function renderProducts(data, targetGridId) {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";
        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div onclick="openProductDetail('${p.id}')">
                    <img src="${p.images[0]}" style="width:100%; height:150px; object-fit:cover; border-radius:10px;">
                    <div class="product-info">
                        <h3 class="product-name" style="font-size:0.9rem; margin:8px 0;">${p.name}</h3>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="price">π ${p.price}</span>
                            <button class="btn-buy-now" onclick="event.stopPropagation(); window.handlePayment(${p.price}, '${p.name}')">Beli</button>
                        </div>
                    </div>
                </div>`;
            grid.appendChild(card);
        });
    }

    // --- 5. PEMBAYARAN & SUCCESS OVERLAY ---
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
        // Menggunakan Flexbox untuk memastikan posisi tepat di tengah layar
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        
        const pesan = `Halo Admin, saya sudah bayar π ${amount} untuk ${name}.%0ATXID: ${txid}%0A%0AAlamat: ${userAddress.nama}, ${userAddress.telepon}, ${userAddress.alamatLengkap}`;
        
        overlay.innerHTML = `
            <div style="background:white; padding:30px; border-radius:25px; max-width:350px; width:100%; text-align:center; color:#333; box-shadow: 0 15px 35px rgba(0,0,0,0.3); animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                
                <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
                <h2 style="color:#27ae60; margin-top:0; font-family:sans-serif;">Berhasil!</h2>
                
                <p style="font-size: 0.95rem; color:#666; line-height:1.5; margin-bottom:25px;">
                    Pembayaran Anda telah diterima. Klik tombol di bawah untuk kirim bukti & alamat ke WhatsApp Admin.
                </p>
                
                <a href="https://wa.me/${ADMIN_WA}?text=${pesan}" target="_blank" 
                   style="display:block; background:#25D366; color:white; text-decoration:none; padding:15px; border-radius:12px; font-weight:bold; font-size:1.1rem; margin-bottom:15px; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);">
                   Kirim Ke WhatsApp
                </a>
                
                <button onclick="location.reload()" 
                        style="background:none; border:none; color:#999; font-size:0.9rem; cursor:pointer; text-decoration:underline;">
                        Tutup
                </button>
            </div>
            <style>
                @keyframes popIn { 
                    from { opacity: 0; transform: scale(0.8); } 
                    to { opacity: 1; transform: scale(1); } 
                }
            </style>`;
        document.body.appendChild(overlay);
    }

    // --- 6. AUTH, KERANJANG, NAVIGASI ---
    window.handleAuth = async () => {
        const btn = document.getElementById('login-btn');
        if (currentUser) { currentUser = null; btn.innerText = "Login"; return; }
        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (p) => handleIncompletePayment(p));
            currentUser = auth.user;
            btn.innerText = "Logout";
            document.getElementById('profile-username').innerText = currentUser.username;
        } catch (e) { alert("Gagal Login."); }
    };

    window.addToCart = (id) => {
        const p = productsData.find(x => x.id === id);
        if(p) { cart.push(p); alert("Ditambah!"); updateCartUI(); }
    };

    function updateCartUI() {
        const grid = document.getElementById('cart-items');
        if (!grid) return;
        if (cart.length === 0) { grid.innerHTML = "<p>Kosong</p>"; return; }
        const total = cart.reduce((s, i) => s + i.price, 0).toFixed(4);
        grid.innerHTML = `
            <button onclick="window.showAddressForm()" style="width:100%; background:#3498db; color:white; border:none; padding:10px; border-radius:8px; margin-bottom:10px;">📍 Alamat Pengiriman</button>
            ${cart.map((i, idx) => `<div style="display:flex; padding:10px; background:white; margin-bottom:5px; border-radius:10px;">${i.name} - π ${i.price}</div>`).join('')}
            <div style="padding:15px; text-align:center;">
                <b>Total: π ${total}</b><br><br>
                <button class="btn-buy-now" style="width:100%;" onclick="window.handlePayment(${total}, 'Total Keranjang')">Checkout</button>
            </div>`;
    }

    window.switchPage = (pageId) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => document.getElementById(p).classList.add('hidden'));
        document.getElementById(`page-${pageId}`).classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`).classList.add('active');
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
    };

    // --- 7. DETAIL PRODUK (VERSI REVISI FINAL) ---
    window.openProductDetail = (productId) => {
        const p = productsData.find(x => x.id === productId);
        if (!p) return;
        
        // Data pendukung ulasan
        const rating = "4.8/5.0";
        const terjual = "500+ Terjual";
        const ulasan = [
            { user: "User123", teks: "Produk berkualitas! Pengiriman sangat cepat." },
            { user: "PiLover", teks: "Suka sekali! Sesuai deskripsi." }
        ];

        document.getElementById('detail-content').innerHTML = `
            <img src="${p.images[0]}" style="width:100%; height:300px; object-fit:cover;">
            <div style="padding:20px;">
                <p style="color:var(--pi-color); font-weight:bold; font-size:0.8rem;">${p.category}</p>
                <h2 style="margin:5px 0; font-size:1.4rem;">${p.name}</h2>
                <div class="price" style="font-size:1.8rem; margin-bottom:10px; font-weight:800;">π ${p.price}</div>
                
                <p style="color:#666; line-height:1.6; margin-bottom:20px; font-size:0.95rem;">${p.desc}</p>
                
                <button class="btn-buy-now" style="width:100%; padding:15px; font-size:1rem; margin-bottom:10px;" 
                        onclick="window.handlePayment(${p.price}, '${p.name}')">Beli Sekarang</button>
                
                <button style="width:100%; padding:15px; background:#f39c12; color:white; border:none; border-radius:8px; font-size:1rem; font-weight:bold; cursor:pointer;" 
                        onclick="window.addToCart('${p.id}')">Tambah ke Keranjang</button>

                <hr style="margin:25px 0; border:0; border-top:1px solid #eee;">

                <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px; background:#f9f9f9; padding:12px; border-radius:10px;">
                    <div>
                        <span style="color:#f1c40f; font-size:1.1rem;">★</span> 
                        <span style="font-weight:bold; font-size:0.95rem;">${rating}</span>
                    </div>
                    <div style="color:#888; border-left:1px solid #ddd; padding-left:15px; font-size:0.9rem;">
                        ${terjual}
                    </div>
                </div>

                <h4 style="margin-bottom:15px; font-size:1rem;">Ulasan Pembeli:</h4>
                <div id="ulasan-container">
                    ${ulasan.map(u => `
                        <div style="background:#fff; border:1px solid #eee; padding:12px; border-radius:8px; margin-bottom:10px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                            <p style="margin:0; font-size:0.8rem; font-weight:bold; color:var(--pi-color);">${u.user}</p>
                            <p style="margin:5px 0 0; font-size:0.85rem; color:#444;">"${u.teks}"</p>
                        </div>
                    `).join('')}
                </div>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    // --- 8. FUNGSI FILTER ---
    window.filterCategory = (category) => {
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

    async function handleIncompletePayment(p) {
        await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId: p.identifier, txid: p.transaction.txid}) });
    }

    // --- BANNER ---
    const banners = ["https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", "https://i.ibb.co.com/LXmKBMst/ORANG-PERTAMA-20260202-161721-0000.png"];
    let idx = 0;
    setInterval(() => { 
        const img = document.getElementById('banner-img');
        if(img) { idx = (idx + 1) % banners.length; img.src = banners[idx]; }
    }, 4000);

    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = window.handleAuth;
});
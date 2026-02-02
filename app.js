document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    // Objek untuk menyimpan data alamat pembeli
    let userAddress = {
        nama: "",
        telepon: "",
        alamatLengkap: ""
    };

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
            console.log("Pi SDK Berhasil diinisialisasi");
        } catch (e) { console.error("Gagal inisialisasi SDK:", e); }
    }

    // --- 3. FORM ALAMAT PENGIRIMAN ---
    window.showAddressForm = () => {
        const overlay = document.createElement('div');
        overlay.id = "address-overlay";
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; font-family:sans-serif;";
        
        overlay.innerHTML = `
            <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:400px; text-align:left; color:#333;">
                <h3 style="margin-top:0; color:#6748d7;">Informasi Pengiriman</h3>
                <p style="font-size:0.8rem; color:#666; margin-bottom:15px;">Mohon lengkapi data untuk pengiriman barang.</p>
                
                <label style="font-size:0.8rem; font-weight:bold;">Nama Penerima</label>
                <input type="text" id="ship-name" style="width:100%; padding:10px; margin:5px 0 12px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" placeholder="Nama Lengkap" value="${userAddress.nama}">
                
                <label style="font-size:0.8rem; font-weight:bold;">Nomor HP (WhatsApp)</label>
                <input type="number" id="ship-phone" style="width:100%; padding:10px; margin:5px 0 12px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" placeholder="Contoh: 0812..." value="${userAddress.telepon}">
                
                <label style="font-size:0.8rem; font-weight:bold;">Alamat Lengkap</label>
                <textarea id="ship-address" style="width:100%; padding:10px; margin:5px 0 15px; border:1px solid #ddd; border-radius:8px; height:80px; box-sizing:border-box;" placeholder="Jalan, No Rumah, Kec, Kota/Kab, Kode Pos">${userAddress.alamatLengkap}</textarea>
                
                <button onclick="saveAddressData()" style="width:100%; background:#6748d7; color:white; border:none; padding:15px; border-radius:10px; font-weight:bold; cursor:pointer;">Simpan Data Alamat</button>
                <button onclick="document.getElementById('address-overlay').remove()" style="width:100%; background:none; border:none; color:#999; margin-top:10px; cursor:pointer; font-size:0.8rem;">Batal</button>
            </div>
        `;
        document.body.appendChild(overlay);
    };

    window.saveAddressData = () => {
        const n = document.getElementById('ship-name').value;
        const t = document.getElementById('ship-phone').value;
        const a = document.getElementById('ship-address').value;

        if(!n || !t || !a) return alert("Mohon lengkapi semua kolom!");
        
        userAddress = { nama: n, telepon: t, alamatLengkap: a };
        document.getElementById('address-overlay').remove();
        alert("Alamat berhasil disimpan!");
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

    // --- 5. PEMBAYARAN ---
    window.handlePayment = async (amount, name) => {
        if (!currentUser) return alert("Silakan Login terlebih dahulu di menu Profil!");
        
        // Cek apakah alamat sudah diisi
        if (!userAddress.nama || !userAddress.alamatLengkap) {
            alert("Anda belum mengisi alamat pengiriman!");
            window.showAddressForm();
            return;
        }

        try {
            await Pi.createPayment({
                amount: parseFloat(amount),
                memo: `Pembelian ${name} - Digital Pro Indo`,
                metadata: { productName: name },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    const res = await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    const res = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    
                    if (res.ok) {
                        showSuccessOverlay(amount, name, txid);
                        if(name === 'Total Keranjang') { cart = []; updateCartUI(); }
                    }
                },
                onCancel: (paymentId) => console.log("Pembayaran dibatalkan"),
                onError: (error, payment) => {
                    if (payment) handleIncompletePayment(payment);
                    alert("Terjadi kesalahan saat pembayaran.");
                }
            });
        } catch (err) { console.error(err); }
    };

    function showSuccessOverlay(amount, name, txid) {
        const overlay = document.createElement('div');
        overlay.id = "success-overlay";
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:9999; display:flex; align-items:center; justify-content:center; padding:20px; text-align:center; color:white; font-family:sans-serif;";
        
        // Pesan WA Lengkap dengan Data Pengiriman
        const pesan = `Halo Admin, saya sudah bayar π ${amount} untuk ${name}.%0A%0ATXID: ${txid}%0A%0ADATA PENGIRIMAN:%0ANama: ${userAddress.nama}%0AHP: ${userAddress.telepon}%0AAlamat: ${userAddress.alamatLengkap}`;
        const waUrl = `https://wa.me/${ADMIN_WA}?text=${pesan}`;

        overlay.innerHTML = `
            <div style="background:white; color:#333; padding:30px; border-radius:20px; width:100%; max-width:400px;">
                <div style="font-size:50px; color:#27ae60; margin-bottom:15px;">✔</div>
                <h2 style="margin:0 0 10px;">Pembayaran Berhasil!</h2>
                <p style="font-size:0.9rem; color:#666; margin-bottom:25px;">Klik tombol di bawah untuk mengirim bukti bayar & alamat ke WhatsApp Admin.</p>
                <a href="${waUrl}" target="_blank" style="display:block; background:#25D366; color:white; text-decoration:none; padding:15px; border-radius:10px; font-weight:bold; font-size:1rem; margin-bottom:15px;">Kirim ke WhatsApp</a>
                <button onclick="document.getElementById('success-overlay').remove()" style="background:none; border:none; color:#999; font-size:0.8rem; cursor:pointer;">Kembali ke Aplikasi</button>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // --- 6. AUTH ---
    async function handleAuth() {
        const btn = document.getElementById('login-btn');
        if (currentUser) {
            if (confirm("Logout dari akun?")) {
                currentUser = null;
                btn.innerText = "Login";
                document.getElementById('profile-username').innerText = "Belum Login";
                alert("Logout berhasil.");
            }
            return;
        }
        btn.innerText = "Loading...";
        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            currentUser = auth.user;
            btn.innerText = "Logout";
            document.getElementById('profile-username').innerText = currentUser.username;
            alert("Selamat datang, " + currentUser.username + "!");
        } catch (err) {
            btn.innerText = "Login";
            alert("Gagal Login.");
        }
    }

    // --- 7. KERANJANG ---
    window.addToCart = (productId) => {
        const product = productsData.find(p => p.id === productId);
        if (product) { 
            cart.push(product); 
            alert(`${product.name} ditambah!`); 
            updateCartUI(); 
        }
    };

    function updateCartUI() {
        const cartGrid = document.getElementById('cart-items');
        if (!cartGrid) return;
        if (cart.length === 0) { 
            cartGrid.innerHTML = "<p style='text-align:center; padding:40px; color:gray;'>Keranjang Kosong.</p>"; 
            return; 
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(4);
        let html = `<div style="padding:10px;">`;
        
        // Tombol Alamat di Keranjang
        html += `<button onclick="window.showAddressForm()" style="width:100%; background:#3498db; color:white; border:none; padding:12px; border-radius:10px; margin-bottom:15px; font-weight:bold; cursor:pointer;">📍 ${userAddress.nama ? 'Ubah Alamat Kirim' : 'Isi Alamat Pengiriman'}</button>`;

        html += cart.map((item, index) => `
            <div style="display:flex; align-items:center; gap:12px; background:white; padding:12px; border-radius:12px; margin-bottom:10px; box-shadow:0 2px 5px rgba(0,0,0,0.05);">
                <img src="${item.images[0]}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
                <div style="flex-grow:1;">
                    <h4 style="margin:0; font-size:0.85rem;">${item.name}</h4>
                    <span style="color:#6748d7; font-weight:bold;">π ${item.price}</span>
                </div>
                <button onclick="window.removeFromCart(${index})" style="background:#ff4757; color:white; border:none; padding:5px 10px; border-radius:5px;">Hapus</button>
            </div>`).join('');
        
        html += `
            <div style="margin-top:15px; padding:15px; background:#f8f9fa; border-radius:15px; text-align:center;">
                <div style="font-weight:bold; margin-bottom:10px;">Total: π ${total}</div>
                <button class="btn-buy-now" style="width:100%; padding:15px;" onclick="window.handlePayment(${total}, 'Total Keranjang')">Checkout Sekarang</button>
            </div></div>`;
        
        cartGrid.innerHTML = html;
    }

    window.removeFromCart = (index) => { cart.splice(index, 1); updateCartUI(); };

    // --- 8. NAVIGASI & DETAIL ---
    window.switchPage = (pageId) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => {
            const el = document.getElementById(p);
            if(el) el.classList.add('hidden');
        });
        const target = document.getElementById(`page-${pageId}`);
        if(target) target.classList.remove('hidden');
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
        if(pageId === 'keranjang') updateCartUI();
    };

    window.openProductDetail = (productId) => {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
        const detailContent = document.getElementById('detail-content');
        detailContent.innerHTML = `
            <img src="${product.images[0]}" style="width:100%; height:250px; object-fit:cover;">
            <div style="padding:20px;">
                <h2 style="margin:0;">${product.name}</h2>
                <div style="font-size:1.5rem; color:#6748d7; font-weight:800; margin:10px 0;">π ${product.price}</div>
                <p style="color:#666; font-size:0.9rem;">${product.desc}</p>
                <button class="btn-buy-now" style="width:100%; padding:15px; margin-top:10px;" onclick="window.handlePayment(${product.price}, '${product.name}')">Beli Sekarang</button>
                <button style="width:100%; padding:15px; background:#f39c12; color:white; border:none; border-radius:8px; margin-top:10px; font-weight:bold;" onclick="window.addToCart('${product.id}')">Tambah Keranjang</button>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    async function handleIncompletePayment(payment) {
        await fetch('/api/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
        });
    }

    // --- 9. BANNER ---
    const banners = [
        "https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", 
        "https://i.ibb.co.com/LXmKBMst/ORANG-PERTAMA-20260202-161721-0000.png"
    ];
    let currentBannerIndex = 0;
    const bannerImg = document.getElementById('banner-img');

    function startBannerSlider() {
        if (bannerImg) {
            setInterval(() => {
                currentBannerIndex = (currentBannerIndex + 1) % banners.length;
                bannerImg.src = banners[currentBannerIndex];
            }, 4000);
        }
    }

    await initPi();
    renderProducts(productsData, 'main-grid');
    startBannerSlider(); 
    const loginBtn = document.getElementById('login-btn');
    if(loginBtn) loginBtn.onclick = handleAuth;
});
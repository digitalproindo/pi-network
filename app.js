const ADMIN_WHATSAPP = "https://wa.me/6282191851112"; // GANTI NOMOR WA ANDA DI SINI

document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];

    // --- 1. DATA PRODUK (LENGKAP) ---
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

    // --- 3. RENDER BERANDA ---
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

    // --- 4. PEMBAYARAN & AUTH ---
    window.handlePayment = async (amount, name) => {
        if (!currentUser) return alert("Silakan Login terlebih dahulu di menu Profil!");

        // AMBIL ALAMAT DARI INPUT
        const address = document.getElementById('shipping-address') ? document.getElementById('shipping-address').value : "Alamat dari Detail Produk";
        if (!address || address.length < 5) return alert("Mohon isi alamat kirim terlebih dahulu!");

        try {
            const paymentAmount = parseFloat(amount);
            await Pi.createPayment({
                amount: paymentAmount,
                memo: `Pembelian ${name} - Digital Pro Indo`,
                metadata: { productName: name, address: address },
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
                        // REDIRECT KE WHATSAPP SETELAH SUKSES
                        const text = `Halo Admin, saya sudah membayar π ${amount} untuk ${name}.\n\nAlamat Kirim: ${address}\nTXID: ${txid}`;
                        window.location.href = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(text)}`;
                        
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

    async function handleAuth() {
        const btn = document.getElementById('login-btn');
        if (currentUser) {
            if (confirm("Logout dari akun?")) {
                currentUser = null;
                btn.innerText = "Login";
                btn.classList.remove('btn-logout-style');
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
            btn.classList.add('btn-logout-style');
            document.getElementById('profile-username').innerText = currentUser.username;
            alert("Selamat datang, " + currentUser.username + "!");
        } catch (err) {
            btn.innerText = "Login";
            alert("Gagal Login. Pastikan Anda di Pi Browser.");
        }
    }

    // --- 5. LOGIKA KERANJANG ---
    window.addToCart = (productId) => {
        const product = productsData.find(p => p.id === productId);
        if (product) { 
            cart.push(product); 
            alert(`${product.name} ditambah ke keranjang!`); 
            updateCartUI(); 
        }
    };

    function updateCartUI() {
        const cartGrid = document.getElementById('cart-items');
        if (!cartGrid) return;
        if (cart.length === 0) { 
            cartGrid.innerHTML = "<p style='text-align:center; padding:40px; color:gray;'>Keranjang Anda kosong.</p>"; 
            return; 
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(4);
        
        let html = `<div style="display:flex; flex-direction:column; gap:12px; padding:10px;">`;
        html += cart.map((item, index) => `
            <div style="display:flex; align-items:center; gap:12px; background:white; padding:12px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                <img src="${item.images[0]}" style="width:65px; height:65px; border-radius:8px; object-fit:cover;">
                <div style="flex-grow:1;">
                    <h4 style="margin:0; font-size:0.9rem;">${item.name}</h4>
                    <span style="color:var(--pi-color); font-weight:bold;">π ${item.price}</span>
                </div>
                <button onclick="window.removeFromCart(${index})" style="background:#ff4757; color:white; border:none; padding:8px 12px; border-radius:6px; font-size:0.75rem;">Hapus</button>
            </div>`).join('');
        
        // INPUT ALAMAT DISISIPKAN DI SINI
        html += `
            <div style="margin-top:20px; padding:20px; background:#f8f9fa; border-radius:15px; border:1px solid #eee; text-align:center;">
                <textarea id="shipping-address" placeholder="Tulis Alamat Kirim Lengkap..." style="width:100%; height:70px; margin-bottom:15px; padding:10px; border-radius:8px; border:1px solid #ccc;"></textarea>
                <div style="font-size:1.1rem; font-weight:bold; margin-bottom:15px; display:flex; justify-content:space-between;">
                    <span>Total:</span>
                    <span style="color:var(--pi-color);">π ${total}</span>
                </div>
                <button class="btn-buy-now" style="width:100%; padding:16px; font-size:1rem;" onclick="window.handlePayment(${total}, 'Total Keranjang')">Beli Sekarang (Checkout)</button>
            </div></div>`;
        
        cartGrid.innerHTML = html;
    }

    window.removeFromCart = (index) => { cart.splice(index, 1); updateCartUI(); };

    // --- 6. NAVIGASI, DETAIL & FILTER ---
    window.switchPage = (pageId) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => {
            const el = document.getElementById(p);
            if(el) el.classList.add('hidden');
        });
        const target = document.getElementById(`page-${pageId}`);
        if(target) target.classList.remove('hidden');
        
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const nav = document.getElementById(`nav-${pageId}`);
        if(nav) nav.classList.add('active');
        
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
        if(pageId === 'keranjang') updateCartUI();
    };

    window.openProductDetail = (productId) => {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
        const detailContent = document.getElementById('detail-content');
        
        const rating = "4.8/5.0";
        const terjual = "500+ Terjual";
        const ulasan = [
            { user: "User123", teks: "Produk berkualitas! Pengiriman sangat cepat." },
            { user: "PiLover", teks: "Suka sekali! Rasa enak dan segar sesuai deskripsi." }
        ];

        detailContent.innerHTML = `
            <img src="${product.images[0]}" style="width:100%; height:300px; object-fit:cover;">
            <div style="padding:20px;">
                <p style="color:var(--pi-color); font-weight:bold; font-size:0.8rem;">${product.category}</p>
                <h2 style="margin:5px 0; font-size:1.4rem;">${product.name}</h2>
                <div class="price" style="font-size:1.8rem; margin-bottom:10px; font-weight:800;">π ${product.price}</div>
                <p style="color:#666; line-height:1.6; margin-bottom:20px; font-size:0.95rem;">${product.desc}</p>
                
                <textarea id="shipping-address" placeholder="Isi alamat di sini jika ingin Beli Langsung..." style="width:100%; height:60px; margin-bottom:10px; padding:10px; border-radius:8px; border:1px solid #ccc;"></textarea>

                <button class="btn-buy-now" style="width:100%; padding:15px; font-size:1rem; margin-bottom:10px;" 
                        onclick="window.handlePayment(${product.price}, '${product.name}')">Beli Sekarang</button>
                
                <button style="width:100%; padding:15px; background:#f39c12; color:white; border:none; border-radius:8px; font-size:1rem; font-weight:bold; cursor:pointer;" 
                        onclick="window.addToCart('${product.id}')">Tambah ke Keranjang</button>

                <hr style="margin:25px 0; border:0; border-top:1px solid #eee;">
                <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px; background:#f9f9f9; padding:12px; border-radius:10px;">
                    <div><span style="color:#f1c40f; font-size:1.1rem;">★</span> <span style="font-weight:bold; font-size:0.95rem;">${rating}</span></div>
                    <div style="color:#888; border-left:1px solid #ddd; padding-left:15px; font-size:0.9rem;">${terjual}</div>
                </div>
                <h4 style="margin-bottom:15px; font-size:1rem;">Ulasan Pembeli:</h4>
                <div id="ulasan-container">${ulasan.map(u => `
                    <div style="background:#fff; border:1px solid #eee; padding:12px; border-radius:8px; margin-bottom:10px;">
                        <p style="margin:0; font-size:0.8rem; font-weight:bold; color:var(--pi-color);">${u.user}</p>
                        <p style="margin:5px 0 0; font-size:0.85rem; color:#444;">"${u.teks}"</p>
                    </div>`).join('')}
                </div>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    window.filterCategory = (category) => {
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
            if(pill.innerText.includes(category) || (category === 'all' && pill.innerText === 'Semua')) pill.classList.add('active');
        });
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

    async function handleIncompletePayment(payment) {
        await fetch('/api/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
        });
    }

    // --- 7. LOGIKA AUTO-SLIDER BANNER ---
    const banners = [
        "https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", 
        "https://i.ibb.co.com/LXmKBMst/ORANG-PERTAMA-20260202-161721-0000.png"
    ];
    let currentBannerIndex = 0;
    const bannerImg = document.getElementById('banner-img');

    function startBannerSlider() {
        if (bannerImg) {
            setInterval(() => {
                bannerImg.style.opacity = 0.4;
                setTimeout(() => {
                    currentBannerIndex = (currentBannerIndex + 1) % banners.length;
                    bannerImg.src = banners[currentBannerIndex];
                    bannerImg.style.opacity = 1;
                }, 400);
            }, 4000);
        }
    }

    // --- STARTUP ---
    await initPi();
    renderProducts(productsData, 'main-grid');
    startBannerSlider();
    const loginBtn = document.getElementById('login-btn');
    if(loginBtn) loginBtn.onclick = handleAuth;
});
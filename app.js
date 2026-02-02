// ==========================================
// KONFIGURASI ADMIN (GANTI NOMOR WA DI SINI)
// ==========================================
const ADMIN_WHATSAPP = "6282191851112"; // Gunakan format 62 tanpa tanda +

document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];

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
        { id: 'hb4', name: "Ekstrak Kurma Pro - Booster Energi", price: 0.004, category: "Herbal", images: ["https://i.ibb.co.com/C5dj5y6j/IMG-20251130-WA0028.jpg"], desc: "Sari kurma pekat untuk meningkatkan stamina." },
        { id: 'v1', name: "Sedan Sport Luxury - Tipe S1", price: 5.5, category: "Mobil", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof." },
        { id: 'm1', name: "Motor Sport 250cc - Black Matte", price: 1.2, category: "Motor", images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"], desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern." }
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
                            <button class="btn-buy-now" onclick="event.stopPropagation(); window.openProductDetail('${p.id}')">Lihat</button>
                        </div>
                    </div>
                </div>`;
            grid.appendChild(card);
        });
    }

    // --- 4. PEMBAYARAN & AUTH ---
    window.handlePayment = async (amount, name, customAddress = null) => {
        if (!currentUser) return alert("Silakan Login terlebih dahulu di menu Profil!");
        
        // Cek Alamat
        const address = customAddress || "Pembelian Langsung (Tanpa Alamat Keranjang)";
        
        try {
            const paymentAmount = parseFloat(amount);
            await Pi.createPayment({
                amount: paymentAmount,
                memo: `Order ${name} - Digital Pro Indo`,
                metadata: { productName: name, shippingAddress: address },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    // Integrasi dengan backend Anda (Approve)
                    const res = await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    // Integrasi dengan backend Anda (Complete)
                    const res = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    
                    if (res.ok) {
                        // LOGIKA AUTO-WHATSAPP SETELAH SUKSES
                        const pesanWA = `Halo Admin Digital Pro Indo,\n\nSAYA SUDAH BAYAR:\n- Produk: ${name}\n- Total: π ${amount}\n- TXID: ${txid}\n\n*ALAMAT PENGIRIMAN:*\n${address}\n\nMohon segera diproses!`;
                        const linkWA = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(pesanWA)}`;
                        
                        alert("Pembayaran Berhasil! Klik OK untuk konfirmasi ke WhatsApp Admin.");
                        window.location.href = linkWA;

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

    // --- 5. LOGIKA KERANJANG & ALAMAT ---
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
        
        // Penambahan Form Alamat
        html += `
            <div style="margin-top:20px; padding:20px; background:#fff; border-radius:15px; border:1px solid #6d28d9; text-align:left;">
                <h4 style="margin:0 0 10px 0; color:#6d28d9;">Alamat Pengiriman:</h4>
                <textarea id="shipping-address" placeholder="Tulis Nama Penerima, No.HP, dan Alamat Lengkap..." 
                    style="width:100%; height:80px; padding:10px; border-radius:8px; border:1px solid #ddd; font-family:inherit; box-sizing:border-box;"></textarea>
                
                <div style="margin-top:15px; font-size:1.1rem; font-weight:bold; display:flex; justify-content:space-between;">
                    <span>Total:</span>
                    <span style="color:var(--pi-color);">π ${total}</span>
                </div>
                <button class="btn-buy-now" style="width:100%; padding:16px; font-size:1rem; margin-top:15px;" 
                    onclick="const addr = document.getElementById('shipping-address').value; 
                    if(!addr || addr.length < 10) return alert('Mohon isi alamat kirim dengan lengkap!'); 
                    window.handlePayment(${total}, 'Total Keranjang', addr)">Beli Sekarang (Checkout)</button>
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
        
        detailContent.innerHTML = `
            <img src="${product.images[0]}" style="width:100%; height:300px; object-fit:cover;">
            <div style="padding:20px;">
                <p style="color:var(--pi-color); font-weight:bold; font-size:0.8rem;">${product.category}</p>
                <h2 style="margin:5px 0; font-size:1.4rem;">${product.name}</h2>
                <div class="price" style="font-size:1.8rem; margin-bottom:10px; font-weight:800;">π ${product.price}</div>
                <p style="color:#666; line-height:1.6; margin-bottom:20px; font-size:0.95rem;">${product.desc}</p>
                
                <div style="background:#f9f9f9; padding:15px; border-radius:10px; margin-bottom:15px;">
                   <label style="font-weight:bold; font-size:0.8rem; color:#6d28d9;">Isi Alamat Kirim (Jika ingin Beli Langsung):</label>
                   <textarea id="direct-address" placeholder="Tulis Alamat Lengkap..." style="width:100%; height:60px; margin-top:8px; padding:10px; border-radius:5px; border:1px solid #ddd;"></textarea>
                </div>

                <button class="btn-buy-now" style="width:100%; padding:15px; font-size:1rem; margin-bottom:10px;" 
                        onclick="const addr = document.getElementById('direct-address').value; 
                        if(!addr || addr.length < 10) return alert('Mohon isi alamat kirim di kolom yang tersedia!');
                        window.handlePayment(${product.price}, '${product.name}', addr)">Beli Sekarang</button>
                
                <button style="width:100%; padding:15px; background:#f39c12; color:white; border:none; border-radius:8px; font-size:1rem; font-weight:bold; cursor:pointer;" 
                        onclick="window.addToCart('${product.id}')">Tambah ke Keranjang</button>
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

    // --- 7. AUTO-SLIDER BANNER (PERTAHANKAN HASIL) ---
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
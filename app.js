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
        { id: 'p1', name: "Mastering Pi Network 2026", price: 0.005, category: "E-Book", images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=500"], desc: "Panduan optimasi node dan ekosistem Pi terbaru." },
        { id: 'p2', name: "COCO Probiotik", price: 0.010, category: "Herbal", images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], desc: "Lisensi aset digital premium Digital Pro Indo." },
        { id: 'p3', name: "Smart Home System Pro", price: 0.500, category: "Rumah", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=500"], desc: "Paket instalasi smart home berbasis IoT." },
        { id: 'p4', name: "Premium Smartphone X", price: 1.200, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500"], desc: "Gadget premium dengan performa tinggi." },
        { id: 'p5', name: "Sofa Minimalis 2 Seater", price: 0.05, category: "Rumah", images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu kecil." },
        { id: 'p6', name: "Meja Makan Kayu Jati", price: 0.08, category: "Rumah", images: ["https://images.unsplash.com/photo-1577145946459-39a587ed522f?w=500&q=80"], desc: "Meja makan kokoh ukuran 120x60cm dengan finishing natural." },
        { id: 'p7', name: "Lampu Gantung Industrial", price: 0.015, category: "Rumah", images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"], desc: "Lampu dekoratif plafon, diameter 30cm untuk kesan estetik." },
        { id: 'p8', name: "Rak Buku Kayu 5 Tingkat", price: 0.03, category: "Rumah", images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"], desc: "Rak buku hemat ruang, tinggi 180cm lebar 40cm." },
        { id: 'p9', name: "Karpet Bulu Lembut 160x210", price: 0.012, category: "Rumah", images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"], desc: "Karpet lantai premium, sangat lembut dan mudah dibersihkan." },
        { id: 'p10', name: "Set Gorden Jendela", price: 0.008, category: "Rumah", images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"], desc: "Gorden blackout ukuran 140x220cm, tersedia berbagai warna." },
        { id: 'p11', name: "Jam Dinding Kayu", price: 0.005, category: "Rumah", images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"], desc: "Jam dinding estetik diameter 35cm, mesin sweep movement." },
        { id: 'p12', name: "Tanaman Hias Artificial", price: 0.01, category: "Rumah", images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"], desc: "Tanaman palsu mirip asli dengan pot keramik, tinggi 80cm." },
        { id: 'e1', name: "Smartphone Pi-Phone X", price: 0.15, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"], desc: "Layar AMOLED 6.7 inci, RAM 12GB, Baterai 5000mAh." },
        { id: 'hb4', name: "Ekstrak Kurma Pro", price: 0.004, category: "Herbal", images: ["https://i.ibb.co.com/C5dj5y6j/IMG-20251130-WA0028.jpg"], desc: "Sari kurma pekat untuk meningkatkan stamina." },
        { id: 'v1', name: "Sedan Sport Luxury", price: 5.5, category: "Mobil", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof." },
        { id: 'm1', name: "Motor Sport 250cc", price: 1.2, category: "Motor", images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"], desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern." }
    ];

    // --- 2. INISIALISASI ---
    async function initPi() {
        try {
            await Pi.init({ version: "2.0", sandbox: false });
        } catch (e) { console.error("Pi SDK Init Error:", e); }
    }

    // --- 3. ALAMAT ---
    window.showAddressForm = () => {
        const overlay = document.createElement('div');
        overlay.id = "address-overlay";
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        overlay.innerHTML = `
            <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:350px; color:#333; box-shadow: 0 10px 25px rgba(0,0,0,0.2); position:relative;">
                <div onclick="document.getElementById('address-overlay').remove()" style="position:absolute; top:15px; right:15px; width:30px; height:30px; background:#f2f2f2; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">✕</div>
                <h3 style="margin-top:0; text-align:center;">Alamat Pengiriman</h3>
                <input type="text" id="ship-name" style="width:100%; padding:12px; margin-top:10px; border:1px solid #ddd; border-radius:8px;" placeholder="Nama Penerima" value="${userAddress.nama}">
                <input type="number" id="ship-phone" style="width:100%; padding:12px; margin-top:10px; border:1px solid #ddd; border-radius:8px;" placeholder="No HP" value="${userAddress.telepon}">
                <textarea id="ship-address" style="width:100%; padding:12px; margin-top:10px; border:1px solid #ddd; border-radius:8px; height:80px;" placeholder="Alamat Lengkap">${userAddress.alamatLengkap}</textarea>
                <button onclick="saveAddress()" style="width:100%; background:#6748d7; color:white; border:none; padding:14px; border-radius:10px; font-weight:bold; margin-top:15px; cursor:pointer;">Simpan Alamat</button>
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

    // --- 4. RENDER BERANDA ---
    function renderProducts(data, targetGridId) {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";
        data.forEach(p => {
            const disc = Math.floor(Math.random() * 10) + 5;
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="discount-badge">-${disc}%</div>
                <div class="image-container" onclick="openProductDetail('${p.id}')">
                    <img src="${p.images[0]}" alt="${p.name}">
                    <div class="xtra-label">XTRA Gratis Ongkir+</div>
                </div>
                <div class="product-info">
                    <h3 class="product-name" onclick="openProductDetail('${p.id}')">${p.name}</h3>
                    <div class="price">π ${p.price}</div>
                    <div class="free-ship-tag">🚚 Gratis ongkir</div>
                    <div class="card-bottom">
                        <div class="rating-text"><span class="star">★</span> 4.9 | 1rb+ terjual</div>
                        <button class="btn-buy-now" onclick="event.stopPropagation(); window.handlePayment(${p.price}, '${p.name}')">Beli</button>
                    </div>
                </div>`;
            grid.appendChild(card);
        });
    }

    // --- 5. AUTH (FUNGSI LOGIN) ---
    window.handleAuth = async () => {
        const btn = document.getElementById('login-btn');
        if (currentUser) {
            currentUser = null;
            btn.innerText = "Login";
            document.getElementById('profile-username').innerText = "User";
            document.getElementById('profile-address').innerText = "Belum Terhubung";
            alert("Berhasil Logout");
            return;
        }
        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (p) => handleIncompletePayment(p));
            currentUser = auth.user;
            btn.innerText = "Logout";
            document.getElementById('profile-username').innerText = currentUser.username;
            document.getElementById('profile-address').innerText = currentUser.uid || "Connected";
            alert("Halo, " + currentUser.username);
        } catch (e) {
            console.error(e);
            alert("Login Gagal. Pastikan Anda membuka di Pi Browser.");
        }
    };

    // --- 6. PEMBAYARAN ---
    window.handlePayment = async (amount, name) => {
        if (!currentUser) { alert("Silakan Login terlebih dahulu!"); return; }
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
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px;";
        const pesan = `Halo Admin, saya sudah bayar π ${amount} untuk ${name}.%0ATXID: ${txid}%0A%0AAlamat: ${userAddress.nama}, ${userAddress.telepon}, ${userAddress.alamatLengkap}`;
        overlay.innerHTML = `
            <div style="background:white; padding:30px; border-radius:25px; max-width:350px; text-align:center;">
                <h2 style="color:#27ae60;">Berhasil!</h2>
                <a href="https://wa.me/${ADMIN_WA}?text=${pesan}" target="_blank" style="display:block; background:#25D366; color:white; padding:15px; border-radius:12px; font-weight:bold; text-decoration:none;">Kirim Ke WhatsApp</a>
                <button onclick="location.reload()" style="margin-top:15px; background:none; border:none; color:#999; cursor:pointer;">Tutup</button>
            </div>`;
        document.body.appendChild(overlay);
    }

    // --- 7. NAVIGASI & KERANJANG ---
    window.switchPage = (pageId) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => document.getElementById(p).classList.add('hidden'));
        document.getElementById(`page-${pageId}`).classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`).classList.add('active');
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
    };

    window.addToCart = (id) => {
        const p = productsData.find(x => x.id === id);
        if(p) { cart.push(p); alert("Ditambahkan!"); updateCartUI(); }
    };

    function updateCartUI() {
        const grid = document.getElementById('cart-items');
        if (!grid) return;
        if (cart.length === 0) { grid.innerHTML = "<p style='text-align:center;'>Kosong</p>"; return; }
        const total = cart.reduce((s, i) => s + i.price, 0).toFixed(4);
        grid.innerHTML = `
            <div style="padding:15px;">
                ${cart.map(i => `<div style="padding:10px; background:white; margin-bottom:5px; border-radius:8px;">${i.name} - π ${i.price}</div>`).join('')}
                <div style="text-align:center; margin-top:15px;">
                    <b>Total: π ${total}</b><br><br>
                    <button class="btn-buy-now" style="width:100%;" onclick="window.handlePayment(${total}, 'Total Keranjang')">Checkout</button>
                </div>
            </div>`;
    }

    window.openProductDetail = (productId) => {
        const p = productsData.find(x => x.id === productId);
        if (!p) return;
        document.getElementById('detail-content').innerHTML = `
            <img src="${p.images[0]}" style="width:100%; height:300px; object-fit:contain; background:#fff;">
            <div style="padding:20px;">
                <h2>${p.name}</h2>
                <div class="price" style="font-size:1.8rem; color:#a82444;">π ${p.price}</div>
                <p style="color:#666; line-height:1.6;">${p.desc}</p>
                <button class="btn-buy-now" style="width:100%; padding:15px;" onclick="window.handlePayment(${p.price}, '${p.name}')">Beli Sekarang</button>
                <button style="width:100%; padding:15px; margin-top:10px; background:#f39c12; color:white; border:none; border-radius:8px; font-weight:bold;" onclick="window.addToCart('${p.id}')">Tambah ke Keranjang</button>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    window.filterCategory = (category) => {
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

    async function handleIncompletePayment(p) {
        await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId: p.identifier, txid: p.transaction.txid}) });
    }

    // --- BANNER SLIDER ---
    const banners = ["https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", "https://i.ibb.co.com/LXmKBMst/ORANG-PERTAMA-20260202-161721-0000.png"];
    let bannerIdx = 0;
    setInterval(() => { 
        const img = document.getElementById('banner-img');
        if(img) { bannerIdx = (bannerIdx + 1) % banners.length; img.src = banners[bannerIdx]; }
    }, 4000);

    // --- INITIALIZATION ---
    await initPi();
    renderProducts(productsData, 'main-grid');

    // Pastikan tombol login terhubung ke fungsi handleAuth
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', window.handleAuth);
    }
});
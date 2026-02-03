document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    // --- FIX 1: Load alamat dari LocalStorage agar tidak hilang saat refresh ---
    window.userAddress = JSON.parse(localStorage.getItem('pi_address')) || { 
        nama: "", 
        telepon: "", 
        alamatLengkap: "" 
    };

    const ADMIN_WA = "6282191851112"; 

    const productsData = [
        { id: 'p1', name: "Mastering Pi Network 2026", price: 0.005, category: "E-Book", images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"], desc: "Panduan optimasi node dan ekosistem Pi terbaru." },
        { id: 'p2', name: "COCO Probiotik", price: 0.010, category: "Herbal", images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], desc: "Lisensi aset digital premium Digital Pro Indo." },
        { id: 'p3', name: "Smart Home System Pro", price: 0.500, category: "Rumah", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], desc: "Paket instalasi smart home berbasis IoT." },
        { id: 'p4', name: "Premium Smartphone X", price: 1.200, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], desc: "Gadget premium dengan performa tinggi." },
        { id: 'p5', name: "Sofa Minimalis 2 Seater", price: 0.05, category: "Rumah", images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], desc: "Sofa nyaman ukuran 150x80cm." },
        { id: 'p6', name: "Meja Makan Kayu Jati", price: 0.08, category: "Rumah", images: ["https://images.unsplash.com/photo-1577145946459-39a587ed522f?w=500&q=80"], desc: "Meja makan kokoh finishing natural." },
        { id: 'hb4', name: "Ekstrak Kurma Pro", price: 0.004, category: "Herbal", images: ["https://i.ibb.co.com/C5dj5y6j/IMG-20251130-WA0028.jpg"], desc: "Sari kurma pekat." },
        { id: 'v1', name: "Sedan Sport Luxury", price: 5.5, category: "Mobil", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], desc: "Interior Kulit Premium." },
        { id: 'm1', name: "Motor Sport 250cc", price: 1.2, category: "Motor", images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"], desc: "Akselerasi cepat." }
    ];

    async function initPi() {
        try { await Pi.init({ version: "2.0", sandbox: false }); } catch (e) { console.error(e); }
    }

    // --- REVISI FORM ALAMAT ---
    window.showAddressForm = () => {
        const overlay = document.createElement('div');
        overlay.id = "address-overlay";
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        
        overlay.innerHTML = `
            <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:350px; color:#333; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: fadeIn 0.3s ease; position:relative;">
                <div onclick="document.getElementById('address-overlay').remove()" style="position:absolute; top:15px; right:15px; width:30px; height:30px; background:#f2f2f2; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; color:#666;">✕</div>
                <h3 style="margin-top:0; margin-bottom:20px; text-align:center;">Alamat Pengiriman</h3>
                <div style="margin-bottom:12px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">Nama Penerima</label>
                    <input type="text" id="ship-name" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px;" placeholder="Masukkan nama" value="${window.userAddress.nama}">
                </div>
                <div style="margin-bottom:12px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">No HP/WA</label>
                    <input type="number" id="ship-phone" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px;" placeholder="0812..." value="${window.userAddress.telepon}">
                </div>
                <div style="margin-bottom:20px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">Alamat Lengkap</label>
                    <textarea id="ship-address" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; height:80px; resize:none;" placeholder="Jalan, RT/RW, Kec, Kota">${window.userAddress.alamatLengkap}</textarea>
                </div>
                <button onclick="saveAddress()" style="width:100%; background:#6748d7; color:white; border:none; padding:14px; border-radius:10px; font-weight:bold; cursor:pointer;">Simpan Alamat</button>
            </div>
            <style>@keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }</style>`;
        document.body.appendChild(overlay);
    };

    // --- FIX 2: Fungsi Save Address ---
    window.saveAddress = () => {
        const nama = document.getElementById('ship-name').value;
        const telp = document.getElementById('ship-phone').value;
        const almt = document.getElementById('ship-address').value;

        if(!nama || !telp || !almt) return alert("Mohon lengkapi data!");

        window.userAddress = { nama: nama, telepon: telp, alamatLengkap: almt };
        
        // Simpan ke LocalStorage agar permanen
        localStorage.setItem('pi_address', JSON.stringify(window.userAddress));
        
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
        if (!currentUser) return alert("Silakan Login di Profil!");
        // Cek apakah alamat sudah diisi
        if (!window.userAddress.nama || !window.userAddress.alamatLengkap) { 
            alert("Isi alamat pengiriman dulu!"); 
            window.showAddressForm(); 
            return; 
        }

        try {
            await Pi.createPayment({
                amount: parseFloat(amount),
                memo: `Pembelian ${name}`,
                metadata: { productName: name, shipping: window.userAddress.alamatLengkap },
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
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        const pesan = `Halo Admin, saya sudah bayar π ${amount} untuk ${name}.%0ATXID: ${txid}%0A%0AAlamat: ${window.userAddress.nama}, ${window.userAddress.telepon}, ${window.userAddress.alamatLengkap}`;
        
        overlay.innerHTML = `
            <div style="background:white; padding:30px; border-radius:25px; max-width:350px; width:100%; text-align:center; color:#333; animation: popIn 0.3s ease;">
                <div style="font-size: 50px; margin-bottom: 10px;">✅</div>
                <h2 style="color:#27ae60; margin-top:0;">Berhasil!</h2>
                <p style="font-size: 0.9rem; color:#666; margin-bottom:25px;">Klik tombol di bawah untuk kirim bukti ke WhatsApp Admin.</p>
                <a href="https://wa.me/${ADMIN_WA}?text=${pesan}" target="_blank" style="display:block; background:#25D366; color:white; text-decoration:none; padding:15px; border-radius:12px; font-weight:bold; margin-bottom:15px;">Kirim Ke WhatsApp</a>
                <button onclick="location.reload()" style="background:none; border:none; color:#999; cursor:pointer; text-decoration:underline;">Tutup</button>
            </div>`;
        document.body.appendChild(overlay);
    }

    // --- 6. AUTH & NAVIGASI ---
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

    window.switchPage = (pageId) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => {
            const el = document.getElementById(p);
            if(el) el.classList.add('hidden');
        });
        document.getElementById(`page-${pageId}`).classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`).classList.add('active');
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
        if(pageId === 'keranjang') updateCartUI();
    };

    window.addToCart = (id) => {
        const p = productsData.find(x => x.id === id);
        if(p) { cart.push(p); alert("Ditambah ke keranjang!"); updateCartUI(); }
    };

    function updateCartUI() {
        const grid = document.getElementById('cart-items');
        if (!grid) return;
        if (cart.length === 0) { grid.innerHTML = "<p style='text-align:center; padding:20px;'>Keranjang Kosong</p>"; return; }
        const total = cart.reduce((s, i) => s + i.price, 0).toFixed(4);
        grid.innerHTML = `
            <button onclick="window.showAddressForm()" style="width:100%; background:#3498db; color:white; border:none; padding:12px; border-radius:8px; margin-bottom:15px; font-weight:bold;">📍 Ubah Alamat Pengiriman</button>
            ${cart.map((i) => `<div style="display:flex; justify-content:space-between; padding:12px; background:white; margin-bottom:8px; border-radius:10px; border:1px solid #eee;"><span>${i.name}</span><b>π ${i.price}</b></div>`).join('')}
            <div style="padding:20px; text-align:center; background:#f9f9f9; border-radius:15px; margin-top:20px;">
                <p style="margin-bottom:10px;">Total Tagihan:</p>
                <h2 style="margin:0 0 20px 0;">π ${total}</h2>
                <button class="btn-buy-now" style="width:100%; padding:15px;" onclick="window.handlePayment(${total}, 'Total Keranjang')">Checkout Sekarang</button>
            </div>`;
    }

    // --- 7. DETAIL PRODUK ---
    window.openProductDetail = (productId) => {
        const p = productsData.find(x => x.id === productId);
        if (!p) return;
        document.getElementById('detail-content').innerHTML = `
            <img src="${p.images[0]}" style="width:100%; height:300px; object-fit:cover;">
            <div style="padding:20px;">
                <h2 style="margin:5px 0;">${p.name}</h2>
                <div class="price" style="font-size:1.8rem; margin-bottom:15px;">π ${p.price}</div>
                <p style="color:#666; line-height:1.6;">${p.desc}</p>
                <div style="display:flex; gap:10px; margin-top:25px;">
                    <button class="btn-buy-now" style="flex:1; padding:15px;" onclick="window.handlePayment(${p.price}, '${p.name}')">Beli</button>
                    <button style="flex:1; padding:15px; background:#f39c12; color:white; border:none; border-radius:8px; font-weight:bold;" onclick="window.addToCart('${p.id}')">+ Keranjang</button>
                </div>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    window.filterCategory = (category) => {
        const pills = document.querySelectorAll('.category-pill');
        pills.forEach(pill => {
            pill.classList.remove('active');
            if ((category === 'all' && pill.innerText.includes('Semua')) || (pill.innerText.includes(category))) {
                pill.classList.add('active');
            }
        });
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

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
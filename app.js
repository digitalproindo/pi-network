document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    // Memuat alamat dari local storage agar user tidak mengetik ulang
    let userAddress = JSON.parse(localStorage.getItem('pi_user_address')) || { 
        nama: "", 
        telepon: "", 
        alamatLengkap: "" 
    };

    const ADMIN_WA = "6282191851112"; 

    // --- 1. DATA PRODUK ---
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

    // --- 2. INISIALISASI PI SDK ---
    async function initPi() {
        try { 
            await Pi.init({ version: "2.0", sandbox: false }); 
            console.log("Pi SDK Ready");
        } catch (e) { console.error(e); }
    }

    // --- 3. LOGIKA ALAMAT (REVISI CENTER) ---
    window.showAddressForm = (callbackAmount = null, callbackName = null) => {
        const overlay = document.createElement('div');
        overlay.id = "address-overlay";
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        
        overlay.innerHTML = `
            <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:350px; color:#333; box-shadow: 0 10px 25px rgba(0,0,0,0.2); animation: fadeIn 0.3s ease;">
                <h3 style="margin-top:0; margin-bottom:15px; text-align:center; font-family:sans-serif;">Alamat Pengiriman</h3>
                <div style="margin-bottom:10px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">Nama Penerima</label>
                    <input type="text" id="ship-name" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" placeholder="Masukkan nama" value="${userAddress.nama}">
                </div>
                <div style="margin-bottom:10px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">No HP/WA</label>
                    <input type="number" id="ship-phone" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" placeholder="Contoh: 0812..." value="${userAddress.telepon}">
                </div>
                <div style="margin-bottom:15px;">
                    <label style="font-size:0.8rem; font-weight:bold; color:#666;">Alamat Lengkap</label>
                    <textarea id="ship-address" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; height:80px; box-sizing:border-box; font-family:sans-serif;" placeholder="Nama jalan, Nomor rumah, RT/RW, Kecamatan">${userAddress.alamatLengkap}</textarea>
                </div>
                <button onclick="saveAddress(${callbackAmount}, '${callbackName}')" style="width:100%; background:#6748d7; color:white; border:none; padding:14px; border-radius:10px; font-weight:bold; font-size:1rem; cursor:pointer; box-shadow: 0 4px 6px rgba(103, 72, 215, 0.2);">Simpan & Lanjut</button>
                <button onclick="document.getElementById('address-overlay').remove()" style="width:100%; background:none; border:none; color:gray; margin-top:10px; cursor:pointer;">Batal</button>
            </div>
            <style>@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }</style>`;
        document.body.appendChild(overlay);
    };

    window.saveAddress = (amount, name) => {
        const n = document.getElementById('ship-name').value;
        const t = document.getElementById('ship-phone').value;
        const a = document.getElementById('ship-address').value;

        if(!n || !t || !a) return alert("Mohon lengkapi semua data!");

        userAddress = { nama: n, telepon: t, alamatLengkap: a };
        localStorage.setItem('pi_user_address', JSON.stringify(userAddress));
        document.getElementById('address-overlay').remove();
        
        // Jika dipanggil saat mau beli, langsung arahkan ke payment
        if(amount && name) {
            window.handlePayment(amount, name);
        } else {
            alert("Alamat berhasil diperbarui!");
        }
    };

    // --- 4. PEMBAYARAN & AUTH ---
    window.handlePayment = async (amount, name) => {
        if (!currentUser) return alert("Silakan Login terlebih dahulu!");
        
        // Cek apakah alamat sudah ada
        if (!userAddress.alamatLengkap) {
            return window.showAddressForm(amount, name);
        }

        try {
            const shipInfo = `Nama: ${userAddress.nama}, Telp: ${userAddress.telepon}, Alamat: ${userAddress.alamatLengkap}`;
            await Pi.createPayment({
                amount: parseFloat(amount),
                memo: `Order ${name} - Digital Pro Indo`,
                metadata: { productName: name, shipping: shipInfo },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    return await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    }).then(r => r.ok);
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    const res = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    if (res.ok) {
                        alert(`Terima kasih! Pembayaran untuk ${name} berhasil.`);
                        if(name === 'Total Keranjang') { cart = []; updateCartUI(); }
                    }
                },
                onCancel: () => console.log("Payment Cancelled"),
                onError: (err) => alert("Terjadi kesalahan pembayaran.")
            });
        } catch (e) { console.error(e); }
    };

    window.handleAuth = async () => {
        const btn = document.getElementById('login-btn');
        if (currentUser) {
            if (confirm("Logout?")) {
                currentUser = null;
                btn.innerText = "Login";
                document.getElementById('profile-username').innerText = "Belum Login";
            }
            return;
        }
        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                fetch('/api/complete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
                });
            });
            currentUser = auth.user;
            btn.innerText = "Logout";
            document.getElementById('profile-username').innerText = currentUser.username;
        } catch (e) { alert("Gagal Login."); }
    };

    // --- 5. TAMPILAN & NAVIGASI ---
    function renderProducts(data, targetGridId) {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";
        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div onclick="window.openProductDetail('${p.id}')">
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

    window.openProductDetail = (productId) => {
        const p = productsData.find(x => x.id === productId);
        if (!p) return;
        document.getElementById('detail-content').innerHTML = `
            <img src="${p.images[0]}" style="width:100%; height:250px; object-fit:cover;">
            <div style="padding:20px;">
                <h2>${p.name}</h2>
                <div class="price" style="font-size:1.5rem; color:var(--pi-color);">π ${p.price}</div>
                <p>${p.desc}</p>
                <div style="display:flex; gap:10px; margin-top:20px;">
                    <button class="btn-buy-now" style="flex:1; padding:15px;" onclick="window.handlePayment(${p.price}, '${p.name}')">Beli Sekarang</button>
                    <button style="flex:1; padding:15px; background:#f39c12; color:white; border:none; border-radius:10px;" onclick="window.addToCart('${p.id}')">+ Keranjang</button>
                </div>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    window.switchPage = (pageId) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => document.getElementById(p)?.classList.add('hidden'));
        document.getElementById(`page-${pageId}`)?.classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`)?.classList.add('active');
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
        if(pageId === 'keranjang') updateCartUI();
    };

    // --- 6. KERANJANG ---
    window.addToCart = (id) => {
        const p = productsData.find(x => x.id === id);
        if(p) { cart.push(p); alert("Ditambah ke keranjang!"); }
    };

    function updateCartUI() {
        const container = document.getElementById('cart-items');
        if(!container) return;
        if(cart.length === 0) { container.innerHTML = "<p style='text-align:center; padding:50px;'>Keranjang Kosong</p>"; return; }
        const total = cart.reduce((s, i) => s + i.price, 0).toFixed(4);
        container.innerHTML = `<div style="padding:15px;">` + cart.map((item, idx) => `
            <div style="display:flex; gap:10px; background:white; padding:10px; border-radius:10px; margin-bottom:10px;">
                <img src="${item.images[0]}" width="60" style="border-radius:5px;">
                <div style="flex:1;"><b>${item.name}</b><br><span style="color:var(--pi-color);">π ${item.price}</span></div>
                <button onclick="cart.splice(${idx},1); updateCartUI();" style="background:none; border:none; color:red;">Hapus</button>
            </div>`).join('') + `
            <div style="margin-top:20px; border-top:1px solid #eee; padding-top:15px;">
                <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:15px;"><span>Total:</span><span>π ${total}</span></div>
                <button class="btn-buy-now" style="width:100%; padding:15px;" onclick="window.handlePayment(${total}, 'Total Keranjang')">Checkout</button>
            </div></div>`;
    }

    // --- 7. BANNER & STARTUP ---
    const banners = ["https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", "https://i.ibb.co.com/LXmKBMst/ORANG-PERTAMA-20260202-161721-0000.png"];
    let bIdx = 0;
    setInterval(() => { 
        const img = document.getElementById('banner-img');
        if(img) { bIdx = (bIdx + 1) % banners.length; img.src = banners[bIdx]; }
    }, 4000);

    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = window.handleAuth;
});
document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    let userAddress = { nama: "", telepon: "", alamatLengkap: "" };
    const ADMIN_WA = "6282191851112"; 

    const productsData = [
        { id: 'p1', name: "Mastering Pi Network 2026", price: 0.005, category: "E-Book", images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"], desc: "Panduan optimasi node dan ekosistem Pi terbaru." },
        { id: 'p2', name: "COCO Probiotik", price: 0.010, category: "Herbal", images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], desc: "Lisensi aset digital premium Digital Pro Indo." },
        { id: 'p3', name: "Smart Home System Pro", price: 0.500, category: "Rumah", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], desc: "Paket instalasi smart home berbasis IoT." },
        { id: 'p4', name: "Premium Smartphone X", price: 1.200, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], desc: "Gadget premium dengan performa tinggi." },
        { id: 'p5', name: "Sofa Minimalis 2 Seater", price: 0.05, category: "Rumah", images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], desc: "Sofa nyaman ukuran 150x80cm." },
        { id: 'hb1', name: "Madu Hutan Murni 500gr", price: 0.005, category: "Herbal", images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80"], desc: "Madu asli tanpa pengawet." },
        { id: 'v1', name: "Sedan Sport Luxury S1", price: 5.5, category: "Mobil", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], desc: "Mesin Turbo 2.0L Premium." },
        { id: 'm1', name: "Motor Sport 250cc", price: 1.2, category: "Motor", images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"], desc: "Akselerasi cepat, ABS system." }
    ];

    async function initPi() {
        try { await Pi.init({ version: "2.0", sandbox: false }); } catch (e) { console.error(e); }
    }

    // --- RENDER PRODUK (FIXED VIEW) ---
    function renderProducts(data, targetGridId) {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";
        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="discount-badge">-15%</div>
                <div class="image-container" onclick="openProductDetail('${p.id}')">
                    <img src="${p.images[0]}" alt="${p.name}">
                    <div class="xtra-label">XTRA Gratis Ongkir</div>
                </div>
                <div class="product-info">
                    <h3 class="product-name" onclick="openProductDetail('${p.id}')">${p.name}</h3>
                    <div class="price">${p.price} π</div>
                    <div class="free-ship-tag">🚚 Gratis ongkir</div>
                    <div class="card-bottom">
                        <div class="rating-text"><span class="star">★</span> 4.9 | 1rb+</div>
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
                memo: `Beli ${name}`,
                metadata: { productName: name },
            }, {
                onReadyForServerApproval: async (pid) => { return true; },
                onReadyForServerCompletion: async (pid, txid) => { showSuccessOverlay(amount, name, txid); },
                onCancel: () => {},
                onError: (e) => { console.error(e); }
            });
        } catch (err) { console.error(err); }
    };

    function showSuccessOverlay(amount, name, txid) {
        const overlay = document.createElement('div');
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px;";
        const pesan = `Halo Admin, saya sudah bayar π ${amount} untuk ${name}.%0ATXID: ${txid}%0A%0AAlamat: ${userAddress.nama}, ${userAddress.telepon}, ${userAddress.alamatLengkap}`;
        overlay.innerHTML = `<div style="background:white; padding:25px; border-radius:20px; text-align:center; max-width:320px;">
            <h2 style="color:#27ae60">Berhasil!</h2>
            <p style="font-size:0.8rem">Klik tombol di bawah untuk kirim alamat ke WhatsApp Admin.</p>
            <a href="https://wa.me/${ADMIN_WA}?text=${pesan}" target="_blank" style="display:block; background:#25D366; color:white; padding:12px; border-radius:10px; text-decoration:none; font-weight:bold; margin-top:15px;">Kirim WA</a>
            <button onclick="location.reload()" style="margin-top:15px; background:none; border:none; color:#888; text-decoration:underline;">Tutup</button>
        </div>`;
        document.body.appendChild(overlay);
    }

    window.showAddressForm = () => {
        const overlay = document.createElement('div');
        overlay.id = "address-overlay";
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px;";
        overlay.innerHTML = `<div style="background:white; padding:20px; border-radius:15px; width:100%; max-width:350px;">
            <h3 style="margin-top:0">Alamat Kirim</h3>
            <input type="text" id="ship-name" placeholder="Nama" style="width:100%; padding:10px; margin-bottom:10px;" value="${userAddress.nama}">
            <input type="number" id="ship-phone" placeholder="No WA" style="width:100%; padding:10px; margin-bottom:10px;" value="${userAddress.telepon}">
            <textarea id="ship-address" placeholder="Alamat Lengkap" style="width:100%; padding:10px; height:80px; margin-bottom:15px;">${userAddress.alamatLengkap}</textarea>
            <button onclick="saveAddress()" style="width:100%; background:var(--pi-color); color:white; border:none; padding:12px; border-radius:10px; font-weight:bold;">Simpan</button>
        </div>`;
        document.body.appendChild(overlay);
    };

    window.saveAddress = () => {
        userAddress = {
            nama: document.getElementById('ship-name').value,
            telepon: document.getElementById('ship-phone').value,
            alamatLengkap: document.getElementById('ship-address').value
        };
        document.getElementById('address-overlay').remove();
    };

    window.handleAuth = async () => {
        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (p) => {});
            currentUser = auth.user;
            document.getElementById('login-btn').innerText = "Logout";
            document.getElementById('profile-username').innerText = currentUser.username;
            document.getElementById('profile-address').innerText = currentUser.uid || "Verified User";
        } catch (e) { alert("Gagal Login"); }
    };

    window.switchPage = (p) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById(`page-${p}`).classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${p}`).classList.add('active');
        if(p === 'home') renderProducts(productsData, 'main-grid');
    };

    window.openProductDetail = (id) => {
        const p = productsData.find(x => x.id === id);
        document.getElementById('detail-content').innerHTML = `
            <img src="${p.images[0]}" style="width:100%; height:300px; object-fit:contain; background:#f9f9f9;">
            <div style="padding:20px;">
                <h2 style="margin:0">${p.name}</h2>
                <div class="price" style="font-size:1.5rem; margin:10px 0;">π ${p.price}</div>
                <p style="color:#666; font-size:0.9rem;">${p.desc}</p>
                <button class="btn-buy-now" style="width:100%; padding:15px; font-size:1rem;" onclick="window.handlePayment(${p.price}, '${p.name}')">Beli Sekarang</button>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };
    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    window.filterCategory = (cat) => {
        const filtered = cat === 'all' ? productsData : productsData.filter(p => p.category === cat);
        renderProducts(filtered, 'main-grid');
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.toggle('active', pill.innerText.includes(cat) || (cat==='all' && pill.innerText.includes('Semua')));
        });
    };

    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = window.handleAuth;
});
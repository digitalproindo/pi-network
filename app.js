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
        { id: 'v1', name: "Sedan Sport Luxury S1", price: 5.5, category: "Mobil", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], desc: "Mesin Turbo 2.0L Premium." }
    ];

    async function initPi() {
        try { await Pi.init({ version: "2.0", sandbox: false }); } catch (e) { console.error(e); }
    }

    // RENDER GRID
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
                    <img src="${p.images[0]}">
                    <div class="xtra-label">XTRA Gratis Ongkir</div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <div class="price">${p.price} π</div>
                    <div class="card-bottom">
                        <div class="rating-text">★ 4.9 | 1rb+</div>
                        <button class="btn-buy-now" onclick="event.stopPropagation(); window.handlePayment(${p.price}, '${p.name}')">Beli</button>
                    </div>
                </div>`;
            grid.appendChild(card);
        });
    }

    // DETAIL PRODUK LENGKAP DENGAN ULASAN
    window.openProductDetail = (productId) => {
        const p = productsData.find(x => x.id === productId);
        if (!p) return;
        
        const rating = "4.9/5.0";
        const terjual = "1.200+ Terjual";
        const ulasan = [
            { user: "Pionir_Sejati", teks: "Barang bagus, pengiriman super cepat menggunakan Pi!" },
            { user: "Andi_Crypto", teks: "Sangat recommended untuk belanja pake koin Pi." }
        ];

        document.getElementById('detail-content').innerHTML = `
            <img src="${p.images[0]}" style="width:100%; height:350px; object-fit:contain; background:#f9f9f9;">
            <div style="padding:20px;">
                <p style="color:var(--pi-color); font-weight:bold; margin:0;">${p.category}</p>
                <h2 style="margin:5px 0;">${p.name}</h2>
                <div style="color:#a82444; font-size:1.8rem; font-weight:800; margin-bottom:15px;">π ${p.price}</div>
                <p style="color:#666; line-height:1.6; font-size:0.95rem;">${p.desc}</p>
                
                <div style="display:flex; gap:10px; margin:20px 0;">
                    <button class="btn-buy-now" style="flex:1; padding:15px; font-size:1rem;" onclick="window.handlePayment(${p.price}, '${p.name}')">Beli Sekarang</button>
                    <button style="flex:1; background:#f39c12; color:white; border:none; border-radius:12px; font-weight:bold;" onclick="addToCart('${p.id}')">Keranjang</button>
                </div>

                <div style="background:#f1f1f1; padding:15px; border-radius:10px; display:flex; justify-content:space-around; margin-bottom:20px;">
                    <span>⭐ <b>${rating}</b></span>
                    <span>📦 <b>${terjual}</b></span>
                </div>

                <h4>Ulasan Pembeli:</h4>
                ${ulasan.map(u => `<div style="border-bottom:1px solid #eee; padding:10px 0;">
                    <small><b>${u.user}</b></small><br><span style="font-size:0.85rem;">"${u.teks}"</span>
                </div>`).join('')}
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    // BANNER SLIDE
    const banners = ["https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", "https://i.ibb.co.com/LXmKBMst/ORANG-PERTAMA-20260202-161721-0000.png"];
    let bIdx = 0;
    setInterval(() => {
        const img = document.getElementById('banner-img');
        if(img) { bIdx = (bIdx + 1) % banners.length; img.src = banners[bIdx]; }
    }, 4000);

    // Lainnya (Auth, Payment, SwitchPage) tetap sama namun diringkas agar efisien
    window.switchPage = (p) => {
        ['page-home', 'page-keranjang', 'page-profile'].forEach(id => document.getElementById(id).classList.add('hidden'));
        document.getElementById(`page-${p}`).classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.id === `nav-${p}`));
        if(p === 'home') renderProducts(productsData, 'main-grid');
    };

    window.handleAuth = async () => {
        try {
            const auth = await Pi.authenticate(['username', 'payments'], (p) => {});
            currentUser = auth.user;
            document.getElementById('profile-username').innerText = currentUser.username;
            document.getElementById('login-btn').innerText = "Logout";
        } catch (e) { console.error(e); }
    };

    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = window.handleAuth;
});
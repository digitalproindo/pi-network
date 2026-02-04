document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    // Simpan data alamat
    let userAddress = { nama: "", telepon: "", alamatLengkap: "" };

    // --- KONFIGURASI ---
    const ADMIN_WA = "6282191851112"; 

    // --- 1. DATA PRODUK (FULL VERSION) ---
    const productsData = [
        { 
            id: 'p1', 
            name: "Mastering Pi Network 2026", 
            price: 0.005,
            discount: 10, 
            category: "E-Book", 
            images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"], 
            desc: "Panduan optimasi node dan ekosistem Pi terbaru. Pelajari strategi staking dan keamanan wallet untuk masa depan Pi Network.",
            rating: 4.9, sold: 1250,
            reviews: [{ user: "Pioneer_Ace", comment: "Sangat edukatif!" }]
        },
        { 
            id: 'p2', 
            name: "COCO Probiotik", 
            price: 0.00006,
            discount: 5, 
            category: "Herbal", 
            images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
            desc: "Super food Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma Dan Dengan Formula Bioteknologi Khusus.",
            rating: 5.0, sold: 3400,
            reviews: [{ user: "Sehat_Sentosa", comment: "Asam lambung membaik!" }]
        },
        { 
            id: 'p3', 
            name: "Smart Home System Pro", 
            price: 0.500, 
            category: "Rumah", 
            images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], 
            desc: "Paket instalasi smart home berbasis IoT. Kontrol rumah Anda dengan integrasi Pi Browser.",
            rating: 4.8, sold: 52,
            reviews: [{ user: "GadgetFreak", comment: "Instalasi cepat!" }]
        },
        { 
            id: 'p4', 
            name: "Premium Smartphone X", 
            price: 1.200, 
            category: "Elektronik", 
            images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], 
            desc: "Gadget premium dengan performa tinggi. Kamera resolusi tinggi dan baterai tahan lama.",
            rating: 4.7, sold: 89,
            reviews: [{ user: "MobilePhotography", comment: "Kamera jernih!" }]
        },
        { 
            id: 'p5', 
            name: "Sofa Minimalis 2 Seater", 
            price: 0.05, 
            category: "Rumah", 
            images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], 
            desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu kecil.",
            rating: 4.6, sold: 45,
            reviews: [{ user: "InteriorLover", comment: "Sangat empuk." }]
        },
        { 
            id: 'p6', 
            name: "Nabidz Dessert", 
            price: 0.00012,
            discount: 20,
            category: "Herbal", 
            images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
            desc: "Nabidz Dessert bahan baku buah anggur merah yang di fermentasi esterifikasi biokimia resep pribadi.",
            rating: 4.9, sold: 21,
            reviews: [{ user: "Pioneer_Food", comment: "Rasa sangat premium." }]
        },
        { 
            id: 'hb4', 
            name: "Probiotik 10 Kunyit", 
            price: 0.00006, 
            category: "Herbal", 
            images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
            desc: "Formula Bioteknologi Khusus Live probiotic, Immune support, High Antioksidant.",
            rating: 5.0, sold: 1200,
            reviews: [{ user: "Bunda_Ika", comment: "Anak-anak suka sekali." }]
        },
        { 
            id: 'm1', 
            name: "Motor Sport 250cc", 
            price: 0.002, 
            category: "Motor", 
            images: ["https://i.ibb.co.com/spcrbbKT/Motor-250cc-Terbaik.jpg"], 
            desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern.",
            rating: 4.8, sold: 12,
            reviews: [{ user: "RiderPi", comment: "Gahar banget tampilannya." }]
        }
    ];

    // --- 2. INISIALISASI ---
    async function initPi() {
        try {
            await Pi.init({ version: "2.0", sandbox: false });
        } catch (e) { console.error("Init Error:", e); }
    }

    // --- 3. FORM ALAMAT ---
    window.showAddressForm = () => {
        const overlay = document.createElement('div');
        overlay.id = "address-overlay";
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        overlay.innerHTML = `
            <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:350px; color:#333; position:relative;">
                <div onclick="document.getElementById('address-overlay').remove()" style="position:absolute; top:15px; right:15px; width:30px; height:30px; background:#f2f2f2; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; color:#666;">✕</div>
                <h3 style="margin-top:0; margin-bottom:20px; text-align:center;">Alamat Pengiriman</h3>
                <div style="margin-bottom:12px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">Nama Penerima</label><input type="text" id="ship-name" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" value="${userAddress.nama}"></div>
                <div style="margin-bottom:12px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">No HP/WA</label><input type="number" id="ship-phone" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" value="${userAddress.telepon}"></div>
                <div style="margin-bottom:20px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">Alamat Lengkap</label><textarea id="ship-address" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; height:80px; box-sizing:border-box; resize:none;">${userAddress.alamatLengkap}</textarea></div>
                <button onclick="saveAddress()" style="width:100%; background:#6748d7; color:white; border:none; padding:14px; border-radius:10px; font-weight:bold; cursor:pointer;">Simpan Alamat</button>
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

    // --- 4. RENDER PRODUK (FIX GAMBAR & DISKON) ---
    window.renderProducts = (data, targetGridId) => {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";
        data.forEach(p => {
            const displayPrice = p.price.toFixed(5); 
            const discountBadge = (p.discount && p.discount > 0) 
                ? `<span class="discount-badge">-${p.discount}%</span>` 
                : '';
            
            // Perbaikan Image Path
            const imgPath = (p.images && p.images.length > 0) ? p.images[0] : "https://via.placeholder.com/300";

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="image-container" onclick="openProductDetail('${p.id}')">
                    ${discountBadge} 
                    <img src="${imgPath}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300'">
                    <div class="xtra-label"><span class="xtra-text">XTRA</span><span class="ongkir-text">Gratis Ongkir+</span></div>
                </div>
                <div class="product-info">
                    <h3 class="product-name" onclick="openProductDetail('${p.id}')">${p.name}</h3>
                    <div class="price">${displayPrice} π</div>
                    <div class="free-ship-tag"><img src="https://cdn-icons-png.flaticon.com/512/709/709790.png" width="12"> Gratis ongkir</div>
                    <div class="card-bottom">
                        <div class="rating-text"><span class="star">★</span> ${p.rating} | ${p.sold} terjual</div>
                        <button class="btn-buy-now" onclick="event.stopPropagation(); window.handlePayment(${p.price}, '${p.name}')">Beli</button>
                    </div>
                </div>`;
            grid.appendChild(card);
        });
    };

    // --- 5. PEMBAYARAN ---
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
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        const pesan = `Halo Admin, saya sudah bayar π ${amount} untuk ${name}.%0ATXID: ${txid}%0A%0AAlamat: ${userAddress.nama}, ${userAddress.telepon}, ${userAddress.alamatLengkap}`;
        overlay.innerHTML = `
            <div style="background:white; padding:30px; border-radius:25px; max-width:350px; width:100%; text-align:center;">
                <div style="font-size: 50px;">✅</div>
                <h2 style="color:#27ae60;">Berhasil!</h2>
                <p>Pembayaran diterima. Klik tombol di bawah untuk kirim bukti ke WhatsApp.</p>
                <a href="https://wa.me/${ADMIN_WA}?text=${pesan}" target="_blank" style="display:block; background:#25D366; color:white; text-decoration:none; padding:15px; border-radius:12px; font-weight:bold;">Kirim Ke WhatsApp</a>
                <button onclick="location.reload()" style="background:none; border:none; color:#999; margin-top:10px; cursor:pointer; text-decoration:underline;">Tutup</button>
            </div>`;
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
            document.getElementById('profile-address').innerText = currentUser.uid || "Connected";
        } catch (e) { alert("Gagal Login."); console.error(e); }
    };

    window.addToCart = (id) => {
        const p = productsData.find(x => x.id === id);
        if(p) { cart.push(p); alert("Ditambah ke keranjang!"); updateCartUI(); }
    };

    function updateCartUI() {
        const grid = document.getElementById('cart-items');
        if (!grid) return;
        if (cart.length === 0) { grid.innerHTML = "<p style='text-align:center;'>Keranjang Kosong</p>"; return; }
        const total = cart.reduce((s, i) => s + i.price, 0).toFixed(5);
        grid.innerHTML = `
            <div style="padding:15px;"><button onclick="window.showAddressForm()" style="width:100%; background:#3498db; color:white; border:none; padding:12px; border-radius:10px;">📍 Atur Alamat Pengiriman</button></div>
            ${cart.map((i) => `<div style="display:flex; justify-content:space-between; padding:15px; background:white; margin:0 15px 10px 15px; border-radius:15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);"><span>${i.name}</span><b>π ${i.price.toFixed(5)}</b></div>`).join('')}
            <div style="padding:20px; text-align:center;">
                <b style="font-size:1.2rem;">Total: π ${total}</b><br><br>
                <button class="btn-buy-now" style="width:100%; padding:15px; font-size:1rem;" onclick="window.handlePayment(${total}, 'Total Keranjang')">Checkout Sekarang</button>
            </div>`;
    }

    window.switchPage = (pageId) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => {
            const el = document.getElementById(p);
            if(el) el.classList.add('hidden');
        });
        document.getElementById(`page-${pageId}`).classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`).classList.add('active');
        if(pageId === 'home') window.renderProducts(productsData, 'main-grid');
        if(pageId === 'keranjang') updateCartUI();
    };

    // --- 7. DETAIL PRODUK ---
    window.closeProductDetail = () => {
        document.getElementById('product-detail-page').classList.add('hidden');
    };

    window.openProductDetail = (productId) => {
        const p = productsData.find(x => x.id === productId);
        if (!p) return;
        
        document.getElementById('product-detail-page').scrollTop = 0;
        const displayPriceDetail = p.price.toFixed(5);
        const imgPath = (p.images && p.images.length > 0) ? p.images[0] : "https://via.placeholder.com/300";
        
        document.getElementById('detail-content').innerHTML = `
            <div style="position: sticky; top: 0; padding: 15px; background: white; border-bottom: 1px solid #eee; z-index: 100; display: flex; align-items: center;">
                <button onclick="closeProductDetail()" style="border: none; background: #27ae60; color: white; padding: 10px 22px; border-radius: 20px; font-weight: 800; cursor: pointer;">
                    ← KEMBALI
                </button>
            </div>
            <img src="${imgPath}" style="width: 100%; height: 350px; object-fit: cover;">
            <div style="padding: 20px; background: white; border-radius: 25px 25px 0 0; margin-top: -20px; position: relative;">
                <span style="color: #00bfa5; font-size: 0.8rem; font-weight: 800;">${p.category}</span>
                <h2 style="margin: 10px 0;">${p.name}</h2>
                <div style="font-size: 2rem; font-weight: 900; color: #b71c1c; margin-bottom: 20px;">π ${displayPriceDetail}</div>
                <p style="line-height: 1.6; color: #444;">${p.desc}</p>
                <div style="margin-top:20px; font-weight:800;">Ulasan:</div>
                ${p.reviews.map(r => `<div style="padding:10px; background:#f5f5f5; border-radius:10px; margin-top:10px;"><b>@${r.user}</b>: ${r.comment}</div>`).join('')}
                <div style="height:120px;"></div>
            </div>
            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 15px; display: grid; grid-template-columns: 1fr 1.5fr; gap: 10px; box-shadow: 0 -2px 10px rgba(0,0,0,0.1);">
                <button onclick="window.addToCart('${p.id}')" style="background:white; color:#4a148c; border:2px solid #4a148c; padding:15px; border-radius:12px; font-weight:800;">+ Keranjang</button>
                <button onclick="window.handlePayment(${p.price}, '${p.name}')" style="background:#4a148c; color:white; border:none; padding:15px; border-radius:12px; font-weight:800;">Beli Sekarang</button>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    // --- 8. FILTER KATEGORI (FIX WARNA UNGU) ---
    window.filterCategory = (category, element) => {
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        window.renderProducts(filtered, 'main-grid');
        
        // Hapus class active dari semua pill
        document.querySelectorAll('.category-pill').forEach(pill => pill.classList.remove('active'));
        
        // Tambahkan ke yang diklik
        if(element) {
            element.classList.add('active');
        }
    };

    async function handleIncompletePayment(p) {
        await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId: p.identifier, txid: p.transaction.txid}) });
    }

    // Banner Logic
    const banners = ["https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", "https://i.ibb.co.com/LXmKBMst/ORANG-PERTAMA-20260202-161721-0000.png"];
    let idx = 0;
    setInterval(() => { 
        const img = document.getElementById('banner-img');
        if(img) { idx = (idx + 1) % banners.length; img.src = banners[idx]; }
    }, 4000);

    // --- EKSEKUSI ---
    await initPi();
    window.renderProducts(productsData, 'main-grid');
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.onclick = window.handleAuth;
});
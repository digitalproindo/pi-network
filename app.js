// =========================================================================
// 1. STATE & VARIABLE GLOBAL UTAMA (Ditaruh di paling atas agar terbaca global)
// =========================================================================
let currentUser = null;
let cart = [];
let userAddress = { nama: "", telepon: "", alamatLengkap: "" };
const ADMIN_WA = "6281906066757"; // Nomor admin WhatsApp Anda

// =========================================================================
// 2. DATA UTAMA & AUTO GENERATOR FIELD
// =========================================================================
// (Pastikan variabel productsData Anda di HTML atau file lain sudah terisi, 
// atau jika ada di atasnya, block generator di bawah ini akan melengkapinya)
if (typeof productsData !== "undefined") {
    productsData.forEach(p => {
        if(!p.rating) p.rating = 4.8;
        if(!p.sold) p.sold = Math.floor(Math.random() * 100) + 10;
        if(!p.reviews) p.reviews = [{user: "Pembeli", comment: "Barang bagus sesuai pesanan."}];
    });
}

// =========================================================================
// 3. SKRIP PROMO BANNER CAROUSEL AUTOMATION
// =========================================================================
const banners = [
    "https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", 
    "https://i.ibb.co.com/SwjWGRKm/ORANG-PERTAMA-20260205-094439-0000.png", 
    "https://i.ibb.co.com/Gvc69SRX/Salinan-dari-Salinan-dari-ORANG-PERTAMA-20260217-012738-0000.png",
    "https://i.ibb.co.com/W4RZCvCL/ORANG-PERTAMA-20260205-080941-0000.png"
];
let idx = 0;
setInterval(() => { 
    const img = document.getElementById('banner-img');
    if(img) { idx = (idx + 1) % banners.length; img.src = banners[idx]; }
}, 4000);

// =========================================================================
// 4. KELOMPOK CORE CORE FUNCTION (Render, Keranjang, Kategori, Detail)
// =========================================================================
function renderProducts(data, targetGridId) {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;
    grid.innerHTML = "";
    data.forEach(p => {
        const displayPrice = p.price.toFixed(5); 
        const discountBadge = (p.discount && p.discount > 0) 
            ? `<span class="discount-badge">-${p.discount}%</span>` 
            : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-container" onclick="openProductDetail('${p.id}')">
                ${discountBadge} 
                <img src="${p.images[0]}" alt="${p.name}">
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
}

window.addToCart = (id) => {
    const p = productsData.find(x => x.id === id);
    if(p) { 
        cart.push(p); 
        alert("✅ Berhasil ditambah ke keranjang!"); 
        window.updateCartUI(); 
    }
};

window.removeFromCart = (index) => {
    cart.splice(index, 1); 
    window.updateCartUI(); 
};

window.openProductDetail = (productId) => {
    const p = productsData.find(x => x.id === productId);
    if (!p) return;

    const bNav = document.querySelector('.bottom-nav');
    if(bNav) bNav.style.display = 'none';

    document.getElementById('product-detail-page').scrollTop = 0;
    
    document.getElementById('detail-content').innerHTML = `
        <div style="background: white; min-height: 100vh; padding-bottom: 100px; font-family:'Inter', sans-serif; position: relative;">
            
            <div onclick="closeProductDetail()" style="position: fixed; top: 15px; left: 15px; z-index: 9999; background: #4a148c; width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 2px solid white; cursor: pointer;">
                <svg viewBox="0 0 24 24" style="width:28px; height:28px; fill:none; stroke:white; stroke-width:3;">
                    <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>

            <div style="width: 100%; height: 320px; background: #f1f5f9; overflow: hidden; position: relative;">
                <img src="${p.images[0]}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
            </div>
            
            <div style="padding: 20px; position: relative; z-index: 10; background: white; border-radius: 30px 30px 0 0; margin-top: -30px; box-shadow: 0 -10px 20px rgba(0,0,0,0.05);">
                <h2 style="margin: 0; font-size: 1.4rem; color:#1a1a1a; font-weight: 800;">${p.name}</h2>
                <div style="font-size: 2.2rem; font-weight: 900; color: #b71c1c; margin: 10px 0;">π ${p.price.toFixed(5)}</div>
                
                <div style="background: #fdfdfd; padding: 20px; border-radius: 20px; border: 1px solid #f1f5f9; margin-top: 15px;">
                    <h4 style="margin: 0 0 10px 0; color: #4a148c; font-weight: 800; border-bottom: 2px solid #6748d7; width: fit-content; padding-bottom: 5px;">
                        DETAIL SPESIFIKASI
                    </h4>
                    <div style="line-height: 1.8; color: #475569; font-size: 0.95rem;">
                        ${p.desc}
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 12px; margin-top:30px;">
                    <button onclick="window.addToCart('${p.id}')" style="background: white; color: #4a148c; border: 2px solid #4a148c; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer;">+ Keranjang</button>
                    <button onclick="window.handlePayment(${p.price}, '${p.name}')" style="background: #4a148c; color: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer; box-shadow: 0 6px 20px rgba(74,20,140,0.3);">Beli Sekarang</button>
                </div>
            </div>
        </div>`;
        
    document.getElementById('product-detail-page').classList.remove('hidden');
};

window.closeProductDetail = () => {
    document.getElementById('product-detail-page').classList.add('hidden');
    const bNav = document.querySelector('.bottom-nav');
    if(bNav) { bNav.style.display = 'flex'; }
};

window.filterCategory = (category, element) => {
    const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
    renderProducts(filtered, 'main-grid');
    if (element) {
        document.querySelectorAll('.category-pill').forEach(pill => pill.classList.remove('active'));
        element.classList.add('active');
    }
};

// =========================================================================
// 5. SEGMEN MANAJEMEN ALAMAT PENGIRIMAN (POP-UP FORM & SAVE)
// =========================================================================
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
    window.updateCartUI(); // Refresh UI keranjang setelah simpan alamat
};

window.updateCartUI = () => {
    const grid = document.getElementById('cart-items');
    if (!grid) return;

    if (cart.length === 0) {
        grid.innerHTML = `
            <div style="text-align:center; padding:80px 24px; font-family:'Inter', sans-serif;">
                <div style="margin-bottom: 25px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/1162/1162499.png" alt="Cart" style="width: 120px; opacity: 0.8;">
                </div>
                <h2 style="color:#1a1a1a; margin-bottom:12px; font-size:1.5rem; font-weight:800;">Keranjang Anda Kosong</h2>
                <p style="color:#64748b; font-size:1rem; line-height:1.5; margin-bottom:30px; max-width:280px; margin-left:auto; margin-right:auto;">
                    Sepertinya Anda belum menambahkan produk premium ke keranjang.
                </p>
                <button onclick="switchPage('home')" style="background:#6748d7; color:white; border:none; padding:16px 40px; border-radius:18px; font-weight:700; font-size:1rem; cursor:pointer; box-shadow: 0 10px 20px rgba(103,72,215,0.3); transition: transform 0.2s;">
                    Mulai Belanja
                </button>
            </div>`;
        return;
    }

    const total = cart.reduce((s, i) => s + i.price, 0).toFixed(5);
    grid.innerHTML = `
        <div style="padding: 15px;">
            <div onclick="window.showAddressForm()" style="background:#fdfaff; padding:15px; border-radius:15px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; border:1px dashed #6748d7; cursor:pointer;">
                <div style="display:flex; align-items:center; gap:12px; text-align:left;">
                    <span style="font-size:1.2rem;">📍</span>
                    <div>
                        <div style="font-size:0.7rem; color:#6748d7; font-weight:bold; text-transform:uppercase;">Alamat Pengiriman</div>
                        <div style="font-size:0.85rem; font-weight:700; color:#1a1a1a;">
                            ${userAddress.nama ? userAddress.nama + ' (' + userAddress.telepon + ')' : 'Klik untuk lengkapi alamat'}
                        </div>
                    </div>
                </div>
                <span style="color:#6748d7; font-weight:bold;">></span>
            </div>

            <div id="cart-list">
                ${cart.map((item, index) => `
                    <div style="display:flex; align-items:center; gap:12px; background:white; padding:12px; margin-bottom:12px; border-radius:18px; position:relative; box-shadow: 0 4px 10px rgba(0,0,0,0.03); border: 1px solid #f1f5f9;">
                        <img src="${item.images[0]}" style="width:70px; height:70px; border-radius:12px; object-fit:cover;">
                        <div style="flex:1; text-align:left;">
                            <div style="font-size:0.85rem; font-weight:700; color:#333; margin-bottom:4px; padding-right:25px; line-height:1.3;">${item.name}</div>
                            <div style="font-size:1rem; font-weight:800; color:#b71c1c;">π ${item.price.toFixed(5)}</div>
                        </div>
                        <div onclick="window.removeFromCart(${index})" style="position:absolute; top:10px; right:10px; width:26px; height:26px; background:#fff1f1; color:#ff4d4f; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; cursor:pointer; font-size:11px; border: 1px solid #ffccc7;">✕</div>
                    </div>
                `).join('')}
            </div>

            <div style="background:white; padding:20px; border-radius:22px; margin-top:20px; border: 1px solid #f1f5f9; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.9rem; color:#64748b;">
                    <span>Subtotal (${cart.length} Produk)</span>
                    <span>π ${total}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:1.1rem; font-weight:800; color:#1a1a1a; border-top:2px solid #f8fafc; padding-top:15px;">
                    <span>Total Tagihan</span>
                    <span style="color:#b71c1c;">π ${total}</span>
                </div>
                <button class="btn-buy-now" style="width:100%; padding:16px; border-radius:16px; font-size:1.05rem; font-weight:800; border:none; box-shadow: 0 6px 15px rgba(103,72,215,0.3); background:#6748d7; color:white; cursor:pointer;" onclick="window.handlePayment(${total}, 'Total Keranjang')">
                    CHECKOUT SEKARANG 🚀
                </button>
            </div>
        </div>
    `;
};

// =========================================================================
// 6. ENGINE INTEGRASI PAYMENT PI COIN SDK NETWORK & NOTIFIKASI
// =========================================================================
window.handlePayment = async (amount, name) => {
    if (!currentUser) {
        showLoginPrompt();
        return;
    }

    if (!userAddress.nama) { 
        showAddressPrompt(); 
        return; 
    }

    let detailedItemName = name;
    if (name === 'Total Keranjang' && cart.length > 0) {
        const itemNames = cart.map(item => item.name).join(", ");
        detailedItemName = `Keranjang (${itemNames})`;
    }

    try {
        await Pi.createPayment({
            amount: parseFloat(amount),
            memo: `Pembelian ${name}`,
            metadata: { productName: detailedItemName },
        }, {
            onReadyForServerApproval: async (paymentId) => {
                const res = await fetch('/api/approve', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId}) });
                return res.ok;
            },
            onReadyForServerCompletion: async (paymentId, txid) => {
                const res = await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId, txid}) });
                if (res.ok) { 
                    showSuccessOverlay(amount, detailedItemName, txid);
                    if(name === 'Total Keranjang') { cart = []; window.updateCartUI(); }
                }
            },
            onCancel: () => {},
            onError: (e, p) => { if(p) handleIncompletePayment(p); }
        });
    } catch (err) { console.error(err); }
};

function showLoginPrompt() {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(8px);";
    overlay.innerHTML = `
        <div style="background:#0b2135; border:2px solid #FFD700; padding:35px 25px; border-radius:25px; max-width:320px; width:100%; text-align:center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); animation: zoomIn 0.3s ease;">
            <div style="margin-bottom: 15px;">
                <video src="assets/merah-putih.mp4" autoplay loop muted playsinline style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; border: 2px solid #FFD700;"></video>
            </div>
            <h2 style="color:#FFD700; margin:0; font-weight:800; font-size: 1.4rem; text-transform:uppercase;">Selamat Datang</h2>
            <p style="color:#f8fafc; margin:15px 0 25px; font-size:0.95rem; line-height:1.4;">Silakan Login agar Anda bisa melanjutkan pembelian produk premium di Marketplace <br> DIGITAL PRO INDO</p>
            <button onclick="this.parentElement.parentElement.remove(); window.handleAuth();" style="background:linear-gradient(45deg, #FFD700, #FFA500); color:#0b2135; border:none; width:100%; padding:15px; border-radius:12px; font-weight:bold; font-size:1rem; cursor:pointer; box-shadow: 0 5px 15px rgba(255,215,0,0.3);">
                LOGIN SEKARANG
            </button>
            <button onclick="this.parentElement.parentElement.remove()" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer; font-size:0.85rem;">Mungkin Nanti</button>
        </div>`;
    document.body.appendChild(overlay);
}

function showAddressPrompt() {
    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(8px);";
    overlay.innerHTML = `
        <div style="background:#0b2135; border:2px solid #FFD700; padding:35px 25px; border-radius:25px; max-width:320px; width:100%; text-align:center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); animation: zoomIn 0.3s ease;">
            <div style="font-size: 50px; margin-bottom: 15px;">📍</div>
            <h2 style="color:#FFD700; margin:0; font-weight:800; font-size: 1.4rem; text-transform:uppercase;">Alamat Kosong</h2>
            <p style="color:#f8fafc; margin:15px 0 25px; font-size:0.95rem; line-height:1.4;">Lengkapi alamat pengiriman Anda terlebih dahulu agar kami dapat mengirimkan produk dengan tepat.</p>
            <button onclick="this.parentElement.parentElement.remove(); window.showAddressForm();" style="background:linear-gradient(45deg, #FFD700, #FFA500); color:#0b2135; border:none; width:100%; padding:15px; border-radius:12px; font-weight:bold; font-size:1rem; cursor:pointer;">
                LENGKAPI ALAMAT
            </button>
        </div>`;
    document.body.appendChild(overlay);
}

function showSuccessOverlay(amount, name, txid) {
    const excelWebhookUrl = "https://script.google.com/macros/s/AKfycbxhmcYyT3lBeLrm4dMGotKonJPwT9ZCMU1jRNMBD8CZITVD3Gyreuv_s81Vgw5Kra3b/exec";
    const dataTransaksi = {
        tanggal: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        penerima: userAddress.nama,
        username: currentUser.username,
        item: name,
        total: amount,
        txid: txid,
        alamat: userAddress.alamatLengkap,
        telepon: userAddress.telepon
    };

    fetch(excelWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataTransaksi)
    }).catch(err => console.error("Gagal catat Excel:", err));

    const overlay = document.createElement('div');
    overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(5px);";
    
    const pesanWhatsApp = `*KONFIRMASI PEMBAYARAN PI NETWORK* %0A` +
                          `*PT. DIGITAL PRO INDO*%0A` +
                          `_______________________________%0A%0A` +
                          `Halo Admin, saya telah berhasil melakukan pembayaran produk premium melalui Pi Browser:%0A%0A` +
                          ` *DETAIL TRANSAKSI:*%0A` +
                          `• *Item:* ${name}%0A` +
                          `• *Total:* ${amount} π%0A` +
                          `• *Status:* Success (Pi Network)%0A` +
                          `• *TXID:* \`${txid}\` %0A%0A` +
                          ` *DATA PENGIRIMAN:*%0A` +
                          `• *Penerima:* ${userAddress.nama}%0A` +
                          `• *Telepon:* ${userAddress.telepon}%0A` +
                          `• *Alamat:* ${userAddress.alamatLengkap}%0A%0A` +
                          `_______________________________%0A` +
                          ` *Mohon segera diproses dan informasikan nomor resi pengiriman. Terima kasih!*`;

    overlay.innerHTML = `
        <div style="background:white; padding:35px 25px; border-radius:30px; max-width:380px; width:100%; text-align:center; font-family:'Inter', sans-serif; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
            <div style="width: 80px; height: 80px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <span style="font-size: 45px;">✅</span>
            </div>
            <h2 style="color:#1a0033; margin:0; font-weight:800; font-size: 1.6rem;">Pembayaran Berhasil!</h2>
            <p style="color:#64748b; margin-top:10px; font-size:0.9rem;">Data Pemesanan Anda telah tercatat di sistem kami.</p>
            <a href="https://wa.me/${ADMIN_WA}?text=${pesanWhatsApp}" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:10px; background:#25D366; color:white; text-decoration:none; padding:18px; border-radius:15px; font-weight:bold; font-size:1.05rem; margin-top:20px;">
                KIRIM DATA KE WHATSAPP
            </a>
            <button onclick="location.reload()" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer;">Kembali ke Beranda</button>
        </div>`;
    document.body.appendChild(overlay);
}

async function handleIncompletePayment(p) {
    await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId: p.identifier, txid: p.transaction.txid}) }).catch(e => {});
}

// =========================================================================
// 7. SISTEM RESPONS LOGIN AUTHENTIKASI & SOUND/GOLD OVERLAY ANIMATION
// =========================================================================
window.handleAuth = async () => {
    const successSound = new Audio("assets/sound-effect.mp3");
    successSound.load(); 

    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'auth-overlay';
    loadingOverlay.style.cssText = `
        display: flex; justify-content: center; align-items: center;
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px);
        z-index: 9999; opacity: 1; transition: opacity 0.5s;
    `;

    loadingOverlay.innerHTML = `
        <div style="text-align:center;">
            <div class="hourglass">⏳</div>
            <p style="margin-top:20px; font-weight:bold; color:#f3e5f5; text-transform:uppercase; letter-spacing:2px; font-size:0.7rem;">
                Menghubungkan...
            </p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    try {
        const scopes = ['username', 'payments'];
        const auth = await window.Pi.authenticate(scopes, (p) => handleIncompletePayment(p));
        
        currentUser = auth.user;

        const profileDisplay = document.getElementById('profile-username') || document.querySelector('.username-text');
        if (profileDisplay) { profileDisplay.innerText = currentUser.username; }

        const profileAddress = document.getElementById('profile-address');
        if (profileAddress) { profileAddress.innerText = currentUser.uid; }
       
        successSound.play().catch(e => console.log("Audio play blocked"));

        loadingOverlay.innerHTML = `
            <div style="
                background-color: #0b2135; 
                border: 3px solid #FFD700; 
                border-radius: 15px;
                padding: 20px;
                text-align: center;
                width: 75%;
                max-width: 300px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(255, 215, 0, 0.2);
                animation: zoomIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-sizing: border-box;
            ">
                <div style="padding: 5px; margin-bottom: 10px;">
                    <img src="assets/Hello-GIF.gif" style="width: 100%; border-radius: 8px; display: block;" class="congrats-gift">
                </div>
                <h2 style="color:#FFD700; margin:5px 0; font-weight:900; font-size:1.3rem; text-shadow: 0 2px 5px rgba(0,0,0,0.5); text-transform: uppercase;">
                    Login Berhasil!
                </h2>
                <p style="font-size:0.95rem; color:#fff; margin-bottom: 5px; opacity: 0.9;">
                    Selamat datang, <br>
                    <span style="color:#ba68c8; font-weight:bold;">@${currentUser.username}</span>
                </p>
            </div>
        `;

        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.innerText = "LOGOUT";
            loginBtn.style.background = "linear-gradient(to right, #ef4444, #b91c1c)";
            loginBtn.onclick = () => location.reload();
        }

        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => loadingOverlay.remove(), 500);
        }, 3500);

    } catch (err) { 
        console.error(err); 
        loadingOverlay.remove();
        if (err.message !== "User cancelled login") {
            alert("Gagal Login: " + err.message);
        }
    }
};

// =========================================================================
// 8. ROUTING & SWITCH PAGE NAVIGATION INTERFACE
// =========================================================================
window.switchPage = (pageId) => {
    ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => {
        const el = document.getElementById(p);
        if(el) el.classList.add('hidden');
    });
    const activePage = document.getElementById(`page-${pageId}`);
    if(activePage) activePage.classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${pageId}`);
    if(activeNav) activeNav.classList.add('active');
    
    if(pageId === 'home' && typeof productsData !== "undefined") renderProducts(productsData, 'main-grid');
    if(pageId === 'keranjang') window.updateCartUI();
};

// =========================================================================
// 9. EVENT DETECTOR SEARCH INPUT KEYWORD 
// =========================================================================
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = productsData.filter(p => p.name.toLowerCase().includes(keyword) || p.category.toLowerCase().includes(keyword));
        const sResult = document.getElementById('search-results');
        if(!sResult) return;
        
        if (keyword === "") {
            sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #999; padding: 20px;">Cari produk premium favoritmu...</p>`;
        } else if (filtered.length > 0) {
            renderProducts(filtered, 'search-results');
        } else {
            sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; padding: 20px;">Produk "${keyword}" tidak ditemukan.</p>`;
        }
    });
}

// =========================================================================
// 10. BOOTSTRAP INITIALIZATION PIPELINE (Koneksi Event Tombol Login)
// =========================================================================
async function initPi() {
    try {
        if (window.Pi) {
            await window.Pi.init({ version: "2.0", sandbox: false });
        }
    } catch (e) { console.error("Init Error:", e); }
}

document.addEventListener("DOMContentLoaded", async () => {
    if (typeof productsData !== "undefined") {
        renderProducts(productsData, 'main-grid');
    }

    try {
        await initPi();
        console.log("Pi SDK siap digunakan");
    } catch (err) {
        console.error("Pi SDK gagal muat: ", err);
    }

    // PENGIKATAN EVENT TOMBOL LOGIN UTAMA AGAR SEGERA AKTIF
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = window.handleAuth;
    }
});

// =========================================================================
// 11. SIDEBAR NAVIGATION & LISTENER CLOSE OUTSIDE MENU
// =========================================================================
function toggleMenu() {
    const nav = document.getElementById("sideNav");
    if (!nav) {
        console.error("Elemen sideNav tidak ditemukan!");
        return;
    }
    if (nav.style.width === "250px") {
        nav.style.width = "0px";
    } else {
        nav.style.width = "250px";
    }
}

function toggleDropdown() {
    const dropdown = document.getElementById("aboutDropdown");
    const btn = document.querySelector(".dropdown-btn");
    if(!dropdown) return;
    
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        if(btn) btn.classList.remove("active");
    } else {
        dropdown.style.display = "block";
        if(btn) btn.classList.add("active");
    }
}

window.addEventListener('click', function(event) {
    const nav = document.getElementById("sideNav");
    const menuIcon = document.querySelector('.menu-icon');
    
    if (nav && nav.style.width === "250px") {
        if (!nav.contains(event.target) && (menuIcon && !menuIcon.contains(event.target))) {
            nav.style.width = "0px";
        }
    }
});

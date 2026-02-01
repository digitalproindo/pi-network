document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let allProducts = [];
    let cart = JSON.parse(localStorage.getItem('pipro_cart')) || [];

    // Inisialisasi SDK Pi (sandbox: false untuk Production/Mainnet)
    try { 
        await Pi.init({ version: "2.0", sandbox: false }); 
    } catch(e) { console.error("Pi SDK tidak merespon"); }

    const loginBtn = document.getElementById('login-btn');

    // --- FUNGSI AUTH ---
    loginBtn.onclick = async () => {
        if (currentUser) {
            currentUser = null;
            alert("Berhasil Logout");
            updateAuthUI();
            updateProfileUI();
        } else {
            try {
                const auth = await Pi.authenticate(['username', 'payments'], (p) => {});
                currentUser = auth.user;
                alert("Login Berhasil! Halo " + currentUser.username);
                updateAuthUI();
                updateProfileUI();
            } catch(e) {
                alert("Login Gagal atau Dibatalkan");
            }
        }
    };

    function updateAuthUI() {
        if (currentUser) {
            loginBtn.innerText = "Logout";
            loginBtn.classList.add('btn-logout-style');
        } else {
            loginBtn.innerText = "Login";
            loginBtn.classList.remove('btn-logout-style');
        }
    }

    window.updateProfileUI = () => {
        const userEl = document.getElementById('profile-username');
        const addrEl = document.getElementById('profile-address');
        if (currentUser) {
            userEl.innerText = currentUser.username;
            addrEl.innerText = currentUser.uid;
        } else {
            userEl.innerText = "Tamu";
            addrEl.innerText = "Silakan login untuk melihat detail akun.";
        }
    };

    // --- LOGIKA PEMBAYARAN PI NETWORK (REVISI UTAMA) ---
    window.initiatePayment = async (productId) => {
        if (!currentUser) {
            alert("Harap Login terlebih dahulu sebelum melakukan pembayaran.");
            return;
        }

        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        try {
            const payment = await Pi.createPayment({
                amount: parseFloat(product.price),
                memo: `Beli ${product.name} - Digital Pro Indo`,
                metadata: { productId: product.id, type: "digital_product" },
            }, {
                onReadyForServerApproval: (paymentId) => {
                    // Di tahap ini, paymentId harus dikirim ke server backend Anda 
                    // untuk disetujui (API Pi Network /approve)
                    console.log("Menunggu persetujuan server untuk ID:", paymentId);
                },
                onReadyForServerCompletion: (paymentId, txid) => {
                    // Di tahap ini, transaksi berhasil di blockchain. 
                    // Segera berikan akses produk ke user.
                    alert(`Pembayaran Sukses!\nTXID: ${txid}`);
                    document.getElementById('product-modal').classList.add('hidden');
                },
                onCancel: (paymentId) => {
                    console.log("Pembayaran dibatalkan");
                },
                onError: (error, payment) => {
                    console.error("Payment Error:", error);
                    alert("Gagal memproses pembayaran koin Pi.");
                },
            });
        } catch (e) {
            console.error(e);
            alert("Gagal memicu jendela pembayaran.");
        }
    };

    // --- LOGIKA NAVIGASI ---
    window.switchPage = (pageId) => {
        document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const target = document.getElementById(`page-${pageId}`);
        if(target) target.classList.remove('hidden');
        const navMap = { home: 0, cari: 1, keranjang: 2, profile: 3 };
        const activeIdx = navMap[pageId];
        if (activeIdx !== undefined) document.querySelectorAll('.nav-item')[activeIdx].classList.add('active');
        if(pageId === 'keranjang') renderCart();
        if(pageId === 'profile') updateProfileUI();
    };

    // --- MODAL DETAIL PRODUK ---
    window.openDetail = (id) => {
        const p = allProducts.find(prod => prod.id === id);
        if(!p) return;

        const modal = document.getElementById('product-modal');
        const body = document.getElementById('modal-body');

        body.innerHTML = `
            <span class="close-modal" onclick="document.getElementById('product-modal').classList.add('hidden')">&times;</span>
            <img src="${p.images[0]}" class="detail-img">
            <h2 style="margin:0; font-size: 1.4rem;">${p.name}</h2>
            <div class="detail-stats">
                <span style="color: #ffa500;">⭐ ${p.rating || '5.0'}</span>
                <span>|</span>
                <span>Terjual ${p.sold || '0'}+</span>
                <span>|</span>
                <span style="color: var(--pi-color);">${p.category}</span>
            </div>
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--pi-color); margin: 15px 0;">π ${p.price}</div>
            <hr style="border:0; border-top:1px solid #eee; margin: 15px 0;">
            <p class="detail-desc">${p.description || 'Produk digital premium terbaik.'}</p>
            
            <div class="modal-actions">
                <button onclick="addToCart('${p.id}')" style="flex:1; padding:15px; border-radius:15px; border:1px solid #ddd; background:white; font-size:1.2rem; cursor:pointer;">🛒</button>
                <button onclick="initiatePayment('${p.id}')" class="btn-buy-now" style="flex:4; padding:15px; border-radius:15px; font-size:1rem; background: var(--pi-gold) !important;">Bayar π ${p.price}</button>
            </div>
        `;
        modal.classList.remove('hidden');
    };

    // --- RENDER & DATA ---
    async function loadData() {
        try {
            const res = await fetch('products.json');
            allProducts = await res.json();
            renderProducts(allProducts, 'main-grid');
        } catch(e) { console.error("Gagal memuat produk"); }
    }

    function renderProducts(data, containerId, isCart = false) {
        const container = document.getElementById(containerId);
        if(!container) return;
        container.innerHTML = '';
        data.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.onclick = (e) => { if(!e.target.closest('button')) window.openDetail(p.id); };
            card.innerHTML = `
                <div class="slider-container"><img src="${p.images[0]}" style="width:100%; height:100%; object-fit:cover;"></div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="price">π ${p.price}</span>
                        <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">⭐ ${p.rating || '5.0'}</span>
                    </div>
                    ${isCart ? `<button class="btn-delete" onclick="removeFromCart(${index})">🗑️ Hapus</button>` : ''}
                </div>`;
            container.appendChild(card);
        });
    }

    // --- KERANJANG ---
    window.addToCart = (id) => {
        const prod = allProducts.find(p => p.id === id);
        if (prod) {
            cart.push({...prod});
            localStorage.setItem('pipro_cart', JSON.stringify(cart));
            alert("Masuk keranjang!");
        }
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('pipro_cart', JSON.stringify(cart));
        renderCart();
    };

    function renderCart() {
        renderProducts(cart, 'cart-items', true);
        const checkout = document.getElementById('checkout-container');
        if(cart.length > 0) checkout.classList.remove('hidden');
        else checkout.classList.add('hidden');
    }

    loadData();
    updateAuthUI(); 
});
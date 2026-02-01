document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let allProducts = [];
    let cart = JSON.parse(localStorage.getItem('pipro_cart')) || [];

    // Inisialisasi SDK Pi (Gunakan sandbox: true untuk testing koin Tesnet)
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

    // --- LOGIKA PEMBAYARAN PI NETWORK (REVISI ANTI-TIMEOUT) ---
    window.initiatePayment = async (productId) => {
        if (!currentUser) {
            alert("Harap Login terlebih dahulu sebelum melakukan pembayaran.");
            return;
        }

        const product = allProducts.find(p => p.id === productId);
        if (!product) return;

        console.log("Memulai proses pembayaran untuk:", product.name);

        try {
            const payment = await Pi.createPayment({
                amount: parseFloat(product.price),
                memo: `Pembelian ${product.name} - Digital Pro Indo`,
                metadata: { productId: product.id, type: "digital_product" },
            }, {
                onReadyForServerApproval: (paymentId) => {
                    console.log("Pembayaran terdeteksi. ID:", paymentId);
                    // Segera beritahu user bahwa proses sedang divalidasi oleh sistem
                    // Ini penting agar user tidak menutup jendela konfirmasi
                    console.log("Mengirim konfirmasi ke server Pi...");
                },
                onReadyForServerCompletion: (paymentId, txid) => {
                    console.log("Transaksi Berhasil di Blockchain! TXID:", txid);
                    alert(`Pembayaran Sukses!\nTerima kasih. TXID: ${txid}`);
                    
                    // Sembunyikan modal dan update UI
                    document.getElementById('product-modal').classList.add('hidden');
                },
                onCancel: (paymentId) => {
                    console.log("Pembayaran dibatalkan oleh pengguna. ID:", paymentId);
                },
                onError: (error, payment) => {
                    console.error("Payment Error:", error);
                    if (error.message && error.message.includes("timeout")) {
                        alert("Waktu pembayaran habis (60 detik). Pastikan koneksi internet Anda stabil dan coba lagi.");
                    } else {
                        alert("Gagal memproses pembayaran. Pastikan saldo koin Pi Anda cukup.");
                    }
                },
            });
        } catch (e) {
            console.error("Terjadi kesalahan sistem:", e);
            alert("Gagal membuka dompet Pi. Pastikan Anda mengakses melalui Pi Browser.");
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
            <h2 style="margin:10px 0 5px 0; font-size: 1.4rem;">${p.name}</h2>
            <div class="detail-stats" style="margin-bottom:10px;">
                <span style="color: #ffa500;">⭐ ${p.rating || '5.0'}</span>
                <span style="margin: 0 8px; color: #ccc;">|</span>
                <span>Terjual ${p.sold || '0'}+</span>
                <span style="margin: 0 8px; color: #ccc;">|</span>
                <span style="color: var(--pi-color); font-weight:bold;">${p.category}</span>
            </div>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--pi-color); margin-bottom: 15px;">π ${p.price}</div>
            <hr style="border:0; border-top:1px solid #eee; margin-bottom: 15px;">
            <p class="detail-desc" style="line-height:1.5;">${p.description || 'Produk digital premium terbaik untuk menunjang produktivitas Anda.'}</p>
            
            <div class="modal-actions" style="margin-top:20px; display:flex; gap:10px;">
                <button onclick="addToCart('${p.id}')" style="flex:1; padding:15px; border-radius:12px; border:1px solid #ddd; background:white; font-size:1.2rem; cursor:pointer;">🛒</button>
                <button onclick="initiatePayment('${p.id}')" class="btn-buy-now" style="flex:4; padding:15px; border-radius:12px; font-size:1rem; font-weight:bold; background: var(--pi-gold) !important; color: white; border:none; cursor:pointer;">BAYAR SEKARANG</button>
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
        } catch(e) { console.error("Gagal memuat produk dari JSON"); }
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
                    <h3 class="product-name" style="font-size:1rem; margin-bottom:5px;">${p.name}</h3>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="price" style="color: var(--pi-color); font-weight:700;">π ${p.price}</span>
                        <span style="font-size:0.75rem; color:var(--text-muted);">⭐ ${p.rating || '5.0'}</span>
                    </div>
                    ${isCart ? `<button class="btn-delete" onclick="removeFromCart(${index})" style="margin-top:10px; width:100%;">🗑️ Hapus</button>` : ''}
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
            alert("Produk berhasil ditambahkan ke keranjang!");
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
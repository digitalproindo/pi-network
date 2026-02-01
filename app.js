document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let allProducts = [];
    let cart = JSON.parse(localStorage.getItem('pipro_cart')) || [];

    // 1. Inisialisasi SDK
    // sandbox: true untuk Tesnet, sandbox: false untuk Mainnet
    try { 
        await Pi.init({ version: "2.0", sandbox: false }); 
        console.log("Pi SDK Initialized");
    } catch(e) { 
        console.error("Pi SDK tidak merespon"); 
    }

    const loginBtn = document.getElementById('login-btn');

    // --- FUNGSI AUTH ---
    loginBtn.onclick = async () => {
        if (currentUser) {
            currentUser = null;
            alert("Berhasil Logout");
            updateAuthUI();
        } else {
            try {
                const auth = await Pi.authenticate(['username', 'payments'], (p) => {
                    console.log("Auth callback: ", p);
                });
                currentUser = auth.user;
                alert("Login Berhasil! Halo " + currentUser.username);
                updateAuthUI();
                if(typeof updateProfileUI === 'function') updateProfileUI();
            } catch(e) {
                alert("Login Gagal atau Dibatalkan");
            }
        }
    };

    function updateAuthUI() {
        if (currentUser) {
            loginBtn.innerText = "Logout (" + currentUser.username + ")";
            loginBtn.style.background = "#ef4444"; // Merah untuk logout
        } else {
            loginBtn.innerText = "Hubungkan Pi Wallet";
            loginBtn.style.background = "var(--pi-gold)";
        }
    }

    // --- LOGIKA PEMBAYARAN UTAMA (handlePayment) ---
    // Fungsi ini dibuat global (window.) agar bisa dipanggil dari atribut onclick di HTML
    window.handlePayment = async (amount, productName) => {
        if (!currentUser) {
            alert("Silakan hubungkan Pi Wallet Anda terlebih dahulu.");
            return;
        }

        try {
            console.log(`Memulai pembayaran: ${productName} seharga ${amount}`);
            
            const payment = await Pi.createPayment({
                amount: parseFloat(amount),
                memo: `Pembelian ${productName} - Digital Pro Indo`,
                metadata: { productName: productName },
            }, {
                onReadyForServerApproval: (paymentId) => {
                    console.log("Payment Ready for Approval. ID:", paymentId);
                    // Jika Anda memiliki server backend, kirim paymentId ke sana.
                    // Untuk client-side saja, SDK akan menunggu proses blockchain selesai.
                },
                onReadyForServerCompletion: (paymentId, txid) => {
                    console.log("Payment Completed. TXID:", txid);
                    alert(`Pembayaran Berhasil!\nProduk: ${productName}\nTXID: ${txid}`);
                    
                    // Sembunyikan modal jika sedang terbuka
                    const modal = document.getElementById('product-modal');
                    if(modal) modal.classList.add('hidden');
                },
                onCancel: (paymentId) => {
                    console.log("Pembayaran dibatalkan oleh pengguna.");
                },
                onError: (error, payment) => {
                    console.error("Payment Error:", error);
                    alert("Gagal memproses transaksi. Pastikan saldo cukup dan koneksi stabil.");
                },
            });
        } catch (e) {
            console.error("CreatePayment Exception:", e);
            alert("Terjadi kesalahan teknis. Pastikan Anda berada di dalam Pi Browser.");
        }
    };

    // --- INTEGRASI FITUR TAMBAHAN (KERANJANG & DETAIL) ---
    
    window.openDetail = (id) => {
        const p = allProducts.find(prod => prod.id === id);
        if(!p) return;

        const modal = document.getElementById('product-modal');
        const body = document.getElementById('modal-body');

        body.innerHTML = `
            <span class="close-modal" onclick="document.getElementById('product-modal').classList.add('hidden')">&times;</span>
            <img src="${p.images[0]}" style="width:100%; border-radius:15px; margin-bottom:15px;">
            <h2>${p.name}</h2>
            <p style="color:var(--text-muted)">${p.description || 'Digital Asset'}</p>
            <div style="font-size: 1.5rem; font-weight: 800; color: var(--pi-color); margin: 15px 0;">π ${p.price}</div>
            <div style="display:flex; gap:10px;">
                <button onclick="addToCart('${p.id}')" style="flex:1; padding:12px; border-radius:10px; border:1px solid #ddd;">🛒</button>
                <button onclick="handlePayment(${p.price}, '${p.name}')" style="flex:4; padding:12px; border-radius:10px; background:var(--pi-color); color:white; border:none; font-weight:bold;">BAYAR SEKARANG</button>
            </div>
        `;
        modal.classList.remove('hidden');
    };

    // --- RENDER PRODUK DARI JSON ---
    async function loadData() {
        try {
            const res = await fetch('products.json');
            allProducts = await res.json();
            renderProducts(allProducts, 'main-grid');
        } catch(e) { 
            console.log("Mode statis: Gunakan produk yang ada di HTML."); 
        }
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
                <div class="image-container">
                    <span class="category-tag">${p.category}</span>
                    <img src="${p.images[0]}" class="product-img">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <div class="price-row">
                        <span class="price">π ${p.price}</span>
                        <button class="btn-buy" onclick="handlePayment(${p.price}, '${p.name}')">Beli</button>
                    </div>
                </div>`;
            container.appendChild(card);
        });
    }

    // Navigasi & Keranjang
    window.switchPage = (pageId) => {
        document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
        const target = document.getElementById(`page-${pageId}`);
        if(target) target.classList.remove('hidden');
        if(pageId === 'keranjang') renderCart();
    };

    window.addToCart = (id) => {
        const prod = allProducts.find(p => p.id === id);
        if (prod) {
            cart.push({...prod});
            localStorage.setItem('pipro_cart', JSON.stringify(cart));
            alert("Masuk Keranjang");
        }
    };

    function renderCart() {
        renderProducts(cart, 'cart-items', true);
    }

    loadData();
    updateAuthUI();
});
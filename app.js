document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];

    // --- 1. DATA PRODUK (DATABASE) ---
    const productsData = [
        {
            id: 'p1',
            name: "Mastering Pi Network 2026",
            price: 0.005,
            category: "E-Book",
            images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"],
            desc: "Panduan optimasi node dan ekosistem Pi terbaru."
        },
        {
            id: 'p2',
            name: "Asset License Pro Digital",
            price: 0.010,
            category: "Software",
            images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"],
            desc: "Lisensi aset digital premium Digital Pro Indo."
        },
        {
            id: 'p3',
            name: "Smart Home System Pro",
            price: 0.500,
            category: "Rumah",
            images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"],
            desc: "Paket instalasi smart home berbasis IoT."
        },
        {
            id: 'p4',
            name: "Premium Smartphone X",
            price: 1.200,
            category: "Elektronik",
            images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"],
            desc: "Gadget premium dengan performa tinggi."
        }
    ];

    // --- 2. INISIALISASI SDK (MAINNET READY) ---
    async function initPi() {
        try {
            // sandbox: false mengarahkan ke Mainnet Pi Network
            await Pi.init({ version: "2.0", sandbox: false });
            console.log("Pi SDK Berhasil diinisialisasi (Mainnet)");
        } catch (e) {
            console.error("Gagal inisialisasi SDK:", e);
        }
    }

    // --- 3. LOGIKA RENDER PRODUK ---
    function renderProducts(data, targetGridId) {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";

        data.forEach(p => {
            grid.innerHTML += `
                <div class="product-card">
                    <div class="slider-container">
                        <div class="slider-wrapper">
                            <img src="${p.images[0]}" alt="${p.name}">
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${p.name}</h3>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="price">π ${p.price}</span>
                            <button class="btn-buy-now" onclick="handlePayment(${p.price}, '${p.name}')">Beli</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // --- 4. NAVIGASI & FILTER ---
    window.switchPage = (pageId) => {
        const pages = ['page-home', 'page-cari', 'page-keranjang', 'page-profile'];
        const navs = ['nav-home', 'nav-cari', 'nav-keranjang', 'nav-profile'];

        pages.forEach(p => document.getElementById(p).classList.add('hidden'));
        document.getElementById(`page-${pageId}`).classList.remove('hidden');

        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`).classList.add('active');
        
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
    };

    window.filterCategory = (category) => {
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
            if(pill.innerText.includes(category) || (category === 'all' && pill.innerText === 'Semua')) {
                pill.classList.add('active');
            }
        });

        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

    window.searchProduct = () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));
        renderProducts(filtered, 'search-results');
    };

    // --- 5. LOGIKA AUTH ---
    async function handleAuth() {
        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            currentUser = auth.user;
            document.getElementById('profile-username').innerText = currentUser.username;
            document.getElementById('profile-address').innerText = currentUser.uid;
            document.getElementById('login-btn').innerText = "Logged In";
        } catch (err) {
            console.error(err);
            alert("Gagal Login. Gunakan Pi Browser.");
        }
    }

    // --- 6. SISTEM PEMBAYARAN (MAINNET) ---
    window.handlePayment = async function(amount, productName) {
        if (!currentUser) return alert("Silakan Login terlebih dahulu di menu Profil!");

        try {
            await Pi.createPayment({
                amount: amount,
                memo: `Pembelian ${productName} - Digital Pro Indo`,
                metadata: { productName: productName },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    // Endpoint approval backend Anda
                    const res = await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    // Endpoint completion backend Anda
                    const res = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    if (res.ok) alert(`Sukses! ${productName} berhasil dibeli.\nTXID: ${txid}`);
                },
                onCancel: (paymentId) => console.log("Pembayaran dibatalkan:", paymentId),
                onError: (error, payment) => {
                    if (payment) handleIncompletePayment(payment);
                    alert("Gagal membayar: " + error.message);
                }
            });
        } catch (err) {
            console.error("Payment error:", err);
        }
    };

    async function handleIncompletePayment(payment) {
        await fetch('/api/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
        });
    }

    // Inisialisasi awal
    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = handleAuth;
});
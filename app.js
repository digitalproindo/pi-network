document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];

    // --- 1. DATA PRODUK (DATABASE LENGKAP) ---
    const productsData = [
        { id: 'p1', name: "Mastering Pi Network 2026", price: 0.005, category: "E-Book", images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"], desc: "Panduan optimasi node dan ekosistem Pi terbaru." },
        { id: 'p2', name: "COCO Probiotik", price: 0.010, category: "Herbal", images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], desc: "Lisensi aset digital premium Digital Pro Indo." },
        { id: 'p3', name: "Smart Home System Pro", price: 0.500, category: "Rumah", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], desc: "Paket instalasi smart home berbasis IoT." },
        { id: 'p4', name: "Premium Smartphone X", price: 1.200, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], desc: "Gadget premium dengan performa tinggi." },
        { id: 'hb4', name: "Ekstrak Kurma Pro", price: 0.004, category: "Herbal", images: ["https://i.ibb.co.com/C5dj5y6j/IMG-20251130-WA0028.jpg"], desc: "Sari kurma pekat booster energi." },
        { id: 'v1', name: "Sedan Sport Luxury", price: 5.5, category: "Mobil", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], desc: "Mesin Turbo 2.0L, Interior Kulit Premium." },
        { id: 'm1', name: "Motor Sport 250cc", price: 1.2, category: "Motor", images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"], desc: "Desain aerodinamis modern." }
    ];

    // --- 2. INISIALISASI SDK ---
    async function initPi() {
        try {
            // sandbox: true (Testnet) agar Anda bisa tes tanpa koin asli
            await Pi.init({ version: "2.0", sandbox: true });
            console.log("Pi SDK Berhasil diinisialisasi");
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
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div onclick="openProductDetail('${p.id}')">
                    <div class="slider-container">
                        <img src="${p.images[0]}" alt="${p.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${p.name}</h3>
                        <span class="price">π ${p.price}</span>
                    </div>
                </div>
                <div style="padding: 0 12px 12px;">
                    <button class="btn-buy-now" style="width:100%" onclick="handlePayment(${p.price}, '${p.name}')">Beli</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // --- 4. FUNGSI DETAIL PRODUK ---
    window.openProductDetail = function(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;

        const detailContent = document.getElementById('detail-content');
        detailContent.innerHTML = `
            <img src="${product.images[0]}" style="width: 100%; height: 300px; object-fit: cover;">
            <div style="padding: 20px;">
                <p style="color: var(--pi-color); font-weight: 800; font-size: 0.8rem;">${product.category}</p>
                <h2 style="margin: 10px 0;">${product.name}</h2>
                <div class="price" style="font-size: 1.5rem; margin-bottom: 20px;">π ${product.price}</div>
                <p style="color: var(--text-muted); line-height: 1.6;">${product.desc}</p>
            </div>
        `;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = function() {
        document.getElementById('product-detail-page').classList.add('hidden');
    };

    // --- 5. FUNGSI AUTH (KEMBALI KE STRUKTUR LAMA ANDA) ---
    async function handleAuth() {
        const loginBtn = document.getElementById('login-btn');

        if (currentUser) {
            if (confirm("Apakah Anda yakin ingin logout?")) {
                currentUser = null;
                loginBtn.innerText = "Login";
                loginBtn.classList.remove('btn-logout-style');
                document.getElementById('profile-username').innerText = "Belum Login";
                document.getElementById('profile-address').innerText = "Silakan login di Pi Browser.";
                alert("Anda telah logout.");
            }
            return;
        }

        loginBtn.innerText = "Loading...";
        loginBtn.disabled = true;

        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                // Handle incomplete payment
            });
            
            currentUser = auth.user;
            loginBtn.innerText = "Logout";
            loginBtn.disabled = false;
            loginBtn.classList.add('btn-logout-style');

            document.getElementById('profile-username').innerText = currentUser.username;
            document.getElementById('profile-address').innerText = currentUser.uid;

            alert("Selamat datang, " + currentUser.username + "!");
        } catch (err) {
            console.error(err);
            loginBtn.innerText = "Login";
            loginBtn.disabled = false;
            alert("Gagal Login. Pastikan Anda berada di Pi Browser.");
        }
    }

    // --- 6. PEMBAYARAN (TESTNET MODE) ---
    window.handlePayment = async function(amount, productName) {
        if (!currentUser) return alert("Silakan Login terlebih dahulu di menu Profil!");

        try {
            await Pi.createPayment({
                amount: amount,
                memo: `Pembelian ${productName}`,
                metadata: { productName: productName },
            }, {
                onReadyForServerApproval: (paymentId) => { return true; }, // Simulasi approve
                onReadyForServerCompletion: (paymentId, txid) => {
                    alert(`Sukses! TXID: ${txid}`);
                },
                onCancel: (paymentId) => { console.log("Batal"); },
                onError: (error) => { alert("Gagal: " + error.message); }
            });
        } catch (err) {
            console.error(err);
        }
    };

    // --- 7. NAVIGASI ---
    window.switchPage = (pageId) => {
        const pages = ['page-home', 'page-cari', 'page-keranjang', 'page-profile'];
        pages.forEach(p => document.getElementById(p).classList.add('hidden'));
        document.getElementById(`page-${pageId}`).classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`).classList.add('active');
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
    };

    window.filterCategory = (category) => {
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

    // --- STARTUP ---
    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = handleAuth;
});
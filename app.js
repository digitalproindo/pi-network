document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let isPiReady = false;

    // --- 1. DATA PRODUK ---
    const productsData = [
        { id: 'p1', name: "Mastering Pi Network 2026", price: 0.005, category: "E-Book", images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"], desc: "Panduan optimasi node dan ekosistem Pi terbaru." },
        { id: 'p2', name: "COCO Probiotik", price: 0.010, category: "Herbal", images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], desc: "Minuman probiotik alami untuk kesehatan." },
        { id: 'p3', name: "Smart Home System Pro", price: 0.500, category: "Rumah", images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], desc: "Paket instalasi smart home IoT." },
        { id: 'p4', name: "Premium Smartphone X", price: 1.200, category: "Elektronik", images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], desc: "Gadget flagship performa tinggi." },
        { id: 'v1', name: "Sedan Sport Luxury", price: 5.5, category: "Mobil", images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], desc: "Mobil mewah performa tinggi." },
        { id: 'm1', name: "Motor Sport 250cc", price: 1.2, category: "Motor", images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"], desc: "Desain aerodinamis modern." }
    ];

    // --- 2. INISIALISASI SDK ---
    async function initPi() {
        try {
            // Gunakan sandbox: true untuk koin Testnet
            await Pi.init({ version: "2.0", sandbox: true });
            isPiReady = true;
            console.log("Pi SDK Ready.");
        } catch (e) {
            console.error("SDK Init Error:", e);
            alert("Gagal memuat SDK Pi. Harap gunakan Pi Browser.");
        }
    }

    // --- 3. RENDER PRODUK ---
    function renderProducts(data, targetGridId) {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";
        data.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div onclick="openProductDetail('${p.id}')">
                    <div class="slider-container"><img src="${p.images[0]}" alt="${p.name}"></div>
                    <div class="product-info"><h3 class="product-name">${p.name}</h3><span class="price">π ${p.price}</span></div>
                </div>
                <div style="padding: 0 12px 12px;"><button class="btn-buy-now" style="width:100%" onclick="handlePayment(${p.price}, '${p.name}')">Beli</button></div>
            `;
            grid.appendChild(card);
        });
    }

    // --- 4. LOGIN (ANTI STUCK) ---
    window.handleAuth = async function() {
        const loginBtn = document.getElementById('login-btn');

        if (!isPiReady) {
            alert("Sistem Pi sedang memuat, silakan coba lagi dalam 3 detik...");
            return;
        }

        if (currentUser) {
            if (confirm("Logout dari akun " + currentUser.username + "?")) {
                currentUser = null;
                loginBtn.innerText = "Login";
                loginBtn.classList.remove('btn-logout-style');
                document.getElementById('profile-username').innerText = "Belum Login";
                document.getElementById('profile-address').innerText = "Silakan login di Pi Browser.";
            }
            return;
        }

        try {
            loginBtn.innerText = "Connecting...";
            loginBtn.disabled = true;

            // Timeout 15 detik agar tidak stuck selamanya jika jaringan buruk
            const authPromise = Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                console.log("Incomplete payment detected:", payment);
            });

            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error("Request Timeout")), 15000)
            );

            const auth = await Promise.race([authPromise, timeoutPromise]);

            currentUser = auth.user;
            loginBtn.innerText = "Logout";
            loginBtn.disabled = false;
            loginBtn.classList.add('btn-logout-style');
            
            document.getElementById('profile-username').innerText = currentUser.username;
            document.getElementById('profile-address').innerText = currentUser.uid;
            alert("Halo, " + currentUser.username + "!");

        } catch (err) {
            console.error("Auth Error:", err);
            alert("Gagal Terhubung: " + (err.message === "Request Timeout" ? "Koneksi lambat, coba lagi." : "Pastikan Anda login di Pi Browser."));
            loginBtn.innerText = "Login";
            loginBtn.disabled = false;
        }
    };

    // --- 5. FUNGSI GLOBAL ---
    window.openProductDetail = (productId) => {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;
        document.getElementById('detail-content').innerHTML = `
            <img src="${product.images[0]}" style="width:100%; height:300px; object-fit:cover;">
            <div style="padding:20px;">
                <p style="color:var(--pi-color); font-weight:800; font-size:0.8rem;">${product.category}</p>
                <h2>${product.name}</h2>
                <div class="price" style="font-size:1.5rem;">π ${product.price}</div>
                <p style="color:var(--text-muted);">${product.desc}</p>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.closeProductDetail = () => document.getElementById('product-detail-page').classList.add('hidden');

    window.filterCategory = (category) => {
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

    window.handlePayment = async (amount, name) => {
        if (!currentUser) return alert("Silakan Login terlebih dahulu!");
        try {
            await Pi.createPayment({ amount, memo: `Beli ${name}`, metadata: { name } }, {
                onReadyForServerApproval: () => true,
                onReadyForServerCompletion: (id, txid) => alert("Berhasil! TXID: " + txid),
                onCancel: () => console.log("User cancel"),
                onError: (e) => alert("Gagal: " + e.message)
            });
        } catch (e) { alert("Pembayaran error."); }
    };

    window.switchPage = (pageId) => {
        const pages = ['page-home', 'page-cari', 'page-keranjang', 'page-profile'];
        pages.forEach(p => document.getElementById(p).classList.toggle('hidden', p !== `page-${pageId}`));
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
    };

    // --- STARTUP ---
    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = window.handleAuth;
});
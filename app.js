document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let allProducts = []; // Tempat menyimpan data dari JSON

    // --- 1. INISIALISASI SDK ---
    try {
        await Pi.init({ version: "2.0", sandbox: false });
        console.log("Pi SDK Berhasil diinisialisasi");
    } catch (e) {
        console.error("Gagal inisialisasi SDK:", e);
    }

    // --- 2. LOAD & RENDER PRODUK DARI JSON ---
    async function loadProducts() {
        const grid = document.getElementById('main-grid');
        try {
            const response = await fetch('products.json');
            allProducts = await response.json();
            renderProducts(allProducts, 'main-grid');
        } catch (err) {
            console.error("Gagal memuat data produk:", err);
            if(grid) grid.innerHTML = "<p style='grid-column:1/-1; text-align:center;'>Gagal memuat produk. Pastikan file products.json tersedia.</p>";
        }
    }

    function renderProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = ''; 

        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="slider-container" id="slider-${p.id}">
                    <span class="category-tag">${p.category}</span>
                    <div class="slider-wrapper">
                        ${p.images.map(img => `<img src="${img}" loading="lazy">`).join('')}
                    </div>
                </div>
                <div class="product-meta">
                    <span class="price">π ${p.price}</span>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="rating-row">
                        <span style="color:#ffa500">⭐</span>
                        <strong>${p.rating}</strong> 
                        <span style="margin-left:5px; color:#64748b">| Terjual ${p.sold}</span>
                    </div>
                    <p class="desc-text">${p.description}</p>
                    <div class="action-buttons">
                        <button class="btn-cart" onclick="addToCart('${p.id}')">🛒</button>
                        <button class="btn-buy" onclick="handlePayment(${p.price}, '${p.name}')">Beli Sekarang</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
            initSlider(`slider-${p.id}`, p.images.length);
        });
    }

    // Fungsi Slider Otomatis
    function initSlider(id, totalImages) {
        let index = 0;
        const wrapper = document.querySelector(`#${id} .slider-wrapper`);
        if (!wrapper || totalImages <= 1) return;

        setInterval(() => {
            index = (index + 1) % totalImages;
            wrapper.style.transform = `translateX(-${index * 100}%)`;
        }, 3000 + Math.random() * 2000); // Interval acak agar tidak serentak
    }

    // --- 3. LOGIKA NAVIGASI (SPA) ---
    const navItems = document.querySelectorAll('.nav-item');
    const pages = {
        home: document.getElementById('page-home'),
        cari: document.getElementById('page-cari'),
        keranjang: document.getElementById('page-keranjang'),
        profile: document.getElementById('page-profile')
    };

    window.switchPage = function(pageName) {
        const target = pageName.trim().toLowerCase();
        
        // Reset Nav
        navItems.forEach(item => item.classList.remove('active'));

        // Sembunyikan semua
        Object.values(pages).forEach(p => { if(p) p.style.display = 'none'; });

        // Tampilkan yang dipilih
        if (target === 'profil') {
            pages.profile.style.display = 'block';
            navItems[3].classList.add('active');
            updateProfileUI();
        } else if (target === 'cari') {
            pages.cari.style.display = 'block';
            navItems[1].classList.add('active');
        } else if (target === 'keranjang') {
            pages.keranjang.style.display = 'block';
            navItems[2].classList.add('active');
        } else {
            pages.home.style.display = 'block';
            navItems[0].classList.add('active');
        }
    };

    // --- 4. FILTER & PENCARIAN ---
    window.filterCategory = function(category) {
        if (category === 'all') {
            renderProducts(allProducts, 'main-grid');
        } else {
            const filtered = allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
            renderProducts(filtered, 'main-grid');
        }
    };

    window.searchProduct = function() {
        const input = document.getElementById('search-input').value.toLowerCase();
        const resultsContainer = document.getElementById('search-results');
        
        if (input === '') {
            resultsContainer.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#64748b;">Gunakan kotak di atas untuk mencari.</p>';
            return;
        }

        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(input));
        
        if (filtered.length > 0) {
            renderProducts(filtered, 'search-results');
        } else {
            resultsContainer.innerHTML = '<p style="text-align:center; grid-column:1/-1; color:#64748b;">Produk tidak ditemukan.</p>';
        }
    };

    // --- 5. AUTH & PROFILE ---
    function updateProfileUI() {
        const profileUsername = document.getElementById('profile-username');
        const profileAddress = document.getElementById('profile-address');
        const loginBtn = document.getElementById('login-btn');

        if (currentUser) {
            if (profileUsername) profileUsername.innerText = currentUser.username;
            if (profileAddress) profileAddress.innerText = `Wallet: ${currentUser.uid.substring(0,15)}...`;
            if (loginBtn) {
                loginBtn.innerText = "Logout";
                loginBtn.classList.add('btn-logout-style');
            }
        } else {
            if (profileUsername) profileUsername.innerText = "Belum Login";
            if (loginBtn) {
                loginBtn.innerText = "Login";
                loginBtn.classList.remove('btn-logout-style');
                loginBtn.disabled = false;
            }
        }
    }

    async function handleAuth() {
        if (currentUser) {
            if (confirm("Logout dari aplikasi?")) {
                currentUser = null;
                updateProfileUI();
            }
            return;
        }

        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            currentUser = auth.user;
            updateProfileUI();
            alert("Selamat datang, " + currentUser.username);
        } catch (err) {
            alert("Gagal Login. Gunakan Pi Browser.");
        }
    }

    // --- 6. PEMBAYARAN & KERANJANG ---
    window.addToCart = function(productId) {
        alert("Produk ID " + productId + " ditambahkan ke keranjang!");
        // Logika storage keranjang bisa ditambah di sini
    };

    window.handlePayment = async function(amount, productName) {
        if (!currentUser) return alert("Silakan Login terlebih dahulu!");

        try {
            await Pi.createPayment({
                amount: amount,
                memo: `Order: ${productName}`,
                metadata: { productName: productName },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    const res = await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    alert("Pembayaran Berhasil!");
                },
                onCancel: (pId) => console.log("Batal", pId),
                onError: (err, p) => alert("Error Pembayaran: " + err.message)
            });
        } catch (err) { console.error(err); }
    };

    // Jalankan Pemuatan Awal
    loadProducts();
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.onclick = handleAuth;
});
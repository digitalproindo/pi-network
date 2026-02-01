document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;

    // --- 0. DATA PRODUK (DATABASE) ---
    const productsData = [
        {
            id: 'p1',
            name: "Mastering Pi Network",
            price: 0.005,
            category: "E-Book",
            image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400",
            rating: 4.9,
            sold: "1.2k",
            desc: "Panduan lengkap optimasi node dan strategi ekosistem Pi terbaru 2026 untuk memaksimalkan hasil mining Anda."
        },
        {
            id: 'p2',
            name: "Asset License Pro",
            price: 0.010,
            category: "Software",
            image: "https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg",
            rating: 4.8,
            sold: "850",
            desc: "Lisensi resmi aset digital premium eksklusif Digital Pro Indo untuk kebutuhan komersial dan pengembangan proyek."
        }
    ];

    // --- 1. INISIALISASI SDK ---
    try {
        await Pi.init({ version: "2.0", sandbox: false });
        console.log("Pi SDK Berhasil diinisialisasi");
    } catch (e) {
        console.error("Gagal inisialisasi SDK:", e);
    }

    // --- 2. LOGIKA UPDATE UI PROFIL ---
    function updateProfileUI() {
        const profileUsername = document.getElementById('profile-username');
        const profileAddress = document.getElementById('profile-address');
        const loginBtn = document.getElementById('login-btn');

        if (currentUser) {
            if (profileUsername) profileUsername.innerText = currentUser.username;
            if (profileAddress) profileAddress.innerText = `Wallet UID: ${currentUser.uid}`;
            if (loginBtn) {
                loginBtn.innerText = "Logout";
                loginBtn.classList.add('btn-logout-style');
            }
        } else {
            if (profileUsername) profileUsername.innerText = "Belum Login";
            if (profileAddress) profileAddress.innerText = "Silakan login untuk melihat detail akun.";
            if (loginBtn) {
                loginBtn.innerText = "Login";
                loginBtn.classList.remove('btn-logout-style');
                loginBtn.disabled = false;
            }
        }
    }

    // --- 3. LOGIKA NAVIGASI (SPA) ---
    const navItems = document.querySelectorAll('.nav-item');
    const pageHome = document.getElementById('page-home');
    const pageProfile = document.getElementById('page-profile');

    function switchPage(pageName) {
        const target = pageName.trim().toLowerCase();
        navItems.forEach(item => item.classList.remove('active'));

        if (target === 'profil') {
            pageHome.style.display = 'none';
            pageProfile.style.display = 'block';
            if (navItems[3]) navItems[3].classList.add('active');
            updateProfileUI();
        } else if (target === 'beranda') {
            pageHome.style.display = 'block';
            pageProfile.style.display = 'none';
            if (navItems[0]) navItems[0].classList.add('active');
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const labelElement = this.querySelector('.nav-text');
            if (labelElement) switchPage(labelElement.innerText);
        });
    });

    // --- 4. LOGIKA MODAL DETAIL PRODUK ---
    window.openProductDetail = function(productId) {
        const p = productsData.find(item => item.id === productId);
        if(!p) return;

        // Pastikan Anda sudah menambahkan struktur modal di index.html sebelumnya
        const modal = document.getElementById('detail-modal'); // Ganti ID jika berbeda
        const inner = document.getElementById('modal-inner');

        if(modal && inner) {
            inner.innerHTML = `
                <img src="${p.image}" class="detail-img">
                <h2 class="detail-title">${p.name}</h2>
                <div class="detail-meta">
                    <span style="color:var(--pi-gold)">⭐ ${p.rating}</span>
                    <span>|</span>
                    <span>Terjual ${p.sold}</span>
                </div>
                <div class="detail-price">π ${p.price}</div>
                <p class="detail-desc">${p.desc}</p>
                <div class="modal-footer">
                    <button class="btn-cart-outline" onclick="alert('Masuk Keranjang!')">🛒</button>
                    <button class="btn-buy-full" onclick="handlePayment(${p.price}, '${p.name}')">Beli Sekarang</button>
                </div>
            `;
            modal.style.display = 'flex';
        }
    };

    window.closeDetail = function() {
        const modal = document.getElementById('detail-modal');
        if(modal) modal.style.display = 'none';
    };

    // --- 5. RENDER GRID PRODUK OTOMATIS ---
    function renderProductGrid() {
        const grid = document.querySelector('.marketplace-grid');
        if(!grid) return;
        
        grid.innerHTML = ''; // Bersihkan grid
        productsData.forEach(p => {
            grid.innerHTML += `
                <div class="product-card" onclick="openProductDetail('${p.id}')">
                    <div class="image-container">
                        <span class="category-tag">${p.category}</span>
                        <img src="${p.image}" class="product-img">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${p.name}</h3>
                        <div class="price-row" style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="price">π ${p.price}</span>
                            <button class="btn-buy" onclick="event.stopPropagation(); openProductDetail('${p.id}')">Beli</button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // --- 6. FUNGSI CLEANUP & AUTH ---
    async function handleIncompletePayment(payment) {
        console.warn("Ditemukan pembayaran tertunda:", payment.identifier);
        // Implementasi API backend Anda di sini
    }

    async function handleAuth() {
        if (currentUser) {
            if (confirm("Apakah Anda ingin logout?")) {
                currentUser = null;
                updateProfileUI();
                alert("Berhasil Logout.");
            }
            return;
        }

        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) { loginBtn.innerText = "..."; loginBtn.disabled = true; }

        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            currentUser = auth.user;
            updateProfileUI();
            alert("Halo " + currentUser.username + ", selamat datang!");
        } catch (err) {
            console.error("Auth error:", err);
            updateProfileUI();
            alert("Gagal Login. Pastikan buka di Pi Browser.");
        }
    }

    // --- 7. FUNGSI PEMBAYARAN UTAMA ---
    window.handlePayment = async function(amount, productName) {
        if (!currentUser) return alert("Silakan Login terlebih dahulu!");

        try {
            await Pi.createPayment({
                amount: amount,
                memo: `Beli ${productName} - Digital Pro Indo`,
                metadata: { productName: productName },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    console.log("Menunggu Approval Server...");
                    // Simulasi atau fetch ke backend Anda
                    return true; 
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    alert(`Sukses membeli ${productName}!\nTXID: ${txid}`);
                    closeDetail();
                },
                onCancel: (paymentId) => console.log("Batal:", paymentId),
                onError: (error, payment) => {
                    if (payment) handleIncompletePayment(payment);
                    alert("Error: " + error.message);
                }
            });
        } catch (err) { 
            console.error("Payment error:", err); 
        }
    };

    // Inisialisasi awal
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.onclick = handleAuth;
    renderProductGrid();
    updateProfileUI();
});
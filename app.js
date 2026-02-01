document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;

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
    const pageCari = document.getElementById('page-cari');
    const pageKeranjang = document.getElementById('page-keranjang');
    const pageProfile = document.getElementById('page-profile');

    window.switchPage = function(pageName) {
        const target = pageName.trim().toLowerCase();
        
        // Reset active state di nav bar
        navItems.forEach(item => item.classList.remove('active'));

        // Sembunyikan semua halaman
        [pageHome, pageCari, pageKeranjang, pageProfile].forEach(page => {
            if (page) page.style.display = 'none';
        });

        // Tampilkan halaman target
        if (target === 'profil') {
            pageProfile.style.display = 'block';
            navItems[3].classList.add('active');
            updateProfileUI();
        } else if (target === 'cari') {
            pageCari.style.display = 'block';
            navItems[1].classList.add('active');
        } else if (target === 'keranjang') {
            pageKeranjang.style.display = 'block';
            navItems[2].classList.add('active');
        } else {
            pageHome.style.display = 'block';
            navItems[0].classList.add('active');
        }
    };

    // --- 4. FITUR FILTER & SEARCH ---

    // Filter Berdasarkan Kategori
    window.filterCategory = function(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const tag = product.querySelector('.category-tag').innerText.toLowerCase();
            if (category === 'all' || tag === category.toLowerCase()) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });
    };

    // Pencarian Produk Real-time
    window.searchProduct = function() {
        const input = document.getElementById('search-input').value.toLowerCase();
        const mainProducts = document.querySelectorAll('#main-grid .product-card');
        const resultsContainer = document.getElementById('search-results');
        
        // Bersihkan hasil sebelumnya
        resultsContainer.innerHTML = '';
        let found = false;

        mainProducts.forEach(product => {
            const name = product.querySelector('.product-name').innerText.toLowerCase();
            if (name.includes(input) && input !== '') {
                const clone = product.cloneNode(true);
                resultsContainer.appendChild(clone);
                found = true;
            }
        });

        if (!found && input !== '') {
            resultsContainer.innerHTML = '<p style="text-align:center; grid-column: span 2; color: #64748b;">Produk tidak ditemukan.</p>';
        } else if (input === '') {
            resultsContainer.innerHTML = '<p style="text-align:center; grid-column: span 2; color: #64748b;">Gunakan kotak di atas untuk mencari.</p>';
        }
    };

    // --- 5. FUNGSI CLEANUP PEMBAYARAN ---
    async function handleIncompletePayment(payment) {
        try {
            await fetch('/api/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    paymentId: payment.identifier, 
                    txid: payment.transaction.txid 
                })
            });
        } catch (err) { 
            console.error("Gagal sinkronisasi pembayaran:", err); 
        }
    }

    // --- 6. FUNGSI AUTH ---
    async function handleAuth() {
        const loginBtn = document.getElementById('login-btn');

        if (currentUser) {
            if (confirm("Apakah Anda ingin logout?")) {
                currentUser = null;
                updateProfileUI();
                alert("Berhasil Logout.");
            }
            return;
        }

        if (loginBtn) {
            loginBtn.innerText = "...";
            loginBtn.disabled = true;
        }

        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            
            currentUser = auth.user;
            updateProfileUI();
            alert("Halo " + currentUser.username + ", selamat datang!");
        } catch (err) {
            console.error("Auth error:", err);
            if (loginBtn) {
                loginBtn.innerText = "Login";
                loginBtn.disabled = false;
            }
            alert("Gagal Login. Pastikan buka di Pi Browser.");
        }
    }

    // --- 7. FUNGSI PEMBAYARAN ---
    window.handlePayment = async function(amount, productName) {
        if (!currentUser) return alert("Silakan Login terlebih dahulu!");

        try {
            await Pi.createPayment({
                amount: amount,
                memo: `Beli ${productName} - Digital Pro Indo`,
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
                    const res = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    if (res.ok) alert(`Sukses membeli ${productName}!`);
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

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.onclick = handleAuth;
});
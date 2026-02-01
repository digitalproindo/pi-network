document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;

    // --- 1. INISIALISASI SDK ---
    async function initPi() {
        try {
            // Menggunakan sandbox: true jika masih dalam tahap pengembangan
            await Pi.init({ version: "2.0", sandbox: false });
            console.log("Pi SDK Berhasil diinisialisasi");
        } catch (e) {
            console.error("Gagal inisialisasi SDK. Pastikan diakses via Pi Browser:", e);
        }
    }

    // --- 2. LOGIKA UPDATE UI PROFIL ---
    function updateProfileUI() {
        const profileUsername = document.getElementById('profile-username');
        const profileAddress = document.getElementById('profile-address');
        const loginBtn = document.getElementById('login-btn');

        if (currentUser) {
            // Tampilan saat Login
            if (profileUsername) profileUsername.innerText = currentUser.username;
            if (profileAddress) profileAddress.innerText = `Wallet UID: ${currentUser.uid}`;
            
            if (loginBtn) {
                loginBtn.innerText = "Logout";
                loginBtn.classList.add('btn-logout-style');
                loginBtn.disabled = false;
            }
        } else {
            // Tampilan saat Logout
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
        
        // Reset state aktif menu navigasi
        navItems.forEach(item => item.classList.remove('active'));

        if (target === 'profil') {
            if (pageHome) pageHome.style.display = 'none';
            if (pageProfile) pageProfile.style.display = 'block';
            if (navItems[3]) navItems[3].classList.add('active');
            updateProfileUI();
        } else if (target === 'beranda') {
            if (pageHome) pageHome.style.display = 'block';
            if (pageProfile) pageProfile.style.display = 'none';
            if (navItems[0]) navItems[0].classList.add('active');
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const labelElement = this.querySelector('.nav-text');
            if (labelElement) {
                switchPage(labelElement.innerText);
            }
        });
    });

    // --- 4. FUNGSI CLEANUP PEMBAYARAN ---
    async function handleIncompletePayment(payment) {
        console.warn("Ditemukan pembayaran tertunda:", payment.identifier);
        try {
            await fetch('/api/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    paymentId: payment.identifier, 
                    txid: payment.transaction.txid 
                })
            });
            console.log("Pembayaran tertunda berhasil disinkronisasi.");
        } catch (err) { 
            console.error("Gagal sinkronisasi pembayaran:", err); 
        }
    }

    // --- 5. FUNGSI AUTH (LOGIN & LOGOUT TOGGLE) ---
    async function handleAuth() {
        const loginBtn = document.getElementById('login-btn');

        // JIKA SUDAH LOGIN -> JALANKAN LOGOUT
        if (currentUser) {
            if (confirm("Apakah Anda ingin logout?")) {
                currentUser = null;
                updateProfileUI();
                alert("Berhasil Logout.");
            }
            return;
        }

        // JIKA BELUM LOGIN -> JALANKAN LOGIN
        if (loginBtn) {
            loginBtn.innerText = "Memuat...";
            loginBtn.disabled = true;
        }

        try {
            const scopes = ['username', 'payments', 'wallet_address'];
            const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
            
            currentUser = auth.user;
            console.log("Login Berhasil:", currentUser.username);
            
            updateProfileUI();
            alert(`Halo ${currentUser.username}, selamat datang!`);

        } catch (err) {
            console.error("Auth error:", err);
            alert("Gagal Login. Pastikan Anda membuka aplikasi melalui Pi Browser.");
            updateProfileUI(); // Reset UI tombol
        }
    }

    // Callback khusus untuk Pi Authenticate
    function onIncompletePaymentFound(payment) {
        handleIncompletePayment(payment);
    }

    // --- 6. FUNGSI PEMBAYARAN ---
    window.handlePayment = async function(amount, productName) {
        if (!currentUser) {
            alert("Silakan Login terlebih dahulu!");
            return;
        }

        try {
            const paymentData = {
                amount: amount,
                memo: `Beli ${productName} - Digital Pro Indo`,
                metadata: { productName: productName },
            };

            const callbacks = {
                onReadyForServerApproval: async (paymentId) => {
                    console.log("Menunggu persetujuan server untuk ID:", paymentId);
                    const res = await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    console.log("Menyelesaikan pembayaran di server...");
                    const res = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    if (res.ok) alert(`Sukses membeli ${productName}! Transaksi berhasil.`);
                },
                onCancel: (paymentId) => {
                    console.log("Pembayaran dibatalkan oleh pengguna:", paymentId);
                },
                onError: (error, payment) => {
                    console.error("Payment Error:", error);
                    if (payment) handleIncompletePayment(payment);
                    alert("Terjadi kesalahan saat pembayaran: " + error.message);
                }
            };

            await Pi.createPayment(paymentData, callbacks);
        } catch (err) { 
            console.error("Payment exception:", err); 
        }
    };

    // --- 7. EKSEKUSI AWAL ---
    await initPi();
    
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', handleAuth);
    }

    // Pastikan UI sesuai saat pertama kali dimuat
    updateProfileUI();
});
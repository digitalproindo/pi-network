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
    // Fungsi ini memastikan data user tampil di halaman profil
    function updateProfileUI() {
        const profileUsername = document.getElementById('profile-username');
        const profileAddress = document.getElementById('profile-address');

        if (currentUser) {
            if (profileUsername) profileUsername.innerText = currentUser.username;
            if (profileAddress) profileAddress.innerText = `Wallet UID: ${currentUser.uid}`;
        } else {
            if (profileUsername) profileUsername.innerText = "Belum Login";
            if (profileAddress) profileAddress.innerText = "Silakan login di halaman Beranda";
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
            pageHome.style.display = 'none';
            pageProfile.style.display = 'block';
            
            // Tandai icon Profil sebagai aktif
            if (navItems[3]) navItems[3].classList.add('active');
            
            // Tarik data user terbaru ke tampilan
            updateProfileUI();
        } else {
            pageHome.style.display = 'block';
            pageProfile.style.display = 'none';
            
            // Tandai icon Beranda sebagai aktif
            if (navItems[0]) navItems[0].classList.add('active');
        }
    }

    // Listener klik untuk Navigasi Bawah
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
        } catch (err) { 
            console.error("Gagal sinkronisasi pembayaran:", err); 
        }
    }

    // --- 5. FUNGSI LOGIN ---
    async function authPi() {
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.innerText = "Menghubungkan...";
            loginBtn.disabled = true;
        }

        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            
            currentUser = auth.user;
            console.log("Login Berhasil:", currentUser.username);
            
            if (loginBtn) {
                loginBtn.innerText = `User: ${currentUser.username} ✅`;
                loginBtn.style.backgroundColor = "#10b981";
                loginBtn.disabled = false;
            }

            // Langsung siapkan data untuk halaman profil
            updateProfileUI();
            alert("Halo " + currentUser.username + ", data profil sudah siap!");

        } catch (err) {
            console.error("Auth error:", err);
            if (loginBtn) {
                loginBtn.innerText = "Login ke Pi Wallet";
                loginBtn.disabled = false;
            }
            alert("Gagal Login. Pastikan Anda berada di Pi Browser.");
        }
    }

    // --- 6. FUNGSI PEMBAYARAN (GLOBAL) ---
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
    if (loginBtn) loginBtn.onclick = authPi;
});
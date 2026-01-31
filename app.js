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

    // --- 2. LOGIKA NAVIGASI (SPA) ---
    const navItems = document.querySelectorAll('.nav-item');
    const pageHome = document.getElementById('page-home');
    const pageProfile = document.getElementById('page-profile');
    const profileUsername = document.getElementById('profile-username');
    const profileAddress = document.getElementById('profile-address');

    function switchPage(pageName) {
        // Reset state aktif pada navigasi
        navItems.forEach(item => item.classList.remove('active'));

        if (pageName === 'profil') {
            pageHome.style.display = 'none';
            pageProfile.style.display = 'block';
            // Set menu Profil sebagai aktif
            document.querySelector('.nav-item:last-child').classList.add('active');
            
            // Isi data profil jika sudah login
            if (currentUser) {
                profileUsername.innerText = currentUser.username;
                profileAddress.innerText = `Wallet UID: ${currentUser.uid}`;
            } else {
                profileUsername.innerText = "Belum Login";
                profileAddress.innerText = "Silakan login di halaman beranda";
            }
        } else {
            pageHome.style.display = 'block';
            pageProfile.style.display = 'none';
            // Set menu Beranda sebagai aktif
            document.querySelector('.nav-item:first-child').classList.add('active');
        }
    }

    // Pasang Event Listener ke Bottom Nav
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const text = item.querySelector('.nav-text').innerText.toLowerCase();
            switchPage(text);
        });
    });

    // --- 3. FUNGSI CLEANUP PEMBAYARAN ---
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
            console.log("Pembayaran tertunda berhasil diselesaikan.");
        } catch (err) { 
            console.error("Gagal sinkronisasi pembayaran tertunda:", err); 
        }
    }

    // --- 4. FUNGSI LOGIN ---
    async function authPi() {
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.innerText = "Membuka Pi Wallet...";
            loginBtn.disabled = true;
        }

        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            
            currentUser = auth.user;
            console.log("Login sukses:", currentUser.username);

            if (loginBtn) {
                loginBtn.innerText = `User: ${currentUser.username} ✅`;
                loginBtn.style.backgroundColor = "#10b981";
                loginBtn.disabled = false;
            }
            alert("Selamat Datang, " + currentUser.username);

        } catch (err) {
            console.error("Autentikasi gagal:", err);
            if (loginBtn) {
                loginBtn.innerText = "Login ke Pi Wallet";
                loginBtn.disabled = false;
            }
            alert("Gagal terhubung ke Pi Network.");
        }
    }

    // --- 5. FUNGSI PEMBAYARAN (GLOBAL) ---
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
            console.error("CreatePayment error:", err); 
        }
    };

    // Pasang Event ke tombol login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.onclick = authPi;
});
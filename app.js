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

            // Tampilan saat Login

            if (profileUsername) profileUsername.innerText = currentUser.username;

            if (profileAddress) profileAddress.innerText = `Wallet UID: ${currentUser.uid}`;

           

            // Update Tombol di Header jadi Logout

            if (loginBtn) {

                loginBtn.innerText = "Logout";

                loginBtn.classList.add('btn-logout-style');

            }

        } else {

            // Tampilan saat Logout

            if (profileUsername) profileUsername.innerText = "Belum Login";

            if (profileAddress) profileAddress.innerText = "Silakan login untuk melihat detail akun.";

           

            // Update Tombol di Header jadi Login

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

            pageHome.style.display = 'none';

            pageProfile.style.display = 'block';

            if (navItems[3]) navItems[3].classList.add('active');

            updateProfileUI();

        } else if (target === 'beranda') {

            pageHome.style.display = 'block';

            pageProfile.style.display = 'none';

            if (navItems[0]) navItems[0].classList.add('active');

        }

        // Tambahkan logika untuk 'cari' atau 'keranjang' di sini jika sudah ada halamannya

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

        } catch (err) {

            console.error("Gagal sinkronisasi pembayaran:", err);

        }

    }



    // --- 5. FUNGSI AUTH (LOGIN & LOGOUT TOGGLE) ---

    async function handleAuth() {

        const loginBtn = document.getElementById('login-btn');



        // JIKA SUDAH LOGIN -> JALANKAN LOGOUT

        if (currentUser) {

            const yakin = confirm("Apakah Anda ingin logout?");

            if (yakin) {

                currentUser = null;

                updateProfileUI();

                alert("Berhasil Logout.");

            }

            return;

        }



        // JIKA BELUM LOGIN -> JALANKAN LOGIN

        if (loginBtn) {

            loginBtn.innerText = "...";

            loginBtn.disabled = true;

        }



        try {

            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {

                handleIncompletePayment(payment);

            });

           

            currentUser = auth.user;

            console.log("Login Berhasil:", currentUser.username);

           

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



    // --- 6. FUNGSI PEMBAYARAN ---

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

                        headers: { 'Content-Type':
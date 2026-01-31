document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;

    // 1. Inisialisasi SDK
    // sandbox: false digunakan karena Anda sudah di domain resmi vercel
    try {
        await Pi.init({ version: "2.0", sandbox: false });
        console.log("Pi SDK Berhasil diinisialisasi");
    } catch (e) {
        console.error("Gagal inisialisasi SDK:", e);
    }

    // 2. Fungsi Bersihkan Transaksi Menggantung (Pencegah Expired Error)
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

    // 3. Fungsi Login Utama
    async function authPi() {
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.innerText = "Membuka Pi Wallet...";
            loginBtn.disabled = true; // Cegah klik ganda
        }

        try {
            // Meminta autentikasi
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            
            currentUser = auth.user;
            console.log("Login sukses:", currentUser.username);

            // Update UI
            if (loginBtn) {
                loginBtn.innerText = `User: ${currentUser.username} ✅`;
                loginBtn.style.backgroundColor = "#10b981";
                loginBtn.disabled = false;
            }
            alert("Selamat Datang, " + currentUser.username);

        } catch (err) {
            console.error("Autentikasi gagal:", err);
            if (loginBtn) {
                loginBtn.innerText = "Login";
                loginBtn.disabled = false;
            }
            alert("Gagal terhubung. Pastikan domain sudah di-Submit di Portal Developer.");
        }
    }

    // 4. Fungsi Pembayaran Global
    window.handlePayment = async function(amount, productName) {
        if (!currentUser) {
            return alert("Silakan Login terlebih dahulu!");
        }

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

    // 5. Event Listener
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = authPi;
    }
});
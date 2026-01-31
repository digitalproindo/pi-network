document.addEventListener("DOMContentLoaded", () => {
    const Pi = window.Pi;
    let currentUser = null;

    // 1. Inisialisasi SDK dengan logging aktif untuk debugging
    console.log("Memulai Inisialisasi Pi SDK...");
    Pi.init({ version: "2.0", sandbox: true });

    // 2. Fungsi Bersihkan Transaksi Menggantung (Pencegah Timeout)
    async function handleIncompletePayment(payment) {
        console.warn("Ditemukan pembayaran menggantung, mencoba menyelesaikan...", payment.identifier);
        try {
            await fetch('/api/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    paymentId: payment.identifier, 
                    txid: payment.transaction.txid 
                })
            });
            console.log("Sinkronisasi pembayaran tertunda berhasil.");
        } catch (err) { 
            console.error("Gagal sinkronisasi pembayaran tertunda:", err); 
        }
    }

    // 3. Fungsi Login dengan Feedback Visual
    async function authPi() {
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) loginBtn.innerText = "Menghubungkan...";

        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            
            currentUser = auth.user;
            console.log("Login sukses sebagai:", currentUser.username);

            // Update UI setelah berhasil login
            if (loginBtn) {
                loginBtn.innerText = `User: ${currentUser.username} ✅`;
                loginBtn.style.backgroundColor = "#10b981"; // Hijau sukses
            }
            alert("Selamat Datang, " + currentUser.username);
        } catch (err) {
            console.error("Autentikasi gagal:", err);
            if (loginBtn) loginBtn.innerText = "Login";
            alert("Gagal terhubung. Pastikan Anda membuka di Pi Browser dan domain sudah terverifikasi.");
        }
    }

    // 4. Fungsi Pembayaran Dinamis (Global agar bisa dipanggil dari HTML)
    window.handlePayment = async function(amount, productName) {
        if (!currentUser) {
            return alert("Silakan hubungkan dompet (Login) terlebih dahulu!");
        }

        console.log(`Memulai pembayaran untuk: ${productName} senilai ${amount} Pi`);

        try {
            await Pi.createPayment({
                amount: amount,
                memo: `Beli ${productName} - Digital Pro Indo`,
                metadata: { productName: productName },
            }, {
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
                    console.log("Blockchain sukses, menyelesaikan transaksi...");
                    const res = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    if (res.ok) alert(`Sukses! Anda telah membeli ${productName}.`);
                },
                onCancel: (paymentId) => {
                    console.log("Pembayaran dibatalkan:", paymentId);
                },
                onError: (error, payment) => {
                    console.error("Kesalahan pembayaran:", error.message);
                    if (payment) handleIncompletePayment(payment);
                    alert("Gagal melakukan pembayaran: " + error.message);
                }
            });
        } catch (err) { 
            console.error("Gagal memanggil createPayment:", err); 
        }
    };

    // 5. Pastikan Event Listener terpasang dengan benar
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = authPi;
        console.log("Event listener tombol login aktif.");
    }
});
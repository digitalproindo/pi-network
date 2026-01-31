// Memastikan script berjalan setelah DOM dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", () => {
    const Pi = window.Pi;
    let currentUser = null;

    // 1. Inisialisasi SDK
    // sandbox: true memungkinkan testing di browser biasa (Vercel/Desktop)
    Pi.init({ version: "2.0", sandbox: true });

    console.log("Pi SDK Berhasil Dimuat");

    // --- FUNGSI AUTENTIKASI ---
    async function authPi() {
        try {
            console.log("Mencoba Login...");
            
            // Meminta izin akses data user dan pembayaran
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                console.warn("Pembayaran tertunda terdeteksi:", payment);
                handleIncompletePayment(payment);
            });

            currentUser = auth.user;
            console.log("Berhasil Login:", currentUser.username);

            // Perbarui UI Tombol Login
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                loginBtn.innerText = `User: ${currentUser.username} ✅`;
                loginBtn.style.backgroundColor = "#10b981"; // Hijau sukses
            }
            
            alert("Dompet Berhasil Terhubung!\nSelamat datang, " + currentUser.username);

        } catch (err) {
            console.error("Gagal Login:", err);
            alert("Koneksi Gagal. Pastikan Anda membuka di Pi Browser dan memberikan izin akses.");
        }
    }

    // --- FUNGSI PENANGANAN PEMBAYARAN TERGANTUNG ---
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
            console.log("Pembayaran tertunda berhasil diselesaikan secara otomatis.");
        } catch (err) {
            console.error("Gagal sinkronisasi pembayaran tertunda:", err);
        }
    }

    // --- FUNGSI PEMBAYARAN (TESTNET) ---
    async function handlePayment() {
        if (!currentUser) {
            return alert("Silakan klik 'Hubungkan Pi Wallet' terlebih dahulu!");
        }

        try {
            await Pi.createPayment({
                amount: 0.005,
                memo: "Test Purchase - Digital Pro Indo",
                metadata: { productId: "item-123" },
            }, {
                // Tahap A: Persetujuan Backend Anda
                onReadyForServerApproval: async (paymentId) => {
                    console.log("Approval Server untuk ID:", paymentId);
                    const response = await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    return response.ok;
                },
                // Tahap B: Konfirmasi Transaksi Blockchain Selesai
                onReadyForServerCompletion: async (paymentId, txid) => {
                    console.log("Blockchain Sukses. TXID:", txid);
                    const response = await fetch('/api/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId, txid })
                    });
                    
                    if (response.ok) {
                        alert("PEMBAYARAN SUKSES!\nSaldo Testnet telah berpindah.");
                    } else {
                        alert("Pembayaran terkirim namun gagal verifikasi server.");
                    }
                },
                onCancel: (paymentId) => {
                    console.log("Pembayaran dibatalkan pengguna. ID:", paymentId);
                },
                onError: (error, payment) => {
                    console.error("Kesalahan Pembayaran:", error);
                    if (payment) {
                        handleIncompletePayment(payment);
                    }
                    alert("Terjadi kesalahan: " + error.message);
                }
            });
        } catch (err) {
            console.error("Gagal memanggil CreatePayment:", err);
        }
    }

    // --- PASANG EVENT KE TOMBOL ---
    const btnLogin = document.getElementById('login-btn');
    const btnPay = document.getElementById('pay-button');

    if (btnLogin) btnLogin.onclick = authPi;
    if (btnPay) btnPay.onclick = handlePayment;
});
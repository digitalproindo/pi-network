document.addEventListener("DOMContentLoaded", () => {
    const Pi = window.Pi;
    let currentUser = null;

    // 1. Inisialisasi SDK
    Pi.init({ version: "2.0", sandbox: true });

    // --- FUNGSI PENANGANAN PEMBAYARAN MENGGANTUNG (PEMBERSIH ERROR) ---
    // Fungsi ini wajib dipanggil saat ada transaksi lama yang "Expired" atau "Pending"
    async function handleIncompletePayment(payment) {
        console.warn("Menyelesaikan pembayaran menggantung otomatis...", payment.identifier);
        try {
            const response = await fetch('/api/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    paymentId: payment.identifier, 
                    txid: payment.transaction.txid 
                })
            });
            if (response.ok) {
                console.log("Transaksi lama berhasil dibersihkan.");
            }
        } catch (err) {
            console.error("Gagal membersihkan transaksi lama:", err);
        }
    }

    // --- FUNGSI AUTENTIKASI ---
    async function authPi() {
        try {
            // Callback (payment) di bawah ini otomatis terpanggil jika ada transaksi macet
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });

            currentUser = auth.user;
            
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                loginBtn.innerText = `User: ${currentUser.username} ✅`;
                loginBtn.style.backgroundColor = "#10b981";
            }
            alert("Terhubung sebagai: " + currentUser.username);

        } catch (err) {
            alert("Koneksi Gagal. Gunakan Pi Browser.");
        }
    }

    // --- FUNGSI PEMBAYARAN ---
    async function handlePayment() {
        if (!currentUser) return alert("Silakan Login terlebih dahulu!");

        try {
            await Pi.createPayment({
                amount: 0.005,
                memo: "Pembelian Digital Pro Indo",
                metadata: { productId: "item-123" },
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
                    if (res.ok) alert("PEMBAYARAN SUKSES!");
                },
                onCancel: (paymentId) => console.log("Dibatalkan:", paymentId),
                onError: (error, payment) => {
                    if (payment) handleIncompletePayment(payment); // Bersihkan jika error di tengah jalan
                    alert("Error: " + error.message);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    // Event Listeners
    document.getElementById('login-btn').onclick = authPi;
    document.getElementById('pay-button').onclick = handlePayment;
});
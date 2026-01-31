document.addEventListener("DOMContentLoaded", () => {
    const Pi = window.Pi;
    let currentUser = null;

    // Inisialisasi SDK
    Pi.init({ version: "2.0", sandbox: true });

    // Fungsi Bersihkan Transaksi Menggantung
    async function handleIncompletePayment(payment) {
        try {
            await fetch('/api/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
            });
        } catch (err) { console.error("Cleanup error:", err); }
    }

    // Fungsi Login
    async function authPi() {
        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            currentUser = auth.user;
            
            // Ubah teks tombol login menjadi username
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) {
                loginBtn.innerText = `User: ${currentUser.username} ✅`;
                loginBtn.style.backgroundColor = "#10b981";
            }
            alert("Terhubung: " + currentUser.username);
        } catch (err) {
            alert("Gagal terhubung. Gunakan Pi Browser.");
        }
    }

    // Fungsi Pembayaran Dinamis (Menerima amount dan nama produk)
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
                    if (res.ok) alert(`Sukses Membeli ${productName}!`);
                },
                onCancel: (paymentId) => console.log("Batal:", paymentId),
                onError: (error, payment) => {
                    if (payment) handleIncompletePayment(payment);
                    alert("Error: " + error.message);
                }
            });
        } catch (err) { console.error(err); }
    };

    // Pasang Event Listener ke Tombol Login
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) loginBtn.onclick = authPi;
});
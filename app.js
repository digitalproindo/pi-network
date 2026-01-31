const Pi = window.Pi;
let currentUser = null;

// Inisialisasi SDK v2.0
// Tips: Gunakan sandbox: true jika Anda mengetes di browser desktop/Vercel luar Pi Browser
Pi.init({ version: "2.0", sandbox: true });

async function authPi() {
    try {
        // Autentikasi mencakup izin username, payments, dan wallet address
        const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
            console.log("Ditemukan pembayaran tertunda:", payment);
            // Secara otomatis mencoba menyelesaikan pembayaran yang menggantung
            handleIncompletePayment(payment);
        });

        currentUser = auth.user;
        console.log("Login sukses sebagai:", currentUser.username);

        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = `Halo, ${currentUser.username} ✅`;
            btn.style.backgroundColor = "#28a745";
        }
    } catch (err) {
        console.error("Autentikasi gagal:", err);
        alert("Gagal terhubung ke Pi Network.");
    }
}

// Fungsi khusus menangani pembayaran yang belum selesai (mencegah timeout di transaksi berikutnya)
async function handleIncompletePayment(payment) {
    await fetch('/api/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid })
    });
}

async function handlePayment() {
    if (!currentUser) return alert("Silakan hubungkan dompet (Login) terlebih dahulu.");

    try {
        await Pi.createPayment({
            amount: 0.005,
            memo: "Test Purchase - Digital Pro Indo",
            metadata: { productId: "item-123" },
        }, {
            // Langkah 1: Server Anda menyetujui transaksi
            onReadyForServerApproval: async (paymentId) => {
                console.log("Meminta persetujuan server (Approve)...");
                const response = await fetch('/api/approve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId })
                });
                return response.ok;
            },
            // Langkah 2: Server Anda mengonfirmasi transaksi selesai setelah user membayar
            onReadyForServerCompletion: async (paymentId, txid) => {
                console.log("Mengonfirmasi penyelesaian ke server (Complete)...");
                const response = await fetch('/api/complete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId, txid })
                });
                
                if (response.ok) {
                    alert("TRANSAKSI BERHASIL!\nSaldo Testnet telah berpindah.");
                }
            },
            onCancel: (paymentId) => {
                console.log("Pembayaran dibatalkan oleh pengguna.");
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
        console.error("Gagal membuat pembayaran:", err);
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById('login-btn');
    const payBtn = document.getElementById('pay-button');

    if (loginBtn) loginBtn.onclick = authPi;
    if (payBtn) payBtn.onclick = handlePayment;
});
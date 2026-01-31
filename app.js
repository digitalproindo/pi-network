const Pi = window.Pi;
let currentUser = null;

// Inisialisasi SDK v2.0
// sandbox: true memungkinkan testing di browser biasa (Chrome/Vercel)
Pi.init({ version: "2.0", sandbox: true });

async function authPi() {
    console.log("Mencoba menghubungkan ke Pi Network...");
    try {
        // Melakukan autentikasi user
        const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
            console.log("Ada pembayaran tertunda dari transaksi sebelumnya:", payment);
            handleIncompletePayment(payment);
        });

        currentUser = auth.user;
        console.log("Login sukses:", currentUser.username);

        // Update UI setelah login berhasil
        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = `Halo, ${currentUser.username} ✅`;
            btn.style.backgroundColor = "#28a745";
            btn.style.color = "white";
        }
        alert("Dompet terhubung: " + currentUser.username);
    } catch (err) {
        console.error("Autentikasi gagal:", err);
        alert("Gagal terhubung. Pastikan Anda membuka ini di Pi Browser.");
    }
}

// Menyelesaikan pembayaran yang belum tuntas di sisi server
async function handleIncompletePayment(payment) {
    console.log("Menyelesaikan pembayaran tertunda...");
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
        console.error("Gagal sinkronisasi pembayaran tertunda:", err);
    }
}

async function handlePayment() {
    if (!currentUser) {
        return alert("Klik tombol 'Hubungkan Pi Wallet' terlebih dahulu!");
    }

    console.log("Memulai proses pembayaran...");
    try {
        await Pi.createPayment({
            amount: 0.005,
            memo: "Test Purchase - Digital Pro Indo",
            metadata: { productId: "item-123" },
        }, {
            // Tahap 1: Persetujuan Server (Approve)
            onReadyForServerApproval: async (paymentId) => {
                console.log("Pembayaran dibuat. ID:", paymentId);
                const response = await fetch('/api/approve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId })
                });
                return response.ok;
            },
            // Tahap 2: Penyelesaian Server (Complete)
            onReadyForServerCompletion: async (paymentId, txid) => {
                console.log("User telah membayar. TXID:", txid);
                const response = await fetch('/api/complete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId, txid })
                });
                
                if (response.ok) {
                    alert("PEMBAYARAN BERHASIL!\nTerima kasih telah berbelanja.");
                } else {
                    alert("Pembayaran terkirim tapi gagal verifikasi server.");
                }
            },
            onCancel: (paymentId) => {
                console.log("User membatalkan pembayaran ID:", paymentId);
            },
            onError: (error, payment) => {
                console.error("Payment Error:", error);
                if (payment) {
                    handleIncompletePayment(payment);
                }
                alert("Kesalahan transaksi: " + error.message);
            }
        });
    } catch (err) {
        console.error("Gagal memanggil Pi.createPayment:", err);
    }
}

// Inisialisasi Event Listener setelah DOM siap
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById('login-btn');
    const payBtn = document.getElementById('pay-button');

    if (loginBtn) {
        loginBtn.onclick = () => {
            console.log("Tombol Login diklik.");
            authPi();
        };
    }

    if (payBtn) {
        payBtn.onclick = () => {
            console.log("Tombol Bayar diklik.");
            handlePayment();
        };
    }
});
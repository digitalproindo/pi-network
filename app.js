const Pi = window.Pi;
let currentUser = null;

// Inisialisasi SDK
Pi.init({ version: "2.0" });

async function authPi() {
    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        const auth = await Pi.authenticate(scopes, (payment) => {
            console.log("Incomplete payment:", payment);
        });
        
        currentUser = auth.user;
        alert("LOGIN BERHASIL: " + auth.user.username);
        
        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = "Connected ✅";
            btn.style.backgroundColor = "#28a745";
        }
    } catch (err) {
        alert("Login Gagal: " + err.message);
    }
}

async function handlePayment() {
    if (!currentUser) return alert("Silakan Connect Wallet dahulu!");

    console.log("Memulai proses transaksi...");

    try {
        await Pi.createPayment({
            amount: 0.005,
            memo: "DP Unit Villa - PT. Digital Property Indonesia",
            metadata: { productId: "villa-001" },
        }, {
            onReadyForServerApproval: async (paymentId) => {
                console.log("Menghubungi Backend Approval untuk ID:", paymentId);
                
                // Memanggil fungsi serverless di folder api/
                await fetch('/api/approve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId })
                });
                
                console.log("Server Approval Sukses!");
            },
            onReadyForServerCompletion: (paymentId, txid) => {
                alert("PEMBAYARAN BERHASIL!\nTXID: " + txid);
            },
            onCancel: (paymentId) => {
                console.log("Pembayaran dibatalkan.");
            },
            onError: (error) => {
                alert("Status: " + error.message);
            }
        });
    } catch (err) {
        console.error("Gagal memicu dompet:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login-btn').onclick = authPi;
    document.getElementById('pay-button').onclick = handlePayment;
});
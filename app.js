const Pi = window.Pi;
let currentUser = null;

Pi.init({ version: "2.0" });

async function authPi() {
    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        const auth = await Pi.authenticate(scopes, (payment) => {
            console.log("Incomplete payment found", payment);
        });
        currentUser = auth.user;
        
        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = "Connected ✅";
            btn.style.backgroundColor = "#28a745";
        }
        alert("Login Berhasil!");
    } catch (err) {
        alert("Login Error: " + err.message);
    }
}

async function handlePayment() {
    if (!currentUser) return alert("Silakan Login Dahulu");

    try {
        console.log("Memicu transaksi...");
        
        await Pi.createPayment({
            amount: 0.005,
            memo: "Pembayaran Villa Digital Property",
            metadata: { productId: "villa-001" },
        }, {
            onReadyForServerApproval: async (paymentId) => {
                console.log("Menghubungi Backend Approval...");
                
                // MENGHUBUNGI API VERCEL YANG KITA BUAT TADI
                await fetch('/api/approve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId })
                });

                console.log("Server Approval Berhasil!");
            },
            onReadyForServerCompletion: (paymentId, txid) => {
                alert("TRANSAKSI SUKSES!\nTXID: " + txid);
            },
            onCancel: (paymentId) => console.log("Dibatalkan"),
            onError: (error) => alert("Error: " + error.message)
        });
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login-btn').onclick = authPi;
    document.getElementById('pay-button').onclick = handlePayment;
});
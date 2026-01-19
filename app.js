const Pi = window.Pi;
let currentUser = null;

// Inisialisasi SDK
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
    if (!currentUser) return alert("Silakan Login Dahulu!");

    console.log("Memulai jabat tangan dengan server Pi...");

    try {
        await Pi.createPayment({
            amount: 0.005,
            memo: "DP Unit Villa - Digital Property",
            metadata: { productId: "villa-001" },
        }, {
            onReadyForServerApproval: async (paymentId) => {
                console.log("Menghubungi Backend Approval...");
                
                // Memanggil file api/approve.js yang kita buat di Vercel
                try {
                    await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    console.log("Server Approval Berhasil!");
                } catch (e) {
                    console.error("Gagal menghubungi API Approval", e);
                }
            },
            onReadyForServerCompletion: (paymentId, txid) => {
                alert("PEMBAYARAN SUKSES!\nTXID: " + txid);
            },
            onCancel: (paymentId) => {
                console.log("Pembayaran dibatalkan oleh pengguna.");
            },
            onError: (error) => {
                alert("Status: " + error.message);
            }
        });
    } catch (err) {
        console.error("Critical Error:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById('login-btn');
    const payBtn = document.getElementById('pay-button');
    if (loginBtn) loginBtn.onclick = authPi;
    if (payBtn) payBtn.onclick = handlePayment;
});
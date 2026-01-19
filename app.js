const Pi = window.Pi;
let currentUser = null;

// 1. Inisialisasi SDK secepat mungkin saat script dimuat
Pi.init({ version: "2.0" });

// 2. Fungsi Autentikasi (Tombol Connect)
async function authPi() {
    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Memanggil jendela login asli Pi
        const auth = await Pi.authenticate(scopes, (payment) => {
            console.log("Ditemukan pembayaran menggantung:", payment);
        });

        currentUser = auth.user;
        alert("BERHASIL! Selamat datang " + auth.user.username);
        
        // Update tampilan tombol Connect agar user tahu sudah terhubung
        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = "Connected ✅";
            btn.style.backgroundColor = "#28a745";
            btn.style.color = "white";
        }
    } catch (err) {
        alert("Gagal Login: " + err.message);
    }
}

// 3. Fungsi Pembayaran (Tombol Beli Sekarang)
async function handlePayment() {
    if (!currentUser) {
        alert("Silakan klik 'Connect to Pi Wallet' terlebih dahulu!");
        return;
    }

    // Konsol log sebagai indikator proses dimulai di latar belakang
    console.log("Memulai proses pembayaran...");

    try {
        const paymentData = {
            amount: 0.005,
            memo: "DP Properti - PT. Digital Property Indonesia",
            metadata: { productId: "property-001" },
        };

        await Pi.createPayment(paymentData, {
            onReadyForServerApproval: async (paymentId) => {
                console.log("Menghubungi Backend Approval untuk ID:", paymentId);
                
                // MENGHUBUNGI API VERCEL (api/approve.js)
                // Ini adalah langkah kunci untuk menghindari timeout 60 detik
                try {
                    await fetch('/api/approve', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ paymentId })
                    });
                    console.log("Approval Berhasil dikirim ke Server Pi!");
                } catch (e) {
                    console.error("Gagal menghubungi API Backend:", e);
                }
            },
            onReadyForServerCompletion: (paymentId, txid) => {
                // Muncul saat user sudah memasukkan passphrase dan transaksi sukses di blockchain
                alert("TRANSAKSI BERHASIL!\nTXID: " + txid);
                console.log("Transaksi Selesai:", txid);
            },
            onCancel: (paymentId) => {
                console.log("Pembayaran dibatalkan pengguna.");
            },
            onError: (error, payment) => {
                alert("Status: " + error.message);
                console.error("Payment Error:", error);
            }
        });

    } catch (err) {
        console.error("Gagal memicu jendela dompet:", err);
    }
}

// 4. Hubungkan fungsi ke elemen HTML setelah halaman siap
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById('login-btn');
    const payBtn = document.getElementById('pay-button');

    if (loginBtn) {
        loginBtn.onclick = authPi;
    }

    if (payBtn) {
        payBtn.onclick = handlePayment;
    }
});
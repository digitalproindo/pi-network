const Pi = window.Pi;
Pi.init({ version: "2.0" });

// Pastikan variabel ini berada di paling atas agar bisa diakses semua fungsi
let isAuthorized = false; 

async function authPi() {
    try {
        console.log("Memulai Autentikasi...");
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Proses login
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        
        // JIKA BERHASIL:
        isAuthorized = true; 
        alert("Koneksi Berhasil! Halo " + auth.user.username);
        
        // Ubah teks tombol login agar user tahu mereka sudah konek
        const loginBtn = document.getElementById('login-btn');
        loginBtn.innerText = "Connected: " + auth.user.username;
        loginBtn.style.background = "#28a745"; // Berubah jadi Hijau sukses
        
    } catch (err) {
        isAuthorized = false;
        alert("Gagal Login: " + err.message);
        console.error(err);
    }
}

async function handlePayment() {
    // Cek status login sebelum transaksi
    if (!isAuthorized) {
        alert("Sistem: Anda belum login. Menjalankan koneksi otomatis...");
        await authPi(); // Panggil fungsi login jika belum
        return;
    }

    try {
        const paymentData = {
            amount: 1500,
            memo: "Pembelian Properti - PT. DIGITAL PROPERTY INDONESIA",
            metadata: { productId: "premium-001" },
        };

        const paymentCallbacks = {
            onReadyForServerApproval: (id) => alert("Menunggu Approval Server..."),
            onReadyForServerCompletion: (id, txid) => alert("Bayar Berhasil! TXID: " + txid),
            onCancel: (id) => console.log("Batal"),
            onError: (err, pay) => alert("Error Pembayaran: " + err.message)
        };

        await Pi.createPayment(paymentData, paymentCallbacks);
    } catch (err) {
        alert("Sistem Error: " + err.message);
    }
}

function onIncompletePaymentFound(payment) { }

// Pastikan Event Listener terpasang dengan benar
document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById('login-btn');
    const payBtn = document.getElementById('pay-button');

    if (loginBtn) loginBtn.onclick = authPi;
    if (payBtn) payBtn.onclick = handlePayment;
});
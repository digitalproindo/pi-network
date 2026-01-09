const Pi = window.Pi;
Pi.init({ version: "2.0" });

// Pastikan variabel ini global agar status login tersimpan
let currentUser = null;

async function authPi() {
    try {
        // 'payments' wajib ada di sini agar tombol beli tidak error
        const scopes = ['username', 'payments', 'wallet_address']; 
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        
        currentUser = auth.user;
        alert("Koneksi Berhasil! Selamat datang, " + auth.user.username);
        
        // Sembunyikan tombol login setelah berhasil
        document.getElementById('login-btn').style.display = 'none';
    } catch (err) {
        alert("Gagal Login: " + err.message);
    }
}

async function handlePayment() {
    // Cek apakah user sudah login (punya scope) sebelum bayar
    if (!currentUser) {
        alert("Silakan klik 'Connect to Pi Wallet' terlebih dahulu!");
        authPi(); // Pemicu otomatis login jika belum login
        return;
    }

    try {
        const paymentData = {
            amount: 1500,
            memo: "Unit Properti - PT. DIGITAL PROPERTY INDONESIA",
            metadata: { productId: "premium-villa-001" },
        };

        const paymentCallbacks = {
            onReadyForServerApproval: (id) => alert("Menunggu Approval..."),
            onReadyForServerCompletion: (id, txid) => alert("Bayar Berhasil! TXID: " + txid),
            onCancel: (id) => console.log("Batal"),
            onError: (err, pay) => alert("Error: " + err.message)
        };

        await Pi.createPayment(paymentData, paymentCallbacks);
    } catch (err) {
        alert("Sistem Error: " + err.message);
    }
}

function onIncompletePaymentFound(payment) { }

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('login-btn').addEventListener('click', authPi);
    document.getElementById('pay-button').addEventListener('click', handlePayment);
});
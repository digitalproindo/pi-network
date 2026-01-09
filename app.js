// Inisialisasi Pi SDK secara global
const Pi = window.Pi;
Pi.init({ version: "2.0" });

let userAuthenticated = false;

async function authPi() {
    try {
        // Memaksa permintaan scope agar tidak error 'payments'
        const scopes = ['username', 'payments', 'wallet_address'];
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        
        userAuthenticated = true;
        alert("Login Berhasil: " + auth.user.username);
        
        // Visual feedback
        const btn = document.getElementById('login-btn');
        btn.innerHTML = "Wallet Connected";
        btn.style.backgroundColor = "#28a745"; 
    } catch (err) {
        alert("Login Gagal: " + err.message);
        console.error(err);
    }
}

async function handlePayment() {
    // Jika belum login, jalankan authPi dulu secara otomatis
    if (!userAuthenticated) {
        alert("Melakukan koneksi wallet...");
        await authPi();
    }

    try {
        const payment = await Pi.createPayment({
            amount: 1500,
            memo: "Property Unit - PT. DIGITAL PROPERTY INDONESIA",
            metadata: { id: "P001" },
        }, {
            onReadyForServerApproval: (id) => alert("Menunggu Approval..."),
            onReadyForServerCompletion: (id, txid) => alert("Sukses! TXID: " + txid),
            onCancel: (id) => console.log("Batal"),
            onError: (err) => alert("Error: " + err.message),
        });
    } catch (e) {
        console.error(e);
    }
}

function onIncompletePaymentFound(payment) {
    // Kosongkan untuk simulasi awal
}

// Pastikan tombol terhubung
window.onload = () => {
    document.getElementById('login-btn').onclick = authPi;
    document.getElementById('pay-button').onclick = handlePayment;
};
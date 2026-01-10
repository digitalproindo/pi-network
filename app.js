const Pi = window.Pi;

// Fungsi untuk memastikan SDK siap sebelum dijalankan
async function startApp() {
    try {
        await Pi.init({ version: "2.0" });
        console.log("Pi SDK siap.");
    } catch (err) {
        console.error("Gagal inisialisasi SDK:", err);
    }
}

function authPi() {
    alert("Sistem: Membuka Jendela Autentikasi Pi..."); 
    
    // Menggunakan metode callback murni untuk kompatibilitas maksimal
    Pi.authenticate(['username', 'payments', 'wallet_address'], function(payment) {
        console.log("Pembayaran tertunda:", payment);
    }).then(function(auth) {
        alert("KONEKSI SUKSES! Halo " + auth.user.username);
        document.getElementById('login-btn').innerText = "Connected";
        document.getElementById('login-btn').style.background = "green";
    }).catch(function(error) {
        alert("Kesalahan dari Pi: " + error.message);
    });
}

// Jalankan inisialisasi
startApp();

// Pasang fungsi ke tombol
window.onload = function() {
    document.getElementById('login-btn').onclick = authPi;
    document.getElementById('pay-button').onclick = handlePayment;
};
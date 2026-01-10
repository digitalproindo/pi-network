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

async function authPi() {
    // Tetap gunakan alert untuk memastikan tombol merespon
    alert("Sistem: Membuka Jendela Autentikasi Pi..."); 

    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Memanggil autentikasi
        const auth = await Pi.authenticate(scopes, (payment) => {
            console.log("Pembayaran tertunda:", payment);
        });

        alert("Koneksi Berhasil! Selamat datang " + auth.user.username);
        
        // Update tampilan tombol
        const btn = document.getElementById('login-btn');
        btn.innerText = "Connected: " + auth.user.username;
        btn.style.backgroundColor = "#28a745";
    } catch (err) {
        // Jika ada error dari SDK, tampilkan pesannya
        alert("Pesan dari Pi: " + err.message);
    }
}

// Jalankan inisialisasi
startApp();

// Pasang fungsi ke tombol
window.onload = function() {
    document.getElementById('login-btn').onclick = authPi;
    document.getElementById('pay-button').onclick = handlePayment;
};
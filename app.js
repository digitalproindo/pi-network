// Inisialisasi awal
const Pi = window.Pi;

async function initPi() {
    try {
        await Pi.init({ version: "2.0" });
        console.log("Pi SDK initialized");
    } catch (e) {
        alert("Gagal memuat SDK Pi: " + e.message);
    }
}

// Jalankan init segera
initPi();

async function authPi() {
    console.log("Tombol diklik, mencoba autentikasi...");
    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Memunculkan pop-up autentikasi
        const auth = await Pi.authenticate(scopes, (payment) => {
            console.log("Incomplete payment:", payment);
        });

        alert("Berhasil! Selamat datang " + auth.user.username);
        document.getElementById('login-btn').innerText = "Connected: " + auth.user.username;
        document.getElementById('login-btn').style.background = "green";
        
    } catch (err) {
        alert("Gagal Koneksi: " + err.message);
        console.error(err);
    }
}

// Menggunakan metode penugasan langsung agar lebih pakem
window.onload = function() {
    const btn = document.getElementById('login-btn');
    if (btn) {
        btn.onclick = function() {
            authPi();
        };
    } else {
        alert("Tombol login-btn tidak ditemukan di HTML!");
    }
};
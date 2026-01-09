const Pi = window.Pi;
Pi.init({ version: "2.0" });

async function authPi() {
    try {
        console.log("Memulai Autentikasi...");
        const scopes = ['username', 'payments'];
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        
        // Ganti console.log dengan alert agar terlihat di HP
        alert(`Halo ${auth.user.username}, selamat datang di PT. Digital Property Indonesia!`);
        
        // Jika berhasil sampai sini, Step 5 di Portal akan HIJAU
    } catch (err) {
        alert("Gagal Login: " + err.message);
        console.error("Gagal autentikasi:", err);
    }
}

function onIncompletePaymentFound(payment) {
    console.log("Payment incomplete found", payment);
}

// Jalankan otomatis saat halaman selesai dimuat
window.onload = function() {
    authPi();
};
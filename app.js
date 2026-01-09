const Pi = window.Pi;
Pi.init({ version: "2.0" });

async function authPi() {
    // Alert ini akan muncul jika tombol berhasil memanggil fungsi ini
    alert("Sistem: Mencoba menghubungi Pi Wallet..."); 

    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        
        alert("Berhasil! Selamat datang " + auth.user.username);
        
        // Ganti warna tombol secara permanen jika sukses
        const btn = document.getElementById('login-btn');
        btn.innerText = "Wallet Connected";
        btn.style.background = "#28a745"; // Hijau
    } catch (err) {
        alert("Gagal Terhubung: " + err.message);
        console.error(err);
    }
}

function onIncompletePaymentFound(payment) {
    console.log("Payment incomplete", payment);
}

// Memastikan tombol terhubung ke fungsi saat halaman dimuat
window.onload = function() {
    const loginButton = document.getElementById('login-btn');
    if (loginButton) {
        loginButton.onclick = authPi;
    }
};
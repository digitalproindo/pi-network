async function authPi() {
    alert("Sistem: Mencoba menghubungi Pi Wallet..."); 
    
    try {
        const scopes = ['username', 'payments'];
        
        // Menggunakan metode promise eksplisit
        Pi.authenticate(scopes, onIncompletePaymentFound)
            .then(function(auth) {
                alert("BERHASIL! Selamat datang " + auth.user.username);
                document.getElementById('login-btn').innerText = "Connected";
                document.getElementById('login-btn').style.background = "#28a745";
            })
            .catch(function(error) {
                alert("Kesalahan SDK: " + error.message);
            });
    } catch (err) {
        alert("Gagal memanggil SDK: " + err.message);
    }
}
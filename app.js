async function authPi() {
    alert("Sistem: Meminta Izin Akses Wallet..."); 

    try {
        // Pastikan inisialisasi ulang
        await Pi.init({ version: "2.0" });
        
        // Meminta izin khusus username dan payments
        const scopes = ['username', 'payments', 'wallet_address'];
        
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

        currentUser = auth.user;
        alert("LOGIN BERHASIL! Halo: " + auth.user.username);
        
        // Update tombol
        document.getElementById('login-btn').innerText = "Wallet Connected ✅";
        document.getElementById('login-btn').style.backgroundColor = "#28a745";
    } catch (err) {
        alert("Gagal Autentikasi: " + err.message + "\n\nPastikan Anda menekan 'Allow' pada pop-up Pi.");
    }
}
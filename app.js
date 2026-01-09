const Pi = window.Pi;
Pi.init({ version: "2.0" });

async function authPi() {
    alert("Sistem: Mencoba menghubungi Pi Wallet..."); 

    try {
        // Gunakan timeout untuk melihat apakah SDK merespons
        const scopes = ['username', 'payments', 'wallet_address'];
        
        await Pi.authenticate(scopes, (payment) => {
            console.log("Incomplete payment found", payment);
        }).then(function(auth) {
            alert("BERHASIL LOGIN! Halo: " + auth.user.username);
            document.getElementById('login-btn').innerText = "Wallet Connected";
            document.getElementById('login-btn').style.background = "green";
        }).catch(function(error) {
            alert("SDK Error: " + error.message);
        });

    } catch (err) {
        alert("Gagal Total: " + err.message);
    }
}

// Pasang event listener
window.onload = function() {
    document.getElementById('login-btn').onclick = authPi;
    document.getElementById('pay-button').onclick = handlePayment; // Pastikan fungsi ini ada
};
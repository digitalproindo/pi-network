const Pi = window.Pi;
Pi.init({ version: "2.0" });

async function authPi() {
    try {
        const scopes = ['username', 'payments'];
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        alert("Koneksi Berhasil: " + auth.user.username);
        // Begitu tombol ini diklik dan Anda setuju, Checklist Step 5 akan HIJAU
    } catch (err) {
        alert("Error: " + err.message);
    }
}

function onIncompletePaymentFound(payment) { /* Biarkan kosong dulu */ }

// Pemicu Klik Tombol
document.getElementById('login-btn').addEventListener('click', authPi);
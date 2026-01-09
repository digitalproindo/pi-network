const Pi = window.Pi;
Pi.init({ version: "2.0" });

async function authPi() {
    try {
        const scopes = ['username', 'payments'];
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        console.log(`Halo ${auth.user.username}, selamat datang di Digital Property Indonesia!`);
    } catch (err) {
        console.error("Gagal autentikasi:", err);
    }
}

function onIncompletePaymentFound(payment) {
}

authPi();
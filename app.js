const Pi = window.Pi;
let isPiReady = false;

// Inisialisasi dilakukan satu kali saat halaman dimuat
async function initPi() {
    try {
        await Pi.init({ version: "2.0" });
        isPiReady = true;
        console.log("Pi SDK is ready");
    } catch (err) {
        console.error("Pi SDK init failed:", err);
    }
}

initPi();

async function authPi() {
    if (!isPiReady) {
        alert("SDK belum siap. Mohon tunggu beberapa detik atau muat ulang halaman.");
        return;
    }

    alert("Sistem: Menghubungi Server Pi..."); 

    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Timeout sederhana: Jika 10 detik tidak ada respon, beri peringatan
        const authPromise = Pi.authenticate(scopes, onIncompletePaymentFound);
        
        const auth = await authPromise;
        
        alert("BERHASIL! Selamat datang " + auth.user.username);
        document.getElementById('login-btn').innerText = "Wallet Connected ✅";
        document.getElementById('login-btn').style.background = "#28a745";
        document.getElementById('login-btn').style.color = "white";

    } catch (err) {
        alert("Gagal: " + err.message);
        // Kembalikan warna tombol jika gagal agar bisa diklik lagi
        document.getElementById('login-btn').style.background = ""; 
    }
}

function onIncompletePaymentFound(payment) {
    console.log("Incomplete payment:", payment);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login-btn').onclick = authPi;
});
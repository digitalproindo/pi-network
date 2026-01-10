const Pi = window.Pi;
let currentUser = null;
let isPiReady = false;

// 1. Inisialisasi SDK secara otomatis saat halaman dimuat
async function initPi() {
    try {
        await Pi.init({ version: "2.0" });
        isPiReady = true;
        console.log("Pi SDK siap.");
    } catch (err) {
        console.error("Gagal memuat Pi SDK:", err);
    }
}

initPi();

// 2. Fungsi Autentikasi (Tombol Connect)
async function authPi() {
    if (!isPiReady) {
        alert("Sistem sedang menyiapkan SDK, mohon tunggu sebentar...");
        return;
    }

    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Memanggil jendela login asli Pi
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

        currentUser = auth.user;
        alert("BERHASIL! Selamat datang " + auth.user.username);
        
        // Update tampilan tombol Connect
        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = "Connected ✅";
            btn.style.backgroundColor = "#28a745";
            btn.style.color = "white";
        }
    } catch (err) {
        alert("Gagal Login: " + err.message);
    }
}

// 3. Fungsi Pembayaran (Tombol Beli Sekarang)
async function handlePayment() {
    if (!currentUser) {
        alert("Klik tombol 'Connect to Pi Wallet' terlebih dahulu!");
        return;
    }

    // Memberi tahu user bahwa dompet sedang dibuka
    alert("Membuka Jendela Pembayaran Pi Testnet...");

    try {
        const paymentData = {
            amount: 0.005,
            memo: "DP Properti - PT. Digital Property Indonesia",
            metadata: { productId: "property-001" },
        };

        const callbacks = {
            onReadyForServerApproval: (paymentId) => {
                console.log("Payment ID untuk approval:", paymentId);
                // Di Testnet ini sering otomatis, namun alert membantu memantau proses
                alert("Sedang memproses persetujuan...");
            },
            onReadyForServerCompletion: (paymentId, txid) => {
                alert("PEMBAYARAN BERHASIL!\nTXID: " + txid);
                console.log("Transaksi Selesai:", txid);
            },
            onCancel: (paymentId) => {
                alert("Pembayaran dibatalkan oleh pengguna.");
            },
            onError: (error, payment) => {
                alert("Error Pembayaran: " + error.message);
            }
        };

        // Perintah WAJIB untuk memicu jendela saldo Testnet
        await Pi.createPayment(paymentData, callbacks);

    } catch (err) {
        alert("Gagal Membuka Dompet: " + err.message);
    }
}

// 4. Penanganan jika ada pembayaran yang terputus di tengah jalan
function onIncompletePaymentFound(payment) {
    console.log("Pembayaran menggantung ditemukan:", payment);
}

// 5. Menghubungkan tombol HTML dengan fungsi JavaScript di atas
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById('login-btn');
    const payBtn = document.getElementById('pay-button');

    if (loginBtn) {
        loginBtn.onclick = authPi;
    }

    if (payBtn) {
        payBtn.onclick = handlePayment;
    }
});
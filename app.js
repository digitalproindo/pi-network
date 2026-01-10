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

    // Alert awal sebelum proses dimulai agar user tahu aplikasi merespon
    alert("Menghubungi dompet Pi... Mohon tunggu jendela ungu muncul.");

    try {
        const paymentData = {
            amount: 0.005,
            memo: "DP Properti - PT. Digital Property Indonesia",
            metadata: { productId: "property-001" },
        };

        const callbacks = {
            onReadyForServerApproval: (paymentId) => {
                // PENTING: Jangan gunakan alert di sini agar jendela dompet tidak terhalang
                console.log("Payment ID didapat, menunggu persetujuan server:", paymentId);
            },
            onReadyForServerCompletion: (paymentId, txid) => {
                // Tampilkan alert sukses hanya setelah pembayaran benar-benar selesai
                alert("PEMBAYARAN BERHASIL!\nTXID: " + txid);
                console.log("Transaksi Selesai:", txid);
            },
            onCancel: (paymentId) => {
                console.log("Pembayaran dibatalkan atau timeout.");
            },
            onError: (error, payment) => {
                // Memberi tahu jika terjadi error asli atau timeout 60 detik
                alert("Error/Timeout: " + error.message);
                console.error("Payment Error:", error);
            }
        };

        // Memanggil jendela pembayaran asli
        await Pi.createPayment(paymentData, callbacks);

    } catch (err) {
        alert("Gagal Membuka Dompet: " + err.message);
    }
}

// 4. Penanganan pembayaran menggantung
function onIncompletePaymentFound(payment) {
    console.log("Pembayaran menggantung ditemukan:", payment);
}

// 5. Listener tombol
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
const Pi = window.Pi;
Pi.init({ version: "2.0" });

let currentUser = null;

// FUNGSI 1: AUTENTIKASI (CONNECT WALLET)
async function authPi() {
    alert("Sistem: Membuka Jendela Autentikasi Pi..."); 

    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Memanggil autentikasi
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

        currentUser = auth.user;
        alert("BERHASIL! Selamat datang " + auth.user.username);
        
        // Update tampilan tombol secara permanen
        const btn = document.getElementById('login-btn');
        if (btn) {
            btn.innerText = "Wallet Connected ✅";
            btn.style.backgroundColor = "#28a745"; // Hijau Sukses
            btn.style.color = "white";
        }
        
    } catch (err) {
        alert("Pesan SDK: " + err.message);
        console.error(err);
    }
}

// FUNGSI 2: PEMBAYARAN (BELI SEKARANG)
async function handlePayment() {
    if (!currentUser) {
        alert("Silakan klik 'Connect to Pi Wallet' terlebih dahulu!");
        return;
    }

    try {
        const paymentData = {
            amount: 0.005,
            memo: "DP Unit Villa - PT. DIGITAL PROPERTY INDONESIA",
            metadata: { productId: "villa-001" },
        };

        const paymentCallbacks = {
            onReadyForServerApproval: (paymentId) => {
                alert("Pembayaran Sedang Diproses (Approval)...");
                // Di tahap Testnet, ini biasanya otomatis jika server dev sudah siap
            },
            onReadyForServerCompletion: (paymentId, txid) => {
                alert("PEMBAYARAN BERHASIL!\nTXID: " + txid);
            },
            onCancel: (paymentId) => {
                console.log("Pembayaran dibatalkan oleh user.");
            },
            onError: (error, payment) => {
                alert("Error Pembayaran: " + error.message);
            }
        };

        await Pi.createPayment(paymentData, paymentCallbacks);
    } catch (err) {
        alert("Sistem Error: " + err.message);
    }
}

// FUNGSI 3: PENANGANAN PEMBAYARAN MENGGANTUNG
function onIncompletePaymentFound(payment) {
    console.log("Ada pembayaran yang belum selesai ditemukan:", payment);
    // Secara teknis Anda harus mengirim paymentId ke server Anda untuk diselesaikan
}

// MENGHUBUNGKAN TOMBOL HTML DENGAN JAVASCRIPT
document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById('login-btn');
    const payBtn = document.getElementById('pay-button');

    if (loginBtn) {
        loginBtn.onclick = authPi;
    }

    if (payBtn) {
        payBtn.onclick = handlePayment;
    }
});
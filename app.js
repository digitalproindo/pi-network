const Pi = window.Pi;
Pi.init({ version: "2.0" });

// 1. FUNGSI AUTENTIKASI (LOGIN)
async function authPi() {
    try {
        console.log("Memulai proses login...");
        const scopes = ['username', 'payments', 'wallet_address'];
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        
        // Menampilkan pesan sukses kepada user
        alert("Koneksi Berhasil! Selamat datang, " + auth.user.username);
        console.log("User Data:", auth.user);
        
        // Setelah klik 'Allow' di pop-up, Step 5 di Checklist Portal akan HIJAU
    } catch (err) {
        alert("Gagal Login: " + err.message);
        console.error("Autentikasi Error:", err);
    }
}

// 2. FUNGSI PEMBAYARAN (TRANSAKSI PI)
async function handlePayment() {
    try {
        const paymentData = {
            amount: 1500, // Sesuai harga di HTML
            memo: "Pembelian Unit Properti - PT. Digital Property Indonesia", 
            metadata: { 
                product_id: "premium-villa-001",
                company: "PT_DIGITAL_PROPERTY_INDONESIA" 
            },
        };

        const paymentCallbacks = {
            onReadyForServerApproval: function(paymentId) {
                console.log("Menunggu persetujuan server untuk ID:", paymentId);
                // Di tahap Sandbox, ini akan menunjukkan pop-up sukses sementara
                alert("Transaksi dikirim ke jaringan. Mohon tunggu konfirmasi.");
            },
            onReadyForServerCompletion: function(paymentId, txid) {
                console.log("Transaksi Selesai! TXID:", txid);
                alert("Pembayaran Berhasil!\nTXID: " + txid);
            },
            onCancel: function(paymentId) {
                console.log("Pembayaran dibatalkan oleh pengguna.");
            },
            onError: function(error, payment) {
                console.error("Terjadi kesalahan pembayaran:", error);
                alert("Pembayaran Gagal: " + error.message);
            }
        };

        // Memicu munculnya jendela Pi Wallet untuk bayar
        await Pi.createPayment(paymentData, paymentCallbacks);

    } catch (err) {
        alert("Sistem Pembayaran Error: " + err.message);
    }
}

// 3. LOGIKA JIKA ADA PEMBAYARAN YANG TERPUTUS
function onIncompletePaymentFound(payment) {
    console.log("Ditemukan pembayaran yang belum selesai:", payment.identifier);
    // Untuk tahap awal development, bagian ini bisa dibiarkan untuk log internal
}

// 4. MENGHUBUNGKAN TOMBOL HTML KE SCRIPT JS
document.addEventListener("DOMContentLoaded", function() {
    // Menghubungkan tombol Connect Wallet
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', authPi);
    }

    // Menghubungkan tombol Beli Sekarang
    const payBtn = document.getElementById('pay-button');
    if (payBtn) {
        payBtn.addEventListener('click', handlePayment);
    }
});
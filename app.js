const Pi = window.Pi;

async function authPi() {
    alert("Sistem: Membuka Jendela Autentikasi Pi..."); 

    try {
        // Tambahkan inisialisasi ulang tepat sebelum login untuk memastikan koneksi
        await Pi.init({ version: "2.0" });
        
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Memanggil autentikasi dengan penanganan error yang lebih detail
        const auth = await Pi.authenticate(scopes, (payment) => {
            console.log("Incomplete payment found", payment);
        });

        alert("BERHASIL! Selamat datang " + auth.user.username);
        
        // Update tampilan tombol secara permanen
        const btn = document.getElementById('login-btn');
        btn.innerText = "Wallet Connected ✅";
        btn.style.backgroundColor = "#28a745";
        
        // Begitu tombol "Allow" diklik di jendela asli, Step 5 Portal jadi HIJAU
    } catch (err) {
        // Jika error, kita ingin tahu pesan aslinya dari Pi
        alert("Pesan SDK: " + err.message);
        console.error(err);
    }
}
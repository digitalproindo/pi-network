// ==========================================
// 1. KONFIGURASI UTAMA & VARIABEL GLOBAL
// ==========================================
const ADMIN_WA = "6282191851112"; // Otomatis sinkron dengan tombol WA melayang Anda
let currentUser = null;

// Mock Data Produk Premium (Sesuaikan dengan isi marketplace Anda)
const dataProduk = [
    { id: 1, nama: "Emas Batangan Premium 10 Gram", harga: "5.00", kategori: "Emas", rating: "5.0", diskon: "10%", img: "https://images.unsplash.com/photo-1610375228911-872ab4b152ee?w=500" },
    { id: 2, nama: "Mobil Listrik Sedan Modern", harga: "150.00", kategori: "Mobil", rating: "4.9", diskon: "Free Ship", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=500" },
    { id: 3, nama: "Sepeda Motor Matic 150cc", harga: "35.00", kategori: "Motor", rating: "4.8", diskon: null, img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=500" }
];

// ==========================================
// 2. INITIALISASI PI SDK
// ==========================================
const Pi = window.Pi;
Pi.init({ version: "2.0", sandbox: true }); // Ubah sandbox ke false jika sudah siap migrasi ke Mainnet

// ==========================================
// 3. LOGIKA OTENTIKASI & LOGIN USER
// ==========================================
async function handleSignIn() {
    try {
        const scopes = ['username', 'payments', 'wallet_address'];
        
        // Meminta izin login dari Pi Browser
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        currentUser = auth.user;
        
        console.log("Login sukses:", currentUser);

        // Perbarui tampilan tombol login di header HTML
        const loginBtn = document.getElementById("login-btn");
        if (loginBtn) {
            loginBtn.innerText = currentUser.username.toUpperCase();
            loginBtn.style.background = "linear-gradient(to right, #00bfa5, #00897b)";
            loginBtn.style.color = "white";
        }

        // Perbarui data halaman profil HTML
        document.getElementById("profile-username").innerText = currentUser.username;
        if(currentUser.uid) {
            document.getElementById("profile-address").innerText = currentUser.uid;
        }

    } catch (error) {
        console.error("Gagal melakukan otentikasi login Pi SDK:", error);
        alert("Akses ditolak. Pastikan Anda memberikan izin otentikasi di Pi Browser.");
    }
}

// Handler otomatis jika ada pembayaran lama yang menggantung di server Core Team
function onIncompletePaymentFound(payment) {
    console.log("Menemukan pembayaran tertunda yang belum selesai:", payment.identifier);
    // Mengirim paksa sisa transaksi gantung ke backend complete untuk dibersihkan
    fetch('https://www.ptdigitalproindo.com/api/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId: payment.identifier, txid: "INCOMPLETE_FLUSH" })
    });
}

// ==========================================
// 4. RENDER MARKETPLACE & NAVIGASI HALAMAN
// ==========================================
function renderProducts(products) {
    const grid = document.getElementById("main-grid");
    if (!grid) return;
    grid.innerHTML = "";

    products.forEach(p => {
        const discBadge = p.diskon ? `<div class="discount-badge">${p.diskon}</div>` : '';
        const card = `
            <div class="product-card">
                <div class="image-container">
                    ${discBadge}
                    <img src="${p.img}" alt="${p.nama}">
                    <div class="xtra-label">
                        <span class="xtra-text">PREMIUM</span><br>
                        <span class="ongkir-text">Bebas Ongkir</span>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-name">${p.nama}</div>
                    <div class="price">${p.harga} Pi</div>
                    <div class="free-ship-tag">🚚 Garansi Aman</div>
                    <div class="card-bottom">
                        <span class="rating-text"><span class="star">⭐</span> ${p.rating}</span>
                        <button class="btn-buy-now" onclick="eksekusiBeliKeAdmin('${p.nama}', '${p.harga}')">Beli</button>
                    </div>
                </div>
            </div>
        `;
        grid.innerHTML += card;
    });
}

function switchPage(pageId) {
    const pages = ['home', 'cari', 'keranjang', 'profile'];
    pages.forEach(p => {
        const target = document.getElementById(`page-${p}`);
        if(target) target.classList.add('hidden');
        
        const navItem = document.getElementById(`nav-${p}`);
        if(navItem) navItem.classList.remove('active');
    });

    document.getElementById(`page-${pageId}`).classList.remove('hidden');
    document.getElementById(`nav-${pageId}`).classList.add('active');
}

function filterCategory(category, element) {
    document.querySelectorAll('.category-pill').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    if (category === 'all') {
        renderProducts(dataProduk);
    } else {
        const filtered = dataProduk.filter(p => p.kategori === category);
        renderProducts(filtered);
    }
}

// ==========================================
// 5. EKSEKUSI PEMBAYARAN BLOCKCHAIN PI (SOLUSI FIX TIMEOUT)
// ==========================================
window.eksekusiBeliKeAdmin = function(namaBarang, hargaBarang) {
    if (!currentUser) {
        alert("Silakan klik tombol 'LOGIN PI' di pojok kanan atas terlebih dahulu sebelum berbelanja.");
        return;
    }
    
    const nominalBayar = parseFloat(hargaBarang);

    // Membuka Jaringan Pi Payment API v2
    window.Pi.createPayment({
        amount: nominalBayar,
        memo: `Pembayaran: ${namaBarang}`,
        metadata: { product_name: namaBarang },
    }, {
        onReadyForServerApproval: async function(paymentId) {
            console.log("Mengirim sinyal persetujuan ke server Vercel untuk ID:", paymentId);
            try {
                // ABSOLUTE URL: Menembak langsung domain SSL Vercel Anda tanpa tersangkut di pinet.com
                const response = await fetch('https://www.ptdigitalproindo.com/api/approval', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paymentId: paymentId })
                });
                const data = await response.json();
                console.log("Server Vercel Berhasil Menyetujui:", data);
            } catch (err) {
                console.error("Gagal mengirim persetujuan ke backend:", err);
            }
        },
        onReadyForServerCompletion: async function(paymentId, txid) {
            console.log("Transaksi Blockchain Berhasil! TXID:", txid);
            try {
                const response = await fetch('https://www.ptdigitalproindo.com/api/complete', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paymentId: paymentId, txid: txid })
                });
                const data = await response.json();
                console.log("Server Vercel Mencatat Completion:", data);
                
                alert(`🎉 TRANSAKSI BERHASIL!\n\nProduk: ${namaBarang}\nNominal: ${nominalBayar} Pi\n\nMenghubungkan Anda ke WhatsApp Admin.`);
                
                // Redirect otomatis menuju WhatsApp Admin untuk pengiriman barang fisik/jasa
                window.open(`https://wa.me/${ADMIN_WA}?text=Halo%20Admin,%20saya%20sudah%20membayar%20via%20Blockchain%20Pi%20Network!\n\n•%20Produk:%20${encodeURIComponent(namaBarang)}\n•%20Total:%20${nominalBayar}%20Pi\n•%20TXID:%20${txid}`, '_blank');
            } catch (err) {
                console.error("Gagal mengirim penyelesaian akhir ke backend:", err);
            }
        },
        onCancel: function() { 
            console.log("Pembayaran dibatalkan secara manual oleh pengguna."); 
        },
        onError: function(error) {
            console.error("Payment Error:", error);
            alert("Terjadi kendala jaringan dompet. Silakan periksa saldo Testnet Anda dan coba kembali.");
        }
    });
};

// Start system saat dokumen siap
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(dataProduk);
});

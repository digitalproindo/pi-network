// ==========================================
// 1. DATA PRODUK MARKETPLACE
// ==========================================
const productsData = [
    {
        id: "house-001",
        category: "Rumah",
        name: "The Beverly Hills Modern Mansion",
        price: 0.25000,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        desc: `• Luas Tanah: 2.500 m²`
    },
    {
        id: "house-002",
        category: "Rumah",
        name: "Zen Waterfront Villa",
        price: 0.18000,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
        desc: `• Gaya: Arsitektur Minimalis Modern`
    },
    { 
        id: 'p2', 
        name: "COCO Pro Kunyit", 
        price: 0.00006,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
        desc: "Super food Obat Masa Depan Probiotik Multi strain Madu Air Kelapa."
    },
    { 
        id: 'p3', 
        name: "An-Nisa", 
        price: 0.00010,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
        desc: "Mengatasi keputihan, gatal-gatal, membunuh bakteri."
    },
    { 
        id: 'p4', 
        name: "Ar-Rizal", 
        price: 0.00010,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
        desc: "Menguatkan Jantung, Meningkatkan gairah vitalitas pria."
    }
];

let currentUser = null;
const ADMIN_WA = "6282191851112"; 

// ==========================================
// 2. FUNGSI VISUAL UTAMA (RENDER PRODUK)
// ==========================================
function renderKatalogPasar(arrayData, idTargetElemen) {
    const wadahTampilan = document.getElementById(idTargetElemen);
    if (!wadahTampilan) return;
    wadahTampilan.innerHTML = "";

    arrayData.forEach(produk => {
        wadahTampilan.innerHTML += `
            <div class="product-card">
                <div class="image-container">
                    <span class="discount-badge">PROMO</span>
                    <img src="${produk.images[0]}" alt="${produk.name}">
                    <div class="xtra-label">
                        <div class="xtra-text">PREMIUM</div>
                        <div class="ongkir-text">Bebas Ongkir</div>
                    </div>
                </div>
                <div class="product-info">
                    <div class="free-ship-tag">⚡ Kualitas Tinggi</div>
                    <div class="product-name">${produk.name}</div>
                    <div class="price">${produk.price} Pi</div>
                    <div class="card-bottom">
                        <div class="rating-text"><span class="star">⭐</span> 5.0</div>
                        <button class="btn-buy-now" onclick="eksekusiBeliKeAdmin('${produk.name}', '${produk.price}')">Beli</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// ==========================================
// 3. INISIALISASI HALAMAN & AUTENTIKASI PI
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Jalankan render katalog agar halaman tidak blank
    renderKatalogPasar(productsData, "main-grid");
    
    // Inisialisasi Pi SDK jika dibuka di dalam Pi Browser
    if (window.Pi) {
        try {
            window.Pi.init({ version: "2.0", sandbox: true }); 
            autentikasiPiOtomatis();
        } catch (err) {
            console.error("Gagal memuat Pi SDK:", err);
        }
    }
});

function autentikasiPiOtomatis() {
    window.Pi.authenticate(['username', 'payments'], (payment) => {})
        .then((auth) => {
            currentUser = auth.user;
            const btnLogin = document.getElementById("login-btn");
            if (btnLogin) {
                btnLogin.innerText = auth.user.username.toUpperCase();
            }
        })
        .catch((err) => {
            console.log("Menunggu login manual atau user membatalkan.");
        });
}

// Fungsi tombol login manual jika klik profil/tombol login
window.handleSignIn = function() {
    if (!window.Pi) {
        alert("Harap buka aplikasi ini di dalam Pi Browser.");
        return;
    }
    autentikasiPiOtomatis();
};

// ==========================================
// 4. LOGIKA TRANSAKSI DETEKSI DOMAIN OTOMATIS
// ==========================================
window.eksekusiBeliKeAdmin = function(namaBarang, hargaBarang) {
    if (!window.Pi || !currentUser) {
        alert("Peringatan: Silakan login terlebih dahulu menggunakan akun Pi Anda.");
        return;
    }
    const nominalBayar = parseFloat(hargaBarang);
    
    // Mendeteksi otomatis domain aktif (baik .com maupun vercel.app)
    const BASE_BACKEND_URL = window.location.origin;

    window.Pi.createPayment({
        amount: nominalBayar,
        memo: `Bayar: ${namaBarang}`,
        metadata: { product_name: namaBarang },
    }, {
        onReadyForServerApproval: async (paymentId) => {
            try {
                const response = await fetch(`${BASE_BACKEND_URL}/api/approval`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paymentId })
                });
                const data = await response.json();
                console.log("Server merespons approval:", data);
            } catch (err) {
                console.error("Gagal menjangkau backend approval:", err);
            }
        },
        onReadyForServerCompletion: async (paymentId, txid) => {
            try {
                const response = await fetch(`${BASE_BACKEND_URL}/api/complete`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paymentId, txid })
                });
                const data = await response.json();
                console.log("Server merespons completion:", data);
                
                alert(`🎉 TRANSAKSI BERHASIL!\nSejumlah ${nominalBayar} Pi sukses ditransfer.`);
                window.open(`https://wa.me/${ADMIN_WA}?text=Halo%20Admin,%20saya%20sudah%20bayar%20via%20Blockchain%20Pi!\n•%20Produk:%20${namaBarang}\n•%20TXID:%20${txid}`, '_blank');
            } catch (err) {
                console.error("Gagal menyelesaikan klaim:", err);
            }
        },
        onCancel: () => {
            console.log("Pembayaran dibatalkan oleh pengguna.");
        },
        onError: (error) => {
            console.error("Payment Error:", error);
            alert("Transaksi ditangguhkan. Periksa koneksi atau saldo dompet Anda.");
        }
    });
};

// ==========================================
// 5. FUNGSI TOMBOL MENU LAINNYA (NAVIGASI)
// ==========================================

// Fungsi Tombol Cari (Kaca Pembesar)
window.handleSearch = function() {
    const kataKunci = prompt("Masukkan nama produk herbal atau rumah yang ingin Anda cari:");
    if (kataKunci) {
        const hasilFilter = productsData.filter(p => 
            p.name.toLowerCase().includes(kataKunci.toLowerCase()) || 
            p.category.toLowerCase().includes(kataKunci.toLowerCase())
        );
        if (hasilFilter.length > 0) {
            renderKatalogPasar(hasilFilter, "main-grid");
            alert(`Menampilkan ${hasilFilter.length} produk pencarian: "${kataKunci}"\n\n(Klik menu 'Beranda' atau segarkan halaman untuk mengembalikan semua produk)`);
        } else {
            alert(`Produk dengan kata kunci "${kataKunci}" tidak ditemukan.`);
        }
    }
};

// Fungsi Tombol Keranjang
window.handleCart = function() {
    alert("Fitur Keranjang Belanja Mainnet sedang disiapkan.\n\nSaat ini Anda bisa langsung melakukan pembelian instan secara aman dengan menekan tombol 'Beli' pada masing-masing produk.");
};

// Fungsi Tombol Profil / Akun
window.handleProfile = function() {
    if (currentUser) {
        alert(`👤 INFORMASI AKUN PI NETWORK\n\n• Username: ${currentUser.username.toUpperCase()}\n• Status: Terautentikasi di Testnet/Mainnet\n\nSelamat berbelanja di Digital Pro Indo!`);
    } else {
        if (window.Pi) {
            autentikasiPiOtomatis();
        } else {
            alert("Silakan buka aplikasi ini di dalam Pi Browser untuk memuat profil Anda.");
        }
    }
};

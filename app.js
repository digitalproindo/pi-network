// ==========================================
// 1. VARIABEL GLOBAL UTAMA MARKETPLACE
// ==========================================
let currentUser = null;
const ADMIN_WA = "6281906066757"; 

// ==========================================
// 2. DATA PRODUK MARKETPLACE (Utuh & Sempurna)
// ==========================================
const productsData = [
    {
        id: "house-001",
        category: "Rumah",
        name: "The Beverly Hills Modern Mansion",
        price: 0.25000,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Luas Tanah:</b> 2.500 m²<br>• <b>Kamar Tidur:</b> 7 Master Suite<br>• <b>Fasilitas:</b> Infinity Pool, Home Cinema<br>• <b>Lokasi:</b> Beverly Hills, California`
    },
    {
        id: "house-002",
        category: "Rumah",
        name: "Zen Waterfront Villa",
        price: 0.18000,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Pemandangan:</b> Akses Danau Privasi<br>• <b>Gaya:</b> Arsitektur Minimalis Modern<br>• <b>Fasilitas:</b> Dermaga Pribadi, Spa & Sauna`
    },
    {
        id: "house-003",
        category: "Rumah",
        name: "Penthouse Skyline Duplex",
        price: 0.12000,
        images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lantai:</b> Lantai 50 & 51 (Top Floor)<br>• <b>Pemandangan:</b> 360° City Skyline View<br>• <b>Interior:</b> Marmer Italia & Panel Emas`
    },
    {
        id: "house-005",
        category: "Rumah",
        name: "Tropical Cliffside Sanctuary",
        price: 0.15500,
        images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Lokasi:</b> Tebing Uluwatu, Bali<br>• <b>Konsep:</b> Ocean View Living Space<br>• <b>Fasilitas:</b> Private Beach Access`
    },
    {
        id: "house-008",
        category: "Rumah",
        name: "The Glass House Estate",
        price: 0.21000,
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
        desc: `• <b>Material Dominan:</b> Kaca Tempered & Premium Steel<br>• <b>Lansekap:</b> Koi Pond Keliling Bangunan`
    },
    { 
        id: 'p2', 
        name: "COCO Pro Kunyit", 
        price: 0.00006,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
        desc: "Super food Obat Masa Depan Probiotik Multi strain Madu Air Kelapa, Kunyit, Kurma."
    },
    { 
        id: 'p3', 
        name: "An-Nisa", 
        price: 0.00010,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
        desc: "Mengatasi keputihan, gatal-gatal, membunuh bakteri, melancarkan menstruasi, mencegah kanker rahim."
    },
    { 
        id: 'p4', 
        name: "Ar-Rizal", 
        price: 0.00010,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
        desc: "Menguatkan Jantung, Meningkatkan gairah vitalitas pria, Mengatasi ejakulasi dini."
    },
    { 
        id: 'p6', 
        name: "Nabidz Dessert ", 
        price: 0.00012,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
        desc: "Nabidz Dessert bahan baku buah anggur merah pilihan hasil fermentasi esterifikasi biokimia."
    },
    { 
        id: 'hb4', 
        name: "COCO Pro 10 ", 
        price: 0.00006, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
        desc: "Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa, Kunyit, Kurma."
    }
];

// ==========================================
// 3. EVENT LIFECYCLE INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Gambar katalog beranda utama langsung
    renderKatalogPasar(productsData, "main-grid");
    
    // 2. Pasang sistem pencarian ketik dinamis (Real-time Search)
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            const hasilFilter = productsData.filter(p => p.name.toLowerCase().includes(keyword));
            
            const containerHasil = document.getElementById("search-results");
            if (keyword === "") {
                containerHasil.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; min-height:300px; width:100%; grid-column:1/-1;"><p style="color:#94a3b8;">Silakan masukkan nama produk...</p></div>`;
            } else if (hasilFilter.length === 0) {
                containerHasil.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; min-height:300px; width:100%; grid-column:1/-1;"><p style="color:#ef4444; font-weight:600;">Produk premium tidak ditemukan.</p></div>`;
            } else {
                renderKatalogPasar(hasilFilter, "search-results");
            }
        });
    }

    // 3. Inisialisasi Pi SDK
    setTimeout(() => {
        if (window.Pi) {
            try {
                window.Pi.init({ version: "2.0", sandbox: false });
                autentikasiPiOtomatis();
            } catch (err) {
                console.error("Pi SDK Init Error:", err);
            }
        }
    }, 1000);
});

// ==========================================
// 4. CORE ENGINE RENDERER (PENGGAMBAR PRODUK)
// ==========================================
function renderKatalogPasar(arrayData, idTargetElemen) {
    const wadahTampilan = document.getElementById(idTargetElemen);
    if (!wadahTampilan) return;

    wadahTampilan.innerHTML = "";

    arrayData.forEach(produk => {
        const itemHtml = `
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
        wadahTampilan.innerHTML += itemHtml;
    });
}

// ==========================================
// 5. FITUR FILTER KATEGORI (TOP NAVIGATION)
// ==========================================
window.filterCategory = function(namaKategori, elemenPill) {
    // Ganti status UI tombol aktif
    document.querySelectorAll(".category-pill").forEach(pill => pill.classList.remove("active"));
    elemenPill.classList.add("active");

    // Saring data berdasarkan kategori
    if (namaKategori === "all" || namaKategori === "Semua") {
        renderKatalogPasar(productsData, "main-grid");
    } else {
        const dataDisaring = productsData.filter(p => p.category.toLowerCase() === namaKategori.toLowerCase());
        const targetBeranda = document.getElementById("main-grid");
        
        if (dataDisaring.length === 0) {
            targetBeranda.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; min-height:250px; width:100%; grid-column:1/-1;"><p style="color:#94a3b8;">Kategori "${namaKategori}" segera hadir.</p></div>`;
        } else {
            renderKatalogPasar(dataDisaring, "main-grid");
        }
    }
};

// ==========================================
// 6. SISTEM NAVIGASI BAWAH (PAGE SWITCHER)
// ==========================================
window.switchPage = function(targetHalaman) {
    // Sembunyikan semua halaman utama
    document.getElementById("page-home").classList.add("hidden");
    document.getElementById("page-cari").classList.add("hidden");
    document.getElementById("page-keranjang").classList.add("hidden");
    document.getElementById("page-profile").classList.add("hidden");

    // Tampilkan halaman target
    document.getElementById(`page-${targetHalaman}`).classList.remove("hidden");

    // Ganti class aktif pada bottom nav menu
    document.querySelectorAll(".bottom-nav .nav-item").forEach(item => item.classList.remove("active"));
    document.getElementById(`nav-${targetHalaman}`).classList.add("active");
};

// ==========================================
// 7. OTENTIKASI BLOCKCHAIN PI & TOMBOL LOGIN
// ==========================================
function autentikasiPiOtomatis() {
    window.Pi.authenticate(['username', 'payments'], function(payment) {})
        .then(function(auth) {
            currentUser = auth.user;
            // Update Teks tombol login di header
            const btnLogin = document.getElementById("login-btn");
            if (btnLogin) btnLogin.innerText = auth.user.username.toUpperCase();
            
            // Update Data Profil Halaman Profil
            const profileUser = document.getElementById("profile-username");
            const profileAddr = document.getElementById("profile-address");
            if (profileUser) profileUser.innerText = auth.user.username;
            if (profileAddr) profileAddr.innerText = auth.user.uid || "Pi Verified Client";
        })
        .catch(function(err) {
            console.warn("Autentikasi otomatis background ditangguhkan.", err);
        });
}

// Handler saat tombol login diklik manual
window.handleSignIn = function() {
    if (!window.Pi) {
        alert("Buka aplikasi ini dari dalam Pi Browser untuk mengakses fitur dompet Pi Network.");
        return;
    }
    autentikasiPiOtomatis();
};

// ==========================================
// 8. ACTION TOMBOL BELI -> AUTOMATIC PI PAYMENT
// ==========================================
window.eksekusiBeliKeAdmin = function(namaBarang, hargaBarang) {
    // 1. Validasi awal jika user belum login/autentikasi via Pi Browser
    if (!window.Pi || !currentUser) {
        alert("Peringatan: Anda harus masuk menggunakan Pi Browser dan memastikan akun Pi Anda terhubung untuk melakukan pembayaran blockchain.");
        return;
    }

    // Konversi harga ke tipe Float untuk memastikan kalkulasi blockchain akurat
    const nominalBayar = parseFloat(hargaBarang);

    // 2. Panggil API Pembuat Transaksi Dompet Pi Network
    window.Pi.createPayment({
        amount: nominalBayar,
        memo: `Pembayaran Produk: ${namaBarang} - Digital Pro Indo`,
        metadata: { 
            product_id: "premium-prod-" + Math.floor(Math.random() * 100000),
            product_name: namaBarang 
        },
    }, {
        // TAHAP A: Transaksi berhasil dibuat di sisi klien, siap dikirim ke server/blockchain
        onReadyForServerApproval: function(paymentId) {
            console.log("Pembayaran disetujui, Payment ID:", paymentId);
            
            // Pada aplikasi real/production, di sini Anda mengirim paymentId ke backend Anda.
            // Untuk kebutuhan praktis/tanpa server mandiri saat ini, kita otomatis setujui di sisi klien.
            // Silakan ganti URL di bawah ini dengan endpoint server backend Anda jika sudah siap produksi.
            fetch(`https://api.digitalproindo.com/pi-approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId: paymentId })
            }).catch(err => console.log("Simulasi approval tanpa server backend mandiri dijalankan."));
        },
        
        // TAHAP B: Pengguna sudah memasukkan frasa sandi dompet & menekan tombol 'Bayar'
        onReadyForServerCompletion: function(paymentId, txid) {
            console.log("Transaksi sukses di Blockchain! TXID:", txid);
            
            // Beritahu pembeli bahwa saldo testnet/mainnet mereka berhasil didebit
            alert(`🎉 Transaksi Sukses!\n\nProduk: ${namaBarang}\nNominal: ${nominalBayar} Pi\nTXID: ${txid.substring(0, 10)}...`);
            
            // Opsional: Tetap hubungkan ke WhatsApp setelah sukses sebagai bukti nota otomatis ke Admin
            const pesanWa = `Halo Admin, saya telah berhasil membayar via Pi Blockchain!\n\n` +
                            `• *Produk:* ${namaBarang}\n` +
                            `• *Jumlah:* ${nominalBayar} Pi\n` +
                            `• *TXID:* ${txid}`;
            window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(pesanWa)}`, '_blank');
        },
        
        // TAHAP C: Pengguna membatalkan pembayaran di tengah jalan
        onCancel: function(paymentId) {
            alert("Pembayaran dibatalkan oleh pengguna.");
        },
        
        // TAHAP D: Terjadi gangguan teknis koneksi/saldo tidak cukup
        onError: function(error, payment) {
            console.error("Pi Payment Error:", error);
            alert("Gagal memproses pembayaran blockchain. Pastikan saldo dompet Pi Anda mencukupi.");
        }
    });
};

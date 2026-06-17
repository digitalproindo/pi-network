// ==========================================
// 1. VARIABEL GLOBAL & DATA PRODUK INSTAN
// ==========================================
let currentUser = null;
const ADMIN_WA = "6282191851112"; 

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

// ==========================================
// 2. AMANKAN URUTAN PEMUATAN HALAMAN (ANTI-BLANK)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // KEWAJIBAN UTAMA: Gambar produk ke layar secepat mungkin tanpa menunggu apa pun
    try {
        renderKatalogPasar(productsData, "main-grid");
    } catch (e) {
        console.error("Gagal menggambar produk:", e);
    }
    
    // Konfigurasi Input Pencarian
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            const hasilFilter = productsData.filter(p => p.name.toLowerCase().includes(keyword));
            const containerHasil = document.getElementById("search-results");
            
            if (keyword === "") {
                containerHasil.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; min-height:300px; width:100%; grid-column:1/-1;"><p style="color:#94a3b8;">Silakan masukkan nama produk...</p></div>`;
            } else if (hasilFilter.length === 0) {
                containerHasil.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; min-height:300px; width:100%; grid-column:1/-1;"><p style="color:#ef4444; font-weight:600;">Produk tidak ditemukan.</p></div>`;
            } else {
                renderKatalogPasar(hasilFilter, "search-results");
            }
        });
    }

    // Inisialisasi Pi SDK ditaruh paling belakangan agar tidak mengganggu visual utama
    setTimeout(() => {
        if (window.Pi) {
            try {
                window.Pi.init({ version: "2.0", sandbox: true }); 
                autentikasiPiOtomatis();
            } catch (err) {
                console.error("Pi SDK crash tetapi visual diselamatkan:", err);
            }
        }
    }, 1500);
});

// ==========================================
// 3. EVENT LIFECYCLE INITIALIZATION (PERBAIKAN LOGIN)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Tampilkan produk ke layar secepat mungkin
    try {
        renderKatalogPasar(productsData, "main-grid");
    } catch (e) {
        console.error("Gagal menggambar produk:", e);
    }
    
    // 2. Konfigurasi Input Pencarian
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            const hasilFilter = productsData.filter(p => p.name.toLowerCase().includes(keyword));
            const containerHasil = document.getElementById("search-results");
            
            if (keyword === "") {
                containerHasil.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; min-height:300px; width:100%; grid-column:1/-1;"><p style="color:#94a3b8;">Silakan masukkan nama produk...</p></div>`;
            } else if (hasilFilter.length === 0) {
                containerHasil.innerHTML = `<div style="display:flex; justify-content:center; align-items:center; min-height:300px; width:100%; grid-column:1/-1;"><p style="color:#ef4444; font-weight:600;">Produk tidak ditemukan.</p></div>`;
            } else {
                renderKatalogPasar(hasilFilter, "search-results");
            }
        });
    }

    // 3. JALANKAN INISIALISASI PI SDK SECARA INSTAN TANPA JEDA TIMEOUT
    if (window.Pi) {
        mengaktifkanPiSDK();
    } else {
        // Jika skrip eksternal Pi lambat memuat, tunggu sampai window mendeteksinya
        window.addEventListener("load", () => {
            if (window.Pi) mengaktifkanPiSDK();
        });
    }
});

// Fungsi pembantu untuk mengaktifkan fitur Blockchain Pi
function mengaktifkanPiSDK() {
    try {
        // Inisialisasi SDK resmi (sandbox: true untuk Pi Testnet)
        window.Pi.init({ version: "2.0", sandbox: true }); 
        console.log("Pi SDK Berhasil Diinisialisasi!");
        
        // Picu autentikasi otomatis agar user tidak perlu klik tombol login lagi jika sudah pernah masuk
        autentikasiPiOtomatis();
    } catch (err) {
        console.error("Gagal konfigurasi internal Pi SDK:", err);
    }
}


// ==========================================
// 4. SISTEM NAVIGASI & DIALOG HALAMAN
// ==========================================
window.filterCategory = function(namaKategori, elemenPill) {
    document.querySelectorAll(".category-pill").forEach(pill => pill.classList.remove("active"));
    elemenPill.classList.add("active");

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

window.switchPage = function(targetHalaman) {
    document.getElementById("page-home").classList.add("hidden");
    document.getElementById("page-cari").classList.add("hidden");
    document.getElementById("page-keranjang").classList.add("hidden");
    document.getElementById("page-profile").classList.add("hidden");
    document.getElementById(`page-${targetHalaman}`).classList.remove("hidden");

    document.querySelectorAll(".bottom-nav .nav-item").forEach(item => item.classList.remove("active"));
    document.getElementById(`nav-${targetHalaman}`).classList.add("active");
};

// ==========================================
// 5. AUTENTIKASI AKUN USER (LOGIN)
// ==========================================
function autentikasiPiOtomatis() {
    window.Pi.authenticate(['username', 'payments'], function(payment) {})
        .then(function(auth) {
            currentUser = auth.user;
            const btnLogin = document.getElementById("login-btn");
            if (btnLogin) btnLogin.innerText = auth.user.username.toUpperCase();
            
            const profileUser = document.getElementById("profile-username");
            const profileAddr = document.getElementById("profile-address");
            if (profileUser) profileUser.innerText = auth.user.username;
            if (profileAddr) profileAddr.innerText = auth.user.uid || "Pi Verified Client";
        })
        .catch(function(err) {
            console.log("Menunggu masuk via tombol.");
        });
}

window.handleSignIn = function() {
    if (!window.Pi) {
        alert("Buka aplikasi ini dari dalam Pi Browser untuk menghubungkan Dompet.");
        return;
    }
    autentikasiPiOtomatis();
};

// ==========================================
// 6. PIPELINE EKSEKUSI PEMBAYARAN BLOCKCHAIN
// ==========================================
window.eksekusiBeliKeAdmin = function(namaBarang, hargaBarang) {
    if (!window.Pi || !currentUser) {
        alert("Peringatan: Silakan klik tombol 'Login Pi' di bagian kanan atas terlebih dahulu.");
        return;
    }

    const nominalBayar = parseFloat(hargaBarang);

    window.Pi.createPayment({
        amount: nominalBayar,
        memo: `Bayar: ${namaBarang} - Digital Pro Indo`,
        metadata: { product_name: namaBarang },
    }, {
        onReadyForServerApproval: function(paymentId) {
            fetch("/api/approval", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId: paymentId })
            })
            .then(res => res.json())
            .then(data => console.log("Approval terdaftar aman:", data))
            .catch(err => console.error("Gagal approval:", err));
        },
        
        onReadyForServerCompletion: function(paymentId, txid) {
            fetch("/api/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId: paymentId, txid: txid })
            })
            .then(res => res.json())
            .then(data => {
                alert(`🎉 TRANSAKSI BERHASIL!\n\nKoin sejumlah ${nominalBayar} Pi sukses ditransfer.`);
                const pesanWa = `Halo Admin, saya sudah bayar via Blockchain Pi!\n• *Produk:* ${namaBarang}\n• *TXID:* ${txid}`;
                window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(pesanWa)}`, '_blank');
            })
            .catch(err => console.error("Gagal menyelesaikan transaksi:", err));
        },
        
        onCancel: function(paymentId) {
            alert("Pembayaran dibatalkan.");
        },
        
        onError: function(error, payment) {
            console.error("Payment Error:", error);
            alert("Transaksi ditangguhkan. Pastikan saldo dompet Testnet Anda mencukupi.");
        }
    });
};

// ==========================================
// 1. DATA PRODUK MARKETPLACE (INSTAN & AMAN)
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
// 2. FUNGSI VISUAL UTAMA (ANTI-BLANK)
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
// 3. EVENT LIFECYCLE (PRODUK & SDK INITIALIZATION)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Tampilkan produk detik pertama secara paksa agar tidak blank
    renderKatalogPasar(productsData, "main-grid");
    
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

    // Amankan inisialisasi Pi SDK menggunakan format modern
    if (window.Pi) {
        mengaktifkanPiSDK();
    } else {
        window.addEventListener("load", () => {
            if (window.Pi) mengaktifkanPiSDK();
        });
    }
});

function mengaktifkanPiSDK() {
    try {
        window.Pi.init({ version: "2.0", sandbox: true }); 
        console.log("Pi SDK Modern Aktif!");
        autentikasiPiOtomatis();
    } catch (err) {
        console.error("Gagal konfigurasi internal Pi SDK:", err);
    }
}

// ==========================================
// 4. AUTENTIKASI AKUN (LOGIN)
// ==========================================
function autentikasiPiOtomatis() {
    window.Pi.authenticate(['username', 'payments'], (payment) => {})
        .then((auth) => {
            currentUser = auth.user;
            const btnLogin = document.getElementById("login-btn");
            if (btnLogin) btnLogin.innerText = auth.user.username.toUpperCase();
            
            const profileUser = document.getElementById("profile-username");
            const profileAddr = document.getElementById("profile-address");
            if (profileUser) profileUser.innerText = auth.user.username;
            if (profileAddr) profileAddr.innerText = auth.user.uid || "Pi Verified Client";
        })
        .catch((err) => {
            console.log("Menunggu login manual.");
        });
}

window.handleSignIn = function() {
    if (!window.Pi) {
        alert("Harap buka aplikasi ini langsung dari dalam Pi Browser.");
        return;
    }
    autentikasiPiOtomatis();
};

// ==========================================
// 5. SISTEM NAVIGASI & HALAMAN
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
// 6. PIPELINE EKSEKUSI PEMBAYARAN MODERN
// ==========================================
window.eksekusiBeliKeAdmin = function(namaBarang, hargaBarang) {
    if (!window.Pi || !currentUser) {
        alert("Peringatan: Silakan ketuk tombol login akun Pi di bagian atas terlebih dahulu.");
        return;
    }

    const nominalBayar = parseFloat(hargaBarang);

    window.Pi.createPayment({
        amount: nominalBayar,
        memo: `Bayar: ${namaBarang} - Digital Pro Indo`,
        metadata: { product_name: namaBarang },
    }, {
        // Menggunakan Arrow Function modern agar Vercel & Pi Browser sinkron tanpa eror parsing
        onReadyForServerApproval: (paymentId) => {
            console.log("Mengirim approval untuk Payment ID:", paymentId);
            fetch("/api/approval", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId: paymentId })
            })
            .then(res => res.json())
            .then(data => console.log("Backend menyetujui transaksi:", data))
            .catch(err => console.error("Gagal approval backend:", err));
        },
        
        onReadyForServerCompletion: (paymentId, txid) => {
            fetch("/api/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId: paymentId, txid: txid })
            })
            .then(res => res.json())
            .then(data => {
                alert(`🎉 TRANSAKSI BERHASIL!\n\nSejumlah ${nominalBayar} Pi sukses ditransfer.`);
                const pesanWa = `Halo Admin, saya sudah bayar via Blockchain Pi!\n• *Produk:* ${namaBarang}\n• *TXID:* ${txid}`;
                window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(pesanWa)}`, '_blank');
            })
            .catch(err => console.error("Gagal menyelesaikan transaksi:", err));
        },
        
        onCancel: (paymentId) => {
            alert("Pembayaran dibatalkan.");
        },
        
        onError: (error, payment) => {
            console.error("Payment Error:", error);
            alert("Transaksi ditangguhkan. Pastikan saldo dompet mencukupi.");
        }
    });
};

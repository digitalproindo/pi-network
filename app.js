// ==========================================
// 1. DATA PRODUK MARKETPLACE (TESTNET / MAINNET)
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
// 2. FUNGSI RENDER UTAMA & FILTER KATEGORI
// ==========================================
function renderKatalogPasar(arrayData, idTargetElemen) {
    const wadahTampilan = document.getElementById(idTargetElemen);
    if (!wadahTampilan) return;
    wadahTampilan.innerHTML = "";

    if (arrayData.length === 0) {
        wadahTampilan.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #94a3b8;">Produk tidak ditemukan.</div>`;
        return;
    }

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

// Fungsi filter kategori di halaman beranda
window.filterCategory = function(category, element) {
    document.querySelectorAll('.category-pill').forEach(pill => pill.classList.remove('active'));
    element.classList.add('active');
    
    if (category === 'all') {
        renderKatalogPasar(productsData, "main-grid");
    } else {
        const filtered = productsData.filter(p => p.category === category);
        renderKatalogPasar(filtered, "main-grid");
    }
};

// ==========================================
// 3. LOGIKA NAVIGASI HALAMAN (BOTTOM NAV)
// ==========================================
window.switchPage = function(pageId) {
    // Sembunyikan semua halaman utama
    document.getElementById("page-home").classList.add("hidden");
    document.getElementById("page-cari").classList.add("hidden");
    document.getElementById("page-keranjang").classList.add("hidden");
    document.getElementById("page-profile").classList.add("hidden");

    // Tampilkan halaman yang dipilih
    document.getElementById(`page-${pageId}`).classList.remove("hidden");

    // Atur status aktif pada tombol menu bawah
    document.querySelectorAll(".bottom-nav .nav-item").forEach(item => item.classList.remove("active"));
    document.getElementById(`nav-${pageId}`).classList.add("active");
};

// ==========================================
// 4. INISIALISASI & AUTENTIKASI PI SDK
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    renderKatalogPasar(productsData, "main-grid");
    initSearchFeature();

    // Hindari error jika elemen cart-items belum ada
    const cartItems = document.getElementById("cart-items");

    if (cartItems) {
        cartItems.innerHTML = `
            <div style="text-align:center;padding:50px 20px;color:#94a3b8;">
                <div style="font-size:40px;margin-bottom:10px;">🛒</div>
                <p>Keranjang belanja Mainnet sedang disiapkan.</p>
                <p style="font-size:0.75rem;color:#64748b;">
                    Silakan gunakan fitur beli instan pada halaman Beranda.
                </p>
            </div>
        `;
    }

    if (!window.Pi) {
        console.log("Pi SDK tidak ditemukan.");
        return;
    }

    try {

        window.Pi.init({
            version: "2.0",
            sandbox: true
        });

        console.log("Pi SDK berhasil dimuat");

    } catch (err) {

        console.error(
            "Gagal menginisialisasi Pi SDK:",
            err
        );
    }
});


// ==========================================
// LOGIN PI
// ==========================================

function autentikasiPiOtomatis() {

    if (!window.Pi) {

        alert(
            "Aplikasi harus dibuka melalui Pi Browser."
        );

        return;
    }

    window.Pi.authenticate(
        ['username', 'payments']
    )

    .then((auth) => {

        currentUser = auth.user;

        console.log(
            "Login berhasil:",
            auth.user
        );

        const btnLogin =
            document.getElementById("login-btn");

        if (btnLogin) {

            btnLogin.innerText =
                auth.user.username.toUpperCase();
        }

        const profileUser =
            document.getElementById(
                "profile-username"
            );

        const profileAddress =
            document.getElementById(
                "profile-address"
            );

        if (profileUser) {

            profileUser.innerText =
                auth.user.username.toUpperCase();
        }

        if (profileAddress) {

            profileAddress.innerText =
                auth.user.uid ||
                "Connected via Pi Browser";
        }

        alert(
            "Login Pi berhasil!"
        );
    })

    .catch((err) => {

        console.error(
            "Login Pi gagal:",
            err
        );

        alert(
            "Login Pi gagal. Silakan coba lagi."
        );
    });
}


// ==========================================
// TOMBOL LOGIN PI
// ==========================================

window.handleSignIn = function() {

    console.log(
        "Tombol Login Diklik"
    );

    autentikasiPiOtomatis();
};

// ==========================================
// 5. FITUR PENCARIAN (HALAMAN CARI)
// ==========================================
function initSearchFeature() {
    const searchInput = document.getElementById("search-input");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.trim().toLowerCase();
        const placeholder = document.getElementById("search-placeholder");

        if (keyword === "") {
            if (placeholder) placeholder.style.display = "flex";
            renderKatalogPasar([], "search-results");
            return;
        }

        if (placeholder) placeholder.style.display = "none";
        const matchedProducts = productsData.filter(p => 
            p.name.toLowerCase().includes(keyword) || 
            p.category.toLowerCase().includes(keyword)
        );
        renderKatalogPasar(matchedProducts, "search-results");
    });
}

// Keranjang belanja placeholder
document.getElementById("cart-items").innerHTML = `
    <div style="text-align: center; padding: 50px 20px; color: #94a3b8;">
        <div style="font-size: 40px; margin-bottom: 10px;">🛒</div>
        <p>Keranjang belanja Mainnet sedang disiapkan.</p>
        <p style="font-size: 0.75rem; color: #64748b;">Silakan gunakan fitur beli instan pada halaman Beranda.</p>
    </div>
`;
// ==========================================
// 6. LOGIKA TRANSAKSI BLOKCHAIN PI (AUTOMATIC DETECT)
// ==========================================
window.eksekusiBeliKeAdmin = function(namaBarang, hargaBarang) {
    if (!window.Pi || !currentUser) {
        alert("Peringatan: Silakan klik tombol 'LOGIN PI' di pojok kanan atas terlebih dahulu.");
        return;
    }
    
    const nominalBayar = parseFloat(hargaBarang);

    window.Pi.createPayment({
        amount: nominalBayar,
        memo: `Bayar: ${namaBarang}`,
        metadata: { product_name: namaBarang },
    }, {
        onReadyForServerApproval: async function(paymentId) {
            console.log("Mengirim persetujuan untuk Payment ID:", paymentId);
            try {
                // Menggunakan relative path agar aman dari kendala blokir CORS lintas domain
                const response = await fetch('/api/approval', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paymentId: paymentId })
                });
                const data = await response.json();
                console.log("Persetujuan backend berhasil:", data);
            } catch (err) {
                console.error("Gagal verifikasi approval backend:", err);
            }
        },
        onReadyForServerCompletion: async function(paymentId, txid) {
            console.log("Menyelesaikan blockchain transaksi untuk TXID:", txid);
            try {
                const response = await fetch('/api/complete', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ paymentId: paymentId, txid: txid })
                });
                const data = await response.json();
                console.log("Penyelesaian backend berhasil:", data);
                
                alert(`🎉 TRANSAKSI BERHASIL!\n\nSejumlah ${nominalBayar} Pi sukses ditransfer.`);
                window.open(`https://wa.me/${ADMIN_WA}?text=Halo%20Admin,%20saya%20sudah%20bayar%20via%20Blockchain%20Pi!\n•%20Produk:%20${namaBarang}\n•%20TXID:%20${txid}`, '_blank');
            } catch (err) {
                console.error("Gagal mengirim completion backend:", err);
            }
        },
        onCancel: function() { 
            console.log("Pembayaran dibatalkan oleh pengguna."); 
        },
        onError: function(error) {
            console.error("Payment Error:", error);
            alert("Transaksi mengalami penangguhan. Periksa koneksi atau saldo dompet Anda.");
        }
    });
};

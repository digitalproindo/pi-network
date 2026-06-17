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

// ⚠️ MASUKKAN SERVER API KEY DARI DEVELOP.PI ANDA DI SINI
const PI_SERVER_API_KEY = "cnl1zvmm5qkvnhldauqwsizgq2refqy3ezz8qkhdmqzsl5szdzgcjmgfll5k5nwi"; 

// Jembatan Proxy pihak ketiga agar GitHub Pages diizinkan mengetuk Server Pi Network
const PROXY_URL = "https://corsproxy.io/?"; 

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
// 3. INISIALISASI HALAMAN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    renderKatalogPasar(productsData, "main-grid");
    
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
            if (btnLogin) btnLogin.innerText = auth.user.username.toUpperCase();
        })
        .catch((err) => console.log("Menunggu login manual."));
}

window.handleSignIn = function() {
    if (!window.Pi) {
        alert("Harap buka di Pi Browser.");
        return;
    }
    autentikasiPiOtomatis();
};

// ==========================================
// 4. LOGIKA TRANSAKSI MENEMBUS CORS (KHUSUS GITHUB PAGES)
// ==========================================
window.eksekusiBeliKeAdmin = function(namaBarang, hargaBarang) {
    if (!window.Pi || !currentUser) {
        alert("Peringatan: Silakan klik tombol login terlebih dahulu.");
        return;
    }

    const nominalBayar = parseFloat(hargaBarang);

    window.Pi.createPayment({
        amount: nominalBayar,
        memo: `Bayar: ${namaBarang} - Digital Pro Indo`,
        metadata: { product_name: namaBarang },
    }, {
        // TAHAP A: Approval Menembus CORS Server Pi via Proxy
        onReadyForServerApproval: async (paymentId) => {
            console.log("Mengirim approval via Jembatan Proxy...");
            const targetUrl = `${PROXY_URL}${encodeURIComponent(`https://api.minepi.com/v2/payments/${paymentId}/approve`)}`;
            
            try {
                const response = await fetch(targetUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": `Key ${PI_SERVER_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                console.log("Jembatan Proxy Approval Sukses:", data);
            } catch (err) {
                console.error("Jembatan Proxy Approval Gagal:", err);
            }
        },
        
        // TAHAP B: Completion Menembus CORS Server Pi via Proxy
        onReadyForServerCompletion: async (paymentId, txid) => {
            console.log("Mengirim completion via Jembatan Proxy...");
            const targetUrl = `${PROXY_URL}${encodeURIComponent(`https://api.minepi.com/v2/payments/${paymentId}/complete`)}`;
            
            try {
                const response = await fetch(targetUrl, {
                    method: "POST",
                    headers: {
                        "Authorization": `Key ${PI_SERVER_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ txid: txid })
                });
                const data = await response.json();
                console.log("Jembatan Proxy Completion Sukses:", data);
                
                alert(`🎉 TRANSAKSI BERHASIL!\n\nSejumlah ${nominalBayar} Pi sukses ditransfer.`);
                const pesanWa = `Halo Admin, saya sudah bayar via Blockchain Pi!\n• *Produk:* ${namaBarang}\n• *TXID:* ${txid}`;
                window.open(`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(pesanWa)}`, '_blank');
            } catch (err) {
                console.error("Jembatan Proxy Completion Gagal:", err);
            }
        },
        
        onCancel: (paymentId) => alert("Pembayaran dibatalkan."),
        onError: (error, payment) => alert("Transaksi ditangguhkan. Periksa saldo dompet Anda.")
    });
};

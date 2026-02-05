document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    // Simpan data alamat
    let userAddress = { nama: "", telepon: "", alamatLengkap: "" };

    // --- KONFIGURASI ---
    const ADMIN_WA = "6282191851112"; 

    // --- 1. DATA PRODUK (FULL VERSION DENGAN RATING & ULASAN) ---
const productsData = [
    { 
        id: 'p1', 
        name: "Rumah Ultra-Modern", 
        price: 1.800,
        discount: 10, 
        category: "Rumah", 
        images: ["https://i.ibb.co.com/dwZVX86G/1770232154053.png"], 
        desc: "Rumah mewah dua lantai dengan estetika geometris futuristik yang mengutamakan transparansi kaca dan material premium.Spesifikasi Utama Material: Dinding panel marmer Travertine, beton halus, dan kaca floor-to-ceiling.Pintu Utama: Pivot door kayu solid setinggi 4 meter dengan akses biometrik.Pencahayaan: Sistem Hidden LED linear pada alur masuk (driveway) dan plafon.Lantai: Marmer Italia (interior) dan batu alam antislip (eksterior).Fitur Unggulan Smart Home: Kendali penuh via AI untuk lampu, suhu, dan keamanan.Lansekap: Kolam refleksi air di sekeliling bangunan dan taman minimalis.Area Parkir: Driveway melingkar yang luas dengan pencahayaan futuristik.",
        rating: 4.9,
        sold: 1250,
        reviews: [
            { user: "Pioneer_Ace", comment: "Sangat megah dan mewah" },
            { user: "NodeMaster", comment: "Wajib punya sebagai Pioner." }
        ]
    },
    { 
        id: 'p2', 
        name: "COCO Pro Kuunyit", 
        price: 0.00006,
        discount: 5, // Ini akan tampil -5% 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
        desc: "Super food Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma Dan Dengan Formula Bioteknologi Khusus Live probiotic, Immune support,High Antioksidant,Improved Digestion,Naturally Energizing.",
        rating: 5.0,
        sold: 3400,
        reviews: [
            { user: "Sehat_Sentosa", comment: "Asam lambung saya membaik, terima kasih!" },
            { user: "Rina_Store", comment: "Produk herbal terbaik tahun ini." }
        ]
    },
    { 
        id: 'p3', 
        name: "Smart Home System Pro", 
        price: 0.500, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], 
        desc: "Paket instalasi smart home berbasis IoT. Kontrol rumah Anda dengan integrasi Pi Browser yang aman dan cepat.",
        rating: 4.8,
        sold: 52,
        reviews: [
            { user: "GadgetFreak", comment: "Instalasinya cepat dan fiturnya lengkap." }
        ]
    },
    { 
        id: 'p4', 
        name: "Premium Smartphone X", 
        price: 1.200, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], 
        desc: "Gadget premium dengan performa tinggi. Kamera resolusi tinggi dan baterai tahan lama untuk penggunaan harian.",
        rating: 4.7,
        sold: 89,
        reviews: [
            { user: "MobilePhotography", comment: "Kameranya luar biasa jernih!" }
        ]
    },
    { 
        id: 'p5', 
        name: "Sofa Minimalis 2 Seater - Modern Grey", 
        price: 0.05, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"], 
        desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu kecil. Bahan kain breathable dan busa tahan kempes.",
        rating: 4.6,
        sold: 45,
        reviews: [
            { user: "InteriorLover", comment: "Warnanya elegan dan sangat empuk." }
        ]
    },
    { 
        id: 'p6', 
        name: "Nabidz Dessert ", 
        price: 0.00012,
        discount: 0,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
        desc: "Nabidz Dessert bahan baku buah anggur merah yang di fermentasi esterifikasi biokimia resep pribadi dan di padu dengan proses istihalah microbiome dan asam organik akan meningkatkan kualitas pencernaan dimana sistem imun 90% pada pencernaan.",
        rating: 4.9,
        sold: 21,
        reviews: [
            { user: "KayuSolid", comment: "Benar-benar kayu jati asli, berat dan kokoh." }
        ]
    },
    { 
        id: 'p7', 
        name: "Lampu Gantung Industrial - Model Black Dome", 
        price: 0.015, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80"], 
        desc: "Lampu dekoratif plafon, diameter 30cm untuk kesan estetik industrial di cafe atau rumah Anda.",
        rating: 4.5,
        sold: 110,
        reviews: [
            { user: "CafeOwner", comment: "Bikin suasana ruangan jadi keren!" }
        ]
    },
    { 
        id: 'p8', 
        name: "Rak Buku Kayu 5 Tingkat - Slim Design", 
        price: 0.03, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=500&q=80"], 
        desc: "Rak buku hemat ruang, tinggi 180cm lebar 40cm. Mudah dirakit dan sanggup menahan beban berat.",
        rating: 4.7,
        sold: 76,
        reviews: [
            { user: "BookWorm", comment: "Solusi buat yang punya banyak buku di ruangan sempit." }
        ]
    },
    { 
        id: 'p9', 
        name: "Karpet Bulu Lembut 160x210 - Creamy White", 
        price: 0.012, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?w=500&q=80"], 
        desc: "Karpet lantai premium, sangat lembut dan mudah dibersihkan. Memberikan kesan hangat pada kamar tidur.",
        rating: 4.8,
        sold: 230,
        reviews: [
            { user: "CozyHome", comment: "Bulunya tebal dan tidak mudah rontok." }
        ]
    },
    { 
        id: 'p10', 
        name: "Set Gorden Jendela - Model Smokering Minimalis", 
        price: 0.008, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80"], 
        desc: "Gorden blackout ukuran 140x220cm, tersedia berbagai warna. Menghalau sinar matahari hingga 90%.",
        rating: 4.6,
        sold: 150,
        reviews: [
            { user: "MamaRiri", comment: "Kainnya jatuh dan warnanya cantik." }
        ]
    },
    { 
        id: 'p11', 
        name: "Jam Dinding Kayu - Tipe Scandinavian", 
        price: 0.005, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80"], 
        desc: "Jam dinding estetik diameter 35cm, mesin sweep movement (tidak berdetak). Tenang dan elegan.",
        rating: 4.7,
        sold: 310,
        reviews: [
            { user: "MinimalisArt", comment: "Sangat hening, cocok buat di kamar." }
        ]
    },
    { 
        id: 'p12', 
        name: "Tanaman Hias Artificial - Model Monstera Large", 
        price: 0.01, 
        category: "Rumah", 
        images: ["https://images.unsplash.com/photo-1581404476143-fb31d742929f?w=500&q=80"], 
        desc: "Tanaman palsu mirip asli dengan pot keramik, tinggi 80cm. Memberikan kesan hijau tanpa perlu perawatan.",
        rating: 4.5,
        sold: 95,
        reviews: [
            { user: "PlantParent", comment: "Mirip aslinya kalau dilihat dari jauh." }
        ]
    },
    { 
        id: 'e1', 
        name: "Smartphone Pi-Phone X - 256GB Platinum", 
        price: 0.15, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"], 
        desc: "Layar AMOLED 6.7 inci, RAM 12GB, Baterai 5000mAh. Support native Pi App ekosistem.",
        rating: 4.9,
        sold: 140,
        reviews: [
            { user: "TechReviewer", comment: "Performa kencang, support Pi OS dengan baik." }
        ]
    },
    { 
        id: 'e2', 
        name: "Wireless Earbuds Pro - Noise Cancelling", 
        price: 0.02, 
        category: "Elektronik", 
        images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"], 
        desc: "Audio High-Fidelity, tahan air IPX5. Baterai tahan hingga 24 jam dengan case pengisian.",
        rating: 4.7,
        sold: 420,
        reviews: [
            { user: "MusicLover", comment: "Bass-nya mantap, noise cancelling-nya oke." }
        ]
    },
    { 
        id: 'hb4', 
        name: "COCO Pro 10 ", 
        price: 0.00006, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
        desc: "Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma Dan Dengan Formula Bioteknologi Khusus Live probiotic, Immune support,High Antioksidant,Improved Digestion,Naturally Energizing.",
        rating: 5.0,
        sold: 1200,
        reviews: [
            { user: "Bunda_Ika", comment: "Anak-anak jadi jarang sakit minum ini." }
        ]
    },
    { 
        id: 'v1', 
        name: "Sedan Sport Luxury - Tipe S1", 
        price: 5.5, 
        category: "Mobil", 
        images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"], 
        desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof. Keamanan tingkat tinggi dengan smart driving assist.",
        rating: 5.0,
        sold: 3,
        reviews: [
            { user: "VVIP_Member", comment: "Mobil impian yang akhirnya terbeli dengan Pi." }
        ]
    },
    { 
        id: 'm1', 
        name: "Motor Sport 250cc - Black Matte", 
        price: 0.002, 
        category: "Motor", 
        images: ["https://i.ibb.co.com/spcrbbKT/Motor-250cc-Terbaik.jpg"], 
        desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern. Cocok untuk penggunaan dalam kota maupun touring.",
        rating: 4.8,
        sold: 12,
        reviews: [
            { user: "RiderPi", comment: "Tarikan enteng, tampilannya gahar banget." }
        ]
    },
    { 
        id: 'm1', 
        name: "Motor Sport 250cc - Black Matte", 
        price: 0.002, 
        category: "Motor", 
        images: ["https://i.ibb.co.com/Fkp8tHJH/58942-kawasaki-ninja-h2r-model-kit-motosiklet-112-39198-1.jpg"], 
        desc: "KAWASAKI NINJA H2R (Model 2026) Status: Motor produksi massal terkencang di dunia (Khusus sirkuit/Track Only).Harga: Rp1,1 Miliar - Rp1,5 Miliar.Mesin: 998cc, 4-Silinder Segaris, dengan teknologi Supercharger.Tenaga: 310 HP (Mencapai 326 HP dengan Ram Air).Top Speed: ±400 km/jam.Material: Bodi Full Carbon Fiber & Rangka Trellis Hijau Khas Kawasaki.Aerodinamika: Dilengkapi sayap karbon (winglets) untuk stabilitas di kecepatan tinggi.Kaki-kaki: Rem Brembo Stylema, Suspensi Öhlins TTX36, dan ban slick balap.",
        rating: 4.8,
        sold: 12,
        reviews: [
            { user: "RiderPi", comment: "Tarikan enteng, tampilannya gahar banget." }
        ]
    }
];

// Pastikan produk lainnya juga memiliki properti rating, sold, dan reviews agar tidak error
productsData.forEach(p => {
    if(!p.rating) p.rating = 4.8;
    if(!p.sold) p.sold = Math.floor(Math.random() * 100) + 10;
    if(!p.reviews) p.reviews = [{user: "Pembeli", comment: "Barang bagus sesuai pesanan."}];
});

    // --- 2. INISIALISASI ---
    async function initPi() {
        try {
            await Pi.init({ version: "2.0", sandbox: false });
        } catch (e) { console.error("Init Error:", e); }
    }

    // --- 3. FORM ALAMAT ---
    window.showAddressForm = () => {
        const overlay = document.createElement('div');
        overlay.id = "address-overlay";
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:10001; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        overlay.innerHTML = `
            <div style="background:white; padding:25px; border-radius:20px; width:100%; max-width:350px; color:#333; position:relative;">
                <div onclick="document.getElementById('address-overlay').remove()" style="position:absolute; top:15px; right:15px; width:30px; height:30px; background:#f2f2f2; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; font-weight:bold; color:#666;">✕</div>
                <h3 style="margin-top:0; margin-bottom:20px; text-align:center;">Alamat Pengiriman</h3>
                <div style="margin-bottom:12px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">Nama Penerima</label><input type="text" id="ship-name" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" value="${userAddress.nama}"></div>
                <div style="margin-bottom:12px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">No HP/WA</label><input type="number" id="ship-phone" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; box-sizing:border-box;" value="${userAddress.telepon}"></div>
                <div style="margin-bottom:20px;"><label style="font-size:0.8rem; font-weight:bold; color:#666;">Alamat Lengkap</label><textarea id="ship-address" style="width:100%; padding:12px; margin-top:5px; border:1px solid #ddd; border-radius:8px; height:80px; box-sizing:border-box; resize:none;">${userAddress.alamatLengkap}</textarea></div>
                <button onclick="saveAddress()" style="width:100%; background:#6748d7; color:white; border:none; padding:14px; border-radius:10px; font-weight:bold; cursor:pointer;">Simpan Alamat</button>
            </div>`;
        document.body.appendChild(overlay);
    };

    window.saveAddress = () => {
        userAddress = {
            nama: document.getElementById('ship-name').value,
            telepon: document.getElementById('ship-phone').value,
            alamatLengkap: document.getElementById('ship-address').value
        };
        if(!userAddress.nama || !userAddress.alamatLengkap) return alert("Mohon lengkapi data!");
        document.getElementById('address-overlay').remove();
        alert("Alamat disimpan.");
    };

    // --- 4. RENDER BERANDA (VERSI PERBAIKAN DISKON) ---
function renderProducts(data, targetGridId) {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;
    grid.innerHTML = "";
    data.forEach(p => {
        const displayPrice = p.price.toFixed(5); 

        // LOGIKA DISKON: 
        // Jika p.discount ada dan lebih besar dari 0, maka tampilkan badge.
        // Jika tidak ada (seperti produk e-book), maka kosongkan.
        const discountBadge = (p.discount && p.discount > 0) 
            ? `<span class="discount-badge">-${p.discount}%</span>` 
            : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-container" onclick="openProductDetail('${p.id}')">
                ${discountBadge} 
                <img src="${p.images[0]}" alt="${p.name}">
                <div class="xtra-label"><span class="xtra-text">XTRA</span><span class="ongkir-text">Gratis Ongkir+</span></div>
            </div>
            <div class="product-info">
                <h3 class="product-name" onclick="openProductDetail('${p.id}')">${p.name}</h3>
                <div class="price">${displayPrice} π</div>
                <div class="free-ship-tag"><img src="https://cdn-icons-png.flaticon.com/512/709/709790.png" width="12"> Gratis ongkir</div>
                <div class="card-bottom">
                    <div class="rating-text"><span class="star">★</span> ${p.rating} | ${p.sold} terjual</div>
                    <button class="btn-buy-now" onclick="event.stopPropagation(); window.handlePayment(${p.price}, '${p.name}')">Beli</button>
                </div>
            </div>`;
        grid.appendChild(card);
    });
}

    // --- 5. PEMBAYARAN ---
    window.handlePayment = async (amount, name) => {
        if (!currentUser) return alert("Silakan Login di Profil!");
        if (!userAddress.nama) { alert("Isi alamat pengiriman dulu!"); window.showAddressForm(); return; }
        try {
            await Pi.createPayment({
                amount: parseFloat(amount),
                memo: `Pembelian ${name}`,
                metadata: { productName: name },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    const res = await fetch('/api/approve', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId}) });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    const res = await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId, txid}) });
                    if (res.ok) { 
                        showSuccessOverlay(amount, name, txid);
                        if(name === 'Total Keranjang') { cart = []; updateCartUI(); }
                    }
                },
                onCancel: () => {},
                onError: (e, p) => { if(p) handleIncompletePayment(p); }
            });
        } catch (err) { console.error(err); }
    };

    function showSuccessOverlay(amount, name, txid) {
        const overlay = document.createElement('div');
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box;";
        const pesan = `Halo Admin, saya sudah bayar π ${amount} untuk ${name}.%0ATXID: ${txid}%0A%0AAlamat: ${userAddress.nama}, ${userAddress.telepon}, ${userAddress.alamatLengkap}`;
        overlay.innerHTML = `
            <div style="background:white; padding:30px; border-radius:25px; max-width:350px; width:100%; text-align:center;">
                <div style="font-size: 50px;">✅</div>
                <h2 style="color:#27ae60;">Berhasil!</h2>
                <p>Pembayaran diterima. Klik tombol di bawah untuk kirim bukti ke WhatsApp.</p>
                <a href="https://wa.me/${ADMIN_WA}?text=${pesan}" target="_blank" style="display:block; background:#25D366; color:white; text-decoration:none; padding:15px; border-radius:12px; font-weight:bold;">Kirim Ke WhatsApp</a>
                <button onclick="location.reload()" style="background:none; border:none; color:#999; margin-top:10px; cursor:pointer; text-decoration:underline;">Tutup</button>
            </div>`;
        document.body.appendChild(overlay);
    }

    // --- 6. AUTH, KERANJANG, NAVIGASI ---
    window.handleAuth = async () => {
        const btn = document.getElementById('login-btn');
        if (currentUser) { currentUser = null; btn.innerText = "Login"; return; }
        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (p) => handleIncompletePayment(p));
            currentUser = auth.user;
            btn.innerText = "Logout";
            document.getElementById('profile-username').innerText = currentUser.username;
        } catch (e) { alert("Gagal Login."); console.error(e); }
    };

    window.addToCart = (id) => {
        const p = productsData.find(x => x.id === id);
        if(p) { cart.push(p); alert("Ditambah ke keranjang!"); updateCartUI(); }
    };

    function updateCartUI() {
        const grid = document.getElementById('cart-items');
        if (!grid) return;
        if (cart.length === 0) { grid.innerHTML = "<p style='text-align:center;'>Keranjang Kosong</p>"; return; }
        const total = cart.reduce((s, i) => s + i.price, 0).toFixed(4);
        grid.innerHTML = `
            <button onclick="window.showAddressForm()" style="width:100%; background:#3498db; color:white; border:none; padding:10px; border-radius:8px; margin-bottom:10px;">📍 Alamat Pengiriman</button>
            ${cart.map((i) => `<div style="display:flex; justify-content:space-between; padding:10px; background:white; margin-bottom:5px; border-radius:10px;"><span>${i.name}</span><b>π ${i.price}</b></div>`).join('')}
            <div style="padding:15px; text-align:center;">
                <b>Total: π ${total}</b><br><br>
                <button class="btn-buy-now" style="width:100%;" onclick="window.handlePayment(${total}, 'Total Keranjang')">Checkout</button>
            </div>`;
    }

    window.switchPage = (pageId) => {
    // 1. Sembunyikan semua halaman
    ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => {
        const el = document.getElementById(p);
        if(el) el.classList.add('hidden');
    });

    // 2. Tampilkan halaman yang dipilih
    const activePage = document.getElementById(`page-${pageId}`);
    if(activePage) activePage.classList.remove('hidden');

    // 3. Update navigasi bawah agar ikon yang aktif berubah warna
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${pageId}`);
    if(activeNav) activeNav.classList.add('active');

    // 4. Logika Khusus tiap Halaman
    if(pageId === 'home') {
        renderProducts(productsData, 'main-grid');
    }

    // TAMBAHKAN INI: Logika saat membuka halaman Cari
    if(pageId === 'cari') {
        const sInput = document.getElementById('search-input');
        const sResult = document.getElementById('search-results');
        
        if(sInput) sInput.value = ""; // Reset kolom ketik jadi kosong
        if(sResult) {
            sResult.innerHTML = `
                <p style="grid-column: span 2; text-align: center; color: #64748b; padding: 40px 20px; font-size: 0.85rem;">
                    🔍 Cari emas, gadget, atau produk premium lainnya...
                </p>`;
        }
    }
};

    // --- 7. DETAIL PRODUK ---
    
    // Fungsi untuk menutup halaman detail (Harus ada agar tombol hijau berfungsi)
    window.closeProductDetail = () => {
        document.getElementById('product-detail-page').classList.add('hidden');
    };

    window.openProductDetail = (productId) => {
        const p = productsData.find(x => x.id === productId);
        if (!p) return;
        
        document.getElementById('product-detail-page').scrollTop = 0;
        const displayPriceDetail = p.price.toFixed(5);
        
        document.getElementById('detail-content').innerHTML = `
            <div style="position: sticky; top: 0; padding: 15px; background: white; border-bottom: 1px solid #eee; z-index: 100; display: flex; align-items: center;">
                <button onclick="closeProductDetail()" style="border: none; background: #27ae60; color: white; padding: 10px 22px; border-radius: 20px; font-weight: 800; display: flex; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <span style="font-size: 1.2rem;">←</span> KEMBALI
                </button>
            </div>

            <div style="width: 100%; background: white; height: 320px; display: flex; align-items: center; justify-content: center;">
                <img src="${p.images[0]}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            
            <div style="padding: 20px; background: white; border-radius: 25px 25px 0 0; margin-top: -20px; position: relative; min-height: 400px;">
                <span style="color: #00bfa5; font-size: 0.75rem; font-weight: 800; text-transform: uppercase;">${p.category}</span>
                <h2 style="margin: 10px 0; font-size: 1.5rem; font-weight: 800; color: #1a1a1a;">${p.name}</h2>
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; font-size: 0.9rem; color: #666;">
                    <span>⭐ <b>${p.rating}</b></span><span>|</span><span>Terjual <b>${p.sold}+</b></span>
                </div>
                <div style="font-size: 2.2rem; font-weight: 900; color: #b71c1c; margin-bottom: 25px;">π ${displayPriceDetail}</div>
                
                <div style="font-weight: 800; margin-bottom: 10px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px;">Deskripsi Produk</div>
                <p style="font-size: 0.95rem; color: #4a5568; line-height: 1.7; margin-bottom: 30px; text-align: justify;">${p.desc}</p>
                
                <div style="font-weight: 800; margin-bottom: 15px;">Ulasan Pembeli</div>
                <div style="margin-bottom: 120px;">
                    ${p.reviews.map(rev => `
                        <div style="padding: 12px; background: #f8f9fa; border-radius: 12px; margin-bottom: 10px; border: 1px solid #edf2f7;">
                            <div style="font-weight: 700; color: #4a148c;">@${rev.user}</div>
                            <div style="font-size: 0.85rem;">${rev.comment}</div>
                        </div>`).join('')}
                </div>
            </div>

            <div style="position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 15px 20px 30px 20px; display: grid; grid-template-columns: 1fr 1.5fr; gap: 12px; box-shadow: 0 -5px 20px rgba(0,0,0,0.1); z-index: 101;">
                <button onclick="window.addToCart('${p.id}')" style="background: white; color: #4a148c; border: 2px solid #4a148c; padding: 14px; border-radius: 14px; font-weight: 800;">+ Keranjang</button>
                <button onclick="window.handlePayment(${p.price}, '${p.name}')" style="background: #4a148c; color: white; border: none; padding: 14px; border-radius: 14px; font-weight: 800;">Beli Sekarang</button>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

   // --- 8. FILTER & LAIN-LAIN ---
window.filterCategory = (category, element) => {
    // 1. Filter data
    const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
    
    // 2. Tampilkan hasil (pastikan menggunakan window. jika renderProducts ada di lingkup global)
    if (window.renderProducts) {
        window.renderProducts(filtered, 'main-grid');
    } else {
        renderProducts(filtered, 'main-grid');
    }

    // 3. Update warna pill (Hanya mengubah yang sudah ada di HTML)
    const allPills = document.querySelectorAll('.category-pill');
    allPills.forEach(pill => pill.classList.remove('active'));
    
    // Jika element (this) dikirim dari HTML, tambahkan class active (warna ungu)
    if (element) {
        element.classList.add('active');
    }
};

    async function handleIncompletePayment(p) {
        await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId: p.identifier, txid: p.transaction.txid}) });
    }

    const banners = ["https://i.ibb.co.com/dsXZPqYM/ORANG-PERTAMA-20260202-171219-0000.png", "https://i.ibb.co.com/W4RZCvCL/ORANG-PERTAMA-20260205-080941-0000.png", "https://i.ibb.co.com/SwjWGRKm/ORANG-PERTAMA-20260205-094439-0000.png"];
    let idx = 0;
    setInterval(() => { 
        const img = document.getElementById('banner-img');
        if(img) { idx = (idx + 1) % banners.length; img.src = banners[idx]; }
    }, 4000);

    // --- 9. LOGIKA PENCARIAN ---
// --- LOGIKA PENCARIAN (INPUT DETECTION) ---
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        const filtered = productsData.filter(p => 
            p.name.toLowerCase().includes(keyword) || 
            p.category.toLowerCase().includes(keyword)
        );

        const sResult = document.getElementById('search-results');
        if (keyword === "") {
            sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #999; padding: 20px;">Cari produk premium favoritmu...</p>`;
        } else if (filtered.length > 0) {
            renderProducts(filtered, 'search-results');
        } else {
            sResult.innerHTML = `<p style="grid-column: span 2; text-align: center; padding: 20px;">Produk "${keyword}" tidak ditemukan.</p>`;
        }
    });
}

    // --- EKSEKUSI ---
    await initPi();
    renderProducts(productsData, 'main-grid');
    
    // Pastikan tombol login terpasang event kliknya secara eksplisit
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = window.handleAuth;
    }
});
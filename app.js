document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];

    // --- 1. DATA PRODUK (DATABASE) ---
    const productsData = [
        {
            id: 'p1',
            name: "Mastering Pi Network 2026",
            price: 0.005,
            category: "E-Book",
            images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400"],
            desc: "Panduan optimasi node dan ekosistem Pi terbaru untuk masa depan keuangan digital."
        },
        {
            id: 'p2',
            name: "COCO Probiotik",
            price: 0.010,
            category: "Herbal",
            images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"],
            desc: "Minuman probiotik alami untuk kesehatan pencernaan dan daya tahan tubuh optimal."
        },
        {
            id: 'p3',
            name: "Smart Home System Pro",
            price: 0.500,
            category: "Rumah",
            images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"],
            desc: "Paket instalasi lengkap smart home berbasis IoT, kendalikan rumah dari smartphone Anda."
        },
        {
            id: 'p4',
            name: "Premium Smartphone X",
            price: 1.200,
            category: "Elektronik",
            images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"],
            desc: "Gadget flagship dengan performa tinggi, kamera kelas profesional, dan desain elegan."
        },
        {
            id: 'p5',
            name: "Sofa Minimalis 2 Seater - Modern Grey",
            price: 0.05,
            category: "Rumah",
            images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"],
            desc: "Sofa nyaman ukuran 150x80cm, cocok untuk ruang tamu dengan konsep minimalis modern."
        },
        {
            id: 'hb4',
            name: "Ekstrak Kurma Pro - Booster Energi",
            price: 0.004,
            category: "Herbal",
            images: ["https://i.ibb.co.com/C5dj5y6j/IMG-20251130-WA0028.jpg"],
            desc: "Sari kurma pekat berkualitas tinggi untuk meningkatkan stamina dan pemulihan tubuh."
        },
        {
            id: 'v1',
            name: "Sedan Sport Luxury - Tipe S1",
            price: 5.5,
            category: "Mobil",
            images: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80"],
            desc: "Mesin Turbo 2.0L, Interior Kulit Premium, Panoramic Sunroof, dan sistem keamanan tercanggih."
        },
        {
            id: 'm1',
            name: "Motor Sport 250cc - Black Matte",
            price: 1.2,
            category: "Motor",
            images: ["https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=500&q=80"],
            desc: "Akselerasi cepat, ABS system, Desain aerodinamis modern dengan warna hitam doff premium."
        }
        // ... Tambahkan produk lainnya di sini jika diperlukan
    ];

    // --- 2. INISIALISASI SDK ---
    async function initPi() {
        try {
            await Pi.init({ version: "2.0", sandbox: false });
            console.log("Pi SDK Berhasil diinisialisasi");
        } catch (e) {
            console.error("Gagal inisialisasi SDK:", e);
        }
    }

    // --- 3. LOGIKA RENDER PRODUK (REVISI TOMBOL BELI) ---
function renderProducts(data, targetGridId) {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;
    grid.innerHTML = "";

    data.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div onclick="openProductDetail('${p.id}')">
                <div class="slider-container">
                    <div class="slider-wrapper">
                        <img src="${p.images[0]}" alt="${p.name}">
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <span class="price">π ${p.price}</span>
                </div>
            </div>
            <div style="padding: 0 12px 12px;">
                <button class="btn-buy-now" style="width:100%" onclick="handlePayment(${p.price}, '${p.name}')">Beli</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

    // --- 4. FUNGSI DETAIL PRODUK ---
    window.openProductDetail = function(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product) return;

        const detailContent = document.getElementById('detail-content');
        detailContent.innerHTML = `
            <img src="${product.images[0]}" style="width: 100%; height: 300px; object-fit: cover;">
            <div style="padding: 20px;">
                <p style="color: var(--pi-color); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; margin:0;">${product.category}</p>
                <h2 style="margin: 10px 0;">${product.name}</h2>
                <div class="price" style="font-size: 1.5rem; margin-bottom: 20px;">π ${product.price}</div>
                
                <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; font-size: 1rem;">Deskripsi Produk</h3>
                <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.9rem;">${product.desc}</p>
                
                <div style="background: #f8fafc; padding: 15px; border-radius: 15px; margin-top: 20px; border: 1px solid #eee;">
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Status Stok: <span style="color: #059669; font-weight: bold;">Tersedia (Ready)</span></p>
                </div>
            </div>
        `;

        document.getElementById('product-detail-page').classList.remove('hidden');
        
        // Link tombol "Tambah ke Keranjang" di dalam modal
        document.getElementById('add-to-cart-detail').onclick = () => {
            addToCart(product.id);
            closeProductDetail();
        };
    };

    window.closeProductDetail = function() {
        document.getElementById('product-detail-page').classList.add('hidden');
    };

    // --- 5. KERANJANG & SEARCH ---
    window.addToCart = (productId) => {
        const product = productsData.find(p => p.id === productId);
        cart.push(product);
        alert(`${product.name} ditambahkan ke keranjang!`);
        renderCart();
    };

    function renderCart() {
        const cartGrid = document.getElementById('cart-items');
        if (!cartGrid) return;
        
        if (cart.length === 0) {
            cartGrid.innerHTML = "<p style='padding:20px; color:gray;'>Keranjang kosong.</p>";
            document.getElementById('checkout-container').classList.add('hidden');
        } else {
            renderProducts(cart, 'cart-items');
            document.getElementById('checkout-container').classList.remove('hidden');
        }
    }

    window.switchPage = (pageId) => {
        const pages = ['page-home', 'page-cari', 'page-keranjang', 'page-profile'];
        pages.forEach(p => document.getElementById(p).classList.add('hidden'));
        document.getElementById(`page-${pageId}`).classList.remove('hidden');

        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${pageId}`).classList.add('active');
        
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
        if(pageId === 'keranjang') renderCart();
    };

    window.filterCategory = (category) => {
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
            if(pill.innerText.includes(category) || (category === 'all' && pill.innerText === 'Semua')) {
                pill.classList.add('active');
            }
        });
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
    };

    window.searchProduct = () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));
        renderProducts(filtered, 'search-results');
    };

    // --- 6. AUTH & PEMBAYARAN ---
    window.handleAuth = async () => {
        const loginBtn = document.getElementById('login-btn');
        if (currentUser) {
            if (confirm("Logout?")) {
                currentUser = null;
                loginBtn.innerText = "Login";
                loginBtn.classList.remove('btn-logout-style');
                document.getElementById('profile-username').innerText = "Belum Login";
                document.getElementById('profile-address').innerText = "Belum Terhubung";
            }
            return;
        }

        try {
            const auth = await Pi.authenticate(['username', 'payments', 'wallet_address'], (payment) => {
                handleIncompletePayment(payment);
            });
            currentUser = auth.user;
            loginBtn.innerText = "Logout";
            loginBtn.classList.add('btn-logout-style');
            document.getElementById('profile-username').innerText = currentUser.username;
            document.getElementById('profile-address').innerText = currentUser.uid;
        } catch (err) {
            alert("Gunakan Pi Browser untuk Login");
        }
    };

    // Inisialisasi awal
    await initPi();
    renderProducts(productsData, 'main-grid');
    document.getElementById('login-btn').onclick = handleAuth;
});
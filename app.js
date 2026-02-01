document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let allProducts = []; // Database produk dari JSON
    let cart = JSON.parse(localStorage.getItem('pipro_cart')) || []; // Load keranjang dari storage

    // --- 1. INISIALISASI SDK ---
    try {
        await Pi.init({ version: "2.0", sandbox: false });
        console.log("Pi SDK Ready");
    } catch (e) {
        console.error("SDK Init Error:", e);
    }

    // --- 2. LOAD & RENDER PRODUK ---
    async function loadProducts() {
        try {
            const response = await fetch('products.json');
            allProducts = await response.json();
            renderProducts(allProducts, 'main-grid');
        } catch (err) {
            console.error("Gagal memuat JSON:", err);
            document.getElementById('main-grid').innerHTML = "<p>Gagal memuat data produk.</p>";
        }
    }

    function renderProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = ''; 

        if (products.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px; color: #64748b;">Produk tidak ditemukan.</p>';
            return;
        }

        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="slider-container" id="slider-${p.id}">
                    <span class="category-tag">${p.category}</span>
                    <div class="slider-wrapper">
                        ${p.images.map(img => `<img src="${img}" loading="lazy">`).join('')}
                    </div>
                </div>
                <div class="product-info">
                    <span class="price">π ${p.price}</span>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="rating-row">
                        <span style="color:#ffa500">⭐</span>
                        <strong>${p.rating}</strong> 
                        <span style="margin-left:5px; color:#64748b">| Terjual ${p.sold}</span>
                    </div>
                    <p class="desc-text">${p.description}</p>
                    <div class="action-buttons">
                        <button class="btn-cart" onclick="addToCart('${p.id}')">🛒</button>
                        <button class="btn-buy-now" onclick="handlePayment(${p.price}, '${p.name}')">Beli Sekarang</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
            initSlider(`slider-${p.id}`, p.images.length);
        });
    }

    // Slider Logic (Kanan ke Kiri)
    function initSlider(id, totalImages) {
        let index = 0;
        const wrapper = document.querySelector(`#${id} .slider-wrapper`);
        if (!wrapper || totalImages <= 1) return;

        setInterval(() => {
            index = (index + 1) % totalImages;
            wrapper.style.transform = `translateX(-${index * 100}%)`;
        }, 4000 + Math.random() * 2000);
    }

    // --- 3. FILTER & PENCARIAN (REVISED) ---
    window.filterCategory = function(category) {
        // Update UI Warna Tombol
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
            if(pill.innerText.toLowerCase().includes(category.toLowerCase())) {
                pill.classList.add('active');
            }
            if(category === 'all' && pill.innerText.includes('Semua')) {
                pill.classList.add('active');
            }
        });

        const filtered = category === 'all' 
            ? allProducts 
            : allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
        
        renderProducts(filtered, 'main-grid');
    };

    window.searchProduct = function() {
        const input = document.getElementById('search-input').value.toLowerCase();
        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(input));
        renderProducts(filtered, 'search-results');
    };

    // --- 4. KERANJANG LOGIC (FIXED) ---
    window.addToCart = function(productId) {
        const product = allProducts.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            localStorage.setItem('pipro_cart', JSON.stringify(cart));
            alert(`✅ ${product.name} dimasukkan ke keranjang!`);
            renderCart();
        }
    };

    function renderCart() {
        const container = document.getElementById('cart-items');
        const emptyMsg = document.getElementById('empty-cart');
        if (!container) return;

        if (cart.length === 0) {
            container.innerHTML = '';
            emptyMsg.style.display = 'block';
        } else {
            emptyMsg.style.display = 'none';
            renderProducts(cart, 'cart-items');
        }
    }

    // --- 5. NAVIGASI (SPA) ---
    window.switchPage = function(pageName) {
        const target = pageName.toLowerCase();
        
        // Hide all
        document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

        // Show target
        if (target === 'cari') {
            document.getElementById('page-cari').classList.remove('hidden');
            document.querySelectorAll('.nav-item')[1].classList.add('active');
        } else if (target === 'keranjang') {
            document.getElementById('page-keranjang').classList.remove('hidden');
            document.querySelectorAll('.nav-item')[2].classList.add('active');
            renderCart();
        } else if (target === 'profil') {
            document.getElementById('page-profile').classList.remove('hidden');
            document.querySelectorAll('.nav-item')[3].classList.add('active');
            updateProfileUI();
        } else {
            document.getElementById('page-home').classList.remove('hidden');
            document.querySelectorAll('.nav-item')[0].classList.add('active');
        }
    };

    // --- 6. AUTH & PAYMENT ---
    async function updateProfileUI() {
        const userEl = document.getElementById('profile-username');
        const addrEl = document.getElementById('profile-address');
        if (currentUser) {
            userEl.innerText = currentUser.username;
            addrEl.innerText = `UID: ${currentUser.uid}`;
            document.getElementById('login-btn').innerText = "Logout";
        }
    }

    window.handlePayment = async function(amount, productName) {
        if (!currentUser) {
            alert("Silakan login di menu Profil!");
            switchPage('Profil');
            return;
        }
        // Logika Pi Payment disini...
        alert(`Memproses pembayaran π ${amount} untuk ${productName}`);
    };

    // Initialize
    loadProducts();
});
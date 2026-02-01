document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let allProducts = [];
    let cart = JSON.parse(localStorage.getItem('pipro_cart')) || [];

    // Init SDK
    try { await Pi.init({ version: "2.0", sandbox: false }); } catch(e) {}

    // Load Products
    async function loadData() {
        try {
            const res = await fetch('products.json');
            allProducts = await res.json();
            renderProducts(allProducts, 'main-grid');
        } catch(e) { console.error("Gagal load JSON"); }
    }

    function renderProducts(data, containerId, isCart = false) {
        const container = document.getElementById(containerId);
        if(!container) return;
        container.innerHTML = '';

        data.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="slider-container" id="slider-${containerId}-${index}">
                    <div class="slider-wrapper">
                        ${p.images.map(img => `<img src="${img}">`).join('')}
                    </div>
                </div>
                <div class="product-info">
                    <span class="price">π ${p.price}</span>
                    <h3 class="product-name">${p.name}</h3>
                    ${isCart ? 
                        `<button class="btn-delete" onclick="removeFromCart(${index})">🗑️ Hapus</button>` :
                        `<div class="action-buttons">
                            <button class="btn-cart" onclick="addToCart('${p.id}')">🛒</button>
                            <button class="btn-buy-now" onclick="handlePayment(${p.price}, '${p.name}')">Beli</button>
                        </div>`
                    }
                </div>
            `;
            container.appendChild(card);
            if(p.images.length > 1) initSlider(`slider-${containerId}-${index}`, p.images.length);
        });
    }

    function initSlider(id, total) {
        let i = 0;
        const el = document.querySelector(`#${id} .slider-wrapper`);
        setInterval(() => {
            i = (i + 1) % total;
            if(el) el.style.transform = `translateX(-${i * 100}%)`;
        }, 4000);
    }

    // Navigation Fix
    window.switchPage = (pageId) => {
        document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        const target = document.getElementById(`page-${pageId}`);
        if(target) target.classList.remove('hidden');
        
        // Highlight active nav
        const idx = {home:0, cari:1, keranjang:2, profile:3}[pageId];
        document.querySelectorAll('.nav-item')[idx].classList.add('active');

        if(pageId === 'keranjang') renderCart();
        if(pageId === 'profile') updateProfile();
    };

    // Filter & Search
    window.filterCategory = (cat) => {
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
            if(pill.innerText.toLowerCase().includes(cat.toLowerCase()) || (cat === 'all' && pill.innerText === 'Semua')) {
                pill.classList.add('active');
            }
        });
        const filtered = cat === 'all' ? allProducts : allProducts.filter(p => p.category === cat);
        renderProducts(filtered, 'main-grid');
    };

    window.searchProduct = () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));
        renderProducts(filtered, 'search-results');
    };

    // Cart Logic
    window.addToCart = (id) => {
        const prod = allProducts.find(p => p.id === id);
        cart.push(prod);
        localStorage.setItem('pipro_cart', JSON.stringify(cart));
        alert("Ditambahkan ke keranjang!");
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('pipro_cart', JSON.stringify(cart));
        renderCart();
    };

    function renderCart() {
        renderProducts(cart, 'cart-items', true);
        const checkout = document.getElementById('checkout-container');
        if(cart.length > 0) checkout.classList.remove('hidden');
        else checkout.classList.add('hidden');
    }

    // WhatsApp Checkout
    window.checkoutWhatsApp = () => {
        if(cart.length === 0) return;
        const nomorWA = "6281234567890"; // GANTI DENGAN NOMOR ANDA
        let pesan = `Halo Admin, saya ingin membeli:\n\n`;
        let total = 0;
        
        cart.forEach((item, i) => {
            pesan += `${i+1}. ${item.name} (π ${item.price})\n`;
            total += item.price;
        });
        
        pesan += `\nTotal Harga: π ${total.toFixed(4)}\n`;
        pesan += `Username Pi: ${currentUser ? currentUser.username : 'Guest'}`;
        
        const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
        window.open(url, '_blank');
    };

    // Auth Fix
    const loginBtn = document.getElementById('login-btn');
    loginBtn.onclick = async () => {
        try {
            const auth = await Pi.authenticate(['username', 'payments'], (p) => {});
            currentUser = auth.user;
            updateProfile();
            alert("Login Berhasil!");
        } catch(e) { alert("Login Gagal"); }
    };

    function updateProfile() {
        if(currentUser) {
            document.getElementById('profile-username').innerText = currentUser.username;
            document.getElementById('profile-address').innerText = currentUser.uid;
            loginBtn.innerText = "Logged In";
        }
    }

    loadData();
});
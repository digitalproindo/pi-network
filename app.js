document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let allProducts = [];
    let cart = JSON.parse(localStorage.getItem('pipro_cart')) || [];

    // Inisialisasi SDK Pi
    try { 
        await Pi.init({ version: "2.0", sandbox: false }); 
    } catch(e) { console.error("Pi SDK tidak merespon"); }

    const loginBtn = document.getElementById('login-btn');

    // --- FUNGSI AUTH UTAMA (LOGIN/LOGOUT) ---
    loginBtn.onclick = async () => {
        if (currentUser) {
            // LOGIKA LOGOUT
            currentUser = null;
            alert("Berhasil Logout");
            updateAuthUI();
            updateProfileUI();
        } else {
            // LOGIKA LOGIN
            try {
                const auth = await Pi.authenticate(['username', 'payments'], (p) => {});
                currentUser = auth.user;
                alert("Login Berhasil! Halo " + currentUser.username);
                updateAuthUI();
                updateProfileUI();
            } catch(e) {
                alert("Login Gagal atau Dibatalkan");
            }
        }
    };

    // Update Tampilan Tombol Auth
    function updateAuthUI() {
        if (currentUser) {
            loginBtn.innerText = "Logout";
            loginBtn.classList.add('btn-logout-style');
        } else {
            loginBtn.innerText = "Login";
            loginBtn.classList.remove('btn-logout-style');
        }
    }

    // Update Tampilan Halaman Profil
    window.updateProfileUI = () => {
        const userEl = document.getElementById('profile-username');
        const addrEl = document.getElementById('profile-address');

        if (currentUser) {
            userEl.innerText = currentUser.username;
            addrEl.innerText = currentUser.uid;
        } else {
            userEl.innerText = "Tamu";
            addrEl.innerText = "Silakan login untuk melihat detail akun.";
        }
    };

    // --- LOGIKA NAVIGASI ---
    window.switchPage = (pageId) => {
        document.querySelectorAll('main').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        
        const target = document.getElementById(`page-${pageId}`);
        if(target) target.classList.remove('hidden');
        
        // Highlight navigasi aktif
        const navMap = { home: 0, cari: 1, keranjang: 2, profile: 3 };
        const activeIdx = navMap[pageId];
        if (activeIdx !== undefined) {
            document.querySelectorAll('.nav-item')[activeIdx].classList.add('active');
        }

        if(pageId === 'keranjang') renderCart();
        if(pageId === 'profile') updateProfileUI();
    };

    // --- FUNGSI FILTER KATEGORI (DITAMBAHKAN) ---
    window.filterCategory = (category) => {
        // Update visual tombol filter
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
            if(pill.innerText.includes(category) || (category === 'all' && pill.innerText === 'Semua')) {
                pill.classList.add('active');
            }
        });

        // Filter data produk
        if (category === 'all') {
            renderProducts(allProducts, 'main-grid');
        } else {
            const filtered = allProducts.filter(p => p.category === category);
            renderProducts(filtered, 'main-grid');
        }
    };

    // --- FUNGSI PENCARIAN (DITAMBAHKAN) ---
    window.searchProduct = () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));
        renderProducts(filtered, 'search-results');
    };

    // --- LOGIKA PRODUK & KERANJANG ---
    async function loadData() {
        try {
            const res = await fetch('products.json');
            allProducts = await res.json();
            renderProducts(allProducts, 'main-grid');
        } catch(e) { console.error("Gagal memuat produk"); }
    }

    function renderProducts(data, containerId, isCart = false) {
        const container = document.getElementById(containerId);
        if(!container) return;
        container.innerHTML = '';

        if(data.length === 0) {
            container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px; color: var(--text-muted);">Produk tidak ditemukan.</p>`;
            return;
        }

        data.forEach((p, index) => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="slider-container">
                    <img src="${p.images[0]}" style="width:100%; height:100%; object-fit:cover;">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${p.name}</h3>
                    <span class="price">π ${p.price}</span>
                    ${isCart ? 
                        `<button class="btn-delete" onclick="removeFromCart(${index})">🗑️ Hapus</button>` :
                        `<div class="action-buttons">
                            <button class="btn-cart" onclick="addToCart('${p.id}')">🛒</button>
                            <button class="btn-buy-now" onclick="addToCart('${p.id}'); switchPage('keranjang');">Beli</button>
                        </div>`
                    }
                </div>
            `;
            container.appendChild(card);
        });
    }

    window.addToCart = (id) => {
        const prod = allProducts.find(p => p.id === id);
        if (prod) {
            cart.push({...prod});
            localStorage.setItem('pipro_cart', JSON.stringify(cart));
            alert("Produk masuk keranjang!");
        }
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

    window.checkoutWhatsApp = () => {
        if(cart.length === 0) return;
        const nomorWA = "6282191851112"; // Ganti dengan nomor Anda
        let pesan = `Halo Admin, saya ingin memesan:\n\n`;
        let total = 0;
        cart.forEach((item, i) => {
            pesan += `${i+1}. ${item.name} - π ${item.price}\n`;
            total += parseFloat(item.price);
        });
        pesan += `\nTotal: π ${total.toFixed(4)}\n`;
        pesan += `Pembeli: ${currentUser ? currentUser.username : 'Tamu'}`;
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`, '_blank');
    };

    loadData();
    updateAuthUI(); 
});
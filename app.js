document.addEventListener("DOMContentLoaded", async () => {
    const Pi = window.Pi;
    let currentUser = null;
    let cart = [];
    
    let userAddress = { nama: "", telepon: "", alamatLengkap: "" };

    const ADMIN_WA = "6281906066757"; 

    const productsData = [
        {
            id: "house-001",
            category: "Rumah",
            name: "The Beverly Hills Modern Mansion",
            price: 0.25000,
            images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Luas Tanah:</b> 2.500 m²<br>• <b>Kamar Tidur:</b> 7 Master Suite<br>• <b>Fasilitas:</b> Infinity Pool, Home Cinema, Wine Cellar<br>• <b>Lokasi:</b> Beverly Hills, California<br>• <b>Garasi:</b> Kapasitas 10 Mobil Mewah`
        },
        {
            id: "house-002",
            category: "Rumah",
            name: "Zen Waterfront Villa",
            price: 0.18000,
            images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Pemandangan:</b> Akses Langsung ke Danau Privasi<br>• <b>Gaya:</b> Arsitektur Minimalis Modern<br>• <b>Fasilitas:</b> Dermaga Pribadi, Spa & Sauna, Gym<br>• <b>Sistem:</b> Full Smart Home Technology<br>• <b>Keamanan:</b> Biometric Entry System`
        },
        {
            id: "house-003",
            category: "Rumah",
            name: "Penthouse Skyline Duplex",
            price: 0.12000,
            images: ["https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Lantai:</b> Lantai 50 & 51 (Top Floor)<br>• <b>Pemandangan:</b> 360° City Skyline View<br>• <b>Interior:</b> Marmer Italia & Panel Emas<br>• <b>Fasilitas:</b> Private Rooftop Garden & Jacuzzi<br>• <b>Layanan:</b> 24/7 Concierge Service`
        },
        {
            id: "house-005",
            category: "Rumah",
            name: "Tropical Cliffside Sanctuary",
            price: 0.15500,
            images: ["https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Lokasi:</b> Tebing Uluwatu, Bali<br>• <b>Konsep:</b> Open Living Space with Ocean View<br>• <b>Fasilitas:</b> Private Beach Access, Deck Yoga<br>• <b>Struktur:</b> Kayu Ulin & Batu Alam Lokal<br>• <b>Kamar:</b> 5 Suite dengan Semi-Outdoor Bathroom`
        },
        {
            id: "house-008",
            category: "Rumah",
            name: "The Glass House Estate",
            price: 0.21000,
            images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Material Dominan:</b> Kaca Tempered & Baja Hitam<br>• <b>Privasi:</b> Smart Glass (Bisa Buram Otomatis)<br>• <b>Lansekap:</b> Koi Pond Keliling Bangunan<br>• <b>Ruang:</b> Galeri Seni Pribadi & Studio Musik<br>• <b>Luas:</b> Kavling Sudut 3.000 m²`
        },
        {
            id: "house-009",
            category: "Rumah",
            name: "Mediterranean Seafront Palace",
            price: 0.28000,
            images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Lokasi:</b> French Riviera (Cote d'Azur)<br>• <b>Atap:</b> Terakota Tradisional Spanyol<br>• <b>Taman:</b> Kebun Zaitun & Citrus<br>• <b>Fasilitas:</b> Lapangan Tenis Pribadi, Helipad<br>• <b>Kamar Mandi:</b> Perlengkapan Emas 24 Karat`
        },
        {
            id: "house-010",
            category: "Rumah",
            name: "The Urban Luxury Loft",
            price: 0.08800,
            images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Tipe:</b> Industrial Luxury Loft<br>• <b>Tinggi Plafon:</b> 6 Meter (Double Height Ceiling)<br>• <b>Fitur:</b> Tangga Melingkar Besi Kustom<br>• <b>Lokasi:</b> Pusat Distrik Finansial<br>• <b>Sistem:</b> Voice Controlled Home Automation`
        },
        {
            id: "house-011",
            category: "Rumah",
            name: "The Floating Diamond Villa",
            price: 0.19500,
            images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Dimensi:</b> LB 550 m² (Struktur Terapung)<br>• <b>Lokasi:</b> Maladewa (Private Lagoon)<br>• <b>Fitur:</b> Kamar Tidur Bawah Laut, Dek Berjemur 360°<br>• <b>Material:</b> Kaca Anti-Karat & Kayu Jati Reklamasi<br>• <b>Energi:</b> Kemandirian Energi dengan Panel Surya Laut`
        },
        {
            id: "house-013",
            category: "Rumah",
            name: "Cyber-Tech Underground Bunker",
            price: 0.16000,
            images: ["https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Dimensi:</b> LB 900 m² (Kedalaman 15 Meter)<br>• <b>Keamanan:</b> Pintu Anti-Ledakan, Sistem Filtrasi Udara Nuklir<br>• <b>Fasilitas:</b> Kebun Hidroponik Indoor, Simulator Golf<br>• <b>Teknologi:</b> AI Butler terintegrasi ke seluruh ruangan<br>• <b>Lantai:</b> Epoxy Resin Anti-Statis & Dinding Beton Ekspos`
        },
        {
            id: "house-014",
            category: "Rumah",
            name: "Aspen Snow Peak Lodge",
            price: 0.13500,
            images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Dimensi:</b> LT 3.500 m² / LB 700 m²<br>• <b>Lokasi:</b> Aspen, Colorado (Ski-in/Ski-out Access)<br>• <b>Fitur:</b> Perapian Batu Alam Raksasa, Kolam Air Hangat Outdoor<br>• <b>Material:</b> Kayu Pinus Tua & Batu Granit Pegunungan<br>• <b>Ruangan:</b> Ruang Simpan Perlengkapan Ski Khusus`
        },
        {
            id: "house-015",
            category: "Rumah",
            name: "Mediterranean Cliff Villa",
            price: 0.27000,
            images: ["https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Dimensi:</b> LT 2.200 m² / LB 950 m²<br>• <b>Pemandangan:</b> Laut Mediterania (Amalfi Coast)<br>• <b>Fasilitas:</b> Lift Tebing Pribadi, Bar Tepi Kolam, Bioskop Terbuka<br>• <b>Interior:</b> Keramik Hand-Painted Italia & Furnitur Putih Bersih<br>• <b>Lanskap:</b> Kebun Vertikal & Pohon Lemon`
        },
        {
            id: "house-016",
            category: "Rumah",
            name: "The Brutalist Cube Estate",
            price: 0.11000,
            images: ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Dimensi:</b> LT 1.500 m² / LB 800 m²<br>• <b>Gaya:</b> Brutalisme Kontemporer (Raw Concrete)<br>• <b>Ruangan:</b> Studio Lukis & Ruang Musik Kedap Suara<br>• <b>Fitur:</b> Skylight Masif di Tengah Rumah<br>• <b>Sistem:</b> Smart Lighting System yang mengikuti ritme sirkadian`
        },
        {
            id: "house-017",
            category: "Rumah",
            name: "Amazonian Eco-Mansion",
            price: 0.14500,
            images: ["https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Dimensi:</b> LT 10.000 m² / LB 650 m² (Floating on stilts)<br>• <b>Konsep:</b> Regenerative Architecture (Mandiri Air & Limbah)<br>• <b>Fitur:</b> Dinding Tanaman Hidup, Kolam Renang Air Hujan<br>• <b>Material:</b> Bambu Laminasi & Atap Daun Rumbia Sintetis<br>• <b>Lokasi:</b> Hutan Lindung Tropis`
        },
        {
            id: "house-019",
            category: "Rumah",
            name: "Dubai Sky-High Villa",
            price: 0.35000,
            images: ["https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Dimensi:</b> LB 1.100 m² (Penthouse 3 Lantai)<br>• <b>Fasilitas:</b> Kolam Renang Kaca Gantung, Helipad Gedung<br>• <b>Interior:</b> Aksen Emas 24K & Kristal Baccarat<br>• <b>Pemandangan:</b> Burj Khalifa & Palm Jumeirah<br>• <b>Layanan:</b> Private Chef & Sopir Rolls-Royce`
        },
        {
            id: "house-020",
            category: "Rumah",
            name: "The Vineyard Ranch Estate",
            price: 0.17500,
            images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"],
            desc: `• <b>Dimensi:</b> LT 15 Hektar / LB 1.300 m²<br>• <b>Fitur:</b> Perkebunan Anggur Pribadi, Pabrik Pengolahan Wine<br>• <b>Fasilitas:</b> Lapangan Berkuda, Kandang Kuda Premium<br>• <b>Interior:</b> Gaya Farmhouse Modern dengan Kayu Oak Ekspos<br>• <b>Dapur:</b> Outdoor BBQ Station & Pizza Wood-Oven`
        },
        { 
            id: 'p2', 
            name: "COCO Pro Kunyit", 
            price: 0.00006,
            category: "Herbal", 
            images: ["https://i.ibb.co.com/F4qZdtmN/IMG-20251130-WA0033.jpg"], 
            desc: "Super food Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma..."
        },
        { 
            id: 'p3', 
            name: "An-Nisa", 
            price: 0.00010,
            category: "Herbal", 
            images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
            desc: "Keputihan, Gatal-gatal ,Membunuh bakteri, Melancarkan menstruasi..."
        },
        { 
            id: 'p4', 
            name: "Ar-Rizal", 
            price: 0.00010,
            category: "Herbal", 
            images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
            desc: "Mengencangkan Mr.P, Menguatkan Mr.P, Menguatkan Jantung..."
        },
        { 
            id: 'p3_alt', 
            name: "Smart Home System Pro", 
            price: 0.500, 
            category: "Rumah", 
            images: ["https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=400"], 
            desc: "Paket instalasi smart home berbasis IoT."
        },
        { 
            id: 'p4_alt', 
            name: "Premium Smartphone X", 
            price: 1.200, 
            category: "Elektronik", 
            images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400"], 
            desc: "Gadget premium dengan performa tinggi."
        },
        { 
            id: 'p6', 
            name: "Nabidz Dessert ", 
            price: 0.00012,
            category: "Herbal", 
            images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
            desc: "Nabidz Dessert bahan baku buah anggur merah yang di fermentasi..."
        }
    ];

    productsData.forEach(p => {
        if(!p.rating) p.rating = 4.8;
        if(!p.sold) p.sold = Math.floor(Math.random() * 100) + 10;
        if(!p.reviews) p.reviews = [{user: "Pembeli", comment: "Barang bagus sesuai pesanan."}];
    });

    async function initPi() {
        try {
            await Pi.init({ version: "2.0", sandbox: false });
        } catch (e) { console.error("Init Error:", e); }
    }

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
        window.updateCartUI();
    };

    function renderProducts(data, targetGridId) {
        const grid = document.getElementById(targetGridId);
        if (!grid) return;
        grid.innerHTML = "";
        data.forEach(p => {
            const displayPrice = p.price.toFixed(5); 
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

    window.handlePayment = async (amount, name) => {
        if (!currentUser) {
            showLoginPrompt();
            return;
        }

        if (!userAddress.nama) { 
            showAddressPrompt(); 
            return; 
        }

        let detailedItemName = name;
        if (name === 'Total Keranjang' && cart.length > 0) {
            const itemNames = cart.map(item => item.name).join(", ");
            detailedItemName = `Keranjang (${itemNames})`;
        }

        try {
            await Pi.createPayment({
                amount: parseFloat(amount),
                memo: `Pembelian ${name}`,
                metadata: { productName: detailedItemName },
            }, {
                onReadyForServerApproval: async (paymentId) => {
                    const res = await fetch('/api/approve', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId}) });
                    return res.ok;
                },
                onReadyForServerCompletion: async (paymentId, txid) => {
                    const res = await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId, txid}) });
                    if (res.ok) { 
                        showSuccessOverlay(amount, detailedItemName, txid);
                        if(name === 'Total Keranjang') { cart = []; updateCartUI(); }
                    }
                },
                onCancel: () => {},
                onError: (e, p) => { if(p) handleIncompletePayment(p); }
            });
        } catch (err) { console.error(err); }
    };

    function showLoginPrompt() {
        const overlay = document.createElement('div');
        overlay.id = "login-prompt-overlay";
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(8px);";
        
        overlay.innerHTML = `
            <div style="background:#0b2135; border:2px solid #FFD700; padding:35px 25px; border-radius:25px; max-width:320px; width:100%; text-align:center; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                <h2 style="color:#FFD700; margin:0; font-weight:800; font-size: 1.4rem; text-transform:uppercase;">Selamat Datang</h2>
                <p style="color:#f8fafc; margin:15px 0 25px; font-size:0.95rem; line-height:1.4;">Silakan Login agar Anda bisa melanjutkan pembelian produk premium di Marketplace <br> DIGITAL PRO INDO</p>
                <button onclick="document.getElementById('login-prompt-overlay').remove(); window.handleAuth();" style="background:linear-gradient(45deg, #FFD700, #FFA500); color:#0b2135; border:none; width:100%; padding:15px; border-radius:12px; font-weight:bold; font-size:1rem; cursor:pointer; box-shadow: 0 5px 15px rgba(255,215,0,0.3);">
                    LOGIN SEKARANG
                </button>
                <button onclick="document.getElementById('login-prompt-overlay').remove()" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer; font-size:0.85rem;">Mungkin Nanti</button>
            </div>`;
        document.body.appendChild(overlay);
    }

    function showAddressPrompt() {
        const overlay = document.createElement('div');
        overlay.id = "address-prompt-overlay";
        overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:20000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(8px);";
        
        overlay.innerHTML = `
            <div style="background:#0b2135; border:2px solid #FFD700; padding:35px 25px; border-radius:25px; max-width:320px; width:100%; text-align:center; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                <div style="font-size: 50px; margin-bottom: 15px;">📍</div>
                <h2 style="color:#FFD700; margin:0; font-weight:800; font-size: 1.4rem; text-transform:uppercase;">Alamat Kosong</h2>
                <p style="color:#f8fafc; margin:15px 0 25px; font-size:0.95rem; line-height:1.4;">Lengkapi alamat pengiriman Anda terlebih dahulu agar kami dapat mengirimkan produk dengan tepat.</p>
                <button onclick="document.getElementById('address-prompt-overlay').remove(); window.showAddressForm();" style="background:linear-gradient(45deg, #FFD700, #FFA500); color:#0b2135; border:none; width:100%; padding:15px; border-radius:12px; font-weight:bold; font-size:1rem; cursor:pointer;">
                    LENGKAPI ALAMAT
                </button>
            </div>`;
        document.body.appendChild(overlay);
    }

    function showSuccessOverlay(amount, name, txid) {
        const excelWebhookUrl = "https://script.google.com/macros/s/AKfycbxhmcYyT3lBeLrm4dMGotKonJPwT9ZCMU1jRNMBD8CZITVD3Gyreuv_s81Vgw5Kra3b/exec";
        const dataTransaksi = {
            tanggal: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
            penerima: userAddress.nama,
            username: currentUser ? currentUser.username : "Anonymous",
            item: name,
            total: amount,
            txid: txid,
            alamat: userAddress.alamatLengkap,
            telepon: userAddress.telepon
        };

        fetch(excelWebhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataTransaksi)
        }).catch(err => console.error("Gagal catat Excel:", err));

        const overlay = document.createElement('div');
        overlay.style = "position:fixed; top:0; left:0; right:0; bottom:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:10000; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; backdrop-filter: blur(5px);";
        
        const pesanWhatsApp = `*KONFIRMASI PEMBAYARAN PI NETWORK* %0A*PT. DIGITAL PRO INDO*%0A_______________________________%0A%0AHalo Admin, saya telah berhasil melakukan pembayaran produk premium melalui Pi Browser:%0A%0A *DETAIL TRANSAKSI:*%0A• *Item:* ${name}%0A• *Total:* ${amount} π%0A• *Status:* Success (Pi Network)%0A• *TXID:* \`${txid}\` %0A%0A *DATA PENGIRIMAN:*%0A• *Penerima:* ${userAddress.nama}%0A• *Telepon:* ${userAddress.telepon}%0A• *Alamat:* ${userAddress.alamatLengkap}%0A%0A_______________________________%0A *Mohon segera diproses dan informasikan nomor resi pengiriman. Terima kasih!*`;

        overlay.innerHTML = `
            <div style="background:white; padding:35px 25px; border-radius:30px; max-width:380px; width:100%; text-align:center; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                <div style="width: 80px; height: 80px; background: #e8f5e9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                    <span style="font-size: 45px;">✅</span>
                </div>
                <h2 style="color:#1a0033; margin:0; font-weight:800; font-size: 1.6rem;">Pembayaran Berhasil!</h2>
                <a href="https://wa.me/${ADMIN_WA}?text=${pesanWhatsApp}" target="_blank" style="display:flex; align-items:center; justify-content:center; gap:10px; background:#25D366; color:white; text-decoration:none; padding:18px; border-radius:15px; font-weight:bold; font-size:1.05rem; margin-top:20px;">
                    KIRIM DATA KE WHATSAPP
                </a>
                <button onclick="location.reload()" style="background:none; border:none; color:#94a3b8; margin-top:20px; cursor:pointer;">Kembali ke Beranda</button>
            </div>`;
        document.body.appendChild(overlay);
    }

    window.addToCart = (id) => {
        const p = productsData.find(x => x.id === id);
        if(p) { 
            cart.push(p); 
            alert("✅ Berhasil ditambah ke keranjang!"); 
            window.updateCartUI(); 
        }
    };

    window.removeFromCart = (index) => {
        cart.splice(index, 1); 
        window.updateCartUI(); 
    };

    window.updateCartUI = () => {
        const grid = document.getElementById('cart-items');
        if (!grid) return;

        if (cart.length === 0) {
            grid.innerHTML = `<div style="text-align:center; padding:80px 24px;"><h2 style="color:#1a1a1a;">Keranjang Anda Kosong</h2><button onclick="switchPage('home')" style="background:#6748d7; color:white; border:none; padding:16px 40px; border-radius:18px; font-weight:700; cursor:pointer;">Mulai Belanja</button></div>`;
            return;
        }

        const total = cart.reduce((s, i) => s + i.price, 0).toFixed(5);
        grid.innerHTML = `
            <div style="padding: 15px;">
                <div onclick="window.showAddressForm()" style="background:#fdfaff; padding:15px; border-radius:15px; display:flex; align-items:center; justify-content:space-between; margin-bottom:20px; border:1px dashed #6748d7; cursor:pointer;">
                    <div>
                        <div style="font-size:0.7rem; color:#6748d7; font-weight:bold;">ALAMAT PENGIRIMAN</div>
                        <div style="font-size:0.85rem; font-weight:700;">${userAddress.nama ? userAddress.nama + ' (' + userAddress.telepon + ')' : 'Klik untuk lengkapi alamat'}</div>
                    </div>
                    <span>></span>
                </div>
                <div>
                    ${cart.map((item, index) => `
                        <div style="display:flex; align-items:center; gap:12px; background:white; padding:12px; margin-bottom:12px; border-radius:18px; position:relative; border: 1px solid #f1f5f9;">
                            <img src="${item.images[0]}" style="width:70px; height:70px; border-radius:12px; object-fit:cover;">
                            <div style="flex:1; text-align:left;">
                                <div style="font-size:0.85rem; font-weight:700;">${item.name}</div>
                                <div style="font-size:1rem; font-weight:800; color:#b71c1c;">π ${item.price.toFixed(5)}</div>
                            </div>
                            <div onclick="window.removeFromCart(${index})" style="position:absolute; top:10px; right:10px; width:26px; height:26px; background:#fff1f1; color:#ff4d4f; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;">✕</div>
                        </div>
                    `).join('')}
                </div>
                <div style="background:white; padding:20px; border-radius:22px; margin-top:20px; border: 1px solid #f1f5f9;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:1.1rem; font-weight:800;"><span>Total Tagihan</span><span style="color:#b71c1c;">π ${total}</span></div>
                    <button style="width:100%; padding:16px; border-radius:16px; background:#6748d7; color:white; border:none; font-weight:800; cursor:pointer;" onclick="window.handlePayment(${total}, 'Total Keranjang')">CHECKOUT SEKARANG 🚀</button>
                </div>
            </div>`;
    };

    window.switchPage = (pageId) => {
        ['page-home', 'page-cari', 'page-keranjang', 'page-profile'].forEach(p => {
            const el = document.getElementById(p);
            if(el) el.classList.add('hidden');
        });
        const activePage = document.getElementById(`page-${pageId}`);
        if(activePage) activePage.classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const activeNav = document.getElementById(`nav-${pageId}`);
        if(activeNav) activeNav.classList.add('active');
        if(pageId === 'home') renderProducts(productsData, 'main-grid');
    };

    window.closeProductDetail = () => {
        document.getElementById('product-detail-page').classList.add('hidden');
        const bNav = document.querySelector('.bottom-nav');
        if(bNav) bNav.style.display = 'flex';
    };

    window.openProductDetail = (productId) => {
        const p = productsData.find(x => x.id === productId);
        if (!p) return;

        const bNav = document.querySelector('.bottom-nav');
        if(bNav) bNav.style.display = 'none';

        document.getElementById('product-detail-page').scrollTop = 0;
        document.getElementById('detail-content').innerHTML = `
            <div style="background: white; min-height: 100vh; padding-bottom: 100px; position: relative;">
                <div onclick="closeProductDetail()" style="position: fixed; top: 15px; left: 15px; z-index: 9999; background: #4a148c; width: 45px; height: 45px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; cursor: pointer;">
                    <span style="color:white; font-weight:bold; font-size:20px;">‹</span>
                </div>
                <div style="width: 100%; height: 320px; overflow: hidden;"><img src="${p.images[0]}" style="width: 100%; height: 100%; object-fit: cover;"></div>
                <div style="padding: 20px; background: white; border-radius: 30px 30px 0 0; margin-top: -30px; box-shadow: 0 -10px 20px rgba(0,0,0,0.05);">
                    <h2>${p.name}</h2>
                    <div style="font-size: 2.2rem; font-weight: 900; color: #b71c1c;">π ${p.price.toFixed(5)}</div>
                    <div style="line-height: 1.8; margin-top:15px;">${p.desc}</div>
                    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 12px; margin-top:30px;">
                        <button onclick="window.addToCart('${p.id}')" style="background: white; color: #4a148c; border: 2px solid #4a148c; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer;">+ Keranjang</button>
                        <button onclick="window.handlePayment(${p.price}, '${p.name}')" style="background: #4a148c; color: white; border: none; padding: 18px; border-radius: 18px; font-weight: 800; cursor: pointer;">Beli Sekarang</button>
                    </div>
                </div>
            </div>`;
        document.getElementById('product-detail-page').classList.remove('hidden');
    };

    window.filterCategory = (category, element) => {
        const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);
        renderProducts(filtered, 'main-grid');
        if (element) {
            document.querySelectorAll('.category-pill').forEach(pill => pill.classList.remove('active'));
            element.classList.add('active');
        }
    };

    async function handleIncompletePayment(p) {
        await fetch('/api/complete', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({paymentId: p.identifier, txid: p.transaction.txid}) });
    }

    // Pemindahan Fungsi handleAuth ke global (window) agar aman dieksekusi string HTML dinamis
    window.handleAuth = async () => {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.cssText = "display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); z-index: 9999;";
        loadingOverlay.innerHTML = `<div style="text-align:center; color:white;">⏳ Menghubungkan...</div>`;
        document.body.appendChild(loadingOverlay);

        try {
            const scopes = ['username', 'payments'];
            const auth = await window.Pi.authenticate(scopes, (p) => handleIncompletePayment(p));
            
            currentUser = auth.user;

            const profileDisplay = document.getElementById('profile-username') || document.querySelector('.username-text');
            if (profileDisplay) profileDisplay.innerText = currentUser.username;

            const profileAddress = document.getElementById('profile-address');
            if (profileAddress) profileAddress.innerText = currentUser.uid;

            loadingOverlay.innerHTML = `
                <div style="background-color: #0b2135; border: 3px solid #FFD700; border-radius: 15px; padding: 20px; text-align: center; color: white;">
                    <h2 style="color:#FFD700;">Login Berhasil!</h2>
                    <p>Selamat datang, @${currentUser.username}</p>
                </div>`;

            // Update status UI tombol login utama
            const mainLoginBtn = document.getElementById('login-btn');
            if (mainLoginBtn) {
                mainLoginBtn.innerText = "LOGOUT";
                mainLoginBtn.style.background = "linear-gradient(to right, #ef4444, #b91c1c)";
                mainLoginBtn.onclick = () => location.reload();
            }

            setTimeout(() => { loadingOverlay.remove(); }, 2500);

        } catch (err) { 
            console.error(err); 
            loadingOverlay.remove();
            if (err.message !== "User cancelled login") {
                alert("Gagal Login: " + err.message);
            }
        }
    };

    // Render Awal produk saat siap load
    renderProducts(productsData, 'main-grid');

    // Inisialisasi Pi SDK secara aman
    await initPi();

    // Pasang fungsi klik dinamis pada tombol login berdasar ID
    const mainLoginBtn = document.getElementById('login-btn');
    if (mainLoginBtn) {
        mainLoginBtn.onclick = window.handleAuth;
    }
});

// Fungsi Navigasi Tambahan diluar DOMContentLoaded agar tidak menumpuk scope
function toggleMenu() {
    const nav = document.getElementById("sideNav");
    if (!nav) return;
    nav.style.width = (nav.style.width === "250px") ? "0px" : "250px";
}

function toggleDropdown() {
    const dropdown = document.getElementById("aboutDropdown");
    const btn = document.querySelector(".dropdown-btn");
    if(dropdown.style.display === "block") {
        dropdown.style.display = "none";
        btn.classList.remove("active");
    } else {
        dropdown.style.display = "block";
        btn.classList.add("active");
    }
}

window.addEventListener('click', function(event) {
    const nav = document.getElementById("sideNav");
    const menuIcon = document.querySelector('.menu-icon');
    if (nav && nav.style.width === "250px") {
        if (!nav.contains(event.target) && (!menuIcon || !menuIcon.contains(event.target))) {
            nav.style.width = "0px";
        }
    }
});

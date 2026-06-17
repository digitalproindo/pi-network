// ==========================================
// 1. VARIABEL GLOBAL UTAMA MARKETPLACE
// ==========================================
let currentUser = null;
let cart = [];
let userAddress = { nama: "", telepon: "", alamatLengkap: "" };
const ADMIN_WA = "6281906066757"; 

// ==========================================
// 2. DATA PRODUK MARKETPLACE (Utuh Sempurna)
// ==========================================
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
        desc: "Super food Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma Dan Dengan Formula Bioteknologi Khusus Live probiotic."
    },
    { 
        id: 'p3', 
        name: "An-Nisa", 
        price: 0.00010,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/0jjhzJ7p/Desain-tanpa-judul-20260211-213452-0000.png"], 
        desc: "Keputihan, Gatal-gatal ,Membunuh bakteri, Melancarkan menstruasi, Mengatasi nyeri haid, Mencegah kanker rahim."
    },
    { 
        id: 'p4', 
        name: "Ar-Rizal", 
        price: 0.00010,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/Ndjmbdbj/Desain-tanpa-judul-20260211-214933-0000.png"], 
        desc: "Mengencangkan Mr.P, Menguatkan Mr.P, Menguatkan Jantung, Meningkatkan gairah, Mengatasi ejakulasi dini."
    },
    { 
        id: 'p6', 
        name: "Nabidz Dessert ", 
        price: 0.00012,
        category: "Herbal", 
        images: ["https://i.ibb.co.com/qMCm0C7q/IMG-20260203-WA0004.jpg"], 
        desc: "Nabidz Dessert bahan baku buah anggur merah yang di fermentasi esterifikasi biokimia resep pribadi."
    },
    { 
        id: 'hb4', 
        name: "COCO Pro 10 ", 
        price: 0.00006, 
        category: "Herbal", 
        images: ["https://i.ibb.co.com/4nRdtBpb/IMG-20260203-WA0005.jpg"], 
        desc: "Obat Masa Depan Kelebihan Cocopro Biotech 10 Probiotik Multi strain Madu Air Kelapa,Kunyit,Kurma."
    }
];

// ==========================================
// 3. EVENT LIFECYCLE (LANGSUNG TAMPILKAN)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Siap.");
    
    // LANGSUNG PAKSA RENDER PRODUK KE LAYAR AGAR TIDAK BLANK
    renderUlangKatalogProduk();

    setTimeout(() => {
        jalankanInisialisasiPi();
    }, 1000);

    // Global Click Listener login
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (
            (target.innerText && target.innerText.toUpperCase().includes("LOGIN")) ||
            target.id === "login-btn" || 
            target.classList.contains("LOGIN")
        ) {
            prosesOtentikasiPiNetwork(true);
        }
    });
});

// ==========================================
// 4. FUNCTION INISIALISASI SDK PI
// ==========================================
function jalankanInisialisasiPi() {
    if (window.Pi) {
        try {
            window.Pi.init({ version: "2.0", sandbox: false });
            prosesOtentikasiPiNetwork(false);
        } catch (err) {
            console.error("Kesalahan fungsi Pi.init:", err);
        }
    }
}

// ==========================================
// 5. CORE LOGIN BLOCKCHAIN
// ==========================================
function prosesOtentikasiPiNetwork(isManualClick = false) {
    if (!window.Pi) return;

    window.Pi.authenticate(['username', 'payments'], function(payment) {})
        .then(function(auth) {
            currentUser = auth.user;
            
            // Ganti teks login jadi nama user
            document.querySelectorAll("button, a, div, span").forEach(el => {
                if (el.innerText && el.innerText.toUpperCase().includes("LOGIN")) {
                    el.innerText = auth.user.username.toUpperCase();
                }
            });
        })
        .catch(function(error) {
            console.error("Otentikasi diabaikan/gagal di background.", error);
        });
}

// ==========================================
// 6. SISTEM INJEKSI ANTI-BLANK (RENDERER)
// ==========================================
function renderUlangKatalogProduk() {
    // Ambil target kontainer HTML tempat kartu produk harus diletakkan
    const kontainer = document.getElementById("products-container") || 
                      document.getElementById("product-list") || 
                      document.querySelector(".products-grid") ||
                      document.querySelector(".grid");

    if (!kontainer) {
        console.error("EROR: Kontainer tempat menaruh produk tidak ditemukan di index.html!");
        return;
    }

    kontainer.innerHTML = ""; // Bersihkan kontainer dari text 'loading' atau kosong

    // Loop data untuk membuat kartu HTML produk secara dinamis
    productsData.forEach(produk => {
        const kartuHtml = `
            <div class="product-card" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px; margin: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <img src="${produk.images[0]}" alt="${produk.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 6px;">
                <h3 style="margin: 10px 0 5px 0; font-size: 1.1rem;">${produk.name}</h3>
                <p style="color: #777; font-size: 0.9rem; max-height: 60px; overflow: hidden;">${produk.desc}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                    <span style="font-weight: bold; color: #8a2be2; font-size: 1.1rem;">⚡ ${produk.price} Pi</span>
                    <button onclick="beliProdukKeWhatsapp('${produk.name}', '${produk.price}')" style="background: #8a2be2; color: #fff; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer;">Beli</button>
                </div>
            </div>
        `;
        kontainer.innerHTML += kartuHtml;
    });
    console.log("Katalog produk berhasil di-inject ke dalam HTML.");
}

// Fungsi bantu saat tombol beli diklik
window.beliProdukKeWhatsapp = function(namaBarang, hargaBarang) {
    const textPesanan = encodeURIComponent(`Halo Admin, saya ingin membeli produk:\n\n*Nama:* ${namaBarang}\n*Harga:* ${hargaBarang} Pi\n\nMohon informasi alamat dompet transfer Pi Network.`);
    window.open(`https://wa.me/${ADMIN_WA}?text=${textPesanan}`, '_blank');
};

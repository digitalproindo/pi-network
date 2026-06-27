// =========================================================================
// FILE KHUSUS: dpi-notif.js (MANAJEMEN NOTIFIKASI REALTIME & NEWS UPDATE)
// =========================================================================

// 1. Konfigurasi Endpoint Apps Script & State Global
const SCRIPT_URL_NOTIF = typeof SCRIPT_URL_AMAN !== 'undefined' ? SCRIPT_URL_AMAN : "https://script.google.com/macros/s/AKfycbxhmcYyT3lBeLrm4dMGotKonJPwT9ZCMU1jRNMBD8CZITVD3Gyreuv_s81Vgw5Kra3b/exec";
let statusLokalTerakhir = localStorage.getItem('last_kemitraan_status') || null;

// 2. Logika Utama Sistem Notifikasi Status Realtime
function cekDanJalankanSistemNotif() {
    if (typeof currentUser === 'undefined' || !currentUser || !currentUser.uid) return;

    const urlCek = `${SCRIPT_URL_NOTIF}?action=cekStatus&uid=${encodeURIComponent(currentUser.uid)}`;

    fetch(urlCek)
        .then(res => res.json())
        .then(resData => {
            if (resData && resData.status === "ditemukan") {
                const statusBaru = (resData.statusKemitraan || "MENUNGGU VERIFIKASI").toUpperCase().trim();
                
                // Eksekusi efek visual jika status berubah dari data lokal sebelumnya
                prosesEfekVisualNotifikasi(statusBaru);
                
                // Selalu perbarui data teks di halaman profil jika elemennya ada
                const labelStatus = document.getElementById('partner-status');
                if (labelStatus) {
                    labelStatus.innerText = statusBaru;
                    labelStatus.style.background = (statusBaru.includes("AKTIF") || statusBaru.includes("SUKSES")) ? "#d1fae5" : "#fef3c7";
                    labelStatus.style.color = (statusBaru.includes("AKTIF") || statusBaru.includes("SUKSES")) ? "#065f46" : "#f59e0b";
                }
            }
        })
        .catch(err => console.error("Koneksi Notifikasi Tertunda:", err));
}

// 3. Generator Efek Visual (Banner Beranda & Lonceng Goyang Profil)
function prosesEfekVisualNotifikasi(statusBaru) {
    // A. Efek Lonceng Bergoyang di Samping Status Halaman Profil
    const labelStatus = document.getElementById('partner-status');
    if (labelStatus) {
        let loncengEl = document.getElementById('admin-status-bell-pro');
        if (!loncengEl) {
            loncengEl = document.createElement('span');
            loncengEl.id = 'admin-status-bell-pro';
            loncengEl.className = 'bell-bounce';
            loncengEl.style.marginLeft = '8px';
            loncengEl.style.cursor = 'pointer';
            labelStatus.parentNode.appendChild(loncengEl);
        }

        // Jika status berubah dari sebelumnya, lonceng berbunyi/bergoyang aktif merah
        if (statusLokalTerakhir && statusLokalTerakhir !== statusBaru) {
            loncengEl.innerHTML = "🔔🔴";
            loncengEl.style.display = "inline-block";
            
            // B. Memunculkan Banner Pop-Up Notifikasi di Atas Halaman Beranda
            tampilkanBannerPopUpBeranda(statusBaru);
        } else {
            loncengEl.innerHTML = "🔕";
            loncengEl.style.animation = "none";
        }

        // Jika lonceng diklik, tandai status sebagai 'sudah dibaca' (baca/matikan goyangan)
        loncengEl.onclick = function() {
            localStorage.setItem('last_kemitraan_status', statusBaru);
            statusLokalTerakhir = statusBaru;
            loncengEl.innerHTML = "🔕";
            loncengEl.style.animation = "none";
            const banner = document.getElementById('popup-banner-beranda');
            if (banner) banner.style.display = 'none';
        };
    }
}

function tampilkanBannerPopUpBeranda(statusBaru) {
    const pageHome = document.getElementById('page-home');
    if (!pageHome) return;

    let banner = document.getElementById('popup-banner-beranda');
    if (!banner) {
        banner = document.createElement('div');
        banner.id = 'popup-banner-beranda';
        banner.className = 'notif-banner-pro';
        banner.style = "margin: 15px; padding: 14px; border-radius: 12px; font-size: 0.8rem; font-family: sans-serif; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2); position: relative; display: block;";
        pageHome.insertBefore(banner, pageHome.firstChild); // Disisipkan di paling atas beranda
    }

    if (statusBaru.includes("AKTIF") || statusBaru.includes("SUKSES")) {
        banner.style.backgroundColor = "#d1fae5"; banner.style.color = "#065f46"; banner.style.border = "1.5px solid #34d399";
    } else {
        banner.style.backgroundColor = "#fef3c7"; banner.style.color = "#d97706"; banner.style.border = "1.5px solid #fbbf24";
    }

    banner.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>🔔 <b>Update Status:</b> Pengajuan wilayah Anda kini berstatus <span style="text-decoration:underline;">${statusBaru}</span>!</span>
            <span onclick="this.parentNode.parentNode.style.display='none'" style="cursor:pointer; font-size:1.2rem; margin-left:10px;">&times;</span>
        </div>
    `;
}

// 4. Sistem News / Informasi Update Harian di Kotak Ungu (Hero)
function muatInformasiNewsHarian() {
    const heroBox = document.querySelector('#page-home button')?.parentNode;
    if (!heroBox) return;

    // Cek atau buat wadah komponen berita harian di dalam kotak ungu hero
    let newsContainer = document.getElementById('news-update-hero');
    if (!newsContainer) {
        newsContainer = document.createElement('div');
        newsContainer.id = 'news-update-hero';
        newsContainer.style = "margin-top: 15px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.15); font-family: sans-serif;";
        
        // Disisipkan tepat sebelum tombol pendaftaran wilayah di kotak ungu
        const btnDaftar = heroBox.querySelector('button');
        if (btnDaftar) {
            heroBox.insertBefore(newsContainer, btnDaftar);
        } else {
            heroBox.appendChild(newsContainer);
        }
    }

    // Ambil data info update harian dari database (action=getNews)
    const urlNews = `${SCRIPT_URL_NOTIF}?action=getNews`;
    fetch(urlNews)
        .then(res => res.json())
        .then(data => {
            if (data && data.newsTitle) {
                newsContainer.innerHTML = `
                    <div style="display: inline-flex; align-items: center; gap: 5px; background: rgba(241, 196, 15, 0.2); border: 1px solid #f1c40f; padding: 2px 8px; border-radius: 4px; margin-bottom: 6px;">
                        <span style="font-size: 0.6rem; font-weight: 800; color: #f1c40f; letter-spacing: 0.5px; text-transform: uppercase;">📢 UPDATE NEWS TODAY</span>
                    </div>
                    <p style="margin: 0 0 4px 0; font-size: 0.8rem; font-weight: 700; color: #ffffff;">${data.newsTitle}</p>
                    <p style="margin: 0 0 10px 0; font-size: 0.7rem; color: #cbd5e1; line-height: 1.4;">${data.newsContent}</p>
                `;
            } else {
                // Default fallback info jika data database kosong/belum diisi admin
                newsContainer.innerHTML = `
                    <div style="display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px; margin-bottom: 6px;">
                        <span style="font-size: 0.6rem; font-weight: 800; color: #cbd5e1; text-transform: uppercase;">📢 NEWS INFO</span>
                    </div>
                    <p style="margin: 0 0 10px 0; font-size: 0.7rem; color: #cbd5e1; line-height: 1.4;">Gunakan selalu Pi Browser resmi untuk transaksi logistik aman di PT. Digital Pro Indo.</p>
                `;
            }
        })
        .catch(() => {
            console.warn("Menggunakan info berita default local offline.");
        });
}

// 5. Lifecycle Pemicu Otomatis saat Aplikasi Berjalan
document.addEventListener("DOMContentLoaded", function() {
    // Jalankan injeksi gaya CSS bawaan Anda jika belum termuat
    if (typeof inisialisasiGayaDigitalPro === "function") {
        inisialisasiGayaDigitalPro();
    }
    
    // Muat info harian di kotak ungu secara instan saat beranda dibuka
    muatInformasiNewsHarian();
    
    // Sinkronisasi status realtime dari database
    setTimeout(cekDanJalankanSistemNotif, 3000);
    setInterval(cekDanJalankanSistemNotif, 25000); // Polling background berkala aman anti crash
});

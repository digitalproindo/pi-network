(function() {
    // 1. Desain Gaya Tampilan Bursa Saham (CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        .dpi-ticker-wrapper {
            width: 100%;
            background: #2d124d; /* Ungu gelap elegan khas premium bursa */
            border-top: 1px solid #5a2d82;
            border-bottom: 1px solid #5a2d82;
            padding: 8px 0;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
        }
        .dpi-ticker-container {
            display: flex;
            white-space: nowrap;
            gap: 40px;
            padding-left: 15px;
            animation: tickerScroll 25s linear infinite;
        }
        .dpi-stat-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #ffffff;
            font-size: 13px;
            font-weight: 500;
        }
        .dpi-stat-label {
            color: #bfa3db; /* Ungu muda untuk label text */
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.5px;
        }
        .dpi-stat-value {
            font-family: 'Courier New', Courier, monospace; /* Font angka ala bursa */
            font-weight: bold;
            color: #2ecc71; /* Hijau menyala default bursa naik */
        }
        .dpi-stat-arrow {
            color: #2ecc71;
            font-size: 11px;
        }
        /* Animasi berjalan jika data memanjang pada layar handphone kecil */
        @keyframes tickerScroll {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-30%, 0, 0); }
        }
    `;
    document.head.appendChild(style);

    // 2. Struktur HTML Komponen Statistik
    // Koin staking disesuaikan dengan data riil testnet Anda (638.95 Pi)
    const tickerHtml = `
        <div class="dpi-ticker-container">
            <div class="dpi-stat-item">
                <span class="dpi-stat-label"><i class="fa-solid fa-users"></i> Pengunjung:</span>
                <span class="dpi-stat-value" id="stats-visitor">1,245</span>
                <span class="dpi-stat-arrow">▲ Live</span>
            </div>
            <div class="dpi-stat-item">
                <span class="dpi-stat-label"><i class="fa-solid fa-file-code"></i> Total Tesnet:</span>
                <span class="dpi-stat-value" id="stats-testnet">4,892 Tx</span>
                <span class="dpi-stat-arrow">▲ +1.2%</span>
            </div>
            <div class="dpi-stat-item">
                <span class="dpi-stat-label"><i class="fa-solid fa-vault"></i> Total Staking:</span>
                <span class="dpi-stat-value" id="stats-staking">638.95 Pi</span>
                <span class="dpi-stat-arrow" style="color: #f1c40f;">★ Boosted</span>
            </div>
        </div>
    `;

    // 3. Injeksi Otomatis Komponen ke bawah Kolom Running Text
    // Skrip mendeteksi kontainer setelah input pencarian atau running text di app Anda
    const targetContainer = document.querySelector('.bot-widget-toggle') ? null : document.body; 
    
    const tickerWrapper = document.createElement('div');
    tickerWrapper.className = 'dpi-ticker-wrapper';
    tickerWrapper.id = 'dpiLiveTicker';
    tickerWrapper.innerHTML = tickerHtml;

    // Menaruh elemen secara presisi di layout atas web
    const headerElement = document.querySelector('main') || document.body.firstChild;
    if (headerElement && headerElement.parentNode) {
        headerElement.parentNode.insertBefore(tickerWrapper, headerElement);
    }

    // 4. Logika Perubahan Data Real-Time Simulasi Bursa (Live-time update)
    setInterval(() => {
        // Simulasi fluktuasi pengunjung (+/- random)
        const visitorEl = document.getElementById('stats-visitor');
        if(visitorEl) {
            let currentVisitor = parseInt(visitorEl.innerText.replace(/,/g, ''));
            currentVisitor += Math.floor(Math.random() * 5) - 2; // Naik turun acak
            visitorEl.innerText = currentVisitor.toLocaleString('id-ID');
        }

        // Simulasi hitungan transaksi transaksi testnet yang masuk ke blockchain
        const testnetEl = document.getElementById('stats-testnet');
        if(testnetEl) {
            let currentTx = parseInt(testnetEl.innerText);
            if(Math.random() > 0.6) { // Peluang transaksi bertambah
                currentTx += 1;
                testnetEl.innerText = currentTx + " Tx";
            }
        }
    }, 3000); // Diperbarui setiap 3 detik secara live otomatis
})();

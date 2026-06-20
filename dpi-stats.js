(function() {
    // 1. Desain Gaya Tampilan Bursa Saham Bersih & Tegas
    var style = document.createElement('style');
    style.innerHTML = 
        '.dpi-ticker-wrapper {' +
        '    width: 100% !important;' +
        '    background: #2d124d !important;' + 
        '    border-top: 1px solid #5a2d82 !important;' +
        '    border-bottom: 1px solid #5a2d82 !important;' +
        '    padding: 10px 0 !important;' +
        '    overflow: hidden !important;' +
        '    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;' +
        '    box-shadow: inset 0 0 10px rgba(0,0,0,0.5) !important;' +
        '    display: block !important;' + 
        '    clear: both !important;' +     
        '    position: relative !important;' +
        '    z-index: 999 !important;' +    /* Memastikan teks bursa berada di lapisan paling depan */
        '    margin-top: 0px !important;' +
        '    margin-bottom: 0px !important;' +
        '} ' +
        '.dpi-ticker-container {' +
        '    display: flex !important;' +
        '    white-space: nowrap !important;' +
        '    gap: 40px !important;' +
        '    padding-left: 15px !important;' +
        '    animation: tickerScroll 25s linear infinite !important;' +
        '}' +
        '.dpi-stat-item {' +
        '    display: flex !important;' +
        '    align-items: center !important;' +
        '    gap: 8px !important;' +
        '    color: #ffffff !important;' +
        '    font-size: 13px !important;' +
        '    font-weight: 500 !important;' +
        '}' +
        '.dpi-stat-label {' +
        '    color: #bfa3db !important;' +
        '    text-transform: uppercase !important;' +
        '    font-size: 11px !important;' +
        '    letter-spacing: 0.5px !important;' +
        '}' +
        '.dpi-stat-value {' +
        '    font-family: "Courier New", Courier, monospace !important;' +
        '    font-weight: bold !important;' +
        '    color: #2ecc71 !important;' +
        '}' +
        '.dpi-stat-arrow {' +
        '    color: #2ecc71 !important;' +
        '    font-size: 11px !important;' +
        '}' +
        '@keyframes tickerScroll {' +
        '    0% { transform: translate3d(0, 0, 0); }' +
        '    100% { transform: translate3d(-30%, 0, 0); }' +
        '}';
    document.head.appendChild(style);

    // 2. Struktur HTML Komponen Statistik
    var tickerHtml = 
        '<div class="dpi-ticker-container">' +
        '    <div class="dpi-stat-item">' +
        '        <span class="dpi-stat-label"><i class="fa-solid fa-users"></i> Pengunjung:</span>' +
        '        <span class="dpi-stat-value" id="stats-visitor">1.245</span>' +
        '        <span class="dpi-stat-arrow">▲ Live</span>' +
        '    </div>' +
        '    <div class="dpi-stat-item">' +
        '        <span class="dpi-stat-label"><i class="fa-solid fa-file-code"></i> Total Tesnet:</span>' +
        '        <span class="dpi-stat-value" id="stats-testnet">4.892 Tx</span>' +
        '        <span class="dpi-stat-arrow">▲ +1.2%</span>' +
        '    </div>' +
        '    <div class="dpi-stat-item">' +
        '        <span class="dpi-stat-label"><i class="fa-solid fa-vault"></i> Total Staking:</span>' +
        '        <span class="dpi-stat-value" id="stats-staking">638.95 Pi</span>' +
        '        <span class="dpi-stat-arrow" style="color: #f1c40f;">★ Boosted</span>' +
        '    </div>' +
        '</div>';

    // 3. Injeksi Kontainer ke DOM
    var tickerContainer = document.createElement('div');
    tickerContainer.className = 'dpi-ticker-wrapper';
    tickerContainer.id = 'dpiLiveTicker';
    tickerContainer.innerHTML = tickerHtml;

    var currentScript = document.currentScript;
    if (currentScript) {
        currentScript.parentNode.insertBefore(tickerContainer, currentScript);
    } else {
        var marqueeContainer = document.querySelector('.marquee-container');
        if (marqueeContainer) {
            marqueeContainer.parentNode.insertBefore(tickerContainer, marqueeContainer.nextSibling);
        }
    }

    // 5. REVISI UTAMA: Paksa Banner Memberikan Ruang Kosong (Mencegah Tabrakan Vertikal)
    // Fungsi ini berjalan setelah halaman selesai dimuat sepenuhnya
    window.addEventListener('load', function() {
        var bannerContainer = document.querySelector('.banner-container');
        if (bannerContainer) {
            // Memberikan jarak atas yang besar agar banner turun dari area bursa teks
            bannerContainer.style.setProperty('margin-top', '15px', 'important');
            bannerContainer.style.setProperty('position', 'relative', 'important');
            bannerContainer.style.setProperty('clear', 'both', 'important');
        }
    });

    // 4. Logika Perubahan Data Real-Time Berkedip
    setInterval(function() {
        var visitorEl = document.getElementById('stats-visitor');
        if(visitorEl) {
            var currentVisitor = parseInt(visitorEl.innerText.replace(/\./g, ''));
            currentVisitor += Math.floor(Math.random() * 5) - 2;
            visitorEl.innerText = currentVisitor.toLocaleString('id-ID');
        }

        var testnetEl = document.getElementById('stats-testnet');
        if(testnetEl) {
            var currentTx = parseInt(testnetEl.innerText);
            if(Math.random() > 0.6) {
                currentTx += 1;
                testnetEl.innerText = currentTx + " Tx";
            }
        }
    }, 3000);
})();

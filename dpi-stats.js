(function() {
    // 1. Desain Gaya Tampilan Bursa Saham (CSS)
    var style = document.createElement('style');
    style.innerHTML = 
        '.dpi-ticker-wrapper {' +
        '    width: 100%;' +
        '    background: #2d124d;' +
        '    border-top: 1px solid #5a2d82;' +
        '    border-bottom: 1px solid #5a2d82;' +
        '    padding: 8px 0;' +
        '    overflow: hidden;' +
        '    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
        '    box-shadow: inset 0 0 10px rgba(0,0,0,0.5);' +
        '    margin-top: 5px;' +
        '    margin-bottom: 5px;' +
        '}' +
        '.dpi-ticker-container {' +
        '    display: flex;' +
        '    white-space: nowrap;' +
        '    gap: 40px;' +
        '    padding-left: 15px;' +
        '    animation: tickerScroll 25s linear infinite;' +
        '}' +
        '.dpi-stat-item {' +
        '    display: flex;' +
        '    align-items: center;' +
        '    gap: 8px;' +
        '    color: #ffffff;' +
        '    font-size: 13px;' +
        '    font-weight: 500;' +
        '}' +
        '.dpi-stat-label {' +
        '    color: #bfa3db;' +
        '    text-transform: uppercase;' +
        '    font-size: 11px;' +
        '    letter-spacing: 0.5px;' +
        '}' +
        '.dpi-stat-value {' +
        '    font-family: "Courier New", Courier, monospace;' +
        '    font-weight: bold;' +
        '    color: #2ecc71;' +
        '}' +
        '.dpi-stat-arrow {' +
        '    color: #2ecc71;' +
        '    font-size: 11px;' +
        '}' +
        '@keyframes tickerScroll {' +
        '    0% { transform: translate3d(0, 0, 0); }' +
        '    100% { transform: translate3d(-30%, 0, 0); }' +
        '}';
    document.head.appendChild(style);

    // 2. Struktur HTML Komponen Statistik (Menggunakan kutip standar)
    var tickerHtml = 
        '<div class="dpi-ticker-container">' +
        '    <div class="dpi-stat-item">' +
        '        <span class="dpi-stat-label"><i class="fa-solid fa-users"></i> Pengunjung:</span>' +
        '        <span class="dpi-stat-value" id="stats-visitor">1,245</span>' +
        '        <span class="dpi-stat-arrow">▲ Live</span>' +
        '    </div>' +
        '    <div class="dpi-stat-item">' +
        '        <span class="dpi-stat-label"><i class="fa-solid fa-file-code"></i> Total Tesnet:</span>' +
        '        <span class="dpi-stat-value" id="stats-testnet">4,892 Tx</span>' +
        '        <span class="dpi-stat-arrow">▲ +1.2%</span>' +
        '    </div>' +
        '    <div class="dpi-stat-item">' +
        '        <span class="dpi-stat-label"><i class="fa-solid fa-vault"></i> Total Staking:</span>' +
        '        <span class="dpi-stat-value" id="stats-staking">638.95 Pi</span>' +
        '        <span class="dpi-stat-arrow" style="color: #f1c40f;">★ Boosted</span>' +
        '    </div>' +
        '</div>';

    // 3. Membuat Elemen Container Secara Aman Tanpa document.write Berbahaya
    var tickerContainer = document.createElement('div');
    tickerContainer.className = 'dpi-ticker-wrapper';
    tickerContainer.id = 'dpiLiveTicker';
    tickerContainer.innerHTML = tickerHtml;

    // Masukkan ke dalam DOM tepat di mana file script ini dipanggil di index.html
    var currentScript = document.currentScript;
    if (currentScript) {
        currentScript.parentNode.insertBefore(tickerContainer, currentScript);
    } else {
        document.body.appendChild(tickerContainer);
    }

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

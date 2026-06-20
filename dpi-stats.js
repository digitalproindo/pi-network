(function() {
    // 1. Desain Gaya Tampilan Menyatu dengan Hero (CSS)
    var style = document.createElement('style');
    style.innerHTML = 
        '.dpi-ticker-wrapper {' +
        '    width: 100% !important;' +
        '    background: rgba(45, 18, 77, 0.4) !important;' + /* Semi-transparan agar menyatu dengan warna ungu hero Anda */
        '    border-top: 1px solid rgba(255, 255, 255, 0.1) !important;' +
        '    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;' +
        '    padding: 6px 0 !important;' +
        '    overflow: hidden !important;' +
        '    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;' +
        '    display: block !important;' + 
        '    clear: both !important;' +     
        '    position: relative !important;' +
        '    margin-top: 8px !important;' +   /* Jarak pas di bawah running text */
        '    margin-bottom: 5px !important;' +
        '}' +
        '.dpi-ticker-container {' +
        '    display: flex !important;' +
        '    white-space: nowrap !important;' +
        '    gap: 35px !important;' +
        '    padding-left: 15px !important;' +
        '    animation: tickerScroll 25s linear infinite !important;' +
        '}' +
        '.dpi-stat-item {' +
        '    display: flex !important;' +
        '    align-items: center !important;' +
        '    gap: 6px !important;' +
        '    color: #ffffff !important;' +
        '    font-size: 12px !important;' +
        '}' +
        '.dpi-stat-label {' +
        '    color: #dfcbf2 !important;' + /* Warna teks label diselaraskan dengan tema ungu premium */
        '    text-transform: uppercase !important;' +
        '    font-size: 10px !important;' +
        '    letter-spacing: 0.5px !important;' +
        '}' +
        '.dpi-stat-value {' +
        '    font-family: "Courier New", Courier, monospace !important;' +
        '    font-weight: bold !important;' +
        '    color: #2ecc71 !important;' +
        '}' +
        '.dpi-stat-arrow {' +
        '    color: #2ecc71 !important;' +
        '    font-size: 10px !important;' +
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

    // 3. Logika Memasukkan Komponen Tepat ke dalam Elemen Kotak Ungu Marquee (Hero)
    var marqueeContainer = document.querySelector('.marquee-container');
    if (marqueeContainer) {
        var tickerContainer = document.createElement('div');
        tickerContainer.className = 'dpi-ticker-wrapper';
        tickerContainer.id = 'dpiLiveTicker';
        tickerContainer.innerHTML = tickerHtml;
        
        // Memasukkan indikator tepat di bawah tag marquee di dalam kotak ungu yang sama
        marqueeContainer.appendChild(tickerContainer);
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

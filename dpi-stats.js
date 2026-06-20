(function() {
    // Logika animasi perubahan angka live bursa efek
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

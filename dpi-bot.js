(function() {
    // 1. Injeksi Gaya Tampilan (CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        .bot-widget-toggle {
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: #25d366;
            color: white;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 9999;
            transition: all 0.3s ease;
        }
        .bot-widget-container {
            position: fixed;
            bottom: 155px;
            right: 20px;
            width: 360px;
            max-width: 90%;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0px 8px 24px rgba(0,0,0,0.15);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow: hidden;
            z-index: 9999;
            display: none; 
            flex-direction: column;
        }
        .bot-header { background: #25d366; color: white; padding: 14px; display: flex; align-items: center; justify-content: space-between; }
        .bot-profile { display: flex; align-items: center; gap: 10px; }
        .bot-avatar { width: 35px; height: 35px; background: #e6f9ed; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #25d366; font-size: 16px; }
        .bot-info h4 { margin: 0; font-size: 14px; }
        .bot-info span { font-size: 11px; opacity: 0.9; display: flex; align-items: center; gap: 4px; }
        .status-dot { width: 6px; height: 6px; background: #ffffff; border-radius: 50%; display: inline-block; }
        
        .bot-chat-body { height: 240px; padding: 14px; overflow-y: auto; background: #f4f7f5; display: flex; flex-direction: column; gap: 10px; }
        .msg-bubble { max-width: 80%; padding: 10px 12px; border-radius: 12px; font-size: 13px; line-height: 1.4; }
        .msg-bot { background: #e6f9ed; color: #333; align-self: flex-start; border-top-left-radius: 0px; }
        .msg-user { background: #25d366; color: white; align-self: flex-end; border-top-right-radius: 0px; }
        .faq-section { padding: 8px 14px; display: flex; flex-wrap: wrap; gap: 6px; background: #f4f7f5; }
        .faq-btn { background: white; color: #25d366; border: 1px solid #c7f2d6; padding: 6px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; }
        .action-buttons { display: flex; gap: 6px; padding: 10px 14px; background: #f4f7f5; }
        .action-btn { flex: 1; padding: 8px 4px; border: none; border-radius: 8px; font-weight: bold; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px; }
        .btn-lacak { background: #e6f9ed; color: #25d366; }
        .btn-ongkir { background: #e1f5fe; color: #0288d1; }
        .btn-wa { background: #128c7e; color: white; }
        .bot-input-area { display: flex; padding: 10px 14px; background: white; border-top: 1px solid #eee; gap: 8px; }
        .bot-input-area input { flex: 1; border: 1px solid #ddd; padding: 8px 12px; border-radius: 20px; outline: none; font-size: 13px; }
        .btn-send { background: #25d366; color: white; border: none; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        
        .lacak-input-container { display: none; padding: 10px 14px; background: #fff3cd; border-top: 1px solid #ffeeba; gap: 6px; font-size: 12px; align-items: center; }
        .lacak-input-container input { flex: 1; padding: 6px; border: 1px solid #ffc107; border-radius: 4px; font-size: 12px; }
        .lacak-input-container button { background: #ffc107; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; }

        .ongkir-input-container { display: none; padding: 12px 14px; background: #e3f2fd; border-top: 1px solid #bbdefb; flex-direction: column; gap: 8px; font-size: 12px; }
        .ongkir-grid { display: flex; flex-direction: column; gap: 6px; }
        .ongkir-grid textarea { width: 100%; height: 55px; padding: 8px; border: 1px solid #2196f3; border-radius: 6px; font-size: 12px; font-family: inherit; background: white; box-sizing: border-box; resize: none; outline: none; }
        .ongkir-grid input { width: 100%; padding: 7px 10px; border: 1px solid #2196f3; border-radius: 6px; font-size: 12px; background: white; box-sizing: border-box; outline: none; }
        .ongkir-row { display: flex; gap: 6px; }
        .ongkir-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
        .btn-proses-ongkir { background: #2196f3; color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    `;
    document.head.appendChild(style);

    // 2. Load FontAwesome untuk Ikon
    if (!document.getElementById('font-awesome-bot')) {
        const fa = document.createElement('link');
        fa.id = 'font-awesome-bot';
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // 3. Inject Struktur HTML Widget Bot
    const botHtml = `
        <div class="bot-widget-toggle" id="botToggle">
            <i class="fa-solid fa-comments"></i>
        </div>
        <div class="bot-widget-container" id="botContainer">
            <div class="bot-header">
                <div class="bot-profile">
                    <div class="bot-avatar"><i class="fa-solid fa-robot"></i></div>
                    <div class="bot-info">
                        <h4>DPI Assistant Bot</h4>
                        <span><span class="status-dot"></span> Online</span>
                    </div>
                </div>
                <i class="fa-solid fa-minus" id="botMinimize" style="cursor:pointer; opacity:0.7;"></i>
            </div>
            <div class="bot-chat-body" id="botChatBody">
                </div>
            
            <div class="lacak-input-container" id="lacakForm">
                <input type="text" id="noInvoice" placeholder="Masukkan nomor invoice...">
                <button id="btnProsesLacak">Cek</button>
                <span id="btnTutupLacak" style="cursor:pointer; margin-left:5px; color:red;"><i class="fa-solid fa-xmark"></i></span>
            </div>

            <div class="ongkir-input-container" id="ongkirForm">
                <div class="ongkir-grid">
                    <div style="font-size: 11px; color: #555; margin-bottom: 2px;">📦 Pengirim: <strong>Jakarta (Gudang Utama)</strong></div>
                    <textarea id="inputAlamatLengkap" placeholder="Ketik Alamat Lengkap Tujuan...&#10;(Kelurahan, Kecamatan, Kota, Provinsi)"></textarea>
                    <div class="ongkir-row">
                        <input type="number" id="inputBerat" placeholder="Berat Barang (Gram)" value="1000">
                    </div>
                </div>
                <div class="ongkir-actions">
                    <span id="btnTutupOngkir" style="cursor:pointer; color:red; font-weight:bold;"><i class="fa-solid fa-xmark"></i> Batal</span>
                    <button class="btn-proses-ongkir" id="btnProsesOngkir">Cek Tarif</button>
                </div>
            </div>

            <div class="faq-section">
                <button class="faq-btn" data-reply="Sistem kami terhubung otomatis dengan Pi SDK. Cukup pilih produk aset digital atau properti yang Anda inginkan, klik 'Beli', lalu selesaikan pembayaran aman lewat jendela pop-up dompet Pi Browser Anda.">Cara beli asset?</button>
                <button class="faq-btn" data-reply="Saat ini kami melayani transaksi komersial eksklusif menggunakan koin di jaringan Pi Testnet sebagai simulasi validasi ekosistem sebelum berlanjut penuh ke fase Open Mainnet.">Metode pembayaran?</button>
                <button class="faq-btn" data-reply="PT. Digital Pro Indo adalah platform e-commerce dan marketplace berbadan hukum resmi di Indonesia yang terdaftar sah dalam jajaran utilitas Pi Developer Studio.">Legalitas Perusahaan?</button>
            </div>
            <div class="action-buttons">
                <button class="action-btn btn-lacak" id="btnMenuLacak"><i class="fa-solid fa-truck"></i> Lacak</button>
                <button class="action-btn btn-ongkir" id="btnMenuOngkir"><i class="fa-solid fa-box"></i> Cek Ongkir</button>
                <button class="action-btn btn-wa" onclick="window.open('https://wa.me/6281906066757?text=Halo%20Admin%20PT.%20Digital%20Pro%20Indo%2C%20saya%20ingin%20bertanya%20mengenai%20produk%20atau%20aset%20properti%20yang%20ada%20di%20marketplace.', '_blank')"><i class="fa-brands fa-whatsapp"></i> WA Admin</button>
            </div>
            <div class="bot-input-area">
                <input type="text" id="botUserInput" placeholder="Ketik pesan...">
                <button class="btn-send" id="botBtnSend"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    
    const botWrapper = document.createElement('div');
    botWrapper.innerHTML = botHtml;
    document.body.appendChild(botWrapper);

    // 4. Inisialisasi Elemen
    const botToggle = document.getElementById('botToggle');
    const botContainer = document.getElementById('botContainer');
    const botMinimize = document.getElementById('botMinimize');
    const botChatBody = document.getElementById('botChatBody');
    const botUserInput = document.getElementById('botUserInput');
    const botBtnSend = document.getElementById('botBtnSend');
    
    const btnMenuLacak = document.getElementById('btnMenuLacak');
    const lacakForm = document.getElementById('lacakForm');
    const btnProsesLacak = document.getElementById('btnProsesLacak');
    const btnTutupLacak = document.getElementById('btnTutupLacak');

    const btnMenuOngkir = document.getElementById('btnMenuOngkir');
    const ongkirForm = document.getElementById('ongkirForm');
    const btnProsesOngkir = document.getElementById('btnProsesOngkir');
    const btnTutupOngkir = document.getElementById('btnTutupOngkir');

    const inputAlamatLengkap = document.getElementById('inputAlamatLengkap');
    const inputBerat = document.getElementById('inputBerat');

    // --- FUNGSI UTAMA REFRESH/RESET STATE CHATBOT ---
    function resetChatbotState() {
        // Kosongkan riwayat chat body dan kembalikan ke pesan pertama
        botChatBody.innerHTML = `
            <div class="msg-bubble msg-bot">
                Halo! 👋 Saya <strong>DPI Bot</strong>.<br>Ada yang bisa saya bantu seputar transaksi produk atau properti di PT. Digital Pro Indo? Silakan pilih FAQ di bawah.
            </div>
        `;
        // Tutup semua sub-formulir yang terbuka
        lacakForm.style.display = 'none';
        ongkirForm.style.display = 'none';
        
        // Bersihkan seluruh teks input lama
        botUserInput.value = '';
        inputAlamatLengkap.value = '';
        document.getElementById('noInvoice').value = '';
        inputBerat.value = '1000';
        
        botChatBody.scrollTop = 0;
    }

    // Jalankan reset saat widget pertama kali diload agar siap pakai
    resetChatbotState();

    // Buka atau Tutup Kontainer Chat Lewat Tombol Lingkaran Ikon Utama
    botToggle.addEventListener('click', () => {
        if (botContainer.style.display === 'flex') {
            // JIKA SEDANG TERBUKA LALU DIKLIK -> TUTUP DAN REFRESH TOTAL
            botContainer.style.display = 'none';
            resetChatbotState();
        } else {
            // JIKA SEDANG TERTUTUP LALU DIKLIK -> BUKA SEPERTI BIASA
            botContainer.style.display = 'flex';
            botChatBody.scrollTop = botChatBody.scrollHeight;
        }
    });

    // Aksi klik Tanda Minus (-) -> Tutup dan Refresh Total
    botMinimize.addEventListener('click', () => { 
        botContainer.style.display = 'none'; 
        resetChatbotState();
    });

    function appendBotMsg(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `msg-bubble msg-${sender}`;
        bubble.innerHTML = text;
        botChatBody.appendChild(bubble);
        botChatBody.scrollTop = botChatBody.scrollHeight;
    }

    // --- KONTROL TOMBOL INTERAKSI ---
    btnMenuLacak.addEventListener('click', () => {
        ongkirForm.style.display = 'none';
        lacakForm.style.display = 'flex';
    });
    btnTutupLacak.addEventListener('click', () => { lacakForm.style.display = 'none'; });

    btnMenuOngkir.addEventListener('click', () => {
        lacakForm.style.display = 'none';
        ongkirForm.style.display = 'flex';
    });
    btnTutupOngkir.addEventListener('click', () => { ongkirForm.style.display = 'none'; });

    // Aksi Lacak
    btnProsesLacak.addEventListener('click', () => {
        const inv = document.getElementById('noInvoice').value.trim();
        if(!inv) return;
        appendBotMsg(`Melacak nomor invoice: <strong>${inv}</strong>`, 'user');
        lacakForm.style.display = 'none';
        setTimeout(() => {
            appendBotMsg(`Sistem mendeteksi transaksi dengan invoice <strong>${inv}</strong> saat ini sedang dalam antrean verifikasi enkripsi Blockchain Pi Network.`, 'bot');
            document.getElementById('noInvoice').value = '';
        }, 800);
    });

    // Aksi Klik "Cek Tarif"
    btnProsesOngkir.addEventListener('click', () => {
        const alamatFull = inputAlamatLengkap.value.trim();
        const berat = inputBerat.value.trim();

        if(!alamatFull) {
            alert("Harap masukkan alamat lengkap pengiriman Anda!");
            return;
        }

        ongkirForm.style.display = 'none';

        let userMsg = `<strong>Request Cek Ongkir:</strong><br>` +
                      `🛫 Dari: Jakarta (Gudang Utama)<br>` +
                      `🛬 Ke: ${alamatFull}<br>` +
                      `⚖️ Berat: ${berat} gram`;
        
        appendBotMsg(userMsg, 'user');
        appendBotMsg(`<em>Mencari estimasi tarif pengiriman dari Jakarta... 📦</em>`, 'bot');

        setTimeout(() => {
            let hasilOngkir = `Berikut perbandingan estimasi tarif pengiriman <strong>dari Jakarta</strong> ke lokasi Anda:<br><br>` +
                `<strong>🚚 J&T Express (EZ)</strong><br>• Tarif: Rp 14.000<br>• Estimasi: 2-3 Hari<br>___________________<br>` +
                `<strong>🚚 JNE (Regular)</strong><br>• Tarif: Rp 15.000<br>• Estimasi: 2-4 Hari<br>___________________<br>` +
                `<strong>🚚 Sicepat (REG)</strong><br>• Tarif: Rp 14.500<br>• Estimasi: 1-2 Hari<br>___________________<br>` +
                `<strong>🚚 POS Indonesia</strong><br>• Tarif: Rp 16.000<br>• Estimasi: 3-5 Hari<br><br>` +
                `*Info tambahan: Salin detail alamat pengiriman di atas untuk memudahkan konfirmasi fisik saat melakukan checkout via WA Admin.*`;
            
            appendBotMsg(hasilOngkir, 'bot');
            inputAlamatLengkap.value = '';
        }, 1500);
    });

    // FAQ Otomatis
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pertanyaan = this.innerText;
            const jawaban = this.getAttribute('data-reply');
            appendBotMsg(pertanyaan, 'user');
            setTimeout(() => { appendBotMsg(jawaban, 'bot'); }, 500);
        });
    });

    // Fitur pesan bawaan
    function eksekusiKirim() {
        const text = botUserInput.value.trim();
        if(!text) return;
        appendBotMsg(text, 'user');
        botUserInput.value = '';
        setTimeout(() => {
            appendBotMsg("Pertanyaan Anda telah kami rekam. Untuk bantuan respon kilat langsung terhubung manusia, silakan klik tombol **WA Admin** di bawah ini.", 'bot');
        }, 800);
    }
    botBtnSend.addEventListener('click', eksekusiKirim);
    botUserInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') eksekusiKirim(); });

})();

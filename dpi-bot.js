(function() {
    // 1. Injeksi Gaya Tampilan (CSS) - Versi Premium & Responsif Gambar
    const style = document.createElement('style');
    style.innerHTML = `
        .bot-widget-toggle {
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
            color: white;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            cursor: pointer;
            box-shadow: 0 6px 16px rgba(18, 140, 126, 0.4);
            z-index: 9999;
            transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
        }
        .bot-widget-toggle:hover {
            transform: scale(1.08);
            box-shadow: 0 8px 20px rgba(18, 140, 126, 0.5);
        }
        .bot-widget-container {
            position: fixed;
            bottom: 160px;
            right: 20px;
            width: 360px;
            max-width: 90%;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0px 12px 35px rgba(0,0,0,0.15);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow: hidden;
            z-index: 9999;
            display: none; 
            flex-direction: column;
            border: 1px solid rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }
        .bot-header { 
            background: linear-gradient(90deg, #25d366 0%, #128c7e 100%); 
            color: white; 
            padding: 16px; 
            display: flex; 
            align-items: center; 
            justify-content: space-between; 
        }
        .bot-profile { display: flex; align-items: center; gap: 10px; }
        .bot-avatar { width: 38px; height: 38px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; }
        .bot-info h4 { margin: 0; font-size: 14px; font-weight: 700; letter-spacing: 0.3px; }
        .bot-info span { font-size: 11px; opacity: 0.9; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
        .status-dot { width: 7px; height: 7px; background: #25d366; border: 1.5px solid white; border-radius: 50%; display: inline-block; animation: pulseBot 2s infinite; }
        
        @keyframes pulseBot {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,255,255, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 5px rgba(255,255,255, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255,255,255, 0); }
        }

        .bot-chat-body { height: 260px; padding: 16px; overflow-y: auto; background: #f8fafc; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth; }
        .msg-bubble { max-width: 85%; padding: 11px 14px; border-radius: 16px; font-size: 13px; line-height: 1.5; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .msg-bot { background: white; color: #334155; align-self: flex-start; border-top-left-radius: 4px; border: 1px solid #e2e8f0; }
        .msg-user { background: #25d366; color: white; align-self: flex-end; border-top-right-radius: 4px; font-weight: 500; }
        
        /* Gaya dekorasi lencana nomor langkah */
        .step-badge { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 50%; color: white; font-size: 10px; font-weight: bold; margin-right: 4px; vertical-align: middle; }
        .badge-green { background: #16a34a; }
        .badge-purple { background: #7c3aed; }

        .faq-section { padding: 10px 16px; display: flex; flex-wrap: wrap; gap: 6px; background: #f8fafc; border-top: 1px dashed #e2e8f0; }
        .faq-btn { background: white; color: #128c7e; border: 1px solid #e2e8f0; padding: 7px 14px; border-radius: 20px; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .faq-btn:hover { background: #e6f9ed; border-color: #25d366; color: #128c7e; transform: translateY(-1px); }
        
        .action-buttons { display: flex; gap: 6px; padding: 0 16px 12px 16px; background: #f8fafc; }
        .action-btn { flex: 1; padding: 10px 4px; border: none; border-radius: 10px; font-weight: 700; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; transition: all 0.2s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.04); }
        .action-btn:hover { transform: translateY(-1px); filter: brightness(0.96); }
        .btn-lacak { background: #e6f9ed; color: #128c7e; }
        .btn-ongkir { background: #e0f2fe; color: #0369a1; }
        .btn-wa { background: #25d366; color: white; box-shadow: 0 3px 8px rgba(37,211,102,0.3); }
        
        .bot-input-area { display: flex; padding: 12px 16px; background: white; border-top: 1px solid #f1f5f9; gap: 8px; align-items: center; }
        .bot-input-area input { flex: 1; border: 1px solid #e2e8f0; padding: 10px 16px; border-radius: 24px; outline: none; font-size: 13px; transition: border 0.2s ease; background: #f8fafc; }
        .bot-input-area input:focus { border-color: #25d366; background: #fff; }
        .btn-send { background: #25d366; color: white; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease; }
        .btn-send:hover { background: #128c7e; transform: scale(1.05); }
        
        .lacak-input-container { display: none; padding: 12px 16px; background: #fef9c3; border-top: 1px solid #fef08a; gap: 6px; font-size: 12px; align-items: center; }
        .lacak-input-container input { flex: 1; padding: 8px 12px; border: 1px solid #facc15; border-radius: 8px; font-size: 12px; outline: none; }
        .lacak-input-container button { background: #facc15; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-weight: bold; color: #713f12; }

        .ongkir-input-container { display: none; padding: 14px 16px; background: #e0f2fe; border-top: 1px solid #bae6fd; flex-direction: column; gap: 8px; font-size: 12px; }
        .ongkir-grid { display: flex; flex-direction: column; gap: 6px; }
        .ongkir-grid textarea { width: 100%; height: 55px; padding: 8px 12px; border: 1px solid #38bdf8; border-radius: 8px; font-size: 12px; font-family: inherit; background: white; box-sizing: border-box; resize: none; outline: none; }
        .ongkir-grid input { width: 100%; padding: 8px 12px; border: 1px solid #38bdf8; border-radius: 8px; font-size: 12px; background: white; box-sizing: border-box; outline: none; }
        .ongkir-row { display: flex; gap: 6px; }
        .ongkir-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
        .btn-proses-ongkir { background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: bold; }
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
                <span id="btnTutupLacak" style="cursor:pointer; margin-left:5px; color:#ef4444;"><i class="fa-solid fa-xmark"></i></span>
            </div>

            <div class="ongkir-input-container" id="ongkirForm">
                <div class="ongkir-grid">
                    <div style="font-size: 11px; color: #475569; margin-bottom: 2px;">📦 Pengirim: <strong>Jakarta (Gudang Utama)</strong></div>
                    <textarea id="inputAlamatLengkap" placeholder="Ketik Alamat Lengkap Tujuan...&#10;(Kelurahan, Kecamatan, Kota, Provinsi)"></textarea>
                    <div class="ongkir-row">
                        <input type="number" id="inputBerat" placeholder="Berat Barang (Gram)" value="1000">
                    </div>
                </div>
                <div class="ongkir-actions">
                    <span id="btnTutupOngkir" style="cursor:pointer; color:#ef4444; font-weight:bold;"><i class="fa-solid fa-xmark"></i> Batal</span>
                    <button class="btn-proses-ongkir" id="btnProsesOngkir">Cek Tarif</button>
                </div>
            </div>

            <div class="faq-section">
                <button class="faq-btn" data-reply="Sistem kami terhubung otomatis dengan Pi SDK. Cukup pilih produk aset digital atau properti yang Anda inginkan, klik 'Beli', lalu selesaikan pembayaran aman lewat jendela pop-up dompet Pi Browser Anda.">Cara beli asset?</button>
                <button class="faq-btn" data-reply="Saat ini kami melayani transaksi komersial eksklusif menggunakan koin di jaringan Pi Testnet sebagai simulasi validasi ekosistem sebelum berlanjut penuh ke fase Open Mainnet.">Metode pembayaran?</button>
                <button class="faq-btn" data-reply="PT. Digital Pro Indo adalah platform e-commerce dan marketplace berbadan hukum resmi di Indonesia yang terdaftar sah dalam jajaran utilitas Pi Developer Studio.">Legalitas Perusahaan?</button>
                
                <button class="faq-btn" data-reply="Jika aplikasi mengalami kendala autentikasi atau gagal memuat data profil, mohon ikuti petunjuk berikut:<br><br><span class='step-badge badge-green'>1</span> Klik tulisan <strong>'Hapus URL yang Baru Dikunjungi'</strong> pada menu utama Pi Browser Anda.<br><br><span class='step-badge badge-purple'>2</span> Setelah itu, ketuk tombol <strong>'Refresh'</strong> (ikon panah melingkar ↻) pada kolom pencarian berwarna abu-abu di pojok kanan atas layar Anda untuk menyinkronkan data login Pi SDK.">Tidak bisa login?</button>
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
        botChatBody.innerHTML = `
            <div class="msg-bubble msg-bot">
                Halo! 👋 Saya <strong>DPI Bot</strong>.<br>Ada yang bisa saya bantu seputar transaksi produk atau properti di PT. Digital Pro Indo? Silakan pilih FAQ di bawah.
            </div>
        `;
        lacakForm.style.display = 'none';
        ongkirForm.style.display = 'none';
        
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
            botContainer.style.display = 'none';
            resetChatbotState();
        } else {
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

    // FAQ Otomatis dengan Dukungan Tampilan Gambar Panduan Langkah demi Langkah
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const pertanyaan = this.innerText;
            let jawaban = this.getAttribute('data-reply');
            
            appendBotMsg(pertanyaan, 'user');
            
            setTimeout(() => {
                // LOGIKA KHUSUS: Jika menekan "Tidak bisa login?" maka sisipkan element gambar ilustrasi
                if (pertanyaan.includes("Tidak bisa login?")) {
                    jawaban += `
                        <div style="margin-top: 12px; border-radius: 10px; overflow: hidden; border: 1px solid #cbd5e1; background: #fff; padding: 4px;">
                            <img src="https://i.ibb.co.com/Tq1kD21V/IMG-20260625-WA0045.jpg" 
                                 alt="Panduan Reset Pi Browser" 
                                 style="width: 100%; height: auto; display: block; border-radius: 8px;"
                                 onload="document.getElementById('botChatBody').scrollTop = document.getElementById('botChatBody').scrollHeight;"
                            />
                            <div style="font-size: 10px; color: #64748b; text-align: center; margin-top: 4px; font-style: italic;">
                                💡 Gambar Panduan Langkah 1 & Langkah 2
                            </div>
                        </div>
                    `;
                }
                appendBotMsg(jawaban, 'bot');
            }, 500);
        });
    });

    // Fitur kirim pesan input manual bawaan
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

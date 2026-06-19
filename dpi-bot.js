// --- KODE UTAMA SCRIPT BOT OTOMATIS DIGITAL PRO INDO ---

(function() {
    // 1. Masukkan Gaya Tampilan (CSS) langsung ke dokumen
    const style = document.createElement('style');
    style.innerHTML = `
                .bot-widget-toggle {
            position: fixed;
            bottom: 90px;          /* Tetap di atas navbar bawah */
            left: 20px;            /* BERGESER KE KIRI */
            background: #5a2d82;
            color: white;
            width: 50px;           /* Sedikit disesuaikan ukurannya agar simetris dengan WA */
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
            bottom: 155px;         /* Menyesuaikan posisi di atas tombol */
            left: 20px;            /* BERGESER KE KIRI */
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
        .bot-header { background: #5a2d82; color: white; padding: 14px; display: flex; align-items: center; justify-content: space-between; }
        .bot-profile { display: flex; align-items: center; gap: 10px; }
        .bot-avatar { width: 35px; height: 35px; background: #eedfff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #5a2d82; font-size: 16px; }
        .bot-info h4 { margin: 0; font-size: 14px; }
        .bot-info span { font-size: 11px; opacity: 0.8; display: flex; align-items: center; gap: 4px; }
        .status-dot { width: 6px; height: 6px; background: #2ecc71; border-radius: 50%; display: inline-block; }
        .bot-chat-body { height: 300px; padding: 14px; overflow-y: auto; background: #f8f9fa; display: flex; flex-direction: column; gap: 10px; }
        .msg-bubble { max-width: 80%; padding: 10px 12px; border-radius: 12px; font-size: 13px; line-height: 1.4; }
        .msg-bot { background: #eedfff; color: #333; align-self: flex-start; border-top-left-radius: 0px; }
        .msg-user { background: #5a2d82; color: white; align-self: flex-end; border-top-right-radius: 0px; }
        .faq-section { padding: 8px 14px; display: flex; flex-wrap: wrap; gap: 6px; background: #f8f9fa; }
        .faq-btn { background: white; color: #5a2d82; border: 1px solid #e0c7ff; padding: 6px 12px; border-radius: 20px; font-size: 12px; cursor: pointer; }
        .action-buttons { display: flex; gap: 8px; padding: 10px 14px; background: #f8f9fa; }
        .action-btn { flex: 1; padding: 8px; border: none; border-radius: 8px; font-weight: bold; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .btn-lacak { background: #eedfff; color: #5a2d82; }
        .btn-wa { background: #2ecc71; color: white; }
        .bot-input-area { display: flex; padding: 10px 14px; background: white; border-top: 1px solid #eee; gap: 8px; }
        .bot-input-area input { flex: 1; border: 1px solid #ddd; padding: 8px 12px; border-radius: 20px; outline: none; font-size: 13px; }
        .btn-send { background: #5a2d82; color: white; border: none; width: 34px; height: 34px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        
        /* Form Lacak Pesanan yang bisa disembunyikan/munculkan */
        .lacak-input-container { display: none; padding: 10px 14px; background: #fff3cd; border-top: 1px solid #ffeeba; gap: 6px; font-size: 12px; }
        .lacak-input-container input { flex: 1; padding: 6px; border: 1px solid #ffc107; border-radius: 4px; }
        .lacak-input-container button { background: #ffc107; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    `;
    document.head.appendChild(style);

    // 2. Tambahkan FontAwesome secara otomatis jika belum ada di web Anda
    if (!document.getElementById('font-awesome-bot')) {
        const fa = document.createElement('link');
        fa.id = 'font-awesome-bot';
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // 3. Inject Struktur HTML Widget Bot ke halaman web
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
                <div class="msg-bubble msg-bot">
                    Halo! 👋 Saya <strong>DPI Bot</strong>.<br>Ada yang bisa saya bantu seputar transaksi produk atau properti di PT. Digital Pro Indo? Silakan pilih FAQ di bawah.
                </div>
            </div>
            <div class="lacak-input-container" id="lacakForm">
                <input type="text" id="noInvoice" placeholder="Masukkan nomor invoice / resi...">
                <button onclick="prosesCekLacak()">Cek</button>
                <span onclick="tutupLacak()" style="cursor:pointer; margin-left:5px; color:red;"><i class="fa-solid fa-xmark"></i></span>
            </div>
            <div class="faq-section">
                <button class="faq-btn" data-q="Cara beli asset?">Cara beli asset?</button>
                <button class="faq-btn" data-q="Metode pembayaran?">Metode pembayaran?</button>
                <button class="faq-btn" data-q="Legalitas perusahaan?">Legalitas Perusahaan?</button>
            </div>
            <div class="action-buttons">
                <button class="action-btn btn-lacak" id="btnMenuLacak"><i class="fa-solid fa-magnifying-glass"></i> Lacak Pesanan</button>
                <button class="action-btn btn-wa" onclick="window.open('https://wa.me/628123456789', '_blank')"><i class="fa-brands fa-whatsapp"></i> WA Admin</button>
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

    // 4. Logika dan Fungsi Interaksi Javascript Bot
    const botToggle = document.getElementById('botToggle');
    const botContainer = document.getElementById('botContainer');
    const botMinimize = document.getElementById('botMinimize');
    const botChatBody = document.getElementById('botChatBody');
    const botUserInput = document.getElementById('botUserInput');
    const botBtnSend = document.getElementById('botBtnSend');
    const btnMenuLacak = document.getElementById('btnMenuLacak');
    const lacakForm = document.getElementById('lacakForm');

    // Buka Tutup Widget Chat
    botToggle.onclick = () => {
        botContainer.style.display = botContainer.style.display === 'flex' ? 'none' : 'flex';
        botChatBody.scrollTop = botChatBody.scrollHeight;
    };
    botMinimize.onclick = () => { botContainer.style.display = 'none'; };
    document.querySelector('.bot-header .fa-xmark').onclick = () => {
    botContainer.style.display = 'none';
};
  
    // Fungsi Tambah Gelembung Pesan
    function appendBotMsg(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `msg-bubble msg-${sender}`;
        bubble.innerHTML = text;
        botChatBody.appendChild(bubble);
        botChatBody.scrollTop = botChatBody.scrollHeight;
    }

    // Aksi Tombol Kirim Teks Manual
    function eksekusiKirim() {
        const text = botUserInput.value.trim();
        if(!text) return;
        appendBotMsg(text, 'user');
        botUserInput.value = '';

        setTimeout(() => {
            let balasan = "Pertanyaan Anda telah kami rekam. Untuk bantuan kilat, Anda bisa menekan tombol **WA Admin**.";
            const low = text.toLowerCase();
            if(low.includes('beli') || low.includes('cara')) {
                balasan = "Untuk membeli aset/produk, silakan pilih barang, klik tombol **Beli**, lalu masukkan frasa dompet Pi Anda dengan aman pada pop-up sistem.";
            } else if(low.includes('pi') || low.includes('koin')) {
                balasan = "Aplikasi ini memproses transaksi eksklusif menggunakan Koin Pi Network.";
            }
            appendBotMsg(balasan, 'bot');
        }, 800);
    }

    botBtnSend.onclick = eksekusiKirim;
    botUserInput.onkeypress = (e) => { if(e.key === 'Enter') eksekusiKirim(); };

    // Handler Tombol FAQ Otomatis
    document.querySelectorAll('.faq-btn').forEach(btn => {
        btn.onclick = () => {
            const q = btn.getAttribute('data-q');
            appendBotMsg(q, 'user');
            setTimeout(() => {
                let a = "Terima kasih telah bertanya.";
                if(q.includes('beli')) a = "Sistem kami terhubung otomatis dengan Pi SDK. Cukup klik 'Beli' pada produk pilihan Anda.";
                if(q.includes('pembayaran')) a = "Saat ini kami menerima koin di jaringan Testnet untuk uji kelayakan menuju Mainnet resmi.";
                if(q.includes('Legalitas')) a = "PT. Digital Pro Indo adalah platform berbadan hukum resmi yang terdaftar di ekosistem Pi Developer Studio.";
                appendBotMsg(a, 'bot');
            }, 600);
        };
    });

    // Fitur Menu Lacak Pesanan (Persis Gambar Ke-2 Anda)
    btnMenuLacak.onclick = () => {
    lacakForm.style.display = 'flex';
};
document.querySelector('.lacak-input-container button').onclick = () => {
    prosesCekLacak();
};
document.querySelector('.lacak-input-container span').onclick = () => {
    lacakForm.style.display = 'none';
};

function prosesCekLacak() {

        const inv = document.getElementById('noInvoice').value.trim();
        if(!inv) return;
        appendBotMsg(`Melacak nomor pesanan: ${inv}`, 'user');
        lacakForm.style.display = 'none';
        setTimeout(() => {
            appendBotMsg(`Sistem mendeteksi transaksi <strong>${inv}</strong> sedang dalam antrean verifikasi Blockchain Pi Network. Mohon tunggu beberapa saat.`, 'bot');
            document.getElementById('noInvoice').value = '';
        }, 800);
    };

})();
 

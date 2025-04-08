const canvas = document.getElementById('signature');
const ctx = canvas.getContext('2d');
const mobileGroup = document.getElementById('mobileGroup');
const showMobileCheckbox = document.getElementById('showMobile');

showMobileCheckbox.addEventListener('change', function() {
    mobileGroup.classList.toggle('hidden', !this.checked);
});

async function generateSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const logo = new Image();
    logo.src = 'img/logo.png';
    const addressIcon = new Image();
    addressIcon.src = 'img/address-icon.png';
    const phoneIcon = new Image();
    phoneIcon.src = 'img/phone-icon.png';
    const emailIcon = new Image();
    emailIcon.src = 'img/email-icon.png';
    const webIcon = new Image();
    webIcon.src = 'img/web-icon.png';

    let loadedImages = 0;
    const totalImages = 5;

    function checkAllImagesLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
            renderContent();
        }
    }

    logo.onload = checkAllImagesLoaded;
    addressIcon.onload = checkAllImagesLoaded;
    phoneIcon.onload = checkAllImagesLoaded;
    emailIcon.onload = checkAllImagesLoaded;
    webIcon.onload = checkAllImagesLoaded;

    logo.onerror = function() { console.error('Ошибка загрузки логотипа'); checkAllImagesLoaded(); };
    addressIcon.onerror = function() { console.error('Ошибка загрузки address-icon.png'); checkAllImagesLoaded(); };
    phoneIcon.onerror = function() { console.error('Ошибка загрузки phone-icon.png'); checkAllImagesLoaded(); };
    emailIcon.onerror = function() { console.error('Ошибка загрузки email-icon.png'); checkAllImagesLoaded(); };
    webIcon.onerror = function() { console.error('Ошибка загрузки web-icon.png'); checkAllImagesLoaded(); };

    function renderContent() {
        const fontSize = 11.5;
        const fontFamily = 'Calibri';
        const textColor = '#000000';
        const lineHeight = 14;
        const iconWidth = 13;
        const iconHeight = 10;
        const iconOffset = 10;
        const logoWidth = 171;
        const logoHeight = 88;
        const canvasWidth = 600;
        const canvasHeight = 88;
        const logoPadding = 10;
        const textPadding = 20;
        const fourLineOffset = (logoHeight - (4 * lineHeight)) / 2;
        const fiveLineOffset = 10;
        const iconYAdjust = (lineHeight - iconHeight) / 2;
        const textYAdjust = 10;

        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = textColor;

        const office = document.getElementById('office').value || '330';
        const address = `600005, г.Владимир, ул.Тракторная, д.45, офис ${office}`;
        const extension = document.getElementById('extension').value || '2144';
        const formattedExtension = `+7 (4922) 53-77-55 (${extension.padStart(4, '0')})`;
        const mobile = document.getElementById('mobile').value || '';
        const email = document.getElementById('email').value || 'name@domain.ru';
        const web = 'abidev.ru';

        let lineCount = 4;
        if (showMobileCheckbox.checked && mobile) {
            lineCount += 1;
        }

        ctx.drawImage(logo, logoPadding, 0, logoWidth, logoHeight);
        const logoRightEdge = logoPadding + logoWidth + logoPadding;
        const textX = logoRightEdge + textPadding;
        let currentY = lineCount === 4 ? fourLineOffset : fiveLineOffset;
        let y = currentY;

        ctx.drawImage(addressIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
        ctx.fillText(address, textX, y + textYAdjust);
        y += lineHeight;

        ctx.drawImage(phoneIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
        ctx.fillText(formattedExtension, textX, y + textYAdjust);
        y += lineHeight;

        if (showMobileCheckbox.checked && mobile) {
            ctx.drawImage(phoneIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
            ctx.fillText(mobile, textX, y + textYAdjust);
            y += lineHeight;
        }

        ctx.drawImage(emailIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
        ctx.fillText(email, textX, y + textYAdjust);
        y += lineHeight;

        ctx.drawImage(webIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
        ctx.fillText(web, textX, y + textYAdjust);

        canvas.toBlob(async function(blob) {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                console.log('Изображение скопировано в буфер обмена!');
                alert('Подпись скопирована в буфер обмена. Вставьте её (Ctrl+V) куда угодно!');
            } catch (err) {
                console.error('Ошибка копирования в буфер обмена:', err);
                alert('Не удалось скопировать подпись в буфер обмена. Проверьте консоль.');
            }
        }, 'image/png');
    }
}
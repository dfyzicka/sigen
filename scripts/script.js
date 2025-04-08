// Ждём, пока весь DOM загрузится, чтобы все элементы были доступны
document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы canvas и его 2D-контекст для рисования подписи
    const canvas = document.getElementById('signature');
    const ctx = canvas.getContext('2d');

    // Получаем элементы для управления видимостью поля "Сотовый телефон"
    const mobileGroup = document.getElementById('mobileGroup'); // Контейнер поля "Сотовый телефон"
    const showMobileCheckbox = document.getElementById('showMobile'); // Чекбокс для показа/скрытия поля

    // Получаем кнопку "Создать подпись" по её классу
    const generateButton = document.querySelector('.button');

    // Отключаем сглаживание изображений для более чёткого рендеринга на canvas
    ctx.imageSmoothingEnabled = false;

    // Учитываем devicePixelRatio для поддержки дисплеев с высоким разрешением (например, Retina)
    const dpr = window.devicePixelRatio || 1; // Если devicePixelRatio не определён, используем 1
    canvas.width = 600 * dpr; // Устанавливаем ширину canvas с учётом dpr
    canvas.height = 88 * dpr; // Устанавливаем высоту canvas с учётом dpr
    canvas.style.width = '600px'; // Устанавливаем отображаемую ширину canvas
    canvas.style.height = '88px'; // Устанавливаем отображаемую высоту canvas
    ctx.scale(dpr, dpr); // Масштабируем контекст для корректного рендеринга

    // Функция для управления видимостью поля "Сотовый телефон"
    function updateMobileFieldVisibility() {
        // Если чекбокс отмечен, убираем класс 'hidden', иначе добавляем его
        mobileGroup.classList.toggle('hidden', !showMobileCheckbox.checked);
    }

    // Вызываем функцию сразу после загрузки страницы, чтобы установить начальное состояние
    updateMobileFieldVisibility();

    // Добавляем слушатель события на изменение состояния чекбокса
    showMobileCheckbox.addEventListener('change', updateMobileFieldVisibility);

    // Добавляем слушатель события на кнопку "Создать подпись" для генерации подписи
    generateButton.addEventListener('click', generateSignature);

    // Добавляем эффект волны для кнопки при клике
    generateButton.addEventListener('click', (e) => {
        // Получаем координаты кнопки относительно окна
        const rect = generateButton.getBoundingClientRect();
        // Вычисляем координаты клика относительно кнопки
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Устанавливаем CSS-переменные для анимации волны
        generateButton.style.setProperty('--mouse-x', `${x}px`);
        generateButton.style.setProperty('--mouse-y', `${y}px`);
    });

    // Функция для генерации подписи
    function generateSignature() {
        // Очищаем canvas перед новой генерацией
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        // Заполняем фон canvas белым цветом
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

        // Создаём объекты изображений для логотипа и иконок
        const logo = new Image();
        logo.src = 'img/logo.png'; // Логотип компании
        const addressIcon = new Image();
        addressIcon.src = 'img/address-icon.png'; // Иконка адреса
        const phoneIcon = new Image();
        phoneIcon.src = 'img/phone-icon.png'; // Иконка телефона
        const emailIcon = new Image();
        emailIcon.src = 'img/email-icon.png'; // Иконка email
        const webIcon = new Image();
        webIcon.src = 'img/web-icon.png'; // Иконка веб-сайта

        // Переменная для отслеживания количества загруженных изображений
        let loadedImages = 0;
        const totalImages = 5; // Всего 5 изображений

        // Функция для проверки загрузки всех изображений
        function checkAllImagesLoaded() {
            loadedImages++;
            // Если все изображения загружены, рендерим содержимое
            if (loadedImages === totalImages) {
                renderContent();
            }
        }

        // Добавляем обработчики событий для загрузки изображений
        logo.onload = function () {
            console.log(`Logo loaded: ${logo.width}x${logo.height}`);
            checkAllImagesLoaded();
        };
        addressIcon.onload = function () {
            console.log(`Address icon loaded: ${addressIcon.width}x${addressIcon.height}`);
            checkAllImagesLoaded();
        };
        phoneIcon.onload = function () {
            console.log(`Phone icon loaded: ${phoneIcon.width}x${phoneIcon.height}`);
            checkAllImagesLoaded();
        };
        emailIcon.onload = function () {
            console.log(`Email icon loaded: ${emailIcon.width}x${emailIcon.height}`);
            checkAllImagesLoaded();
        };
        webIcon.onload = function () {
            console.log(`Web icon loaded: ${webIcon.width}x${webIcon.height}`);
            checkAllImagesLoaded();
        };

        // Добавляем обработчики ошибок для каждого изображения
        logo.onerror = function () {
            console.error('Ошибка загрузки логотипа');
            checkAllImagesLoaded();
        };
        addressIcon.onerror = function () {
            console.error('Ошибка загрузки address-icon.png');
            checkAllImagesLoaded();
        };
        phoneIcon.onerror = function () {
            console.error('Ошибка загрузки phone-icon.png');
            checkAllImagesLoaded();
        };
        emailIcon.onerror = function () {
            console.error('Ошибка загрузки email-icon.png');
            checkAllImagesLoaded();
        };
        webIcon.onerror = function () {
            console.error('Ошибка загрузки web-icon.png');
            checkAllImagesLoaded();
        };

        // Функция для рендеринга содержимого подписи на canvas
        function renderContent() {
            // Определяем параметры для рендеринга
            const fontSize = 11.5 * dpr; // Размер шрифта с учётом dpr
            const fontFamily = 'Calibri'; // Шрифт текста
            const textColor = '#000000'; // Цвет текста
            const lineHeight = 14 * dpr; // Высота строки с учётом dpr
            const iconWidth = 10 * dpr; // Ширина иконок
            const iconHeight = 10 * dpr; // Высота иконок
            const iconOffset = 10 * dpr; // Отступ между иконкой и текстом
            const logoWidth = 171 * dpr; // Ширина логотипа
            const logoHeight = 88 * dpr; // Высота логотипа
            const canvasWidth = 600 * dpr; // Ширина canvas
            const canvasHeight = 88 * dpr; // Высота canvas
            const logoPadding = 10 * dpr; // Отступ для логотипа
            const textPadding = 20 * dpr; // Отступ для текста
            const fourLineOffset = (logoHeight - (4 * lineHeight)) / 2; // Смещение для 4 строк
            const fiveLineOffset = 10 * dpr; // Смещение для 5 строк
            const iconYAdjust = (lineHeight - iconHeight) / 2; // Корректировка Y для иконок
            const textYAdjust = 10 * dpr; // Корректировка Y для текста

            // Устанавливаем шрифт и цвет текста
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = textColor;
            ctx.textRendering = 'geometricPrecision'; // Оптимизация рендеринга текста

            // Получаем данные из полей ввода (с значениями по умолчанию, если поля пустые)
            const office = document.getElementById('office').value || '330';
            const address = `600005, г.Владимир, ул.Тракторная, д.45, офис ${office}`; // Формируем адрес
            const extension = document.getElementById('extension').value || '2144';
            const formattedExtension = `+7 (4922) 53-77-55 (${extension.padStart(4, '0')})`; // Форматируем добавочный номер
            const mobile = document.getElementById('mobile').value || ''; // Номер мобильного телефона
            const email = document.getElementById('email').value || 'name@domain.ru'; // Email
            const web = 'abidev.ru'; // URL сайта

            // Определяем количество строк в подписи
            let lineCount = 4; // Базово 4 строки (адрес, телефон, email, сайт)
            if (showMobileCheckbox.checked && mobile) {
                lineCount += 1; // Добавляем строку для мобильного телефона, если чекбокс включён и поле заполнено
            }

            // Рисуем логотип на canvas
            ctx.drawImage(logo, logoPadding, 0, logoWidth, logoHeight);

            // Вычисляем начальную позицию текста
            const logoRightEdge = logoPadding + logoWidth + logoPadding; // Правая граница логотипа
            const textX = logoRightEdge + textPadding; // Начальная X-координата текста
            let currentY = lineCount === 4 ? fourLineOffset : fiveLineOffset; // Начальная Y-координата текста
            let y = currentY; // Текущая Y-координата для рендеринга строк

            // Рисуем адрес
            ctx.drawImage(addressIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
            ctx.fillText(address, textX, y + textYAdjust);
            y += lineHeight; // Переходим к следующей строке

            // Рисуем добавочный номер
            ctx.drawImage(phoneIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
            ctx.fillText(formattedExtension, textX, y + textYAdjust);
            y += lineHeight; // Переходим к следующей строке

            // Рисуем мобильный телефон, если чекбокс включён и поле заполнено
            if (showMobileCheckbox.checked && mobile) {
                ctx.drawImage(phoneIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
                ctx.fillText(mobile, textX, y + textYAdjust);
                y += lineHeight; // Переходим к следующей строке
            }

            // Рисуем email
            ctx.drawImage(emailIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
            ctx.fillText(email, textX, y + textYAdjust);
            y += lineHeight; // Переходим к следующей строке

            // Рисуем URL сайта
            ctx.drawImage(webIcon, textX - iconWidth - iconOffset, y + iconYAdjust, iconWidth, iconHeight);
            ctx.fillText(web, textX, y + textYAdjust);

            // Сохраняем подпись как PNG-файл и автоматически скачиваем её
            canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob); // Создаём URL для blob
                const link = document.createElement('a'); // Создаём ссылку для скачивания
                link.href = url;
                link.download = 'signature.png'; // Имя файла для скачивания
                document.body.appendChild(link); // Добавляем ссылку в DOM
                link.click(); // Программно кликаем по ссылке для скачивания
                document.body.removeChild(link); // Удаляем ссылку из DOM
                URL.revokeObjectURL(url); // Освобождаем память
            }, 'image/png'); // Формат изображения — PNG
        }
    }
});

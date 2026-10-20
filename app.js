const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let selectedId = null;
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Легкая вибрация при выборе
        if (tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
        }

        const drinkId = card.getAttribute('data-id');
        const title = card.querySelector('.card-title').textContent;

        if (selectedId === drinkId) {
            // Повторный клик снимает выбор
            card.classList.remove('selected');
            selectedId = null;
            tg.MainButton.hide();
        } else {
            // Снимаем выбор со всех карточек и выделяем текущую
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedId = drinkId;

            // Настройка и показ главной кнопки Telegram снизу экрана
            tg.MainButton.setText(`Выбрать: ${title}`);
            tg.MainButton.show();
        }
    });
});

// Отправка выбранного ID в бота при нажатии на нижнюю кнопку
Telegram.WebApp.onEvent('mainButtonClicked', () => {
    if (selectedId) {
        if (tg.HapticFeedback) {
            tg.HapticFeedback.notificationOccurred('success');
        }
        tg.sendData(selectedId);
    }
});
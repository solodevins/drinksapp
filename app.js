const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Полная база всех напитков из drinks.db с категориями и ссылками
const drinksData = [
    // Газировки
    {
        id: "1",
        category: "soda",
        badge: "Газировка",
        name: "Добрый Кола",
        desc: "Классический освежающий вкус. Отлично подходит к фастфуду.",
        price: "89 ₽",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80",
        buy_url: "https://samokat.ru/search?q=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0+%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9+%D0%9A%D0%BE%D0%BB%D0%B0"
    },
    {
        id: "2",
        category: "soda",
        badge: "Газировка",
        name: "Evervess Cola",
        desc: "Сильногазированный напиток, прекрасно утоляющий жажду.",
        price: "99 ₽",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
        buy_url: "https://samokat.ru/search?q=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0+Evervess"
    },
    {
        id: "3",
        category: "soda",
        badge: "Газировка",
        name: "Добрый Лимон-Лайм",
        desc: "Прозрачный цитрусовый лимонад с ярким бодрящим вкусом.",
        price: "89 ₽",
        image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&q=80",
        buy_url: "https://samokat.ru/search?q=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0+%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9+%D0%9B%D0%B8%D0%BC%D0%BE%D0%BD-%D0%9B%D0%B0%D0%B9%D0%BC"
    },
    // Чай
    {
        id: "4",
        category: "tea",
        badge: "Чай",
        name: "Lipton Зеленый",
        desc: "Холодный зеленый чай. Приятно освежает и тонизирует.",
        price: "110 ₽",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
        buy_url: "https://samokat.ru/search?q=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0+Lipton+%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9+%D1%87%D0%B0%D0%B9"
    },
    {
        id: "5",
        category: "tea",
        badge: "Чай",
        name: "Горячий зеленый чай",
        desc: "Традиционный листовой чай в пакетиках, богатый антиоксидантами.",
        price: "79 ₽",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&q=80",
        buy_url: "https://samokat.ru/search?q=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0+%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9+%D1%87%D0%B0%D0%B9"
    },
    // Коктейли
    {
        id: "6",
        category: "cocktails",
        badge: "Коктейль",
        name: "Мохито б/а",
        desc: "Мята, лайм, сироп, содовая и колотый лед.",
        price: "250 ₽",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80",
        map_url: "https://yandex.ru/maps/?text=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0%2C+%D0%B1%D0%B0%D1%80",
        video_url: "https://www.youtube.com/results?search_query=%D1%80%D0%B5%D1%86%D0%B5%D0%BF%D1%82+%D0%B1%D0%B5%D0%B7%D0%B0%D0%BB%D0%BA%D0%BE%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9+%D0%BC%D0%BE%D1%85%D0%B8%D1%82%D0%BE"
    },
    {
        id: "7",
        category: "cocktails",
        badge: "Коктейль",
        name: "Бамбл кофе",
        desc: "Слоистый напиток из эспрессо, апельсинового сока и карамели.",
        price: "220 ₽",
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80",
        map_url: "https://yandex.ru/maps/?text=%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%B0%2C+%D0%BA%D0%BE%D1%84%D0%B5%D0%B9%D0%BD%D1%8F",
        video_url: "https://www.youtube.com/results?search_query=%D1%80%D0%B5%D1%86%D0%B5%D0%BF%D1%82+%D0%B1%D0%B0%D0%BC%D0%B1%D0%BB+%D0%BA%D0%BE%D1%84%D0%B5"
    }
];

let selectedDrinkId = null;
const container = document.getElementById("drinks-container");

// Функция отрисовки карточек
function renderCards(filterCategory = "all") {
    container.innerHTML = "";

    const filtered = filterCategory === "all" 
        ? drinksData 
        : drinksData.filter(d => d.category === filterCategory);

    filtered.forEach(drink => {
        const card = document.createElement("div");
        card.className = `card ${selectedDrinkId === drink.id ? 'selected' : ''}`;
        card.dataset.id = drink.id;

        // Генерация ссылок
        let linksHtml = '<div class="links-group">';
        if (drink.buy_url) {
            linksHtml += `<a href="${drink.buy_url}" target="_blank" class="mini-link" onclick="event.stopPropagation()">🛒 Самокат</a>`;
        }
        if (drink.map_url) {
            linksHtml += `<a href="${drink.map_url}" target="_blank" class="mini-link" onclick="event.stopPropagation()">📍 Карта</a>`;
        }
        if (drink.video_url) {
            linksHtml += `<a href="${drink.video_url}" target="_blank" class="mini-link" onclick="event.stopPropagation()">🎥 Видео</a>`;
        }
        linksHtml += '</div>';

        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${drink.image}" alt="${drink.name}" class="card-img">
                <span class="badge">${drink.badge}</span>
            </div>
            <div class="card-content">
                <h3 class="card-title">${drink.name}</h3>
                <p class="card-desc">${drink.desc}</p>
                ${linksHtml}
                <div class="card-footer">
                    <span class="price">${drink.price}</span>
                    <button class="select-btn">Выбрать</button>
                </div>
            </div>
        `;

        // Клик по карточке для выбора
        card.addEventListener("click", () => {
            if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred("light");

            if (selectedDrinkId === drink.id) {
                selectedDrinkId = null;
                card.classList.remove("selected");
                tg.MainButton.hide();
            } else {
                document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
                selectedDrinkId = drink.id;

                tg.MainButton.setText(`Отправить в чат: ${drink.name}`);
                tg.MainButton.show();
            }
        });

        container.appendChild(card);
    });
}

// Переключение категорий
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCards(btn.dataset.category);
    });
});

// Отправка выбранного ID в бота по клику на нижнюю системную кнопку Telegram
Telegram.WebApp.onEvent("mainButtonClicked", () => {
    if (selectedDrinkId) {
        if (tg.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
        tg.sendData(selectedDrinkId);
    }
});

// Начальная отрисовка всех позиций
renderCards("all");
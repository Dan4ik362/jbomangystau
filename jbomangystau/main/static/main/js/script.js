    document.addEventListener("DOMContentLoaded", function () {
        const hero = document.getElementById("hero");

        // список картинок (добавь свои)
        const images = [
            "{% static 'main/img/bg.jpg' %}",
            "{% static 'main/img/bg2.jpg' %}",
            "{% static 'main/img/bg3.jpg' %}"
        ];

        let index = 0;

        function changeBackground() {
            hero.style.backgroundImage = `url('${images[index]}')`;
            index = (index + 1) % images.length;
        }

        // сразу первая картинка
        changeBackground();

        // смена каждые 2 секунд
        setInterval(changeBackground, 2000);
    });



document.querySelector('.language-switcher').addEventListener('click', function() {
    this.classList.toggle('active');
});

// Закрытие меню при клике вне области
document.addEventListener('click', function(event) {
    const languageSwitcher = document.querySelector('.language-switcher');
    if (!languageSwitcher.contains(event.target)) {
        languageSwitcher.classList.remove('active');
    }
});


document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        // Закрываем все остальные открытые элементы
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Переключаем текущий элемент
        item.classList.toggle('active');
    });
});
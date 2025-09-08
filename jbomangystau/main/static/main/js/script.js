document.addEventListener("DOMContentLoaded", function () {
    // Валидация формы
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !message) {
                event.preventDefault();
                alert('Пожалуйста, заполните все поля.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                event.preventDefault();
                alert('Пожалуйста, введите действительный email.');
            }
        });
    }

    // Языковой переключатель
    document.querySelector('.language-switcher').addEventListener('click', function() {
        this.classList.toggle('active');
    });

    document.addEventListener('click', function(event) {
        const languageSwitcher = document.querySelector('.language-switcher');
        if (!languageSwitcher.contains(event.target)) {
            languageSwitcher.classList.remove('active');
        }
    });

    // FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            console.log('Клик по FAQ-item'); // Отладка: проверка клика
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
});
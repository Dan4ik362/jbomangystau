document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM загружен, инициализация скриптов...");

    // Language Switcher
    const languageSwitchers = document.querySelectorAll('.language-switcher');
    languageSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function(event) {
            event.stopPropagation();
            this.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (!switcher.contains(event.target)) {
                switcher.classList.remove('active');
            }
        });
    });



    // Form Validation
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

    // FAQ Toggling
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            console.log('Клик по FAQ-item');
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Dialogs for Services
    function openDialog(dialogId) {
        console.log("Попытка открыть диалог:", dialogId);
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log("Диалог открыт:", dialogId);
        } else {
            console.error("Диалог с ID", dialogId, "не найден!");
        }
    }

    function closeDialog(dialogId) {
        console.log("Попытка закрыть диалог:", dialogId);
        const dialog = document.getElementById(dialogId);
        if (dialog) {
            dialog.style.display = 'none';
            document.body.style.overflow = 'auto';
            console.log("Диалог закрыт:", dialogId);
        }
    }

    document.querySelectorAll('.dialog').forEach(dialog => {
        dialog.addEventListener('click', function(event) {
            if (event.target === dialog) {
                closeDialog(dialog.id);
            }
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.dialog').forEach(dialog => {
                closeDialog(dialog.id);
            });
        }
    });

    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', function() {
            const dialogId = this.getAttribute('data-dialog');
            console.log("Клик по элементу:", this.querySelector('h3').textContent);
            if (dialogId) {
                openDialog(dialogId);
            } else {
                console.error("data-dialog не найден для элемента!");
            }
        });
    });

    window.openDialog = openDialog;
    window.closeDialog = closeDialog;

    // Filter and Slider for Projects
    const filterButtons = document.querySelectorAll('input[name="filter"]');
    const filterContainer = document.getElementById("filter-buttons");
    const indicator = filterContainer ? filterContainer.querySelector(".filter-indicator") : null;

    const slider = document.getElementById("projects-slider");
    const cards = slider ? Array.from(slider.querySelectorAll(".project-card")) : [];

    const prevBtn = document.querySelector(".slider-btn.prev");
    const nextBtn = document.querySelector(".slider-btn.next");

    let offset = 0;
    let cardWidth = cards.length > 0 ? cards[0].offsetWidth + 20 : 0; // Инициализируем динамически
    let activeCards = [...cards];

    function updateCardWidth() {
        cardWidth = cards.length > 0 ? cards[0].offsetWidth + 20 : 0;
    }

    function filterCards(value) {
        console.log("Фильтрация по:", value);
        activeCards = [];
        cards.forEach(card => {
            if (card.dataset.category === value || value === 'all') {
                card.classList.remove("hide");
                activeCards.push(card);
            } else {
                card.classList.add("hide");
            }
        });
        offset = 0;
        if (slider) {
            slider.style.transform = `translateX(0px)`;
        }
        console.log("Активных карточек:", activeCards.length);
        updateCardWidth(); // Обновляем ширину при фильтрации
    }

    function moveIndicator(input, instantly = false) {
        if (!indicator || !filterContainer) return;
        const label = filterContainer.querySelector(`label[for="${input.id}"]`);
        if (!label) return;

        const containerRect = filterContainer.getBoundingClientRect();
        const labelRect = label.getBoundingClientRect();

        const left = labelRect.left - containerRect.left;
        const width = labelRect.width;

        if (instantly) {
            indicator.style.transition = "none";
            indicator.style.width = `${width}px`;
            indicator.style.transform = `translateX(${left}px)`;
            void indicator.offsetWidth;
            indicator.style.transition = "";
        } else {
            indicator.style.width = `${width}px`;
            indicator.style.transform = `translateX(${left}px)`;
        }
    }

filterButtons.forEach(button => {
    button.addEventListener("change", () => {
        filterCards(button.value);
        moveIndicator(button);
    });
});

if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        const sliderWidth = slider ? slider.parentElement.offsetWidth : 0;
        const maxOffset = -(activeCards.length * cardWidth - sliderWidth + 20); // Учитываем отступ
        console.log("Next: offset", offset, "maxOffset", maxOffset, "sliderWidth", sliderWidth, "cardWidth", cardWidth);
        if (offset > maxOffset) {
            offset -= cardWidth;
            if (slider) {
                slider.style.transform = `translateX(${offset}px)`;
            }
        }
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        console.log("Prev: offset", offset);
        if (offset < 0) {
            offset += cardWidth;
            if (slider) {
                slider.style.transform = `translateX(${offset}px)`;
            }
        }
    });
}

if (filterButtons.length > 0) {
    const checked = Array.from(filterButtons).find(i => i.checked);
    if (checked) {
        setTimeout(() => {
            filterCards(checked.value);
            moveIndicator(checked, true);
        }, 50);
    }
}

window.addEventListener("resize", () => {
    updateCardWidth(); // Обновляем ширину при изменении размера окна
    const current = Array.from(filterButtons).find(i => i.checked);
    if (current) moveIndicator(current, true);
});

    // Team Carousel
    if (!window.teamMembers) {
        console.error("teamMembers is not defined");
        return;
    }

    const teamCards = document.querySelectorAll(".card");
    const teamDots = document.querySelectorAll(".dot");
    const teamMemberName = document.querySelector(".member-name");
    const teamMemberRole = document.querySelector(".member-role");
    const teamLeftArrow = document.querySelector(".nav-arrow.left");
    const teamRightArrow = document.querySelector(".nav-arrow.right");
    let teamCurrentIndex = 0;
    let teamIsAnimating = false;

    function updateTeamCarousel(newIndex) {
        if (teamIsAnimating || teamCards.length === 0) return;
        teamIsAnimating = true;

        teamCurrentIndex = (newIndex + teamCards.length) % teamCards.length;

        teamCards.forEach((card, i) => {
            const offset = (i - teamCurrentIndex + teamCards.length) % teamCards.length;

            card.classList.remove("center", "left-1", "right-1", "hidden");

            if (offset === 0) {
                card.classList.add("center");
            } else if (offset === 1) {
                card.classList.add("right-1");
            } else if (offset === teamCards.length - 1) {
                card.classList.add("left-1");
            } else {
                card.classList.add("hidden");
            }
        });

        teamDots.forEach((dot, i) => {
            dot.classList.toggle("active", i === teamCurrentIndex);
        });

        if (teamMemberName && teamMemberRole) {
            teamMemberName.style.opacity = "0";
            teamMemberRole.style.opacity = "0";

            setTimeout(() => {
                teamMemberName.textContent = teamMembers[teamCurrentIndex].name;
                teamMemberRole.textContent = teamMembers[teamCurrentIndex].role;
                teamMemberName.style.opacity = "1";
                teamMemberRole.style.opacity = "1";
            }, 300);
        }

        setTimeout(() => {
            teamIsAnimating = false;
        }, 800);
    }

    if (teamLeftArrow) {
        teamLeftArrow.addEventListener("click", () => {
            updateTeamCarousel(teamCurrentIndex - 1);
        });
    }

    if (teamRightArrow) {
        teamRightArrow.addEventListener("click", () => {
            updateTeamCarousel(teamCurrentIndex + 1);
        });
    }

    teamDots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            updateTeamCarousel(i);
        });
    });

    teamCards.forEach((card, i) => {
        card.addEventListener("click", () => {
            updateTeamCarousel(i);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            updateTeamCarousel(teamCurrentIndex - 1);
        } else if (e.key === "ArrowRight") {
            updateTeamCarousel(teamCurrentIndex + 1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                updateTeamCarousel(teamCurrentIndex + 1);
            } else {
                updateTeamCarousel(teamCurrentIndex - 1);
            }
        }
    }

    if (teamCards.length > 0) {
        updateTeamCarousel(0);
    }


// Бургер-меню
            const burgerMenu = document.getElementById('burgerMenu');
            const menuPanel = document.getElementById('menuPanel');
            const menuClose = document.getElementById('menuClose');

            function openMenu() {
                menuPanel.classList.add('open');
                document.body.style.overflow = 'hidden';
            }

            function closeMenu() {
                menuPanel.classList.remove('open');
                document.body.style.overflow = 'auto';
            }

            if (burgerMenu && menuPanel && menuClose) {
                burgerMenu.addEventListener('click', openMenu);
                menuClose.addEventListener('click', closeMenu);

                // Закрытие меню при клике вне панели
                document.addEventListener('click', function(event) {
                    if (!menuPanel.contains(event.target) && !burgerMenu.contains(event.target)) {
                        closeMenu();
                    }
                });

                // Закрытие меню при клике на ссылки
                document.querySelectorAll('.menu-nav a').forEach(link => {
                    link.addEventListener('click', closeMenu);
                });
            }

            // Переключатель языков
            const languageSwitcher = document.getElementById('languageSwitcherMobile');
            if (languageSwitcher) {
                languageSwitcher.addEventListener('click', function(event) {
                    event.stopPropagation();
                    this.classList.toggle('active');
                });

                document.addEventListener('click', function(event) {
                    if (!languageSwitcher.contains(event.target)) {
                        languageSwitcher.classList.remove('active');
                    }
                });
            }


});


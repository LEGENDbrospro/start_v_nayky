document.getElementById('mapButton').addEventListener('click', function() {
    // Открываем новое окно с картой Кронштадта
    window.open('https://www.google.com/maps/place/Кронштадт', '_blank');
});

// Анимация при прокрутке (Intersection Observer)
document.addEventListener('DOMContentLoaded', function() {
    // Наблюдатель для секций
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Добавляем задержку для дочерних элементов
                if (entry.target.classList.contains('history-timeline-vertical')) {
                    const periods = entry.target.querySelectorAll('.history-period');
                    periods.forEach((period, index) => {
                        setTimeout(() => {
                            period.classList.add('visible');
                        }, index * 150);
                    });
                }
                
                if (entry.target.classList.contains('timeline-enhanced')) {
                    const items = entry.target.querySelectorAll('.timeline-item-enhanced');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 150);
                    });
                }
                
                if (entry.target.classList.contains('glossary-grid')) {
                    const cards = entry.target.querySelectorAll('.glossary-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
                
                // Анимация для всех элементов с классом animate-on-scroll
                const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Наблюдаем за всеми секциями с анимацией
    document.querySelectorAll('.scroll-animate').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Наблюдаем за внутренними элементами
    document.querySelectorAll('.history-timeline-vertical, .timeline-enhanced, .glossary-grid').forEach(element => {
        sectionObserver.observe(element);
    });
    
    // Наблюдаем за всеми элементами с классом animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        sectionObserver.observe(element);
    });
    
    // Параллакс-эффект для header при прокрутке
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const scrolled = window.pageYOffset;
        if (header && scrolled < 500) {
            header.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // Плавное появление карточек фортов
    const fortObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                fortObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    document.querySelectorAll('.fort-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fortObserver.observe(card);
    });
    
    // Анимация для таблиц вооружения
    const tableObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rows = entry.target.querySelectorAll('tr');
                rows.forEach((row, index) => {
                    setTimeout(() => {
                        row.style.opacity = '1';
                        row.style.transform = 'translateX(0)';
                    }, index * 50);
                });
                tableObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    document.querySelectorAll('.weapons-table, table').forEach(table => {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, index) => {
            if (index > 0) { // Пропускаем заголовок
                row.style.opacity = '0';
                row.style.transform = 'translateX(-20px)';
                row.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            }
        });
        tableObserver.observe(table);
    });
    
    // Анимация для заголовков разделов
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const underline = entry.target.querySelector('.animate-title::after');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('h2, h3').forEach(title => {
        titleObserver.observe(title);
    });
    
    // Анимация для изображений в галерее
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 200);
                imageObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    document.querySelectorAll('.gallery-image img, .fort-photo img').forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        imageObserver.observe(img);
    });
});
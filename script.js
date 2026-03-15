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
});
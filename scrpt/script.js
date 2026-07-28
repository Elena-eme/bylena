document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('tasteCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carousel && prevBtn && nextBtn) {
        const scrollAmount = 300;

        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    // Transición física de presión en las teclas al hacer clic
    const keyCards = document.querySelectorAll('.key-card');

    keyCards.forEach(card => {
        card.addEventListener('mousedown', () => {
            card.style.transform = 'translateY(7px)';
        });

        card.addEventListener('mouseup', () => {
            card.style.transform = 'translateY(5px)';
        });
    });

});
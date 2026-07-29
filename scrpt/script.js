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

// NAVBAR

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL MENÚ DESPLEGABLE LATERAL ---
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
        if (sideMenu && menuOverlay) {
            sideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
        }
    }

    function closeMenu() {
        if (sideMenu && menuOverlay) {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaura el scroll
        }
    }

    if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    // Cerrar menú al presionar la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideMenu && sideMenu.classList.contains('active')) {
            closeMenu();
        }
    });

});

// footer

document.addEventListener('DOMContentLoaded', () => {
    
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.site-footer');

    function checkScrollBottom() {
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight;

        // Umbral de 60px antes del final absoluto
        const isAtBottom = (windowHeight + scrollPosition) >= (totalHeight - 60);

        if (isAtBottom) {
            if (navbar) navbar.classList.add('nav-hidden');
            if (footer) footer.classList.add('footer-visible');
        } else {
            if (navbar) navbar.classList.remove('nav-hidden');
            if (footer) footer.classList.remove('footer-visible');
        }
    }

    // Escuchar el evento de scroll
    window.addEventListener('scroll', checkScrollBottom, { passive: true });
    
    // Verificación inicial por si la página ya carga en el fondo
    checkScrollBottom();

});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.site-footer');

    if (document.body.classList.contains('index-page') && footer) {
        const observerOptions = {
            root: null,
            threshold: 0.4 // Detecta cuando el 40% del footer está visible
        };

        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (navbar) navbar.classList.add('nav-hidden');
                    footer.classList.add('footer-visible');
                } else {
                    if (navbar) navbar.classList.remove('nav-hidden');
                    footer.classList.remove('footer-visible');
                }
            });
        }, observerOptions);

        footerObserver.observe(footer);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL LIGHTBOX (VISOR PANTALLA COMPLETA) ---
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const triggers = document.querySelectorAll('.lightbox-trigger img');

    triggers.forEach(img => {
        img.addEventListener('click', () => {
            if (lightboxModal && lightboxImage) {
                lightboxImage.src = img.src;
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target !== lightboxImage) closeLightbox();
        });
    }

});
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MENÚ DESPLEGABLE LATERAL (NAVBAR & OVERLAY)
    // ==========================================
    const openMenuBtn = document.getElementById('openMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMenu() {
        if (sideMenu && menuOverlay) {
            sideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.classList.add('menu-open');
        }
    }

    function closeMenu() {
        if (sideMenu && menuOverlay) {
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }

    if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    // ==========================================
    // 2. MOSTRAR / OCULTAR FOOTER Y NAVBAR EN SCROLL
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.site-footer');

    if (footer) {
        const checkFooterVisibility = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY || window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight;

            // Si el usuario está cerca del final de la página (a 80px del suelo)
            if (windowHeight + scrollY >= documentHeight - 80) {
                if (navbar) navbar.classList.add('nav-hidden');
                footer.classList.add('footer-visible');
            } else {
                if (navbar) navbar.classList.remove('nav-hidden');
                footer.classList.remove('footer-visible');
            }
        };

        window.addEventListener('scroll', checkFooterVisibility, { passive: true });
        checkFooterVisibility(); // Ejecutar al inicio por si ya está abajo
    }

    // ==========================================
    // 3. CARRUSEL DRAG & DROP + HOVER INFO
    // ==========================================
    const trackContainer = document.getElementById('carouselTrack');
    const hoverInfo = document.getElementById('hoverInfo');
    const items = document.querySelectorAll('.carousel-item');
    let isDragging = false; // Control para evitar abrir el Lightbox al arrastrar

    // Texto dinámico superior al hacer hover
    if (hoverInfo && items.length > 0) {
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const infoText = item.getAttribute('data-info');
                if (infoText) {
                    const infoP = hoverInfo.querySelector('.info-text');
                    if (infoP) infoP.textContent = infoText;
                    hoverInfo.classList.add('visible');
                }
            });

            item.addEventListener('mouseleave', () => {
                hoverInfo.classList.remove('visible');
            });
        });
    }

    // Arrastrar con el ratón (Drag to Scroll)
    if (trackContainer) {
        let isDown = false;
        let startX;
        let scrollLeft;

        trackContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            trackContainer.classList.add('active');
            startX = e.pageX - trackContainer.offsetLeft;
            scrollLeft = trackContainer.scrollLeft;
        });

        trackContainer.addEventListener('mouseleave', () => { isDown = false; });
        trackContainer.addEventListener('mouseup', () => { isDown = false; });

        trackContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - trackContainer.offsetLeft;
            const walk = (x - startX) * 2;
            
            // Si el movimiento es mayor a 5px, consideramos que es un arrastre (no un clic)
            if (Math.abs(walk) > 5) {
                isDragging = true;
            }
            trackContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // ==========================================
    // 4. LIGHTBOX (MODAL AMPLIZADO EN CLIC)
    // ==========================================
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Si el usuario estaba arrastrando el carrusel, ignora el clic
            if (isDragging) return;

            const img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
            if (img && lightboxModal && lightboxImage) {
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
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    // Cierre unificado de Menú y Lightbox con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (sideMenu && sideMenu.classList.contains('active')) closeMenu();
            if (lightboxModal && lightboxModal.classList.contains('active')) closeLightbox();
        }
    });

    // ==========================================
    // 5. BOTONES DE NAVEGACIÓN SECUNDARIOS
    // ==========================================
    const carouselBtnTarget = document.getElementById('tasteCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (carouselBtnTarget && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => carouselBtnTarget.scrollBy({ left: -300, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => carouselBtnTarget.scrollBy({ left: 300, behavior: 'smooth' }));
    }
});
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
    // 2. CONTROL DE OCULTAR NAVBAR EN SCROLL (FOOTER SIEMPRE VISIBLE)
    // ==========================================
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('.site-footer');

    // Aseguramos que el footer SIEMPRE esté visible por defecto
    if (footer) {
        footer.classList.add('footer-visible');
    }

    if (navbar && footer) {
        const checkScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY || window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight;

            // Oculta la barra de navegación superior únicamente si llegamos al final de la página
            if (windowHeight + scrollY >= documentHeight - 80) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
        };

        window.addEventListener('scroll', checkScroll, { passive: true });
        checkScroll();
    }

    // ==========================================
    // 3. CARRUSEL DRAG & DROP + HOVER INFO
    // ==========================================
    const trackContainer = document.getElementById('carouselTrack');
    const hoverInfo = document.getElementById('hoverInfo');
    const items = document.querySelectorAll('.carousel-item');
    let isDragging = false; 

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
            
            if (Math.abs(walk) > 5) {
                isDragging = true;
            }
            trackContainer.scrollLeft = scrollLeft - walk;
        });
    }

    // ==========================================
    // 4. LIGHTBOX (MODAL AMPLIADO EN CLIC)
    // ==========================================
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
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

    // Cierre con la tecla ESC
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

// ==========================================
// 6. FUNCIÓN DE VOLUMEN DE VÍDEO (TFG)
// ==========================================
function toggleVolume() {
    const video = document.getElementById('tfgVideo');
    const muteIcon = document.getElementById('muteIcon');
    const soundIcon = document.getElementById('soundIcon');

    if (video) {
        if (video.muted) {
            video.muted = false;
            if (muteIcon) muteIcon.classList.add('hidden');
            if (soundIcon) soundIcon.classList.remove('hidden');
        } else {
            video.muted = true;
            if (muteIcon) muteIcon.classList.remove('hidden');
            if (soundIcon) soundIcon.classList.add('hidden');
        }
    }
}

// VIDEO

// ==========================================
// PÁGINA DE VÍDEO: EXPANSIÓN DE TARJETAS PANTONE Y REPRODUCTOR MODAL
// ==========================================
const folderCards = document.querySelectorAll('.folder-card');
const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDesc = document.getElementById('modalDesc');
const modalIframe = document.getElementById('modalIframe');

if (folderCards.length > 0 && videoModal) {
    folderCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const subtitle = card.getAttribute('data-subtitle');
            const desc = card.getAttribute('data-desc');
            const ytUrl = card.getAttribute('data-yt');

            // 1. Obtener coordenadas y posición central exacta de la tarjeta pulsada
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            // 2. Extraer el color de fondo y de texto exactos asignados a la tarjeta
            const cardBg = window.getComputedStyle(card).backgroundColor;
            const cardColor = window.getComputedStyle(card).color;

            // 3. Aplicar colores al modal expandido
            videoModal.style.backgroundColor = cardBg;
            videoModal.style.color = cardColor;

            // 4. Fijar el origen de la animación en el punto donde está la tarjeta en pantalla
            videoModal.style.transformOrigin = `${cardCenterX}px ${cardCenterY}px`;

            // 5. Cargar contenidos y URL del vídeo
            modalTitle.textContent = title;
            modalSubtitle.textContent = subtitle;
            modalDesc.textContent = desc;
            modalIframe.src = ytUrl + "?autoplay=1";

            // 6. Activar visibilidad y bloquear el scroll de fondo
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // 7. Animación de expansión fluida usando Web Animations API
            videoModal.animate([
                { transform: 'scale(0)', opacity: 0, borderRadius: '20px' },
                { transform: 'scale(1)', opacity: 1, borderRadius: '0px' }
            ], {
                duration: 450,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
            });
        });
    });

    // Función para cerrar la tarjeta expandida encogiéndose a su posición de origen
    function hideVideoModal() {
        if (!videoModal.classList.contains('active')) return;

        const animation = videoModal.animate([
            { transform: 'scale(1)', opacity: 1, borderRadius: '0px' },
            { transform: 'scale(0)', opacity: 0, borderRadius: '20px' }
        ], {
            duration: 350,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        animation.onfinish = () => {
            videoModal.classList.remove('active');
            modalIframe.src = ""; // Detener la reproducción del vídeo al cerrar
            document.body.style.overflow = '';
        };
    }

    // Escuchadores de eventos para cerrar (Botón de cierre, fondo y tecla ESC)
    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', hideVideoModal);
    }

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) hideVideoModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            hideVideoModal();
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card');
    const infoTitle = document.getElementById('infoTitle');
    const infoDesc = document.getElementById('infoDesc');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselTrack = document.getElementById('carouselTrack');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const scrapbookModal = document.getElementById('scrapbookModal');

    let currentIndex = 0;
    const cardWidth = 390; // Ancho tarjeta (360px) + Gap (30px)

    function updateCarousel(index) {
        if (index < 0) index = 0;
        if (index >= cards.length) index = cards.length - 1;

        currentIndex = index;

        // Desplazamiento del carrusel
        carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Transición suave del texto del panel izquierdo
        infoTitle.style.opacity = '0';
        infoTitle.style.transform = 'translateY(8px)';
        infoDesc.style.opacity = '0';
        infoDesc.style.transform = 'translateY(8px)';

        setTimeout(() => {
            const activeCard = cards[currentIndex];
            infoTitle.textContent = activeCard.dataset.title;
            infoDesc.textContent = activeCard.dataset.desc;

            infoTitle.style.opacity = '1';
            infoTitle.style.transform = 'translateY(0)';
            infoDesc.style.opacity = '1';
            infoDesc.style.transform = 'translateY(0)';
        }, 200);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                updateCarousel(currentIndex + 1);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                updateCarousel(currentIndex - 1);
            }
        });
    }

    // Al hacer clic en "Ver más", abre la revista/scrapbook
    if (viewMoreBtn && scrapbookModal) {
        viewMoreBtn.addEventListener('click', () => {
            scrapbookModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Inicializar el primer proyecto
    updateCarousel(0);
});

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Transición por Scroll
    const heroSection = document.getElementById("heroSection");
    const gallerySection = document.getElementById("gallerySection");

    if (heroSection && gallerySection) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    heroSection.classList.add("is-scrolled-out");
                    gallerySection.classList.add("is-visible");
                } else {
                    heroSection.classList.remove("is-scrolled-out");
                    gallerySection.classList.remove("is-visible");
                }
            });
        }, {
            threshold: 0.3
        });

        scrollObserver.observe(heroSection);
    }

    // 2. Anotación Rosa Crayon
    const highlightTarget = document.getElementById("highlightCrayon");
    const quoteWrapper = document.getElementById("quoteWrapper");

    if (highlightTarget && quoteWrapper && window.RoughNotation) {
        const annotation = RoughNotation.annotate(highlightTarget, {
            type: 'circle',
            color: '#ff69b4',
            strokeWidth: 2.3,
            padding: 32,
            iterations: 2.5,
            animationDuration: 600
        });

        quoteWrapper.addEventListener("mouseenter", () => {
            annotation.show();
        });
    }
});
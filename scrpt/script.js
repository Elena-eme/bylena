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

    if (footer) {
        footer.classList.add('footer-visible');
    }

    if (navbar && footer) {
        const checkScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY || window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight;

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
    const prevBtnSecondary = document.getElementById('prevBtn');
    const nextBtnSecondary = document.getElementById('nextBtn');

    if (carouselBtnTarget && prevBtnSecondary && nextBtnSecondary) {
        prevBtnSecondary.addEventListener('click', () => carouselBtnTarget.scrollBy({ left: -300, behavior: 'smooth' }));
        nextBtnSecondary.addEventListener('click', () => carouselBtnTarget.scrollBy({ left: 300, behavior: 'smooth' }));
    }

    // ==========================================
    // 6. CARRUSEL DE PROYECTOS / TARJETAS
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card');
    const infoTitle = document.getElementById('infoTitle');
    const infoDesc = document.getElementById('infoDesc');
    const carouselTrackProj = document.getElementById('carouselTrack');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const scrapbookModal = document.getElementById('scrapbookModal');

    if (projectCards.length > 0 && carouselTrackProj) {
        let currentIndex = 0;
        const cardWidth = 390;

        function updateCarousel(index) {
            if (index < 0) index = 0;
            if (index >= projectCards.length) index = projectCards.length - 1;

            currentIndex = index;

            carouselTrackProj.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            if (infoTitle && infoDesc) {
                infoTitle.style.opacity = '0';
                infoTitle.style.transform = 'translateY(8px)';
                infoDesc.style.opacity = '0';
                infoDesc.style.transform = 'translateY(8px)';

                setTimeout(() => {
                    const activeCard = projectCards[currentIndex];
                    infoTitle.textContent = activeCard.dataset.title || '';
                    infoDesc.textContent = activeCard.dataset.desc || '';

                    infoTitle.style.opacity = '1';
                    infoTitle.style.transform = 'translateY(0)';
                    infoDesc.style.opacity = '1';
                    infoDesc.style.transform = 'translateY(0)';
                }, 200);
            }
        }

        if (nextBtnSecondary) {
            nextBtnSecondary.addEventListener('click', () => {
                if (currentIndex < projectCards.length - 1) {
                    updateCarousel(currentIndex + 1);
                }
            });
        }

        if (prevBtnSecondary) {
            prevBtnSecondary.addEventListener('click', () => {
                if (currentIndex > 0) {
                    updateCarousel(currentIndex - 1);
                }
            });
        }

        updateCarousel(0);
    }

    if (viewMoreBtn && scrapbookModal) {
        viewMoreBtn.addEventListener('click', () => {
            scrapbookModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // ==========================================
    // 7. HERO & ANOTACIÓN ROSA CRAYON (ROUGHNOTATION)
    // ==========================================
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
        }, { threshold: 0.3 });

        scrollObserver.observe(heroSection);
    }

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

// ==========================================
// 8. FUNCIÓN DE VOLUMEN DE VÍDEO (TFG)
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

// ==========================================
// 9. PÁGINA DE VÍDEO: PANTONE Y MODAL REPRODUCTOR
// ==========================================
const folderCards = document.querySelectorAll('.folder-card');
const pantoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDesc = document.getElementById('modalDesc');
const modalIframe = document.getElementById('modalIframe');

if (folderCards.length > 0 && pantoModal) {
    folderCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const subtitle = card.getAttribute('data-subtitle');
            const desc = card.getAttribute('data-desc');
            const ytUrl = card.getAttribute('data-yt');

            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            const cardBg = window.getComputedStyle(card).backgroundColor;
            const cardColor = window.getComputedStyle(card).color;

            pantoModal.style.backgroundColor = cardBg;
            pantoModal.style.color = cardColor;
            pantoModal.style.transformOrigin = `${cardCenterX}px ${cardCenterY}px`;

            if (modalTitle) modalTitle.textContent = title;
            if (modalSubtitle) modalSubtitle.textContent = subtitle;
            if (modalDesc) modalDesc.textContent = desc;
            if (modalIframe) modalIframe.src = ytUrl + "?autoplay=1";

            pantoModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            pantoModal.animate([
                { transform: 'scale(0)', opacity: 0, borderRadius: '20px' },
                { transform: 'scale(1)', opacity: 1, borderRadius: '0px' }
            ], {
                duration: 450,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards'
            });
        });
    });

    function hideVideoModal() {
        if (!pantoModal.classList.contains('active')) return;

        const animation = pantoModal.animate([
            { transform: 'scale(1)', opacity: 1, borderRadius: '0px' },
            { transform: 'scale(0)', opacity: 0, borderRadius: '20px' }
        ], {
            duration: 350,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        animation.onfinish = () => {
            pantoModal.classList.remove('active');
            if (modalIframe) modalIframe.src = "";
            document.body.style.overflow = '';
        };
    }

    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', hideVideoModal);
    }

    pantoModal.addEventListener('click', (e) => {
        if (e.target === pantoModal) hideVideoModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && pantoModal.classList.contains('active')) {
            hideVideoModal();
        }
    });
}

// ==========================================
// 10. EFECTO FROST INTERACTIVO
// ==========================================
const container = document.getElementById('frostContainer');
const canvas = document.getElementById('frostCanvas');

if (canvas && container) {
    const ctx = canvas.getContext('2d');

    function initFrost() {
        const dpr = window.devicePixelRatio || 1;
        const w = container.clientWidth || container.offsetWidth;
        const h = container.clientHeight || container.offsetHeight;

        if (w === 0 || h === 0) return;

        canvas.width = w * dpr;
        canvas.height = h * dpr;
        
        ctx.scale(dpr, dpr);

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(221, 235, 247, 0.92)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        for (let i = 0; i < 2000; i++) {
            const rx = Math.random() * w;
            const ry = Math.random() * h;
            ctx.fillRect(rx, ry, 2, 2);
        }

        ctx.globalCompositeOperation = 'destination-out';
        const fontSize = 18;
        ctx.font = `600 ${fontSize}px 'Helvetica Neue', Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText('DESCONGELA', w / 2, h / 2);
    }

    function reveal(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out';

        const brushRadius = 50;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushRadius);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    canvas.addEventListener('mousemove', reveal);
    window.addEventListener('resize', initFrost);
    window.addEventListener('load', initFrost);
    initFrost();
}

// ==========================================
// 11. MODAL VÍDEO YOUTUBE (SECCIONES 06 Y 08)
// ==========================================
const ytVideoModal = document.getElementById('videoModal');
const ytModalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const videoIframe = document.getElementById('videoIframe');
const videoTriggers = document.querySelectorAll('[data-video-id]');

function openVideoModal(videoId) {
    if (videoIframe && ytVideoModal) {
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        ytVideoModal.classList.add('active');
    }
}

function closeYtVideoModal() {
    if (videoIframe && ytVideoModal) {
        videoIframe.src = '';
        ytVideoModal.classList.remove('active');
    }
}

videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const videoId = trigger.getAttribute('data-video-id');
        openVideoModal(videoId);
    });
});

if (closeModalBtn) closeModalBtn.addEventListener('click', closeYtVideoModal);
if (ytModalOverlay) ytModalOverlay.addEventListener('click', closeYtVideoModal);
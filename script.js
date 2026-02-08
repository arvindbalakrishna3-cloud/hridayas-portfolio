// MOBILE MENU
const hamburger = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// SLIDER LOGIC
function moveSlide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    const cardWidth = slider.querySelector('.card').offsetWidth + 30; // Card width + Gap
    // compute a bounded target to avoid overscrolling
    const current = slider.scrollLeft;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, current + direction * cardWidth));
    slider.scrollTo({ left: target, behavior: 'smooth' });

    // Detect when we've reached the end and trigger a brief "stuck" animation
    if (slider._stuckTimer) clearTimeout(slider._stuckTimer);
    slider._stuckTimer = setTimeout(() => {
        const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 2;
        if (atEnd) {
            slider.classList.add('stuck');
            // remove after animation completes
            setTimeout(() => slider.classList.remove('stuck'), 900);
        } else {
            slider.classList.remove('stuck');
        }
    }, 520);
}

// SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => {
    s.style.opacity = "0";
    s.style.transform = "translateY(30px)";
    s.style.transition = "1s ease-out";
    observer.observe(s);
});

// Animate cards on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0) scale(1)";
            }, index * 100); // Stagger animation
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px) scale(0.9)";
    card.style.transition = "0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    cardObserver.observe(card);
});

// MOBILE HOVER FIX
document.querySelectorAll('.slide').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.add('hover');
    });
    
    card.addEventListener('touchend', () => {
        setTimeout(() => card.classList.remove('hover'), 150); // Small delay to prevent flicker
    });
});

// MOBILE KEYBOARD SUPPORT FOR SLIDERS
document.addEventListener('keydown', (e) => {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        // Check if slider is in viewport
        const rect = slider.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (inViewport) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const sliderId = slider.id;
                moveSlide(sliderId, -1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                const sliderId = slider.id;
                moveSlide(sliderId, 1);
            }
        }
    });
});

// GALLERY LIGHTBOX
(() => {
    const galleryImgs = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!galleryImgs.length || !lightbox) return; // nothing to do

    function openLightbox(img) {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt') || '';
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightboxCaption.textContent = alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        lightboxCaption.textContent = '';
        document.body.style.overflow = '';
    }

    galleryImgs.forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    closeBtn.addEventListener('click', closeLightbox);

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxCaption) closeLightbox();
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
})();
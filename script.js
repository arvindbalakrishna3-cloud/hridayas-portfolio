// MOBILE MENU TOGGLE
const hamburger = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');
const navLinks = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// SLIDER LOGIC
function moveSlide(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    const cardWidth = slider.querySelector('.card').offsetWidth + 30; // Card width + Gap
    
    // Calculate new position
    const currentScroll = slider.scrollLeft;
    slider.scrollTo({ 
        left: currentScroll + (direction * cardWidth), 
        behavior: 'smooth' 
    });
}

// GALLERY SLIDER LOGIC (For Desktop)
function moveGallerySlide(direction) {
    const gallery = document.getElementById('gallery-slider');
    // Only applies if gallery is in flex mode (mobile view, but buttons might be visible on tablet)
    const imgWidth = gallery.querySelector('img').offsetWidth + 16; 
    const currentScroll = gallery.scrollLeft;
    gallery.scrollTo({ 
        left: currentScroll + (direction * imgWidth), 
        behavior: 'smooth' 
    });
}

// SCROLL ANIMATION (Fade in sections)
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

// Animate individual cards on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0) scale(1)";
            }, index * 100); 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px) scale(0.9)";
    card.style.transition = "0.8s cubic-bezier(0.25, 1, 0.5, 1)";
    cardObserver.observe(card);
});

// MOBILE HOVER FIX FOR CARDS
document.querySelectorAll('.slide').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.add('hover');
    }, {passive: true});
    
    card.addEventListener('touchend', () => {
        setTimeout(() => card.classList.remove('hover'), 200); 
    }, {passive: true});
});

// KEYBOARD SUPPORT FOR SLIDERS
document.addEventListener('keydown', (e) => {
    const sliders = document.querySelectorAll('.slider-container');
    sliders.forEach(slider => {
        const rect = slider.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (inViewport) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                moveSlide(slider.id, -1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                moveSlide(slider.id, 1);
            }
        }
    });
});

// GALLERY LIGHTBOX
(() => {
    const galleryImgs = document.querySelectorAll('.gallery-container img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!galleryImgs.length || !lightbox) return;

    function openLightbox(img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxCaption.textContent = '';
        }, 300); // Wait for transition
        document.body.style.overflow = '';
    }

    galleryImgs.forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxCaption) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
})();
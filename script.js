// 1. MOBILE MENU TOGGLE
const hamburger = document.getElementById('hamburger-menu');
const menu = document.getElementById('menu');
const navLinks = document.querySelectorAll('.nav-links li a');

if(hamburger && menu) {
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active'); 
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// 2. FLOWY SCROLL ANIMATION 
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

// Include gallery items in the scroll animation
document.querySelectorAll('section, .gallery-item').forEach(s => {
    s.style.opacity = "0";
    s.style.transform = "translateY(30px)"; 
    s.style.transition = "1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    observer.observe(s);
});

// 3. INFINITE MARQUEE CLONER (Only runs if track exists on page)
const marqueeTrack = document.getElementById('marquee-track');
if (marqueeTrack) {
    const marqueeContent = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML += marqueeContent; // Clone content for infinite loop
}

// 4. GLOBAL LIGHTBOX
(() => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    if (!lightbox) return;

    function openLightbox(imgElement) {
        lightboxImg.src = imgElement.src;
        lightboxImg.alt = imgElement.alt;
        lightboxCaption.textContent = imgElement.alt;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; 
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxCaption.textContent = '';
        }, 300); 
        document.body.style.overflow = '';
    }

    // Global click listener for ANY dynamically added image
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-trigger')) {
            openLightbox(e.target);
        }
        else if (e.target === lightbox || e.target === lightboxCaption || e.target === closeBtn) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });
})();

// 5. MOBILE HOVER FIX
document.querySelectorAll('.slide, .marquee-item, .gallery-item').forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.add('hover');
    }, {passive: true});
    
    card.addEventListener('touchend', () => {
        setTimeout(() => card.classList.remove('hover'), 300); 
    }, {passive: true});
});
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
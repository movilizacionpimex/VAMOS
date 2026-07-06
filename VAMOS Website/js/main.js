// --- Tailwind Config (Fallback) ---
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    "primary": "#00599a",
                    "navy-deep": "#002d51",
                    "accent-orange": "#ff8b2c",
                    "background-light": "#ffffff",
                    "background-alt": "#f8fafc",
                    "text-main": "#1e293b",
                },
                fontFamily: { "display": ["Epilogue", "sans-serif"] },
                borderRadius: { "DEFAULT": "0.5rem", "lg": "1rem", "xl": "1.5rem", "2xl": "2rem", "full": "9999px" },
            },
        },
    };
}

// --- Global DOM Utilities ---
const updateYear = () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
};

const setupRevealObserver = () => {
    const observerOptions = { threshold: 0, rootMargin: '0px 0px -20px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // For reveal elements that also have a counter
                const counter = entry.target.querySelector('[data-counter]');
                if (counter && !counter.dataset.counted) {
                    counter.dataset.counted = 'true';
                    animateCounter(counter);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

const setupMobileMenu = () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }
};

// --- Animated Counters ---
function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    if (isNaN(target)) return;
    const suffix = el.dataset.suffix || '';
    const isFloat = target % 1 !== 0;
    const duration = 1800;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const timer = setInterval(() => {
        frame++;
        const progress = easeOut(frame / totalFrames);
        const current = target * progress;

        if (isFloat) el.textContent = current.toFixed(1) + suffix;
        else if (target >= 1000) el.textContent = Math.floor(current).toLocaleString() + suffix;
        else el.textContent = Math.floor(current) + suffix;

        if (frame === totalFrames) {
            clearInterval(timer);
            if (isFloat) el.textContent = target + suffix;
            else if (target >= 1000) el.textContent = target.toLocaleString() + suffix;
            else el.textContent = target + suffix;
        }
    }, frameDuration);
}

// --- Resources Filtering ---
const setupFiltering = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceCards = document.querySelectorAll('.resource-card');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Toggle active state for buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-navy-deep', 'text-white', 'shadow-md', 'font-black');
                btn.classList.add('bg-slate-50', 'text-slate-500', 'font-bold', 'border', 'border-slate-200');
            });
            button.classList.add('bg-navy-deep', 'text-white', 'shadow-md', 'font-black');
            button.classList.remove('bg-slate-50', 'text-slate-500', 'font-bold', 'border', 'border-slate-200');

            // Filter cards
            resourceCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => card.classList.add('active'), 10);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('active');
                }
            });
        });
    });
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    updateYear();
    setupRevealObserver();
    setupMobileMenu();
    setupFiltering();
    
    // --- Global Scroll Offset Fix for Sticky Header ---
    const scrollOffset = 150; // Pixels to leave above the section title

    // 1. Handle clicks on internal links
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const [path, hash] = href.split('#');
            
            // If it's an internal link on the same page
            if (hash && (path === "" || path === window.location.pathname.split('/').pop())) {
                const target = document.getElementById(hash);
                if (target) {
                    e.preventDefault();
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - scrollOffset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    // Update URL without jump
                    history.pushState(null, null, '#' + hash);
                }
            }
        });
    });

    // 2. Handle landing on a hash from another page
    if (window.location.hash) {
        // Use a small timeout to allow for layout shifts and avoid browser's default jump
        setTimeout(() => {
            const target = document.getElementById(window.location.hash.substring(1));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - scrollOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 150);
    }
    
    // Separate counter observer...
    const counterOnlyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted && !entry.target.closest('.reveal')) {
                entry.target.dataset.counted = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-counter]').forEach(el => counterOnlyObserver.observe(el));

    // ============ 3D Coverflow Carousel ============
    const coverflowTrack = document.getElementById('coverflow-track');
    if (coverflowTrack) {
        const cards = coverflowTrack.querySelectorAll('.coverflow-card');
        const dots = document.querySelectorAll('.coverflow-dot');
        const prevBtn = document.getElementById('coverflow-prev');
        const nextBtn = document.getElementById('coverflow-next');
        const totalCards = cards.length;
        let currentIndex = 0;

        function updateCoverflow(index) {
            currentIndex = index;
            const isMobile = window.innerWidth < 768;

            cards.forEach((card, i) => {
                const offset = i - currentIndex;
                let tx, ry, tz, scale, opacity, zIndex;

                if (offset === 0) {
                    // Center card — full size, no rotation
                    tx = 0;
                    ry = 0;
                    tz = 0;
                    scale = 1;
                    opacity = 1;
                    zIndex = 10;
                    card.classList.add('active');
                } else {
                    // Side cards — smaller, rotated, pushed back
                    const direction = offset > 0 ? 1 : -1;
                    const absOffset = Math.abs(offset);
                    tx = direction * (isMobile ? 55 : 42) * absOffset;
                    ry = -direction * 45;
                    tz = -180 * absOffset;
                    scale = Math.max(0.55, 1 - absOffset * 0.3);
                    opacity = absOffset === 1 ? 0.65 : 0.35;
                    zIndex = 10 - absOffset;
                    card.classList.remove('active');
                }

                card.style.transform = `translateX(${tx}%) rotateY(${ry}deg) translateZ(${tz}px) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.zIndex = zIndex;
                card.style.filter = 'none';
            });

            // Update dots
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.remove('bg-primary/30');
                    dot.classList.add('bg-primary', 'scale-125');
                } else {
                    dot.classList.add('bg-primary/30');
                    dot.classList.remove('bg-primary', 'scale-125');
                }
            });
        }

        // Arrow buttons
        prevBtn.addEventListener('click', () => {
            updateCoverflow((currentIndex - 1 + totalCards) % totalCards);
        });
        nextBtn.addEventListener('click', () => {
            updateCoverflow((currentIndex + 1) % totalCards);
        });

        // Click on card to focus
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.index);
                if (idx !== currentIndex) updateCoverflow(idx);
            });
        });

        // Click on dot to go
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                updateCoverflow(parseInt(dot.dataset.index));
            });
        });

        // Touch / Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        coverflowTrack.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        coverflowTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) updateCoverflow((currentIndex + 1) % totalCards);
                else updateCoverflow((currentIndex - 1 + totalCards) % totalCards);
            }
        }, { passive: true });

        // Keyboard support
        document.addEventListener('keydown', e => {
            const albumRect = document.getElementById('team-album').getBoundingClientRect();
            const inView = albumRect.top < window.innerHeight && albumRect.bottom > 0;
            if (!inView) return;
            if (e.key === 'ArrowLeft') updateCoverflow((currentIndex - 1 + totalCards) % totalCards);
            if (e.key === 'ArrowRight') updateCoverflow((currentIndex + 1) % totalCards);
        });

        // Auto-rotate every 5 seconds
        let autoplay = setInterval(() => {
            updateCoverflow((currentIndex + 1) % totalCards);
        }, 5000);

        // Pause autoplay on hover
        coverflowTrack.addEventListener('mouseenter', () => clearInterval(autoplay));
        coverflowTrack.addEventListener('mouseleave', () => {
            autoplay = setInterval(() => {
                updateCoverflow((currentIndex + 1) % totalCards);
            }, 5000);
        });

        // Initial render
        updateCoverflow(0);
        window.addEventListener('resize', () => updateCoverflow(currentIndex));
    }
});
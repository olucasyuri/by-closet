// ===================================
// BY Closet - JavaScript
// ===================================

// ===================================
// MOBILE MENU TOGGLE
// ===================================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check on page load

// ===================================
// HERO CAROUSEL — bolinhas + imagens sincronizadas
// ===================================
(function () {
    const slides     = document.querySelectorAll('.hero-slide');
    const dotsWrap   = document.getElementById('carouselDots');
    if (!slides.length || !dotsWrap) return;

    let current      = 0;
    let autoplayTimer = null;

    // Gera uma bolinha por imagem
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => irParaSlide(i));
        dotsWrap.appendChild(dot);
    });

    function irParaSlide(index) {
        const dots = dotsWrap.querySelectorAll('.dot');
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = index;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function avancar() {
        irParaSlide((current + 1) % slides.length);
    }

    function iniciarAutoplay() {
        autoplayTimer = setInterval(avancar, 4000);
    }

    // Pausa ao passar o mouse, retoma ao sair
    const container = document.querySelector('.hero-image-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
        container.addEventListener('mouseleave', iniciarAutoplay);
    }

    iniciarAutoplay();
})();

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Hide header on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});



// ===================================
// LOADING ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c BY Closet ', 'background: #d4a5a5; color: white; font-size: 20px; padding: 10px;');
console.log('Website desenvolvido com elegância ✨');

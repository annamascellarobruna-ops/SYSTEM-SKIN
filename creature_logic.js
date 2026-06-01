let lastScrollTop = 0;
const body = document.body;
let glitchTimeout;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === lastScrollTop) {
        return;
    }

    body.classList.add('glitch-active');
    clearTimeout(glitchTimeout);

    glitchTimeout = setTimeout(() => {
        body.classList.remove('glitch-active');
    }, 150);

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const TOTAL_IMAGES = 23;

    // ---------------- Image injection ----------------
    for (let i = 1; i <= TOTAL_IMAGES; i++) {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `<img src="assets/images/to_remain_unseen/persone/${i}.jpg" alt="Scene ${i}" class="deconstructed-image">`;
        galleryContainer.appendChild(item);
    }

    const images = document.querySelectorAll('.deconstructed-image');
    const parallaxTexts = document.querySelectorAll('.parallax-text-container');

    // ---------------- Scroll & parallax ----------------
    let lastScrollY = window.scrollY;
    let targetGlitchFactor = 0;
    let currentGlitchFactor = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const distance = Math.abs(currentScrollY - lastScrollY);

        targetGlitchFactor = distance > 12 ? Math.min(distance / 40, 2.0) : 0;

        const yPos = -(currentScrollY * 0.2);
        parallaxTexts.forEach(textContainer => {
            textContainer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // ---------------- Glitch decay ----------------
    let lastGlitchUpdate = 0;
    const GLITCH_INTERVAL = 1000 / 12;

    function applyImageGlitch(img, factor) {
        if (factor > 0) {
            img.style.imageRendering = 'pixelated';
            img.style.filter = `blur(${Math.min(factor * 25, 30)}px) contrast(${100 + factor * 250}%)`;
            img.style.opacity = Math.max(1 - factor, 0);
        } else {
            img.style.imageRendering = '';
            img.style.filter = '';
            img.style.opacity = '';
        }
    }

    function updateDecay(timestamp) {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY) < 1) {
            targetGlitchFactor = 0;
        }
        lastScrollY = currentScrollY;

        currentGlitchFactor += (targetGlitchFactor - currentGlitchFactor) * 0.18;
        if (currentGlitchFactor < 0.01) currentGlitchFactor = 0;

        const elapsed = timestamp - lastGlitchUpdate;

        if (elapsed > GLITCH_INTERVAL) {
            lastGlitchUpdate = timestamp - (elapsed % GLITCH_INTERVAL);

            const steppedFactor = currentGlitchFactor > 0
                ? Math.floor(currentGlitchFactor * 5) / 5 + (Math.random() * 0.15 - 0.07)
                : 0;

            images.forEach(img => applyImageGlitch(img, steppedFactor));
        }

        requestAnimationFrame(updateDecay);
    }

    requestAnimationFrame(updateDecay);
});

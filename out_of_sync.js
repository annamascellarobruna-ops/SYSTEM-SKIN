document.addEventListener('DOMContentLoaded', () => {

    // ---------------- Content data ----------------
    const verticalData = [
        { id: 1, text: "Iris Schieferstein.<br>Horse Shoes 2006." },
        { id: 2, text: "Carol Christian Poell.<br>Mutant Shearling Gloves, AW 2004." },
        { id: 3, text: "Shaune Leane for Alexander McQueen.<br>Spine Corset SS 1998." },
        { id: 4, text: "Helmut Lang.<br>Horsehair Earrings 2004." },
        { id: 10, text: "Jolan van der Wiel for Iris Van Herpen.<br>Spike Shoes SS 2015." }
    ];

    const horizontalData = [
        { id: 5, text: "Carol Christian Poell.<br>Object Dyed One Piece Drip Prosthetic Boot 2006." },
        { id: 6, text: "Rick Owens.<br>Minimal Grill Beatle Pre-Fall 2024." },
        { id: 7, text: "Shaune Leane for Alexander McQueen.<br>Porcupine Quill Earring SS 2003." },
        { id: 8, text: "Shaune Leane for Alexander McQueen.<br>Male-Jaw Piece SS 1998." },
        { id: 9, text: "Alexander McQueen.<br>Armadillo Shoes SS 2010." }
    ];

    const fixedCredits = [
        '<div class="sync-credit-content">Photographer: <span>Aura Yeh</span><br>Stylist: <span>Aurora Munaro</span></div>',
        '<div class="sync-credit-content">Editing: <span>Davide Saleri</span><br>Platform: <span>SYSTEM/SKIN</span></div>'
    ];

    const vCells = document.querySelectorAll('.sync-grid-cell[data-format="vertical"]');
    const hAndCreditCells = document.querySelectorAll('.sync-grid-cell[data-format="horizontal"], .sync-grid-cell[data-format="credit"]');
    const titleOverlay = document.getElementById('sync-dynamic-header');
    const glitchTitle = document.getElementById('sync-glitch-title');
    const imageOverlay = document.getElementById('sync-glitch-images');
    const allPhotoData = [...verticalData, ...horizontalData];
    const verticalIds = new Set(verticalData.map(item => item.id));

    // ---------------- Shuffle ----------------
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function buildCellHTML(photoObj) {
        return `
            <div class="sync-image-back-credit">${photoObj.text}</div>
            <img src="assets/images/out_of_sync/${photoObj.id}.jpg" alt="Sabotage Art ${photoObj.id}" class="sync-deconstructed-image">
        `;
    }

    // ---------------- Gallery render ----------------
    function renderGallery() {
        const currentVerticals = shuffleArray(verticalData);
        const currentHorizontalsPool = shuffleArray([
            ...horizontalData.map(buildCellHTML),
            ...fixedCredits
        ]);

        vCells.forEach((cell, index) => {
            if (currentVerticals[index]) {
                cell.innerHTML = buildCellHTML(currentVerticals[index]);
            }
        });

        hAndCreditCells.forEach((cell, index) => {
            if (currentHorizontalsPool[index]) {
                cell.innerHTML = currentHorizontalsPool[index];
            }
        });
    }

    renderGallery();

    // ---------------- Scroll & glitch engine ----------------
    let lastScrollY = window.scrollY;
    let scrollAccumulator = 0;
    let glitchActiveState = false;
    let scrollTimeout = null;

    const ROTATION_THRESHOLD = 350;

    function clearGlitchClasses() {
        document.querySelectorAll('.sync-deconstructed-image').forEach(img => {
            img.classList.remove('glitch-invert', 'glitch-distort');
        });
    }

    function randomizeTitlePosition() {
        glitchTitle.style.left = `${Math.floor(Math.random() * 60) + 20}%`;
        glitchTitle.style.top = `${Math.floor(Math.random() * 60) + 20}%`;
    }

    function spawnGlitchImages() {
        imageOverlay.innerHTML = '';
        const count = Math.floor(Math.random() * 2) + 1;
        const shuffled = shuffleArray(allPhotoData);

        for (let i = 0; i < count && i < shuffled.length; i++) {
            const photo = shuffled[i];
            const isVertical = verticalIds.has(photo.id);
            const isBig = Math.random() < 0.45;
            const img = document.createElement('img');
            img.src = `assets/images/out_of_sync/${photo.id}.jpg`;
            img.alt = `Sabotage Art ${photo.id}`;
            img.className = `sync-glitch-float-image ${isVertical ? 'format-v' : 'format-h'}${isBig ? ' size-big' : ''}`;
            img.style.left = `${Math.floor(Math.random() * (isBig ? 80 : 70)) + (isBig ? 10 : 15)}%`;
            img.style.top = `${Math.floor(Math.random() * (isBig ? 80 : 70)) + (isBig ? 10 : 15)}%`;
            imageOverlay.appendChild(img);
        }
    }

    window.addEventListener('scroll', () => {
        document.body.classList.add('is-scrolling');

        const currentScrollY = window.scrollY;
        const delta = Math.abs(currentScrollY - lastScrollY);
        scrollAccumulator += delta;

        if (delta > 8 && !glitchActiveState && Math.random() < 0.05) {
            glitchActiveState = true;

            randomizeTitlePosition();
            titleOverlay.style.opacity = '1';
            spawnGlitchImages();
            imageOverlay.style.opacity = '1';

            const allImages = document.querySelectorAll('.sync-deconstructed-image');
            allImages.forEach(img => {
                const randomType = Math.random();
                if (randomType < 0.25) {
                    img.classList.add('glitch-invert');
                } else if (randomType < 0.50) {
                    img.classList.add('glitch-distort');
                }
            });

            setTimeout(() => {
                titleOverlay.style.opacity = '0';
                imageOverlay.style.opacity = '0';
                clearGlitchClasses();
                setTimeout(() => {
                    imageOverlay.innerHTML = '';
                    glitchActiveState = false;
                }, 400);
            }, 600);
        }

        if (scrollAccumulator >= ROTATION_THRESHOLD) {
            renderGallery();
            scrollAccumulator = 0;
        }

        lastScrollY = currentScrollY;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('is-scrolling');
            clearGlitchClasses();
        }, 100);
    });
});

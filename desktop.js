const clock = document.getElementById("clock");
const dateElement = document.getElementById("date");
const batteryElement = document.getElementById("battery");

// --- SYSTEM BASE (CLOCK, DATE, BATTERY) ---
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
    const date = now.toLocaleDateString();

    if (clock) clock.textContent = time;
    if (dateElement) dateElement.textContent = date;
}
updateTime();
setInterval(updateTime, 1000);

function updateBatterySimulation() {
    if (!batteryElement) return;
    let level = Math.floor(Math.random() * (95 - 10 + 1)) + 10;
    let isCharging = Math.random() > 0.5;

    function refreshBatteryUI() {
        batteryElement.textContent = `${level}%`;
    }

    refreshBatteryUI();

    setInterval(() => {
        if (isCharging) {
            if (level < 100) level++;
            if (level === 100) isCharging = false;
        } else {
            if (level > 0) level--;
        }
        refreshBatteryUI();
    }, 15000);
}
updateBatterySimulation();

// --- WINDOW MANAGEMENT (Z-INDEX & DRAG) ---
let highestZIndex = 100;

function bringToFront(windowElement) {
    highestZIndex++;
    windowElement.style.zIndex = highestZIndex;
}

function makeWindowDraggable(windowElement, headerElement) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    windowElement.addEventListener("mousedown", () => {
        bringToFront(windowElement);
    });

    headerElement.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - windowElement.offsetLeft;
        offsetY = event.clientY - windowElement.offsetTop;
        bringToFront(windowElement);
    });

    document.addEventListener("mousemove", (event) => {
        if (!isDragging) return;
        windowElement.style.left = `${event.clientX - offsetX}px`;
        windowElement.style.top = `${event.clientY - offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

// --- HIGHLIGHTED TEXTS ---
const glitchTexts = [
    "form of resistance and rebellion",
    "creative sabotage that make images non-repeatable and unique",
    "is everything we see truly real?",
    "hyper-visibility",
    "act of resistance against the tyranny of replication"
];

// --- MINI WARNINGS ---
function createMiniWindow(content) {
    const miniWin = document.createElement('div');
    miniWin.className = 'warning-window mini-warning';
    
    // Posiciones aleatorias en el viewport de la pantalla
    const randomTop = Math.floor(Math.random() * 45) + 15;  
    const randomLeft = Math.floor(Math.random() * 50) + 15; 
    
    miniWin.style.top = `${randomTop}%`;
    miniWin.style.left = `${randomLeft}%`;


    miniWin.innerHTML = `
        <div class="window-header mini-header">
            <span class="warning-title">⚠️ SYSTEM ALERT</span>
            <button class="close-mini-warning">OK</button>
        </div>
        <div class="window-content mini-content">
            <p><strong>"${content}"</strong></p>
        </div>
    `;

    document.body.appendChild(miniWin);


    const miniHeader = miniWin.querySelector('.mini-header');
    const closeBtn = miniWin.querySelector('.close-mini-warning');

    
    bringToFront(miniWin);
    makeWindowDraggable(miniWin, miniHeader);

    // Individual closing event
    closeBtn.addEventListener('click', () => {
        miniWin.remove();
    });
}

// --- DISPARADOR EN CASCADA ---
function triggerMiniWarnings() {
    glitchTexts.forEach((text, index) => {
        
        setTimeout(() => {
            createMiniWindow(text);
        }, index * 150); 
    });
}

// --- WARNING WINDOW LOGIC ---
const warningWindow = document.getElementById("warning-window");
const closeWarning = document.getElementById("close-warning");
const warningHeader = document.getElementById("warning-header");

if (warningWindow && warningHeader && closeWarning) {
    // After 3 sec
    setTimeout(() => {
        warningWindow.classList.remove("hidden");
        bringToFront(warningWindow);
        
        //mini windows
        triggerMiniWarnings();
    }, 3000);

    closeWarning.addEventListener("click", () => {
        warningWindow.classList.add("hidden");
    });

    makeWindowDraggable(warningWindow, warningHeader);
}

// --- APP OPENING ---
const desktopIcons = document.querySelectorAll(".desktop-icon");

desktopIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        const targetPage = icon.getAttribute("data-target");
        if (targetPage) {
            window.location.href = targetPage;
        }
    });
});
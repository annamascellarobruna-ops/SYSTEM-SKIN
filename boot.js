const bootText = `
SYSTEM/SKIN Firmware Build 0x000A

Visual reproduction engine detected.
Counter-measures initiated.

Scanning identities ........ COMPLETE
Authenticity level ......... UNKNOWN
Image decay ................ ACTIVE

Resolution collapse : ENABLED
Glitch injection    : ENABLED
Replication control : FAILED

The image refuses permanence.
The pixel refuses obedience.

Nothing remains flawless.
Nothing remains fixed.

C:\> sabotage.exe

Opening unstable archive ...

ENTERING SYSTEM/SKIN
`;

const textElement = document.getElementById("boot-text");

let index = 0;



function typeText() {

    if (index >= bootText.length) {

        setTimeout(() => {

            window.location.href = "login.html";

        }, 600);

        return;
    }



    /* SMALL RANDOM BURSTS */

    const burst = Math.floor(Math.random() * 6) + 2;

    textElement.textContent += bootText.slice(index, index + burst);

    index += burst;



    /* FAST BUT IRREGULAR */

    let delay;

    if (Math.random() < 0.12) {

        /* tiny lag spikes */
        delay = 60 + Math.random() * 120;

    } else {

        /* very fast typing */
        delay = 5 + Math.random() * 18;
    }



    setTimeout(typeText, delay);
}

typeText();
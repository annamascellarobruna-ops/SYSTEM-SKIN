const passwordInput = document.getElementById("password-input");

const enterButton = document.getElementById("enter-button");



function enterDesktop() {

    const password = passwordInput.value;



    if (password.trim() !== "") {

        window.location.href = "desktop.html";
    }
}



/* BUTTON CLICK */

enterButton.addEventListener("click", enterDesktop);



/* ENTER KEY */

passwordInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        enterDesktop();
    }
});
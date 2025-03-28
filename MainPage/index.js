const databaseOptions = document.querySelectorAll(".databaseOption");
const passwordBox = document.querySelector(".passwordBox");
const passwordButton = document.getElementById("submitPassword");
const passwordText = document.getElementById("passwordField");

databaseOptions.forEach(databaseOption => {

    databaseOption.addEventListener('click', () => {

        passwordBox.style.display = "block";
         
    })
});

passwordButton.addEventListener('click', () => {

    if (passwordText.value == "teste"){
        window.location.pathname = "GuessIt_front/Game/game.html";
    }
});
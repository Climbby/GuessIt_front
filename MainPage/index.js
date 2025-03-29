// import { verifyDatabase } from 'firebase.js'
import { fetchUsers } from '../Game/js/api.js'

const databaseList = document.querySelector(".databaseOptions");
const passwordBox = document.querySelector(".passwordBox");
const passwordButton = document.getElementById("submitPassword");
const passwordText = document.getElementById("passwordField");
let databaseOptions;

function redirectUser(table, hasPassword){

    if(hasPassword){
        passwordButton.addEventListener('click', () => {
            if (passwordText.value == "teste"){
                localStorage.setItem("tableName", table);
                window.location.pathname = "GuessIt_front/Game/game.html";    
            };
        });
    } else {
        localStorage.setItem("tableName", table);
        window.location.pathname = "GuessIt_front/Game/game.html";    
    }

}

fetchUsers("databases").then(data => {

    data.forEach(database => {
        const databaseOption = document.createElement('div');
        databaseOption.classList.add(database.name);
        databaseOption.classList.add("databaseOption");
        databaseOption.textContent = database.name;
        databaseList.appendChild(databaseOption);
    });

    databaseOptions = databaseList.querySelectorAll(".databaseOption");
    databaseOptions.forEach(option => {
        option.addEventListener('click', () => {

            data.forEach(database => {
                if ((database.name === option.textContent)){
                    if(database.password === null) redirectUser(database.name, false);  
                    else{
                        passwordBox.style.display = "block";
                        redirectUser(database.name, true);
                    }      
                }
            })
        });
    });
});
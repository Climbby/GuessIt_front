import { setColorHidden, setItems, getDropdownItems, getItemContent, getClipboard, getAttempts } from './globals.js'
import { button, inputText, closeButton, colorInfo, settingsButton, changelogButton, infoButton, 
        settingsContent, changelogContent, infoContent } from './domElements.js'
import { handleSelection } from './funcs.js'
import { gameLogic } from '../gameLogic.js'

export function initAutoComplete(users, randomUser) {  

    const dropdown = document.querySelector('#dropdown'); 

    inputText.addEventListener("input", () => {
        const input = inputText.value.toLowerCase();
        const userNames = users.map(user => user.username);
        let filtered = userNames.filter(option => option.toLowerCase().startsWith(input));
        if (input === "*") filtered = userNames
        dropdown.innerHTML = "";

        if (input === "") {
            dropdown.style.display = "none";
            return;
        }

        if (filtered.length > 0) {
            filtered.forEach(option => {
                const item = document.createElement("div");
                item.textContent = option;

                item.onclick = () => {
                    inputText.value = option;
                    gameLogic(users, randomUser);  
                    dropdown.style.display = "none";
                };
                dropdown.appendChild(item);
            });
            dropdown.style.display = "block";
            setItems(dropdown);
            handleSelection(0);
        } 
        else {
            dropdown.style.display = "none";
        }
    });

    document.addEventListener("click", e => {
        if (e.target !== inputText) {
            dropdown.style.display = "none";
        }
        if (e.target == inputText && inputText.value !== "") {
            dropdown.style.display = "block";
        }
    });
}

export function submitAnswer(users, randomUser){
    button.addEventListener('click', () => {gameLogic(users, randomUser)});
}

export function settingsButtons(){
    settingsButton.addEventListener('click', () => {
        if (settingsContent.style.display != "block") {
            settingsContent.style.display = 'block';
        } else {
            settingsContent.style.display = 'none';
        }
    })

    changelogButton.addEventListener('click', () => {
        if (changelogContent.style.display != "block") {
            changelogContent.style.display = 'block';
        } else {
            changelogContent.style.display = 'none';
        }
    })

    infoButton.addEventListener('click', () => {
        if (infoContent.style.display != "block") {
            infoContent.style.display = 'block';
        } else {
            infoContent.style.display = 'none';
        }
    })
}

export function inputTextSelection(users, randomUser){

    let selectedIndex = 0;

    inputText.addEventListener('keydown', event => {

        let dropdownItems = getDropdownItems();

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (selectedIndex < dropdownItems.length - 1) {
                    selectedIndex++;
                    handleSelection(selectedIndex);
                }        
                break;

            case 'ArrowUp':
                event.preventDefault();
                if (selectedIndex > 0) {
                    selectedIndex--;
                    handleSelection(selectedIndex);
                }      
                break;
              
            case 'Enter':
                inputText.value = getItemContent(selectedIndex);
                dropdown.style.display = "none";
                gameLogic(users, randomUser);   
                break;
          }
    });
}

export function closeColors(){

    closeButton.addEventListener('click', () => {
        setColorHidden();
        colorInfo.style.display = "none";
    });
}

export function clipboardClick(editionNumber){

    const clipboardButton = document.getElementById("clipboardButton");
    clipboardButton.addEventListener('click', () => {getClipboard(getAttempts(), editionNumber)});
}

import { button, inputText } from '../domElements.js'
import { handleSelection } from './funcs.js'
import { gameLogic } from './gameLogic.js'

let dropdownItems;

export function initAutoComplete(users, randomUser) {  

  const dropdown = document.querySelector('#dropdown');

  inputText.addEventListener("input", () => {
    const input = inputText.value.toLowerCase();
    const userNames = users.map(user => user.nome);
    const filtered = userNames.filter(option => option.toLowerCase().includes(input));
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
      dropdownItems = dropdown.querySelectorAll('div');
      handleSelection(0, dropdownItems);
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

export function inputTextSelection(users, randomUser){

  let selectedIndex = 0;

  inputText.addEventListener('keydown', event => {
  
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (selectedIndex < dropdownItems.length - 1) {
          selectedIndex++;
          handleSelection(selectedIndex, dropdownItems);
        }        
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (selectedIndex > 0) {
          selectedIndex--;
          handleSelection(selectedIndex, dropdownItems);
        }      
        break;
        
      case 'Enter':
        inputText.value = dropdownItems[selectedIndex].textContent;
        dropdown.style.display = "none";
        gameLogic(users, randomUser);   
        break;
      }
    });
}
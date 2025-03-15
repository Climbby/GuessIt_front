import { button, answersContainer, inputText } from '../domElements.js'
import { autoShrinkText, arraysEqual } from './funcs.js';

export function initAutocomplete(users) {  
    const userNames = users.map(user => user.nome);
    const searchBox = document.querySelector('#myInput');
    const dropdown = document.querySelector('#dropdown');
    let filtered;
  
    searchBox.addEventListener("input", () => {
      const input = searchBox.value.toLowerCase();
      dropdown.innerHTML = "";
      if (input === "") {
        dropdown.style.display = "none";
        return;
      }
  
      filtered = userNames.filter(option => option.toLowerCase().includes(input));

      if (filtered.length > 0) {
        filtered.forEach(option => {
          const item = document.createElement("div");
          item.textContent = option;
          item.onclick = () => {
            searchBox.value = option;
            dropdown.style.display = "none";
          };
          dropdown.appendChild(item);
        });
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "none";
      }
    });
  
    document.addEventListener("click", (e) => {
      if (e.target !== searchBox) {
        dropdown.style.display = "none";
      }
      if (e.target == searchBox && searchBox.value !== "") {
        dropdown.style.display = "block";
      }
    });
}

export function submitAnswer(users, randomUser, numCharacteristicas){

    button.addEventListener('click', () => {
      users.forEach(person => {
        if (person.nome.toUpperCase() === inputText.value.toUpperCase()) { // if name is valid
          const newAnswer = document.createElement('div');
          newAnswer.classList.add('newAnswer');
  
          for (let i = 0; i < numCharacteristicas; i++) {
            const personVal = Object.values(person)[i];
            const randomVal = Object.values(randomUser)[i];
            const newCharacteristic = document.createElement('div');
            newCharacteristic.classList.add('newCharacteristic');
            newCharacteristic.textContent = personVal;
  
            // Special logic for vibe
            if (personVal === person.vibe) {
              newCharacteristic.textContent = personVal.join(', ');
              personVal.forEach(caracteri => {
                if (randomVal.includes(caracteri)) {
                  newCharacteristic.classList.add('contem');
                }
              });
  
              if (arraysEqual(personVal, randomVal)) {
                newCharacteristic.classList.remove('contem');
                newCharacteristic.classList.add('certo');
              }
            }
  
            // Altura logic
            if (personVal === person.altura) {
              if (personVal > randomVal) {
                newCharacteristic.textContent = personVal + ' ↓';
              } else if (personVal < randomVal) {
                newCharacteristic.textContent = personVal + ' ↑';
              }
            }
  
            if (personVal === randomVal) {
              newCharacteristic.classList.add('certo');
            }
  
            newAnswer.appendChild(newCharacteristic);
          }
  
          answersContainer.appendChild(newAnswer);
          autoShrinkText('.newAnswer', '.newCharacteristic');
        }
      });
  
      if (inputText.value.toUpperCase() === randomUser.nome.toUpperCase()) {
        const winner = document.createElement('p');
        winner.classList.add('ganhador');
        winner.textContent = `GANHASTE!! Era o ${randomUser.nome}`;
        answersContainer.appendChild(winner);
      }
  
      inputText.value = "";
    });
}
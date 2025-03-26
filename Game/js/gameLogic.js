import { answersContainer, inputText, answersLabel, inputContainer, winnerContainer, winnerText, colorInfo } from './utils/domElements.js'
import { autoShrinkText, arraysEqual } from './utils/utils.js';
import { isColorHidden } from './utils/globals.js'

export function gameLogic(users, randomUser){

    const numCharacteristicas = Object.values(users[0]).length;
  
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
  
          if (personVal === person.id) continue;
          if (personVal === person.vibe) caseVibe(newCharacteristic, personVal, randomVal);
          if (personVal === person.altura) caseAltura(newCharacteristic, personVal, randomVal);
          if (personVal === randomVal) newCharacteristic.classList.add('certo');
  
          newAnswer.appendChild(newCharacteristic);
        }
  
        // Update users array by removing the last user analyzed
        const index = users.indexOf(person);
        users.splice(index, 1);
  
        // Add row of characteristics
        answersContainer.appendChild(newAnswer);
        autoShrinkText('.newAnswer', '.newCharacteristic');
      }
    });
  
    isCorrect(inputText, randomUser);

    // Reset inputText box text
    inputText.value = ""; 
    answersLabel.style.display = "flex";
    if (!isColorHidden()) colorInfo.style.display = "flex";
}

function caseVibe(newCharacteristic, personVal, randomVal){
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

function caseAltura(newCharacteristic, personVal, randomVal){
    if (personVal > randomVal) {
        newCharacteristic.textContent = personVal + ' ↓';
    } else if (personVal < randomVal) {
        newCharacteristic.textContent = personVal + ' ↑';
    }
}

function isCorrect(inputText, randomUser){
    if (inputText.value.toUpperCase() === randomUser.nome.toUpperCase()) {
        winnerContainer.style.display = "block";
        winnerText.textContent = `GANHASTE\nResposta: ${randomUser.nome}`;
        inputContainer.style.display = "none";
    }
}
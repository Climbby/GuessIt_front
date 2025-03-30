import { answersContainer, inputText, answersLabel, inputContainer, winnerContainer, winnerText, colorInfo, timeoutText } from './utils/domElements.js'
import { isColorHidden, addToClipboard, incrementAttempts } from './utils/globals.js'
import { autoShrinkText, arraysEqual } from './utils/utils.js'
import { dailyTimeout } from './utils/funcs.js'
import { clipboardClick } from './utils/events.js'

export function gameLogic(users, randomUser){

    if (dailyTimeout()){
      timeoutText.style.display = "block"; 
      timeoutText.textContent = "You've already played today! Come back tomorrow.";  
      return;
    }
    const numCharacteristicas = Object.values(users[0]).length;

    users.forEach(person => {
      if (person.username.toUpperCase() === inputText.value.toUpperCase()) { // if name is valid
        const newAnswer = document.createElement('div');
        newAnswer.classList.add('newAnswer');
        let answerText = "";
  
        for (let i = 0; i < numCharacteristicas; i++) {
          const personVal = Object.values(person)[i];
          const randomVal = Object.values(randomUser)[i];
          const newCharacteristic = document.createElement('div');
          newCharacteristic.classList.add('newCharacteristic');
          newCharacteristic.textContent = personVal;
  
          if (personVal === person.id) continue;
          // if (personVal === person.vibe) caseVibe(newCharacteristic, personVal, randomVal);
          // if (personVal === person.altura) caseAltura(newCharacteristic, personVal, randomVal);
          

          if (personVal === randomVal){
            newCharacteristic.classList.add('certo');
            answerText += "🟩";
          } else{
            answerText += "🟥";
          }
          newAnswer.appendChild(newCharacteristic);
        }
  
        // Update users array by removing the last user analyzed
        const index = users.indexOf(person);
        users.splice(index, 1);
        answerText = "\n" + answerText;
        addToClipboard(answerText);
        incrementAttempts();
  
        // Add row of characteristics
        answersContainer.appendChild(newAnswer);
        animateAnswer(newAnswer);
        setTimeout(() => autoShrinkText('.newAnswer', '.newCharacteristic'), 800);
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
  if (inputText.value.toUpperCase() === randomUser.username.toUpperCase()) {
    clipboardClick(); // Initialize event
    winnerContainer.style.display = "block";
    winnerText.textContent = `YOU WIN\nAnswer: ${randomUser.username}`;
    inputContainer.style.display = "none";
    localStorage.setItem('lastPlayedDate', new Date().toISOString().split('T')[0]);
  }
}

function animateAnswer(newAnswer) {
    const answerCharacteristics = newAnswer.querySelectorAll(".newCharacteristic");
    answerCharacteristics.forEach((box, index) => {
      setTimeout(() => {
        box.style.visibility = "visible"; 
        box.classList.add("pop");
      }, index * 150); // Delay each letter's animation
    });
}

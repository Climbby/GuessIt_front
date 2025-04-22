import { answersContainer, inputText, inputContainer, winnerContainer, winnerText, colorInfo, timeoutText } from './utils/domElements.js'
import { isColorHidden, addToClipboard, incrementAttempts, getAttempts } from './utils/globals.js'
import { autoShrinkText, arraysEqual } from './utils/utils.js'
import { dailyTimeout, makeLabels } from './utils/funcs.js'
import { clipboardClick } from './utils/events.js'

export function gameLogic(users, randomUser){

  if (dailyTimeout()){
    timeoutText.style.display = "block"; 
    timeoutText.textContent = "You've already played today! Come back tomorrow.";  
    return;
  }

  users.forEach(person => {
    if (person.username.toUpperCase() === inputText.value.toUpperCase()) { // if name is valid
      const newAnswer = document.createElement('div');
      newAnswer.classList.add('newAnswer');
      let answerText = "";

      for (let characteristic in person) {
        const personVal = person[characteristic];
        const randomVal = randomUser[characteristic];
        const newCharacteristic = document.createElement('div');
        newCharacteristic.classList.add('newCharacteristic');
        newCharacteristic.textContent = personVal;

        if (characteristic === "id") continue;
        if (characteristic === "strategy") caseIncludes(newCharacteristic, personVal, randomVal);
        if (characteristic === "leaderboards") caseLeaderboards(newCharacteristic, personVal, randomVal);
        if (characteristic === "aura") caseIncludes(newCharacteristic, personVal, randomVal);
        if (characteristic === "registration_year") caseHigherLower(newCharacteristic, personVal, randomVal);
        // if (personVal === person.vibe) caseVibe(newCharacteristic, personVal, randomVal);
        
        if (personVal === randomVal || arraysEqual(personVal, randomVal)){
          newCharacteristic.classList.add('certo');
          answerText += "🟩";
        } else if (newCharacteristic.classList.contains('contem')) {
          answerText += "🟨";
        } else {
          answerText += "🟥";
        }

        console.log(characteristic)
        console.log(" - ")
        console.log(personVal)
        console.log(randomVal)
        console.log(" ")

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
    }
  });

  isCorrect(inputText, randomUser);

  // Reset inputText box text
  inputText.value = ""; 

  if (getAttempts() === 1) makeLabels(users[0]);
  if (!isColorHidden()) colorInfo.style.display = "flex";
}

function caseIncludes(newCharacteristic, personVal, randomVal){
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

function caseHigherLower(newCharacteristic, personVal, randomVal){
    if (personVal > randomVal) {
        newCharacteristic.textContent += ' ↓';
    } else if (personVal < randomVal) {
        newCharacteristic.textContent += ' ↑';
    }
}

function caseLeaderboards(newCharacteristic, personVal, randomVal){
  newCharacteristic.textContent = "Top " + newCharacteristic.textContent;
  if (personVal === 0) {
    newCharacteristic.textContent = "Above Top 1000"
    if (personVal !== randomVal) newCharacteristic.textContent += " ↓";
    return;
  }
  caseHigherLower(newCharacteristic, personVal, randomVal);
}

function isCorrect(inputText, randomUser){
  if (inputText.value.toUpperCase() === randomUser.username.toUpperCase()) {
    const begginingDate = new Date("2025-03-30");
    const today = new Date();
    const editionNumber = Math.floor((today - begginingDate) / (1000*60*60*24));

    winnerContainer.style.display = "block";
    winnerText.textContent = `YOU WIN\nAnswer: ${randomUser.username}`;
    inputContainer.style.display = "none";

    clipboardClick(editionNumber); // Initialize event
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
      autoShrinkText('.newAnswer', '.newCharacteristic', index);
    });
}

import { answersContainer, inputText } from './domElements.js';
import { autoShrinkText, arraysEqual } from './utils.js';

export function setupGame(users, randomUser, numCharacteristicas) {
  const button = document.getElementById('myButton');

  button.addEventListener('click', () => {
    users.forEach(person => {
      if (person.nome === inputText.value) { // if name is valid
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

    if (inputText.value === randomUser.nome) {
      const winner = document.createElement('p');
      winner.classList.add('ganhador');
      winner.textContent = `GANHASTE!! Era o ${randomUser.nome}`;
      answersContainer.appendChild(winner);
    }

    inputText.value = "";
  });
}

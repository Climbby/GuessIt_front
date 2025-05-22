import { gameLogic } from '../gameLogic.js'
import { answersLabel, timer, inputText } from './domElements.js'
import { autoShrinkText } from './utils.js'
import { getDropdownItems } from './globals.js'

export function handleSelection(selectedIndex) {
  let dropdownItems = getDropdownItems()
  
  dropdownItems.forEach((item, index) => {
    item.classList.remove('selected') // Remove old selection
    if (index === selectedIndex) {
      item.classList.add('selected') // Add class to selected item
      item.scrollIntoView({
        block: 'nearest', // keeps it minimal (no big jump)
        behavior: 'smooth' // optional — smooth animation
      });
    }
  });
}

export function makeLabels(person){
  answersLabel.style.display = "flex"
  for (let characteristca in person) {
    const newLabel = document.createElement('div')
    newLabel.classList.add('newLabel')

    if (characteristca == 'id') continue;
    if (characteristca == 'username') newLabel.textContent = "Username";
    if (characteristca == 'gender') newLabel.textContent = "Gender";
    if (characteristca == 'favorite_kit') newLabel.textContent = "Favorite kit";
    if (characteristca == 'strategy') newLabel.textContent = "Strategy";
    if (characteristca == 'highest_role') newLabel.textContent = "Highest Role";
    if (characteristca == 'leaderboards') newLabel.textContent = "Leaderboards";
    if (characteristca == 'aura') newLabel.textContent = "Aura";
    if (characteristca == 'registration_year') newLabel.textContent = "Registration Year";
    answersLabel.appendChild(newLabel);
  }

  autoShrinkText('#answers-label', '.newLabel', 0);
}

export function makeTimer(){
  // Get current time
  const now = new Date();
  
  // Create a date object for tomorrow at midnight
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  // Calculate the difference in milliseconds
  const diff = tomorrow - now;
  
  // Convert milliseconds to hours, minutes, seconds
  const hours = (Math.floor(diff / (1000 * 60 * 60))).toString().padStart(2, '0')
  const minutes = (Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).toString().padStart(2, '0')
  const seconds = (Math.floor((diff % (1000 * 60)) / 1000)).toString().padStart(2, '0')
  
  let time = `${hours}:${minutes}:${seconds}`;
  timer.textContent = `Next one in: ${time}`

  setTimeout(makeTimer, 1000)
}

export function loadPrevAnswers(users, randomUser){
    const storedAnswers = localStorage.getItem('userAnswers')
    const answersArray = storedAnswers ? JSON.parse(storedAnswers) : []

    answersArray.forEach(answer => {
        inputText.value = answer
        gameLogic(users, randomUser)
    });
}
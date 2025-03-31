import { answersLabel } from './domElements.js';
import { autoShrinkText } from './utils.js';
import { getDropdownItems } from './globals.js';

export function handleSelection(selectedIndex) {
  let dropdownItems = getDropdownItems();
  
  dropdownItems.forEach((item, index) => {
    item.classList.remove('selected'); // Remove old selection
    if (index === selectedIndex) {
      item.classList.add('selected'); // Add class to selected item
      item.scrollIntoView({
        block: 'nearest', // keeps it minimal (no big jump)
        behavior: 'smooth' // optional — smooth animation
      });
    }
  });
}

export function makeLabels(person){
  answersLabel.style.display = "flex";
  for (let characteristca in person) {
    const newLabel = document.createElement('div');
    newLabel.classList.add('newLabel');

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

export function setTitle(tableName){
  const title = document.getElementById("title");
  title.textContent = `GuessIt (${tableName})`;
}

export function dailyTimeout() {
  const lastPlayed = localStorage.getItem('lastPlayedDate');
  const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD format
  return lastPlayed === today;
}
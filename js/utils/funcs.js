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
  for (let characteristca in person) {
    if (characteristca == 'id') continue;

    const newLabel = document.createElement('div');
    newLabel.classList.add('newLabel');
    newLabel.textContent = characteristca;
    answersLabel.appendChild(newLabel);
  }

  setTimeout(() => autoShrinkText('#answers-label', '.newLabel'), 1200);
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
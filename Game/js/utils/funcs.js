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

  autoShrinkText('#answers-label', '.newLabel');
}
let colorHidden = false;
let dropdownItems;
let clipboardWin = "";
let attempts = 0;

export function setColorHidden(){
    colorHidden = true;
}
export function isColorHidden(){
    return colorHidden;
}

export function setItems(group = document){
    dropdownItems = group.querySelectorAll('div');
}
export function getDropdownItems(){
    return dropdownItems;
}
export function getItemContent(index){
    return dropdownItems[index].textContent;
}

export function getClipboard(attempts, edition){
    navigator.clipboard.writeText(`My GuessIt Score (#${edition}) - ${attempts} Attempts\n` + clipboardWin + "\nTry today: [**HERE**](https://climbby.github.io/GuessIt_front/)");
}
export function addToClipboard(character){
    clipboardWin = character + clipboardWin;
}

export function getAttempts(){
    return attempts;
}
export function incrementAttempts(){
    attempts++;
}
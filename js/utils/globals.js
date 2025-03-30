let colorHidden = false;
let dropdownItems;

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
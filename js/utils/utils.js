export function autoShrinkText(containerSelector, textSelector, index) {
  let text;
  const containers = document.querySelectorAll(containerSelector);
  containers.forEach(container => {
    const texts = container.querySelectorAll(textSelector);
    if (container.classList.value === "newAnswer"){
      text = texts[index];
      let fontSize = 16;
      text.style.fontSize = fontSize + 'px';
      while (text.scrollWidth > 80 || text.scrollHeight > 80) {
        fontSize--;
        text.style.fontSize = fontSize + 'px';
      }
      return
    } 
    
    texts.forEach(text => {
      let fontSize = 16;
      text.style.fontSize = fontSize + 'px';
      while (text.scrollWidth > 80 || text.scrollHeight > 80) {
        fontSize--;
        text.style.fontSize = fontSize + 'px';
      }
      return;
  });
 
  });
}
  
export function arraysEqual(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  return a.length === b.length && a.every((val, index) => val === b[index]);
}
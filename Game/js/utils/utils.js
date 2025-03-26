export function autoShrinkText(containerSelector, textSelector) {
    const containers = document.querySelectorAll(containerSelector);
  
    containers.forEach(container => {
      const texts = container.querySelectorAll(textSelector);
  
      texts.forEach(text => {
        let fontSize = 16;
        text.style.fontSize = fontSize + 'px';
  
        while (text.scrollWidth > 80 || text.scrollHeight > 80) {
          fontSize--;
          text.style.fontSize = fontSize + 'px';
        }
      });
    });
}
  
export function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, index) => val === b[index]);
}
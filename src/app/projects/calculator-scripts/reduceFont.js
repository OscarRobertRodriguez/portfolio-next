function reduceFont() {
  const input = document.querySelector('.phone__input');
 input.value.length > 8 ? (input.style.fontSize = '1.9rem') : (input.style.fontSize = '5rem');
}

export default reduceFont;

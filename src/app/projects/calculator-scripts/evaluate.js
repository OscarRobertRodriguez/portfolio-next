import replaceUnicode from './replaceUnicode';

function evaluate() {
  const input = document.querySelector('.phone__input');
  const content = input.value;
  if (content.length > 20) {
    input.value = eval(replaceUnicode(content)).toExponential();
  } else {
    input.value = eval(replaceUnicode(content));
  }
}

export default evaluate;

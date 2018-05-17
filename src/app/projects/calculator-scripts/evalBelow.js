import replaceUnicode from './replaceUnicode';

import checkForMathSymbols from './checkForMathSymbols';

function evalBelow() {
  const input = document.querySelector('.phone__input');
  const bottomInput = document.querySelector('.phone__result');
  // const bottomValue = bottomInput.value;
  const content = replaceUnicode(input.value);

  if (checkForMathSymbols(content) || content.length === 0) {
    bottomInput.value = '';
  }

  try {
    eval(replaceUnicode(input.value));
  } catch (e) {
    if (e instanceof SyntaxError) {
      bottomInput.value = '';
      return;
    }
    bottomInput.value = '';
    return;
  }

  if (content.length > 20 && checkForMathSymbols(content)) {
    const value = eval(replaceUnicode(input.value)).toExponential();
    bottomInput.value = value;
  } else if (content !== null && checkForMathSymbols(content)) {
    const value = eval(replaceUnicode(input.value));
    bottomInput.value = value;
  }
}

export default evalBelow;

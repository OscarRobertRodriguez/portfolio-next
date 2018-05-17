import checkForMathUnicode from './checkForMathUnicode';

function mathSymbolFirst(a) {
  // const input = document.querySelector('.phone__input');
  if (checkForMathUnicode(a)) {
    return true;
  }

  return false;
}

export default mathSymbolFirst;

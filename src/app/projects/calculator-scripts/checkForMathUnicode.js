const checkForMathUnicode = function checkForMathUnicode(value) {
  if (
    !value.includes('÷') &&
    !value.includes('+') &&
    !value.includes('×') &&
    !value.includes('−')
  ) {
    console.log(value);
    return false;
  }
  return true;
};

export default checkForMathUnicode;

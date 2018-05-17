function checkForMathSymbols(value) {
  if (
    !value.includes('/') &&
    !value.includes('+') &&
    !value.includes('*') &&
    !value.includes('-')
  ) {
    return false;
  }
  return true;
}

export default checkForMathSymbols;

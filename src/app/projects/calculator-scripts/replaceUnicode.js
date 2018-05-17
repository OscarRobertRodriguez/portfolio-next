function replaceUnicode(value) {
  let newVal = value.replace(/÷/g, '/');
  newVal = newVal.replace(/×/g, '*');
  newVal = newVal.replace(/−/g, '-');
  return newVal;
}

export default replaceUnicode;

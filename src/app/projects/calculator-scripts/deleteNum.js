function deleteNum() {
  const input = document.querySelector('.phone__input');

  input.value = input.value.slice(0, input.value.length - 1);
}

export default deleteNum;

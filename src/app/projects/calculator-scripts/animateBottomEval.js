const moveAndChangeColor = [
  {
    transform: 'translateX(0)',
    color: '#000',
  },
  {
    offset: 1,
    transform: 'translateY(-75px)',
    color: '#000',
  },
  {
    transform: 'translateY(-76px)',
    color: '#000',
  },
];

function animateBottomEval() {
  const bottomInput = document.querySelector('.phone__result');
  //   const value = bottomInput.value;
  const input = document.querySelector('.phone__input');
  //   const inputStore = input.value;
  const inputSize = input.style.fontSize;
  input.value = '';
  bottomInput.style.fontWeight = 200;
  bottomInput.style.fontSize = inputSize;
  const animationInput = bottomInput.animate(moveAndChangeColor, {
    duration: 300,
    fill: 'forwards',
  });

  animationInput.addEventListener('finish', () => {
    const bottomInputFinish = document.querySelector('.phone__result');
    const inputFinish = document.querySelector('.phone__input');
    bottomInputFinish.style.fontWeight = 400;
    bottomInputFinish.style.fontSize = '1.3rem';
    inputFinish.value = bottomInputFinish.value;
    bottomInputFinish.value = '';
    animationInput.cancel();
  });
}

export default animateBottomEval;

import '../../sass/main.scss';
import './calculator-scripts/history-expand';
import animateBottomEval from './calculator-scripts/animateBottomEval';
import checkForMathUnicode from './calculator-scripts/checkForMathUnicode';
import checkForMathSymbols from './calculator-scripts/checkForMathSymbols';
import reduceFont from './calculator-scripts/reduceFont';
import deleteNum from './calculator-scripts/deleteNum';
import evaluate from './calculator-scripts/evaluate';
import evalBelow from './calculator-scripts/evalBelow';
import mathSymbolFirst from './calculator-scripts/mathSymbolFirst';
// import addToHistory from './calculator-scripts/addToHistory';
import addClearBtn from './calculator-scripts/addClearBtn';
import clear from './calculator-scripts/clear';
import addDeleteBtn from './calculator-scripts/addDeleteBtn';

// select dom nodes
// let img1 = document.querySelector('.project-calculator_mock-img');

// init images
// img1.src = require('images/calculator-mock.png');

const input = document.querySelector('.phone__input');
const fontSize = input.style.fontSize;
const buttons = Array.from(document.getElementsByClassName('phone__btn'));
const delBtn = document.getElementById('delBtn');
input.addEventListener('onload', reduceFont());

//	loop through all btns
for (let i = 0; i < buttons.length; i += 1) {
  // add eventlistener to each btn on click
  buttons[i].addEventListener('click', e => {
    // list variables
    const  target = e.target;
    const value = target.getAttribute('value');
    // const input = document.querySelector('.phone__input');
    const inputBottom = document.querySelector('.phone__result');
    const last = input.value.slice(-1);
    const first = input.value.slice(0, 1);
    const total = input.value + value;
    const inputLength = total.length;
    const delBtnValue = document.getElementById('delBtn').getAttribute('value');
    // use focus and select so cursor select input on clicks
    input.focus();
    input.select();

    console.log(`i'm the target value attribute ${value}`);
    console.log(`i'm the last variable ${last}`);
    console.log('this is first ' + first);
    console.log(`i'm the length ${inputLength}`);
    console.log(`i'm the total ${total}`);

    //   if(inputLength === 0 && value === '−' ) {
    //     input.value = '−';
    // }

    // statement that checks if the last character is a math symbol so that it
    // is not added twice after another symbol

    if (checkForMathUnicode(last) && checkForMathUnicode(value)) {
      input.value = input.value.slice(0, input.value.length - 1);
    }
    // if statment that fire code block if equal to del btn
    if (value === 'DEL') {
      deleteNum();
      reduceFont();
      evalBelow();
      console.log('deleted');
    }

    if (value === 'CLR') {
      clear();
    }

    if (delBtnValue === 'CLR' && value !== '=') {
      addDeleteBtn();
    }

    // statment that fires code block if its equal to '='
    if (value === '=' && inputBottom.value.length > 0 && delBtnValue !== 'CLR') {
      animateBottomEval();
      addClearBtn();
    }

    // fires if its not equall to del btn or equal btn
    if (value !== 'DEL' && value !== '=' && value !== 'CLR') {
      input.value += value;
      input.addEventListener('input', reduceFont());
      input.addEventListener('input', evalBelow());
    }

    if (inputLength === 1 && checkForMathUnicode(value)) {
      input.value = '';
      if (value === '−') {
        input.value = '−';
      }
    }
  });
}
// timer function for del btn to clear screen on mouse release after half a second

let mousedown;
delBtn.addEventListener('mousedown', () => {
  mousedown = Date.now();
});

delBtn.addEventListener('mouseup', () => {
  const elapsed = Date.now() - mousedown;
  mousedown = undefined;
  if (elapsed >= 500) {
    // const input = document.querySelector('.screen_input');
    input.value = '';
  }
});

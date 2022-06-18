//basic math function
function add(a, b){
    return a + b;
}

function subtract(a, b){
   return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
  if (a === 0 && b === 0) {
    return 'Error'   //return error if both are zero
  }else {
    return a / b;
  }
    
} 

function percentage (a, b){
  return a * (b/100);
}
   
// function to take 2 variable plus the operator
function operate(firstOperation, inputValue, operator) {
  if (operator === '+') {
    return add(firstOperation, inputValue);
  } else if (operator === '-') {
    return subtract(firstOperation, inputValue);
  } else if (operator === '*') {
    return multiply (firstOperation, inputValue);
  } else if (operator === '/') {
    return divide(firstOperation, inputValue);
  } else if (operator === '%')
    return percentage (firstOperation, inputValue);
    return inputValue;
}

//Array to hold the variables
//Variable contained here will keep track of the current state of operation.
  const calculator = {
    displayContent: '0',
    firstOperation: null,
    incomingSecondOperation: false,
    operator: null,
  };

//This will update the display when a keys are clicked.
  function refreshDisplay() {
    const display = document.querySelector('.calculator__display');
    display.textContent = calculator.displayContent;
  }
  refreshDisplay();
  
  //Event listener for all the keys available
  const keys = document.querySelector('.calculator_functions');
  keys.addEventListener('click', (event) => {
  const { target } = event;
  
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    performCalculation(target.value);
    refreshDisplay();
    return;
  }

  if (target.classList.contains('pos-neg')){
    inputNegative(target.value);
    refreshDisplay()
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value)
    refreshDisplay();
    return;
  }

  if (target.classList.contains('all_clear')) {
    all_clear();
    refreshDisplay();
    return;
  }

  if (target.classList.contains('percent')){
    console.log(target.value);
    return;
  }

  if (target.classList.contains('backspace')){
    backspace();
    console.log(target.value);
    refreshDisplay();
    return;
  }
 
  inputNumber(target.value);
  refreshDisplay();
});

//Number initially displays on the screen, when keys are clicked via refreshDisplay().
//when an operator is selected, the incomingSecondOperation will change state to true. 
//This triggers the performCalculation. It will only stop once the '=' operator click.
function inputNumber(digit) {
  const { displayContent, incomingSecondOperation } = calculator;
  if (incomingSecondOperation === true) {
    calculator.displayContent = digit;
    calculator.incomingSecondOperation = false;
  } else {
    calculator.displayContent = displayContent === '0' ? digit : displayContent + digit;
  }
  console.log(calculator);
}
// toggle negative/positive
function inputNegative(){
  const {displayContent} = calculator;
  let inputValue = parseFloat(displayContent);
  if (inputValue) {
     inputValue -= inputValue*2;
     calculator.displayContent = inputValue;
  }
}
//add decimal and prevent double decimal
  function inputDecimal(dot) {
  if (!calculator.displayContent.includes(dot)) {
    calculator.displayContent += dot;
  }
  if (calculator.incomingSecondOperation === true){
    calculator.displayContent ='0.';
    calculator.incomingSecondOperation = false;
    return
  }
} 

function performCalculation(performOperation) {
  const { firstOperation, displayContent, operator } = calculator
  const inputValue = parseFloat(displayContent);
  if (operator && calculator.incomingSecondOperation) {
    calculator.operator = performOperation;
    console.log(calculator);
    return;
  }
  //first value stored in firstOperation.
  if (firstOperation === null && !isNaN(inputValue)) {
    calculator.firstOperation = inputValue;
  }else if (operator) {
    const result = operate(firstOperation, inputValue, operator);
    calculator.displayContent = String(result);
    calculator.firstOperation = result;
  }

  calculator.incomingSecondOperation = true;
  calculator.operator = performOperation;
  console.log(calculator);
}

//Calculator reset
function all_clear(){
  calculator.displayContent = '0';
  calculator.firstOperation = null;
  calculator.incomingSecondOperation = false;
  calculator.operator = null;
  console.log(calculator);
 }

 //backspace
 function backspace(){
  const {displayContent} = calculator;
  const firstArr = displayContent;
  if (firstArr.length > 1){
    let secArray = firstArr.slice(0, -1)
    calculator.displayContent = secArray;
    return;
  }
 }


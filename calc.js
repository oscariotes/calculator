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

function divide( a,  b){
    return a / b;
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
  }
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
    console.log('pos_neg', target.value)
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
  




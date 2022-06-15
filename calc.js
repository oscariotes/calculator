const display = document.querySelector(".calculator_display");
const numero = document.querySelectorAll(".number");

const operatorS = document.querySelectorAll(".operators");
const operator = document.querySelector('.operator');
const previousOperation = document.querySelector(".previousOperation");

const currentOperation = document.querySelector(".currentOperation")
const equalsX = document.querySelector('.equalsX');
currentOperation.textContent = ' ';
previousOperation.textContent = ' ';
operator.textContent = '';




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

//function to take 2 variable with operator
 function operate(c, d, selectedOperator) {
    switch (selectedOperator) {
      case "+":
        return add(c, d);
      case "-":
        return subtract(c, d);
      case "*":
        return multiply(c, d);
      case "/":
        return divide(c, d);
    }
  };  
 


let storedValue = '';
let storedValue2 ='';
let firstNumber = '';
let secondNumber = '';
let selectedOperator ='';
let result ='';
currentOperation.textContent = 0;



numero.forEach((numero) => {
  numero.addEventListener('click', function() {
    storedValue += numero.value;
    previousOperation.textContent = storedValue;
    //calculate();
   
  })
}); 

operatorS.forEach((operatorS) => {
  operatorS.addEventListener('click', function(){
    selectedOperator += operatorS.value;
    operator.textContent = selectedOperator;
    firstNumber = storedValue;
   
    currentOperation.textContent = storedValue ;
    storedValue = '';
  })
});




const calculate = () => {
  const result = operate(parseFloat(firstNumber), parseFloat(storedValue), selectedOperator);

  currentOperation.textContent = result;
  }

equalsX.addEventListener('click', calculate);



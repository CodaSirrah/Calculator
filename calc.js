let buttons = document.querySelectorAll("button");
let numbers = document.getElementsByClassName("number");
let screenOne = document.getElementById("pTop");
let screenTwo = document.getElementById("pBottom");
let operators = document.getElementsByClassName("operator");
let currentNumber = 0;
let previousNumber = 0;
let currentOperator;
let answer = 0;
let stringNumber = "";
let firstInput = true;
let firstCalculation = true;
let firstOperator = true;
let btnAC = document.getElementById("AC")
let tertiary = document.getElementsByClassName("tertiary");
let operationCounter = 0;

const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
};

const operate = function(operator, a, b) {
    return operator(a, b);
};
/* Displays on screen the number that is clicked and stores it inside variable 'currentNumber'
   while previous number is stored inside 'previousNumber'. */
const display = function(e) {
    e.addEventListener("click", () => {
        if (firstInput) {
            screenOne.innerHTML = e.innerHTML;
            stringNumber = e.innerHTML;
            firstInput = false;
        }
        else {
            screenOne.innerHTML += e.innerHTML;
            stringNumber += e.innerHTML;
            }
    });
};

// Calls display function for each number button.
for (i = 0; i < numbers.length; i++) {
    display(numbers[i]);
};

/* Gives color to operator that is clicked for visual clarity. 
   Stores the current operator, previous number and resets the string number. */ 
const chooseOperator = function(e) {
    e.addEventListener("click", () => {
        if (operationCounter >= 2) {
            currentOperator = e.innerHTML;
            operationCounter +=1;
            equalize();
        }
        else if (firstOperator) {   
            currentOperator = e.innerHTML;
            previousNumber = parseInt(stringNumber);
            stringNumber = "";
            screenTwo.innerHTML = `${previousNumber} ${e.innerHTML}`;
            screenOne.innerHTML = "";
            firstOperator = false;
            operationCounter +=1;
        } else {
            currentOperator = e.innerHTML;
            previousNumber = parseInt(stringNumber);
            stringNumber = "";
            screenTwo.innerHTML = `${answer} ${e.innerHTML}`;
            screenOne.innerHTML = "";
            operationCounter +=1;
        }
    })
}
// Calls chooseOperator function for each operator button.
for (i = 0; i < operators.length; i++) {
    chooseOperator(operators[i]);
};

//Stores current number and produces answer through operate function.
const equalize = function() {
    currentNumber = parseInt(stringNumber);
    if (firstCalculation) {
        if (currentOperator === "+") answer = operate(add, previousNumber, currentNumber);
        if (currentOperator === "-") answer = operate(subtract, previousNumber, currentNumber);
        if (currentOperator === "×") answer = operate(multiply, previousNumber, currentNumber);
        if (currentOperator === "÷") answer = operate(divide, previousNumber, currentNumber);
        firstCalculation = false;
        operationCounter -=1;
        stringNumber = "";
        return screenOne.innerHTML = answer;
    } else { 
    if (currentOperator === "+") answer = operate(add, answer, currentNumber);
    if (currentOperator === "-") answer = operate(subtract, answer, currentNumber);
    if (currentOperator === "×") answer = operate(multiply,answer, currentNumber);
    if (currentOperator === "÷") answer = operate(divide, answer, currentNumber);
    operationCounter -=1;
    stringNumber = "";
    return screenOne.innerHTML = answer;
    }
}
// Calls equalize function.
document.getElementById("equals").addEventListener("click", () => {
    equalize();
});

const allClear = function() {
    firstInput = true;
    firstCalculation = true;
    firstOperator = true;
    previousNumber = 0;
    currentNumber = 0;
    answer = 0;
    screenOne.innerHTML = currentNumber;
    screenTwo. innerHTML = "";
}

btnAC.addEventListener("click", () => {
    allClear();
});

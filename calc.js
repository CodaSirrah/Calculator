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
let equalsEligible = false;
let secondOperation = false;
let newNumber = false;

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
            newNumber = true;
        }
        else {
            screenOne.innerHTML += e.innerHTML;
            stringNumber += e.innerHTML;
            equalsEligible = true;
            newNumber = true;
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
        if (firstInput) {
            return;
        }
        if (currentOperator === e.innerHTML && newNumber === false) return;
        else if (secondOperation) {
            equalize();
            currentOperator = e.innerHTML;
            screenTwo.innerHTML = `${answer} ${e.innerHTML}`;
            screenOne.innerHTML = "";
            secondOperation = true;
            newNumber = false;

        } else {
         if (firstOperator) {   
            currentOperator = e.innerHTML;
            previousNumber = parseInt(stringNumber);
            stringNumber = "";
            screenTwo.innerHTML = `${previousNumber} ${e.innerHTML}`;
            screenOne.innerHTML = "";
            firstOperator = false;
            secondOperation = true;
            newNumber = false;
            } else {
            currentOperator = e.innerHTML;
            previousNumber = parseInt(stringNumber);
            stringNumber = "";
            screenTwo.innerHTML = `${answer} ${e.innerHTML}`;
            screenOne.innerHTML = "";
            secondOperation = true;
            newNumber = false;
            }
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
    if (equalsEligible === false) return;
    if (firstCalculation) {
        if (currentOperator === "+") answer = operate(add, previousNumber, currentNumber);
        if (currentOperator === "-") answer = operate(subtract, previousNumber, currentNumber);
        if (currentOperator === "×") answer = operate(multiply, previousNumber, currentNumber);
        if (currentOperator === "÷" && currentNumber === 0)  {
        allClear();
        return screenOne.innerHTML = "Sure Buddy.";
        }
        if (currentOperator === "÷" && currentNumber !== 0) answer = operate(divide, previousNumber, currentNumber);
        firstCalculation = false;
        stringNumber = "";
        screenTwo.innerHTML = "";
        equalsEligible = false;
        secondOperation = false;
        answer = checkDecimal(answer);
        return screenOne.innerHTML = answer;
    } else { 
    if (currentOperator === "+") answer = operate(add, answer, currentNumber);
    if (currentOperator === "-") answer = operate(subtract, answer, currentNumber);
    if (currentOperator === "×") answer = operate(multiply,answer, currentNumber);
    if (currentOperator === "÷" && currentNumber === 0)  {
        allClear();
        return screenOne.innerHTML = "Sure Buddy.";
    }
    if (currentOperator === "÷" && currentNumber !== 0) answer = operate(divide, answer, currentNumber);
    stringNumber = "";
    screenTwo.innerHTML = "";
    equalsEligible = false;
    secondOperation = false;
    if (answer)
    answer = checkDecimal(answer);
    return screenOne.innerHTML = answer;
    }
}
// Calls equalize function.
document.getElementById("equals").addEventListener("click", () => {
    equalize();
});

// Clears Calculator of all data.
const allClear = function() {
    firstInput = true;
    firstCalculation = true;
    firstOperator = true;
    previousNumber = 0;
    currentNumber = 0;
    answer = 0;
    screenOne.innerHTML = currentNumber;
    screenTwo. innerHTML = "";
    equalsEligible = false;
    secondOperation = false;
    newNumber = false;
}

btnAC.addEventListener("click", () => {
    allClear();
});

// Rounds answer to 10 decimal points if it has more than 10.
const checkDecimal = function(e) {
    let decimalCheck = e.toString();
    if (decimalCheck.includes(".")) {
        decimalCheck = decimalCheck.split(".");
        let decimalCheckDec = decimalCheck[1].split("");
        if (decimalCheckDec.length > 10) {
            e = Math.round(answer * 10000000000) / 10000000000;
            
        };
    }
    return e;
};
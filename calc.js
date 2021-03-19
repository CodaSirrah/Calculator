let buttons = document.querySelectorAll("button");
let numbers = document.getElementsByClassName("number");
let screenOne = document.getElementById("pTop");
let screenTwo = document.getElementById("pBottom");
let operators = document.getElementsByClassName("operator");
let btnDec = document.getElementById("decimal");
let btnBackspace = document.getElementById("backspace");
let btnNP = document.getElementById("negativePositive");
let btnDayNight = document.getElementById("dayNight");
let screenColor = document.getElementById("screen");
const body = document.querySelector("body");
const dMode = document.getElementById("d-mode");
let currentNumber = 0;
let previousNumber = 0;
let currentOperator = "none";
let stringNumber = "";
let firstInput = true;
let btnAC = document.getElementById("AC")
let tertiary = document.getElementsByClassName("tertiary");
let successiveOperation = false;
let newNumber = false;
let newNum = false;


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
        newNumber = true;
        if (firstInput) {
            screenOne.innerHTML = e.innerHTML;
            stringNumber = e.innerHTML;
            firstInput = false;
        } else {
            if (newNum) {
                stringNumber = e.innerHTML;
                newNum = false;
                return screenOne.innerHTML += e.innerHTML;
            }
            screenOne.innerHTML += e.innerHTML;
            stringNumber += e.innerHTML;
        }
    })
};

// Calls display function for each number button.
for (i = 0; i < numbers.length; i++) {
    display(numbers[i]);
};

//Stores the current operator, previous number and resets the string number. // 
const chooseOperator = function(e) {
    e.addEventListener("click", () => {
        // Stops successive clicks of operators producing error.
        if (newNumber === false) return;
        // Calls equalize function to chain operations before changing to new operator.
        if (successiveOperation) {
            equalize();
            currentOperator = e.innerHTML;
            screenTwo.innerHTML = `${previousNumber} ${e.innerHTML}`;
            screenOne.innerHTML = "";
        // Converts screenNumber to previousNumber and changes to new operator.
        } else {
            if (newNumber === true) {
                (stringNumber.includes(".")) ? previousNumber = parseFloat(stringNumber) : previousNumber = parseInt(stringNumber);
            }
            previousNumber = checkDecimal(previousNumber);
            currentOperator = e.innerHTML;
            stringNumber = "";
            screenTwo.innerHTML = `${previousNumber} ${e.innerHTML}`;
            screenOne.innerHTML = "";
            successiveOperation = true;
        }
        newNumber = false;
    })
};
// Calls chooseOperator function for each operator button.
for (i = 0; i < operators.length; i++) {
    chooseOperator(operators[i]);
};

//Stores current number and produces previousNumber through operate function.
const equalize = function() {
    if (currentOperator === "none" || newNumber === false) return;
    if (successiveOperation) {
        (stringNumber.includes(".")) ? currentNumber = parseFloat(stringNumber) : currentNumber = parseInt(stringNumber);
        if (currentOperator === "+") previousNumber = operate(add, previousNumber, currentNumber);
        if (currentOperator === "-") previousNumber = operate(subtract, previousNumber, currentNumber);
        if (currentOperator === "×") previousNumber = operate(multiply, previousNumber, currentNumber);
        if (currentOperator === "÷" && currentNumber !== 0) previousNumber = operate(divide, previousNumber, currentNumber);
        if (currentOperator === "÷" && currentNumber === 0)  {
            allClear();
            return screenOne.innerHTML = "Sure Buddy.";
        }
        
        screenTwo.innerHTML = "";
        previousNumber = checkDecimal(previousNumber);
        newNum = true;
        return screenOne.innerHTML = previousNumber;
        }
    else  {
        (stringNumber.includes(".")) ? currentNumber = parseFloat(stringNumber) : currentNumber = parseInt(stringNumber);
        if (currentOperator === "+") previousNumber = operate(add, previousNumber, currentNumber);
        if (currentOperator === "-") previousNumber = operate(subtract, previousNumber, currentNumber);
        if (currentOperator === "×") previousNumber = operate(multiply, previousNumber, currentNumber);
        if (currentOperator === "÷" && currentNumber !== 0) previousNumber = operate(divide, previousNumber, currentNumber);
        if (currentOperator === "÷" && currentNumber === 0)  {
            allClear();
            return screenOne.innerHTML = "Sure Buddy.";
        }
        currentOperator = "none";
        stringNumber = previousNumber.toString();
        screenTwo.innerHTML = "";
        successiveOperation = false;
        previousNumber = checkDecimal(previousNumber);
        return screenOne.innerHTML = previousNumber;
    }
};
// Calls equalize function.
document.getElementById("equals").addEventListener("click", () => {
    successiveOperation = false;
    equalize();
    
});

// Clears Calculator of all data.
const allClear = function() {
    firstInput = true;
    previousNumber = 0;
    currentNumber = 0;
    previousNumber = 0;
    screenOne.innerHTML = currentNumber;
    screenTwo. innerHTML = "";
    successiveOperation = false;
    newNumber = false;
    newNum = false;
};

btnAC.addEventListener("click", () => {
    allClear();
});

// Rounds previousNumber to 10 decimal points if it has more than 10.
const checkDecimal = function(e) {
    let decimalCheck = e.toString();
    if (decimalCheck.includes(".")) {
        decimalCheck = decimalCheck.split(".");
        let decimalCheckDec = decimalCheck[1].split("");
        if (decimalCheckDec.length > 10) {
            e = Math.round(e * 10000000000) / 10000000000;
        };
    }
    return e;
};
// Creates or removes decimal point.
const makeDecimal = function() {
    if (screenOne.innerHTML.includes(".")) return;
    if (newNum) {
        screenOne.innerHTML += btnDec.innerHTML;
        stringNumber    = btnDec.innerHTML;
        newNum = false;
    } else {
        screenOne.innerHTML += btnDec.innerHTML;
        stringNumber += btnDec.innerHTML;
        firstInput = false;
    }
};

btnDec.addEventListener("click", () => {
    return makeDecimal();
});

// Removes last character from calculator and updates string.
const backspace = function() {
    let x = screenOne.innerHTML;
    x = x.split("");
    x.pop();
    x = x.toString();
    x = x.replace(/,/g, "");
    stringNumber = x;
    screenOne.innerHTML = x;
};

btnBackspace.addEventListener("click", () => {
    backspace();
});

// Changes to positive or negative number on main screen.
const changeSign = function() {
    if (firstInput) {
        firstInput = false;
        screenOne.innerHTML = "";
    }
    let x = screenOne.innerHTML;
    
    
    if (x.includes("-")) {
        x = x.split("");
        x.shift();
        x = x.toString();
        x = x.replace(/,/g, "");
        if (newNum) newNum = false;
        stringNumber = x;
        screenOne.innerHTML = x;
    }
    else {
    x = x.split("");
    x.unshift("-");
    x = x.toString();
    x = x.replace(/,/g, "");
    if (newNum) newNum = false;
    stringNumber = x;
    screenOne.innerHTML = x;
    }
};

btnNP.addEventListener("click", () => {
   changeSign();
});

// Switches CSS between day/night aesthetic.
let restEyes = function() {
   if (body.style.backgroundColor === "white") {
    body.style.backgroundColor = "black";
    screenColor.style.backgroundColor = "rgb(173, 173, 173)";
    btnDayNight.style.backgroundColor = "black";
    dMode.style.color = "rgb(173, 173, 173)";
    btnDayNight.style.borderColor  = "rgb(173, 173, 173)";

   } else if (body.style.backgroundColor === "black"){
    body.style.backgroundColor = "rgb(247, 171, 194)";
    screenColor.style.backgroundColor = "white";
    btnDayNight.style.backgroundColor = "white";
    dMode.style.color = "white";
    btnDayNight.style.borderColor  = "black";
   } else {
    body.style.backgroundColor = "black";
    screenColor.style.backgroundColor = "rgb(173, 173, 173)";
    btnDayNight.style.backgroundColor = "black";
    dMode.style.color = "rgb(173, 173, 173)";
    btnDayNight.style.borderColor  = "rgb(173, 173, 173)";
   }
};

btnDayNight.addEventListener("click", () => {
    restEyes();
});
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
let currentNumType = "none";


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
            if (firstCalculation === false && answer.toString() + stringNumber === screenOne.innerHTML) {
                answer = answer.toString();
                answer += stringNumber;
                stringNumber = "";
                currentNumber = 0;
                equalsEligible = false;
                (answer.includes(".")) ? answer = parseFloat(answer) : answer = parseInt(answer)
            }
    };
});
}
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
        if (currentOperator !== e.innerHTML && newNumber == false) return;
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
            (stringNumber.includes(".")) ? previousNumber = parseFloat(stringNumber) : previousNumber = parseInt(stringNumber);
            stringNumber = "";
            screenTwo.innerHTML = `${previousNumber} ${e.innerHTML}`;
            screenOne.innerHTML = "";
            firstOperator = false;
            secondOperation = true;
            newNumber = false;
            currentNumType = "current";
            } else {
            currentOperator = e.innerHTML;
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
    if (firstOperator) return currentNumber = stringNumber; 
    if (equalsEligible === false || newNumber === false) return;
    (stringNumber.includes(".")) ? currentNumber = parseFloat(stringNumber) : currentNumber = parseInt(stringNumber);
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

const makeDecimal = function() {
    if (screenOne.innerHTML.includes(".")) return;
    screenOne.innerHTML += btnDec.innerHTML;
    stringNumber += btnDec.innerHTML;
    firstInput = false;
};

btnDec.addEventListener("click", () => {
    return makeDecimal();
})

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
})

const changeSign = function() {

};

btnNP.addEventListener("click", () => {
    let x = screenOne.innerHTML;
    if (x.includes("-")) {
        x = x.split("");
        x.shift();
        x = x.toString();
        x = x.replace(/,/g, "");
        stringNumber = x;
        screenOne.innerHTML = x;
    }
    else {
    x = x.split("");
    x.unshift("-");
    x = x.toString();
    x = x.replace(/,/g, "");
    stringNumber = x;
    screenOne.innerHTML = x;
    }
});


let restEyes = function() {
   if (body.style.backgroundColor === "white") {
    body.style.backgroundColor = "black";
    btnDayNight.innerHTML = "☀️";
    btnDayNight.style.backgroundColor = "grey";
    screenColor.style.backgroundColor = "grey";
    btnDayNight.style.borderColor = "rgb(252, 3, 69)";


   } else if (body.style.backgroundColor === "black"){
    body.style.backgroundColor = "white";
    btnDayNight.innerHTML = "🌑";
    btnDayNight.style.backgroundColor = "white";
    screenColor.style.backgroundColor = "white";
    btnDayNight.style.borderColor = "rgb(170, 138, 184)";
    btnDayNight.style.backgroundColor = "black";
   } else {
    body.style.backgroundColor = "black";
    btnDayNight.innerHTML = "☀️";
    btnDayNight.style.backgroundColor = "grey";
    screenColor.style.backgroundColor = "grey";
    btnDayNight.style.borderColor = "rgb(252, 3, 69)";
   }
};

btnDayNight.addEventListener("click", () => {
    restEyes();
});
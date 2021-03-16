let buttons = document.querySelectorAll("button");
let numbers = document.getElementsByClassName("number");
let screen = document.getElementById("screen");
let operators = document.getElementsByClassName("operator");
let currentNumber = 0;
let previousNumber = 0;
let currentOperator;
let answer = 0;
let anyInput = "no";
let stringNumber = "";
let lastAnswer;

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
        buttons.forEach((numbers) => {
            numbers.style.backgroundColor = "rgba(134, 136, 143, 0.5)";
        })
        if (anyInput ==="no") {
            document.querySelector("#screen").innerHTML = e.innerHTML;
            stringNumber += e.innerHTML;
            e.style.backgroundColor = "rgb(252, 3, 69)"
            anyInput = "yes";
        }
        else {
        document.querySelector("#screen").innerHTML += e.innerHTML;
        stringNumber += e.innerHTML;
        e.style.backgroundColor = "rgb(252, 3, 69)"
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
        buttons.forEach((operators) => {
            operators.style.backgroundColor = "rgba(134, 136, 143, 0.5)";
        })
        e.style.backgroundColor = "rgb(170, 138, 184)";
        currentOperator = e.innerHTML;
        previousNumber = parseInt(stringNumber);
        stringNumber = "";
    })
}
// Calls chooseOperator function for each operator button.
for (i = 0; i < operators.length; i++) {
    chooseOperator(operators[i]);
};

// Stores current number and produces answer through operate function.
const equalize = function() {
    currentNumber = parseInt(stringNumber);
    if (currentOperator === "+") answer = operate(add, previousNumber, currentNumber);
    if (currentOperator === "-") answer = operate(subtract, previousNumber, currentNumber);
    if (currentOperator === "×") answer = operate(multiply, previousNumber, currentNumber);
    if (currentOperator === "÷") answer = operate(divide, previousNumber, currentNumber);
    return document.querySelector("#screen").innerHTML = answer;
}
// Calls equalize function.
document.getElementById("equals").addEventListener("click", () => {
    equalize();
});
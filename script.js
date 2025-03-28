function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch(operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

let frame = document.querySelector(".frame");
let displayText = document.querySelector(".display>h1");

let currentNum = [];

frame.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON") {
        if(event.target.getAttribute("class") == "nums") {
            if(currentNum.length < 9) {
                currentNum.push(event.target.textContent);
                displayText.textContent = currentNum.join('');
            }
        }

        if(event.target.getAttribute("class") == "clear") {
            currentNum = [];
            displayText.textContent = 0;
        }
    }
});
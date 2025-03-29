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

function refreshDisplay(content = 0) {
    if(content != Infinity) {
        if(content[content.length - 1] != ".") {
            content = Math.round(content * DECIMALPLACE) / DECIMALPLACE;
        }
        displayText.textContent = content;
    } else {
        clear();
        displayText.textContent = "ERROR";
    }
}

function clear() {
    operation = [""];
}
 
const body = document.querySelector("body");
const frame = document.querySelector(".frame");
const displayText = document.querySelector(".display>h1");

const DECIMALPLACE = Math.pow(10, 8);

let operation = [""]; // [operand1, operator, operand2]

body.addEventListener("keydown", (event) => {
    let buttons = document.querySelectorAll("button");

    buttons.forEach((num) => {
        if(num.textContent.toLowerCase() == event.key.toLowerCase()) {
            num.click();
        }
    })
});

frame.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON") {
        if(event.target.getAttribute("class") == "nums") {
            /*
            If the last operation was evaluated and the 
            user presses a number, clear the operation
            */
            if(operation[1] == "=") operation = [""];

            /*
            Add num to operation and refresh display if
            no more than one decimal points are present
            and if the input is less than 9 characters
            */
            if(
                operation[operation.length - 1].length < 9
                && (event.target.textContent != "."
                || !operation[operation.length - 1].includes("."))
            ) {
                operation[operation.length - 1] += event.target.textContent;
                refreshDisplay(operation[operation.length -1]);
            }
        }

        if(event.target.getAttribute("class") == "operators") {
            if(!operation[1] && operation[0] != "") { 
                operation.push(event.target.textContent);
                operation.push("");
            } else if(operation[1] && operation[2] == "") { 
                operation[1] = event.target.textContent;
            } else if(operation[1] && operation[2]) {
                let result = operate(
                    parseFloat(operation[0]), 
                    parseFloat(operation[2]),
                    operation[1]
                );
                operation = [result.toString(), event.target.textContent];
                operation.push("");
                refreshDisplay(operation[0]);
            }
        }

        if(event.target.getAttribute("class") == "equals") {
            if(operation[2]) {
                let result = operate(
                    parseFloat(operation[0]), 
                    parseFloat(operation[2]),
                    operation[1]
                );
                operation = [result.toString(), "="];
                operation.push("");
                refreshDisplay(operation[0]);
            }
        }

        if(event.target.getAttribute("class") == "clear") {
            refreshDisplay();
            clear();
        }

        if(event.target.getAttribute("class") == "backspace") {
            if(
                operation[operation.length - 1] == ""
                && operation.length != 1
            ) {
                operation.pop();
            }

            if(operation[operation.length - 1] != "") {
                if(operation[1] && !operation[2]) {
                    operation.pop();
                    refreshDisplay(operation[operation.length - 1]);
                } else {
                    let current = operation[operation.length - 1];
                    operation[operation.length - 1] = current.slice(0, -1);
                    refreshDisplay(operation[operation.length - 1]);
                }
            }
        }
    }
});
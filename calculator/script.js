const buttons = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display");
const MAX_LENGTH = 9;

let currOperation = null;
let currValueStr = "0";
let prevValue = null;
let pendingOperation = false;

function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
function mul(a, b) { return a * b; }
function div(a, b) { return a / b; }

buttons.forEach(button => {
    button.addEventListener("click", event => {
        let value = button.attributes.getNamedItem("data-value");
        let action = button.attributes.getNamedItem("data-action");
        if (value) {
            processDigit(+value.value);
        } else if (action) {
            switch (action.value) {
                case "clear":
                    clear();
                    break;
                case "plus":
                    applyOperation(add);
                    break;
                case "minus":
                    applyOperation(sub);
                    break;
                case "multiply":
                    applyOperation(mul);
                    break;
                case "divide":
                    applyOperation(div);
                    break;
                case "compute":
                    applyOperation(null);
                    break;
                case "sign":
                    toggleSign();
                    break;
                case "period":
                    processPeriod();
                    break;
            }
        }
    });
});

function processDigit(digit) {
    console.log("Pressed " + digit);
    if (pendingOperation) {
        pendingOperation = false;
        currValueStr = "";
    }
    if (currValueStr.length < MAX_LENGTH) {
        if (currValueStr === "0")
            currValueStr = "";
        currValueStr += digit;
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currValueStr;
}

function clear() {
    console.log("Clearing");
    currValueStr = "0";
    currOperation = null;
    pendingOperation = false;
    let prevValue = null;
    updateDisplay();
}

function applyOperation(operation) {
    console.log("Applying operation");
    if (pendingOperation) {
        currOperation = operation;
        return;
    }
    pendingOperation = true;
    let currValue = Number.parseFloat(currValueStr);
    if (currOperation) {
        let result = currOperation(prevValue, currValue);
        if (!Number.isFinite(result)) {
            result = NaN;
        }
        currValueStr = result.toString().substring(0, MAX_LENGTH);
        prevValue = result;
    } else {
        prevValue = currValue;
    }
    currOperation = operation;
    updateDisplay();
}

function toggleSign() {
    if (pendingOperation) {
        return;
    }
    let value = Number.parseFloat(currValueStr);
    value *= -1;
    currValueStr = value.toString().substring(0, MAX_LENGTH);
    updateDisplay();
}

function processPeriod() {
    if (pendingOperation || currValueStr.indexOf(".") !== -1) {
        return;
    }
    currValueStr += ".";
    updateDisplay();
}

function undo() {
    if (!pendingOperation) {
        currValueStr = currValueStr.substring(0, currValueStr.length - 1);
        if (currValueStr.length === 0) {
            currValueStr = "0";
        }
        updateDisplay();
    }
}

updateDisplay();

window.addEventListener("keydown", event => {
    event.preventDefault();
    switch (event.key.toLowerCase()) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            processDigit(+event.key);
            break;
        case "c":
            clear();
            break;
        case "+":
            applyOperation(add);
            break;
        case "-":
            applyOperation(sub);
            break;
        case "*":
            applyOperation(mul);
            break;
        case "/":
            applyOperation(div);
            break;
        case "enter":
        case "=":
            applyOperation(null);
            break;
        case "backspace":
            undo();
            break;
        case ".":
            processPeriod();
            break;
        default:
            console.log(`Key: ${event.key}`)
            break;
    }
});
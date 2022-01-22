// variables...
const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll('.operation');
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector('.all-clear');
const clearLastEl = document.querySelector(".last-entity-clear");

// intialy all are an empty string. 1.
let dis1Num = ""; //first operand
let dis2Num = ""; //second operand
let result = null;
let lastOperation = "";
let haveDot = false; //checking whether number is floating point

// numbers are in an array,so iterate the by for loop 2.
numbersEl.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            haveDot = true;
        }
        else if (e.target.innerText === "." && haveDot) { // Check whether the number contains two decimals 3.
            return;
        }
        dis2Num += e.target.innerText;
        display2El.innerText = dis2Num;

    });
});

// adding eventlistner for all operations 4.
operationEl.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num) return;
        haveDot = false;
        // whenevr we click an operation,it will store here 5.
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        // clearing the last operation 6.
        clearVar(operationName);     //45 + 45 + 67 * 9
        lastOperation = operationName;

    })
});

// displaying the operations in UI 7.
function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    display1El.innerText = dis1Num;
    display2El.innerText = "";
    dis2Num = "";
    tempResultEl.innerText = result;
}

//  working on operations 8.
function mathOperation() {
    if (lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(dis2Num);
    }
    else if (lastOperation === "+") {
        result = parseFloat(result) + parseFloat(dis2Num);
    }
    else if (lastOperation === "-") {
        result = parseFloat(result) - parseFloat(dis2Num);
    }
    else if (lastOperation === "/") {
        result = parseFloat(result) / parseFloat(dis2Num);
    }
    else if (lastOperation === "%") {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

// working on = operator 9.
equalEl.addEventListener("click", () => {
    if (!dis2Num || !dis1Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2El.innerText = result;
    tempResultEl.innerText = "";
    dis2Num = result;
    dis1Num = "";
});

// to clear the display when press the C button 10.
clearAllEl.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    display1El.innerText = "";
    display2El.innerText = "";
    result = "";
    tempResultEl.innerText = "";
});

clearLastEl.addEventListener("click", () => {
    display2El.innerText = "";
    dis2Num = "";
});

// add eventlistner to whole window
window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === '8' ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickButtonEl(e.key);
    }
    else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
        clickOperation(e.key);
    }
    else if (e.key === "*") {
        clickOperation("x");
    }
    else if (e.key === "Enter" || e.key === "=") {
        clickEqual();
    }
});

function clickButtonEl(key) {
    numbersEl.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key) {
    operationEl.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click();
        }
    })
}

function clickEqual() {
    equalEl.click();
}
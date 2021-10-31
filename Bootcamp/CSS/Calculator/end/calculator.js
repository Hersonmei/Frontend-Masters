let runningTotal = 0;
let buffer = "0";
let previusOperator;
const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parteInt(value))){
        //this is not a number
        handleSymbol(value);
    } else {
        //this is a number
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value){
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer = buffer + value;
    }
}

function handleMath (symbol) {
    if (buffer === '0') {
        // do nothig
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previusOperator = symbol;

    buffer = '0';
}

function flushOperation () {
    if (previusOperator  === "+") {
        runningTotal += intBuffer;
    } else if (previusOperator === "-"){
        runningTotal -= intBuffer;
    } else if (previusOperator === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleSymbol(value){
    switch (value) {
        case 'C':
            buffer = '0';
            runningTotal = '0';
            break;
        case "=":
            if (previusOperator === null){
                //nned two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previusOperator = null;
            buffer = + runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
}

function rerender(){
    screen.innerText = buffer; 
}

function init () {
    document
    .querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick(event.target.innerText);
})
}

init();
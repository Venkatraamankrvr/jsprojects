// variables
const resultEl = document.querySelector(".result");
const lengthEl = document.querySelector(".length");
const uppercaseEl = document.querySelector(".uppercase");
const lowercaseEl = document.querySelector(".lowercase");
const numbersEl = document.querySelector(".numbers");
const symbolsEl = document.querySelector(".symbols");
const generateEl = document.querySelector("#generate");
const clipboard = document.querySelector("#clipboard");

// creating an object for all functions
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// get copied on clipboard
clipboard.onclick = () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return alert("No result to copy!");
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copied to clipboard!");
}

// generating the inputs of  password
generateEl.onclick = () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
// these are inputs to make an password
    resultEl.innerHTML = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
}

// generating the passwords
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]);

    if (typesCount == 0) {
        return alert(
            "No Selected Value"
        );
    }
// getting the input value
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// generating the random password
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)  //A = 65  a-97
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);

}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);  // 0 - 48
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

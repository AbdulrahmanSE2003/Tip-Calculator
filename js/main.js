let billInput = document.getElementById('bill');
let numOfPerInput = document.getElementById('numOfPer');
let tipButtons = document.querySelectorAll('.discounts button');
let tipResult = document.getElementById('tip');
let bppResult = document.getElementById('bpp');
let resetButton = document.getElementById('reset');
let submitButton = document.getElementById('submit');
let zeroWarning = document.getElementById('zero');
let selectWarning = document.querySelector('#select');

function calculateTip(tipPercentage) {
    const billVal = Number(billInput.value);
    const numOfPersons = Number(numOfPerInput.value);
    if (numOfPersons === 0) {
        zeroWarning.classList.replace('d-none', 'd-block');
        numOfPerInput.style.borderColor= "#df7d61";
        return;
    }
    zeroWarning.classList.replace('d-block', 'd-none');
    numOfPerInput.style.borderColor= "hsl(186, 14%, 43%)";
    const tipAmount = (billVal * tipPercentage) / 100;
    const totalPerPerson = (billVal + tipAmount) / numOfPersons;
    tipResult.textContent = `$${tipAmount.toFixed(2)}`;
    bppResult.textContent = `$${totalPerPerson.toFixed(2)}`;
}


tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

resetButton.addEventListener('click', () => {
    billInput.value = '0';
    numOfPerInput.value = '0';
    tipResult.textContent = '$0.00';
    bppResult.textContent = '$0.00';
    tipButtons.forEach(btn => btn.classList.remove('active'));
    zeroWarning.classList.add('d-none');
    selectWarning.classList.add('d-none');
});

submitButton.addEventListener('click', () => {
    const activeButton = document.querySelector('.discounts button.active');
    if (!activeButton) {
        selectWarning.classList.replace('d-none', 'd-block');
        return;
    }
    selectWarning.classList.replace('d-block', 'd-none');
    const tipPercentage = Number(activeButton.getAttribute('data-tip'));
    calculateTip(tipPercentage);
});

billInput.addEventListener("focus", () => {
    billInput.value = "";
});

numOfPerInput.addEventListener("focus", () => {
    numOfPerInput.value = "";
});

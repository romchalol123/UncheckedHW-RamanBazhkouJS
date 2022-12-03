function addition(a, b){
    return parseFloat(a) + parseFloat(b);
}

function substraction(a, b){
    return a - b;
}

function division(a, b){
    return a / b;
}

function multiplication(a, b){
    return a * b;
}

function percent(num){
    return num * 0.01;
}

function changePolarity(num){
    return num*(-1);
}

function reset(){
    pointBtn.removeAttribute('disabled');
    return '0';
}

function clear(){
    pointBtn.removeAttribute('disabled');
    num1 = null;
    num2 = null;
    firstNumIsAdded = false;
    secondNumIsAdded = false;
    percentBtn.removeAttribute('disabled');
    polarityBtn.removeAttribute('disabled');
    return '0';
}
let num1;
let num2;
let action;
let result;

let firstNumIsAdded = false;
let secondNumIsAdded = false;

btnContainer.addEventListener('click', (event) => {
    const btn = event.target;
    const type = btn.classList;
    const btnTextCont = btn.textContent;
    
    if(type.contains('num')){
        if (input.value.includes(`${num1}`) || input.value.includes(`${num2}`) || input.value.includes(`${result}`)){
            input.value = '';
            input.value = getNum(type, input.value, btnTextCont);

            percentBtn.removeAttribute('disabled');
            polarityBtn.removeAttribute('disabled');
        } else{
            input.value = getNum(type, input.value, btnTextCont);
        }
    } else if (type.contains('option')){
        input.value = simpleCommands(input.value, type);
    } else if(type.contains('command')){
        percentBtn.setAttribute('disabled', '');
        polarityBtn.setAttribute('disabled', '');

        if (!firstNumIsAdded && !secondNumIsAdded){
            num1 = input.value;
            firstNumIsAdded = true;

            action = getActionType(type);

        } else if(firstNumIsAdded && !secondNumIsAdded){
            num2 = input.value;
            secondNumIsAdded = true;
            
            result = getResult(action, num1, num2);
            input.value = result;

            action = getActionType(type);

            if(action === 'res'){
                input.value = result;
                clear();
            } 

        } else if(firstNumIsAdded && secondNumIsAdded){
            num1 = result;
            num2 = input.value;
            
            result = getResult(action, num1, num2);
            input.value = result;

            action = getActionType(type);

            if(action === 'res'){
                input.value = result;
                clear();
            }
        }
    }    
});

function getNum(typeClass, numStr, digit){
    if (typeClass.contains('option')){
        numStr = simpleCommands(numStr, typeClass);
    } else{
        numStr = numGeneration(numStr, digit);
    }  

    return numStr;
}

function numGeneration(numStr, digit){
    if(numStr.includes('.')){
        pointBtn.setAttribute('disabled', '');
    } else{
        pointBtn.removeAttribute('disabled');
    }

    if (numStr === '0' && digit !== '.'){
        numStr = digit;
    } else if (digit === '.'){
        numStr += digit;
        pointBtn.setAttribute('disabled', '');
    } else{
        numStr += digit;
    }

    return numStr;
}

function simpleCommands(dataStr, typeClass){
    if (typeClass.contains('convert')){
        dataStr = changePolarity(dataStr);
    } else if (typeClass.contains('clear')){
        dataStr = clear();
    } else if (typeClass.contains('percent')){
        dataStr = percent(dataStr);
    }

    return dataStr;
}

function getActionType(typeClass){
    if(typeClass.contains('divis')){
        return 'divis';
    } else if(typeClass.contains('mult')){
        return 'mult';
    } else if(typeClass.contains('subs')){
        return 'subs';
    } else if(typeClass.contains('add')){
        return 'add';
    } else if(typeClass.contains('res')){
        return 'res';
    }
}

function getResult(actionType, firstOper, secondOper){
    if(actionType.includes('divis')){
        return division(firstOper, secondOper);
    } else if(actionType.includes('mult')){
        return multiplication(firstOper, secondOper);
    } else if(actionType.includes('subs')){
        return substraction(firstOper, secondOper);
    } else if(actionType.includes('add')){
        return addition(firstOper, secondOper);
    } else if(actionType.includes('res')){
        return;
    }
}
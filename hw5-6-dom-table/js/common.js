function createElement(
    tag,
    attrbutes,
    classList,
    textContent){
    const element = document.createElement(tag);
  
    if (attrbutes?.length){
      attrbutes.forEach(({ property, value }) => {
        element.setAttribute(property, value);
      });
    }
  
    if (classList?.length){
      element.classList.add(...classList);
    }
  
    if (textContent){
      element.textContent = textContent;
    }
  
    return element;
  }

function calculateCost(cartList){
  let cost = 0;
  if (!cartList.length) {
    return cost;
  } else {
    for (let i = 0; i < cartList.length; i++){
      let sum = cartList[i].price * cartList[i].amount;
      cost += sum;
    }
    return cost;
  }
}

function convertCostToCurrency(cost){
  res = cost.toFixed(2);
  resStr = res.toString();

  if(res < 10){
    return '0' + resStr;
  } else{
    return resStr;
  }
}

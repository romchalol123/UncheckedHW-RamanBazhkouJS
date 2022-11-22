let products;
let cartList = [];
let totalCost = 0;

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    products = data.products;

    return createCatalog(products);
  });

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

function createCatalog(productsList){
  productsList.forEach((product) => {
    let card = createCard(product);

    wrapper.append(card);
  })
}

function showHideMenu(){
  if (menuBtn.getAttribute('aria-pressed') === 'true'){
    contextMenu.style.display = 'block';
  } else {
    contextMenu.style.display = 'none';
  }

  window.addEventListener('resize', function(){
    if (window.innerWidth > 864){
      cartBtn.classList.remove('active');
      contextMenu.style.display = 'flex';
    } else if (window.innerWidth <= 864 && menuBtn.getAttribute('aria-pressed') === 'true'){
      contextMenu.style.display = 'block';
    } else {
      contextMenu.style.display = 'none';
    }
  });
}

function addItemToCart(id){

  let listItem = cartList.find((item) => {
    return item.id === products[id-1].id;
  });

  if (listItem === undefined) {
    element = products[id - 1];
    element.amount = 1;
    cartList.push(element);
  } else if (listItem) {
    listItem.amount += 1;
  }
}

function createCartCatalog(element, cartList){
  
  cartList.forEach((product) => {
    let card = createCartItem(product);

    element.append(card);
  });
}


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchReq = input.value.trim().toLowerCase();

  let idList = [];

  products.forEach((element) => {
    let id = element.id;
    let title = element.title.trim().toLowerCase();
    let description = element.description.trim().toLowerCase();

    if (title.includes(searchReq) || description.includes(searchReq)){
      idList.push(id);
    }
  });
  
  let newList = [];

  for (let i = 0; i < idList.length; i++){
    products.forEach(product => {
      if (product.id === idList[i]){
        newList.push(product);
      }
    });
  }

  wrapper.innerHTML = '';
  createCatalog(newList);
  input.value = '';
});

cartCloseBtn.addEventListener('click', () => {
  cart.style.display = 'none';
});

menuBtn.addEventListener('click', showHideMenu);

cartBtn.addEventListener('click', () => {
  cart.style.display = 'block';
});

wrapper.addEventListener('click', (event) => {
  let id = event.target.offsetParent.id;
  
  addItemToCart(id);

  ul.innerHTML = '';

  if (ul.innerHTML = ''){
    emptyCartPH.style.display = 'block';
    orderBtn.setAttribute('disabled');
  } else {
    emptyCartPH.style.display = 'none';
    orderBtn.removeAttribute('disabled');
  }

  createCartCatalog(ul, cartList);

  cartBtn.textContent = `Your cart - ${convertCostToCurrency(calculateCost(cartList))}$`;
  cost.textContent = `Total cost: ${convertCostToCurrency(calculateCost(cartList))}$`;  
});

cartBtn.textContent = `Your cart - ${convertCostToCurrency(totalCost)}$`;
cost.textContent = `Total cost: ${convertCostToCurrency(totalCost)}$`;  

ul.addEventListener('click', (event) => {
  let itemID = event.path[2].id;
  let buttonClasses = event.target.classList;
  console.log(itemID);

  let element = cartList.find((product) => {
    return product.id === parseInt(itemID);
  })

  console.log(element);

  if(buttonClasses.contains('incr')){
    element.amount++;
    badge.textContent = `${element.amount} x ${element.price}`;
  } else if(buttonClasses.contains('decr')){
    element.amount--;
    badge.textContent = `${element.amount} x ${element.price}`;
  } else if(buttonClasses.contains('btn-danger')){
    cartList.splice(cartList.indexOf(element), 1);

    if(li.id === itemID){
      ul.remove(li);
    }
    
  }
  console.log(element.amount);
  
});







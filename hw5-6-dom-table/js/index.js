let products;
let cartList = [];
let totalCost = 0;

cartBtn.textContent = `Your cart - ${convertCostToCurrency(totalCost)}$`;
cost.textContent = `Total cost: ${convertCostToCurrency(totalCost)}$`; 

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    products = data.products;

    return createCatalog(products);
  });

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

function searchCards(event) {
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
}

function addCartItem(event){
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
}

function cartBtnAction(event){
  let totalCost = calculateCost(cartList);

  let itemID = event.path[2].id;
  let buttonClasses = event.target.classList;
  let badge = event.path[1].childNodes[1];
  let decrBtn = event.path[1].childNodes[0];

  let element = cartList.find((product) => {
    return product.id === parseInt(itemID);
  })

  if(buttonClasses.contains('incr')){
    element.amount++;
    totalCost += element.price;
    badge.textContent = `${element.amount} x ${element.price}`;
    if (element.amount > 1){
      decrBtn.removeAttribute('disabled');
    }
  } else if(buttonClasses.contains('decr')){
    element.amount--;
    totalCost -= element.price;
    badge.textContent = `${element.amount} x ${element.price}`;
    if (element.amount === 1){
      decrBtn.setAttribute('disabled', '');
    }
  } else if(buttonClasses.contains('btn-danger')){
    totalCost -= element.price * element.amount;

  }

  ul.textContent = '';

  createCartCatalog(ul, cartList);
   
  cartBtn.textContent = `Your cart - ${convertCostToCurrency(totalCost)}$`;
  cost.textContent = `Total cost: ${convertCostToCurrency(totalCost)}$`; 
}

form.addEventListener('submit', searchCards);

cartCloseBtn.addEventListener('click', () => {
  cart.style.display = 'none';
});

menuBtn.addEventListener('click', showHideMenu);

cartBtn.addEventListener('click', () => {
  cart.style.display = 'block';
});

wrapper.addEventListener('click', addCartItem);

ul.addEventListener('click', cartBtnAction);







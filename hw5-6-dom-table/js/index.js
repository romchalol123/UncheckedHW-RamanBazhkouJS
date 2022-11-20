const wrapper = document.querySelector('.wrapper');
const headerform = document.querySelector('#header-form');
const searchMenu = document.querySelector('.search-menu');
const cart = document.querySelector('#cart');

let cartSum = 0;

fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    const products = data.products;

    return createCatalog(products);
  });

function createElement(tag, attrbutes, classList, textContent){
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

function createCard(product){
  const cardHeader = createElement('div', null, ['card-header'], null);

  const imgAttributes = [
    {
      property: 'src',
      value: `${product.thumbnail}`
    },
    {
      property: 'alt',
      value: `${product.title}`
    }
  ];
  const cardHeaderImg = createElement('img', imgAttributes, ['card-img-top', 'h-100'], null);

  const cardBody = createElement('div', null, ['card-body'], null);
  const title = createElement('h5', null, ['card-body-title'], `${product.title}`);
  const description = createElement('p', null, ['card-body-descr'], `${product.description}`);

  const cardfooter = createElement('div', null, ['card-footer'], null);
  const price = createElement('p', null, ['card-footer-info'], `Price: ${product.price}$`);
  const rating = createElement('p', null, ['card-footer-info'], `Price: ${product.rating}$`);

  const card = createElement('div', null, ['card'], null);
  const button = createElement('button', {property: 'type', value: 'button'}, ['btn', 'btn-primary'], 'Add to cart');

  cardHeader.append(cardHeaderImg);
  cardBody.append(title, description);
  cardfooter.append(price, rating);
  card.append(cardHeader, cardBody, cardfooter, button);

  return card;
}

function createCatalog(productsList){
  productsList.forEach((product) => {
    let card = createCard(product);

    wrapper.append(card);
  })
}

function createCartBTN(cartSum){
  const button = createElement('button', { property: 'type', value: 'button' }, ['btn', 'btn-success'], `Your cart - ${cartSum}$`);

  return button
}

function createCartList(){
  
}

searchMenu.prepend(createCartBTN(cartSum));






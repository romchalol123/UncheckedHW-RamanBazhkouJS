const wrapper = document.querySelector('.wrapper');
const container = document.querySelector('.container-fluid');
const cartCloseBtn = document.querySelector('.btn-close');
const cartCont = document.querySelector('.cart-cont');
const cartBtn = document.getElementById('cart-btn');
const cart = document.querySelector('.cart');
const orderBtn = document.getElementById('order-btn');
const menuBtn = document.getElementById('menu-btn');
const contextMenu = document.querySelector('.context-menu');
const card = document.querySelector('.card');
const cardBtn = document.querySelector('.card-btn');
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const ul = document.querySelector('.list-group');
const li = document.querySelector('.list-group-item');
const cost = document.querySelector('.total-cost');
const emptyCartPH = document.querySelector('.place-holder');
const decreaseBtn = document.querySelector('.decr');
const increaseBtn = document.querySelector('.incr');
const removeItemBtn = document.querySelector('.btn-danger');
const badge = document.getElementById('badge');

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
    const rating = createElement('p', null, ['card-footer-info'], `Rating: ${product.rating}`);
  
    const card = createElement('div', [{ property: 'id', value:`${product.id}` }], ['card'], null);
    const button = createElement('button', {property: 'type', value: 'button'}, ['btn', 'btn-primary', 'card-btn'], 'Add to cart');

    cardHeader.append(cardHeaderImg);
    cardBody.append(title, description);
    cardfooter.append(price, rating);
    card.append(cardHeader, cardBody, cardfooter, button);

    return card;
}

function createCartItem(product){
  const cartItem = createElement('li', [{ property: 'id', value:`${product.id}` }], ['list-group-item'], null);
  const imageCont = createElement('div', null, ['photo-cont'], null);

  const imgAttributes = [
    {
      property: 'src',
      value: `${product.thumbnail}`
    },
    {
      property: 'alt',
      value: `${product.title}`
    }
  ]
  const image = createElement('img', imgAttributes, ['cartItem-title-img'], null);

  const title = createElement('p', null, ['cartItem-title'], product.title);

  const control = createElement('div', null, ['control-btn-box'], null);

  const buttonItemAmountDecr = createElement('button', [{ property: 'type', value: 'button'}], ['btn', 'btn-secondary','amount-btn','decr'], '-');
  const buttonItemAmountIncr = createElement('button', [{ property: 'type', value: 'button'}], ['btn', 'btn-secondary','amount-btn','incr'], '+');
  const badge = createElement('span', [{ property: 'id', value: 'badge'}], ['badge', 'bg-primary'], `${product.amount} x ${product.price}`);

  const removeBtn = createElement('button', [{ property: 'type', value: 'button'}], ['btn','btn-danger'], 'Remove from order'); 

  imageCont.append(image);
  control.append(buttonItemAmountDecr, badge, buttonItemAmountIncr, removeBtn);
  cartItem.append(imageCont, title, control);

  if (product.amount === 1){
    buttonItemAmountDecr.setAttribute('disabled', '');
  }

  return cartItem;
}
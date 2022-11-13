fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    const productsList = data.products;
    const wrapper = document.querySelector('.wrapper');

    for (let num = 0; num < productsList.length; num++) {
      const card = document.createElement('div');
      card.className = 'card';

      const header = document.createElement('div');
      header.style.backgroundImage = `url('${productsList[num].thumbnail}')`;

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      const title = document.createElement('h5');
      title.textContent = `${productsList[num].title}`;

      const description = document.createElement('p');
      description.textContent = `${productsList[num].description}`;

      const footer = document.createElement('div');
      footer.className = 'card-footer';

      const price = document.createElement('p');
      price.textContent = `Price: ${productsList[num].price}$`;

      const rating = document.createElement('p');
      rating.textContent = `Rating: ${productsList[num].rating}`;

      footer.append(price, rating);
      cardBody.append(title, description);
      card.append(header, cardBody, footer);
      wrapper.append(card);
    }
  });

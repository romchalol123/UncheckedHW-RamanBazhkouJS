fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    const productsList = data.products;
    const wrapper = document.querySelector('.wrapper');

    for (let num = 0; num < productsList.length; num++) {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.padding = '0';
      card.style.overflow = 'hidden';

      if (window.innerWidth < 768) {
          card.style.width = '95%';
          card.style.margin = '5px auto';
      } else if (window.innerWidth >= 768) {
        card.style.width = '23%';
        card.style.margin = '7px';
      }

      const header = document.createElement('div');
      header.style.cssText = ` background: url('${productsList[num].thumbnail}') top center;
        height: 150px;
        background-size:cover;
      `;

      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
      cardBody.style.padding = '10px';

      const title = document.createElement('h5');
      title.textContent = `${productsList[num].title}`;

      const description = document.createElement('p');
      description.textContent = `${productsList[num].description}`;

      const footer = document.createElement('div');
      footer.className = 'card-footer';
      footer.style.cssText = ` display: flex;
        justify-content: space-between;
        margin: 10px;
        font-size: 12px;
        padding: 5px;
      `;

      const price = document.createElement('p');
      price.textContent = `Price: ${productsList[num].price}$`;

      const rating = document.createElement('p');
      rating.textContent = `Rating: ${productsList[num].rating}`;

      footer.append(price, rating);
      cardBody.append(title, description);
      card.append(header, cardBody, footer);
      wrapper.append(card);

      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          card.style.width = '23%';
          card.style.margin = '7px';
        } else if (window.innerWidth < 768) {
          card.style.width = '95%';
          card.style.margin = '5px auto';
        }
      });
    }
  });

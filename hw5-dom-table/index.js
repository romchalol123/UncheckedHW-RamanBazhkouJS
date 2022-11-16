fetch('https://dummyjson.com/products')
  .then((res) => res.json())
  .then((data) => {
    const productsList = data.products;
    const wrapper = document.querySelector('.wrapper');

    function createHeaderImage(databaseEl){
      const headerImg = document.createElement('img');
      headerImg.className = 'card-img-top h-100';
      headerImg.setAttribute('src', `${databaseEl.thumbnail}`);
      headerImg.setAttribute('alt', `${databaseEl.title}`);

      return headerImg;
    }

    function createHeader(databaseEl){
      const header = document.createElement('div');
      header.className = 'header';

      header.append(createHeaderImage(databaseEl));

      return header;
    }

    function createTitle(databaseEl){
      const title = document.createElement('h5');
      title.textContent = `${databaseEl.title}`;

      return title;
    }

    function createDescription(databaseEl){
      const description = document.createElement('p');
      description.textContent = `${databaseEl.description}`;

      return description;
    }

    function createCardBody(databaseEl){
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';

      cardBody.append(createTitle(databaseEl), createDescription(databaseEl));

      return cardBody;
    }

    function createPrice(databaseEl){
      const price = document.createElement('p');
      price.className = 'footer-info';
      price.textContent = `Price: ${databaseEl.price}$`;

      return price;
    }

    function createRating(databaseEl){
      const rating = document.createElement('p');
      rating.className = 'footer-info';
      rating.textContent = `Rating: ${databaseEl.rating}`;

      return rating;
    }

    function createFooter(databaseEl){
      const footer = document.createElement('div');
      footer.className = 'card-footer';

      footer.append(createPrice(databaseEl), createRating(databaseEl));

      return footer;
    }

    function createCard(databaseEl){
      const card = document.createElement('div');
      card.className = 'card';

      card.append(createHeader(databaseEl), createCardBody(databaseEl), createFooter(databaseEl));
      
      return card;
    }
    
    function createCatalog(database){
      for (let num = 0; num < database.length; num++) {
        let card = createCard(database[num]);

        wrapper.append(card);
      }

      return;
    }

    createCatalog(productsList);
  });

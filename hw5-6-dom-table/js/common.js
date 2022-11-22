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
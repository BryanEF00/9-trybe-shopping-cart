function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const cartItem = document.querySelector('.cart__items');

const appendProduct = async () => {
  const section = document.querySelector('.items');
  const data = await fetchProducts('computador');
  await data.results.forEach((item) => {
    const { id, title, thumbnail } = item;
    section.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
};

const addToCart = async (event) => {
  const item = event.target;
  const productId = getSkuFromProductItem(item.parentNode);
  const data = await fetchItem(productId);

  const { id, title, price } = data;
  
  cartItem.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));

  const list = document.querySelector('.cart__items').innerHTML;

  /* Referência de como salvar o InnerHTML em JSON: https://stackoverflow.com/questions/53641447/how-to-store-a-list-in-localstorage */
  localStorage.clear();
  saveCartItems(JSON.stringify(list));
};

const addCartBtn = () =>
  document.querySelectorAll('.item__add')
  .forEach((value) => value.addEventListener('click', addToCart));

const loadData = () => {
  cartItem.innerHTML = JSON.parse(getSavedCartItems());
  document.querySelectorAll('li')
  .forEach((value) => value.addEventListener('click', cartItemClickListener));
};

window.onload = async () => {
  await appendProduct();
  addCartBtn();
  getSavedCartItems();
  loadData();
};

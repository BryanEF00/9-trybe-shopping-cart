/* Referência de como salvar o InnerHTML em JSON: https://stackoverflow.com/questions/53641447/how-to-store-a-list-in-localstorage */

/* Referência para verificar se o número é Float: https://www.horadecodar.com.br/2021/01/20/como-verificar-se-um-numero-e-decimal-em-javascript/ */

const cartItem = document.querySelector('.cart__items');
const itemPrice = document.querySelector('.total-price');
const emptyCartBtn = document.querySelector('.empty-cart');
const defaultValue = 0;

const isFloat = (value) => {
  if (parseInt(value, 10) !== parseFloat(value)) {
    return true;
  }
  return false;
};

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

const saveCartValue = (value) => {
  localStorage.setItem('cartValue', value);
};

function cartItemClickListener(event) {
  const removePrice = event.target.innerText.split('$', 2);

  const sum = parseFloat(itemPrice.innerText);
  const totalPrice = sum - parseFloat(removePrice[1]);

  itemPrice.innerText = totalPrice;
  saveCartValue(totalPrice);

  event.target.remove();

  const list = cartItem.innerHTML;

  localStorage.removeItem('cartItems');
  saveCartItems(JSON.stringify(list));
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const appendProduct = async () => {
  const section = document.querySelector('.items');
  const data = await fetchProducts('computador');
  await data.results.forEach((item) => {
    const { id, title, thumbnail } = item;
    section.appendChild(createProductItemElement({ sku: id, name: title, image: thumbnail }));
  });
  removeLoading();
};

const cartTotalPrice = (price) => {
  const sum = parseFloat(itemPrice.innerText);
  const totalPrice = sum + price;
  const verifyValue = isFloat(totalPrice) ? totalPrice : parseInt(totalPrice, 10);

  itemPrice.innerText = verifyValue;

  saveCartValue(verifyValue);
};

const addToCart = async (event) => {
  const item = event.target;
  const productId = getSkuFromProductItem(item.parentNode);
  const data = await fetchItem(productId);

  const { id, title, price } = data;

  cartItem.appendChild(createCartItemElement({ sku: id, name: title, salePrice: price }));

  cartTotalPrice(price);

  const list = document.querySelector('.cart__items').innerHTML;

  localStorage.removeItem('cartItems');
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

const loadCartValue = () => {
  if (localStorage.getItem('cartValue')) itemPrice.innerHTML = localStorage.getItem('cartValue');
  if (parseFloat(localStorage.getItem('cartValue')) === 0) {
    itemPrice.innerHTML = defaultValue.toFixed(2);
  }
};

const clearCart = () => {
  const cartLi = cartItem.children;

  if (cartLi.length > 0) {
    document.querySelectorAll('li').forEach((value) => value.remove());

    localStorage.clear();

    itemPrice.innerText = defaultValue.toFixed(2);
  }
};

emptyCartBtn.addEventListener('click', clearCart);

const loadingScreen = () => {
  const bodyItems = document.querySelector('.items');
  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.innerText = 'carregando...';
  const loadingImg = document.createElement('div');
  loadingImg.classList.add('loadingImg');
  
  bodyItems.appendChild(loading);
  loading.appendChild(loadingImg);
};

const removeLoading = () => {
  const loadingMsg = document.querySelector('.loading');

  loadingMsg.remove();
};

window.onload = async () => {
  loadingScreen();
  await appendProduct();
  addCartBtn();
  getSavedCartItems();
  loadData();
  loadCartValue();
};

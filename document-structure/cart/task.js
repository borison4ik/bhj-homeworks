'use strict';

const cartEl = document.querySelector('.cart');
const cartProductsEl = document.querySelector('.cart__products');
const listProductsArr = [...document.querySelectorAll('.product')];

let cartStore = [];

listProductsArr.forEach((product) => {
  product.querySelector('.product__add').addEventListener('click', () => {
    const id = product.dataset.id;
    const quantity = Number.parseInt(product.querySelector('.product__quantity-value').innerText);
    const title = product.querySelector('.product__title').innerText;
    const imgUrl = product.querySelector('.product__image').src;

    const productObj = {
      id,
      quantity,
      title,
      imgUrl,
    };

    addToCart(productObj);
    renderCart();

    console.log(cartStore);
  });
  product.querySelector('.product__quantity-controls').addEventListener('click', (evt) => {
    const qv = product.querySelector('.product__quantity-value');
    let value = Number.parseInt(qv.innerText);

    if (evt.target.classList.contains('product__quantity-control_dec')) {
      console.log('уменьшаем');
      if (!Number.isNaN(value) && value > 1) {
        qv.innerText = value - 1;
      }
    } else if (evt.target.classList.contains('product__quantity-control_inc')) {
      console.log('увеличиваем');
      if (!Number.isNaN(value)) {
        qv.innerText = value + 1;
      }
    }
  });
});

function addToCart(productObj) {
  const addedProduct = cartStore.find((product) => product.id === productObj.id);
  if (addedProduct) {
    addedProduct.quantity = addedProduct.quantity + productObj.quantity;
  } else {
    cartStore = [...cartStore, productObj];
  }
}

function addToStore() {}

function removeFromStore() {}

function renderCart() {
  cartProductsEl.innerHTML = '';

  cartStore.forEach((product) => {
    cartProductsEl.appendChild(createCartItem(product));
  });
}

function createCartItem(obj) {
  const cartProduct = document.createElement('div');
  cartProduct.classList.add('cart__product');
  cartProduct.dataset.id = obj.id;
  const img = document.createElement('img');
  img.classList.add('cart__product-image');
  img.src = obj.imgUrl;
  const count = document.createElement('div');
  count.classList.add('cart__product-count');
  count.innerText = obj.quantity;

  cartProduct.appendChild(img);
  cartProduct.appendChild(count);

  return cartProduct;
}

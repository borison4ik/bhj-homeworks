'use strict';

const cartEl = document.querySelector('.cart');
const cartProductsEl = document.querySelector('.cart__products');
const listProductsArr = [...document.querySelectorAll('.product')];
let cartStore = [];

// gey carg from localSorage
getFromSore();
// filling cart
renderCart();

// listeners
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

cartEl.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('cart__product-dell')) {
    const delBtn = evt.target;
    removeFromCart(delBtn.dataset.id);
    renderCart();
  }
});

// cart functions
function addToCart(productObj) {
  const addedProduct = cartStore.find((product) => product.id === productObj.id);

  animateAddToCatr(productObj, () => {
    if (addedProduct) {
      addedProduct.quantity = addedProduct.quantity + productObj.quantity;
    } else {
      cartStore = [...cartStore, productObj];
    }
    pushToStore();
    renderCart();
  });
}

function removeFromCart(id) {
  cartStore = cartStore.filter((item) => item.id !== id);
  pushToStore();
}

function renderCart() {
  cartProductsEl.innerHTML = '';

  if (cartStore.length) {
    cartStore.forEach((product) => {
      cartProductsEl.appendChild(createCartItem(product));
    });
    cartEl.classList.add('show-cart');
  } else {
    if (cartEl.classList.contains('show-cart')) {
      cartEl.classList.remove('show-cart');
    }
  }
}

// animate cart function
function animateAddToCatr(productObj, animationCalback) {
  const id = productObj.id;
  const productEl = document.querySelector(`.product[data-id="${id}"]`);
  const img = productEl.getElementsByTagName('img')[0];
  const cloneImg = img.cloneNode(true);
  let fromTop = img.getBoundingClientRect().top;
  let fromLeft = img.getBoundingClientRect().left;

  cloneImg.style.position = 'absolute';
  cloneImg.style.zIndex = '9999';
  document.body.appendChild(cloneImg);

  const productCartEl = cartProductsEl.querySelector(`.cart__product[data-id="${id}"]`);
  const cartImg = productCartEl && productCartEl.querySelector('img');

  let toTop, toLeft;

  if (!cartImg) {
    toTop = cartEl.getBoundingClientRect().height + cloneImg.getBoundingClientRect().height;
    toLeft = cartEl.getBoundingClientRect().left;
  } else {
    toTop = cartImg.getBoundingClientRect().top;
    toLeft = cartImg.getBoundingClientRect().left;
  }

  const startTime = Date.now();
  const duration = 500;
  const tik = 5;

  let diffTop = toTop - fromTop;
  let diffLeft = toLeft - fromLeft;

  const animTimer = setInterval(() => {
    const timeDuration = Date.now() - startTime;

    fromTop += diffTop / (duration / tik);
    fromLeft += diffLeft / (duration / tik);

    if (timeDuration < duration) {
      cloneImg.style.top = fromTop + 'px';
      cloneImg.style.left = fromLeft + 'px';
    } else {
      cloneImg.remove();
      clearInterval(animTimer);
      animationCalback();
      return;
    }
  }, tik);
}

// store functions
function pushToStore() {
  localStorage.setItem('cartStore', JSON.stringify(cartStore));
}

function getFromSore() {
  const getLocalStorage = localStorage.getItem('cartStore');
  if (getLocalStorage !== null) {
    cartStore = JSON.parse(getLocalStorage);
  }
}

// create function
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
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('cart__product-dell');
  deleteBtn.innerText = 'x';
  deleteBtn.dataset.id = obj.id;

  cartProduct.appendChild(img);
  cartProduct.appendChild(count);
  cartProduct.appendChild(deleteBtn);

  return cartProduct;
}

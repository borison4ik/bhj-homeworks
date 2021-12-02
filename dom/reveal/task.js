'use strict';

document.addEventListener('DOMContentLoaded', load);

function load() {
  const el = [...document.querySelectorAll('.reveal')];
  window.addEventListener('scroll', scroll.bind(el));
}

function scroll() {
  this.forEach((element) => {
    const elTop = element.getBoundingClientRect().top;
    const elBottom = element.getBoundingClientRect().bottom;
    const elHeight = elBottom - elTop;

    if (elTop <= window.innerHeight / 2) {
      element.classList.add('reveal_active');
    }
    if (elTop <= window.innerHeight / 2 && elBottom <= elHeight) {
      element.classList.remove('reveal_active');
    }
    if (elBottom > window.innerHeight / 2 + elHeight) {
      element.classList.remove('reveal_active');
    }
  });
}

'use strict';
class DropDown {
  constructor(selector) {
    this.dropdowns = [...document.querySelectorAll(selector)];
    this.menuClass = 'dropdown__list';
    this.valueClass = 'dropdown__value';
    this.menuActiveClass = 'dropdown__list_active';
    this.itemClass = 'dropdown__list';
    this.linkCkass = 'dropdown__link';
  }

  init() {
    this.dropdowns.forEach((drop) => {
      this.subscriber(drop);
    });
  }

  onclick(e) {
    e.preventDefault();
    const target = e.target;
    const currentDrop = e.currentTarget;
    if (target.classList.contains(this.linkCkass)) {
      this.setDropValue(target, currentDrop);
    }
    this.toggleMenu(currentDrop);
  }

  setDropValue(target, currentDrop) {
    const value = target.textContent;
    const dropdownValue = currentDrop.querySelector(`.${this.valueClass}`);
    dropdownValue.textContent = value;
  }

  toggleMenu(currentDrop) {
    const menu = currentDrop.querySelector(`.${this.menuClass}`);
    menu.classList.toggle(this.menuActiveClass);
  }

  subscriber(drop) {
    drop.onclick = this.onclick.bind(this);
  }

  closeAll() {
    this.dropdowns.forEach((drop) => {
      drop.querySelector(`.${this.menuClass}`).classList.remove(this.menuActiveClass);
    });
  }
}

const dropdown = new DropDown('.dropdown');

dropdown.init();

document.body.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    dropdown.closeAll();
  }
});

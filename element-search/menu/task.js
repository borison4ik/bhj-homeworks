'use strict';

class Menu {
  constructor(selector) {
    this.menu = document.querySelector(selector);
    this.links = [...this.menu.querySelectorAll('.menu__link')];
    this.subMenus = [...this.menu.querySelectorAll('.menu_sub')];

    this.links.forEach((link) => {
      link.addEventListener('click', this.#handleClick);
    });
  }

  #handleClick = (event) => {
    const parent = event.target.closest('.menu__item');
    const subMenu = parent.querySelector('.menu_sub');
    if (subMenu) {
      event.preventDefault();
      this.#onToggleMenu(subMenu);
    }
  };

  #onToggleMenu = (currentSubMenu) => {
    this.subMenus.forEach((subMenu) => {
      if (currentSubMenu !== subMenu && subMenu.classList.contains('menu_active')) {
        subMenu.classList.remove('menu_active');
      }
    });
    currentSubMenu.classList.toggle('menu_active');
  };

  closeAll() {
    this.subMenus.forEach((subMenu) => {
      subMenu.classList.contains('menu_active') && subMenu.classList.remove('menu_active');
    });
  }
}

const mainMenu = new Menu('.menu_main');
const secondMenu = new Menu('.menu_second');

document.body.addEventListener('click', (e) => {
  if (!e.target.closest('.menu')) {
    mainMenu.closeAll();
    secondMenu.closeAll();
  }
});

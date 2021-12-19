'use strict';

class Modal {
  constructor(el) {
    this.modal = el;
    this.classActive = 'modal_active';

    this.closeBtn = el.querySelector('.modal__close');
    this.closeBtn.addEventListener('click', this.close.bind(this));

    if (
      document.cookie.replace(/(?:(?:^|.*;\s*)closeModal\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== 'true'
    ) {
      this.modal.classList.add(this.classActive);
    }
  }

  close() {
    this.modal.classList.remove(this.classActive);
    document.cookie = 'closeModal=true';
  }
}

const modal = new Modal(document.getElementById('subscribe-modal'));

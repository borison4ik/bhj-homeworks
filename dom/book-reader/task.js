'use strict';
class BookAccessibility {
  constructor(className) {
    this.books = [...document.querySelectorAll(`.${className}`)];
    this.bookClasses = {
      fsClasses: [
        { type: 'small', className: 'book_fs-small' },
        { type: 'big', className: 'book_fs-big' },
      ],
      colorClasses: [
        { type: 'black', className: 'book_color-black' },
        { type: 'gray', className: 'book_color-gray' },
        { type: 'whitesmoke', className: 'book_color-whitesmoke' },
      ],
      bgClasses: [
        { type: 'black', className: 'book_bg-black' },
        { type: 'gray', className: 'book_bg-gray' },
        { type: 'white', className: 'book_bg-white' },
      ],
    };
    this.fszClass = 'font-size_active';
    this.colorClass = 'color_active';

    this.booksMap = new Map();

    this.books.forEach((book) => {
      this.booksMap.set(book, {
        fsControls: [...book.querySelectorAll('.book__control_font-size a.font-size')],
        colorControls: [...book.querySelectorAll('.book__control_color a.color')],
        bgControls: [...book.querySelectorAll('.book__control_background a.color')],
        content: book.querySelector('.book__content'),
      });
    });
  }
  /**
   *
   * @param {Object} settings объект настроек класса
   */

  init() {
    this.books.forEach((book) => {
      book.addEventListener('click', this.onClickHandler.bind(this));
    });
  }

  onClickHandler(evt) {
    evt.preventDefault();

    const target = evt.target;
    const currentTarget = evt.currentTarget;

    const activeClass = this.calculateActiveClass(target, this.booksMap.get(currentTarget));
    target.classList.add(activeClass);

    this.setClasses(currentTarget, this.getClasses(this.booksMap.get(currentTarget)));
  }

  getClasses(...props) {
    const classNames = new Set();
    const [{ fsControls, colorControls, bgControls }] = props;

    const fsSize = fsControls.find((link) => link.classList.contains('font-size_active')).dataset
      .size;
    const textColor = colorControls.find((link) => link.classList.contains(this.colorClass)).dataset
      .textColor;
    const bgColor = bgControls.find((link) => link.classList.contains(this.colorClass)).dataset
      .bgColor;

    classNames.add(
      this.bookClasses.fsClasses.find((item) => item.type === fsSize)?.className || '',
    );
    classNames.add(
      this.bookClasses.colorClasses.find((item) => item.type === textColor)?.className,
    );
    classNames.add(this.bookClasses.bgClasses.find((item) => item.type === bgColor)?.className);

    return classNames;
  }

  setClasses(currentTarget, classNames) {
    currentTarget.className = ['book', ...classNames.values()].join(' ');
  }

  calculateActiveClass(...props) {
    const [target, { fsControls, colorControls, bgControls }] = props;

    if (target.classList.contains('font-size') && !target.classList.contains(this.fszClass)) {
      fsControls.forEach((link) => {
        link.classList.contains(this.fszClass) && link.classList.remove(this.fszClass);
      });
      return this.fszClass;
    }

    if (target.classList.contains('color') && !target.classList.contains(this.colorClass)) {
      if (target.closest('.book__control_color')) {
        colorControls.forEach((link) => {
          link.classList.contains(this.colorClass) && link.classList.remove(this.colorClass);
        });
      }

      if (target.closest('.book__control_background')) {
        bgControls.forEach((link) => {
          link.classList.contains(this.colorClass) && link.classList.remove(this.colorClass);
        });
      }

      return this.colorClass;
    }
  }
}

const accessibility = new BookAccessibility('book');

accessibility.init();

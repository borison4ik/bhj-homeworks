'use strict';
class Slider {
  constructor(selector) {
    if (!selector) {
      console.error('не указан селектор слайдера');
      return;
    }

    this.slider = document.querySelector(selector);
    this.sliderItems = [...this.slider.querySelectorAll('.slider__item')];
    this.dots = [...this.slider.querySelectorAll('.slider__dots .slider__dot')];
    console.log(this.dots);
    [this.sliderArrowPrew, this.sliderArrowNext] = [
      ...this.slider.querySelectorAll('.slider__arrows .slider__arrow'),
    ];

    this.activeSlideClass = 'slider__item_active';
    this.activeDotClass = 'slider__dot_active';
    this.activeSlide = this.sliderItems.findIndex((slide) =>
      slide.classList.contains(this.activeSlideClass),
    );

    this.dots[this.activeSlide].classList.add(this.activeDotClass);

    this.sliderArrowPrew.onclick = this.prev;
    this.sliderArrowNext.onclick = this.next;

    this.dots.forEach((dot) => (dot.onclick = this.onClickDot));
  }

  next = () => {
    if (this.activeSlide < this.sliderItems.length - 1) {
      this.activeSlide += 1;
    } else {
      this.activeSlide = 0;
    }
    this.setActiveSlide();
    this.setActiveDote();
  };

  prev = () => {
    if (this.activeSlide === 0) {
      this.activeSlide = this.sliderItems.length - 1;
    } else {
      this.activeSlide -= 1;
    }
    this.setActiveSlide();
    this.setActiveDote();
  };

  setActiveSlide() {
    this.sliderItems.forEach((slider) => slider.classList.remove(this.activeSlideClass));
    this.sliderItems[this.activeSlide].classList.add(this.activeSlideClass);
  }

  setActiveDote() {
    this.dots.forEach((dot) => dot.classList.remove(this.activeDotClass));
    this.dots[this.activeSlide].classList.add(this.activeDotClass);
  }

  onClickDot = (e) => {
    const targetDot = e.target;
    const indexDot = this.dots.findIndex((dot) => dot === targetDot);
    this.activeSlide = indexDot;
    this.setActiveDote();
    this.setActiveSlide();
  };
}

const slired = new Slider('.slider');

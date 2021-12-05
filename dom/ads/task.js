'use strict';
document.addEventListener('DOMContentLoaded', load);

function load() {
  const rotators = [...document.querySelectorAll('.rotator')];

  rotators.forEach((element) => {
    onStartRotate(element);
  });
}

function onStartRotate(element) {
  const phrases = [...element.children];
  let current = phrases[0];

  onChangePhrase(phrases, current);
}

function onChangePhrase(phrases, current) {
  const speed = getSpeed(current);
  const color = getColor(current);

  setTimeout(() => {
    current.classList.contains('rotator__case_active') &&
      current.classList.remove('rotator__case_active');
    current = current.nextElementSibling ? current.nextElementSibling : phrases[0];
    current.classList.add('rotator__case_active');
    onChangeColor(current, color);

    onChangePhrase(phrases, current);
  }, speed);
}

function onChangeColor(el, color) {
  el.style.color = color ? color : '';
}

function getSpeed(el) {
  return Number.parseInt(el.dataset.speed) || Math.floor(1 + Math.random() * 20) * 100;
}

function getColor(el) {
  return el.dataset.color ? el.dataset.color : '#000000';
}

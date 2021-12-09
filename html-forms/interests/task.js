'use strict';

document.addEventListener('DOMContentLoaded', load);

function load() {
  const checkBoxses = [...document.querySelectorAll('input[type="checkbox"]')];

  checkBoxses.forEach((checkbox) => {
    checkbox.addEventListener('change', check);
  });

  function check(evt) {
    const target = evt.target;

    checkCildren(target);
    checkParent(target);
  }

  function checkCildren(target) {
    const state = target.checked;

    const targetParent = target.closest('li');
    const childrenUl = targetParent && targetParent.querySelector('ul');

    const childrenCheckBoxes = childrenUl && [
      ...childrenUl.querySelectorAll('input[type="checkbox"]'),
    ];
    childrenCheckBoxes &&
      childrenCheckBoxes.forEach((checkbox) => {
        checkbox.checked = state;
      });
  }

  function checkParent(target) {
    let status = true;
    const section = target.closest('ul').closest('li');
    const sectionUl = section && [...section.querySelectorAll('ul>li')];

    sectionUl &&
      sectionUl.forEach((li) => {
        const input = li.querySelector('input[type="checkbox"]');

        if (!input.checked) {
          status = false;
        }
      });

    if (section) {
      section.querySelector('input[type="checkbox"]').checked = status;
    }
  }
}

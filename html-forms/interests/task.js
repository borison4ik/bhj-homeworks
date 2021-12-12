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
    let checkedElements = 0;

    const tagretParentCheckbox = target
      ?.closest('li')
      ?.closest('ul')
      ?.previousElementSibling?.querySelector('label>input[type="checkbox"]');

    if (tagretParentCheckbox) {
      const targetSiblingsCheckboxes = [
        ...tagretParentCheckbox?.parentElement?.nextElementSibling?.children,
      ];

      if (tagretParentCheckbox) {
        targetSiblingsCheckboxes.forEach((liElement) => {
          if (liElement?.querySelector('label').querySelector('input[type="checkbox"]').checked) {
            checkedElements += 1;
          }
        });
      }

      if (checkedElements === 0) {
        tagretParentCheckbox.checked = false;
        tagretParentCheckbox.indeterminate = false;
      } else if (checkedElements === targetSiblingsCheckboxes.length) {
        tagretParentCheckbox.indeterminate = false;
        tagretParentCheckbox.checked = true;
      } else if (checkedElements < targetSiblingsCheckboxes.length) {
        tagretParentCheckbox.indeterminate = true;
        tagretParentCheckbox.checked = false;
      }

      checkParent(tagretParentCheckbox);
    }
  }
}

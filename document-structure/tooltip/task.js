'use strict';

document.addEventListener('DOMContentLoaded', load);

function load() {
  const tooltip = createTooltip();
  document.body.insertAdjacentElement('beforeend', tooltip);

  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('has-tooltip')) {
      evt.preventDefault();
      showTooltip(evt.target, tooltip);
    }
  });

  function showTooltip(target, tooltip) {
    tooltip.innerText = target.innerText;
    const position = target.dataset.position;
    const { top, bottom, left, right, width, height } = target.getBoundingClientRect();

    if (position === 'top') {
      tooltip.style.top = top - 35 + 'px';
      tooltip.style.left = left + 'px';
    }

    if (position === 'bottom') {
      tooltip.style.top = bottom + 5 + 'px';
      tooltip.style.left = left + 'px';
    }

    if (position === 'right') {
      tooltip.style.top = top + 'px';
      tooltip.style.left = left + width + 5 + 'px';
    }

    if (position === 'left') {
      tooltip.style.top = top + 'px';
      tooltip.style.left = left - width - 15 + 'px';
    }

    if (tooltip.classList.contains('tooltip_active')) {
      tooltip.classList.remove('tooltip_active');
    } else {
      tooltip.classList.add('tooltip_active');
    }
  }

  function createTooltip() {
    const div = document.createElement('div');
    div.classList.add('tooltip');
    div.style.position = 'absolute';
    div.style.top = 0;
    div.style.left = 0;

    return div;
  }
}

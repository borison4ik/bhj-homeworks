'use strict';
const countDeadMoleEl = document.getElementById('dead');
const countMissedEl = document.getElementById('lost');

let deadMole = 0;
let lostMole = 0;

const getHole = (index) => document.getElementById(`hole${index}`);
const handleClickHole = (el) => {
  if (el.classList.contains('hole_has-mole')) {
    deadMole += 1;
    countDeadMoleEl.textContent = deadMole;
  } else {
    lostMole += 1;
    countMissedEl.textContent = lostMole;
  }
};
const reset = (el) => {
  deadMole = 0;
  lostMole = 0;
  countDeadMoleEl.textContent = deadMole;
  countMissedEl.textContent = lostMole;
};
const checkResult = () => {
  if (deadMole >= 10) {
    alert('Победа!');
    reset();
  }
  if (lostMole >= 5) {
    alert('Вы проиграли!');
    reset();
  }
};

for (let i = 1; i <= 9; i += 1) {
  getHole(i).onclick = (e) => {
    handleClickHole(e.target);
    checkResult();
  };
}

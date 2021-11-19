'use strict';
class CountDown {
  constructor(timerEl, callback) {
    this.timerId = null;
    this.timerEl = timerEl;
    [this.initSeconds = 0, this.initMinutes = 0, this.initHours = 0] = timerEl.textContent
      .split(':')
      .reverse();
    this.final = (f) => f;
  }

  init() {
    const nowTime = new Date();
    const deadLineTime = new Date(
      nowTime.getFullYear(),
      nowTime.getMonth(),
      nowTime.getDate(),
      nowTime.getHours() + Number.parseInt(this.initHours),
      nowTime.getMinutes() + Number.parseInt(this.initMinutes),
      nowTime.getSeconds() + Number.parseInt(this.initSeconds),
    );
    let differenceTime = deadLineTime - nowTime;
    let hh = 0;
    let mm = 0;
    let ss = 0;
    this.timerId = setInterval(() => {
      hh = differenceTime > 0 ? Math.floor(differenceTime / 1000 / 60 / 60) % 24 : 0;
      mm = differenceTime > 0 ? Math.floor(differenceTime / 1000 / 60) % 60 : 0;
      ss = differenceTime > 0 ? Math.floor(differenceTime / 1000) % 60 : 0;
      hh = hh < 10 ? '0' + hh : hh;
      mm = mm < 10 ? '0' + mm : mm;
      ss = ss < 10 ? '0' + ss : ss;
      this.timerEl.textContent = `${hh}:${mm}:${ss}`;
      differenceTime = deadLineTime - new Date().getTime();
      if (differenceTime <= 0) {
        clearInterval(this.timerId);
        this.final();
      }
    }, 1000);
  }
}

const firstCountDown = new CountDown(document.getElementById('timer'));
const secondCountDown = new CountDown(document.getElementById('timer2'));

firstCountDown.final = () => {
  alert('Вы победили в конкурсе!');
  secondCountDown.init();
};
secondCountDown.final = () => {
  const donloadLinkEl = document.getElementById('downloadId');
  donloadLinkEl.click();
};

firstCountDown.init();

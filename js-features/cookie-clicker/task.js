'use strict';
class ClickerCouner {
  constructor(targetId, clickCounterId, speedCounterId) {
    this.target = document.getElementById(targetId);
    this.clickCounterEl = document.getElementById(clickCounterId);
    this.speedCounterEl = document.getElementById(speedCounterId);
    this.clicked = false;
    this.lastClickTime = 0;
    this.clickCount = 0;
    this.speedClickPerSecond = 0;
  }

  init() {
    this.target.onclick = () => {
      if (!this.clicked) {
        this.target.width = this.target.width * 1.1;
        this.target.height = this.target.height * 1.1;
      } else {
        this.target.width = this.target.width / 1.1;
        this.target.height = this.target.height / 1.1;
      }
      this.clicked = !this.clicked;
      this.clickCount += 1;
      this.clickCounterEl.textContent = this.clickCount;
      if (!this.lastClickTime) {
        this.lastClickTime = new Date().getTime();
      } else {
        this.speedClickPerSecond = 1 / ((new Date().getTime() - this.lastClickTime) / 1000);
        this.speedCounterEl.textContent = this.speedClickPerSecond.toFixed(2);
      }
      this.lastClickTime = new Date().getTime();
    };
  }
}

const clicker = new ClickerCouner('cookie', 'clicker__counter', 'speed__counter');
clicker.init();

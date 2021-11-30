class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timeElement = container.querySelector('.status__time');
    this.reset();

    this.time = Number.parseInt(this.wordElement.children.length);
    this.timeElement.textContent = this.time;
    this.timer = null;
    this.startTimer();
    this.registerEventsBinded = this.registerEvents.bind(this);
    document.addEventListener('keydown', this.registerEventsBinded);
  }

  startTimer() {
    this.time = Number.parseInt(this.wordElement.children.length);
    this.timeElement.textContent = this.time;

    this.timer = setInterval(() => {
      if (this.time > 0) {
        this.time -= 1;
        this.timeElement.textContent = this.time;
      }
      if (this.time === 0) {
        this.fail();
        this.stopTimer();
        this.setNewWord();
        this.startTimer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents(evt) {
    if (evt.key === 'Shift' || evt.key === 'Alt') {
      return;
    }
    if (this.currentSymbol.textContent.toLowerCase() === evt.key.toLowerCase()) {
      this.timeout = null;
      this.success();
    } else {
      this.fail();
    }
  }

  success() {
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;
    if (this.currentSymbol !== null) {
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    this.stopTimer();
    this.startTimer();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
  }

  getWord() {
    const words = [
        'я есть bob',
        'awesome код',
        'я люблю netology',
        'hello это привет',
        'супер kitty',
        'rock n roll это не работа',
        'youtube новое ТВ',
        'кино и popcorn',
        'cinema три дэ',
        'I love маму',
        'я люблю javascript',
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map((s, i) => `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`)
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

const game = new Game(document.getElementById('game'));

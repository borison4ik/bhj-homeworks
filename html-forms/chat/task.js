'use strict';

document.addEventListener('DOMContentLoaded', load);

function load() {
  const state = {
    botAnswers: [
      'Не понимаю вопрос(',
      'Повтори ка',
      'Может быть',
      'В Другой раз)',
      'Привет!',
      'Позже',
      'Наверно',
      'Пока!'
    ],
    botQuestions: [
      'Как дела?',
      'Чем еще могу помочь?',
      'Как тебя зовут?',
      'Познакомимся?',
      'Тебе одиноко?',
      'Что хочешь?',
      'Выпьем?'
    ],
  };
  const chatBtnEl = document.querySelector('.chat-widget__side');
  const chatWidgetEl = document.querySelector('.chat-widget');
  const chatWidgetContainer = document.querySelector('.chat-widget__messages-container');
  const messagesList = document.querySelector('.chat-widget__messages');
  const chatWidgetInputEl = document.querySelector('.chat-widget__input');
  let timeout = null;
  let botTimeout = null;
  let lastClienMessage = '';

  document.body.addEventListener('click', documentClickHandler);
  chatWidgetInputEl.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      sendMessage('CLIENT');
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        sendMessage('BOT');
        clearTimeout(botTimeout);
        startBotTimer();
      }, 2000);
    }
  });
  function documentClickHandler(evt) {
    const path = evt.path;

    if (path.includes(chatBtnEl)) {
      showChatWidget();
      startBotTimer();
    }
  }

  function startBotTimer() {
    botTimeout = setTimeout(() => {
      sendMessage('BOT', 'QUESTION');
      startBotTimer();
    }, 15000)
  }

  function showChatWidget() {
    chatWidgetEl.classList.add('chat-widget_active');
  }

  function sendMessage(action, ...props) {
    const time = getTime();

    if (action === 'CLIENT') {
      if (!!chatWidgetInputEl.value) {
        const text = chatWidgetInputEl.value;
        lastClienMessage = text;
        const message = createMessage(action, time, text);
        messagesList.appendChild(message);
        chatWidgetInputEl.value = '';
      }
    }

    if (action === 'BOT') {
      const text = getBotMessage(props);
      const message = createMessage(action, time, text);
      messagesList.appendChild(message);
    }
    
    let isScrolled =
      (chatWidgetContainer.offsetHeight + chatWidgetContainer.scrollTop) < (chatWidgetContainer.scrollHeight);

    if (isScrolled) {
      chatWidgetContainer.scrollTop = chatWidgetContainer.scrollHeight;
    }
  }

  function createMessage(action, time, text) {
    const messageEl = document.createElement('div');
    const messageTimeEl = document.createElement('div');
    const messageTextEl = document.createElement('div');

    messageEl.classList.add('message');
    if (action === 'CLIENT') {
      messageEl.classList.add('message_client');
    }
    messageTimeEl.classList.add('message__time');
    messageTextEl.classList.add('message__text');

    messageTimeEl.textContent = time;
    messageTextEl.textContent = text;
    messageEl.appendChild(messageTimeEl);
    messageEl.appendChild(messageTextEl);
    return messageEl;
  }

  function getBotMessage(props) {
    if([...props].includes('QUESTION') || !lastClienMessage.includes('?')){
      const rnd = Math.floor(Math.random() * state.botQuestions.length);
      return state.botQuestions[rnd];
    }

    const rnd = Math.floor(Math.random() * state.botAnswers.length);
    return state.botAnswers[rnd];

  }

  async function getQuestion() {
    const response = await fetch('http://jservice.io/api/random?count=1');
    const json = await response.json();
    const text = json[0].question;
    return text;
  }

  function getTime() {
    const time = `${
      new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
    }:${new Date().getMinutes()}`;
    return time;
  }
}

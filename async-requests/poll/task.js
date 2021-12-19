'use strict';

document.addEventListener('DOMContentLoaded', load);

function load() {
  const pollTitle = document.querySelector('#poll__title');
  const pollAnswers = document.querySelector('#poll__answers');

  const url = 'https://netology-slow-rest.herokuapp.com/poll.php';

  getQuestionFromSevrer(url);

  // получаем данные с сервера вызываем калбек
  function getQuestionFromSevrer(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
          const question = JSON.parse(xhr.responseText);
          renderQuestion(question);
          initListeners((answerId) => {
            sendAnswer(answerId, question, url);
          });
        } catch (error) {
          alert('Не удалось получить данные с сервера');
        }
      }
    };
  }

  // отправляем ответ на сервер через GET
  function sendAnswer(id, question, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    const query = `vote=${question.id}&answer=${id}`;
    console.log('отправляю ответ');
    xhr.send(query);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        try {
          const answer = JSON.parse(xhr.responseText);
          alert('Ваш вопрос засчитан!');
          renderAnswerStat(answer);
        } catch (error) {
          alert('Не удалось получить данные с сервера');
        }
      }
    };
  }

  // рисуем статистику
  function renderAnswerStat(obj) {
    pollAnswers.innerHTML = '';
    obj.stat.forEach((item) => {
      pollAnswers.innerHTML += `<p>${item.answer}: <strong>${item.votes}%</strong></p>`;
    });
  }

  // рисуем вопрос и варианты ответов
  function renderQuestion(dataObj) {
    pollTitle.innerHTML = '';
    pollAnswers.innerHTML = '';

    pollTitle.innerText = dataObj.data.title;

    dataObj.data.answers.forEach((answer, index) => {
      pollAnswers.innerHTML += `<button class="poll__answer" data-id="${index}">${answer}</button>`;
    });
  }

  // поскольку вставляю строкой иницилизирую листенеры
  function initListeners(callBack) {
    const pollAnswerBtn = [...document.querySelectorAll('.poll__answer')];

    pollAnswerBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        callBack(id);
      });
    });
  }
}

'use strict';

document.addEventListener('DOMContentLoaded', load);

function load() {
  const progress = document.getElementById('progress');
  const form = document.getElementById('form');
  const input = document.getElementById('file');
  const fileDesc = document.querySelector('.input__wrapper-desc');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = new FormData();
    data.append('file', input.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php', true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');

    xhr.upload.onloadstart = function (e) {
      console.log('onloadstart - старт загрузки');
      progress.value = 0;
      progress.max = e.total;
    };

    xhr.upload.onprogress = function (e) {
      console.log('загружено - ', e.loaded);
      progress.value = e.loaded;
      progress.max = e.total;
    };

    xhr.upload.onload = function (e) {
      form.reset();
      progress.value = 0;
      fileDesc.textContent = 'Имя файла...';
      console.log('load - загружен');
      console.log('=== Очистка формы ===');
    };

    xhr.upload.onloadend = function (e) {
      console.log('loadend - конец загрузки успешной или нет');
    };

    xhr.upload.onerror = function (e) {
      console.log('ошибка загрузки');
    };

    xhr.send(data);
  });
}

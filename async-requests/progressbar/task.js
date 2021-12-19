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
    xhr.send(data);
    xhr.upload.onloadstart = function (e) {
      progress.value = 0;
      progress.max = e.total;
    };
    xhr.upload.onprogress = function (e) {
      console.log(e.loaded);
      progress.value = e.loaded;
      progress.max = e.total;
    };
    xhr.onload = function (e) {
      form.reset();
      progress.value = 0;
      fileDesc.textContent = '';
      console.log('загружен');
    };
    xhr.onerror = function (e) {
      console.log('ошибка загрузки');
    };
  });
}

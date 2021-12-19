'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const loader = document.getElementById('loader');
  const itemListEl = document.getElementById('items');
  const url = 'https://netology-slow-rest.herokuapp.com';
  const storageName = 'ValuteData';
  let data = [];
  console.log(getLocalStorage(storageName));

  // если в хранилище данных нет делаем запрос на сервер
  if (
    !getLocalStorage(storageName) ||
    (Array.isArray(getLocalStorage(storageName)) && !getLocalStorage(storageName).length)
  ) {
    loader.classList.add('loader_active');
    getDataFromSevrer(url);
  } else {
    // иначе достаем данные из хранилища
    // показываем и делаем запрос на обновление в фоне
    data = getLocalStorage(storageName);
    renderData(data);
    getDataFromSevrer(url);
  }

  // получаем данные с сервера выполняем калбеки с результатами
  function getDataFromSevrer(url) {
    let newData;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        loader.classList.remove('loader_active');
        try {
          newData = JSON.parse(xhr.responseText).response.Valute;
          renderData(newData);
          setLocalStorage(storageName, newData);
        } catch (error) {
          alert('Не удалось получить данные с сервера');
        }
      }
    };
  }

  // рисуем DOM
  function renderData(dataObj) {
    itemListEl.innerHTML = '';

    for (let key in dataObj) {
      console.log(dataObj[key].CharCode, dataObj[key].Value);
      itemListEl.appendChild(getItem(dataObj[key]));
    }
  }

  // генерируем элемент разметки
  function getItem({ CharCode, Value }) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `<div class="item__code">
                          ${CharCode}
                      </div>
                      <div class="item__value">
                          ${Value}
                      </div>
                      <div class="item__currency">
                          руб.
                      </div>`;
    return item;
  }

  // запись данных в хранилище
  function setLocalStorage(storageName, data) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(storageName, jsonData);
  }

  // достаем данные из хранилища
  function getLocalStorage(string) {
    try {
      return JSON.parse(localStorage.getItem(string));
    } catch (error) {
      alert('Неудалось распарсить данные из хранилища');
    }
  }
});

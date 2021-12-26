'use strict';

document.addEventListener('DOMContentLoaded', load);

function load() {
  const form = document.getElementById('signin__form');
  const signInEl = document.getElementById('signin');
  const welcome = document.getElementById('welcome');
  const userId = document.getElementById('user_id');

  // check if user is already logged in
  showForm(
    localData({
      action: 'GET',
      name: 'auth',
    })?.isLoggined,
    localData({
      action: 'GET',
      name: 'auth',
    })?.user_id,
  );

  // xhr request func
  function request(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    xhr.onload = function () {
      callback(xhr.response);
    };

    xhr.send(data);
  }

  // listeners
  document.addEventListener('click', (evt) => {
    const target = evt.target;
    evt.preventDefault();

    if (target.id === 'signin__btn') {
      onSignIn();
    }

    if (target.id === 'signOut__btn') {
      onSignOut();
    }
  });

  // auth func
  function onSignIn() {
    // send a request to auth server
    request(
      'POST',
      'https://netology-slow-rest.herokuapp.com/auth.php',
      new FormData(form),
      (resp) => {
        try {
          const isLoggined = JSON.parse(resp).success;
          const user_id = JSON.parse(resp).user_id;

          // if auth false return
          if (!isLoggined) {
            alert('Неверный логин/пароль');
            return false;
          }

          // if user is logged, save obj in local storage
          localData({
            action: 'SET',
            name: 'auth',
            data: {
              user_id,
              isLoggined,
            },
          });

          // render forms
          showForm(isLoggined, user_id);
        } catch (err) {
          console.error(err.message);
        } finally {
          console.log('запрос обработан');
          form.reset();
        }
      },
    );
  }

  function onSignOut() {
    showForm(false);
    localData({
      action: 'SET',
      name: 'auth',
      data: {
        isLoggined: false,
        user_id: null,
      },
    });
  }

  // draw Forms
  function showForm(isLoggined, user_id) {
    if (isLoggined) {
      signInEl.classList.remove('signin_active');
      userId.textContent = user_id;
      welcome.classList.add('welcome_active');
    } else {
      signInEl.classList.add('signin_active');
      welcome.classList.remove('welcome_active');
    }
  }

  // localStorage
  function localData(options) {
    if (options?.action === 'SET' && options?.data) {
      localStorage.setItem(options.name, JSON.stringify(options.data));
    }

    if (options?.action === 'GET') {
      try {
        return JSON.parse(localStorage.getItem(options.name));
      } catch {
        console.error('неудалось доставть объект из хранилища');
      }
    }
  }
}

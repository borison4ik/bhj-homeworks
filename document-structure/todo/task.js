'use strict';

class Store {
  constructor(name) {
    this.storageName = name;
    this._data = [];

    this.getLocalStorage();
  }

  get data() {
    return this._data;
  }

  set data(newData) {
    this._data = [...newData];
  }

  add(obj) {
    const id = new Date().getTime();
    this.data = [
      ...this.data,
      {
        id,
        ...obj,
      },
    ];
    this.setLocalStorage();

    return id;
  }

  remove(id) {
    this.data = this.data.filter((item) => item.id != id);
    this.setLocalStorage();

    return this.data.length;
  }

  setLocalStorage() {
    localStorage.setItem(this.storageName, JSON.stringify(this.data));
  }

  getLocalStorage() {
    const getLocalStorage = localStorage.getItem(this.storageName);
    if (getLocalStorage !== null) {
      this.data = JSON.parse(getLocalStorage);
    }
  }
}

const todoStore = new Store('todoList');
const tasksEl = document.getElementById('tasks');
const todoForm = document.getElementById('tasks__form');
const todoInput = document.getElementById('task__input');
const todoAddBtn = document.getElementById('tasks__add');
const todoList = document.getElementById('tasks__list');

tasksEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.id === 'tasks__add') {
    if (todoInput.value.trim() != 0) {
      addTask({ text: todoInput.value });
    }
  }
  if (evt.target.classList.contains('task__remove')) {
    const taskId = evt.target.dataset.taskId;
    removeTask(taskId);
  }
});

updateTasks();

function removeTask(taskId) {
  todoStore.remove(taskId);
  updateTasks();
}

function updateTasks() {
  todoList.innerHTML = '';
  todoStore.data.forEach((item) => {
    todoList.appendChild(getNewTask(item.text, item.id));
  });
}

function addTask(obj) {
  const taskId = todoStore.add(obj);
  todoList.appendChild(getNewTask(obj.text, taskId));
  todoInput.value = '';
}

function getNewTask(text, taskId) {
  const newTaskEl = document.createElement('div');
  newTaskEl.classList.add('task');
  const newTaskTitleEl = document.createElement('div');
  newTaskTitleEl.classList.add('task__title');
  newTaskTitleEl.innerText = text;
  newTaskEl.appendChild(newTaskTitleEl);
  const newTaskRemoveLink = document.createElement('a');
  newTaskRemoveLink.href = '#';
  newTaskRemoveLink.dataset.taskId = taskId;
  newTaskRemoveLink.classList.add('task__remove');
  newTaskRemoveLink.innerHTML = '&times;';
  newTaskEl.appendChild(newTaskRemoveLink);

  return newTaskEl;
}

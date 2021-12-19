'use strict';

class TextEditor {
  constructor(el) {
    this.editor = el;
    this.cleanBtn = document.getElementById('editor_clean');
    this.lsname = 'texteditor';
    this.editor.value = this.getLocalStorage();
    this.editor.addEventListener('keyup', this.setText.bind(this));
    this.cleanBtn.addEventListener('click', this.removeText.bind(this));
  }

  setLocalStorage() {
    localStorage.setItem(this.lsname, this.editor.value);
  }

  getLocalStorage() {
    const getLocalStorage = localStorage.getItem(this.lsname);
    return getLocalStorage ? getLocalStorage : '';
  }

  setText(evt) {
    this.editor.value = evt.target.value;
    this.setLocalStorage();
  }

  removeText() {
    this.editor.value = '';
    this.setLocalStorage();
  }
}

const textEditor = new TextEditor(document.getElementById('editor'));

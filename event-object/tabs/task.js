'use strict';

class Tabs {
  constructor(className) {
    this.tabs = [...document.querySelectorAll(`.${className}`)];

    this.tabsMap = new Map();

    this.tabs.forEach((tab) => {
      this.tabsMap.set(tab, {
        tabNavArr: [...tab.querySelectorAll('.tab')],
        tabContentArr: [...tab.querySelectorAll('.tab__content')],
      });
    });

    this.tabLinkClass = 'tab';
    this.tabNavActiveClass = 'tab_active';
    this.tabContentActiveClass = 'tab__content_active';
  }

  init() {
    this.tabs.forEach((tab) => {
      tab.addEventListener('click', this.onClickHandler.bind(this));
    });
  }

  onClickHandler(evt) {
    const target = evt.target;
    const thisTab = evt.currentTarget;
    const { tabNavArr, tabContentArr } = this.tabsMap.get(thisTab);

    if (target.classList.contains(this.tabLinkClass)) {
      const activeContent = this.findActiveContent(tabNavArr, tabContentArr, target);

      this.clearActiveClasses(tabNavArr, this.tabNavActiveClass);
      this.clearActiveClasses(tabContentArr, this.tabContentActiveClass);

      this.setActiveClass(tabNavArr, target, this.tabNavActiveClass);
      this.setActiveClass(tabContentArr, activeContent, this.tabContentActiveClass);
    }
  }

  findActiveContent(fromArr, targetArr, target) {
    const targetIndex = fromArr.findIndex((item) => item === target);
    const activeContent = targetArr[targetIndex];
    return activeContent;
  }

  setActiveClass(arr, target, className) {
    arr.find((item) => item === target).classList.add(className);
  }

  clearActiveClasses(arr, className) {
    arr.forEach((item) => {
      if (item.classList.contains(className)) {
        item.classList.remove(className);
      }
    });
  }
}

const tabs = new Tabs('tabs');
tabs.init();

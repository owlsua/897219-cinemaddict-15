import {createElement} from '../utils.js';

const createSiteSortTemplate = () => {
  const sortItems = [
    {
      name: 'Sort by default',
      active: true,
    },
    {
      name: 'Sort by date',
      active: false,
    },
    {
      name: 'Sort by rating',
      active: false,
    },
  ];
  const genSortTemplate = (sortItem) => (
    `<li><a href="#" class="sort__button ${sortItem.active && 'sort__button--active'}">${sortItem.name}</a></li>`
  );
  return (
    `<ul class="sort">
      ${sortItems.map(genSortTemplate).join('')}
    </ul>`
  );};

export default class SiteSort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteSortTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


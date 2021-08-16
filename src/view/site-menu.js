import AbstractView from './abstract.js';

const createSiteMenuTemplate = (filters) => {
  const filterItemTemplate = (filter) => {
    const {name, count, key, active} = filter;
    return (
      `<a href="#watchlist" class="main-navigation__item ${active ? 'main-navigation__item--active' : ''}">${name} ${key !== 'all' ? `<span class="main-navigation__item-count">${count}</span>` : ''}</a>`
    );
  };
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filters && filters.map((item) => (filterItemTemplate(item))).join('')}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
}

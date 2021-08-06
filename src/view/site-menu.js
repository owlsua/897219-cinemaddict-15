export const createSiteMenuTemplate = (filters) => {
  const filterItemTemplate = (filter) => {
    const {name, count, key, active} = filter;
    return (
      `<a href="#watchlist" class="main-navigation__item ${active ? 'main-navigation__item--active' : ''}">${name} ${key !== 'all' ? `<span class="main-navigation__item-count">${count.length}</span>` : ''}</a>`
    );
  };
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filters.map((item) => (
      filterItemTemplate(item)
    )).join('')}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

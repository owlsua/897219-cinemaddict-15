import {createSiteMenuTemplate} from './view/site-menu';
import {createHeaderProfileTemplate} from './view/site-header-profile';
import {createSiteSortTemplate} from './view/site-sort';
import {createFilmsListTemplate} from './view/films-list';
import {createMoreButtonTemplate} from './view/site-more-button';
import {createTopRatedTemplate} from './view/site-top-rated';
import {createMostCommentedTemplate} from './view/site-most-commented';
import {createFooterStatisticsTemplate} from './view/site-footer-statistics';
import {createFilmDetailsPopup} from './view/site-film-detail-popup';
import {createFilmCardTemplate} from './view/film-card';

import {generateFilmCard} from './mock/film-card';
import {generateFilter} from './mock/filter.js';

const CARD_COUNT = 30;
const CARD_COUNT_PER_STEP = 5;

const cards = new Array(CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(cards);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBody = document.querySelector('body');
const siteMain = document.querySelector('.main');
const siteHeader = document.querySelector('.header');

render(siteHeader, createHeaderProfileTemplate(), 'beforeend');
render(siteMain, createSiteMenuTemplate(filters), 'beforeend');
render(siteMain, createSiteSortTemplate(), 'beforeend');

render(siteMain, createFilmsListTemplate(), 'beforeend');
const siteFilms = document.querySelector('.films');
const siteFilmsList = siteFilms.querySelector('.films-list');
const filmListContainer = siteFilmsList.querySelector('.films-list__container');

for (let i = 1; i <= Math.min(cards.length, CARD_COUNT_PER_STEP); i++) {
  const emptyElement = filmListContainer.querySelector('.films-list__title');
  emptyElement && cards.length > 0 && emptyElement.remove();

  render(filmListContainer, createFilmCardTemplate(cards[i]), 'beforeend');
}

if (cards.length > CARD_COUNT_PER_STEP) {
  let renderedCardCount = CARD_COUNT_PER_STEP;

  render(siteFilmsList, createMoreButtonTemplate(), 'beforeend');

  const loadMoreButton = siteFilmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => render(filmListContainer, createFilmCardTemplate(card), 'beforeend'));

    renderedCardCount += CARD_COUNT_PER_STEP;

    if (renderedCardCount >= cards.length) {
      loadMoreButton.remove();
    }
  });
}

render(siteFilms, createTopRatedTemplate(cards), 'beforeend');
render(siteFilms, createMostCommentedTemplate(cards), 'beforeend');


const siteFooter = document.querySelector('.footer');
const footerStatstics = siteFooter.querySelector('.footer__statistics');
render(footerStatstics, createFooterStatisticsTemplate(cards), 'beforeend');

render(siteBody, createFilmDetailsPopup(cards[0]), 'beforeend');

import HeaderProfileView from './view/site-header-profile';
import SiteMenuView from './view/site-menu';
import SiteSortView from './view/site-sort';
import FilmListView from './view/films-list';
import LoadMoreButtonView from './view/site-more-button';
import FilmCardView from './view/film-card';
import FilmPopupView from './view/site-film-detail-popup';
import MostCommentedView from './view/site-most-commented';
import TopRatedView from './view/site-top-rated';
import FooterStatsticView from './view/site-footer-statistics';

import {generateFilmCard} from './mock/film-card';
import {generateFilter} from './mock/filter.js';

import {render, renderPosition} from './utils.js';

const CARD_COUNT = 17;
const CARD_OFFSET = 5;

const siteBody = document.querySelector('body');
const siteMain = document.querySelector('.main');
const siteHeader = document.querySelector('.header');

const cards = new Array(CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(cards);

const renderCard = (filmsListComponent, card) => {
  const cardComponent = new FilmCardView(card);
  const popupComponent = new FilmPopupView(card);

  const cardImage = cardComponent.getElement().querySelector('.film-card__poster');
  const cardTitle = cardComponent.getElement().querySelector('.film-card__title');
  const cardComments = cardComponent.getElement().querySelector('.film-card__comments');
  const buttonClose = popupComponent.getElement().querySelector('.film-details__close-btn');

  const closePopupHandler = () => {
    popupComponent.getElement().remove();
    siteBody.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopupHandler();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const openPopupHandler = () => {
    render(siteBody, popupComponent.getElement(), renderPosition.BEFOREEND);
    document.addEventListener('keydown', onEscKeyDown);
    buttonClose.addEventListener('click', closePopupHandler);
    siteBody.classList.add('hide-overflow');
  };

  cardImage.addEventListener('click', openPopupHandler);
  cardTitle.addEventListener('click', openPopupHandler);
  cardComments.addEventListener('click', openPopupHandler);

  render(filmsListComponent, cardComponent.getElement(), renderPosition.BEFOREEND);
};

render(siteHeader, new HeaderProfileView().getElement(), renderPosition.BEFOREEND);
render(siteMain, new SiteMenuView(filters).getElement(), renderPosition.BEFOREEND);
render(siteMain, new SiteSortView().getElement(), renderPosition.BEFOREEND);

const filmListElement = new FilmListView();
const siteFilmsList = filmListElement.getElement().querySelector('.films-list');
const filmListContainer = filmListElement.getElement().querySelector('.films-list__container');

render(siteMain, filmListElement.getElement(), renderPosition.BEFOREEND);

for (let i = 0; i < Math.min(cards.length, CARD_OFFSET); i++) {
  const emptyElement = filmListContainer.querySelector('.films-list__title');
  emptyElement && cards.length > 0 && emptyElement.remove();

  renderCard(filmListContainer, cards[i]);
}


if (cards.length > CARD_OFFSET) {
  let renderCardCount = CARD_OFFSET;

  render(siteFilmsList, new LoadMoreButtonView().getElement(), renderPosition.BEFOREEND);
  const loadMoreButton = siteFilmsList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderCardCount, renderCardCount + CARD_OFFSET)
      .forEach((card) => renderCard(filmListContainer, card));

    renderCardCount += CARD_OFFSET;

    if (renderCardCount >= cards.length) {
      loadMoreButton.remove();
    }
  });
}

const siteFilms = document.querySelector('.films');


const topRatedElement = new TopRatedView();
const topRated = cards.slice().sort((a,b)=> a.rating - b.rating).slice(-2);
render(siteFilms, topRatedElement.getElement(), renderPosition.BEFOREEND);
const topRatedList = topRatedElement.getElement().querySelector('.films-list__container');
topRated.forEach((item) => renderCard(topRatedList, item));


const mostCommentedElement = new MostCommentedView();
const mostCommented = cards.slice().sort((a,b)=> a.comments.length - b.comments.length).slice(-2);
render(siteFilms, mostCommentedElement.getElement(), renderPosition.BEFOREEND);
const mostCommentedList = mostCommentedElement.getElement().querySelector('.films-list__container');
mostCommented.forEach((item) => renderCard(mostCommentedList, item));


const siteFooter = document.querySelector('.footer');
const footerStatstics = siteFooter.querySelector('.footer__statistics');
render(footerStatstics, new FooterStatsticView(cards).getElement(), renderPosition.BEFOREEND);


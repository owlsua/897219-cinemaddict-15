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

import {render, renderPosition} from './utils/render';

// import FilmPresenter from './presenter/film';


const CARD_COUNT = 17;
const CARD_OFFSET = 5;

const siteBody = document.querySelector('body');
const siteMain = document.querySelector('.main');
const siteHeader = document.querySelector('.header');

const cards = new Array(CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(cards);


// start card
const renderCard = (filmsListComponent, card) => {
  const cardComponent = new FilmCardView(card);
  const popupComponent = new FilmPopupView(card);

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
    popupComponent.setCloseClickHandler(() => {
      closePopupHandler();
    });
    siteBody.classList.add('hide-overflow');
  };

  cardComponent.setOpenClickHandler(() => {
    openPopupHandler();
  });

  render(filmsListComponent, cardComponent.getElement(), renderPosition.BEFOREEND);
};

render(siteHeader, new HeaderProfileView().getElement(), renderPosition.BEFOREEND);
render(siteMain, new SiteMenuView(filters).getElement(), renderPosition.BEFOREEND);
render(siteMain, new SiteSortView().getElement(), renderPosition.BEFOREEND);

// start cards list
const filmListElement = new FilmListView();
const siteFilmsList = filmListElement.getElement().querySelector('.films-list');
const filmListContainer = filmListElement.getElement().querySelector('.films-list__container');
render(siteMain, filmListElement.getElement(), renderPosition.BEFOREEND);
for (let i = 0; i < Math.min(cards.length, CARD_OFFSET); i++) {
  const emptyElement = filmListContainer.querySelector('.films-list__title');
  emptyElement && cards.length > 0 && emptyElement.remove();

  renderCard(filmListContainer, cards[i]);
  // mainFilmPresenter.init(cards[i]);
}

// start load more button
if (cards.length > CARD_OFFSET) {
  let renderCardCount = CARD_OFFSET;

  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(siteFilmsList, loadMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

  loadMoreButtonComponent.setClickHandler(() => {
    cards
      .slice(renderCardCount, renderCardCount + CARD_OFFSET)
      .forEach((card) => renderCard(filmListContainer, card));

    renderCardCount += CARD_OFFSET;

    if (renderCardCount >= cards.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

const siteFilms = document.querySelector('.films');

// stert top rated
const topRatedElement = new TopRatedView();
const topRated = cards.slice().sort((a,b)=> a.rating - b.rating).slice(-2);
render(siteFilms, topRatedElement.getElement(), renderPosition.BEFOREEND);
const topRatedList = topRatedElement.getElement().querySelector('.films-list__container');
topRated.forEach((item) => renderCard(topRatedList, item));

// start most commented
const mostCommentedElement = new MostCommentedView();
const mostCommented = cards.slice().sort((a,b)=> a.comments.length - b.comments.length).slice(-2);
render(siteFilms, mostCommentedElement.getElement(), renderPosition.BEFOREEND);
const mostCommentedList = mostCommentedElement.getElement().querySelector('.films-list__container');
mostCommented.forEach((item) => renderCard(mostCommentedList, item));

// start footer statistics
const siteFooter = document.querySelector('.footer');
const footerStatistics = siteFooter.querySelector('.footer__statistics');
render(footerStatistics, new FooterStatsticView(cards).getElement(), renderPosition.BEFOREEND);


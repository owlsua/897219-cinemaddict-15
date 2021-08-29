import SiteMenuView from './view/site-menu';
import SiteSortView from './view/site-sort';
import FilmListView from './view/films-list';
import LoadMoreButtonView from './view/site-more-button';
import FilmCardView from './view/film-card';
import FilmPopupView from './view/site-film-detail-popup';
import {render, renderPosition} from '../utils/render.js';
import {generateFilter} from './mock/filter.js';

const CARD_OFFSET = 5;

export default class Board {
  constructor(siteMain) {
    this._siteMain = siteMain;

    this._menuComponent = new SiteMenuView();
    this._sortComponent = new SiteSortView();
    this._filmsListComponent = new FilmListView();
  }

  init(films) {
    this._films = films.slice();
    this._render();
  }

  _renderMenu(films) {
    render(this._siteMain, this._menuComponent(generateFilter(films)), renderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._siteMain, this._sortComponent, renderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const siteBody = document.querySelector('body');
    const cardComponent = new FilmCardView(film);
    const popupComponent = new FilmPopupView(film);

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

    render(this._filmsListComponent, cardComponent.getElement(), renderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._films.length, CARD_OFFSET));

    if (this._films.length > CARD_OFFSET) {
      this._renderLoadMoreButton();
    }
  }

  _renderLoadMoreButton(films) {
    let renderCardCount = CARD_OFFSET;

    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(this._filmsListComponent, loadMoreButtonComponent.getElement(), renderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      films
        .slice(renderCardCount, renderCardCount + CARD_OFFSET)
        .forEach((film) => this._renderFilm(this._filmsListComponent, film));

      renderCardCount += CARD_OFFSET;

      if (renderCardCount >= films.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }

  _render() {

    this._renderMenu(this._films);
    this._renderSort();
    this._renderFilmsList();
  }
}

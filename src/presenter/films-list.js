import FilmListView from '../view/films-list';
import FilmPresenter from '../presenter/film';
import LoadMoreButtonView from '../view/site-more-button';
import {render, renderPosition, remove} from '../utils/render.js';
const CARD_OFFSET = 5;

export default class FilmsList {
  constructor(container) {
    this._container = container;
    this._filmsListComponent = new FilmListView();

    this._filmListContainer = this._filmsListComponent.getElement().querySelector('.films-list__container');
    this._siteFilmsList = this._filmsListComponent.getElement().querySelector('.films-list');
    this._mainFilmPresenter = new FilmPresenter(this._filmListContainer);

    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._renderCardCount = CARD_OFFSET;

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films;
    this._renderFilmsList();
  }

  _handleLoadMoreButtonClick() {
    this._films
      .slice(this._renderCardCount, this._renderCardCount + CARD_OFFSET)
      .forEach((film) => this._mainFilmPresenter.init(film));

    this._renderCardCount += CARD_OFFSET;

    if (this._renderCardCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._siteFilmsList, this._loadMoreButtonComponent, renderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsList() {
    render(this._container, this._filmsListComponent, renderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(this._films.length, CARD_OFFSET); i++) {
      const emptyElement = this._filmListContainer.querySelector('.films-list__title');
      emptyElement && this._films.length > 0 && emptyElement.remove();
      this._mainFilmPresenter.init(this._films[i]);
    }

    if (this._films.length > CARD_OFFSET) {
      this._renderLoadMoreButton();
    }
  }
}

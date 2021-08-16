import AbstractView from './abstract.js';

const createFilmCardTemplate = (card) => {
  const {title, rating, releaseDate, duration, genres, image, description, watchlist, watched, favorites, comments} = card;

  const isWatchlist = () => (
    watchlist && 'film-card__controls-item--active'
  );

  const isWatched = () => (
    watched && 'film-card__controls-item--active'
  );

  const isFavorites = () => (
    favorites && 'film-card__controls-item--active'
  );

  const descriptionItem = () => (
    description.length <= 139 ? description : `${description.slice(0, 139)  }...`
  );

  const commentsValue = () => (
    comments.length === 1 ? `${comments.length  } comment` : `${comments.length  } comments`
  );

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres.join(', ')}</span>
    </p>
    <img src="./images/posters/${image}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionItem()}</p>
    <a class="film-card__comments">${commentsValue()}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlist()}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isWatched()}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${isFavorites()}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._openClickHandler = this._openClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }

  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.openClick();
  }

  setOpenClickHandler(callback) {
    this._callback.openClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._openClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._openClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._openClickHandler);
  }
}

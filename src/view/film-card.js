import {createElement} from '../utils.js';

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

export default class FilmCard {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
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

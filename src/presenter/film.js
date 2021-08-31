import FilmCardView from '../view/film-card';
import FilmPopupView from '../view/site-film-detail-popup';
import {render, renderPosition, remove} from '../utils/render.js';
const siteBody = document.querySelector('body');

export default class FilmCard {
  constructor(container) {
    this._container = container;
  }

  init(film) {
    this.film = film;
    this._renderFilm();
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }

  _renderFilm() {
    const cardComponent = new FilmCardView(this.film);
    const popupComponent = new FilmPopupView(this.film);

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
      render(siteBody, popupComponent, renderPosition.BEFOREEND);
      document.addEventListener('keydown', onEscKeyDown);
      popupComponent.setCloseClickHandler(() => {
        closePopupHandler();
      });
      siteBody.classList.add('hide-overflow');
    };

    cardComponent.setOpenClickHandler(() => {
      openPopupHandler();
    });

    render(this._container, cardComponent, renderPosition.BEFOREEND);
  }
}

// export default class FilmCard {
//   constructor(container) {
//     this._container = container;

//     this._closePopupHandler = this._closePopupHandler.bind(this);
//     this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
//     this._openPopupHandler = this._openPopupHandler.bind(this);
//   }

//   init(film) {
//     this.film = film;
//     this._cardComponent = new FilmCardView(this.film);
//     this._popupComponent = new FilmPopupView(this.film);
//     this._cardComponent.setOpenClickHandler(this._openPopupHandler);
//     render(this._container, this._cardComponent, renderPosition.BEFOREEND);
//   }

//   destroy() {
//     remove(this._cardComponent);
//     remove(this._popupComponent);
//   }

//   _closePopupHandler() {
//     remove(this._popupComponent);
//     siteBody.classList.remove('hide-overflow');
//   }

//   _escKeyDownHandler(evt) {
//     if (evt.key === 'Escape' || evt.key === 'Esc') {
//       evt.preventDefault();
//       this._closePopupHandler();
//       document.removeEventListener('keydown', this._escKeyDownHandler);
//     }
//   }

//   _openPopupHandler() {
//     render(siteBody, this._popupComponent, renderPosition.BEFOREEND);
//     document.addEventListener('keydown', this._escKeyDownHandler);
//     this._popupComponent.setCloseClickHandler(this._closePopupHandler);
//     siteBody.classList.add('hide-overflow');
//   }
// }

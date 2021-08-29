import FilmCardView from '../view/film-card';
import FilmPopupView from '../view/site-film-detail-popup';
import {render, renderPosition} from '../utils/render.js';

export default class FilmCard {
  constructor(container) {
    this._container = container;
  }

  init(film) {
    this.film = film;
    this._renderFilm();
  }

  _renderFilm() {
    const siteBody = document.querySelector('body');
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

    render(this._container, cardComponent.getElement(), renderPosition.BEFOREEND);
  }
}

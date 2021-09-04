import TopRatedView from '../view/site-top-rated';
import FilmPresenter from '../presenter/film';
import {render, renderPosition} from '../utils/render.js';

export default class TopRated {
  constructor(container) {
    this._container = container;
    this._topRatedComponent = new TopRatedView();

    const topRatedList = this._topRatedComponent.getElement().querySelector('.films-list__container');
    this._topRatedFilmPresenter = new FilmPresenter(topRatedList);
  }

  init(films) {
    this._films = films.slice();
    this._renderTopRated();
  }

  _renderTopRated() {
    const topRated = this._films.sort((a,b)=> a.rating - b.rating).slice(-2);
    render(this._container, this._topRatedComponent, renderPosition.BEFOREEND);
    topRated.forEach((item) => this._topRatedFilmPresenter.init(item));
  }
}

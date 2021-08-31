import MostCommentedView from '../view/site-most-commented';
import FilmPresenter from '../presenter/film';
import {render, renderPosition} from '../utils/render.js';

export default class MostCommented {
  constructor(container) {
    this._container = container;
    this._mostCommentedComponent = new MostCommentedView();

    const mostCommentedList = this._mostCommentedComponent.getElement().querySelector('.films-list__container');
    this._mostCommentedFilmPresenter = new FilmPresenter(mostCommentedList);
  }

  init(films) {
    this._films = films.slice();
    this._renderMostCommented();
  }

  _renderMostCommented() {
    const mostCommented = this._films.sort((a,b)=> a.comments.length - b.comments.length).slice(-2);
    render(this._container, this._mostCommentedComponent, renderPosition.BEFOREEND);
    mostCommented.forEach((item) => this._mostCommentedFilmPresenter.init(item));
  }
}

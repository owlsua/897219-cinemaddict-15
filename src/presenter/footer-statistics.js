import FooterStatsticView from '../view/site-footer-statistics';
import {render, renderPosition} from '../utils/render.js';

export default class FooterStatstic {
  constructor(container) {
    this._container = container;
    // TODO: replace view to component
  }

  init(films) {
    this._films = films;
    this._renderFooterStatistics(this._films);
  }

  _renderFooterStatistics() {
    render(this._container, new FooterStatsticView(this._films), renderPosition.BEFOREEND);
  }
}

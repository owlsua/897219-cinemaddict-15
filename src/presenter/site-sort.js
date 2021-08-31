import SiteSortView from '../view/site-sort';
import {render, renderPosition} from '../utils/render.js';

export default class SiteSort {
  constructor(container) {
    this._container = container;
    this._siteSortComponent = new SiteSortView();
  }

  init(filters) {
    this._filters = filters;
    this._renderSiteSort();
  }

  _renderSiteSort() {
    render(this._container, this._siteSortComponent, renderPosition.BEFOREEND);
  }
}

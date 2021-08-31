import SiteMenuView from '../view/site-menu';
import {render, renderPosition} from '../utils/render.js';

export default class SiteMenu {
  constructor(container) {
    this._container = container;
    this._siteMenuComponent = new SiteMenuView();
    // TODO: replace view to component
  }

  init(filters) {
    this._filters = filters;
    this._renderSiteMenu();
  }

  _renderSiteMenu() {
    render(this._container, new SiteMenuView(this._filters), renderPosition.BEFOREEND);
  }
}

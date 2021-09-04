import HeaderProfileView from '../view/site-header-profile';
import {render, renderPosition} from '../utils/render.js';

export default class HeaderProfile {
  constructor(container) {
    this._container = container;
    this.headerProfileComponent = new HeaderProfileView();
  }

  init() {
    this._renderHeaderProfile();
  }

  _renderHeaderProfile() {
    render(this._container, this.headerProfileComponent, renderPosition.BEFOREEND);
  }
}

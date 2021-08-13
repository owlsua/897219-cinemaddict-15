import {createElement} from '../utils.js';

const createFooterStatisticTemplate = (cards) => (
  `<p>${cards.length} movies inside</p>`
);

export default class FooterStatstic {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._cards);
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

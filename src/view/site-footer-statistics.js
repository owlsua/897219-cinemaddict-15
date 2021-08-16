import AbstractView from './abstract.js';

const createFooterStatisticTemplate = (cards) => (
  `<p>${cards.length} movies inside</p>`
);

export default class FooterStatstic extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._cards);
  }
}

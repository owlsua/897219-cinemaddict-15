import AbstractView from './abstract.js';

const createMostCommentedTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">

      </div>
    </section>`);

export default class MostCommented extends AbstractView {
  getTemplate() {
    return createMostCommentedTemplate();
  }
}

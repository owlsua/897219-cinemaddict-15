// import FilmCardView from '../view/film-card';
// import {createElement} from '../utils.js';

// const createMostCommentedTemplate = (cards) => {
//   const sortArray = cards.slice().sort((a,b)=> a.comments.length - b.comments.length);
//   const mostCommenteds = sortArray.slice(-2);
//   return  (
//     `<section class="films-list films-list--extra">
//       <h2 class="films-list__title">Most commented</h2>

//       <div class="films-list__container">
//         ${mostCommenteds.map((item) => (new FilmCardView(item).getTemplate()))}
//       </div>
//     </section>`);
// };

// export default class MostCommented {
//   constructor(cards) {
//     this._cards = cards;
//     this._element = null;
//   }

//   getTemplate() {
//     return createMostCommentedTemplate(this._cards);
//   }

//   getElement() {
//     if (!this._element) {
//       this._element = createElement(this.getTemplate());
//     }

//     return this._element;
//   }

//   removeElement() {
//     this._element = null;
//   }
// }

import {createElement} from '../utils.js';

const createMostCommentedTemplate = () => (
  `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">

      </div>
    </section>`);

export default class MostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedTemplate();
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

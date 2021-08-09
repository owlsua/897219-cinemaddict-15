import {createFilmCardTemplate} from './film-card';

export const createMostCommentedTemplate = (cards) => {
  // const sortArray = cards.slice().sort((a,b)=> a.comments.length - b.comments.length).slice(-2);
  const sortArray = cards.slice().sort((a,b)=> a.comments.length - b.comments.length);
  const mostCommenteds = sortArray.slice(-2);
  return  (
    `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
        ${mostCommenteds.map(createFilmCardTemplate).join('')}
      </div>
    </section>`);
};

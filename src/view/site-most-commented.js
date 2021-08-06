import {createFilmCardTemplate} from './film-card';

export const createMostCommentedTemplate = (cards) => {
  const sortArray = cards.sort((a,b)=> a.comments.length - b.comments.length).reverse().slice(1, 3);
  return  ( `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container">
    ${sortArray.map((item) => (
      createFilmCardTemplate(item)
    ))}
  </div>
</section>`);
};

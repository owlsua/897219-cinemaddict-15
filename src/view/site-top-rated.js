import {createFilmCardTemplate} from './film-card';

export const createTopRatedTemplate = (cards) => {
  const sortArray = cards.sort((a,b)=> a.rating - b.rating).reverse().slice(1, 3);
  return  ( `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container">
    ${sortArray.map((item) => (
      createFilmCardTemplate(item)
    ))}
  </div>
</section>`);
};

import {createFilmCardTemplate} from './film-card';

export const createTopRatedTemplate = (cards) => {
  const sortArray = cards.slice().sort((a,b)=> a.rating - b.rating);
  const topRateds = sortArray.slice(-2);
  return  (
    `<section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
        ${topRateds.map(createFilmCardTemplate).join('')}
      </div>
    </section>`);
};

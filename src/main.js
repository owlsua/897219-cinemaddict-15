import {createSiteMenuTemplate} from './view/site-menu';
import {createHeaderProfileTemplate} from './view/site-header-profile';
import {createSiteSortTemplate} from './view/site-sort';
import {createFilmsTemplate} from './view/site-films';
import {createMoreButtonTemplate} from './view/site-more-button';
import {createTopRatedTemplate} from './view/site-top-rated';
import {createMostCommentedTemplate} from './view/site-most-commented';
import {createFooterStatisticsTemplate} from './view/site-footer-statistics';
import {createFilmDetailsPopup} from './view/site-film-detail-popup';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteBody = document.querySelector('body');
const siteMain = document.querySelector('.main');
const siteHeader = document.querySelector('.header');

render(siteHeader, createHeaderProfileTemplate(), 'beforeend');
render(siteMain, createSiteMenuTemplate(), 'beforeend');
render(siteMain, createSiteSortTemplate(), 'beforeend');

render(siteMain, createFilmsTemplate(), 'beforeend');
const siteFilms = document.querySelector('.films');
const siteFilmsList = siteFilms.querySelector('.films-list');
render(siteFilmsList, createMoreButtonTemplate(), 'beforeend');

render(siteFilms, createTopRatedTemplate(), 'beforeend');
render(siteFilms, createMostCommentedTemplate(), 'beforeend');


const siteFooter = document.querySelector('.footer');
const footerStatstics = siteFooter.querySelector('.footer__statistics');
render(footerStatstics, createFooterStatisticsTemplate(), 'beforeend');

render(siteBody, createFilmDetailsPopup(), 'beforeend');

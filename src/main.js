import {generateFilmCard} from './mock/film-card';
import {generateFilter} from './mock/filter.js';

import HeaderProfilePresenter from './presenter/header-profile';
import SiteSortPresenter from './presenter/site-sort';
import SiteMenuPresenter from './presenter/site-menu';
import FilmsListPresenter from './presenter/films-list';
import TopRatedPresenter from './presenter/top-rated';
import MostCommentedPresenter from './presenter/most-commented';
import FooterStatisticsPresenter from './presenter/footer-statistics';


const CARD_COUNT = 17;

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');
const siteFooter = document.querySelector('.footer');
const footerStatistics = siteFooter.querySelector('.footer__statistics');

const cards = new Array(CARD_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(cards);

// start header pofile
const headerProfilePresenter = new HeaderProfilePresenter(siteHeader);
headerProfilePresenter.init();

// start site sort
const siteSortPresenter = new SiteSortPresenter(siteMain);
siteSortPresenter.init();

// start site menu
const siteMenuPresenter = new SiteMenuPresenter(siteMain);
siteMenuPresenter.init(filters);

// start cards list
const mainFilmsListPresenter = new FilmsListPresenter(siteMain);
mainFilmsListPresenter.init(cards);

// start footer statisctics
const footerStatisticsPresenter = new FooterStatisticsPresenter(footerStatistics);
footerStatisticsPresenter.init(cards);

// start top rated
const siteFilms = document.querySelector('.films');
const topRatedPresenter = new TopRatedPresenter(siteFilms);
topRatedPresenter.init(cards);

// start most commented
const mostCommentedPresenter = new MostCommentedPresenter(siteFilms);
mostCommentedPresenter.init(cards);


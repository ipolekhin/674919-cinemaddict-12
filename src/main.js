import {generateFilms} from "./mock/film.js";
import {filterMenu} from "./utils/filter.js";
import {render} from "./utils/render.js";
import UserRatingView from "./view/user-rating.js";
import MenuView from "./view/menu.js";
import SortView from "./view/sort.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import MoviePresenter from "./presenter/movie.js";

const FILMS_COUNT = 25;

const films = generateFilms(FILMS_COUNT);
const statistics = filterMenu(films);
// todo
// console.log(statistics);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);
const moviePresenter = new MoviePresenter(siteMainElement, siteFooterElement);

render(siteHeaderElement, new UserRatingView(statistics));
render(siteMainElement, new MenuView(statistics));
render(siteMainElement, new SortView(statistics));
render(siteFooterStatisticsElement, new FooterStatisticsView(films.length));

moviePresenter.init(films);

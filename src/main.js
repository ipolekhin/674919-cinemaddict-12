import {createUserRatingTemplate} from "./view/user-rating.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmItemTemplate} from "./view/film-item.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistics.js";
import {createFilmDetailsPopupTemplate} from "./view/film-details-popup.js";

const FILMS_CARD_COUNT = 5;
const EXTRA_FILMS_CARD_COUNT = 2;

const ExtraBlockNames = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

const EXTRA_BLOCK_NAMES = [
  ExtraBlockNames.TOP_RATED,
  ExtraBlockNames.MOST_COMMENTED,
];

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserRatingTemplate());

render(siteMainElement, createMenuTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const siteFilmsSection = siteMainElement.querySelector(`.films`);
render(siteFilmsSection, createFilmsListTemplate());

const siteFilmsListContainer = siteFilmsSection.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS_CARD_COUNT; i++) {
  render(siteFilmsListContainer, createFilmItemTemplate());
}
render(siteFilmsListContainer, createShowMoreButtonTemplate(), `afterend`);

EXTRA_BLOCK_NAMES.forEach((title) => {
  render(siteFilmsSection, createFilmsListTemplate(`--extra`, title));
});

const siteExtraBlock = siteFilmsSection.querySelectorAll(`.films-list--extra .films-list__container`);
siteExtraBlock.forEach((item) => {
  for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
    render(item, createFilmItemTemplate());
  }
});

render(siteFooterStatisticsElement, createFooterStatisticsTemplate());
render(siteFooterElement, createFilmDetailsPopupTemplate(), `afterend`);

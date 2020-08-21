import {Keys} from "./const.js";
import {createUserRatingTemplate} from "./view/user-rating.js";
import {createMenuTemplate} from "./view/menu.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmItemTemplate} from "./view/film-item.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFooterStatisticsTemplate} from "./view/footer-statistics.js";
import {createFilmDetailsPopupTemplate} from "./view/film-details-popup.js";
import {generateFilms} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";
import {removeElement} from "./utils/common.js";
import {filterMenu} from "./utils/filter.js";

const FILMS_COUNT = 25;
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

const films = generateFilms(FILMS_COUNT);
const comments = generateComments(films[0].commentsCount);
const statistics = filterMenu(films);
// todo
// console.log(statistics);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(siteHeaderElement, createUserRatingTemplate(statistics));

render(siteMainElement, createMenuTemplate(statistics));
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const siteFilmsSection = siteMainElement.querySelector(`.films`);
render(siteFilmsSection, createFilmsListTemplate());

const siteFilmsListContainer = siteFilmsSection.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS_CARD_COUNT; i++) {
  render(siteFilmsListContainer, createFilmItemTemplate(films[i]));
}
render(siteFilmsListContainer, createShowMoreButtonTemplate(), `afterend`);

EXTRA_BLOCK_NAMES.forEach((title) => {
  render(siteFilmsSection, createFilmsListTemplate(`--extra`, title));
});

const siteExtraBlock = siteFilmsSection.querySelectorAll(`.films-list--extra .films-list__container`);
siteExtraBlock.forEach((item) => {
  for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
    render(item, createFilmItemTemplate(films[i]));
  }
});

render(siteFooterStatisticsElement, createFooterStatisticsTemplate(films.length));

const popupFilmClickHandler = (evt) => {
  if (evt.target.classList.contains(`film-card__poster`)
    || evt.target.classList.contains(`film-card__title`)
    || evt.target.classList.contains(`film-card__comments`)) {
    removeElement(`.film-details`);

    render(siteFooterElement, createFilmDetailsPopupTemplate(films[0], comments), `afterend`);

    const filmDetailsCloseButton = document.querySelector(`.film-details__close-btn`);
    filmDetailsCloseButton.addEventListener(`click`, () => {
      removeElement(`.film-details`);
      document.removeEventListener(`keydown`, popupEscHandler);
    });

    const popupEscHandler = (event) => {
      if (event.key === Keys.ESC || event.key === Keys.ESCAPE) {
        removeElement(`.film-details`);
        document.removeEventListener(`keydown`, popupEscHandler);
      }
    };

    document.addEventListener(`keydown`, popupEscHandler);
  }
};

siteFilmsSection.addEventListener(`click`, popupFilmClickHandler);

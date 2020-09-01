import {Keys} from "./const.js";
import {generateFilms} from "./mock/film.js";
import {generateComments} from "./mock/comment.js";
import {filterMenu} from "./utils/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import UserRatingView from "./view/user-rating.js";
import MenuView from "./view/menu.js";
import SortView from "./view/sort.js";
import FilmsBlocksContainerView from "./view/films-blocks-container.js";
import FilmsContainerView from "./view/films-container.js";
import FilmsListView from "./view/films-list.js";
import FilmItemView from "./view/film-item.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import FilmDetailsPopupView from "./view/film-details-popup.js";

const FILMS_COUNT = 25;
const FILMS_COUNT_PER_STEP = 5;
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

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const siteFooterStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

const renderFilm = (FilmsListElement, film) => {
  const filmItemComponent = new FilmItemView(film);
  const filmDetailsPopupComponent = new FilmDetailsPopupView(film, comments);

  const popupEscHandler = (event) => {
    if (event.key === Keys.ESC || event.key === Keys.ESCAPE) {
      filmDetailsPopupComponent.getElement().remove();
      document.removeEventListener(`keydown`, popupEscHandler);
    }
  };

  const renderFilmDetailsPopup = (event) => {
    if (event.target.classList.contains(`film-card__poster`)
      || event.target.classList.contains(`film-card__title`)
      || event.target.classList.contains(`film-card__comments`)) {
      siteFooterElement.after(filmDetailsPopupComponent.getElement());
      document.addEventListener(`keydown`, popupEscHandler);
    }
  };
  const removeFilmDetailsPopup = () => {
    filmDetailsPopupComponent.getElement().remove();
  };

  filmItemComponent.getElement().addEventListener(`click`, (event) => {
    event.preventDefault();
    renderFilmDetailsPopup(event);
  });

  filmDetailsPopupComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (event) => {
    event.preventDefault();
    removeFilmDetailsPopup(event);
  });

  render(FilmsListElement, filmItemComponent.getElement());
};

render(siteHeaderElement, new UserRatingView(statistics).getElement());

render(siteMainElement, new MenuView(statistics).getElement());
render(siteMainElement, new SortView(statistics).getElement());

const filmsBlocksContainerComponent = new FilmsBlocksContainerView();
render(siteMainElement, filmsBlocksContainerComponent.getElement());

const filmsContainerComponent = new FilmsContainerView();
render(filmsBlocksContainerComponent.getElement(), filmsContainerComponent.getElement());
const filmsListComponent = new FilmsListView();
render(filmsContainerComponent.getElement(), filmsListComponent.getElement());

for (let i = 0; i < FILMS_COUNT_PER_STEP; i++) {
  renderFilm(filmsListComponent.getElement(), films[i]);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  const showMoreButtonComponent = new ShowMoreButtonView();

  render(filmsContainerComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (event) => {
    event.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListComponent.getElement(), film));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

EXTRA_BLOCK_NAMES.forEach((title) => {
  const filmsExtraContainerComponent = new FilmsContainerView(`--extra`, title);
  render(filmsBlocksContainerComponent.getElement(), filmsExtraContainerComponent.getElement());
  const extraFilmsListComponent = new FilmsListView();
  render(filmsExtraContainerComponent.getElement(), extraFilmsListComponent.getElement());
  for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
    renderFilm(extraFilmsListComponent.getElement(), films[i]);
  }
});

render(siteFooterStatisticsElement, new FooterStatisticsView(films.length).getElement());


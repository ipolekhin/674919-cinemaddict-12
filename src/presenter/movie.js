import FilmsBlocksContainerView from "../view/films-blocks-container.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import EmptyFilmsView from "../view/no-films.js";
import FilmItemView from "../view/film-item.js";
import FilmDetailsPopupView from "../view/film-details-popup.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {generateComments} from "../mock/comment.js";
import {EXTRA_BLOCK_NAMES, Keys} from "../const.js";

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_CARD_COUNT = 2;

export default class Movie {
  constructor(movieContainer, footerElement) {
    this._movieContainer = movieContainer;
    this._footerElement = footerElement;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._filmsBlocksContainerComponent = new FilmsBlocksContainerView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick .bind(this);
    this._noFilmsComponent = new EmptyFilmsView();
  }

  init(listFilms) {
    this._listFilms = listFilms.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderList в main.js
    render(this._movieContainer, this._filmsBlocksContainerComponent);

    this._renderMovieListContainer();
  }

  // todo
  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderFilm(film, filmsListComponent = this._filmsListComponent) {
    const filmItemComponent = new FilmItemView(film);
    const comments = generateComments(film.commentsCount);
    const filmDetailsPopupComponent = new FilmDetailsPopupView(film, comments);

    const popupEscHandler = (event) => {
      if (event.key === Keys.ESC || event.key === Keys.ESCAPE) {
        filmDetailsPopupComponent.getElement().remove();
        document.removeEventListener(`keydown`, popupEscHandler);
      }
    };

    const renderFilmDetailsPopup = () => {
      render(this._footerElement, filmDetailsPopupComponent, RenderPosition.AFTEREND);
      document.addEventListener(`keydown`, popupEscHandler);
    };

    const removeFilmDetailsPopup = () => {
      filmDetailsPopupComponent.getElement().remove();
      document.removeEventListener(`keydown`, popupEscHandler);
    };

    filmItemComponent.setOpenPopupHandler((event) => {
      renderFilmDetailsPopup(event);
    });

    filmDetailsPopupComponent.setClosePopupHandler(() => {
      removeFilmDetailsPopup();
    });

    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
    render(filmsListComponent, filmItemComponent);
  }

  _renderFilms(from, to) {
    // Метод для рендеринга N-задач за раз
    this._listFilms
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки
    // todo
    render(this._filmsBlocksContainerComponent, this._noFilmsComponent);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;
    if (this._renderedFilmCount >= this._listFilms.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
    render(this._filmsContainerComponent, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setShowMoreFilmsHandler(this._handleShowMoreButtonClick);
  }

  _renderExtraBlock() {
    EXTRA_BLOCK_NAMES.forEach((title) => {
      const filmsExtraContainerComponent = new FilmsContainerView(`--extra`, title);
      const extraFilmsListComponent = new FilmsListView();
      render(this._filmsBlocksContainerComponent, filmsExtraContainerComponent);
      render(filmsExtraContainerComponent, extraFilmsListComponent);
      for (let i = 0; i < EXTRA_FILMS_CARD_COUNT; i++) {
        this._renderFilm(this._listFilms[i], extraFilmsListComponent);
      }
    });
  }

  _renderMovieList() {
    render(this._filmsBlocksContainerComponent, this._filmsContainerComponent);
    render(this._filmsContainerComponent, this._filmsListComponent);

    this._renderFilms(0, Math.min(this._listFilms.length, FILMS_COUNT_PER_STEP));

    if (this._listFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderMovieListContainer() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderList в main.js
    if (this._listFilms.length === 0) {
      this._renderNoFilms();

      return;
    }

    this._renderMovieList();
    this._renderExtraBlock();
  }
}

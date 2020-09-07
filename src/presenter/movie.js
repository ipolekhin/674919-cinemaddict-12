import SortView from "../view/sort.js";
import FilmsBlocksContainerView from "../view/films-blocks-container.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import EmptyFilmsView from "../view/no-films.js";
import FilmItemView from "../view/film-item.js";
import FilmDetailsPopupView from "../view/film-details-popup.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {generateComments} from "../mock/comment.js";
import {ExtraBlockNames, EXTRA_BLOCK_NAMES, Keys, SortType} from "../const.js";

const FILMS_COUNT_PER_STEP = 5;

export default class Movie {
  constructor(movieContainer, footerElement) {
    this._siteMainElement = null;
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = new SortView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._movieContainer = movieContainer;
    this._footerElement = footerElement;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._filmsBlocksContainerComponent = new FilmsBlocksContainerView();
    this._filmsBlocksContainerComponent = new FilmsBlocksContainerView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListComponent = new FilmsListView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick .bind(this);
    this._noFilmsComponent = new EmptyFilmsView();
  }

  init(listFilms, siteMainElement) {
    this._listFilms = listFilms.slice();
    this._sourcedListFilms = listFilms.slice();
    this._siteMainElement = siteMainElement;
    this._renderSort();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderList в main.js
    render(this._movieContainer, this._filmsBlocksContainerComponent);
    this._renderMovieListContainer();
  }

  _sortTasks(sortType) {
    // - Сортируем фильмы
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _listFilms
    switch (sortType) {
      case SortType.DATE:
        this._listFilms.sort((a, b) => a.releaseDate - b.releaseDate);
        break;
      case SortType.RATING:
        this._listFilms.sort((a, b) => b.rating * 10 - a.rating * 10);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _listFilms исходный массив
        this._listFilms = this._sourcedListFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortTasks(sortType);
    // - Очищаем фильмы
    this._clearMovieList();
    // - Рендерим фильмы заново
    this._renderMovieList();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._siteMainElement, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    let sortedMovies = [];
    const showingMovies = this._listFilms.slice();

    EXTRA_BLOCK_NAMES.forEach((title) => {
      const filmsExtraContainerComponent = new FilmsContainerView(`--extra`, title);
      const extraFilmsListComponent = new FilmsListView();
      render(this._filmsBlocksContainerComponent, filmsExtraContainerComponent);
      render(filmsExtraContainerComponent, extraFilmsListComponent);

      switch (title) {
        case ExtraBlockNames.TOP_RATED:
          sortedMovies = showingMovies.sort((a, b) => b.rating * 10 - a.rating * 10);

          sortedMovies.slice(0, 2).forEach((film) => {
            this._renderFilm(film, extraFilmsListComponent);
          });
          break;
        case ExtraBlockNames.MOST_COMMENTED:
          sortedMovies = showingMovies.sort((a, b) => b.commentsCount - a.commentsCount);

          sortedMovies.slice(0, 2).forEach((film) => {
            this._renderFilm(film, extraFilmsListComponent);
          });
          break;
      }
    });
  }

  _clearMovieList() {
    this._filmsListComponent.getElement().innerHTML = ``;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
  }

  _renderMovieList() {
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

    render(this._filmsBlocksContainerComponent, this._filmsContainerComponent);
    render(this._filmsContainerComponent, this._filmsListComponent);
    this._renderMovieList();
    this._renderExtraBlock();
  }
}

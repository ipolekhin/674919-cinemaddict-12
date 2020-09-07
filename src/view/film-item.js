import AbstractView from "./abstract.js";
import {BUTTON_TAG_NAMES, ButtonTagType, ButtonType} from "../const.js";

const MAX_LENGTH_DESCRIPTION = 140;
const ELLIPSIS = `...`;

const createButtonsMarkup = ({isWatchlist, isWatched, isFavorite}) => {
  const setControlActive = (isActive) => isActive ? `film-card__controls-item--active` : ``;
  const activeButton = {
    [ButtonTagType.WATCHLIST]: isWatchlist,
    [ButtonTagType.WATCHED]: isWatched,
    [ButtonTagType.FAVORITE]: isFavorite,
  };

  return BUTTON_TAG_NAMES
    .map((tagName) => {
      const controlActive = setControlActive(activeButton[tagName]);

      return (
        `<button
          class="film-card__controls-item button film-card__controls-item--${tagName}
          ${controlActive}">
          ${ButtonType[tagName]}
        </button>`
      );
    }).join(`\n`);
};

const createFilmItemTemplate = (film) => {
  const {
    commentsCount,
    description,
    duration,
    genres,
    isWatchlist,
    isWatched,
    isFavorite,
    poster,
    title,
    rating,
    releaseDate,
  } = film;
  const buttonsMarkup = createButtonsMarkup({isWatchlist, isWatched, isFavorite});
  const date = releaseDate.toLocaleString(`en-US`, {year: `numeric`});
  const shortDescription = description.length > MAX_LENGTH_DESCRIPTION
    ? description.slice(0, MAX_LENGTH_DESCRIPTION)
      .padEnd(MAX_LENGTH_DESCRIPTION + ELLIPSIS.length, ELLIPSIS) : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date}</span>
        <span class="film-card__duration">${duration}m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        ${buttonsMarkup}
      </form>
    </article>`
  );
};

export default class FilmItem extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._openPopupHandler = this._openPopupHandler.bind(this);
  }

  _openPopupHandler(event) {
    event.preventDefault();
    if (event.target.classList.contains(`film-card__poster`)
      || event.target.classList.contains(`film-card__title`)
      || event.target.classList.contains(`film-card__comments`)) {
      this._callback.openPopup();
    }
  }

  setOpenPopupHandler(callback) {
    this._callback.openPopup = callback;
    this.getElement().addEventListener(`click`, this._openPopupHandler);
  }

  getTemplate() {
    return createFilmItemTemplate(this._film);
  }
}

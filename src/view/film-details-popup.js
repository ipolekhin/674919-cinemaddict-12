import AbstractView from "./abstract.js";
import {createCommentsTemplate} from "./comments.js";

const createFilmDetailsPopupTemplate = (film, comments) => {
  const {
    actors,
    ageRating,
    commentsCount,
    country,
    description,
    duration,
    director,
    genres,
    isWatchlist,
    isWatched,
    isFavorite,
    originalTitle,
    poster,
    rating,
    releaseDate,
    title,
    writers,
  } = film;
  const commentsView = createCommentsTemplate(commentsCount, comments);
  const date = releaseDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`});
  const genreKey = genres.length > 1 ? `Genres` : `Genre`;
  const setControlsActive = (isActive) => isActive ? `checked` : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tbody><tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${date}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}m</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genreKey}</td>
                  <td class="film-details__cell">
                    ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(`\n`)}
                  </td>
                </tr>
              </tbody></table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="watchlist"
              name="watchlist"
              ${setControlsActive(isWatchlist)}
            >
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="watched"
              name="watched"
              ${setControlsActive(isWatched)}
            >
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="favorite"
              name="favorite"

              ${setControlsActive(isFavorite)}
            >
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        ${commentsView}
      </form>
    </section>`
  );
};

export default class FilmDetailsPopup extends AbstractView {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
    this._closePopupHandler = this._closePopupHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._film, this._comments);
  }

  _closePopupHandler(event) {
    event.preventDefault();
    this._callback.closePopup();
  }

  setClosePopupHandler(callback) {
    this._callback.closePopup = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupHandler);
  }
}

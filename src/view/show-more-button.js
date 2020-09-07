import AbstractView from "./abstract.js";

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._showMoreFilmsHandler = this._showMoreFilmsHandler.bind(this);
  }

  _showMoreFilmsHandler(event) {
    event.preventDefault();
    this._callback.showMoreFilms();
  }

  setShowMoreFilmsHandler(callback) {
    this._callback.showMoreFilms = callback;
    this.getElement().addEventListener(`click`, this._showMoreFilmsHandler);
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}

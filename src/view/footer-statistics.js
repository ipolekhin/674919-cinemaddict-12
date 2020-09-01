import {createElement} from "../utils/render.js";

const createFooterStatisticsTemplate = (countFilms) => {
  return (
    `<p>${countFilms} movies inside</p>`
  );
};

export default class FooterStatistics {
  constructor(countFilms) {
    this._element = null;
    this._countFilms = countFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._countFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

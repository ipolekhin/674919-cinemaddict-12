import AbstractView from "./abstract.js";

const createFooterStatisticsTemplate = (countFilms) => {
  return (
    `<p>${countFilms} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractView {
  constructor(countFilms) {
    super();
    this._countFilms = countFilms;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._countFilms);
  }
}

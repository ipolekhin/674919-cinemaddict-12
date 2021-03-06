import AbstractView from "./abstract.js";

const createFilmsContainerTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsBlocksContainer extends AbstractView {
  getTemplate() {
    return createFilmsContainerTemplate(this._statistic);
  }
}

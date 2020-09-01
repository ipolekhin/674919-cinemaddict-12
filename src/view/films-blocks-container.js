import {createElement} from "../utils/render.js";

const createFilmsContainerTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsBlocksContainer {
  constructor(statistic) {
    this._element = null;
    this._statistic = statistic;
  }

  getTemplate() {
    return createFilmsContainerTemplate(this._statistic);
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

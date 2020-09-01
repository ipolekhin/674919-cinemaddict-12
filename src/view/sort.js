import {SORT_NAMES} from "../const.js";
import {createElement} from "../utils/render.js";

const createSorMarkup = () => {
  return (
    SORT_NAMES.map((name) => {
      return (
        `<li>
          <a
            href="#"
            class="sort__button"
            data-sort-type="${name}"
          >Sort by ${name}</a>
        </li>`
      );
    }).join(`\n`)
  );
};

const createSortTemplate = () => {
  const sortMarkup = createSorMarkup();

  return (
    `<ul class="sort">
      ${sortMarkup}
    </ul>`
  );
};

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate();
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

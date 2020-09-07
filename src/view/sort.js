import {SortType, SORT_NAMES} from "../const.js";
import AbstractView from "./abstract.js";

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

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
    this._setActiveClass();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _getCurrentElement() {
    return this.getElement().querySelector(`a[data-sort-type="${this._currentSortType}"]`);
  }

  _setActiveClass() {
    this._getCurrentElement().classList.add(`sort__button--active`);
  }

  _removeActiveClass() {
    this._getCurrentElement().classList.remove(`sort__button--active`);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(event) {
    event.preventDefault();

    if (event.target.tagName !== `A`) {
      return;
    }

    const sortType = event.target.dataset.sortType;
    if (this._currentSortType === sortType) {
      return;
    }

    this._removeActiveClass();
    this._currentSortType = sortType;
    this._setActiveClass();
    this._callback.sortTyepChange(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTyepChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

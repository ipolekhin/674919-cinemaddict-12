import {createElement} from "../utils/render.js";

const createFilmsContainerTemplate = (className, title) => {
  const sectionClassName = className ? `films-list--extra` : `films-list`;
  const filmsListTitle = title ? title : `All movies. Upcoming`;
  const hiddenClassName = title ? `` : `visually-hidden`;

  return (
    `<section class="${sectionClassName}">
      <h2 class="films-list__title ${hiddenClassName}">${filmsListTitle}</h2>
    </section>`
  );
};

export default class FilmsContainer {
  constructor(className, title) {
    this._element = null;
    this._className = className;
    this._title = title;
  }

  getTemplate() {
    return createFilmsContainerTemplate(this._className, this._title);
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

import AbstractView from "./abstract.js";

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

export default class FilmsContainer extends AbstractView {
  constructor(className, title) {
    super();
    this._className = className;
    this._title = title;
  }

  getTemplate() {
    return createFilmsContainerTemplate(this._className, this._title);
  }
}

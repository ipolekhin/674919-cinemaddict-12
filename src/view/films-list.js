export const createFilmsListTemplate = (className, title) => {
  const sectionClassName = className ? `films-list--extra` : `films-list`;
  const filmsListTitle = title ? title : `All movies. Upcoming`;
  const hiddenClassName = title ? `` : `visually-hidden`;

  return (
    `<section class="${sectionClassName}">
      <h2 class="films-list__title ${hiddenClassName}">${filmsListTitle}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

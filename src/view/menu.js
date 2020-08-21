import {NavigationTagsType} from "../const.js";

const createNavigationMarkup = ({name, filterName, count, checked}) => {
  const check = !checked ? `main-navigation__item--active` : ``;

  return (
    `<a
      href="#${filterName}"
      class="main-navigation__item ${check}">
      ${name}
      ${filterName !== NavigationTagsType.ALL ? `<span class="main-navigation__item-count">${count}</span>` : ``}
    </a>`
  );
};

export const createMenuTemplate = (navigations) => {
  const [navigationStats] = navigations.slice(-1);
  const navigationMarkup = navigations
    .slice(0, -1)
    .map((navigation) => createNavigationMarkup(navigation))
    .join(`\n`);

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${navigationMarkup}
      </div>
      <a href="#${navigationStats.filterName}" class="main-navigation__additional">${navigationStats.name}</a>
    </nav>`
  );
};

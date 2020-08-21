import {SORT_NAMES} from "../const.js";

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

export const createSortTemplate = () => {
  const sortMarkup = createSorMarkup();

  return (
    `<ul class="sort">
      ${sortMarkup}
    </ul>`
  );
};

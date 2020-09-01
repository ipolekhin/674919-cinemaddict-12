import {createElement} from "../utils/render.js";
import {NavigationTagsType} from "../const.js";
import {setProfileRating} from "../utils/common.js";

const rank = (statistics) => {
  return statistics.reduce((result, {filterName, count}) => {
    if (filterName === NavigationTagsType.WATCHLIST) {
      result = count;
    }
    return result;
  }, 0);
};

const createUserRatingTemplate = (statistics) => {
  const countWatched = rank(statistics);
  const profileRank = setProfileRating(countWatched);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRating {
  constructor(statistic) {
    this._element = null;
    this._statistic = statistic;
  }

  getTemplate() {
    return createUserRatingTemplate(this._statistic);
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

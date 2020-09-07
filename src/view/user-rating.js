import AbstractView from "./abstract.js";
import {setProfileRating} from "../utils/common.js";
import {NavigationTagsType} from "../const.js";

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

export default class UserRating extends AbstractView {
  constructor(statistic) {
    super();
    this._statistic = statistic;
  }

  getTemplate() {
    return createUserRatingTemplate(this._statistic);
  }
}

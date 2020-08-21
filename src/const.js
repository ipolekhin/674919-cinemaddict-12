import {ProfileType} from "../../674919-cinemaddict-11/src/const";

export const AGE_RESTRICTIONS = [
  `18+`
];

export const ButtonTagType = {
  WATCHLIST: `add-to-watchlist`,
  WATCHED: `mark-as-watched`,
  FAVORITE: `favorite`,
};

export const ButtonType = {
  [ButtonTagType.WATCHLIST]: `Add to watchlist`,
  [ButtonTagType.WATCHED]: `Mark as watched`,
  [ButtonTagType.FAVORITE]: `Mark as favorite`,
};

export const BUTTON_TAG_NAMES = [
  ButtonTagType.WATCHLIST,
  ButtonTagType.WATCHED,
  ButtonTagType.FAVORITE,
];

export const COUNTRY_NAMES = [
  `Australia`,
  `France`,
  `Russia`,
  `Spain`,
  `UK`,
  `USA`,
];

export const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

export const EMOJI_SMILES = [
  EmojiType.SMILE,
  EmojiType.SLEEPING,
  EmojiType.PUKE,
  EmojiType.ANGRY,
];

export const GENRE_NAMES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
];

export const Keys = {
  ESC: `Esc`,
  ESCAPE: `Escape`,
};

export const NavigationTagsType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`,
};

export const NavigationType = {
  [NavigationTagsType.ALL]: `All movies`,
  [NavigationTagsType.WATCHLIST]: `Watchlist`,
  [NavigationTagsType.HISTORY]: `History`,
  [NavigationTagsType.FAVORITES]: `Favorites`,
  [NavigationTagsType.STATS]: `Stats`,
};

export const ProfileIntervals = [
  {MIN: 0, MAX: 10},
  {MIN: 10, MAX: 20},
  {MIN: 20, MAX: Infinity},
];

export const PROFILE_RATING = [
  ProfileType.NOVICE,
  ProfileType.FAN,
  ProfileType.MOVIE_BUFF,
];

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const SORT_NAMES = [
  SortType.DEFAULT,
  SortType.DATE,
  SortType.RATING,
];

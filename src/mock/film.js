import {
  ACTOR_NAMES,
  DESCRIPTION_ITEMS,
  DIRECTOR_NAMES,
  POSTERS_IMAGES,
  TITLE_ITEMS,
  WRITER_NAMES,
} from "./const.js";
import {
  AGE_RESTRICTIONS,
  COUNTRY_NAMES,
  GENRE_NAMES,
} from "../const.js";
import {
  getRandomBooleanValue,
  getRandomDate,
  getRandomFractionalNumbers,
  getRandomIntegerNumber,
  getRandomItem,
  reshuffle,
} from "../utils/common.js";

const MIN_RATING = 1;
const MAX_RATING = 10;
const COUNT_AFTER_COMMA = 1;
const START_YEAR = 1929;
const MIN_MINUTES_DURATION = 30;
const MAX_MINUTES_DURATION = 180;
const MAX_DESCRIPTIONS = 5;
const MAX_COMMENTS_COUNT = 15;

const generateFilm = () => {
  const actors = reshuffle(ACTOR_NAMES, ACTOR_NAMES.length).join(`, `);
  const ageRating = getRandomBooleanValue() ? `<p class="film-details__age">${AGE_RESTRICTIONS}</p>` : ``;
  const commentsCount = getRandomIntegerNumber(0, MAX_COMMENTS_COUNT);
  const country = getRandomItem(COUNTRY_NAMES);
  const description = reshuffle(DESCRIPTION_ITEMS, MAX_DESCRIPTIONS).join(`\n`);
  const director = getRandomItem(DIRECTOR_NAMES);
  const duration = getRandomIntegerNumber(MIN_MINUTES_DURATION, MAX_MINUTES_DURATION);
  const genres = reshuffle(GENRE_NAMES, GENRE_NAMES.length);
  const id = String(new Date() + Math.random());
  const poster = getRandomItem(POSTERS_IMAGES);
  const rating = getRandomFractionalNumbers(MIN_RATING, MAX_RATING, COUNT_AFTER_COMMA);
  const releaseDate = getRandomDate(new Date(START_YEAR, 0), new Date());
  const title = getRandomItem(TITLE_ITEMS);
  const writers = reshuffle(WRITER_NAMES, WRITER_NAMES.length).join(`, `);
  // console.log(ageRating);

  return ({
    actors,
    ageRating,
    commentsCount,
    country,
    description,
    director,
    duration,
    genres,
    id,
    poster,
    rating,
    releaseDate,
    title,
    writers,
    isWatchlist: getRandomBooleanValue(),
    isWatched: getRandomBooleanValue(),
    isFavorite: getRandomBooleanValue(),
    originalTitle: title,
  });
};

const generateFilms = (FILMS_COUNT) => {
  return new Array(FILMS_COUNT).fill(``).map(generateFilm);
};

export {generateFilms};

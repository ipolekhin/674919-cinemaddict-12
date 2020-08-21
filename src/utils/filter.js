import {NavigationType, NavigationTagsType} from "../const";

const getAllMovies = (movies) => {
  return movies;
};

const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isWatchlist);
};

const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.isFavorite);
};

const getMoviesByFilter = (films, filterType) => {
  switch (filterType) {
    case NavigationTagsType.ALL:
      return getAllMovies(films);
    case NavigationTagsType.WATCHLIST:
      return getWatchlistMovies(films);
    case NavigationTagsType.HISTORY:
      return getWatchedMovies(films);
    case NavigationTagsType.FAVORITES:
      return getFavoriteMovies(films);
  }

  return films;
};

const filterMenu = (films) => {
  return (
    Object.values(NavigationTagsType).map((filterType, index) => {
      return ({
        name: NavigationType[filterType],
        filterName: filterType,
        count: getMoviesByFilter(films, filterType).length,
        checked: index,
      });
    })
  );
};

export {filterMenu};

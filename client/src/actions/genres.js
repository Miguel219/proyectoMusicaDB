import * as types from '../types/genres';


export const addGenre = genre => ({
  type: types.GENRE_ADDED,
  payload: genre,
});

export const clearGenres = () => ({
  type: types.GENRES_CLEAR,
});
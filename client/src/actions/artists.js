import * as types from '../types/artists';


export const addArtist = artist => ({
  type: types.ARTIST_ADDED,
  payload: artist,
});

export const clearArtists = () => ({
  type: types.ARTISTS_CLEAR,
});

export const selectArtist = artist => ({
  type: types.ARTIST_SELECTED,
  payload: artist,
});
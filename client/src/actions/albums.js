import * as types from '../types/albums';


export const addAlbum = album => ({
  type: types.ALBUM_ADDED,
  payload: album,
});

export const clearAlbums = () => ({
  type: types.ALBUMS_CLEAR,
});

export const selectAlbum = album => ({
  type: types.ALBUM_SELECTED,
  payload: album,
});

export const deselectAlbum = () => ({
  type: types.ALBUM_DESELECTED,
});
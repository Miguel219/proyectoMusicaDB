import { combineReducers } from 'redux';

import * as types from '../types/albums';


const order = (state = [], action) => {
  switch (action.type) {
    case types.ALBUM_ADDED: {
      return [...state, action.payload.albumid];
    }
    case types.ALBUMS_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const byId = (state = [], action) => {
  switch (action.type) {
    case types.ALBUM_ADDED: {
      return {
        ...state,
        [action.payload.albumid]: action.payload,
      };
    }
    case types.ALBUMS_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const selected = (state = {}, action) => {
  switch (action.type) {
    case types.ALBUM_SELECTED: {
      var newState = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const albums = combineReducers({
  byId,
  order,
  selected,
});

export default albums;

export const getAlbum = (state, albumid) => state.byId[albumid];
export const getAlbums = state => state.order.map(
  id => getAlbum(state, id),
).filter(album => album != null);
export const getSelectedAlbum = state => (state.selected);
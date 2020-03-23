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

const orderDropDown = (state = [], action) => {
  switch (action.type) {
    case types.ALBUMDROPDOWN_ADDED: {
      return [...state, action.payload.albumid];
    }
    case types.ALBUMDROPDOWN_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const byIdDropDown = (state = [], action) => {
  switch (action.type) {
    case types.ALBUMDROPDOWN_ADDED: {
      return {
        ...state,
        [action.payload.albumid]: action.payload,
      };
    }
    case types.ALBUMDROPDOWN_CLEAR: {
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
    case types.ALBUM_DESELECTED: {
      var newStateClear = {};
      return newStateClear;
    }
    default: {
      return state;
    }
  }
};

const albums = combineReducers({
  byId,
  order,
  byIdDropDown,
  orderDropDown,
  selected,
});

export default albums;

export const getAlbum = (state, albumid) => state.byId[albumid];
export const getAlbums = state => state.order.map(
  id => getAlbum(state, id),
).filter(album => album != null);
export const getAlbumDropDown = (state, albumid) => state.byIdDropDown[albumid];
export const getAlbumsDropDown = state => state.orderDropDown.map(
  id => getAlbumDropDown(state, id),
).filter(album => album != null);
export const getSelectedAlbum = state => (state.selected);
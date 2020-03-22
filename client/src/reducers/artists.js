import { combineReducers } from 'redux';

import * as types from '../types/artists';


const order = (state = [], action) => {
  switch (action.type) {
    case types.ARTIST_ADDED: {
      return [...state, action.payload.artistid];
    }
    case types.ARTISTS_CLEAR: {
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
    case types.ARTIST_ADDED: {
      return {
        ...state,
        [action.payload.artistid]: action.payload,
      };
    }
    case types.ARTISTS_CLEAR: {
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
    case types.ARTIST_SELECTED: {
      var newState = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const artists = combineReducers({
  byId,
  order,
  selected,
});

export default artists;

export const getArtist = (state, artistid) => state.byId[artistid];
export const getArtists = state => state.order.map(
  id => getArtist(state, id),
).filter(artist => artist != null);
export const getSelectedArtist = state => (state.selected);
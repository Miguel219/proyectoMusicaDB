import { combineReducers } from 'redux';

import * as types from '../types/genres';


const order = (state = [], action) => {
  switch (action.type) {
    case types.GENRE_ADDED: {
      return [...state, action.payload.genreid];
    }
    case types.GENRES_CLEAR: {
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
    case types.GENRE_ADDED: {
      return {
        ...state,
        [action.payload.genreid]: action.payload,
      };
    }
    case types.GENRES_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const genres = combineReducers({
  byId,
  order,
});

export default genres;

export const getGenre = (state, genreid) => state.byId[genreid];
export const getGenres = state => state.order.map(
  id => getGenre(state, id),
).filter(genre => genre != null);
import { combineReducers } from 'redux';

import * as types from '../types/tracks';


const order = (state = [], action) => {
  switch (action.type) {
    case types.TRACK_ADDED: {
      return [...state, action.payload.trackid];
    }
    case types.TRACKS_CLEAR: {
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
    case types.TRACK_ADDED: {
      return {
        ...state,
        [action.payload.trackid]: action.payload,
      };
    }
    case types.TRACKS_CLEAR: {
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
    case types.TRACK_SELECTED: {
      var newState = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const tracks = combineReducers({
  byId,
  order,
  selected,
});

export default tracks;

export const getTrack = (state, trackid) => state.byId[trackid];
export const getTracks = state => state.order.map(
  id => getTrack(state, id),
).filter(track => track != null);
export const getSelectedTrack = state => (state.selected);
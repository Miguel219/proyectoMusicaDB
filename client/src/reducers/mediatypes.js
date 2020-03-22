import { combineReducers } from 'redux';

import * as types from '../types/mediatypes';


const order = (state = [], action) => {
  switch (action.type) {
    case types.MEDIATYPE_ADDED: {
      return [...state, action.payload.mediatypeid];
    }
    case types.MEDIATYPES_CLEAR: {
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
    case types.MEDIATYPE_ADDED: {
      return {
        ...state,
        [action.payload.mediatypeid]: action.payload,
      };
    }
    case types.MEDIATYPES_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const mediatypes = combineReducers({
  byId,
  order,
});

export default mediatypes;

export const getMediatype = (state, mediatypeid) => state.byId[mediatypeid];
export const getMediatypes = state => state.order.map(
  id => getMediatype(state, id),
).filter(mediatype => mediatype != null);
import { combineReducers } from 'redux';
import omit from 'lodash/omit';

import * as types from '../types/cart';


const order = (state = [], action) => {
  switch (action.type) {
    case types.CART_ADDED: {
      return [...state, action.payload.trackid];
    }
    case types.CART_DELETED: {
      const newState = state.filter(trackid => trackid !==  action.payload);
      return newState;
    }
    case types.CART_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CART_ADDED: {
      return {
        ...state,
        [action.payload.trackid]: action.payload,
      };
    }
    case types.CART_DELETED: {
      return omit(state, action.payload);
    }
    case types.CART_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const cart = combineReducers({
  byId,
  order,
});

export default cart;

export const getTrackInCart = (state, trackid) => state.byId[trackid];
export const getTracksInCart = state => state.order.map(
  id => getTrackInCart(state, id),
).filter(track => track != null);
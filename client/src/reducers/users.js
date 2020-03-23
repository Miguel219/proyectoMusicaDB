import { combineReducers } from 'redux';

import * as types from '../types/users';


const order = (state = [], action) => {
  switch (action.type) {
    case types.USER_ADDED: {
      return [...state, action.payload.userid];
    }
    case types.USERS_CLEAR: {
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
    case types.USER_ADDED: {
      return {
        ...state,
        [action.payload.userid]: action.payload,
      };
    }
    case types.USERS_CLEAR: {
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
    case types.USER_SELECTED: {
      var newState = action.payload;
      return newState;
    }
    case types.USER_DESELECTED: {
      var newStateClear = {};
      return newStateClear;
    }
    default: {
      return state;
    }
  }
};

const users = combineReducers({
  byId,
  order,
  selected,
});

export default users;

export const getUser = (state, userid) => state.byId[userid];
export const getUsers = state => state.order.map(
  id => getUser(state, id),
).filter(user => user != null);
export const getSelectedUser = state => (state.selected);
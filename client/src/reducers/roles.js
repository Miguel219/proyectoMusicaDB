import { combineReducers } from 'redux';

import * as types from '../types/roles';


const order = (state = [], action) => {
  switch (action.type) {
    case types.ROLE_ADDED: {
      return [...state, action.payload.roleid];
    }
    case types.ROLES_CLEAR: {
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
    case types.ROLE_ADDED: {
      return {
        ...state,
        [action.payload.roleid]: action.payload,
      };
    }
    case types.ROLES_CLEAR: {
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
    case types.ROLE_SELECTED: {
      var newState = action.payload;
      return newState;
    }
    case types.ROLE_DESELECTED: {
      var newStateClear = {};
      return newStateClear;
    }
    default: {
      return state;
    }
  }
};

const roles = combineReducers({
  byId,
  order,
  selected,
});

export default roles;

export const getRole = (state, roleid) => state.byId[roleid];
export const getRoles = state => state.order.map(
  id => getRole(state, id),
).filter(role => role != null);
export const getSelectedRole = state => (state.selected);

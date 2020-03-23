import { combineReducers } from 'redux';

import * as types from '../types/permissions';


const order = (state = [], action) => {
  switch (action.type) {
    case types.PERMISSION_ADDED: {
      return [...state, action.payload.permissionid];
    }
    case types.PERMISSIONS_CLEAR: {
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
    case types.PERMISSION_ADDED: {
      return {
        ...state,
        [action.payload.permissionid]: action.payload,
      };
    }
    case types.PERMISSIONS_CLEAR: {
      const newState = [];
      return newState;
    }
    default: {
      return state;
    }
  }
};

const permissions = combineReducers({
  byId,
  order,
});

export default permissions;

export const getPermission = (state, permissionid) => state.byId[permissionid];
export const getPermissions = state => state.order.map(
  id => getPermission(state, id),
).filter(permission => permission != null);
import * as types from '../types/roles';


export const addRole = role => ({
  type: types.ROLE_ADDED,
  payload: role,
});

export const clearRoles = () => ({
  type: types.ROLES_CLEAR,
});

export const selectRole = role => ({
  type: types.ROLE_SELECTED,
  payload: role,
});

export const deselectRole = () => ({
  type: types.ROLE_DESELECTED,
});

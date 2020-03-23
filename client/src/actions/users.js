import * as types from '../types/users';


export const addUser = user => ({
  type: types.USER_ADDED,
  payload: user,
});

export const clearUsers = () => ({
  type: types.USERS_CLEAR,
});

export const selectUser = user => ({
  type: types.USER_SELECTED,
  payload: user,
});

export const deselectUser = () => ({
  type: types.USER_DESELECTED,
});
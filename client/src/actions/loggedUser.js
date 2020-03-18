import * as types from '../types/loggedUser';


export const login = id => ({
  type: types.USER_LOGGED_IN,
  payload: id,
});

export const logout = () => ({
  type: types.USER_LOGGED_OFF,
});
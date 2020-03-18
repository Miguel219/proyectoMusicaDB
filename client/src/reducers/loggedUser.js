import * as types from '../types/loggedUser';


const loggedUser = (state = null, action) => {
  var newState = null;
  switch (action.type) {
    case types.USER_LOGGED_IN: {
      newState = action.payload;
      return newState;
    }
    case types.USER_LOGGED_OFF: {
      newState = null;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default loggedUser;

export const getLoggedUser = state => state;
export const isLoggedUser = state => ((state !== null) ? true : false);
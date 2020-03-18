import { combineReducers } from 'redux';

import loggedUser, * as loggedUserSelectors from './loggedUser';


const reducer = combineReducers({
  loggedUser,
});


export default reducer;


export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);

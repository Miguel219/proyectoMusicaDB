import throttle from 'lodash/throttle'
import { createStore } from 'redux';

import reducer from './reducers';
import { loadState, saveState } from './localStorage';


const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(reducer, persistedState);

  store.subscribe(throttle(() => {
    saveState({
      loggedUser: store.getState().loggedUser,
    });
  }, 1000));  

  return store;
}

export default configureStore;
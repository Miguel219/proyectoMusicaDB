import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import { createHashHistory } from 'history';

import * as selectors from '../../reducers';
import Login from '../Login';
import { Signin } from '../Signin';
import { Sidebar } from '../Sidebar';
import Tracks from '../Tracks';
import EditTrack from '../EditTrack';
import Artists from '../Artists';
import Albums from '../Albums';
import logo from '../../../public/Images/music-note.png';


const history = createHashHistory();
const App = ({ store }) => { 
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.href = logo;
    document.getElementsByTagName('head')[0].appendChild(link);
  return(
  <Provider store={store}>
    <Router history={history} >
    <Route exact path="/" render={() => { 
      const initialPage = ((selectors.isLoggedUser(store.getState())) 
        ? '/main/canciones'  
        : '/login');
      return(
      <Redirect to={initialPage}/>
    )}}/>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signin'>
        <Signin />
      </Route>
      <Route path='/main'>
        <Sidebar />
        <Route path='/main/canciones'>
          <Tracks />
        </Route>
        <Route path='/main/artistas'>
          <Artists />
        </Route>
        <Route path='/main/álbumes'>
          <Albums />
        </Route>
      </Route>
      <Route path='/editarCanción'>
        <EditTrack />
      </Route>
    </Router>
  </Provider>
)};


export default App;

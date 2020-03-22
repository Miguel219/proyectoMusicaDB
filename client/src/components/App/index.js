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


export const  history = createHashHistory();
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
      <Route path='/main'
      render={() => { 
        const page = ((selectors.isLoggedUser(store.getState())) 
          ? '/login'  
          : '/main');
        return(
        <Redirect to={page}/>
      )}} > 
        <Sidebar />
        <Route path='/main/canciones' 
         render={() => { 
           console.log((selectors.isLoggedUser(store.getState())));
          const page = ((selectors.isLoggedUser(store.getState())) 
            ? <Tracks />
            :  <Redirect to={'/login'}/>);
          return(
            page
        )}}>
          
        </Route>
        <Route path='/main/artistas' render={() => { 
           console.log((selectors.isLoggedUser(store.getState())));
          const page = ((selectors.isLoggedUser(store.getState())) 
            ? <Artists />
            :  <Redirect to={'/login'}/>);
          return(
            page
        )}}>
          
        </Route>
        <Route path='/main/álbumes' render={() => { 
           console.log((selectors.isLoggedUser(store.getState())));
          const page = ((selectors.isLoggedUser(store.getState())) 
            ?  <Albums />
            :  <Redirect to={'/login'}/>);
          return(
            page
        )}}>
         
        </Route>
      </Route>
      <Route path='/editarCanción'
      render={() => { 
        console.log((selectors.isLoggedUser(store.getState())));
       const page = ((selectors.isLoggedUser(store.getState())) 
         ?  <EditTrack />
         :  <Redirect to={'/login'}/>);
       return(
         page
     )}}>
        
      </Route>
    </Router>
  </Provider>
)};


export default App;

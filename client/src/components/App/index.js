import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import { createHashHistory } from 'history';

import * as selectors from '../../reducers';
import Login from '../Login';
import { Signin } from '../Signin';
import Sidebar from '../Sidebar';
import SidebarAdmin from '../SidebarAdmin';
import Tracks from '../Tracks';
import EditTrack from '../EditTrack';
import Artists from '../Artists';
import Reports from '../Reports'
import EditArtist from '../EditArtist';
import Albums from '../Albums';
import EditAlbum from '../EditAlbum';
import Users from '../Users';
import EditUser from '../EditUser';
import Roles from '../Roles';
import logo from '../../../public/Images/music-note.png';
import PrivateRoute from '../PrivateRouter'


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
        ? (selectors.getLoggedUser(store.getState()).roleid===1) ? '/admin/usuarios' : '/main/canciones'  
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
        <PrivateRoute path={'/main/canciones'}  component={<Tracks />} store={store}/>
        <PrivateRoute path={'/main/artistas'}  component={<Artists />} store={store}/>
        <PrivateRoute path={'/main/álbumes'}  component={<Albums />} store={store}/>
        <PrivateRoute path={'/main/reportes'}  component={<Reports />} store={store}/>
      </Route>
      <Route path='/editar'
      render={() => { 
        const page = ((selectors.isLoggedUser(store.getState())) 
          ? '/login'  
          : '/editar');
        return(
        <Redirect to={page}/>
      )}} > 
        <PrivateRoute path={'/editar/canción'}  component={<EditTrack />} store={store}/>
        <PrivateRoute path={'/editar/artista'}  component={<EditArtist />} store={store}/>
        <PrivateRoute path={'/editar/álbum'}  component={<EditAlbum />} store={store}/>
        <PrivateRoute path={'/editar/usuario'}  component={<EditUser />} store={store}/>
      </Route>
      
      <Route path='/admin'
      render={() => { 
        const page = ((selectors.isLoggedUser(store.getState())) 
          ? '/login'  
          : '/admin');
        return(
        <Redirect to={page}/>
      )}} > 
        <SidebarAdmin />
        <PrivateRoute path={'/admin/usuarios'}  component={<Users />} store={store}/>
        <PrivateRoute path={'/admin/roles'}  component={<Roles />} store={store}/>
      </Route>

      
     
    </Router>
  </Provider>
)};


export default App;

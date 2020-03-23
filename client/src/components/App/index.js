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
import EditRole from '../EditRole';
import AssignPermission from '../AssignPermission';
import logo from '../../../public/Images/music-note.png';
import PrivateRoute from '../PrivateRouter'
import PrivateRouteAdmin from '../PrivateRouterAdmin'


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
          ?  '/main' 
          : '/login' );
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
          ? '/editar' 
          : '/login');
        return(
        <Redirect to={page}/>
      )}} > 
        <PrivateRoute path={'/editar/canción'}  component={<EditTrack />} store={store}/>
        <PrivateRoute path={'/editar/artista'}  component={<EditArtist />} store={store}/>
        <PrivateRoute path={'/editar/álbum'}  component={<EditAlbum />} store={store}/>
        <PrivateRouteAdmin path={'/editar/usuario'}  component={<EditUser />} store={store}/>
        <PrivateRouteAdmin path={'/editar/rol'}  component={<EditRole />} store={store}/>
        <PrivateRouteAdmin path={'/editar/permisos'}  component={<AssignPermission />} store={store}/>

      </Route>
      
      <Route path='/admin'
      render={() => { 
        const page = ((selectors.isLoggedUser(store.getState())) 
          ? '/admin'  
          : '/login');
        return(
        <Redirect to={page}/>
      )}} > 
        <SidebarAdmin />
        <PrivateRouteAdmin path={'/admin/usuarios'}  component={<Users />} store={store}/>
        <PrivateRouteAdmin path={'/admin/roles'}  component={<Roles />} store={store}/>
      </Route>

      
     
    </Router>
  </Provider>
)};


export default App;

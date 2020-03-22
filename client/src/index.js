import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import App from './components/App';
//import artistService from './services/artist'
//import trackService from './services/track'
//import albumService from './services/album'
//import genreService from './services/genre'
//import mediatypeService from './services/mediatype'
//import reportService from './services/report'

import userService from './services/user'

const store = configureStore();

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root'),
);





//Pruebas de servicios
//console.log(artistService.getArtistList({artistname:"",limit:"All"}).then(res=> console.log(res)))
//console.log(artistService.getArtistAlbums({artistid:"5"}).then(res=> console.log(res)))
//console.log(trackService.getTrackList({trackname:"",genrename:"",albumname:"",artistname:"",limit:"All"}).then(res=> console.log(res)))

//console.log(albumService.getAlbumTracks({albumid:"5"}).then(res=> console.log(res)))
//console.log(albumService.getAlbumList({}).then(res=> console.log(res)))

//console.log(genreService.getGenreListAll().then(res=> console.log(res)))
//console.log(mediatypeService.getMediatypeListAll().then(res=> console.log(res)))

//console.log(reportService.getReport({reportType:1}).then(res=> console.log(res)))
//console.log(reportService.getReport({reportType:2,limit:"All"}).then(res=> console.log(res)))
//console.log(reportService.getReport({reportType:3}).then(res=> console.log(res)))
//console.log(reportService.getReport({reportType:4}).then(res=> console.log(res)))
//console.log(reportService.getReport({reportType:5}).then(res=> console.log(res)))
//console.log(reportService.getReport({reportType:6,limit:"All"}).then(res=> console.log(res)))
//console.log(reportService.getReport({reportType:7}).then(res=> console.log(res)))
//console.log(reportService.getReport({reportType:8}).then(res=> console.log(res)))


//console.log(userService.getUserPermissions({userid:"adminMusic@gmail.com"}).then(res=> console.log(res)))
//console.log(userService.useridtaken({userid:"adminMusic@gmail.com"}).then(res=> console.log(res[0].isuseridtaken)))

//console.log(userService.loginuser({userid:"adminMusic@gmail.com",password:"admin2020"}).then(res=> console.log(res)))
//te devuelve vacio si el usuario no existe loginuser
//sino te devuelve el usuario
//console.log(userService.loginuser({userid:"adminMusic@gmail.com",password:""}).then(res=> console.log(res)))
//console.log(userService.addUser({userid:"silvio@gmail.com",password:"hola",name:"Silvio",lastname:"Orozco",birthdate:"12/06/1999"}).then(res=> console.log(res)))
//console.log(userService.getUserListAll().then(res=> console.log(res)))
//console.log(userService.assignrole({userid:"silvio@gmail.com",roleid:1}).then(res=> console.log(res)))
//console.log(userService.unassignRole({userid:"silvio@gmail.com"}).then(res=> console.log(res)))
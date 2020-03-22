import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import App from './components/App';
//import artistService from './services/artist'
//import trackService from './services/track'
//import albumService from './services/album'
//import genreService from './services/genre'
//import mediatypeService from './services/mediatype'
import reportService from './services/report'

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

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import App from './components/App';
import artistService from './services/artist'

const store = configureStore();

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root'),
);




// console.log(updateArtist({artistId:279,artistName:"Hola"}).then(res=> console.log(res)));
// console.log(getArtistList({search:"",limit:"all"}).then(res=> console.log(res)));

console.log(artistService.getArtistListAll().then(res=> console.log(res)))
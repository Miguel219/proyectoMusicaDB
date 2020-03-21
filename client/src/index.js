import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store';
import App from './components/App';
import artistService from './services/artist'
import trackService from './services/track'

const store = configureStore();

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root'),
);






console.log(artistService.getArtistList({artistname:"",limit:"All"}).then(res=> console.log(res)))
console.log(trackService.getTrackList({trackname:"",genrename:"",albumname:"",artistname:"",limit:"All"}).then(res=> console.log(res)))
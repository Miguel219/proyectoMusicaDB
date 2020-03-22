import React, { useState } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import * as selectors from '../../reducers';
import albumService from '../../services/album';
import * as actionAlbums from '../../actions/albums';


const EditTrack = ({ track, albumDropDown, getAlbumDropDown }) => {
  document.body.style.backgroundColor = '#b3ffff';
  const [nameInput, changeNameInput] = useState(track.trackname);
  console.log(track)
  return (
    <div className="edit-track">
      <div className='edit-track-content'>
      <div className='edit-track-content-row'>
          <input className="edit-track-input"
            type="text"
            placeholder="Nombre"
            value={nameInput}
            onChange={e => changeNameInput(e.target.value)}
          />
          <select defaultValue={(track.albumid == null) ? ('DEFAULT') : (track.albumid)} className="edit-track-select" onLoad={() =>getAlbumDropDown()}>
            <option value="DEFAULT" disabled hidden>
              {'Selecciona un álbum'}
            </option>
            {albumDropDown.map((album) => (
            <option key={album.albumid} value={album.albumid}>
              {album.albumname}
            </option>
            ))}
          </select>
        </div>
        <div className='edit-track-content-row'>
          <input className="edit-track-input"
            type="text"
            placeholder="Nombre"
            value={nameInput}
            onChange={e => changeNameInput(e.target.value)}
          />
          <select defaultValue={(track.albumid == null) ? ('DEFAULT') : (track.albumid)} className="edit-track-select" onLoad={() =>getAlbumDropDown()}>
            <option value="DEFAULT" disabled hidden>
              {'Selecciona un álbum'}
            </option>
            {albumDropDown.map((album) => (
            <option key={album.albumid} value={album.albumid}>
              {album.albumname}
            </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
} 


export default connect(
  state => ({
    track: selectors.getSelectedTrack(state),
    albumDropDown: selectors.getAlbums(state),
  }),
  dispatch => ({
    getAlbumDropDown() {
      albumService.getAlbumListAll().then(res=> {
        res.map(album => dispatch(actionAlbums.addAlbum(album)))
      });
      
    },
  }),
)(EditTrack);

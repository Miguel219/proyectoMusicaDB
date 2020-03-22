import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import trackService from '../../services/track';

const trackModel = {
  trackid: null,
  trackname: "",
  albumid: null,
  albumname: "",
  genreid: null,
  genrename: "",
  artistid: null,
  artistname: "",
  mediatypeid: null,
  mediatypename: "",
  composer: "",
  milliseconds: 0,
  bytes: 0,
  unitprice: "",
};

const EditTrack = ({ track, albumList, genreList, mediatypeList, onSave, onDelete }) => {
  track = {...trackModel, ...track}
  document.body.style.backgroundColor = '#434343';
  const [nameInput, changeNameInput] = useState(track.trackname);
  const [albumDropDown, changeAlbumDropDown] = useState(track.albumid);
  const [genreDropDown, changeGenreDropDown] = useState(track.genreid);
  const [mediatypeDropDown, changeMediatypeDropDown] = useState(track.mediatypeid);
  const [composerInput, changeComposerInput] = useState(track.composer);
  const [millisecondsInput, changeMillisecondsInput] = useState(track.milliseconds);
  const [bytesInput, changeBytesInput] = useState(track.bytes);
  const [unitpriceInput, changeUnitpriceInput] = useState(track.unitprice);
  return (
    <div className="edit-track">
      <div className='edit-track-content'>
        <div className='edit-track-title'>
          {(track.trackid==null) ? 'Crear canción' : "Editar canción"}
        </div>
        <Table className="edit-track-table" borderless>
          <thead>
            <tr>
              <th>{'Nombre de canción:'}</th>
              <th>{"Álbum:"}</th>
              <th>{"Género:"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="edit-track-input"
                  type="text"
                  placeholder="Ingresa el nombre de la canción"
                  value={nameInput}
                  onChange={e => changeNameInput(e.target.value)}
                />
              </td>
              <td>
                <select value={(albumDropDown == null) ? ('DEFAULT') : (albumDropDown)} onChange={e => changeAlbumDropDown(e.target.value)} className="edit-track-select">
                  <option value="DEFAULT" disabled hidden>
                    {'Selecciona un álbum'}
                  </option>
                  {albumList.map(album => (
                  <option key={album.albumid} value={album.albumid}>
                    {album.albumname}
                  </option>
                  ))}
                </select>
              </td>
              <td>
                <select value={(genreDropDown == null) ? ('DEFAULT') : (genreDropDown)} onChange={e => changeGenreDropDown(e.target.value)} className="edit-track-select">
                  <option value="DEFAULT" disabled hidden>
                    {'Selecciona un género'}
                  </option>
                  {genreList.map(genre => (
                  <option key={genre.genreid} value={genre.genreid}>
                    {genre.genrename}
                  </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>{"Tipo de audio:"}</th>
              <th>{"Compositores:"}</th>
              <th>{"Duración (ms):"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select value={(mediatypeDropDown == null) ? ('DEFAULT') : (mediatypeDropDown)} onChange={e => changeMediatypeDropDown(e.target.value)} className="edit-track-select">
                  <option value="DEFAULT" disabled hidden>
                    {'Selecciona un tipo de audio'}
                  </option>
                  {mediatypeList.map(mediatype => (
                  <option key={mediatype.mediatypeid} value={mediatype.mediatypeid}>
                    {mediatype.mediatypename}
                  </option>
                  ))}
                </select>
              </td>
              <td>
                <input className="edit-track-input"
                  type="text"
                  placeholder="Ingresa los compositores"
                  value={composerInput}
                  onChange={e => changeComposerInput(e.target.value)}
                />
              </td>
              <td>
                <input className="edit-track-input"
                  type="number"
                  placeholder="Ingresa la duración (ms)"
                  value={millisecondsInput}
                  onChange={e => changeMillisecondsInput(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>{"Bytes:"}</th>
              <th>{"Precio:"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="edit-track-input"
                  type="number"
                  placeholder="Ingresa el número de bytes"
                  value={bytesInput}
                  onChange={e => changeBytesInput(e.target.value)}
                />
              </td>
              <td>
                <input className="edit-track-input"
                  type="number"
                  placeholder="Ingresa el precio"
                  value={unitpriceInput}
                  onChange={e => changeUnitpriceInput(e.target.value)}
                />
              </td>
              <td>
              <button type="submit" className="edit-track-button-save" onClick={() => 
                onSave({
                  trackid: track.trackid,
                  trackname: nameInput,
                  albumid: albumDropDown,
                  mediatypeid: mediatypeDropDown,
                  genreid: genreDropDown,
                  composer: composerInput,
                  milliseconds: millisecondsInput,
                  bytes: bytesInput,
                  unitprice: unitpriceInput
                })
              }>
                {(track.trackid==null) ? 'Crear' : "Editar"}
              </button>
              {(track.trackid==null) 
                ? <div/> 
                : <button type="submit" className="edit-track-button-delete" onClick={() => onDelete(track.trackid)}>
                    {'Eliminar'}
                  </button>
              }
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
} 


export default connect(
  state => ({
    track: selectors.getSelectedTrack(state),
    albumList: selectors.getAlbums(state),
    genreList: selectors.getGenres(state),
    mediatypeList: selectors.getMediatypes(state),
  }),
  dispatch => ({
    onSave(track) {
      if(track.trackname!=="" && track.albumid!=null && track.mediatypeid!=null && track.genreid!=null && track.composer!=="" && track.milliseconds!==0 && track.bytes!==0 && track.unitprice!=="") {
      if(track.trackid==null)
        trackService.addTrack(track).then(()=> history.push("/main/canciones"));
      if(track.trackid!=null)
        trackService.updateTrack(track).then(()=> history.push("/main/canciones"));
      }else{
        alert("Ingresa todos los campos para guardar.");
      };
    },
  }),
)(EditTrack);

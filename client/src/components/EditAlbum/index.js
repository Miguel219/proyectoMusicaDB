import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import * as actionTracks from '../../actions/tracks';
import albumService from '../../services/album';
import * as actionAlbums from '../../actions/albums';
import genreService from '../../services/genre';
import * as actionGenres from '../../actions/genres';
import mediatypeService from '../../services/mediatype';
import * as actionMediatypes from '../../actions/mediatypes';

const albumModel = {
  albumid: null,
  albumname: "",
  trackid: null,
  trackname: "",
  artistid: null,
  artistname: "",
};

const EditAlbum = ({ album, albumTracks, artistList, permissions, onSave, onDelete, selectColumn }) => {
  album = {...albumModel, ...album}
  document.body.style.backgroundColor = '#434343';
  const [nameInput, changeNameInput] = useState(album.albumname);
  const [artistDropDown, changeArtistDropDown] = useState(album.artistid);
  return (
    <div className="edit-album">
      <div className='edit-album-content'>
        <div className='edit-album-title'>
          {"Álbum"}
        </div>
        <Table className="edit-album-table" borderless>
          <thead>
            <tr>
              <th>{'Nombre del álbum:'}</th>
              <th>{'Artista:'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="edit-album-input"
                  type="text"
                  placeholder="Ingresa el nombre del álbum"
                  value={nameInput}
                  onChange={e => changeNameInput(e.target.value)}
                />
              </td>
              <td>
                <select value={(artistDropDown == null) ? ('DEFAULT') : (artistDropDown)} onChange={e => changeArtistDropDown(e.target.value)} className="edit-album-select">
                  <option value="DEFAULT" disabled hidden>
                    {'Selecciona un artista'}
                  </option>
                  {artistList.map(artist => (
                  <option key={artist.artistid} value={artist.artistid}>
                    {artist.artistname}
                  </option>
                  ))}
                </select>
              </td>
              <td>
                {(album.albumid==null && permissions.includes('Crear álbum')) ?
                  (<button type="submit" className="edit-album-button-save" onClick={() => 
                    onSave({
                      albumid: album.albumid,
                      albumname: nameInput,
                      artistid: artistDropDown,
                    })
                  }>
                    {'Crear'}
                  </button>): null
                }
                {(album.albumid!=null && permissions.includes('Editar álbum')) ?
                  (<button type="submit" className="edit-album-button-save" onClick={() => 
                    onSave({
                      albumid: album.albumid,
                      albumname: nameInput,
                      artistid: artistDropDown,
                    })
                  }>
                    {'Editar'}
                  </button>): null
                }                
                {(album.albumid!=null && permissions.includes('Borrar álbum')) ? 
                  <button type="submit" className="edit-album-button-delete" onClick={() => onDelete(album, albumTracks.length>0)}>
                  {'Eliminar'}
                </button> : 
                  null
                }
                <button type="submit" className="edit-album-button-delete w3-cyan" style={{marginLeft:'10px'}} onClick={() => history.goBack()}>
                  {'Regresar'}
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="edit-album-table-tracks-container">
          {'Canciones del Álbum:'}
          <Table className='edit-album-table-tracks' size="sm" hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Canción</th>
              </tr>
            </thead>
            <tbody>
              {albumTracks.map((track, id) => 
                (
                  <tr key={id} className={"table-light"} onClick={() => selectColumn(track)}>
                    <th scope="row">{id+1}</th>
                    <td>{track.trackname}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
} 


export default connect(
  state => ({
    album: selectors.getSelectedAlbum(state),
    albumTracks: selectors.getTracks(state),
    artistList: selectors.getArtists(state),
    permissions: selectors.getLoggedUser(state).permissions,
  }),
  dispatch => ({
    onSave(album) {
      if(album.albumname!=="" && album.artistid!=null) {
      if(album.albumid==null)
        albumService.addAlbum(album).then(()=> history.push('/main/álbumes'));
      if(album.albumid!=null)
        albumService.updateAlbum(album).then(()=> history.push('/main/álbumes'));
      }else{
        alert("Ingresa todos los campos para guardar.");
      };
    },
    onDelete(album, hasTracks) {
      if(hasTracks){
        alert("Tiene que eliminar todas las canciones del álbum para eliminar el álbum.");
      } else {
        albumService.deleteAlbum(album).then(()=> history.push('/main/álbumes'));
      }
    },
    selectColumn(track) {
      dispatch(actionTracks.selectTrack(track));
      //Se carga el DorpDown de albums
      dispatch(actionAlbums.clearAlbumDropDown());
      albumService.getAlbumListAll().then(res=> {
        const albumDropDown = res;
        albumDropDown.map(album => dispatch(actionAlbums.addAlbumDropDown(album)));
      });
      //Se carga el DorpDown de genres
      dispatch(actionGenres.clearGenres());
      genreService.getGenreListAll().then(res=> {
        const genreDropDown = res;
        genreDropDown.map(genre => dispatch(actionGenres.addGenre(genre)));
      });
      //Se carga el DorpDown de mediatypes
      dispatch(actionMediatypes.clearMediatypes());
      mediatypeService.getMediatypeListAll().then(res=> {
        const mediatypeDropDown = res;
        mediatypeDropDown.map(mediatype => dispatch(actionMediatypes.addMediatype(mediatype)));
      });
      history.push("/editarCanción");
    },
  }),
)(EditAlbum);

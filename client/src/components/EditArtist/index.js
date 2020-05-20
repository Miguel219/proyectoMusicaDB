import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import * as actionAlbums from '../../actions/albums';
import * as actionArtists from '../../actions/artists';
import * as actionTracks from '../../actions/tracks';
import artistService from '../../services/artist';
import albumService from '../../services/album';

const artistModel = {
  artistid: null,
  artistname: "",
};

const EditArtist = ({ artist, artistAlbums, permissions, onSave, onDelete, selectColumn, user }) => {
  artist = {...artistModel, ...artist}
  document.body.style.backgroundColor = '#434343';
  const [nameInput, changeNameInput] = useState(artist.artistname);
  return (
    <div className="edit-artist">
      <div className='edit-artist-content'>
        <div className='edit-artist-title'>
          {"Artista"}
        </div>
        <Table className="edit-artist-table" borderless>
          <thead>
            <tr>
              <th>{'Nombre del artista:'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="edit-artist-input"
                  type="text"
                  placeholder="Ingresa el nombre de la artista"
                  value={nameInput}
                  onChange={e => changeNameInput(e.target.value)}
                />
              </td>
              <td>
                {(artist.artistid==null && permissions.includes('Crear artista')) ?
                  (<button type="submit" className="edit-artist-button-save" onClick={() => 
                    onSave({
                      artistid: artist.artistid,
                      artistname: nameInput,
                      userid: user.userid
                    })
                  }>
                    {'Crear'}
                  </button>): null
                }
                {(artist.artistid!=null && permissions.includes('Editar artista')) ?
                  (<button type="submit" className="edit-artist-button-save" onClick={() => 
                    onSave({
                      artistid: artist.artistid,
                      artistname: nameInput,
                      userid: user.userid
                    })
                  }>
                    {'Editar'}
                  </button>): null
                }                
                {(artist.artistid!=null && permissions.includes('Eliminar artista')) ? 
                  <button type="submit" className="edit-artist-button-delete" onClick={() => onDelete(artist, artistAlbums.length>0)}>
                  {'Eliminar'}
                </button> : 
                  null
                }
                <button type="submit" className="edit-artist-button-delete w3-cyan" style={{marginLeft:'10px'}} onClick={() => history.goBack()}>
                  {'Regresar'}
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="edit-artist-table-albums-container">
          {'Álbums del artista:'}
          <Table className='edit-artist-table-albums' size="sm" hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Álbum</th>
              </tr>
            </thead>
            <tbody>
              {artistAlbums.map((album, id) => 
                (
                  <tr key={id} className={"table-light"} onClick={() => selectColumn(album)}>
                    <th scope="row">{id+1}</th>
                    <td>{album.albumname}</td>
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
    artist: selectors.getSelectedArtist(state),
    artistAlbums: selectors.getAlbums(state),
    permissions: selectors.getLoggedUser(state).permissions,
    user: selectors.getLoggedUser(state),
  }),
  dispatch => ({
    onSave(artist) {
      if(artist.artistname!=="") {
      if(artist.artistid==null)
        artistService.addArtist(artist).then(()=> history.push('/main/artistas'));
      if(artist.artistid!=null)
        artistService.updateArtist(artist).then(()=> history.push('/main/artistas'));
      }else{
        alert("Ingresa todos los campos para guardar.");
      };
    },
    onDelete(artist, hasAlbums) {
      if(hasAlbums) {
        alert("Tiene que eliminar todos los álbums del artista para eliminar el artista.");
      } else {  
        artistService.deleteArtist(artist).then(()=> history.push('/main/artistas'));
      }
    },
    selectColumn(album) {
      dispatch(actionAlbums.selectAlbum(album));
      dispatch(actionTracks.clearTracks());
      albumService.getAlbumTracks(album).then(res=> {
        const albumTracks = res;
        albumTracks.map(track => dispatch(actionTracks.addTrack(track)));
      });
      //Se carga el DorpDown de artist
      dispatch(actionArtists.clearArtists());
      artistService.getArtistListAll().then(res=> {
        const artistDropDown = res;
        artistDropDown.map(artist => dispatch(actionArtists.addArtist(artist)));
      });
      history.push("/editar/álbum");
    },
  }),
)(EditArtist);

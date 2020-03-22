import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import artistService from '../../services/artist';

const artistModel = {
  artistid: null,
  artistname: "",
};

const EditArtist = ({ artist, artistAlbums, onSave, onDelete, selectColumn }) => {
  artist = {...artistModel, ...artist}
  document.body.style.backgroundColor = '#434343';
  const [nameInput, changeNameInput] = useState(artist.artistname);
  return (
    <div className="edit-artist">
      <div className='edit-artist-content'>
        <div className='edit-artist-title'>
          {(artist.artistid==null) ? 'Crear artista' : "Editar artista"}
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
                  placeholder="Ingresa el nombre de la canción"
                  value={nameInput}
                  onChange={e => changeNameInput(e.target.value)}
                />
              </td>
              <td>
                <button type="submit" className="edit-artist-button-save" onClick={() => 
                  onSave({
                    artistid: artist.artistid,
                    artistname: nameInput,
                  })
                }>
                  {(artist.artistid==null) ? 'Crear' : "Editar"}
                </button>
              {(artist.artistid==null) 
                ? <div/> 
                : <button type="submit" className="edit-artist-button-delete" onClick={() => onDelete(artist)}>
                    {'Eliminar'}
                  </button>
              }
              </td>
            </tr>
          </tbody>
        </Table>
        <Table className='edit-artist-table-albums' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Album</th>
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
  );
} 


export default connect(
  state => ({
    artist: selectors.getSelectedArtist(state),
    artistAlbums: selectors.getAlbums(state),
  }),
  dispatch => ({
    onSave(artist) {
      if(artist.artistname!=="") {
      if(artist.artistid==null)
        artistService.addArtist(artist).then(()=> history.push("/main/artistas"));
      if(artist.artistid!=null)
        artistService.updateArtist(artist).then(()=> history.push("/main/artistas"));
      }else{
        alert("Ingresa todos los campos para guardar.");
      };
    },
    onDelete(artist) {
      artistService.deleteArtist(artist).then(()=> history.push("/main/artistas"));
    },
  }),
)(EditArtist);

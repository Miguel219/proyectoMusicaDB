import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionAlbums from '../../actions/albums';
import * as actionTracks from '../../actions/tracks';
import * as actionArtists from '../../actions/artists';
import artistService from '../../services/artist';
import albumService from '../../services/album';


const Albums = ({ albums, selectColumn, permissions, onClick }) => {
  return (
    <Fragment>
      <Header parentPage="Album"/>
      <div className="albums">
        <div className="albums-title">
          {'Álbumes:'}
          <div className="albums-buttons" hidden={!permissions.includes('Crear álbum')}>
            <div className="albums-add-button" onClick={() => onClick()}>
            <i className="fa fa-plus fa-xs"></i>
            </div>
          </div>
        </div>
        <Table className='albums-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Artista</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album, id) => 
              (
                <tr key={id} className={"table-light"} onClick={() => selectColumn(album)}>
                  <th scope="row">{id+1}</th>
                  <td>{album.albumname}</td>
                  <td>{album.artistname}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
} 


export default connect(
  state => ({
    albums: selectors.getAlbums(state),
    permissions: selectors.getLoggedUser(state).permissions,
  }),
  dispatch => ({
    selectColumn(album) {
      dispatch(actionAlbums.selectAlbum(album));
      dispatch(actionTracks.clearTracks());
      albumService.getAlbumTracks(album).then(res=> {
        const albumTracks = res;
        albumTracks.map(track => dispatch(actionTracks.addTrack(track)));
      });
      //Se carga el DorpDown de albums
      dispatch(actionArtists.clearArtists());
      artistService.getArtistListAll().then(res=> {
        const artistDropDown = res;
        artistDropDown.map(artist => dispatch(actionArtists.addArtist(artist)));
      });
      history.push("/editar/álbum");
    },
    onClick() {
      dispatch(actionAlbums.deselectAlbum());
      dispatch(actionTracks.clearTracks());
      //Se carga el DorpDown de albums
      dispatch(actionArtists.clearArtists());
      artistService.getArtistListAll().then(res=> {
        const artistDropDown = res;
        artistDropDown.map(artist => dispatch(actionArtists.addArtist(artist)));
      });
      history.push("/editar/álbum");
    },
  }),
)(Albums);

import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionArtists from '../../actions/artists';
import * as actionAlbums from '../../actions/albums';
import artistService from '../../services/artist';


const Artists = ({ artists, selectColumn, permissions, onClick }) => {
  return (
    <Fragment>
      <Header parentPage="Artist"/>
      <div className="artists">
        <div className="artists-title">
          {'Artistas:'}
          <div className="artists-buttons" hidden={!permissions.includes('Crear artista')}>
            <div className="artists-add-button" onClick={() => onClick()}>
            <i className="fa fa-plus fa-xs"></i>
            </div>
          </div>
        </div>
        <Table className='artists-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, id) => 
              (
                <tr key={id} className={"table-light"} onClick={() => selectColumn(artist)}>
                  <th scope="row">{id+1}</th>
                  <td>{artist.artistname}</td>
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
    artists: selectors.getArtists(state),
    permissions: selectors.getLoggedUser(state).permissions,
  }),
  dispatch => ({
    selectColumn(artist) {
      dispatch(actionArtists.selectArtist(artist));
      dispatch(actionAlbums.clearAlbums());
      artistService.getArtistAlbums(artist).then(res=> {
        const artistAlbums = res;
        artistAlbums.map(album => dispatch(actionAlbums.addAlbum(album)));
      });
      history.push("/editar/artista");
    },
    onClick() {
      dispatch(actionArtists.deselectArtist());
      dispatch(actionAlbums.clearAlbums());
      history.push("/editar/artista");
    },
  }),
)(Artists);

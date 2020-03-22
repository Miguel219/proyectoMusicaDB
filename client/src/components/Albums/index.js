import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionAlbums from '../../actions/albums';


const Albums = ({ albums, selectColumn }) => {
  return (
    <Fragment>
      <Header parentPage="Album"/>
      <div className="albums">
        <div className="albums-title">
          {'Álbumes:'}
          <div className="albums-buttons">
            <div className="albums-add-button">
              {'+'}
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
  }),
  dispatch => ({
    selectColumn(album) {
      dispatch(actionAlbums.selectAlbum(album));
    },
  }),
)(Albums);

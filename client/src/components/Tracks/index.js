import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionTracks from '../../actions/tracks';
import albumService from '../../services/album';
import * as actionAlbums from '../../actions/albums';
import genreService from '../../services/genre';
import * as actionGenres from '../../actions/genres';
import mediatypeService from '../../services/mediatype';
import * as actionMediatypes from '../../actions/mediatypes';


const Tracks = ({ tracks, selectColumn, onClick }) => {
  return (
    <Fragment>
      <Header parentPage="Tracks"/>
      <div className="tracks">
        <div className="tracks-title">
          {'Canciones:'}
          <div className="tracks-buttons">
            <div className="tracks-add-button" onClick={() => onClick()}>
              <i className="fa fa-plus fa-xs"></i>
            </div>
          </div>
        </div>
        <Table className='tracks-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Álbum</th>
              <th>Género</th>
              <th>Artista</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, id) => 
              (
                <tr key={id} className={"table-light"} onClick={() => selectColumn(track)}>
                  <th scope="row">{id+1}</th>
                  <td>{track.trackname}</td>
                  <td>{track.albumname}</td>
                  <td>{track.genrename}</td>
                  <td>{track.artistname}</td>
                  <td>{track.unitprice}</td>
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
    tracks: selectors.getTracks(state),
  }),
  dispatch => ({
    selectColumn(track) {
      dispatch(actionTracks.selectTrack(track));
      //Se carga el DorpDown de albums
      dispatch(actionAlbums.clearAlbums());
      albumService.getAlbumListAll().then(res=> {
        const albumDropDown = res;
        albumDropDown.map(album => dispatch(actionAlbums.addAlbum(album)));
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
    onClick() {
      dispatch(actionTracks.deselectTrack());
      //Se carga el DorpDown de albums
      dispatch(actionAlbums.clearAlbums());
      albumService.getAlbumListAll().then(res=> {
        const albumDropDown = res;
        albumDropDown.map(album => dispatch(actionAlbums.addAlbum(album)));
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
)(Tracks);

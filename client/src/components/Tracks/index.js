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
import * as actionCart from '../../actions/cart';
import trackService from '../../services/track';


const Tracks = ({ tracks, selectColumn, onClick,permissions, addToCart, deleteToCart, cart, user}) => {
  return (
    <Fragment>
      <Header parentPage="Tracks"/>
      <div className="tracks">
        <div className="tracks-title">
          {'Canciones:'}
          <div className="tracks-buttons" hidden={!permissions.includes('Crear canción')}>
            <div className="tracks-add-button" onClick={() => onClick()}>
              <i className="fa fa-plus fa-xs"></i>
            </div>
          </div>
        </div>
        <Table className='tracks-content' size="sm" hover bordered id="trackTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Álbum</th>
              <th>Género</th>
              <th>Artista</th>
              <th>Precio</th>
              <th># Reprod.</th>
              <th># Ventas</th>
              <th>Acciones</th>
              
              
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, id) => 
              (
                <tr key={id} className={"table-light"} >
                  <th scope="row" onClick={() => selectColumn(track)}>{id+1} </th>
                  <td onClick={() => selectColumn(track)}>{track.trackname} </td>
                  <td onClick={() => selectColumn(track)}>{track.albumname}</td>
                  <td onClick={() => selectColumn(track)}>{track.genrename}</td>
                  <td onClick={() => selectColumn(track)}>{track.artistname}</td>
                  <td onClick={() => selectColumn(track)}>{track.unitprice}</td>
                  <td onClick={() => selectColumn(track)}>{track.totalplayback}</td>
                  <td onClick={() => selectColumn(track)}>{track.totalsold}</td>
                  { track.isbought && <td className='td-button'>
                    <div className="tracks-play-button" onClick={() => {window.open(track.deezer.preview, '_blank'); trackService.playbackTrack({trackid:track.trackid,userid:user.userid});}}>
                        <i className="fa fa-play fa-xs"></i>
                    </div>
                  </td>}
                  { !track.isbought && (cart.filter(trackInCart => trackInCart.trackid === track.trackid).length === 0) ? 
                    <td className='td-button'>
                      <div className="tracks-add-cart-button" style={{backgroundColor:'#34b1eb'}} onClick={() => addToCart(track)}>
                        <i className="fa fa-shopping-cart fa-xs"></i>
                      </div>
                    </td> : 
                    <td className='td-button'>
                      <div className="tracks-add-cart-button" style={{backgroundColor:'red'}} onClick={() => deleteToCart(track.trackid)}>
                        <i className="fa fa-shopping-cart fa-xs"></i>
                      </div>
                    </td>}
                  
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
    cart: selectors.getTracksInCart(state),
    permissions: selectors.getLoggedUser(state).permissions,
    user: selectors.getLoggedUser(state),
  }),
  dispatch => ({
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
      history.push("/editar/canción");
    },
    onClick() {
      dispatch(actionTracks.deselectTrack());
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
      history.push("/editar/canción");
    },
    addToCart(track) {
      dispatch(actionCart.addToCart(track));
    },
    deleteToCart(trackid) {
      dispatch(actionCart.deleteToCart(trackid));
    },
  }),
)(Tracks);

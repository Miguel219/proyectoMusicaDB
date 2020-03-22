import React, {useState } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import Artistas from '../../../public/Images/Artistas.png';
import Search from '../../../public/Images/Search.png';
import UpArrow from '../../../public/Images/up-arrow.png';
import DownArrow from '../../../public/Images/down-arrow.png';
import trackService from '../../services/track';
import * as actionTracks from '../../actions/tracks';
import artistService from '../../services/artist';
import * as actionArtists from '../../actions/artists';
import albumService from '../../services/album';
import * as actionAlbums from '../../actions/albums';


const Header = ({ onSearch, parentPage }) => {
  const [searchInput, changeSearchInput] = useState('');
  const [showFilter, changeShowFilter] = useState(Boolean);
  const [genderInput, changeGenderInput] = useState('');
  const [artistInput, changeArtistInput] = useState('');
  const [albumInput, changeAlbumInput] = useState('');
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-initial-filter">
          {
            (parentPage!=="Artist")
            ? (
              <div className="header-search-filter" onClick={() => changeShowFilter(!showFilter)} >
                <img alt="img" src={showFilter ? UpArrow : DownArrow} className="header-search-image"/>
              </div>
            )
            : (
              <div/>
            )
          }
          <input className="header-search-input"
              type="text"
              placeholder="Buscar"
              value={searchInput}
              onChange={e => changeSearchInput(e.target.value)}
          />
          <div className="header-search-button" 
            onLoad={()=> onSearch(parentPage, searchInput, genderInput, artistInput, albumInput)} 
            onClick={() => onSearch(parentPage, searchInput, genderInput, artistInput, albumInput)}>
            <img alt="img" src={Search} className="header-search-image"/>
          </div>
        </div>
        {
          (showFilter)
          ? (parentPage==="Tracks")
            ? (
              <div className="header-more-filters">
                <input className="header-search-input"
                  type="text"
                  placeholder="Ingresa un género"
                  value={genderInput}
                  onChange={e => changeGenderInput(e.target.value)}
                />
                <input className="header-search-input"
                  type="text"
                  placeholder="Ingresa un artista"
                  value={artistInput}
                  onChange={e => changeArtistInput(e.target.value)}
                />
                <input className="header-search-input"
                  type="text"
                  placeholder="Ingresa un álbum"
                  value={albumInput}
                  onChange={e => changeAlbumInput(e.target.value)}
                />
              </div>
            )
            : (
              <div className="header-more-filters">
                <input className="header-search-input"
                  type="text"
                  placeholder="Ingresa un artista"
                  value={artistInput}
                  onChange={e => changeArtistInput(e.target.value)}
                />
              </div>
            )
          : (
            <div/>
          )
        }
      </div>
      <div className="header-user">
        <img alt="img" src={Artistas} className="user-image"/>
        <div className="header-user-info">
          {'Juan Pérez'}
        </div>    
      </div>
    </div>
  );
} 


export default connect(
  undefined,
  dispatch => ({
    onSearch(parentPage, searchInput, genderInput, artistInput, albumInput) {
      //Se pasan todos los inputs a minusculas
      searchInput = searchInput.toLowerCase();
      genderInput = genderInput.toLowerCase();
      artistInput = artistInput.toLowerCase();
      albumInput = albumInput.toLowerCase();
      //Dependendo de en que pagina esta se llama a la base de datos
      if(parentPage==="Tracks")
        trackService.getTrackList({
          trackname:searchInput,
          genrename:genderInput,
          albumname:albumInput,
          artistname:artistInput,
          limit:"20"
        }).then(res=> {
            const trackList = res;
            dispatch(actionTracks.clearTracks());
            trackList.map( track => dispatch(actionTracks.addTrack(track)));
          });
      if(parentPage==="Artist") 
        artistService.getArtistList({
          artistname:searchInput,
          limit:"20"
        }).then(res=> {
          const artistList = res;
          dispatch(actionArtists.clearArtists());
          artistList.map( artist => dispatch(actionArtists.addArtist(artist)));
        });
      if(parentPage==="Album") 
        albumService.getAlbumList({
          albumname:searchInput,
          artistname:artistInput,
          limit:"20"
        }).then(res=> {
          const albumList = res;
          dispatch(actionAlbums.clearAlbums());
          albumList.map( album => dispatch(actionAlbums.addAlbum(album)));
        });
    },
  }),
)(Header);

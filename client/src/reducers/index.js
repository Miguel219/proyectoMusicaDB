import { combineReducers } from 'redux';

import loggedUser, * as loggedUserSelectors from './loggedUser';
import tracks, * as tracksSelectors from './tracks';
import artists, * as artistsSelectors from './artists';
import albums, * as albumsSelectors from './albums';
import genres, * as genresSelectors from './genres';
import mediatypes, * as mediatypesSelectors from './mediatypes';
import report, * as reportSelectors from './reports.js'


const reducer = combineReducers({
  loggedUser,
  tracks,
  artists,
  albums,
  genres,
  mediatypes,
  report
});


export default reducer;


export const getLoggedUser = state => loggedUserSelectors.getLoggedUser(state.loggedUser);
export const isLoggedUser = state => loggedUserSelectors.isLoggedUser(state.loggedUser);
export const getTrack = (state, trackid) => tracksSelectors.getTrack(state.tracks, trackid);
export const getTracks = state => tracksSelectors.getTracks(state.tracks);
export const getSelectedTrack = state => tracksSelectors.getSelectedTrack(state.tracks);
export const getArtist = (state, artistid) => artistsSelectors.getArtist(state.artists, artistid);
export const getArtists = state => artistsSelectors.getArtists(state.artists);
export const getSelectedArtist = state => artistsSelectors.getSelectedArtist(state.artists);
export const getAlbum = (state, albumid) => albumsSelectors.getAlbum(state.albums, albumid);
export const getAlbums = state => albumsSelectors.getAlbums(state.albums);
export const getAlbumDropDown = (state, albumid) => albumsSelectors.getAlbumDropDown(state.albums, albumid);
export const getAlbumsDropDown = state => albumsSelectors.getAlbumsDropDown(state.albums);
export const getSelectedAlbum = state => albumsSelectors.getSelectedAlbum(state.albums);
export const getGenre = (state, genreid) => genresSelectors.getGenre(state.genres, genreid);
export const getGenres = state => genresSelectors.getGenres(state.genres);
export const getMediatype = (state, mediatypeid) => mediatypesSelectors.getMediatype(state.mediatypes, mediatypeid);
export const getMediatypes = state => mediatypesSelectors.getMediatypes(state.mediatypes);
export const getReport = state => reportSelectors.getReport(state.report);
export const getReportSelected = state => reportSelectors.getReportSelected(state.report);

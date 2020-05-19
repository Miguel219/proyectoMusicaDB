import * as types from '../types/tracks';


export const addTrack = track => ({
  type: types.TRACK_ADDED,
  payload: track,
});

export const clearTracks = () => ({
  type: types.TRACKS_CLEAR,
});

export const listenTrack = trackid => ({
  type: types.TRACK_LISTEN,
  payload: trackid
});

export const selectTrack = track => ({
  type: types.TRACK_SELECTED,
  payload: track,
});

export const deselectTrack = () => ({
  type: types.TRACK_DESELECTED,
});
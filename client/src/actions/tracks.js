import * as types from '../types/tracks';


export const addTrack = track => ({
  type: types.TRACK_ADDED,
  payload: track,
});

export const clearTracks = () => ({
  type: types.TRACKS_CLEAR,
});

export const selectTrack = track => ({
  type: types.TRACK_SELECTED,
  payload: track,
});
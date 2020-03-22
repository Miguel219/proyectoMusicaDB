import * as types from '../types/mediatypes';


export const addMediatype = mediatype => ({
  type: types.MEDIATYPE_ADDED,
  payload: mediatype,
});

export const clearMediatypes = () => ({
  type: types.MEDIATYPES_CLEAR,
});
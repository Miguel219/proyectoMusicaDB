import * as types from '../types/cart';


export const addToCart = track => ({
  type: types.CART_ADDED,
  payload: track,
});

export const deleteToCart = trackid => ({
  type: types.CART_DELETED,
  payload: trackid,
});

export const clearCart = () => ({
  type: types.CART_CLEAR,
});
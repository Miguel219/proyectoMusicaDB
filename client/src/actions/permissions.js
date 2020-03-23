import * as types from '../types/permissions';


export const addPermission = permission => ({
  type: types.PERMISSION_ADDED,
  payload: permission,
});

export const clearPermissions = () => ({
  type: types.PERMISSIONS_CLEAR,
});

export const selectPermission = permission => ({
  type: types.PERMISSION_SELECTED,
  payload: permission,
});

export const deselectPermission = () => ({
  type: types.PERMISSION_DESELECTED,
});

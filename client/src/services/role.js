/* -------------------------------------------------------------------------- */
/*                             Servicios de Role                            */
/* -------------------------------------------------------------------------- */


//get Role All
export const getRoleListAll = () => {
  return fetch(`/api/role/`,{
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//add Role
 export const addRole = ({rolename}) => {
  return fetch('/api/role/', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({rolename})
  })
  .then(res => {
    return res.json();
  });
};

//delete Role
 export const deleteRole = ({roleid}) => {
  return fetch('/api/role/', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({roleid})
  })
  .then(res => {
    return res.json();
  });
};

//update Role
 export const updateRole = ({rolename,roleid}) => {
  return fetch('/api/role/', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({rolename,roleid})
  })
  .then(res => {
    return res.json();
  });
};

//update assignRole
export const assignRole = ({userid,roleid}) => {
  return fetch('/api/role/assignRole', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({userid,roleid})
  })
  .then(res => {
    return res.json();
  });
};

//update unassignRole
export const unassignRole = ({userid}) => {
  return fetch('/api/role/unassignRole', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({userid})
  })
  .then(res => {
    return res.json();
  });
};


//update assignRole
export const assignPermission = ({permissionid,roleid}) => {
  return fetch('/api/role/assignPermission', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({permissionid,roleid})
  })
  .then(res => {
    return res.json();
  });
};

//update unassignPermission
export const unassignPermission = ({permissionid,roleid}) => {
  return fetch('/api/role/unassignPermission', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({permissionid,roleid})
  })
  .then(res => {
    return res.json();
  });
};

//get role permissions
export const getRolePermissions = ({roleid}) => {
  return fetch(`/api/role/getRolePermissions`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({roleid})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//get  permissions Out of Role
export const getPermissionsOutOfRole = ({roleid}) => {
  return fetch(`/api/role/getPermissionsOutOfRole`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({roleid})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//get  permissions
export const getPermissions = ({roleid}) => {
  return fetch(`/api/role/getPermissions`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({roleid})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

export default {
  getRoleListAll,
  updateRole,
  addRole,
  deleteRole,
  assignRole,
  unassignRole,
  assignPermission,
  unassignPermission,
  getPermissions,
  getPermissionsOutOfRole,
  getRolePermissions,
}
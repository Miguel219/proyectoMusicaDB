/* -------------------------------------------------------------------------- */
/*                             Servicios de User                            */
/* -------------------------------------------------------------------------- */


//get User All
export const getUserListAll = () => {
  return fetch(`/api/user/`,{
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//get User Params
 export const loginuser = ({userid,password}) => {
  return fetch(`/api/user/loginuser`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({userid,password})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};


//get User Permissions
export const getUserPermissions = ({userid}) => {
  return fetch(`/api/user/getUserPermissions`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({userid})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//is userid taken
export const useridtaken = ({userid}) => {
  return fetch(`/api/user/useridtaken`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({userid})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//add User
 export const addUser = ({name,lastname,birthdate,userid,password}) => {
  return fetch('/api/user/', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name,lastname,birthdate,userid,password})
  })
  .then(res => {
    return res.json();
  });
};

//delete User
 export const deleteUser = ({userid}) => {
  return fetch('/api/user/', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({userid})
  })
  .then(res => {
    return res.json();
  });
};

//update User
 export const updateUser = ({name,lastname,birthdate,userid,password}) => {
  return fetch('/api/user/', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name,lastname,birthdate,userid,password})
  })
  .then(res => {
    return res.json();
  });
};

//update assignRole
export const assignRole = ({userid,roleid}) => {
  return fetch('/api/user/assignRole', {
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
  return fetch('/api/user/unassignRole', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({userid})
  })
  .then(res => {
    return res.json();
  });
};

export default {
  loginuser,
  getUserListAll,
  getUserPermissions,
  useridtaken,
  updateUser,
  addUser,
  deleteUser,
  assignRole,
  unassignRole
}
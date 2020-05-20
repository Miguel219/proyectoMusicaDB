/* -------------------------------------------------------------------------- */
/*                             Servicios de Album                            */
/* -------------------------------------------------------------------------- */


//get Album All
export const getAlbumListAll = () => {
  return fetch(`/api/album/`,{
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//get Album Params
 export const getAlbumList = ({albumname="",artistname="",limit="All"}) => {
  return fetch(`/api/album/get`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({albumname,artistname,limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};


//get Album Params
export const getAlbumTracks = ({albumid}) => {
  return fetch(`/api/album/getAlbumTracks`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({albumid})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//add Album
 export const addAlbum = ({albumname,artistid,userid}) => {
  return fetch('/api/album/', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({albumname,artistid,userid})
  })
  .then(res => {
    return res.json();
  });
};

//update Album
export const updateAlbum = ({albumid,albumname,artistid,userid}) => {
  return fetch('/api/album/', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({albumid,albumname,artistid,userid})
  })
  .then(res => {
    return res.json();
  });
};

//delete Album
 export const deleteAlbum = ({albumid}) => {
  return fetch('/api/album/', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({albumid})
  })
  .then(res => {
    return res.json();
  });
};



export default {
  getAlbumList,
  getAlbumListAll,
  getAlbumTracks,
  updateAlbum,
  addAlbum,
  deleteAlbum
}
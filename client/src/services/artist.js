/* -------------------------------------------------------------------------- */
/*                             Servicios de Artist                            */
/* -------------------------------------------------------------------------- */


//get Artist All
 export const getArtistListAll = () => {
  return fetch(`/api/artist/`,{
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//get Artist Params
 export const getArtistList = ({artistname="",limit="All"}) => {
  return fetch(`/api/artist/get`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({artistname,limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};


//get Artist Params
export const getArtistAlbums = ({artistid}) => {
  return fetch(`/api/artist/getArtistAlbums`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({artistid})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//add Artist
 export const addArtist = ({artistname,userid}) => {
  return fetch('/api/artist/', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({artistname})
  })
  .then(res => {
    return res.json();
  });
};

//delete Artist
 export const deleteArtist = ({artistid}) => {
  return fetch('/api/artist/', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({artistid})
  })
  .then(res => {
    return res.json();
  });
};

//update Artist
 export const updateArtist = ({artistid,artistname,userid}) => {
  return fetch('/api/artist/', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({artistid,artistname})
  })
  .then(res => {
    return res.json();
  });
};

export default {
  getArtistList,
  getArtistListAll,
  getArtistAlbums,
  updateArtist,
  addArtist,
  deleteArtist
}
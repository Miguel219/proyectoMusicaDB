/* -------------------------------------------------------------------------- */
/*                             Servicios de Track                            */
/* -------------------------------------------------------------------------- */


//get Track All
export const getTrackListAll = () => {
  return fetch(`/api/track/`,{
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//get Track Params
 export const getTrackList = ({trackname="",genrename="",albumname="",artistname="",limit="All"}) => {
  return fetch(`/api/track/get`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({trackname,artistname,albumname,genrename,limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};


//add Track
 export const addTrack = ({trackname, albumid, mediatypeid, genreid, composer, milliseconds, bytes, unitprice,userid}) => {
  return fetch('/api/track/', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({trackname, albumid, mediatypeid, genreid, composer, milliseconds, bytes, unitprice,userid})
  })
  .then(res => {
    return res.json();
  });
};


//update Track
export const updateTrack = ({trackid,trackname, albumid, mediatypeid, genreid, composer, milliseconds, bytes, unitprice,userid}) => {
  return fetch('/api/track/', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({trackid,trackname, albumid, mediatypeid, genreid, composer, milliseconds, bytes, unitprice,userid})
  })
  .then(res => {
    return res.json();
  });
};


//update Track
export const updateTrackActive = ({trackid,isactive}) => {
  return fetch('/api/track/active', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({trackid,isactive})
  })
  .then(res => {
    return res.json();
  });
};

//delete Track
 export const deleteTrack = ({trackid}) => {
  return fetch('/api/track/', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({trackid})
  })
  .then(res => {
    return res.json();
  });
};



export default {
  getTrackList,
  getTrackListAll,
  updateTrack,
  addTrack,
  deleteTrack
}
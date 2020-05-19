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
 export const getTrackList = ({userid,trackname="",genrename="",albumname="",artistname="",limit="All",onlyBought=true,onlyNotBought=null}) => {
  return fetch(`/api/track/get`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({userid,trackname,artistname,albumname,genrename,limit,onlyBought,onlyNotBought})
  })
  .then(res => res.json())
    .then(tracks => {
      tracks.forEach((track,index) => {
        let search = "";
        search = track.trackname ;
        search.replace(" ","%20");
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "3f20ab1067msh6c5cba2b353cccdp15dd84jsn71c026cff1c0"
          }
        })
        .then(response => response.json()).then(songResult=>{
          
          if(songResult.data.length>0){
            tracks[index]['deezer']=songResult.data[0]
          }else{
            tracks[index]['deezer']={}
            console.log(track.trackname)
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
    
    return tracks;
      
      
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

  //playbackTrack
 export const playbackTrack = ({trackid,userid}) => {
  return fetch('/api/track/playbackTrack', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({trackid,userid})
  })
  .then(res => {
    return res.json();
  });

};


//Generate Tracks Invoice
export const generateInvoice = ({cart, user, total}) => {
  return fetch('/api/track/generateInvoice', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({cart,user, total})
  })
  .then(res => {
    return res.json();
  });
};

export default {
  getTrackList,
  getTrackListAll,
  updateTrack,
  updateTrackActive,
  addTrack,
  generateInvoice,
  deleteTrack,
  playbackTrack
}
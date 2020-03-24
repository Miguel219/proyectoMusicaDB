/* -------------------------------------------------------------------------- */
/*                             Servicios de Report                            */
/* -------------------------------------------------------------------------- */



// 1 getArtistByAreaReport
export const getArtistByAreaReport = ({limit=10}) => {
  return fetch(`/api/report/1`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

// 2 getGenreWithMostSongReport
export const getGenreWithMostTracksReport = ({limit=10}) => {
  return fetch(`/api/report/2`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

// 3 getArtistWithMostIndividualAlbums
export const getArtistWithMostIndividualAlbums = ({limit=10}) => {
  return fetch(`/api/report/3`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};


// 4 getTracksWithMostDuration
export const getTracksWithMostDuration = ({limit=10}) => {
  return fetch(`/api/report/4`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

// 5 getUsersWithMostTracks
export const getUsersWithMostTracks = ({limit=10}) => {
  return fetch(`/api/report/5`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

// 6 getAverageDurationTrackByGenre
export const getAverageDurationTrackByGenre = ({limit=10}) => {
  return fetch(`/api/report/6`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

// 7 getMostRecentAlbums
export const getMostRecentAlbums = ({limit=10}) => {
  return fetch(`/api/report/7`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

// 8 getMostColaborativeArtists
export const getMostColaborativeArtists = ({limit=10}) => {
  return fetch(`/api/report/8`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};


// 9 getMostColaborativeArtists
export const getTotals = ({limit=10}) => {
  return fetch(`/api/report/9`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};


export const getReport = ({reportType,limit = 10}) =>{
  return fetch(`/api/report/${reportType}`,{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({limit})
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
}

export default {
  getReport
}
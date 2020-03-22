/* -------------------------------------------------------------------------- */
/*                             Servicios de Mediatype                            */
/* -------------------------------------------------------------------------- */


//get Mediatype All
export const getMediatypeListAll = () => {
  return fetch(`/api/mediatype/`,{
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//TODO IMPLEMENTATION
// //get Mediatype Params
//  export const getMediatypeList = ({mediatypename="",limit="All"}) => {
//   return fetch(`/api/mediatype/get`,{
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body:JSON.stringify({mediatypename,limit})
//   })
//   .then(res => res.json())
//     .then(res => {
//       return res;
      
      
//     });
// };


// //get Mediatype Params
// export const getMediatypeAlbums = ({mediatypeid}) => {
//   return fetch(`/api/mediatype/getMediatypeAlbums`,{
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body:JSON.stringify({mediatypeid})
//   })
//   .then(res => res.json())
//     .then(res => {
//       return res;
      
      
//     });
// };

// //add Mediatype
//  export const addMediatype = ({mediatypename}) => {
//   return fetch('/api/mediatype/', {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({mediatypename})
//   })
//   .then(res => {
//     return res.json();
//   });
// };

// //delete Mediatype
//  export const deleteMediatype = ({mediatypeid}) => {
//   return fetch('/api/mediatype/', {
//     method: 'delete',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({mediatypeid})
//   })
//   .then(res => {
//     return res.json();
//   });
// };

// //update Mediatype
//  export const updateMediatype = ({mediatypeid,mediatypename}) => {
//   return fetch('/api/mediatype/', {
//     method: 'put',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({mediatypeid,mediatypename})
//   })
//   .then(res => {
//     return res.json();
//   });
// };

export default {
  getMediatypeListAll,
  // getMediatypeListAll,
  // getMediatypeAlbums,
  // updateMediatype,
  // addMediatype,
  // deleteMediatype
}
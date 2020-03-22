/* -------------------------------------------------------------------------- */
/*                             Servicios de Genre                            */
/* -------------------------------------------------------------------------- */


//get Genre All
export const getGenreListAll = () => {
  return fetch(`/api/genre/`,{
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
    .then(res => {
      return res;
      
      
    });
};

//TODO IMPLEMENTATION
// //get Genre Params
//  export const getGenreList = ({genrename="",limit="All"}) => {
//   return fetch(`/api/genre/get`,{
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body:JSON.stringify({genrename,limit})
//   })
//   .then(res => res.json())
//     .then(res => {
//       return res;
      
      
//     });
// };


// //get Genre Params
// export const getGenreAlbums = ({genreid}) => {
//   return fetch(`/api/genre/getGenreAlbums`,{
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body:JSON.stringify({genreid})
//   })
//   .then(res => res.json())
//     .then(res => {
//       return res;
      
      
//     });
// };

// //add Genre
//  export const addGenre = ({genrename}) => {
//   return fetch('/api/genre/', {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({genrename})
//   })
//   .then(res => {
//     return res.json();
//   });
// };

// //delete Genre
//  export const deleteGenre = ({genreid}) => {
//   return fetch('/api/genre/', {
//     method: 'delete',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({genreid})
//   })
//   .then(res => {
//     return res.json();
//   });
// };

// //update Genre
//  export const updateGenre = ({genreid,genrename}) => {
//   return fetch('/api/genre/', {
//     method: 'put',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({genreid,genrename})
//   })
//   .then(res => {
//     return res.json();
//   });
// };

export default {
  getGenreListAll,
  // getGenreListAll,
  // getGenreAlbums,
  // updateGenre,
  // addGenre,
  // deleteGenre
}
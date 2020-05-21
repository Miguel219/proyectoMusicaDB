/* -------------------------------------------------------------------------- */
/*                             Servicios de LogBook                           */
/* -------------------------------------------------------------------------- */

//  get all Logs
export const getAllLogsList = ({params={}}) => {
    return fetch(`/api/logbook/get`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({params})
    })
    .then(res => res.json())
        .then(res => {
            return res;


        });
};

export default {
    getAllLogsList,
}
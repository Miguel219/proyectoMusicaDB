/* -------------------------------------------------------------------------- */
/*                             Servicios de LogBook                           */
/* -------------------------------------------------------------------------- */

//  get all Logs
export const getAllLogsList = () => {
    return fetch(`/api/logbook/`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
        .then(res => {
            return res;


        });
};

export default {
    getAllLogsList,
}
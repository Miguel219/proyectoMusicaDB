import React, { Fragment, useState } from 'react';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import Header from '../Header';
import userService from '../../services/user';
import trackService from '../../services/track';
import user from '../../services/user';


export const Simulation = () => {
  const [trackNumberInput, changeTrackNumberInput] = useState('');
  const [dateInput, changeDateInput] = useState('');
  //Funcion para validar los campos
  var validate = function () {
    if(trackNumberInput!=='' && dateInput!==''){
      if(parseInt(trackNumberInput)>0)
        return true;
    }else {
      return false;
    }
  }
  //Funcion que genera random de un objeto
  var randomProperty = function (array) {
    return array.splice(Math.floor(Math.random() * array.length),1)[0];
  };
  //Funcion que genera la simulacion
  const generateSimulation = () => {
    trackService.getTrackListAll().then(res=> {
      const trackList = res;
      var trackRandomList = null;
      if(parseInt(trackNumberInput)<trackList.length){
        trackRandomList =  Array.from(Array(parseInt(trackNumberInput)).keys()); 
        trackRandomList = trackRandomList.map(() => randomProperty(trackList));
      } else {
        trackRandomList = trackList;
      }
      userService.getUserListAll().then(res=> {
        const userList = res;
        if(userList.length===0){
          alert('No hay usuarios en la aplicación para realizar la simulación')
        }else{
          var success = 0;
          const NumberOfTracksForUser = parseInt(trackRandomList.length/userList.length);
          userList.map((user,i)=> {
            var tracksForUser = null;
            var total = 0;
            if((i + 1)!==userList.length){
              tracksForUser = trackRandomList.splice(0,NumberOfTracksForUser);
              console.log(`${user.userid}: `,tracksForUser);
            }else{
              tracksForUser = trackRandomList;
              console.log(`${user.userid}: `,tracksForUser);
            }
            tracksForUser.forEach(track => {
              parseFloat(track.unitprice);
              total = total + parseFloat(track.unitprice);
            });
            trackService.generateInvoice({cart:tracksForUser,user:user,total:total}).then(res=> {
              trackService.playbackTracks({tracks:tracksForUser,userid:user.userid}).then(res=> {
                success = success + 1;
                if(success === userList.length){
                  alert('Se realizo con exito la simulación');
                };
              });
            });
          });
        }
      }); 
    });
  }
  return (
    <Fragment>
      <Header parentPage="Simulation"/>
      <div className="simulation">
        <div className="simulation-title">
          {'Simulación:'}
        </div>
        <br/>
        <Table className="simulation-table" borderless>
          <thead>
            <tr>
              <th>{'Cantidad de canciones:'}</th>
              <th>{'Fecha de simulación:'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="simulation-input"
                  type="number"
                  min="1"
                  placeholder="Ingresa la cantidad de canciones"
                  value={trackNumberInput}
                  onChange={e => changeTrackNumberInput(e.target.value)}
                />
              </td>
              <td>
                <input className="simulation-input"
                  type="date"
                  placeholder="Ingresa la fecha de la simulación"
                  value={dateInput}
                  onChange={e => changeDateInput(e.target.value)}
                />
              </td>
              <td>
                <button disabled={!validate()} type="submit" className="simulation-button" onClick={() => generateSimulation()}>
                  {'Simular'}
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
} 

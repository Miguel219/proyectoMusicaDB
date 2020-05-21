import React, { Fragment,useState,useEffect } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import logBookService from '../../services/logbook';




const LogBook = ({ permissions, }) => {
  const [logbook, setLogbook] = useState([]);
 
  useEffect(()=>{
  async function getLogBook(){
    let logbookResponse = await logBookService.getAllLogsList({});
    setLogbook(logbookResponse);
    console.log("hola")
  };
  getLogBook();}, []);
  
  return (
    <Fragment>
      <Header parentPage="Roles"/>
      <div className="logbook">
        <div className="logbook-title">
          {'Bitácora:'}
         
        </div>
        <Table className='logbook-content' size="sm" hover bordered hidden={!permissions.includes('Ver Bitácora')}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo de Cambio</th>
              <th>Usuario</th>
              <th>Tipo de Objeto</th>
              <th>ID de Objeto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
             {logbook.map((log, id) => 
              (
                <tr key={id} className={"table-light"} onClick={() => null}>
                  <th scope="row">{id+1}</th>
                  <td>{log.logtype}</td>
                  <td>{log.userid}</td>
                  <td>{log.objecttype}</td>
                  <td>{log.objectid}</td>
                  
                  <td>{(new Date( log.datemodified)).toLocaleString()}</td>
                </tr>
              ))
            } 
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
} 


export default connect(
  state => ({
    logbook: selectors.getRoles(state),
    permissions: selectors.getLoggedUser(state).permissions,
  }),
  dispatch => ({

  }),
)(LogBook);

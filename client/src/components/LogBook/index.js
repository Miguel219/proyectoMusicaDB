import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import Header from '../Header';
import logBookService from '../../services/logbook';
import * as selectors from '../../reducers';

const LogBook = ({ permissions }) => {
    return (
        <Fragment>
            <Header parentPage='LogBook'/>
            <div className='logbook'>
                <div className='logbook-title'>
                    {'Bitácora:'}
                </div>
            </div>
            <Table className='logs-content' size='sm' hover bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tipo de Acción</th>
                        <th>Usuario</th>
                        <th>Tipo de Objeto</th>
                        <th>Id del Objeto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, id) => (
                        <tr key={id} className={"table-light"}>
                            <th scope="row">{id+1}</th>
                            <th>{log.LogId}</th>
                            <th>{log.LogTyoe}</th>
                            <th>{log.UserId}</th>
                            <th>{log.ObjectType}</th>
                            <th>{log.ObjectId}</th>
                            <th>{log.DateModified}</th>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    );
}

export default connect(
    state => ({
        permission: selectors.getLoggedUser(state).permissions,
    }),
    undefined,
)(LogBook)
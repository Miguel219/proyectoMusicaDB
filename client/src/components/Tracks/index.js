import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import { Header } from '../Header';

const onSearch = () => {
  console.log('Hola');
};

export const Tracks = () => {
  return (
    <Fragment>
      <Header onSearch={() => onSearch()}/>
      <div className="home">
        {'Canciones:'}
        <Table className='home-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-light">
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr className="table-light">
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr className="table-light">
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
} 

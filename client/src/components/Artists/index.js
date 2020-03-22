import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionArtists from '../../actions/artists';


const Artists = ({ artists, selectColumn }) => {
  return (
    <Fragment>
      <Header parentPage="Artist"/>
      <div className="artists">
        <div className="artists-title">
          {'Artistas:'}
          <div className="artists-buttons">
            <div className="artists-add-button">
              {'+'}
            </div>
          </div>
        </div>
        <Table className='artists-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, id) => 
              (
                <tr key={id} className={"table-light"} onClick={() => selectColumn(artist)}>
                  <th scope="row">{id+1}</th>
                  <td>{artist.artistname}</td>
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
    artists: selectors.getArtists(state),
  }),
  dispatch => ({
    selectColumn(artist) {
      dispatch(actionArtists.selectArtist(artist));
    },
  }),
)(Artists);

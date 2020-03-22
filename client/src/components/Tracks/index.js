import React, { Fragment, useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionTracks from '../../actions/tracks';


const Tracks = ({ tracks, selectColumn }) => {
  const [selectedRow, changeSelectedRow] = useState(Boolean);
  if(selectedRow)
    return (<Redirect push to="/editarCanción" />)
  return (
    <Fragment>
      <Header parentPage="Tracks"/>
      <div className="tracks">
        <div className="tracks-title">
          {'Canciones:'}
          <div className="tracks-buttons">
            <div className="tracks-add-button">
              {'+'}
            </div>
          </div>
        </div>
        <Table className='tracks-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Álbum</th>
              <th>Género</th>
              <th>Artista</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, id) => 
              (
                <tr key={id} className={"table-light"} onClick={() => {
                  selectColumn(track);
                  changeSelectedRow(true);
                }}>
                  <th scope="row">{id+1}</th>
                  <td>{track.trackname}</td>
                  <td>{track.albumname}</td>
                  <td>{track.genrename}</td>
                  <td>{track.artistname}</td>
                  <td>{track.unitprice}</td>
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
    tracks: selectors.getTracks(state),
  }),
  dispatch => ({
    selectColumn(track) {
      dispatch(actionTracks.selectTrack(track));
    },
  }),
)(Tracks);

import React, { Fragment, useState } from 'react';
import { Table } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionsReport from '../../actions/reports';
import reportService from '../../services/report'

const renderSwitchReport = (reporttypeid,report) =>{
  console.log(report);
  console.log(reporttypeid);
  switch(reporttypeid) {
    case '1':
      return (
        <Table className='reports-content' size="sm" hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Artista</th>
            
          </tr>
        </thead>
        <tbody>
          {report.map((report, id) => 
            (
              <tr key={id} className={"table-light"} >
                <th scope="row">{id+1}</th>
                <td>{report.name}</td>
 
              </tr>
            ))
          }
        </tbody>
      </Table>
      );
      case '2':
        return (
          <Table className='reports-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Género</th>
              <th>Cantidad de canciones</th>
              
            </tr>
          </thead>
          <tbody>
            {report.map((report, id) => 
              (
                <tr key={id} className={"table-light"} >
                  <th scope="row">{id+1}</th>
                  <td>{report.genre}</td>
                  <td>{report.trackcount}</td>
   
                </tr>
              ))
            }
          </tbody>
        </Table>
        );
        case '3':
          return (
            <Table className='reports-content' size="sm" hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Artista</th>
                <th>Cantidad de álbumes</th>
                
              </tr>
            </thead>
            <tbody>
              {report.map((report, id) => 
                (
                  <tr key={id} className={"table-light"} >
                    <th scope="row">{id+1}</th>
                    <td>{report.artistname}</td>
                    <td>{report.albumcount}</td>
     
                  </tr>
                ))
              }
            </tbody>
          </Table>
          );
        case '3':
          return (
            <Table className='reports-content' size="sm" hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Artista</th>
                <th>Cantidad de álbumes</th>
                
              </tr>
            </thead>
            <tbody>
              {report.map((report, id) => 
                (
                  <tr key={id} className={"table-light"} >
                    <th scope="row">{id+1}</th>
                    <td>{report.artistname}</td>
                    <td>{report.albumcount}</td>
     
                  </tr>
                ))
              }
            </tbody>
          </Table>
          );
        case '4':
          return (
            <Table className='reports-content' size="sm" hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Canción</th>
                <th>Artista</th>
                <th>Duración Milisegundos</th>
                
              </tr>
            </thead>
            <tbody>
              {report.map((report, id) => 
                (
                  <tr key={id} className={"table-light"} >
                    <th scope="row">{id+1}</th>
                    <td>{report.trackname}</td>
                    <td>{report.artistname}</td>
                    <td>{report.milliseconds}</td>
     
                  </tr>
                ))
              }
            </tbody>
          </Table>
          );
        case '5':
          return (
            <Table className='reports-content' size="sm" hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Nombre de usuario</th>
                <th>Cantidad de canciones</th>
            
                
              </tr>
            </thead>
            <tbody>
              {report.map((report, id) => 
                (
                  <tr key={id} className={"table-light"} >
                    <th scope="row">{id+1}</th>
                    <td>{report.userid}</td>
                    <td>{report.username}</td>
                    <td>{report.trackcount}</td>
     
                  </tr>
                ))
              }
            </tbody>
          </Table>
          );
        case '6':
          return (
            <Table className='reports-content' size="sm" hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Género</th>
                <th>Promedio Milisegundos de Canciones</th>

            
                
              </tr>
            </thead>
            <tbody>
              {report.map((report, id) => 
                (
                  <tr key={id} className={"table-light"} >
                    <th scope="row">{id+1}</th>
                    <td>{report.genre}</td>
                    <td>{report.millisecondsavg | 1}</td>
     
                  </tr>
                ))
              }
            </tbody>
          </Table>
          );
          case '7':
            return (
              <Table className='reports-content' size="sm" hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Álbum</th>
                 
  
              
                  
                </tr>
              </thead>
              <tbody>
                {report.map((report, id) => 
                  (
                    <tr key={id} className={"table-light"} >
                      <th scope="row">{id+1}</th>
                      <td>{report.albumname}</td>
       
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            );
          case '8':
            return (
              <Table className='reports-content' size="sm" hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Artist</th>
                  <th>Cantidad de canciones</th>
  
              
                  
                </tr>
              </thead>
              <tbody>
                {report.map((report, id) => 
                  (
                    <tr key={id} className={"table-light"} >
                      <th scope="row">{id+1}</th>
                      <td>{report.artistname}</td>
                      <td>{report.trackcount}</td>
       
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            );
          
    default:
      return null;
  }
}
 
const Reports = ({  onSelectReport,permissions,report,selectedReportId}) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [dropdownName,changeDropdownName] = useState('Seleccionar reporte');
  const toggle = () => setOpen(!dropdownOpen);
  const changeDropdown = (newName,newValue) => {changeDropdownName(newName); onSelectReport(newValue);}
  const Reports=["Reporte artistas por área","Reporte géneros con más canciones","Reporte artistas con más albums individuales","Reporte canciones de mayor duración con la información de sus artistas","Reporte usuarios que han registrado más canciones","Reporte promedio de duración de canciones por género","Reporte álbumes más recientes","Reporte artistas más colaborativos"]
  return (
    <Fragment>
      <Header parentPage="Reports"/>
      <div className="reports">
        <div className="reports-title">
          {'Reportes:'}
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} style={{width:'300px',margin:'20px'}}>
            <DropdownToggle caret>
                
                { (selectedReportId==null) ?
                (dropdownName):
                (Reports[selectedReportId-1])
                }
            </DropdownToggle>
            <DropdownMenu>
            {Reports.map((report, id) => 
              (
                
              
                (permissions.includes(report)) ?
              (
                <DropdownItem name={report} onClick={e =>{changeDropdown(e.target.name,e.target.value);console.log(e.target);}} key={report} value={id+1}>{report}</DropdownItem>
              ):null
              
               
              ))
            }
            </DropdownMenu>
          </ButtonDropdown>
          {renderSwitchReport(selectedReportId,report)}
        </div>
 

      </div>
    </Fragment>
  );
} 


export default connect(
  state => ({
    report: selectors.getReport(state),
    permissions: selectors.getLoggedUser(state).permissions,
    selectedReportId: selectors.getReportSelected(state)
  }),
  dispatch => ({

    onSelectReport(reportType) {
      reportService.getReport({reportType}).then(
        report=>{dispatch(actionsReport.selectReport(report))}
      )
      dispatch(actionsReport.selectReportId(reportType))
    }
  }),
)(Reports);

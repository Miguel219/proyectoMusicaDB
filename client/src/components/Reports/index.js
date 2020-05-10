import React, { Fragment, useState } from 'react';
import { Table } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionsReport from '../../actions/reports';
import reportService from '../../services/report'



//Función para exportar reportes a excel
const exportExcelReport = (reportName,report) =>{
  
  let csv = '';
  //Agregamos Headers Primero
  Object.keys(report[0]).map((key,index)=>{
      csv += key.toString() ;
      if(index!=Object.keys(report[0]).length-1){
        csv +=  ',';
      }
  })


  csv += "\n";
  //Exportamos la data a un excel de cada objeto del reporte como una row
  report.forEach(function(rowObject) {
    Object.keys(rowObject).map((key,index)=>{
      csv += rowObject[key];
      if(index!=Object.keys(rowObject).length-1){
        csv +=  ',';
      }
  })
   
    csv += "\n";
  });

  //Código para convertir archivo a csv y ser descargar en click.
  var elementCsv = document.createElement('a');
  elementCsv.href = 'data:text/csv;charset=UTF-8,' + escape(csv);
  elementCsv.target = '_blank';
  elementCsv.download = `${reportName}.csv`;
  elementCsv.click();
}

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
                <th>Playlist</th>
                <th>Duracion</th>
                
              </tr>
            </thead>
            <tbody>
              {report.map((report, id) => 
                (
                  <tr key={id} className={"table-light"} >
                    <th scope="row">{id+1}</th>
                    <td>{report.playlistname}</td>
                    <td>{report.summilliseconds}</td>
     
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
                  <th>Playlist</th>
                  <th>Cantidad de artistas</th>
                  
                </tr>
              </thead>
              <tbody>
                {report.map((report, id) => 
                  (
                    <tr key={id} className={"table-light"} >
                      <th scope="row">{id+1}</th>
                      <td>{report.playlistname}</td>
                      <td>{report.countartist}</td>
       
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
                  <th>Artista</th>
                  <th>Cantidad de Géneros</th>
  
              
                  
                </tr>
              </thead>
              <tbody>
                {report.map((report, id) => 
                  (
                    <tr key={id} className={"table-light"} >
                      <th scope="row">{id+1}</th>
                      <td>{report.artistname}</td>
                      <td>{report.countgenre}</td>
       
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            );
            case '9':
              return (
                <Table className='reports-content' size="sm" hover bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tipo</th>
                    <th>Cantidad en plataforma</th>
    
                
                    
                  </tr>
                </thead>
                <tbody>
                  {report.map((report, id) => 
                    (
                      <tr key={id} className={"table-light"} >
                        <th scope="row">{id+1}</th>
                        <td>{report.namecount}</td>
                        <td>{report.countcant}</td>
         
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
  const Reports=["Reporte artistas con más álbumes publicados","Reporte géneros con más canciones","Reporte total de duración de cada playlist","Reporte canciones de mayor duración con la información de sus artistas","Reporte usuarios que han registrado más canciones","Reporte promedio de duración de canciones por género","Reporte cantidad de artistas diferentes por playlist","Reporte artistas con más diversidad de géneros musicales","Reporte cantidades de música"]
  return (
    <Fragment>
      <Header parentPage="Reports"/>
      <div className="reports">
        <div className="reports-title">
          {'Reportes:'}
          <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} style={{width:'550px',margin:'20px'}}>
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
          {report.length>0 && <div className="reports-buttons" hidden={!permissions.includes('Crear artista')}>
                <div className="reports-add-button" onClick={() => exportExcelReport(Reports[selectedReportId-1],report)}>
                <i className="fa fa-file-excel-o fa-xs"></i>
                </div>
          </div>}
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

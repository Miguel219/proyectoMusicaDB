import React, { Fragment, useState } from 'react';
import { Table, Button } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionsReport from '../../actions/reports';
import * as actionArtists from '../../actions/artists';
import reportService from '../../services/report'
import artistService from '../../services/artist'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

//Funcion para generar reportes en pdf
function generateInvoicePDF(reportType,reportTypeId) {
  var doc = new jsPDF()

  // // Simple data example
  // var head = [['ID', 'Country', 'Rank', 'Capital']]
  // var body = [
  //   [1, 'Denmark', 7.526, 'Copenhagen'],
  //   [2, 'Switzerland', 7.509, 'Bern'],
  //   [3, 'Iceland', 7.501, 'Reykjavík'],
  // ]
  doc.setFontSize(18)
  doc.text(`${reportType}`, 10, 10)
  doc.autoTable({ html:  `#report${reportTypeId}` })

  

  doc.save(`${reportType}.pdf`)
}

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

const renderSwitchReport = (reporttypeid,report,setDateEnd,setDateStart,dateStart,dateEnd,getReportResult,limit,setLimit,artist,setArtist,artistList) =>{
  console.log(report);
  console.log(reporttypeid);
  switch(reporttypeid) {
    case '1':
      return (
        
        <Table id={"report"+reporttypeid} className='reports-content' size="sm" hover bordered>
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
          <Table id={"report"+reporttypeid} className='reports-content' size="sm" hover bordered>
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
            <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
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
            <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
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
            <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
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
            <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
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
              <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
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
              <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
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
                <Table id={"report"+reporttypeid} className='reports-content' size="sm" hover bordered>
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
            case '10':
              return (
                <Fragment>
                
                
               <Table className="edit-track-table" borderless>
                <thead>
                  <tr>
                    
                    
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
    
                
                    
                  </tr>
                </thead>
                <tbody>

                      <tr>
                      <td><DatePicker
                      className="edit-track-input"
                          selected={dateStart}
                          onChange={setDateStart}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={60}
                          
                          timeCaption="Tiempo"
                          dateFormat="yyyy-MM-dd h:mm aa"
                          style={{margin:20}}
                          
                        /></td>
                        
                        <td><DatePicker
                        className="edit-track-input"
                          selected={dateEnd}
                          onChange={setDateEnd}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={60}
                          


                          timeCaption="Tiempo"
                          dateFormat="yyyy-MM-dd h:mm aa"
                          
                        /></td>
                        <td><Button style={{margin:20,height:60,background:'#FFB900'}} disabled={dateStart>dateEnd} onClick={()=>getReportResult({reportType:10,params:{dateStart,dateEnd,limit}})}>Generar Reporte</Button></td>
                      </tr>
                      
                </tbody>
              </Table>
                <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Inicio de Semana</th>
                    <th>Final de Semana</th>
                    <th>Total Ventas</th>
                    <th>Total Canciones Ventas</th>
    
                
                    
                  </tr>
                </thead>
                <tbody>
                  {report.map((report, id) => 
                    (
                      <tr key={id} className={"table-light"} >
                        <th scope="row">{id+1}</th>
                        <td>{(new Date( report.weekstart)).toLocaleString()}</td>
                        <td>{(new Date( report.weekend)).toLocaleString()}</td>
                        <td>{report.weektotal}</td>
                        <td>{report.weektotaltracks}</td>
        
                      </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                    <tr>
                        <td className="right" colSpan="3">Totales:</td><td className="right">{report.reduce((a, b) => a + parseFloat(b['weektotal'] || 0), 0)}</td><td className="right">{report.reduce((a, b) => a + parseFloat(b['weektotaltracks'] || 0), 0)}</td>
                    </tr>
                </tfoot>
              </Table>
              </Fragment>
            );
            case '11':
              return (
                <Fragment>
                
                
               <Table className="edit-track-table" borderless>
                <thead>
                  <tr>
                    
                    
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
                    <th>Límite</th>
    
                
                    
                  </tr>
                </thead>
                <tbody>

                      <tr>
                      
                      <td><DatePicker
                        className="edit-track-input"
                          selected={dateStart}
                          onChange={setDateStart}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={60}
                          timeCaption="Tiempo"
                          dateFormat="yyyy-MM-dd h:mm aa"
                          style={{margin:20}}
                          
                        /></td>
                        
                        <td><DatePicker
                        className="edit-track-input"
                          selected={dateEnd}
                          onChange={setDateEnd}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={60}
                          timeCaption="Tiempo"
                          dateFormat="yyyy-MM-dd h:mm aa"
                          
                        /></td>
                        <td>
                        <input className="edit-track-input"
                            type="number"
                            min='0'
                            placeholder="Ingrese el límite"
                            value={limit}
                            onChange={e => setLimit(e.target.value)}
                          />
                        </td>
                        <td><Button style={{margin:20,height:60}} disabled={dateStart>dateEnd || limit<=0} onClick={()=>getReportResult({reportType:11,params:{dateStart,dateEnd,limit}})}>Generar Reporte</Button></td>
                      </tr>
                      
                </tbody>
                
              </Table>
                <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Artista</th>
                    <th>Cantidad Canciones Vendidas</th>
                    <th>Total Ventas</th>
    
                
                    
                  </tr>
                </thead>
                <tbody>
                  {report.map((report, id) => 
                    (
                      <tr key={id} className={"table-light"} >
                        <th scope="row">{id+1}</th>
                        <td>{report.artistname}</td>
                        <td>{report.trackcount}</td>
                        <td>{report.totalsold}</td>
        
                      </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                    <tr>
                        <td className="right" colSpan="2">Totales:</td><td className="right">{report.reduce((a, b) => a + parseFloat(b['trackcount'] || 0), 0)}</td><td className="right">{report.reduce((a, b) => a + parseFloat(b['totalsold'] || 0), 0)}</td>
                    </tr>
                </tfoot>
              </Table>
              </Fragment>
            );
            case '12':
              
              return (
                <Fragment>
                
                
               <Table className="edit-track-table" borderless>
                <thead>
                  <tr>
                    
                    
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
                    
    
                
                    
                  </tr>
                </thead>
                <tbody>

                      <tr>
                      
                      <td><DatePicker
                        className="edit-track-input"
                          selected={dateStart}
                          onChange={setDateStart}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={60}
                          timeCaption="Tiempo"
                          dateFormat="yyyy-MM-dd h:mm aa"
                          style={{margin:20}}
                          
                        /></td>
                        
                        <td><DatePicker
                        className="edit-track-input"
                          selected={dateEnd}
                          onChange={setDateEnd}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={60}
                          timeCaption="Tiempo"
                          dateFormat="yyyy-MM-dd h:mm aa"
                          
                        /></td>
                       
                        <td><Button style={{margin:20,height:60}} disabled={dateStart>dateEnd } onClick={()=>getReportResult({reportType:12,params:{dateStart,dateEnd,limit}})}>Generar Reporte</Button></td>
                      </tr>
                      
                </tbody>
              </Table>
                <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Género</th>
                    <th>Cantidad Canciones Vendidas</th>
                    <th>Total Ventas</th>
    
                
                    
                  </tr>
                </thead>
                <tbody>
                  {report.map((report, id) => 
                    (
                      <tr key={id} className={"table-light"} >
                        <th scope="row">{id+1}</th>
                        <td>{report.genrename}</td>
                        <td>{report.trackcount}</td>
                        <td>{report.totalsold}</td>
                        
        
                      </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                    <tr>
                        <td className="right" colSpan="2">Totales:</td><td className="right">{report.reduce((a, b) => a + parseFloat(b['trackcount'] || 0), 0)}</td><td className="right">{report.reduce((a, b) => a + parseFloat(b['totalsold'] || 0), 0)}</td>
                    </tr>
                </tfoot>
              </Table>
              </Fragment>
            );
            case '13':
              return (
                <Fragment>
                
                
               <Table className="edit-track-table" borderless>
                <thead>
                  <tr>
                    
                    
                    <th>Artista</th>
                    <th>Límite</th>
    
                
                    
                  </tr>
                </thead>
                <tbody>

                      <tr>
                      <td>
                      <select value={artist} onChange={e => setArtist(e.target.value)} className="edit-album-select">
                          <option value="DEFAULT" disabled hidden>
                            {'Selecciona un artista'}
                          </option>
                          {artistList.map(art => (
                          <option key={art.artistid} value={art.artistid}>
                            {art.artistname}
                          </option>
                          ))}
                        </select>
                      </td>
                      <td>
                      <input className="edit-track-input"
                            type="number"
                            min='0'
                            placeholder="Ingrese el límite"
                            value={limit}
                            onChange={e => setLimit(e.target.value)}
                          />
                        </td>
                       
                        <td><Button style={{margin:20,height:60}} disabled={limit<=0} onClick={()=>getReportResult({reportType:13,params:{dateStart,dateEnd,limit,artistid:artist}})}>Generar Reporte</Button></td>
                      </tr>
                      
                </tbody>
              </Table>
                <Table id={"report"+reporttypeid}  className='reports-content' size="sm" hover bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Canción</th>
                    <th>Artista</th>
                    <th>Total Reproducciones</th>
                   
    
                
                    
                  </tr>
                </thead>
                <tbody>
                  {report.map((report, id) => 
                    (
                      <tr key={id} className={"table-light"} >
                        <th scope="row">{id+1}</th>
                        <td>{report.trackname}</td>
                        <td>{report.artistname}</td>
                        <td>{report.trackcount}</td>
                       
        
                      </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                    <tr>
                        <td className="right" colSpan="3">Totales:</td><td className="right">{report.reduce((a, b) => a + parseFloat(b['trackcount'] || 0), 0)}</td>
                    </tr>
                </tfoot>
              </Table>
              </Fragment>
            );
            
    default:
      return null;
  }
}
 
const Reports = ({  onSelectReport,permissions,report,selectedReportId,getReportResult,artistList}) => {
  //getReportResult({reportType:9})
  const [dropdownOpen, setOpen] = useState(false);
  const [dateStart, setDateStart] = useState( new Date(Date.now() - 864e5));
  const [dateEnd, setDateEnd] = useState( new Date(Date.now() + 864e5));
  const [limit, setLimit] = useState(10);
  const [artistSearch, setArtistSearch] = useState(1);
  const [dropdownName,changeDropdownName] = useState('Seleccionar reporte');
  const toggle = () => setOpen(!dropdownOpen);
  const changeDropdown = (newName,newValue) => {changeDropdownName(newName); onSelectReport({reportType:newValue});
         getReportResult({reportType:newValue,params:{dateStart,dateEnd,limit,artistid:artistSearch}});}
  const Reports=["Reporte artistas con más álbumes publicados","Reporte géneros con más canciones","Reporte total de duración de cada playlist","Reporte canciones de mayor duración con la información de sus artistas","Reporte usuarios que han registrado más canciones","Reporte promedio de duración de canciones por género","Reporte cantidad de artistas diferentes por playlist","Reporte artistas con más diversidad de géneros musicales","Reporte cantidades de música","Reporte total de ventas por semana","Reporte artistas con mayores ventas","Reporte total de ventas por género","Reporte canciones más reproducidas de un artista"]
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
                <div className="reports-add-button" onClick={() => generateInvoicePDF(Reports[selectedReportId-1],selectedReportId)}>
                <i className="fa fa-file-pdf-o  fa-xs"></i>
                </div>
                <div className="reports-add-button" onClick={() => exportExcelReport(Reports[selectedReportId-1],report)}>
                <i className="fa fa-file-excel-o fa-xs"></i>
                </div>
          </div>}
          {renderSwitchReport(selectedReportId,report,setDateEnd,setDateStart,dateStart,dateEnd,getReportResult,limit,setLimit,artistSearch,setArtistSearch,artistList)}

        </div>
 

      </div>
    </Fragment>
  );
} 


export default connect(
  state => ({
    report: selectors.getReport(state),
    permissions: selectors.getLoggedUser(state).permissions,
    selectedReportId: selectors.getReportSelected(state),
    artistList: selectors.getArtists(state),
  }),
  dispatch => ({

    onSelectReport({reportType}) {
      if(reportType==13){
          //Se carga el DorpDown de albums
        dispatch(actionArtists.clearArtists());
        artistService.getArtistListAll().then(res=> {
          const artistDropDown = res;
          artistDropDown.map(artist => dispatch(actionArtists.addArtist(artist)));
        });
      }
      dispatch(actionsReport.selectReportId(reportType))
    },
    getReportResult({reportType,params={limit:10,dateStart:(new Date('2020-05-19')),dateEnd:(new Date('2020-05-21')),artistid:1}}){
      
      reportService.getReport({reportType,params}).then(
        report=>{dispatch(actionsReport.selectReport(report))}
      )
    }
  }),
)(Reports);

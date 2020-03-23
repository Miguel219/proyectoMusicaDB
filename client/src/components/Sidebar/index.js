import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';
import logo from '../../../public/Images/music-note.png';
import Artistas from '../../../public/Images/Artistas.png';
import Canciones from '../../../public/Images/Canciones.png';
import Albumes from '../../../public/Images/Álbumes.png';
import Reportes from '../../../public/Images/Reportes.png';
import Logoff from '../../../public/Images/Logoff.png';
import * as actions from '../../actions/loggedUser';
import * as actionReport from '../../actions/reports'
import * as selectors from '../../reducers';

const Reports=["Reporte artistas por área","Reporte géneros con más canciones","Reporte artistas con más albums individuales","Reporte canciones de mayor duración con la información de sus artistas","Reporte usuarios que han registrado más canciones","Reporte promedio de duración de canciones por género","Reporte álbumes más recientes","Reporte artistas más colaborativos"]
const sidebarOptions = ['Canciones', 'Artistas', 'Álbumes', 'Reportes'];
const optImg = [Canciones, Artistas, Albumes, Reportes];
let logoffimg = Logoff;
const DummySidebar = ({loggoff,permissions}) => {
  document.body.style.backgroundColor = '#A8FFF5';
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <img alt="logo" src={logo} className="sidebar-title-image"/>

        {'Music App'}
      </div>
      <div className="sidebar-options">
        {sidebarOptions.map((option, id) => (
          (id<3 || (id===3 && Reports.some(r=> permissions.includes(r)))) ?
          (<Link key={id} to={'/main/' + option.toLowerCase()} style={{textDecoration:'none',color:'dimgray'}}>
            <div value={id} className="sidebar-option">
              <img alt="img" src={optImg[id]} className="sidebar-image"/>
              {option}
            </div>
          </Link>) : null
        ))}
        <div className="sidebar-option" style={{paddingBottom:'1.5px'}}>
          <Link  to={'/login' } style={{textDecoration:'none',color:'white'}} onClick={()=>loggoff()}>
            <img alt="img" src={logoffimg} className="sidebar-image"/>
             Cerrar sesión
          </Link> 
        </div>
      </div>
   
    </div>
  );
} 

export const Sidebar = connect(
  state => ({
    permissions: selectors.getLoggedUser(state).permissions,
  }),
  (dispatch,state) => ({
    loggoff() {
      dispatch(actionReport.selectReport([]));
      dispatch(actionReport.selectReportId(null));
      dispatch(actions.logout())
      
    },
  }),
)(DummySidebar);

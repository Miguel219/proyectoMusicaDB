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

const Reports=["Reporte artistas con más álbumes publicados","Reporte géneros con más canciones","Reporte total de duración de cada playlist","Reporte canciones de mayor duración con la información de sus artistas","Reporte usuarios que han registrado más canciones","Reporte promedio de duración de canciones por género","Reporte cantidad de artistas diferentes por playlist","Reporte artistas con más diversidad de géneros musicales","Reporte cantidades de música","Reporte total de ventas por semana","Reporte artistas con mayores ventas","Reporte total de ventas por género","Reporte canciones más reproducidas de un artista"]
const sidebarOptions = ['Canciones', 'Artistas', 'Álbumes', 'Reportes'];
const optImg = [Canciones, Artistas, Albumes, Reportes];
let logoffimg = Logoff;

const Sidebar = ({loggoff,permissions}) => {
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

export default connect(
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
)(Sidebar);

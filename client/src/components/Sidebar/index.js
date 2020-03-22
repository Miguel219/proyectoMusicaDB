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

const sidebarOptions = ['Canciones', 'Artistas', 'Álbumes', 'Reportes'];
const optImg = [Canciones, Artistas, Albumes, Reportes];
let logoffimg = Logoff;
const DummySidebar = ({loggoff}) => {
  document.body.style.backgroundColor = '#A8FFF5';
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <img alt="logo" src={logo} className="sidebar-title-image"/>

        {'Music App'}
      </div>
      <div className="sidebar-options">
        {sidebarOptions.map((option, id) => (
          <Link key={id} to={'/main/' + option.toLowerCase()} style={{textDecoration:'none',color:'dimgray'}}>
            <div value={id} className="sidebar-option">
              <img alt="img" src={optImg[id]} className="sidebar-image"/>
              {option}
            </div>
          </Link>
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
  undefined,
  (dispatch,state) => ({
    loggoff() {
      dispatch(actions.logout())
      
    },
  }),
)(DummySidebar);

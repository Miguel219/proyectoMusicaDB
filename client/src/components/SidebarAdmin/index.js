import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';
import logo from '../../../public/Images/music-note.png';
import Usuarios from '../../../public/Images/Artistas.png';
import Roles from '../../../public/Images/Roles.png';
import Simulación from '../../../public/Images/Simulación.png';
import Logoff from '../../../public/Images/Logoff.png';
import * as actions from '../../actions/loggedUser';
import * as selectors from '../../reducers';

const sidebarOptions = ['Usuarios', 'Roles', 'Simulación'];
const optImg = [Usuarios, Roles, Simulación];
let logoffimg = Logoff;

const SidebarAdmin = ({loggoff,permissions}) => {
  document.body.style.backgroundColor = '#A8FFF5';
  return (
    <div className="sidebar-admin">
      <div className="sidebar-admin-title">
        <img alt="logo" src={logo} className="sidebar-admin-title-image"/>
        {'Music App'}
      </div>
      <div className="sidebar-admin-options">
        {sidebarOptions.map((option, id) => (
          <Link key={id} to={'/admin/' + option.toLowerCase()} style={{textDecoration:'none',color:'dimgray'}}>
            <div value={id} className="sidebar-admin-option">
              <img alt="img" src={optImg[id]} className="sidebar-admin-image"/>
              {option}
            </div>
          </Link>
        ))}
        <div className="sidebar-admin-option" style={{paddingBottom:'1.5px'}}>
          <Link  to={'/login' } style={{textDecoration:'none',color:'white'}} onClick={()=>loggoff()}>
            <img alt="img" src={logoffimg} className="sidebar-admin-image"/>
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
      dispatch(actions.logout())
      
    },
  }),
)(SidebarAdmin);

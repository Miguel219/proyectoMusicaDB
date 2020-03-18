import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../../public/Images/music-note.png';
import Artistas from '../../../public/Images/Artistas.png';
import Canciones from '../../../public/Images/Canciones.png';
import Albumes from '../../../public/Images/Álbumes.png';
import Reportes from '../../../public/Images/Reportes.png';
import Search from '../../../public/Images/Search.png';


const sidebarOptions = ['Canciones', 'Artistas', 'Álbumes', 'Reportes'];
const optImg = [Canciones, Artistas, Albumes, Reportes];

export const Main = () => {
  document.body.style.backgroundColor = '#b3ffff';
  const [searchInput, changeSearchInput] = useState('');
  return (
    <Fragment>
    <div className="sidebar">
      <Link to='/main/home' style={{textDecoration:'none',color:'dimgray'}}>
        <div className="sidebar-title">
          <img alt="logo" src={logo} className="sidebar-title-image"/>
          {'Music App'}
        </div>
      </Link>
      <div className="sidebar-options">
        {sidebarOptions.map((option, id) => (
          <Link key={id} to={'/main/' + option} style={{textDecoration:'none',color:'dimgray'}}>
            <div value={id} className="sidebar-option">
              <img alt="img" src={optImg[id]} className="sidebar-image"/>
              {option}
            </div>
          </Link>
        ))}
      </div>
    </div>
    <div className="header">
      <input className="header-search-input"
          type="text"
          placeholder="Buscar"
          value={searchInput}
          onChange={e => changeSearchInput(e.target.value)}
        />
      <div className="header-search-button" ><img alt="img" src={Search} className="header-search-image"/></div>
      <div className="header-user">
        <img alt="img" src={Artistas} className="user-image"/>
        <div className="header-user-info">
          {'Juan Pérez'}
        </div>    
      </div>
    </div>
    </Fragment>
  );
} 

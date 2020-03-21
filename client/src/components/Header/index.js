import React, {useState } from 'react';

import './styles.css';
import Artistas from '../../../public/Images/Artistas.png';
import Search from '../../../public/Images/Search.png';
import UpArrow from '../../../public/Images/up-arrow.png';
import DownArrow from '../../../public/Images/down-arrow.png';

//const filterOptions = ['Género', 'Canción', 'Artista', 'Álbum'];

export const Header = ({ onSearch }) => {
  const [searchInput, changeSearchInput] = useState('');
  const [showFilter, changeShowFilter] = useState(Boolean);
  return (
    <div className="header">
      <div className="header-search-filter" onClick={() => changeShowFilter(!showFilter)} >
        <img alt="img" src={showFilter ? UpArrow : DownArrow} className="header-search-image"/>
      </div>
      <input className="header-search-input"
          type="text"
          placeholder="Buscar"
          value={searchInput}
          onChange={e => changeSearchInput(e.target.value)}
      />
      <div className="header-search-button" onClick={() => onSearch()} >
        <img alt="img" src={Search} className="header-search-image"/>
      </div>
      <div className="header-user">
        <img alt="img" src={Artistas} className="user-image"/>
        <div className="header-user-info">
          {'Juan Pérez'}
        </div>    
      </div>
    </div>
  );
} 

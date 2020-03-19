import React, {useState } from 'react';

import './styles.css';
import Artistas from '../../../public/Images/Artistas.png';
import Search from '../../../public/Images/Search.png';

const filterOptions = ['Género', 'Canción', 'Artista', 'Álbum'];

export const Header = ({ onSearch }) => {
  const [searchInput, changeSearchInput] = useState('');
  return (
    <div className="header">
      <input className="header-search-input"
          type="text"
          placeholder="Buscar"
          value={searchInput}
          onChange={e => changeSearchInput(e.target.value)}
      />
      <select id="filterSelect"  defaultValue={'DEFAULT'} className="header-search-select"
        onChange={e => console.log(e.target.value)}  >
        <option value="DEFAULT" disabled hidden>
          {'Filtro'}
        </option>
        {filterOptions.map((option,id) => (
        <option key={id} value={id}>
          {option}
        </option>
        ))}
      </select>
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

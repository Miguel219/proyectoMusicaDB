import React, { Fragment } from 'react';

import './styles.css';
import { Header } from '../Header';

const onSearch = () => {
  console.log('Hola');
};

export const Home = () => {
  return (
    <Fragment>
      <Header onSearch={() => onSearch()}/>
      <div className="home">
        {'Canciones:'}
        <div className="home-content">
          <div className="home-content-container" >{'hola1'}</div>
          <div className="home-content-container" >{'hola2'}</div>
          <div className="home-content-container" >{'hola3'}</div>
          <div className="home-content-container" >{'hola4'}</div>
          <div className="home-content-container" >{'hola5'}</div>
          <div className="home-content-container" >{'hola6'}</div>
        </div>
        <hr/>
        {'Artistas:'}
        <div className="home-content">
          <div className="home-content-container" >{'hola1'}</div>
          <div className="home-content-container" >{'hola2'}</div>
          <div className="home-content-container" >{'hola3'}</div>
          <div className="home-content-container" >{'hola4'}</div>
          <div className="home-content-container" >{'hola5'}</div>        
          <div className="home-content-container" >{'hola6'}</div>        
        </div>
        <hr/>
        {'Álbumes:'}
        <div className="home-content">
          <div className="home-content-container" >{'hola1'}</div>
          <div className="home-content-container" >{'hola2'}</div>
          <div className="home-content-container" >{'hola3'}</div>
          <div className="home-content-container" >{'hola4'}</div>
          <div className="home-content-container" >{'hola5'}</div>        
          <div className="home-content-container" >{'hola6'}</div>        
        </div>
      </div>
    </Fragment>
  );
} 

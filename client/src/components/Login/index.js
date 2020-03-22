
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import userService from '../../services/user';
import './styles.css';
import logo from '../../../public/Images/music-note.png';
import * as actions from '../../actions/loggedUser';
import { withRouter } from "react-router-dom";
import { history } from '../App';

const Login = ({ onSubmit }) => {
  document.body.style.backgroundColor = 'white';
  const [mailInput, changeMailInput] = useState('');
  
  const [passwordInput, changePasswordInput] = useState('');

  return (
    <div className="form-login">
        <div className="form-login-container">
        <img alt="logo" src={logo} style={{width: '80px'}}/>
        <br/>
        <h1 className="form-login-title">
              {'Login'}
        </h1>
        <br/>
        <input className="form-login-input"
          type="text"
          placeholder="Correo"
          value={mailInput}
          onChange={e => changeMailInput(e.target.value)}
        />
        <input className="form-login-input"
          type="password"
          placeholder="Contraseña"
          value={passwordInput}
          onChange={e => changePasswordInput(e.target.value)}
        />
        <br/>
        
          <button type="submit" className="form-login-button" onClick={
            () => onSubmit(mailInput, passwordInput)
          }>
            {'Ingresar'}
          </button>
       
        <br/>
        <label>
          {'¿No tienes cuenta? '}
          <Link to='/signin'>{'Crea tu cuenta'}</Link>
        </label>
      </div>
    </div>
    
  );
} 





const connected = connect(
  undefined,
  (dispatch,state) => ({
    onSubmit(mailInput, passwordInput) {
      let loggedIn = false;
      if (mailInput==="" || passwordInput==="") 
        { alert("Ingresa los campos para continuar")}
      else{  
        userService.loginuser({userid:mailInput,password:passwordInput}).then(
        (res)=>{
          if (res.length>0){
              loggedIn = true;
              let user = res[0];
              userService.getUserPermissions({userid:mailInput}).then(permissions =>{
                user.permissions = permissions.map(permission=>permission.permissionname)
                dispatch(actions.login(user))
                history.push("/main/canciones")
              })
          }else{
            alert("Los datos ingresados no coinciden con ningún usuario de la plataforma.");
            history.push("/login")
          }
        }
       
      );
     
      }
    },
  }),
)(Login);

export default (withRouter(connected));

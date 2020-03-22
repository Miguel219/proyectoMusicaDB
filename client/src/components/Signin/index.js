import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/user';
import './styles.css';



const onSubmit = (nameInput, birthdayInput, lastNameInput, mailInput, passwordInput) => {
  userService.useridtaken({userid:mailInput}).then(
    res => {
      if(!res[0].isuseridtaken){
        userService.addUser({name:nameInput,lastname:lastNameInput,birthdate:birthdayInput,userid:mailInput,password:passwordInput});
      }else{
        alert("El correo ingresado ya existe en la plataforma.")
      }
      
    }
);
  
  
};

var useridtaken = true;
const isUserIdTaken = (userid) => {
  userService.useridtaken({userid}).then(
      res => {
        useridtaken = res[0].isuseridtaken;
        console.log(res[0].isuseridtaken)
      }
  );
};

const validateInputs = (nameInput, birthdayInput, lastNameInput, mailInput, passwordInput) => {
  
  const date = new Date(birthdayInput)
  console.log();
  if(nameInput==='' || birthdayInput==='' || lastNameInput==='' || mailInput==='' || passwordInput==='')
    return false;
  if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mailInput))
    return false;
  if(isNaN(date.getTime() || date.getFullYear()>2020 || date.getFullYear()<1920))
    return false;
  return true;

};

export const Signin = () => {
  document.body.style.backgroundColor = 'white';
  const [nameInput, changeNameInput] = useState('');
  const [lastNameInput, changeLastNameInput] = useState('');
  const [birthdayInput, changeBirthdayInput] = useState('');
  const [mailInput, changeMailInput] = useState('');
  const [passwordInput, changePasswordInput] = useState('');
  return (
    <div className="form-signin">
        <div className="form-signin-container">
        <h1 className="form-signin-title">
          {'Crear cuenta'}
        </h1>
        <br/>
        <label style={{width: '270px'}}>
          {'Nombre:'}
        </label>
        <input className="form-signin-input"
          type="text"
          value={nameInput}
          onChange={e => changeNameInput(e.target.value)}
        />
        <label style={{width: '270px'}}>
          {'Apelido:'}
        </label>
        <input className="form-signin-input"
          type="text"
          value={lastNameInput}
          onChange={e => changeLastNameInput(e.target.value)}
        />
        <label style={{width: '270px'}}>
          {'Fecha de nacimiento:'}
        </label>
        <input className="form-signin-input"
          type="date"
          value={birthdayInput}
          onChange={e => changeBirthdayInput(e.target.value)}
        />
        <label style={{width: '270px'}}>
          {'Correo:'}
        </label>
        <input className="form-signin-input"
          type="email"
          value={mailInput}
          onChange={e => {changeMailInput(e.target.value);
            isUserIdTaken(e.target.value)}}
          
        />
        
        
        <label style={{width: '270px'}}>
          {'Contraseña:'}
        </label>
        <input className="form-signin-input"
          type="password"
          value={passwordInput}
          onChange={e => changePasswordInput(e.target.value)}
        />
        <br/>
        <Link to={validateInputs(nameInput, birthdayInput, lastNameInput, mailInput, passwordInput) && (!useridtaken) ? '/login' : '/signin'} >
          <button type="submit" className='form-login-button' onClick={
            () => validateInputs(nameInput, birthdayInput, lastNameInput, mailInput, passwordInput) ? onSubmit(nameInput, birthdayInput, lastNameInput, mailInput, passwordInput) : alert("Revisa tus datos para continuar")
          }>
            {'Registrarse'}
          </button>
        </Link>
        <br/>
        <label>
          {'¿Ya tienes una cuenta? '}
          <Link to='/login'>{'Inicia sesión'}</Link>
        </label>
      </div>
    </div>
  );
} 

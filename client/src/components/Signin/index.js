
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../services/user';
import './styles.css';



const onSubmit = (nameInput, birthdayInput, lastNameInput, mailInput, passwordInput, countryInput, stateInput, cityInput, addressInput, postalCodeInput) => {
  userService.useridtaken({userid:mailInput}).then(
    res => {
      if(!res[0].isuseridtaken){
        if(stateInput === '')
          stateInput = null;
        userService.addUser({name:nameInput,lastname:lastNameInput,birthdate:birthdayInput,userid:mailInput,password:passwordInput,country:countryInput,state:stateInput,city:cityInput,address:addressInput,postalcode:postalCodeInput});
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

const validateInputs = (nameInput, birthdayInput, lastNameInput, mailInput, passwordInput, countryInput, cityInput, addressInput, postalCodeInput) => {
  
  const date = new Date(birthdayInput)
  console.log();
  if(nameInput==='' || birthdayInput==='' || lastNameInput==='' || mailInput==='' || passwordInput==='' || countryInput==='' || cityInput==='' || addressInput==='' || postalCodeInput==='')
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
  const [addressInput, changeAddressInput] = useState('');
  const [cityInput, changeCityInput] = useState('');
  const [stateInput, changeStateInput] = useState('');
  const [countryInput, changeCountryInput] = useState('');
  const [postalCodeInput, changePostalCodeInput] = useState('');
  return (
    <div className="form-signin">
        <div className="form-signin-container">
        <h1 className="form-signin-title">
          {'Crear cuenta'}
        </h1>
        <br/>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Nombre'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="text"
            value={nameInput}
            onChange={e => changeNameInput(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Apelido'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="text"
            value={lastNameInput}
            onChange={e => changeLastNameInput(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Fecha de nacimiento'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="date"
            value={birthdayInput}
            onChange={e => changeBirthdayInput(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Correo'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="email"
            value={mailInput}
            onChange={e => {changeMailInput(e.target.value);
              isUserIdTaken(e.target.value)}}
            
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'País'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="text"
            value={countryInput}
            onChange={e => changeCountryInput(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Estado'}
          </label>
          <input className="form-signin-input"
            type="text"
            value={stateInput}
            onChange={e => changeStateInput(e.target.value)}
        />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Ciudad'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="text"
            value={cityInput}
            onChange={e => changeCityInput(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Dirección'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="text"
            value={addressInput}
            onChange={e => changeAddressInput(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Código Postal'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="number"
            value={postalCodeInput}
            onChange={e => changePostalCodeInput(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'50%'}}>
          <label style={{width: '270px',marginTop:'20px',marginBottom:'0px'}}>
            {'Contraseña'}
            <span style={{color:'red'}}>
              {' *'}
            </span>
          </label>
          <input className="form-signin-input"
            type="password"
            value={passwordInput}
            onChange={e => changePasswordInput(e.target.value)}
          />
        </div>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
          <br/>
          <Link to={validateInputs(nameInput, birthdayInput, lastNameInput, mailInput, passwordInput, countryInput, cityInput, addressInput, postalCodeInput) && (!useridtaken) ? '/login' : '/signin'} >
            <button type="submit" className='form-signin-button' onClick={
              () => validateInputs(nameInput, birthdayInput, lastNameInput, mailInput, passwordInput, countryInput, cityInput, addressInput, postalCodeInput) ? onSubmit(nameInput, birthdayInput, lastNameInput, mailInput, passwordInput, countryInput, stateInput, cityInput, addressInput, postalCodeInput) : alert("Revisa tus datos para continuar")
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
    </div>
  );
} 

import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import userService from '../../services/user';

const EditUser = ({ user, roleList, permissions, onSave }) => {
  document.body.style.backgroundColor = '#434343';
  const [roleDropDown, changeRoleDropDown] = useState(user.roleid);
  return (
    <div className="edit-user">
      <div className='edit-user-content'>
        <div className='edit-user-title'>
          {"Asignar Rol"}
        </div>
        <Table className="edit-user-table" borderless>
          <thead>
            <tr>
              <th>{'Rol:'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select value={roleDropDown} onChange={e => changeRoleDropDown(e.target.value)} className="edit-user-select">
                  {roleList.map(role => (
                  <option key={role.roleid} value={role.roleid}>
                    {role.rolename}
                  </option>
                  ))}
                </select>
              </td>
              <td>
                <button type="submit" className="edit-user-button-save" onClick={() => 
                    onSave({
                      userid: user.userid,
                      roleid: roleDropDown,
                    })
                  }>
                    {'Editar'}
                  </button>
                <button type="submit" className="edit-user-button-save w3-cyan" style={{marginLeft:'10px'}} onClick={() => history.goBack()}>
                  {'Regresar'}
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
} 


export default connect(
  state => ({
    user: selectors.getSelectedUser(state),
    permissions: selectors.getLoggedUser(state).permissions,
    roleList: selectors.getRoles(state),
  }),
  dispatch => ({
    onSave(user) {
      if(user.roleid!=null) {
        userService.assignRole(user).then(()=> history.push('/admin/usuarios'));
      }else{
        alert("Ingresa todos los campos para guardar.");
      };
    },
  }),
)(EditUser);

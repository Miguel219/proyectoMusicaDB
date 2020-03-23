import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import roleService from '../../services/role';
import * as actionPermissions from '../../actions/permissions';


const EditUser = ({ role, permissionList, onSave, goBack }) => {
  document.body.style.backgroundColor = '#434343';
  const [permissionDropDown, changePermissionDropDown] = useState("DEFAULT");
  return (
    <div className="edit-permission">
      <div className='edit-permission-content'>
        <div className='edit-permission-title'>
          {"Asignar Permiso"}
        </div>
        <Table className="edit-permission-table" borderless>
          <thead>
            <tr>
              <th>{'Permiso:'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select value={permissionDropDown} onChange={e => changePermissionDropDown(e.target.value)} className="edit-permission-select">
                  <option value="DEFAULT" disabled hidden>
                    {'Selecciona un permiso'}
                  </option>
                  {permissionList.map(permission => (
                  <option key={permission.permissionid} value={permission.permissionid}>
                    {permission.permissionname}
                  </option>
                  ))}
                </select>
              </td>
              <td>
                <button type="submit" className="edit-permission-button-save" onClick={() => 
                    onSave({
                      roleid: role.roleid,
                      permissionid: permissionDropDown,
                    })
                  }>
                    {'Asignar'}
                  </button>
                <button type="submit" className="edit-permission-button-save w3-cyan" style={{marginLeft:'10px'}} onClick={() => goBack({roleid: role.roleid})}>
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
    role: selectors.getSelectedRole(state),
    permissionList: selectors.getPermissions(state),
  }),
  dispatch => ({
    onSave(role) {
      if(role.permissionid!=="DEFAULT") {
        roleService.assignPermission(role).then(()=> 
          roleService.assignPermission(role).then(()=> {
            //Se carga la lista de permisos
            dispatch(actionPermissions.clearPermissions());
            roleService.getRolePermissions(role).then(res=> {
              const permissionList = res;
              permissionList.map(permission => dispatch(actionPermissions.addPermission(permission)));
            });
            history.push('/editar/rol');
        }));
      }else{
        alert("Ingresa todos los campos para guardar.");
      };
    },
    goBack(role) {
      //Se carga la lista de permisos
      dispatch(actionPermissions.clearPermissions());
      roleService.getRolePermissions(role).then(res=> {
        const permissionList = res;
        permissionList.map(permission => dispatch(actionPermissions.addPermission(permission)));
      });
      history.push('/editar/rol');
    },
  }),
)(EditUser);

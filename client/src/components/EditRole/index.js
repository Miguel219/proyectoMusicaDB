import React, { useState } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import roleService from '../../services/role';
import * as actionPermissions from '../../actions/permissions';

const roleModel = {
  roleid: null,
  rolename: "",
};

const EditRole = ({ role, rolePermissions, permissions, onSave, onDelete, onClick, onDeletePermission }) => {
  role = {...roleModel, ...role}
  document.body.style.backgroundColor = '#434343';
  const [nameInput, changeNameInput] = useState(role.rolename);
  return (
    <div className="edit-role">
      <div className='edit-role-content'>
        <div className='edit-role-title'>
          {"Rol"}
        </div>
        <Table className="edit-role-table" borderless>
          <thead>
            <tr>
              <th>{'Nombre del rol:'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input className="edit-role-input"
                  type="text"
                  placeholder="Ingresa el nombre del rol"
                  value={nameInput}
                  onChange={e => changeNameInput(e.target.value)}
                />
              </td>
              <td>
                {(role.roleid==null && permissions.includes('Crear rol')) ?
                  (<button type="submit" className="edit-role-button-save" onClick={() => 
                    onSave({
                      roleid: role.roleid,
                      rolename: nameInput,
                    }, role.roleid===2)
                  }>
                    {'Crear'}
                  </button>): null
                }
                {(role.roleid!=null && permissions.includes('Editar rol')) ?
                  (<button type="submit" className="edit-role-button-save" onClick={() => 
                    onSave({
                      roleid: role.roleid,
                      rolename: nameInput,
                    }, role.roleid===2)
                  }>
                    {'Editar'}
                  </button>): null
                }                
                {(role.roleid!=null && permissions.includes('Eliminar rol')) ? 
                  <button type="submit" className="edit-role-button-delete" onClick={() => onDelete(role, role.roleid===2)}>
                  {'Eliminar'}
                </button> : 
                  null
                }
                <button type="submit" className="edit-role-button-delete w3-cyan" style={{marginLeft:'10px'}} onClick={() => history.push("/admin/roles")}>
                  {'Regresar'}
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="edit-role-table-permissions-container">
          {'Permisos del rol:'}
          <div className="role-permissions-buttons" hidden={role.roleid===2 || !permissions.includes('Asignar un permiso a un rol')}>
            <div className="role-permissions-add-button" onClick={() => onClick(role)}>
            <i className="fa fa-plus fa-xs"></i>
            </div>
          </div>
          <Table className='edit-role-table-permissions' size="sm" hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Permiso</th>
              </tr>
            </thead>
            <tbody>
              {rolePermissions.map((permission, id) => 
                (
                  <tr key={id} className={"table-light"} onClick={()=> (role.roleid>2) ? onDeletePermission({permissionid: permission.permissionid, roleid: role.roleid}) : null}>
                    <th scope="row">{id+1}</th>
                    <td>{permission.permissionname}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
} 


export default connect(
  state => ({
    role: selectors.getSelectedRole(state),
    rolePermissions: selectors.getPermissions(state),
    permissions: selectors.getLoggedUser(state).permissions,
  }),
  dispatch => ({
    onSave(role, isGeneral) {
      if(isGeneral){
        alert("No se puede editar el rol General.");
      } else {
        if(role.rolename!=="") {
          if(role.roleid==null)
            roleService.addRole(role).then(()=> history.push('/admin/roles'));
          if(role.roleid!=null)
            roleService.updateRole(role).then(()=> history.push('/admin/roles'));
        }else{
          alert("Ingresa todos los campos para guardar.");
        };
      };
    },
    onDelete(role, isGeneral) {
      if(isGeneral){
        alert("No se puede eliminar el rol General.");
      } else {
        roleService.deleteRole(role).then(()=> history.push('/admin/roles'));
      }
    },
    onClick(role) {
      //Se carga el DorpDown de permisos
      dispatch(actionPermissions.clearPermissions());
      roleService.getPermissionsOutOfRole(role).then(res=> {
        const permissionList = res;
        permissionList.map(permission => dispatch(actionPermissions.addPermission(permission)));
      });
      history.push("/editar/permisos");
    },
    onDeletePermission(role) {
      roleService.unassignPermission(role).then(res=> {
        //Se carga el DorpDown de roles
        dispatch(actionPermissions.clearPermissions());
        roleService.getRolePermissions(role).then(res=> {
          const permissionList = res;
          permissionList.map(permission => dispatch(actionPermissions.addPermission(permission)));
        });
      });
    },
  }),
)(EditRole);

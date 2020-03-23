import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionRoles from '../../actions/roles';
import * as actionPermissions from '../../actions/permissions';
import roleService from '../../services/role';


const Roles = ({ roles, permissions, selectColumn, onClick }) => {
  return (
    <Fragment>
      <Header parentPage="Roles"/>
      <div className="roles">
        <div className="roles-title">
          {'Roles:'}
          <div className="roles-buttons" hidden={!permissions.includes('Crear rol')}>
            <div className="roles-add-button" onClick={() => onClick()}>
            <i className="fa fa-plus fa-xs"></i>
            </div>
          </div>
        </div>
        <Table className='roles-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, id) => 
              (
                <tr key={id} className={"table-light"} onClick={() => selectColumn(role)}>
                  <th scope="row">{id+1}</th>
                  <td>{role.rolename}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
} 


export default connect(
  state => ({
    roles: selectors.getRoles(state),
    permissions: selectors.getLoggedUser(state).permissions,
  }),
  dispatch => ({
    selectColumn(role) {
      dispatch(actionRoles.selectRole(role));
      //Se carga el DorpDown de roles
      dispatch(actionPermissions.clearPermissions());
      roleService.getRolePermissions(role).then(res=> {
        const permissionList = res;
        permissionList.map(permission => dispatch(actionPermissions.addPermission(permission)));
      });
      history.push("/editar/rol");
    },
    onClick() {
      dispatch(actionRoles.deselectRole());
      dispatch(actionPermissions.clearPermissions());
      history.push("/editar/rol");
    },
  }),
)(Roles);

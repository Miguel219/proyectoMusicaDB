import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { history } from '../App';
import './styles.css';
import * as selectors from '../../reducers';
import Header from '../Header';
import * as actionUsers from '../../actions/users';
import * as actionRoles from '../../actions/roles';
//import userService from '../../services/user';
import roleService from '../../services/role';


const Users = ({ users, permissions, selectColumn }) => {
  return (
    <Fragment>
      <Header parentPage="Users"/>
      <div className="users">
        <div className="users-title">
          {'Usuarios:'}
        </div>
        <Table className='users-content' size="sm" hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, id) => 
              (
                <tr key={id} className={"table-light"} onClick={() => selectColumn(user)}>
                  <th scope="row">{id+1}</th>
                  <td>{user.username}</td>
                  <td>{user.userid}</td>
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
    users: selectors.getUsers(state),
    permissions: selectors.getLoggedUser(state).permissions,
  }),
  dispatch => ({
    selectColumn(user) {
      dispatch(actionUsers.selectUser(user));
      //Se carga el DorpDown de roles
      dispatch(actionRoles.clearRoles());
      roleService.getRoleListAll().then(res=> {
        const roleDropDown = res;
        roleDropDown.map(role => dispatch(actionRoles.addRole(role)));
      });
      history.push("/editar/usuario");
    },
  }),
)(Users);

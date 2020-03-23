// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Route, Redirect } from 'react-router';
import * as selectors from '../../reducers';

export default ({component,path,store}) => {
  // Add your own authentication on the below line.
  const isLoggedIn = (selectors.isLoggedUser(store.getState()));

  return (
    <Route path={path}
    render={() => { 
        
       const page = (isLoggedIn && selectors.getLoggedUser(store.getState()).roleid===1) 
         ?  component
         :  <Redirect to={'/login'}/>;
       return(
         page
     )}}
    />
  )
}
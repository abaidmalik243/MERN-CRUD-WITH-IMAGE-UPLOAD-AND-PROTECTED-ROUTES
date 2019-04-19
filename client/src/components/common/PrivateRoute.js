import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
let user={
  isAuthorized:false
}
    let currentuser=JSON.parse(localStorage.getItem('currentuser'));
    if(currentuser !== null) {
      user = currentuser
    }

    console.log(user);
      return <Route
    {...rest}
    render={(props) =>
        user.isAuthorized === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />


};



export default PrivateRoute;

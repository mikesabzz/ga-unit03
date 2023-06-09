import React from 'react'
import authService from '../services/authService'
import { Route, Redirect } from 'react-router-dom'

/**
 * Protected route using React Router
 * https://tylermcginnis.com/react-router-protected-routes-authentication/
 */
function ProtectedRoute ({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          authService.isAuthenticated() ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    )
  }
  
  export default ProtectedRoute
import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext.jsx';

const PrivateRoute = ({component: Component, ...props}) => {
    // AuthContext
    const authContext = useContext(AuthContext);
    const { loading, authenticated, getAuthenticatedUser } = authContext

    useEffect(() => {
        getAuthenticatedUser();
    }, [])

    return (
        <Route {...props} render={ props => !authenticated && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        )} />
    );
}
 
export default PrivateRoute;

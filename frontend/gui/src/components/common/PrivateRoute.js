import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from '../../services/auth'

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
    <Route {...rest}
        render={
            props => {
                // if (auth.isLoading) return <h2>Loading...</h2>;
                if (!auth.authenticated) return <Redirect to="/login" />
                else return <Component {...props} />
            }
        }
    />
);

export default PrivateRoute;
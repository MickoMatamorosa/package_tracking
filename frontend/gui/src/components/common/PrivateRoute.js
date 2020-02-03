import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
    <Route {...rest}
        render={
            props => {
                // if (auth.isLoading) return <h2>Loading...</h2>;
                if (!localStorage.getItem('token')) return <Redirect to="/login" />
                else return <Component {...props} />
            }
        }
    />
);

export default PrivateRoute;
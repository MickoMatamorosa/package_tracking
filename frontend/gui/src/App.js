import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import './App.css';
import Main from "./components";

import PropRoute from "./components/common/PropsRoute";
import Login from "./components/accounts/SignIn";

// import PrivateRoute from "./components/common/PrivateRoute";
// import Branch from "./components/branch/Branch";
import Container from '@material-ui/core/Container';

function App() {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  
  return (
    <Router>
      <Fragment>
        <Container maxWidth="lg">
          <Switch>
            <PropRoute
              exact path="/"
              component={Main}
              isAuth={isAuth}
              user={user}
            />
            <PropRoute 
              path="/login"
              component={Login}
              setUser={setUser}
              setIsAuth={setIsAuth}
              isAuth={isAuth}
            />
            {/* <PrivateRoute path="/branch" component={Branch} /> */}
          </Switch>
        </Container>
      </Fragment>
    </Router>
  );
}

export default App;

import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Main from "./components";
import Container from '@material-ui/core/Container';

import PropRoute from "./components/common/PropsRoute";
import Login from "./components/accounts/SignIn";

import PrivateRoute from "./components/common/PrivateRoute";
import Branch from "./components/branch/Branch";

import { userAuth } from './services/authRequest'
import auth from './services/auth'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: null,
      email: null
    }
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      userAuth()
        .then(res => {
          const {username, email} = res
          this.setState({username, email})
          auth.login(() => {})
        })
        .catch(err => localStorage.clear())
    }
  }

  render(){
    
    return (
      <Router>
        <Fragment>
          <Container maxWidth="lg">
            <Switch>
              <Route
                exact path="/"
                component={Main}
              />
              <PropRoute 
                path="/login"
                component={Login}
              />
              <PrivateRoute
                path="/branch"
                component={Branch}
              />
            </Switch>
          </Container>
        </Fragment>
      </Router>
    );
  }
}

export default App;

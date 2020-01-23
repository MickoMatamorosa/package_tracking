import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from '../layout/Header';
import { userAuth } from '../../services/request';
import auth from '../../services/auth';

class Branch extends Component {
    componentDidMount(){
      if(localStorage.getItem('token')){
        userAuth()
          .then(res => auth.user = res.user)
          .catch(err => localStorage.clear())
      }
    }
    
    render() {
        
        return (
            <Fragment>
                <Header {...this.props} />
            </Fragment>
        )
    }
}

Branch.propTypes = {
    isAuth: PropTypes.bool
};

export default Branch
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { userAuth } from '../../services/authRequest';
import { branchProfile } from '../../services/branchRequest';

import Header from '../layout/Header';
import auth from '../../services/auth';
import Packages from './Packages'

class Branch extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            address: null
        }
    }

    componentDidMount(){
        if(localStorage.getItem('token')){
            userAuth()
                .then(res => auth.user = res.user)
                .catch(err => localStorage.clear())
            
            branchProfile()
                .then(res => {
                    const {name, address} = res
                    this.setState({name, address})
                }).catch(err => {
                    console.log(err);                    
                })
        }
    }
    
    render() {
        console.log(this.state.name);
        
        return (
            <Fragment>
                <Header {...this.props} />
                <Packages />
            </Fragment>
        )
    }
}

Branch.propTypes = {
    isAuth: PropTypes.bool
};

export default Branch
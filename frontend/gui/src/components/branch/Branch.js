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
            address: null,
            search: ""
        }
    }

    componentDidMount(){
        if(localStorage.getItem('token')){
            userAuth()
                .then(res => auth.user = res.id)
                .catch(err => localStorage.clear())
            
            branchProfile()
                .then(res => {
                    const {name, address} = res
                    this.setState({name, address})
                }).catch(err => console.log(err))
        }
    }

    submitTracking = (search) => this.setState({search})
    
    render() {        
        const {submitTracking, props, state} = this
        return (
            <Fragment>
                <Header {...props}
                    {...{submitTracking}}/>
                <Packages {...props}
                    search={state.search}/>
            </Fragment>
        )
    }
}

Branch.propTypes = {
    isAuth: PropTypes.bool
};

export default Branch
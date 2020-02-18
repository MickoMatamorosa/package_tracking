import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { userAuth } from '../../services/authRequest';
import { branchProfile, getBranchStatusFlow } from '../../services/branchRequest';

import Header from '../layout/Header';
import auth from '../../services/auth';
import Packages from './Packages'
import { withAlert } from 'react-alert';

class Branch extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            address: null,
            search: "",
            hasProfile: false,
            hasStatusFlow: false,
        }
    }

    setHasProfile = bool => {
        console.log("Branch => sethasprofile");
        
        this.setState({hasProfile: bool})
    }

    setHasStatusFlow = bool => {
        console.log("Branch => sethasstatusflow");

        this.setState({hasStatusFlow: bool})
    }

    checkUser = () => {
        console.log("Branch => checkuser");

        branchProfile()
        .then(res => {
            console.log("Branch => checkuser.branchprofile.then");
        
            const {name, address} = res
            this.setState({name, address})
            this.setHasProfile(true)
        }).catch(() => this.setHasProfile(false))
    
        getBranchStatusFlow()
        .then(res => {
            console.log("Branch => checkuser.getbranchstatusflow");
        
            if(res.length){
                this.setHasStatusFlow(true)
            }else this.setHasStatusFlow(false)
        })
    }

    componentDidMount(){
        console.log("Branch => componentdidmount");
        
        if(localStorage.getItem('token')){
            userAuth()
                .then(res => {
                    if(res) auth.user = res.id
                    else auth.logout(() => this.props.history.push('/login'))
                })
            
            this.checkUser()
        }
    }

    submitTracking = (search) => {
        if(search.length) this.setState({search})
        else this.props.alert.error("Empty Search Field!!!");
    }
    
    render() {
        const {submitTracking, setHasStatusFlow,
            setHasProfile, props} = this
        const {search, hasProfile, hasStatusFlow} = this.state

        return (
            <Fragment>
                <Header {...props}
                    {...{submitTracking, setHasStatusFlow, setHasProfile}}/>
                <Packages {...props}
                    {...{search, hasProfile, hasStatusFlow}}/>
            </Fragment>
        )
    }
}

Branch.propTypes = {
    isAuth: PropTypes.bool
};

export default withAlert()(Branch)
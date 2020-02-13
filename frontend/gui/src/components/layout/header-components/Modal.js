import React, { useState, useEffect, Fragment} from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from '../../styles/Header.style';

import Profile from '../../branch/Profile';
import StatusFlow from '../../branch/StatusFlow';

import auth from '../../../services/auth';
import { userAuth } from '../../../services/authRequest';
import { branchProfile, getBranchStatusFlow } from '../../../services/branchRequest';

export default props => {
    const classes = useStyles()
    const [firstLogin, setFirstLogin] = useState(false);
    const [hasProfile, setHasProfile] = useState(true)

    // require user branch has status flow
    const checkStatusFlow = () => {
        getBranchStatusFlow()
        .then(res => {
            if(!Boolean(res.length)){
                props.handleOpen('status-flow')
                setFirstLogin(true)
            }else return true
        })
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            userAuth().then(res => {
                auth.login(() => props.history.push('/branch'))}
            ).catch(() => auth.logout(() => {}))

            branchProfile().then(res => {
                if(!res.name) {
                    setHasProfile(false)
                    props.handleOpen('profile');
                    setFirstLogin(true);
                } else checkStatusFlow();
            }).catch(err => console.log("MODAL", err))
        }
    }, [props.open])

    const handleClose = () => {
        // check if has status flow
        if(!hasProfile){

        }else if(!checkStatusFlow()){
            props.handleMenuClose();
            props.setOpen(false);
            setFirstLogin(false)
        }
    }
    
    return (<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.open || firstLogin}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        {   props.modal === 'profile'
        ?   <div className={classes.paper}>
                <h2 id="spring-modal-title">Profile</h2>
                <div id="spring-modal-description">
                    <Profile {...{handleClose, setFirstLogin, setHasProfile}} />
                </div>
            </div>
        :   props.modal === 'status-flow'
        ?   <div className={classes.paper}>
                <h2 id="spring-modal-title">Status Flow</h2>
                <div id="spring-modal-description">
                    <StatusFlow {...{handleClose, setFirstLogin}} />
                </div>
            </div>
        :   <Fragment />
        }
    </Modal>)
}

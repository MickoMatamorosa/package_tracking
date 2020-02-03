import React, { useState, useEffect, Fragment} from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from '../Header.style';

import Profile from '../../branch/Profile';
import StatusFlow from '../../branch/StatusFlow';

import auth from '../../../services/auth';
import { userAuth } from '../../../services/authRequest';
import { branchProfile } from '../../../services/branchRequest';

export default props => {
    const classes = useStyles()
    const [firstLogin, setFirstLogin] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('token')){
            userAuth().then(res => {
                auth.login(() => props.history.push('/branch'))}
            ).catch(err => auth.logout(() => {}))

            branchProfile().then(res => {
                if(!res.name) {
                    props.handleOpen('profile')
                    setFirstLogin(true)
                }
            })
        }
    }, [])

    const handleClose = () => {
        props.handleMenuClose();
        props.setOpen(false);
        if(!firstLogin) props.setModal(false)
    }
    
    return (<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.open || firstLogin}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}
    >
        {   props.modal === 'profile'
        ?   <div className={classes.paper}>
                <h2 id="spring-modal-title">Profile</h2>
                <div id="spring-modal-description">
                    <Profile {...{handleClose, setFirstLogin}} />
                </div>
            </div>
        :   props.modal === 'status-flow'
        ?   <div className={classes.paper}>
                <h2 id="spring-modal-title">Status Flow</h2>
                <div id="spring-modal-description">
                    <StatusFlow {...{handleClose}} />
                </div>
            </div>
        :   <Fragment />
        }
    </Modal>)
}

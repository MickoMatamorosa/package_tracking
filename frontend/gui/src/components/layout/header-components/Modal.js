import React, { useEffect } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from '../../styles/Header.style';

import Profile from '../../branch/Profile';
import StatusFlow from '../../branch/StatusFlow';

import auth from '../../../services/auth';
import { userAuth } from '../../../services/authRequest';


export default props => {
    const classes = useStyles();

    useEffect(() => {
        if(localStorage.getItem('token')){
            userAuth().then(() => {
                auth.login(() => props.history.push('/branch'))
            }).catch(() => auth.logout(() => {}));
        }else auth.logout(() => {})
    }, [props.history])

    const handleClose = () => {
        props.handleMenuClose();
        props.setOpen(false);
    }
    
    return (<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        {   props.modal === 'profile'
          ? <div className={classes.paper}>
                <h2 id="spring-modal-title">Profile</h2>
                <div id="spring-modal-description">
                    <Profile {...props} {...{handleClose}} />
                </div>
            </div>
          :(props.modal === 'status-flow' &&
            <div className={classes.paper}>
                <h2 id="spring-modal-title">Status Flow</h2>
                <div id="spring-modal-description">
                    <StatusFlow {...props} {...{handleClose}} />
                </div>
            </div>)
        }
    </Modal>)
}

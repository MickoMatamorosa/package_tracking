import React, { useEffect } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import useStyles from '../../styles/Header.style';

import Profile from '../../branch/Profile';
import StatusFlow from '../../branch/StatusFlow';
import ChangePass from '../../branch/ChangePass';

import auth from '../../../services/auth';
import { userAuth } from '../../../services/authRequest';

const ModalWrapper = props => {
    const classes = useStyles();
    const Component = props.component;
    console.log(props.title);
    
    
    return (<div className={classes.paper}>
        <h2 id="spring-modal-title">{ props.title }</h2>
        <div id="spring-modal-description">
            <Component {...props}/>
        </div>
    </div>)
}

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
          ? <ModalWrapper {...props} {...{
              handleClose, title: "Profile",
              component: Profile }}/>
          : props.modal === 'status-flow'
            ? <ModalWrapper {...props} {...{
                handleClose, title: "Transaction Status Flow",
                component: StatusFlow
            }}/>
            : (props.modal === 'change-pass' && 
              <ModalWrapper {...props} {...{
                handleClose, title: "Change Password",
                component: ChangePass }}/>)
        }
    </Modal>)
}

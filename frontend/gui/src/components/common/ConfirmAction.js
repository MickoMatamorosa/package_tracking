import React, { useState, useEffect } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';

import { modalStyle } from '../styles/Styler';


export default props => {
    const classes = modalStyle();
    
    useEffect(() => {
        
    }, [props.confirmDelete]);

    return (<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={Boolean(props.confirmDelete)}
        onClose={() => props.setConfirmDelete(null)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <div className={classes.paper}>
            <h2 id="spring-modal-title">{props.confirmDelete}</h2>
            <div id="spring-modal-description">
                Are you sure you want to {props.text} {props.confirmDelete}?
            </div>
            <div>
                <Button onClick={props.deleteFn}>OK</Button>
                <Button onClick={() => props.setConfirmDelete(null)}>CANCEL</Button>
            </div>
        </div>
    </Modal>)
}

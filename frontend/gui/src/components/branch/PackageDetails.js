import React, { useState, useEffect, Fragment} from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { modalStyle } from './Styler';

export default props => {
    const classes = modalStyle();
    const [packageStatus, setPackageStatus] = useState([])

    useEffect(() => {
        
    }, [])
    
    return (<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.pack.tracking_number}
        onClose={props.closeView}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <div className={classes.paper}>
            <h2 id="spring-modal-title">{props.pack.tracking_number}</h2>
            <div id="spring-modal-description">
                <div>{props.pack.client_fullname}</div>
                <div>{props.pack.client_address}</div>
                <div>{props.pack.to_branch}</div>
                <div></div>
            </div>
        </div>
    </Modal>)
}

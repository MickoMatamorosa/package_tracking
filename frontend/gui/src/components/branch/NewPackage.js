import React, { useState, useEffect, Fragment} from 'react';

import {
    TextField, Backdrop, Modal, InputLabel,
    MenuItem, Select, Button, Grid,
} from '@material-ui/core';

import { modalStyle } from './Styler';
import { getOtherBranchPackages } from '../../services/branchRequest'
import { addPackage } from '../../services/packageRequest'

export default props => {
    const classes = modalStyle();
    const [toBranch, setToBranch] = useState([]);
    const [client_fullname, setFullname] = useState("");
    const [client_address, setAddress] = useState("");
    const [to_branch, setSelectedBranch] = useState('');
    
    useEffect(() => {
        getOtherBranchPackages()
        .then(res => setToBranch(res))
    }, [])

    const handleChange = event => {
        setSelectedBranch(event.target.value);
    };

    const add = () => {
        addPackage({ client_fullname, client_address, to_branch })
        .then(res => {
            props.setOpenNew(false);
            props.freshData();
            setFullname("");
            setAddress("");
            setSelectedBranch("");
        })
    }
    
    return (<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.openNew}
        onClose={() => props.setOpenNew(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <div className={classes.paper}>
            <h2 id="spring-modal-title">New Package</h2>
            <div id="spring-modal-description">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField required fullWidth
                        id="standard-required"
                        label="Fullname"
                        name={client_fullname}
                        onChange={e => setFullname(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField required fullWidth
                        id="standard-required"
                        label="Address"
                        name={client_address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>To: 
                    <Select style={{width: 250}}
                        id="branch-destination"
                        label="Branch Destination"
                        value={to_branch}
                        onChange={handleChange}>
                        { toBranch.map((branch) =>
                            <MenuItem key={branch.id} value={branch.id}>
                                {branch.name}
                            </MenuItem>
                          )
                        }
                    </Select>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}>
                    <Button fullWidth onClick={add}
                        variant="contained" color="primary">Add</Button>
                </Grid>
            </Grid>
            </div>
        </div>
    </Modal>)
}

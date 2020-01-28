import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { branchProfile, updateUserProfile } from '../../services/branchRequest';
import { Grid } from '@material-ui/core';

export default class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            address: null,
            shrink: true,
            isUserUpdate: false,
            origProfile: null
        }
    }

    componentDidMount(){
        branchProfile()
        .then(res => {
            const { name, address } = res
            const origProfile = { name, address }
            this.setState({ name, address, origProfile })
        }).catch(err => console.log("can't fetch branch profile"))
    }

    handleChange = e => {
        let isUserUpdate = false
        const { origProfile } = this.state
        const newProfile = {
            ...origProfile,
            [e.target.name]: e.target.value
        }

        // check all items is really update
        for(let k in this.state.origProfile){
            if(origProfile[k] !== newProfile[k]){
                isUserUpdate = true
            }
        }

        this.setState({ 
            [e.target.name]: e.target.value,
            shrink: Boolean(e.target.value),
            isUserUpdate
        })
    }

    handleReset = () => {
        const { name, address } = this.state.origProfile;
        this.setState({ name, address });
    }

    save = () => {
        const { name, address } = this.state
        updateUserProfile({ name, address })
        .then(res => this.props.handleClose())
    }

    render() {
        const { shrink, name, address, isUserUpdate } = this.state
        
        return (
            <form autoComplete="off">
                <TextField fullWidth
                    id="standard-required"
                    name="name"
                    label="Branch Name"
                    defaultValue="Set Branch Name"
                    value={name}
                    InputLabelProps={{ shrink }}
                    onChange={this.handleChange}
                />
                <TextField fullWidth
                    id="standard-required"
                    name="address"
                    label="Address"
                    defaultValue="Set Branch Address"
                    value={address}
                    onChange={this.handleChange}
                />
                <Grid container 
                    justify="space-around"
                    style={{"marginTop": 15 }}
                    spacing={1}>
                    <Button onClick={this.save} disabled={!isUserUpdate}
                        variant="contained" color="primary">
                        Save
                    </Button>
                    <Button onClick={this.handleReset} disabled={!isUserUpdate}
                        variant="contained">
                        Reset
                    </Button>
                </Grid>
            </form>
        )
    }
}

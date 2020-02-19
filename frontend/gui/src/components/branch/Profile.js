import React, { Component } from 'react';
import { withAlert } from 'react-alert';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { branchProfile, saveUserProfile } from '../../services/branchRequest';

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: null,
            name: "",
            address: "",
            isValid: true,
            isUserUpdate: false,
            origProfile: null
        }
    }

    componentDidMount(){
        branchProfile()
        .then(res => {
            const { name, address } = res
            const origProfile = { name, address }
            
            this.setState({ name, address, origProfile})
        }).catch(err => {
            console.log("can't fetch branch profile", err)
        })
    }

    handleChange = e => {
        const {name, value} = e.target;
        let isUserUpdate = false;
        const { origProfile } = this.state;
        const newProfile = {
            ...origProfile,
            [name]: value
        }

        // check all items is really update
        for(let k in this.state.origProfile){
            if(origProfile[k] !== newProfile[k]){
                isUserUpdate = true
            }
        }
        
        this.setState({
            [name]: value,
            isValid: Boolean(value),
            isUserUpdate
        })
    }

    handleReset = () => {
        const { name, address } = this.state.origProfile;
        this.setState({name, address, isUserUpdate: false});
    }

    save = () => {
        const { name, address } = this.state;
        saveUserProfile({ name, address })
        .then(() => {
            this.props.setHasProfile(true);
            this.props.handleClose();
            this.props.alert.success("Successfully Saved!")
        })
        .catch(() => this.props.alert.error("Error!"))
    }

    render() {
        const { name, address, isUserUpdate, isValid } = this.state;
        return (
            <form autoComplete="off">
                <TextField fullWidth
                    id="standard-required"
                    name="name"
                    label="Branch Name"
                    value={name}
                    InputLabelProps={{ shrink: Boolean(name) }}
                    onChange={this.handleChange}
                />
                <TextField fullWidth
                    id="standard-required"
                    name="address"
                    label="Address"
                    value={address}
                    InputLabelProps={{ shrink: Boolean(address) }}
                    onChange={this.handleChange}
                />
                <Grid container 
                    justify="space-around"
                    style={{"marginTop": 15 }}
                    spacing={1}>
                    <Button onClick={this.save} 
                        disabled={!isUserUpdate || !isValid}
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

export default withAlert()(Profile)
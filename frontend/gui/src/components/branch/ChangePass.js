import React, { Component } from 'react';
import { withAlert } from 'react-alert';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { changePass } from '../../services/authRequest';

class ChangePass extends Component {

    constructor(props){
        super(props);

        this.state = {
            old_password: "",
            new_password: "",
            confirm: "",
        }
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    handleReset = () => {
        this.setState({ 
            old_password: "",
            new_password: "",
            confirm: "",
        });
    }

    save = () => {
        if(this.state.new_password === this.state.confirm){
            changePass(this.state)
            .then(res => {
                console.log("save success", res);
                this.props.alert.success("Successfully Changed!");
                this.props.handleClose();
            })
            .catch(err => {
                console.log("save error", err);
                this.props.alert.error("Incorrect Password");
            })
        }else this.props.alert.error("Password mismatched!");

        this.handleReset();
    }

    render() {
        const { old_password, new_password, confirm } = this.state;
        return (
            <form autoComplete="off">
                <TextField fullWidth
                    type="password"
                    id="standard-required"
                    name="old_password"
                    label="Old Password"
                    value={old_password}
                    InputLabelProps={{ shrink: Boolean(old_password) }}
                    onChange={this.handleChange}
                />
                <TextField fullWidth
                    type="password"
                    id="standard-required"
                    name="new_password"
                    label="New Password"
                    value={new_password}
                    InputLabelProps={{ shrink: Boolean(new_password) }}
                    onChange={this.handleChange}
                />
                <TextField fullWidth
                    type="password"
                    id="standard-required"
                    name="confirm"
                    label="Confirm New Password"
                    value={confirm}
                    InputLabelProps={{ shrink: Boolean(confirm) }}
                    onChange={this.handleChange}
                />
                <Grid container spacing={1}
                    justify="space-around"
                    style={{"marginTop": 15 }}>
                    <Button color="primary"
                        onClick={this.save} 
                        variant="contained">
                        Save</Button>
                    <Button
                        onClick={this.handleReset}
                        variant="contained">
                        Reset</Button>
                </Grid>
            </form>
        )
    }
}

export default withAlert()(ChangePass)
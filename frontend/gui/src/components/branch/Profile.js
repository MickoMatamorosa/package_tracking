import React, { Component, Fragment } from 'react';

import TextField from '@material-ui/core/TextField'

import { branchProfile } from '../../services/branchRequest';

export default class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: null,
            address: null,
            shrink: true,
        }
    }

    componentDidMount(){
        branchProfile()
        .then(res => {
            const { name, address } = res
            this.setState({ name, address })
        }).catch(err => console.log("can't fetch branch profile"))
    }

    handleChange = e => this.setState({ 
        [e.target.name]: e.target.value,
        shrink: Boolean(e.target.value)
    })

    render() {
        console.log(this.state);
        const { shrink, name, address } = this.state
        
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
            </form>
        )
    }
}

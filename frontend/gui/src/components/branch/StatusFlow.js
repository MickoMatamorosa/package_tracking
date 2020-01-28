import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import { branchStatusFlow } from '../../services/branchRequest';
import { Grid } from '@material-ui/core';

export default class StatusFlow extends Component {
    constructor(props){
        super(props);

        this.state = {
            isEmpty: true,
            shrink: true,
            statusFlow: [],
        }
    }

    componentDidMount(){
        branchStatusFlow()
        .then(res => {
            this.setState({ statusFlow: res })
        }).catch(err => console.log("can't fetch branch profile"))
    }

    handleChange = e => {
        // let isUserUpdate = false
        // const { origProfile } = this.state
        // const newProfile = {
        //     ...origProfile,
        //     [e.target.name]: e.target.value
        // }

        // // check all items is really update
        // for(let k in this.state.origProfile){
        //     if(origProfile[k] !== newProfile[k]){
        //         isUserUpdate = true
        //     }
        // }

        // this.setState({ 
        //     [e.target.name]: e.target.value,
        //     shrink: Boolean(e.target.value),
        //     isUserUpdate
        // })
    }

    handleReset = () => {
        // const { name, address } = this.state.origProfile;
        // this.setState({ name, address });
    }

    add = () => {
        // const { name, address } = this.state
        // updateUserProfile({ name, address })
        // .then(res => this.props.handleClose())
    }

    render() {
        const { isEmpty, shrink } = this.state
        
        return (
            <form autoComplete="off" style={{"width": 300}}>
                <Grid container xs={12}>
                    <Grid item xs={12}>
                        <Grid container justify="space-between"  spacing={2}>
                        <Grid item xs={3}>
                            <InputLabel ref={inputLabel}>Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={age}
                                onChange={handleChange}
                                labelWidth={labelWidth}
                            >
                                <MenuItem value=""><em>Last</em></MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth
                                id="standard-required"
                                name="address"
                                label="Address"
                                defaultValue="Set Branch Address"
                                // value={address}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="standard-required"
                                name="remarks"
                                label="Description:"
                                // value={address}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container 
                            justify="space-around"
                            style={{"marginTop": 15 }}
                            spacing={1}>
                            <Button onClick={this.add} disabled={isEmpty}
                                variant="contained" color="primary">
                                Add
                            </Button>
                            <Button onClick={this.handleReset} disabled={isEmpty}
                                variant="contained">
                                Reset
                            </Button>
                        </Grid>
                    </Grid>                    
                </Grid>                
            </form>
        )
    }
}

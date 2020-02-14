import React, { useState, Fragment } from 'react';

import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import Save from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';

import { addBranchStatusFlow } from '../../services/branchRequest';
import { StyledTableRow, StyledTableCell } from '../styles/Table.styles'
import { useStyles } from '../styles/Styler'

export default ({queue, refreshTableData}) => {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [state, setState] = useState({
        queue: '',
        branch_type: 'sending',
        description: ''
    })

    const cancelAddNew = () => {
        setAddMode(false)
        setState({...state, description: ''})
    }

    const handleSave = e => {
        e.preventDefault()
        if(state.description === "") setError(true)
        else {
            let data = state
            if(state.queue === ""){
                data = { 
                    branch_type: state.branch_type,
                    description: state.description,
                }
            }
            addBranchStatusFlow(data)
            .then(res => {
                console.log("new data added", data)
                refreshTableData();
                cancelAddNew()
            })
            .catch(err => console.log("error data", err))
        }     
        
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState({...state, [name]: value});
    }
    
    const last = queue[state.branch_type][queue.length - 1] + 1;

    return (
        <StyledTableRow>
            <StyledTableCell className={classes.queue} align="center">
                { addMode && <NativeSelect size="small"
                    onChange={handleChange}
                    name="queue"
                    className={classes.selectEmpty}
                    defaultValue={last}
                    inputProps={{ 'aria-label': 'age' }}>
                    { queue[state.branch_type].map(q => (<option key={q} value={q}>{q}</option>)) }
                    <option value={last}>Last</option>
                  </NativeSelect>
                }
            </StyledTableCell>
            <StyledTableCell className={classes.type} align="center">
                { addMode && <NativeSelect size="small"
                    onChange={handleChange}
                    name="branch_type"
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'age' }}>
                    <option value="sending">Sending</option>
                    <option value="receiving">Receiving</option>
                  </NativeSelect>
                }
            </StyledTableCell>
            <StyledTableCell align="left">
                { addMode && <TextField fullWidth required
                    size="small" label="Description"
                    id="standard-full-width"
                    placeholder="Description"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    error={error}/>
                }
            </StyledTableCell>
            <StyledTableCell className={classes.actions} align="center">
                { !addMode
                  ? <Fab size="small" color="primary" variant="extended"
                        onClick={() => setAddMode(true)}><Add /> New</Fab>
                  : <Fragment>
                        <IconButton onClick={handleSave}><Save /></IconButton>
                        <IconButton onClick={cancelAddNew}><Close /></IconButton>
                    </Fragment>
                }
            </StyledTableCell>
        </StyledTableRow>
    );
}
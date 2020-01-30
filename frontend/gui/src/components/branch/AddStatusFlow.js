import React, { useState, useEffect, Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import NativeSelect from '@material-ui/core/NativeSelect';
import Add from '@material-ui/icons/Add';
import { useStyles, StyledTableRow, StyledTableCell } from './Styler'

const optionFn = q => (<option key={q} value={q}>{q}</option>)

export default ({queue, refreshTableData}) => {
    const classes = useStyles();
    const [state, setState] = useState({})

    const handleSave = () => {
        console.log("new data added");
        refreshTableData()
    }

    const handleChange = e => {

    }

    return (
        <StyledTableRow>
            <StyledTableCell className={classes.queue} align="center">
                <NativeSelect size="small"
                    value={state.queue}
                    onChange={handleChange('queue')}
                    name="queue"
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'age' }}>
                { queue.map(q => optionFn(q)) }
                { optionFn(queue.length + 1) }
                </NativeSelect>
            </StyledTableCell>
            <StyledTableCell className={classes.type} align="center">
                <NativeSelect size="small"
                    value={state.branch_type}
                    onChange={handleChange('branch_type')}
                    name="branch_type"
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'age' }}>
                    <option value="sending">Sending</option>
                    <option value="receiving">Receiving</option>
                </NativeSelect>
            </StyledTableCell>
            <StyledTableCell align="left">
                <TextField fullWidth required
                    size="small" label="Description"
                    id="standard-full-width"
                    placeholder="Description"
                    name="description"
                    value={state.description}
                />
            </StyledTableCell>
            <StyledTableCell className={classes.actions} align="center">
                <IconButton onClick={() => handleSave()}><Add /></IconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
}
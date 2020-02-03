import React, { useState, useEffect, Fragment } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';

import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/DeleteOutline';
import Save from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';

import { getBranchStatusFlow, updateStatusFlow, deleteStatusFlow } from '../../services/branchRequest';
import { useStyles, StyledTableRow, StyledTableCell } from './Styler'

import AddStatusFlow from './AddStatusFlow'

const TblActions = ({row, handleDelete, setEditMode}) => {
    return (<Fragment>
        <IconButton onClick={ () => setEditMode(row) }>
            <Edit /></IconButton>
        <IconButton onClick={ () => handleDelete(row.id) }>
            <Delete /></IconButton>
    </Fragment>)
}

export default () => {
    const classes = useStyles();
    const [tableData, setTableData] = useState([]);
    const [queue, setQueue] = useState({
        sending: [], receiving: []
    })
    const [editMode, setEditMode] = useState(null)
    const [error, setError] = useState(false)

    const statusFlow = () => {        
        getBranchStatusFlow()
            .then(res => {
                const queue = res.reduce(((acc, obj) => {
                    console.log(acc);
                    console.log(obj);
                    acc[obj.branch_type].push(obj.queue)
                    return acc
                }), { sending: [], receiving: [] })
                setTableData(res)
                setQueue(queue)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        statusFlow()
    }, [])

    const handleSave = () => {
        if(editMode.description){
            updateStatusFlow(editMode)
            .then(res => {
                setEditMode(null)
                statusFlow()
            })
            .catch(err => console.log(err, "update failed!"))
        }else setError(true)
    }

    const handleDelete = id => {
        deleteStatusFlow(id)
            .then(res => statusFlow())
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setEditMode({...editMode, [name]: value});
    }

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell className={classes.queue} align="center">
                    Queue</StyledTableCell>
                <StyledTableCell className={classes.type} align="center">
                    Type</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell className={classes.actions} align="center">
                    Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map(row => (
                <StyledTableRow key={row.id}>
                <StyledTableCell className={classes.queue} align="center">
                    { !editMode
                    ? row.queue
                    : editMode.id !== row.id
                      ? row.queue
                      : <NativeSelect size="small" name="queue"
                          className={classes.selectEmpty}
                          onChange={handleChange}
                          value={editMode.queue}
                          inputProps={{ 'aria-label': 'age' }}>
                          { queue[editMode.branch_type].map(q => 
                              <option key={q} value={q}>{q}</option>
                          )}
                        </NativeSelect>
                    }
                </StyledTableCell>
                <StyledTableCell className={classes.type} align="center">
                    { !editMode
                    ? row.branch_type
                    : editMode.id !== row.id
                      ? row.branch_type
                      : <NativeSelect size="small" name="branch_type"
                          className={classes.selectEmpty}
                          onChange={handleChange}
                          value={editMode.branch_type}
                          inputProps={{ 'aria-label': 'age' }}>
                          <option value="sending">Sending</option>
                          <option value="receiving">Receiving</option>
                        </NativeSelect>
                    }
                </StyledTableCell>
                <StyledTableCell align="left">
                    { !editMode
                    ? row.description
                    : editMode.id !== row.id
                      ? row.description
                      : <TextField fullWidth required
                          size="small" label="Description"
                          id="standard-full-width"
                          placeholder="Description"
                          name="description"
                          value={editMode.description}
                          onChange={handleChange}
                          error={error}/>
                    }
                </StyledTableCell>
                <StyledTableCell className={classes.actions} align="center">
                    { !editMode
                    ? <TblActions {...{row, handleSave, setEditMode}} />
                    : editMode.id !== row.id
                      ? <TblActions {...{row, handleSave, setEditMode}} />
                      : <Fragment>
                            <IconButton onClick={ () => handleSave(row) }>
                                <Save /></IconButton>
                            <IconButton onClick={ () => setEditMode(null) }>
                                <Close /></IconButton>
                        </Fragment>
                    }
                </StyledTableCell>
                </StyledTableRow>
            ))}
            {  !editMode && <AddStatusFlow 
                    refreshTableData={statusFlow}
                    queue={queue}
                />
            }
            </TableBody>
        </Table>
        </TableContainer>
    );
}
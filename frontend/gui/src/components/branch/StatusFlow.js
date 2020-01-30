import React, { useState, useEffect, Fragment } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/DeleteOutline';
import Save from '@material-ui/icons/Save';
import Close from '@material-ui/icons/Close';

import { getBranchStatusFlow, deleteStatusFlow } from '../../services/branchRequest';
import { useStyles, StyledTableRow, StyledTableCell } from './Styler'

import AddStatusFlow from './AddStatusFlow'

export default function CustomizedTables() {
    const classes = useStyles();
    const [tableData, setTableData] = useState([]);
    const [queue, setQueue] = useState([1])
    const [editMode, setEditMode] = useState(null)

    const statusFlow = () => {
        getBranchStatusFlow()
            .then(res => {
                const queue = res.map(obj=>obj.queue)
                setTableData(res)
                setQueue(queue)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        statusFlow()
    }, [])

    const handleSave = id => {
        console.log(id, "updated");
    }

    const handleDelete = id => {
        deleteStatusFlow(id)
            .then(res => statusFlow())
            .catch(err => console.log(err))
    }

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
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
                <StyledTableRow key={row.queue}>
                <StyledTableCell className={classes.queue} align="center">
                    {row.queue}</StyledTableCell>
                <StyledTableCell className={classes.type} align="center">
                    {row.branch_type}</StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell className={classes.actions} align="center">
                    {   editMode
                    ?   <Fragment>
                            <IconButton onClick={ () => handleSave(row) }>
                                <Save /></IconButton>
                            <IconButton onClick={ () => setEditMode(null) }>
                                <Close /></IconButton>
                        </Fragment>
                    :   <Fragment>
                            <IconButton onClick={ () => setEditMode(row) }>
                                <Edit /></IconButton>
                            <IconButton onClick={ () => handleDelete(row.id) }>
                                <Delete /></IconButton>
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
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './layout/Header';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import { StyledTableRow, StyledTableCell } from './styles/Table.styles'
import { modalStyle } from './styles/Styler';

import { getGuestPackageStatus, getGuestPackageStatusRemarks } from '../services/guestRequest'


function Main(props){
    const classes = modalStyle();
    const [packageStat, setPackageStat] = useState(false);
    const [statFlow, setStatFlow] = useState(false);

    const submitTracking = trace => {
        setStatFlow(false)
        setPackageStat(false)
        if(trace){
            getGuestPackageStatusRemarks(trace)
            .then(res => {
                getGuestPackageStatus(trace)
                .then(result => {
                    setStatFlow(res);
                    setPackageStat(result);
                })
            })
        }
    }

    return (<Fragment>
        <Header {...props} {...{submitTracking}}/>
        {/* <h1>Boom Fast on deliveries but not the package.</h1> */}
        { !packageStat
        ? <h2 style={{textIndent: 20}}>Please view your package status using the tracking number of it.</h2>
        : (<TableContainer component={Paper} style={{width: 800, margin: '50px auto'}}>
        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
            <StyledTableRow>
                <StyledTableCell align="center">Datatime Last Update</StyledTableCell>
                <StyledTableCell/>
                <StyledTableCell>Transactions Status</StyledTableCell>
            </StyledTableRow>
            </TableHead>
            <TableBody>
                {   statFlow && packageStat && packageStat.map(row => {
                        const description = statFlow.filter(sf => sf.id === row.status)
                        return (<StyledTableRow key={row.id}>
                            <StyledTableCell align="center">{row.timestamp}</StyledTableCell>
                            <StyledTableCell><CheckSharpIcon color="primary"/></StyledTableCell>
                            <StyledTableCell>{description[0].description}</StyledTableCell>
                        </StyledTableRow>)
                    })
                }
            </TableBody>
        </Table>
        </TableContainer>)
        }
    </Fragment>)
}

Main.propTypes = {
    isAuth: PropTypes.bool
};

export default Main
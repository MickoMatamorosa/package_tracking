import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './layout/Header';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

import { StyledTableRow, StyledTableCell } from './styles/Table.styles'
import { modalStyle } from './styles/Styler';

import { getGuestPackage } from '../services/guestRequest'


function Main(props){
    const classes = modalStyle();
    const [packageStat, setPackageStat] = useState(false);

    const submitTracking = trace => {

        // const arr1 = [1, 2, 3];
        // const arr2 = [1, 2];

        // const diff = arr1.filter(a1 => !Boolean(arr2.filter(a2 => a1==a2).length))
        // console.log("diff", diff)

        getGuestPackage("188645272342500")
        .then(res => setPackageStat(res))
    }

    if(packageStat){
        console.log(packageStat);
        console.log(packageStat.stats[0]);
        console.log(packageStat.stats[0].flow);
    }
    
    

    return (
        <Fragment>
            <Header {...props} {...{submitTracking}}/>
            <h1>Boom Fast on deliveries but not the package.</h1>
            { !packageStat
            ? "Please view your package status using the tracking number of it."
            : (<TableContainer>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHead>
                <StyledTableRow>
                    <StyledTableCell align="center">Datatime Last Update</StyledTableCell>
                    <StyledTableCell/>
                    <StyledTableCell>Transactions Status</StyledTableCell>
                </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell align="center">timestamp
                            {/* { timestamp ? timestamp : "---" } */}
                        </StyledTableCell>
                        <StyledTableCell>icon
                            {/* { timestamp
                            ? <CheckSharpIcon color="primary"/>
                            : <LocalShippingIcon color="secondary"/>
                            }                                     */}
                        </StyledTableCell>
                        <StyledTableCell>description</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
            </TableContainer>)
            }
        </Fragment>
    )
}

Main.propTypes = {
    isAuth: PropTypes.bool
};

export default Main
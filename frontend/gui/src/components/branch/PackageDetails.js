import React, { useState, useEffect } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { modalStyle } from '../styles/Styler';

import { StyledTableRow, StyledTableCell } from '../styles/Table.styles'

import { getBranchStatusFlowByType } from '../../services/branchRequest';
import { getPackageStatus } from '../../services/packageRequest';
import auth from '../../services/auth';

export default props => {
    const classes = modalStyle();
    const [packageStatus, setPackageStatus] = useState([]);
    const [sendStat, setSendStat] = useState([])
    const [receiveStat, setReceiveStat] = useState([])
    const [userType, setUserType] = useState('');

    useEffect(() => {
        if(props.pack.tracking_number){
            const { from_branch, to_branch } = props.pack

            if(auth.user===from_branch) setUserType("sending")
            if(auth.user===to_branch) setUserType("receiving")

            getBranchStatusFlowByType(from_branch, "sending")
            .then(res => setSendStat(res))

            getBranchStatusFlowByType(to_branch, "receiving")
            .then(res => setReceiveStat(res))

            if(props.pack.id){
                getPackageStatus(props.pack.id)
                .then(res => setPackageStatus(res))
            }
        }
    }, [props.pack.tracking_number]);  
    

    return (<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={Boolean(props.pack.tracking_number)}
        onClose={props.closeView}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}>
        <div className={classes.paper}>
            <h2 id="spring-modal-title">{props.pack.tracking_number}</h2>
            <h3>{ auth.user===props.pack.from_branch
                  ? "Sending to "
                  : "Receiving from "
                }{props.pack.branch_name}
            </h3>
            <div id="spring-modal-description">
                <div>{props.pack.client_fullname}</div>
                <div>{props.pack.client_address}</div>
                <h4>Status:</h4>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">Datatime Last Update</StyledTableCell>
                        <StyledTableCell>Transactions Status</StyledTableCell>
                        <StyledTableCell/>
                        <StyledTableCell/>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>{
                        [...receiveStat, ...sendStat].map(stat => {
                            let timestamp = false;
                            let status = false;
                            
                            const packStat = packageStatus.filter(pack => 
                                pack.package === props.pack.id &&
                                pack.status === stat.id);                            

                            if(Boolean(packStat.length)){
                                timestamp = packStat[0].timestamp
                                status = packStat[0].remarks === "done"
                            }

                            return (<StyledTableRow key={stat.id} hover>
                                <StyledTableCell align="center">
                                    { timestamp ? timestamp : "---" }
                                </StyledTableCell>
                                <StyledTableCell>{stat.description}</StyledTableCell>
                                <StyledTableCell>
                                    { timestamp
                                    ? <CheckSharpIcon color="primary"/>
                                    : <LocalShippingIcon color="secondary"/>
                                    }                                    
                                </StyledTableCell>
                                <StyledTableCell/>
                            </StyledTableRow>)
                        })
                    }</TableBody>
                </Table>
            </div>
        </div>
    </Modal>)
}

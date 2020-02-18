import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Tooltip from '@material-ui/core/Tooltip';

import CheckSharpIcon from '@material-ui/icons/CheckSharp';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { modalStyle } from '../styles/Styler';
import { StyledTableRow, StyledTableCell } from '../styles/Table.styles'

import { getBranchStatusFlowByType } from '../../services/branchRequest';
import { getPackageStatus, doneStatus, previousStatus } from '../../services/packageRequest';
import auth from '../../services/auth';


export default props => {
    const classes = modalStyle();
    const alert = useAlert()
    const [packageStatus, setPackageStatus] = useState([]);
    const [sendStat, setSendStat] = useState([]);
    const [receiveStat, setReceiveStat] = useState([]);
    const [userType, setUserType] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeStat, setActiveStat] = useState(null);

    const getPackageStatusFlow = () => {
        const { from_branch, to_branch } = props.pack

        getBranchStatusFlowByType(from_branch, "sending")
        .then(res => setSendStat(res))

        getBranchStatusFlowByType(to_branch, "receiving")
        .then(res => setReceiveStat(res))

        if(props.pack.id){
            getPackageStatus(props.pack.id)
            .then(res => setPackageStatus(res))
        }
    }
    
    const handleClose = () => {
        setAnchorEl(null);
        props.freshData();
    };

    useEffect(() => {
        if(props.active || props.editMode) props.closeView()

        if(props.pack.tracking_number){
            const { from_branch } = props.pack
            
            if(auth.user===from_branch) setUserType("sending")
            else setUserType("receiving")

            getPackageStatusFlow()
        }
    }, [props.pack.tracking_number, props.active, props.editMode]);

    const done = () => {
        doneStatus(props.pack.id, activeStat)
        .then(res => {
            getPackageStatusFlow();
            setAnchorEl(null);
            props.freshData();
        });
    }

    const undo = () => {
        previousStatus(props.pack.id, activeStat)
        .then(() => {
            getPackageStatusFlow();
            setAnchorEl(null);
        })
        .catch(() => alert.error("Can't undo first transaction status!"));
    }
    
    const handleClick = (event, stat) => {
        setAnchorEl(event.currentTarget);
        setActiveStat(stat);
    };
    
    const open = Boolean(anchorEl);
    const id = open ? 'popover-actions' : undefined;
    const positions = {vertical: 'center', horizontal: 'center',}

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
            <h3>{ auth.user === props.pack.from_branch
                  ? `Sending to ${props.pack.branch_name.receiver}`
                  : `Receiving from ${props.pack.branch_name.sender}`
                }
            </h3>
            <div id="spring-modal-description">
                <div>{props.pack.client_fullname}</div>
                <div>{props.pack.client_address}</div>
                <h4>Status:</h4>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">Data Last Update</StyledTableCell>
                        <StyledTableCell>Transactions Status</StyledTableCell>
                        <StyledTableCell/>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>{
                        receiveStat && sendStat && [...receiveStat, ...sendStat].map(stat => {
                            let timestamp = false;
                            
                            const packStat = packageStatus.filter(pack => 
                                pack.package === props.pack.id &&
                                pack.status === stat.id);
                            
                            if(Boolean(packStat.length)){
                                timestamp = packStat[0].timestamp
                            }

                            return (<StyledTableRow key={stat.id}>
                                <StyledTableCell align="center">
                                    { timestamp ? timestamp : "---" }
                                </StyledTableCell>
                                <StyledTableCell>{stat.description}</StyledTableCell>
                                <StyledTableCell align="center">
                                { timestamp
                                  ? packStat[0].remarks === "done"
                                    ? <CheckSharpIcon color="primary"/>
                                    : userType !== stat.branch_type
                                      ? <LocalShippingIcon color="primary"/>
                                      : <IconButton aria-describedby={id}
                                          disabled={props.pack.cancel}
                                          onClick={e => handleClick(e, packStat[0].id)}>
                                          <LocalShippingIcon color="primary"/>
                                        </IconButton>
                                  : "---"
                                }
                                </StyledTableCell>
                            </StyledTableRow>)
                        })
                    }</TableBody>
                </Table>
                <Popover id={id}
                    open={Boolean(open)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={positions}
                    transformOrigin={positions}>
                    <Tooltip title="Done" placement="top-start">
                        <IconButton onClick={done}>
                        <CheckSharpIcon color="primary"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Undo" placement="top-start">
                        <IconButton onClick={undo}>
                        <ArrowBackIcon color="secondary"/>
                        </IconButton>
                    </Tooltip>
                </Popover>
            </div>
        </div>
    </Modal>)
}

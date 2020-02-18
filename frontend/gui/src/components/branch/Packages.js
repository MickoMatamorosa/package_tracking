import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useAlert } from 'react-alert';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import DataTable from './DataTable';
import { useStyles } from '../styles/Styler';
import { getBranchPackages} from '../../services/branchRequest';

import noRecordFound from '../../images/no-record-found.gif';

const options = ['All', 'Sending', 'Receiving', 'Completed', 'Cancelled'];

export default props => {
  const classes = useStyles();
  const alert = useAlert();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [openNew, setOpenNew] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const freshData = () => {
    let params = { completed: false, cancel: false }
    switch(selectedIndex){
      case 1: params.from_branch = true; break;
      case 2: params.to_branch = true; break;
      case 3: params.completed = true; break;
      case 4: params.cancel = true; break;
    }
    
    getBranchPackages(params)
    .then(res => {
      if(typeof res === "object"){
        setData(res);
        setSearch(props.search);
      }
    }).catch(() => {})
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => setOpen(prevOpen => !prevOpen);

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  useEffect(() => {
    if(search !== props.search){
      if(props.search){
        if(props.search.match(/^\d+$/)){
          getBranchPackages({tracking_number: props.search})
          .then(res => {
            if(res.length) setData(res);
            else alert.error("Tracking Number Not Found!!!");
          })
        } else alert.error("Invalid Tracking Number!!!");
      }
    } else freshData();
  }, [props.search, props.hasProfile, props.hasStatusFlow, selectedIndex]);

  const handleNewPackage = () => {
    if(!props.hasProfile) alert.error("Profile is Required!");
    if(!props.hasStatusFlow) alert.error("Status FLow is Required!");
    if(props.hasProfile && props.hasStatusFlow) setOpenNew(true);
  }

  return (<Fragment>
    <div className={classes.addWrapper}>
      <Grid container direction="column" alignItems="flex-start">
        <Grid item xs={12}>
          <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
            <Button onClick={freshData}>{options[selectedIndex]}</Button>
            <Button
              color="primary"
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}>
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === selectedIndex}
                          onClick={event => handleMenuItemClick(event, index)}>
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>
      <Fab size="medium"
        color="primary"
        aria-label="add"
        variant="extended"
        className={classes.fab}
        onClick={handleNewPackage}>
        <AddIcon />New Package
      </Fab>
    </div>
    
    { data.length
      ? <DataTable {...props} {...{data, freshData, openNew, setOpenNew}}/>
      : <Grid container justify="center" style={{paddingTop: 100}}>
          <img src={noRecordFound}/></Grid>
    }
  </Fragment>);
}
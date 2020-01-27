import React, { useState, useEffect, Fragment } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { logout, userAuth } from '../../services/authRequest';
import auth from '../../services/auth';

import useStyles from './Header.style';

import Profile from '../branch/Profile'
import StatusFlow from '../branch/StatusFlow'

const Header = props => {
    
    const classes = useStyles();
    const [searchTxt, setSearchTxt] = useState("")


    useEffect(() => {
        if(localStorage.getItem('token')){
            userAuth().then(res => {
                auth.login(() => props.history.push('/branch'))}
            ).catch(err => auth.logout(() => {}))
        }
    }, [])

    const submitTracking = () => {
        console.log(searchTxt)
    }

    const exit = () => {
        setAnchorEl(null);
        logout().then(res => {
            auth.logout(() => props.history.push('/'))
        })
    }

    // Modal
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(false);

    const handleOpen = type => {
        handleMenuClose();
        setOpen(true);
        setModal(type)
    }
    const handleClose = () => {
        handleMenuClose();
        setOpen(false);
        setModal(false)
    }

    const renderModal = (<Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}
    >
        {/* {   modal === 'profile'
        ?   <div className={classes.paper}>
                <h2 id="spring-modal-title">Profile</h2>
                <p id="spring-modal-description">react-spring animates me.</p>
            </div>
        :   modal === 'status-flow'
        ?   <div className={classes.paper}>
                <h2 id="spring-modal-title">Status Flow</h2>
                <p id="spring-modal-description">react-spring animates me.</p>
            </div>
        :   <Fragment />
        } */}
        {   modal === 'profile'
        ?   <div className={classes.paper}>
                <h2 id="spring-modal-title">Profile</h2>
                <div id="spring-modal-description"><Profile /></div>
            </div>
        :   modal === 'status-flow'
        ?   <div className={classes.paper}>
                <h2 id="spring-modal-title">Status Flow</h2>
                <div id="spring-modal-description"><StatusFlow/></div>
            </div>
        :   <Fragment />
        }
    </Modal>)

    // Menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    
    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const menuPosition = { vertical: 'top', horizontal: 'right' }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={menuPosition}
            id={menuId}
            keepMounted
            transformOrigin={menuPosition}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={() => handleOpen('profile')}>Profile</MenuItem>
            <MenuItem onClick={() => handleOpen('status-flow')}>Status Flow</MenuItem>
            <MenuItem onClick={exit}>Logout</MenuItem>
        </Menu>
    );
    

    return (
        <div className={classes.grow}>
        <AppBar position="static">
            <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
                Package Tracking
            </Typography>
            <div className={classes.search}>
                <InputBase
                    placeholder="Search…"
                    autoFocus={true}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e => setSearchTxt(e.target.value)}
                />
            </div>
            <div>
                <IconButton onClick={submitTracking}>
                    <SearchIcon  className={classes.searchIcon}/>
                </IconButton>
            </div>
            <div className={classes.grow} />
            <div>
                {   auth.authenticated
                    ? <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    : <Link href="/login" className={classes.login}>LOGIN</Link>
                }
            </div>
            </Toolbar>
        </AppBar>
        {renderModal}
        {renderMenu}
        </div>
    );
}

export default Header
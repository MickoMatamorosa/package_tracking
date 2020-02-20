import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';
import Reset from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import auth from '../../services/auth';

import useStyles from '../styles/Header.style';

import HeaderModal from './header-components/Modal';
import HeaderMenu from './header-components/Menu';

const Header = props => {

    const classes = useStyles();
    const [searchTxt, setSearchTxt] = useState("")
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [modal, setModal] = useState(false);
    const [open, setOpen] = useState(false);

    const handleProfileMenuOpen = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    const handleOpen = type => {
        handleMenuClose();
        setOpen(true);
        setModal(type)
    }

    const handleChange = e => {
        setSearchTxt(e.target.value)
        if(!e.target.value) {
            props.submitTracking("")
        }
    }

    const cancelSearch = () => {
        setSearchTxt("")
        props.cancelSearch()
    }


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
                    onChange={handleChange}
                    value={searchTxt}
                />
            </div>
            <div>
                {   props.search
                    ? <IconButton onClick={cancelSearch}>
                        <Reset  className={classes.searchIcon}/>
                      </IconButton>
                    : <IconButton onClick={() => props.submitTracking(searchTxt)}>
                        <SearchIcon  className={classes.searchIcon}/>
                      </IconButton>
                }
            </div>
            <div className={classes.grow} />
            <div>
                { auth.authenticated
                  ? <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls="primary-search-account-menu"
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit">
                      <AccountCircle />
                    </IconButton>
                  : <Link href="/login" className={classes.login}>LOGIN</Link>
                }
            </div>
            </Toolbar>
        </AppBar>
        <HeaderModal {...props} {...{
            handleOpen, handleMenuClose,
            open, modal, setOpen, setModal
        }} />
        <HeaderMenu {...props} {...{
            handleOpen, setAnchorEl,
            handleMenuClose, anchorEl
        }} />
        </div>
    );
}

export default Header

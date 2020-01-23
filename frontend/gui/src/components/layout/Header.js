import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Link from '@material-ui/core/Link';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        color: 'white'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    login: {
        color: 'white', 
        fontWeight: 'bold'
    }
}));

const Header = props => {
    const classes = useStyles();
    const [searchTxt, setSearchTxt] = useState("")

    const submitTracking = () => {
        console.log(searchTxt)
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
                    onChange={e => setSearchTxt(e.target.value)}
                />
            </div>
            <div>
                <IconButton size="small" onClick={submitTracking}>
                    <SearchIcon  className={classes.searchIcon}/>
                </IconButton>
            </div>
            <div className={classes.grow} />
            <div>
                <Link href="/login" className={classes.login}>LOGIN</Link>
            </div>
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default Header
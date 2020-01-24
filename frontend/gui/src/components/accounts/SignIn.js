import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { login, userAuth } from '../../services/authRequest';
import auth from '../../services/auth';


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = props => {
    
    const classes = useStyles();
    const [input, setInput] = useState({});

    useEffect(() => {
        if(localStorage.getItem('token')){
            userAuth().then(res => {
                auth.login(() => props.history.push('/branch'))}
            ).catch(err => auth.logout(() => {}))
        }
    }, [])

    const handleInputChange = (e) => setInput({
        ...input, [e.currentTarget.name]: e.currentTarget.value
    })

    const submit = e => {
        e.preventDefault();
        
        const {username, password} = input
        login(username, password)
        .then(res => {
            if(res) {
                auth.login(() => props.history.push('/branch'))
            }else{
                console.log("Invalid Username or Password!!!");
            }
        })
    }
   

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form method="POST" onSubmit={submit} className={classes.form}>
                    <TextField
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        onChange={handleInputChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">Forgot password?</Link>
                        </Grid>
                        <Grid item xs>
                            <Grid container justify="flex-end" >
                                <Link href="/" variant="body2">Back</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

SignIn.propTypes = {
    isAuth: PropTypes.bool
};

export default SignIn
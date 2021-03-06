import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    table: { minWidth: 800, },
    queue: { width: 55, },
    type: { width: 95, },
    actions: { width: 100, },
    selectEmpty: { marginTop: theme.spacing(2), },
    right: {textAlign: 'right'},
    addWrapper: {
        padding: '5px',
        position: 'relative',
        height: 40
    },
    fab: {
        position: 'absolute',
        right: 5,
        top: 4
    }
}));

export const modalStyle = makeStyles(theme => ({
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
        fontWeight: 'bold',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

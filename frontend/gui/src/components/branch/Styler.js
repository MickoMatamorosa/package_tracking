import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);


export const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


export const useStyles = makeStyles(theme => ({
    table: { minWidth: 700, },
    queue: { width: 20, },
    type: { width: 100, },
    actions: { width: 100, },
    selectEmpty: { marginTop: theme.spacing(2), },
    right: {textAlign: 'right'}
}));
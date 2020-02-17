import React, { useState, useEffect, Fragment } from 'react';
import { useAlert } from 'react-alert';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { getBranchPackages} from '../../services/branchRequest';
import { cancelPackage} from '../../services/packageRequest';
import { useStyles } from '../styles/Styler'
import { StyledTableRow, StyledTableCell } from '../styles/Table.styles'
import TablePaginationActions from './PackagePagination';
import PackageDetails from './PackageDetails'
import NewPackage from './NewPackage';
import ConfirmAction from '../common/ConfirmAction';
import auth from '../../services/auth';

const defaultPack = {
  tracking_number: false,
  client_fullname: '',
  client_address: '',
  from_branch: 0,
  to_branch: 0,
}

export default props => {
  const classes = useStyles();
  const alert = useAlert();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const [pack, setPack] = useState(defaultPack);
  const [active, setActive] = useState(null);

  const closeView = () => setPack(defaultPack);

  const packageStatus = packData => setPack(packData)

  const freshData = () => {
    getBranchPackages()
    .then(res => {
      if(typeof res === "object"){
        setData(res)
        setSearch(props.search)
      }
    }).catch(() => {})
  }

  useEffect(() => {
    if(search !== props.search){
      if(props.search){
        if(props.search.match(/^\d+$/)){
          getBranchPackages({tracking_number: props.search})
          .then(res => {
            if(res.length) setData(res)
            else alert.error("Tracking Number Not Found!!!")
          })
        } else alert.error("Invalid Tracking Number!!!");
      }
    } else freshData()
  }, [props.search, props.hasProfile, props.hasStatusFlow])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const actionFn = () => {
    console.log("actions fn", active);
    setActive(null);
    cancelPackage(active)
    .then(() => freshData());
  }

  const handleNewPackage = () => {
    if(!props.hasProfile) alert.error("Profile is Required!")
    if(!props.hasStatusFlow) alert.error("Status FLow is Required!")
    if(props.hasProfile && props.hasStatusFlow) setOpenNew(true)
  }

  return (<Fragment>
    <PackageDetails {...{pack, closeView, freshData, active}}/>
    <NewPackage {...{openNew, setOpenNew, freshData}}/>
    <ConfirmAction {...{
      active, setActive,
      actionFn, text: "cancel this package"
    }}/>

    <div className={classes.addWrapper}>
      <Fab size="medium"
        color="primary"
        aria-label="add"
        variant="extended"
        className={classes.fab}
        onClick={handleNewPackage}>
        <AddIcon />New Package
      </Fab>
    </div>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">Tracking No.</StyledTableCell>
            <StyledTableCell align="center">Client Name</StyledTableCell>
            <StyledTableCell align="center">Client Address</StyledTableCell>
            <StyledTableCell align="center">Other Branch</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Datetime</StyledTableCell>
            <StyledTableCell/>
          </StyledTableRow>
        </TableHead>

        <TableBody>
          { data && (rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
            ).map(row => (
              <StyledTableRow key={row.id} hover style={{cursor: 'pointer'}}
                onClick={() => packageStatus(row)}>
                <StyledTableCell>{row.tracking_number}</StyledTableCell>
                <StyledTableCell>{row.client_fullname}</StyledTableCell>
                <StyledTableCell>{row.client_address}</StyledTableCell>
                <StyledTableCell>{row.branch_name}</StyledTableCell>
                <StyledTableCell align="center">
                  { row.completed
                    ? "completed"
                    : row.cancel
                      ? "cancelled"
                      : auth.user === row.from_branch
                        ? "sending"
                        : "receiving"
                  }
                </StyledTableCell>
                <StyledTableCell align="center">{row.timestamp}</StyledTableCell>
                <StyledTableCell align="center">
                  { !row.completed && auth.user === row.from_branch && (
                    row.cancel
                    ? "cancelled"
                    : <Button size="small" onClick={() => setActive(row.id)}>
                        cancel</Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))
          }
          { emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={7}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Fragment>);
}
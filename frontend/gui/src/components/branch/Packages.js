import React, { useState, useEffect, Fragment } from 'react';

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
import AddIcon from '@material-ui/icons/Add';

import { getBranchPackages} from '../../services/branchRequest';
import { useStyles } from '../styles/Styler'
import { StyledTableRow, StyledTableCell } from '../styles/Table.styles'
import PackageDetails from './PackageDetails'
import TablePaginationActions from './PackagePagination';
import NewPackage from './NewPackage';

const defaultPack = {
  tracking_number: false,
  client_fullname: '',
  client_address: '',
  from_branch: 0,
  to_branch: 0,
}

export default props => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [openNew, setOpenNew] = useState(false)

  const [pack, setPack] = useState(defaultPack)

  const closeView = () => setPack(defaultPack);

  const packageStatus = packData => setPack(packData)

  const freshData = () => {
    getBranchPackages()
    .then(res => {
      setData(res)
      setSearch(props.search)
    })
  }

  useEffect(() => {
    if(search !== props.search){
      getBranchPackages(null, props.search)
      .then(res => setData(res))
    } else freshData()
  }, [props.search])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  

  return (<Fragment>
    <PackageDetails {...{pack, closeView}}/>
    <NewPackage {...{openNew, setOpenNew, freshData}}/>
    <div className={classes.addWrapper}>
      <Fab size="medium"
        color="primary"
        aria-label="add"
        variant="extended"
        className={classes.fab}
        onClick={() => setOpenNew(true)}
        >
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
            <StyledTableCell align="center">Actions</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          { data && (rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map(row => (
            <StyledTableRow key={row.id} hover style={{cursor: 'pointer'}}
              onClick={() => packageStatus(row)}>
              <StyledTableCell align="center">{row.tracking_number}</StyledTableCell>
              <StyledTableCell align="center">{row.client_fullname}</StyledTableCell>
              <StyledTableCell align="center">{row.client_address}</StyledTableCell>
              <StyledTableCell align="center">{row.branch_name}</StyledTableCell>
              <StyledTableCell align="center">send/receive</StyledTableCell>
              <StyledTableCell align="center">{row.timestamp}</StyledTableCell>
              <StyledTableCell align="center">actions</StyledTableCell>
            </StyledTableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={7}
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
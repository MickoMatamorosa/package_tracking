import React, { useState, useEffect, Fragment } from 'react';
import { useAlert } from 'react-alert';
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { getBranchPackages} from '../../services/branchRequest';
import { cancelPackage} from '../../services/packageRequest';
import { useStyles } from '../styles/Styler'
import PackageDetails from './PackageDetails'
import NewPackage from './NewPackage';
import ConfirmAction from '../common/ConfirmAction';

const defaultPack = {
  tracking_number: false,
  client_fullname: '',
  client_address: '',
  from_branch: 0,
  to_branch: 0,
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default props => {
  const classes = useStyles();
  const alert = useAlert();
  const [search, setSearch] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const [pack, setPack] = useState(defaultPack);
  const [active, setActive] = useState(null);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeView = () => setPack(defaultPack);

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
          getBranchPackages(null, props.search)
          .then(res => {
            if(res.length) setData(res)
            else alert.error("Tracking Number Not Found!!!")
          })
        } else alert.error("Invalid Tracking Number!!!");
      }
    } else freshData()
  }, [props.search, props.hasProfile, props.hasStatusFlow])

  const actionFn = () => {
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
    <AppBar position="static" color="default" style={{marginTop: 10}}>
      <Tabs value={value} onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="simple tabs example">
        <Tab label="All" {...a11yProps(0)} />
        <Tab label="Sending" {...a11yProps(1)} />
        <Tab label="Receiving" {...a11yProps(2)} />
        <Tab label="Completed" {...a11yProps(3)} />
        <Tab label="Cancelled" {...a11yProps(4)} />
      </Tabs>
      <Fab size="small"
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={handleNewPackage}>
        <AddIcon />
      </Fab>
    </AppBar>
    <TabPanel value={value} index={0}>
      All
    </TabPanel>
    <TabPanel value={value} index={1}>
      Sending
    </TabPanel>
    <TabPanel value={value} index={2}>
      Receiving
    </TabPanel>
    <TabPanel value={value} index={3}>
      Completed
    </TabPanel>
    <TabPanel value={value} index={4}>
      Cancelled
    </TabPanel>
    </Fragment>);
}
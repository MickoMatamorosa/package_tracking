import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { logout } from '../../../services/authRequest';
import auth from '../../../services/auth';

export default props => {
    const exit = () => {
        props.setAnchorEl(null);
        logout().then(res => {
            auth.logout(() => props.history.push('/'))
        })
    }

    const menuId = 'primary-search-account-menu';
    const menuPosition = { vertical: 'top', horizontal: 'right' }

    return (<Menu
            anchorEl={props.anchorEl}
            anchorOrigin={menuPosition}
            id={menuId}
            keepMounted
            transformOrigin={menuPosition}
            open={Boolean(props.anchorEl)}
            onClose={props.handleMenuClose}>
            <MenuItem onClick={() => props.handleOpen('profile')}>Profile</MenuItem>
            <MenuItem onClick={() => props.handleOpen('status-flow')}>Status Flow</MenuItem>
            <MenuItem onClick={() => props.handleOpen('change-pass')}>Change Password</MenuItem>
            <MenuItem onClick={exit}>Logout</MenuItem>
        </Menu>);
}

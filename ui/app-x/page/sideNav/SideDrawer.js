// const React = lib.react
import React from 'react'
// const { useState } = lib.react
import { useState } from 'react'
// const { A, navigate } = lib.hookrouter
import { A, navigate } from 'hookrouter'
// const PropTypes = lib['prop-types']
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather'

// import NavItem from 'app-x/page/sideNav/SideDrawer/NavItem'

const SideDrawer = (props) => {

  const useStyles = makeStyles(() => ({
    mobileDrawer: {
      width: 300
    },
    desktopDrawer: {
      width: 300,
      top: 64,
      height: 'calc(100% - 64px)'
    },
    avatar: {
      cursor: 'pointer',
      width: 64,
      height: 64
    }
  }));

  const classes = useStyles();
  //const location = useLocation();

  const { onMobileClose, isMobileNavOpen } = props

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={props.onMobileClose}
          open={props.isMobileNavOpen}
          variant="temporary"
        >
          {props.children}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {props.children}
        </Drawer>
      </Hidden>
    </>
  );
};

SideDrawer.propTypes = {
  isMobileNavOpen: PropTypes.bool
}

SideDrawer.defaultProps = {
  isMobileNavOpen: false
}

export default SideDrawer;

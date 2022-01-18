import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import authenticationService  from '../../services/authenticationService';

import styles from './style';
import {
  withRouter,
} from 'react-router-dom';

class header extends Component {

  static get propTypes() { 
    return { 
      children: PropTypes.any, 
      classes: PropTypes.classes,
    };
  }
  
  state = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
  }

  handleLogout = () => {
    authenticationService.logout();
    this.props.history.push('/login');
  }
  handleProfile = () => {
    this.props.history.push('/profile');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <div className={classes.userInfo} onClick={this.handleProfile}>
              <AccountCircleOutlinedIcon color="primary" style={{margin: '0px 5px'}} />
              <Typography color="primary" className={classes.userNameTypography}> {this.state.currentUser.name} </Typography>
            </div>
            <div className={classes.exitContainer}>
              <Button className={classes.exitButton} onClick={() => this.handleLogout()}>
                <ExitToAppOutlinedIcon color="primary"/>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(header));




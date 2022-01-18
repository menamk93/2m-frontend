import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
    Drawer, 
    List, 
    Typography, 
    ListItem , 
    ListItemIcon,
    CssBaseline,
    Grid,
} from '@material-ui/core';
import logo from '../../assets/logoH2m.png';
import styles from './style';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import LocalGasStationOutlinedIcon from '@material-ui/icons/LocalGasStationOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { withRouter, Link}  from "react-router-dom";
import Role from '../../helpers/role';


class drawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: JSON.parse(localStorage.getItem('currentUser')),
    };
   

  }
  static get propTypes() { 
    return { 
        children: PropTypes.any, 
        classes: PropTypes.classes,
    }; 
  }



 
    render () {
      const { classes } = this.props;
      const { currentUser } = this.state
      return (
        <Grid className={classes.root}>
          <CssBaseline />
          <Drawer
            className={classes.drawer}
            variant="permanent"
            elevation="1"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <Grid className={classes.toolbar} component={Link} to={'/dashboard'}>
                <img src={logo} />
            </Grid>
            <Grid className={classes.group}>
              <List className={classes.list}>
                {currentUser.role == Role.Master  &&  
                  <ItemWithIcon {...this.props} classes={classes} text={'Empresas'} path={'/company'}>
                    <BusinessOutlinedIcon  color="secondary" fontSize="large"  />
                  </ItemWithIcon>
                }
                { [Role.Master, Role.Admin_2, Role.Admin_1].indexOf(currentUser.role) != -1  &&  
                <ItemWithIcon {...this.props} classes={classes} text={'Usuários'} path={'/user'}>
                  <PermIdentityOutlinedIcon color="secondary"  fontSize="large" />
                </ItemWithIcon>
                }
                <ItemWithIcon {...this.props}  classes={classes} text={'Postos'} path={'/station'}>
                  <LocalGasStationOutlinedIcon  color="secondary" fontSize="large" />
                </ItemWithIcon>
                <ItemWithIcon {...this.props} text={'Alertas'} path={'/alert'}>
                  <ReportProblemOutlinedIcon  color="secondary" fontSize="large" />
                </ItemWithIcon>
              </List>
            </Grid>
          </Drawer>
          <Grid className={classes.body}>
            {this.props.children}
          </Grid>
        </Grid>
      )
  }
}
const ItemWithIcon = ({children, path, text, classes, location }) => {
  return (
    <ListItem button component={Link} className={ location.pathname == path ? classes.listItemSelected : classes.listItem } to={path}>
      <ListItemIcon className={classes.listIcons}>{ children }
          <Typography color="primary" className={classes.listItemTypography}>{text}</Typography>
      </ListItemIcon>
    </ListItem>
  );
}
 
export default withStyles(styles)(withRouter(drawer));
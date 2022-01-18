import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '../drawer';
import Header from '../header';
import { withStyles } from '@material-ui/core';
import styles from './style';

 class template extends Component {
    static get propTypes() { 
        return { 
            children: PropTypes.any, 
            classes: PropTypes.classes,
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Drawer />
                <div className={classes.body}>
                    <Header />
                    <div className={classes.bodyContainer}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
  }
}

export default withStyles(styles)(template);
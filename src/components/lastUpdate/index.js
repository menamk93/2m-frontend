import React from 'react';

import styles from './styles';
import { Typography, withStyles, Grid, Backdrop } from '@material-ui/core';
import { ReactComponent as Calendar } from '../../assets/calendario_icone.svg';
import { ReactComponent as Clock } from '../../assets/relogio_icone.svg';



const lastUpdate = props => {
    const { classes, date, hour, nextUpdate } = props;

    return (
        <Grid container direction="column" className={classes.root}>
            <Grid container direction="column" classNme={classes.upperContent}>
                <Grid item  direction="row" className={classes.iconContainer}>
                    <Calendar   />
                    <Typography variant="h4"  className={classes.textDate}>{date}</Typography>
                </Grid>
                <Grid item direction="row" className={classes.iconContainer}>  
                    <Clock />
                    <Typography variant="h4" color="primary" className={classes.textHour}>{hour}</Typography>
                </Grid>
           </Grid>
        </Grid>
    )
}
lastUpdate.defaultProps = {
date: '01/01/2020',
hour: '00:01',
nextUpdate: '10/12/2019 às 21:31'
}


export default withStyles(styles)(lastUpdate);

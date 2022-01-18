import React from 'react';

import styles from './styles';
import { Typography, withStyles, Grid } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const stat = {
    clear: 'clear',
    warning: 'warning',
    danger: 'danger'
}
function statusIcon( status ){
    if(status == stat.clear)
        return <CheckCircleOutlineIcon fontSize="large" style={{marginLeft:'4px',color:"#60B565"}} />
    if(status == stat.warning)
        return <ErrorOutlineIcon fontSize="large" style={{marginLeft:'4px',color:'#FBCD61' }}/>
    if(status == stat.danger)
        return <HighlightOffIcon fontSize="large" style={{marginLeft:'4px',color:'#DF4545' }} />
}

const horizontalBar = props => {
    const { classes, percentage, limit } = props;
    var status = 'clear'
    if(percentage>limit) status = "danger" 
    return (
        <Grid container direction="row" style={{height:'100%'}}>
            <Grid container xs={9} justify="center"  >
                <Grid container className={classes.root}   >
                    <Grid className={classes.bar} >
                        <Grid className={classes.progressBar} style={{width: `${percentage}%`}} />
                    </Grid>  
                </Grid>
                <Grid container direction="row" justify="center" className={classes.measureContainer}>
                    <Grid container  className={classes.measure} />
                    <Grid container xs={6}>0</Grid>
                    <Grid container xs={6} justify="flex-end">100%</Grid>
                </Grid>
            </Grid>
            <Grid container xs={3} direction="column" className={classes.description}>
                <Typography variant="h3" className={classes.percentage}>{percentage}</Typography>
                <Grid container direction="row"> 
                    <Typography variant="h5" >Status:  </Typography>
                    {statusIcon(status) }
                </Grid>
                <Typography variant="subtitle2" style={{color:'#9D9D9C'}}>Limite: {`${limit}%`}</Typography>
            </Grid>
        </Grid>
    )    
}
horizontalBar.defaultProps = {
    percentage: 10,
    limit: 100
}


export default withStyles(styles)(horizontalBar);

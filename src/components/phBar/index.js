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
    const { classes, ph, limit_up, limit_down } = props;
    var status = 'clear'
    if(ph>limit_up || ph<limit_down) status = "danger" 
    const input = (ph/14)*100
    return (
        <Grid container direction="row" style={{height:'100%', backgroundColor:'#fff'}}>
            <Grid container xs={9} justify="center" style={{marginTop: '5%'}} >
                <Grid container className={classes.chartContainer} >
                    <Grid container className={classes.root}>
                        <Grid className={classes.bar} >
                            <Grid className={classes.progressBar} />
                        </Grid>  
                    </Grid>
                    <Grid container style={{marginLeft: '2.5%', position: 'absolute',height: '100%',}}>
                        <Grid container style={{ position: 'relative',height: '100%', marginRight:'6%'}} >
                            <Grid className={classes.marker} style={{ marginLeft:`${input}%` }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="space-around" className={classes.measureContainer}>
                   { [...Array(15).keys()].map((number) => 
                    <Typography className={classes.label}>{number}</Typography>
                   )}
                   
                </Grid>
            </Grid>
            <Grid container xs={3} direction="column" className={classes.description}>
                <Typography variant="h3" className={classes.percentage}>{ph}</Typography>
                <Grid container item direction="row" style={{}}> 
                    <Typography variant="h5" >Status:  </Typography>
                    {statusIcon(status) }
                </Grid>
                <Typography variant="subtitle2" style={{color:'#9D9D9C'}}>Intervalo: {limit_up} a {limit_down}</Typography>
            </Grid>
        </Grid>
    )
}
horizontalBar.defaultProps = {
    ph: 2,
    limit_up: 8,
    limit_down: 4,
}


export default withStyles(styles)(horizontalBar);

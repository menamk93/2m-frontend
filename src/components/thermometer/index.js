import React from 'react';

import styles from './styles';
import { Typography, withStyles, Grid } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { ReactComponent as TemperatureHigh } from '../../assets/temperature_high.svg';
import { ReactComponent as TemperatureMedium } from '../../assets/temperature_medium.svg';
import { ReactComponent as TemperatureLow } from '../../assets/temperature_low.svg';


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
function temperatureIcon( temperature ){

    if(temperature > 30 ) return <TemperatureHigh /> ;
    else if  (temperature < 10 ) return <TemperatureLow /> 
    else return <TemperatureMedium /> 
}


const thermometer = props => {
    const { classes, temperature, limit } = props;
    var status = 'clear'
    if(temperature>limit) status = "danger" 
    return (
        <Grid container direction="row" style={{height:'100%'}} id="myTable">
            <Grid container xs={7} justify="center"  style={{alignItems:"center"}} >
                {temperatureIcon(temperature)}
            </Grid>
            <Grid container xs={5} direction="column" className={classes.description}>
                <Typography variant="h3" className={classes.percentage}>{temperature}ºC</Typography>
                <Grid container direction="row"> 
                    <Typography variant="h5" >Status:  </Typography>
                    {statusIcon(status) }
                </Grid>
                <Typography variant="subtitle2" style={{color:'#9D9D9C'}}>Limite: {limit}ºC</Typography>
            </Grid>
        </Grid>
    )
}
thermometer.defaultProps = {
    temperature: 35,
    limit: 40,
}


export default withStyles(styles)(thermometer);

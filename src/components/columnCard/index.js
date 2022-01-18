import React from 'react';
import {
    useHistory,
  } from "react-router-dom";
import styles from './styles';
import { Typography, withStyles } from '@material-ui/core';
import { Grid, Paper,Button } from '@material-ui/core/';


const Card = props => {
    let history = useHistory();
    const { classes, lastUpdate } = props;
    return (
        <Grid container item lg={props.gridSize} >
            <Paper elevation={1} className={classes.upperCards}>
                <Grid container item className={classes.cardTitle} >
                    <div className={classes.cardBar}/>
                    { props.header }
                </Grid>
                { props.body }
                <Grid container className={classes.buttonsContainer}>
                    <Button variant="contained" color="secondary" disableElevation onClick={()=>  history.push('/station')} className={classes.button}>
                        Ver atividade dos postos
                    </Button>
                    <Button variant="contained" color="primary" disableElevation onClick={()=>  history.push('/alert')} className={classes.button}>
                        Histórico de alertas
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    )
}



export default withStyles(styles)(Card);

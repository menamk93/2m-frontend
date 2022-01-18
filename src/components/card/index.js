import React from 'react';

import styles from './styles';
import { Typography, withStyles } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core/';


const columnCard = React.forwardRef((props,ref) => {
    const { classes, gridSize, header, body, minWidth, bodyHeight } = props;
    return (
        <Grid item lg={gridSize} style={{ minWidth: minWidth, flexGrow: 1 }} ref={ref} >
            <Paper elevation={1} className={classes.upperCards}>
                <Grid spacing={0} container style={{backgroundColor:'white'}}>
                    <Grid container item className={classes.cardTitle} >
                        <div className={classes.cardBar}/>
                        { header }
                    </Grid>
                    <Grid container item  spacing={0} className={classes.cardContent} style={{height:bodyHeight}} >
                        { body }  
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
})

columnCard.defaultProps = {
    minWidth: 100,
    bodyHeight: 240,
};


export default withStyles(styles)(columnCard);

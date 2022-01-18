import React from 'react';
import {Grid, Typography, withStyles, Button} from '@material-ui/core/';
import StatusIcon from '../statusIcon';

import styles from './styles';

const alertsCard = props => {
    const { classes, status, text, lastUpdate } = props;
    return(
        <Grid container className={classes.container} >
            <StatusIcon status={status} />
            <Grid container className={classes.bubbleContainer}>
                <Grid className={classes.speechBubbleIndicator} />
                <Grid className={classes.speechBubble}>
                    <Typography className={classes.text}>{text}</Typography>
                </Grid>
            </Grid>
        </Grid>

    );
};


export default withStyles(styles)(alertsCard);

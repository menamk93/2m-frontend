import React from 'react';
import {Grid, withStyles} from '@material-ui/core/';
import styles from './styles';

import CheckIcon from '@material-ui/icons/Check';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { IoIosWater } from "react-icons/io";

const statusOptions = {
    clear: {
        color: '#60B565',
        icon: <CheckIcon color="primary" style={{ fontSize: 80 }}/>,
    },
    warning: {
        color: '#FBCD61',
        icon: <PriorityHighIcon color="primary" style={{ fontSize: 80 }}/>, 
    },
    danger: {
        color: '#DF4545',
        icon: <IoIosWater style={{color:'#0C5456' ,fontSize: 80 }}/>, 
    },
}


const statusIcon = props => {
    const { classes, status } = props;
   

    const color = statusOptions[status].color;
    const icon = statusOptions[status].icon;
    
    return(
        <Grid container className={classes.container}> 
            <Grid style={{ 
                position: 'relative',
                height: '156px',
                width: '156px',
                borderRadius: '50%',
                backgroundColor: 'white',
                border: 'solid 20px '+ color ,
                borderWidth: 20,
                justifyContent:'center',
                alignItems:'center',
                display:'flex',
            }}>
                <Grid style={{
                    position: 'absolute',
                    height: '120px',
                    width: '120px',
                    borderRadius: '50%',
                    backgroundColor: '#C5C5C533',
                    border:'solid white',
                    borderWidth: 5,
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    {icon}
                </Grid>
            </Grid>
        </Grid>

    );
}

 statusIcon.defaultProps = {
        status: 'clear',
    }

export default withStyles(styles)(statusIcon);

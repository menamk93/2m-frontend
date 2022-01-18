import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles, Button, } from '@material-ui/core';

import EventIcon from '@material-ui/icons/Event';

import styles from './styles';

function dataPicker (props) {
       
    const {classes, onChange, value} = props 
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            margin="normal"
            format="dd/MM/yyyy"
            value={value}
            onChange={val => onChange(val)}
            className={classes.filterInput}
            invalidDateMessage=""
            maxDateMessage=""                       
            minDateMessage=""                   
            keyboardIcon={
                <Button disableElevation className={classes.calendarIcon}>  
                    <EventIcon fontSize="small" style={{color:'#0C5456' }} />
                </Button>
            }
            InputProps={{
                disableUnderline: true,
                style:{color: '#53B7B9'},
            }}
            />
        </MuiPickersUtilsProvider>
    )
}
export default withStyles(styles)(dataPicker);
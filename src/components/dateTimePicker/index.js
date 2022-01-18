import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles, Button, InputLabel, FormControl } from '@material-ui/core';

import EventIcon from '@material-ui/icons/Event';

import styles from './styles';

function DateTimePicker (props) {
       
    const {classes, onChange, value, label,width} = props 
    return (
        <FormControl style={{margin: '16px 20px 8px 0px', width}}>
         <InputLabel shrink className={classes.label}>{label}</InputLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
            margin="normal"
            format="dd/MM/yyyy HH:mm"
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
        </FormControl>
    )
}
export default withStyles(styles)(DateTimePicker);
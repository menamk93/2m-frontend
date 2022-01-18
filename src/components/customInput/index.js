import React from 'react';
import {
    FormControl,
    Input,
    InputLabel,
    makeStyles,
    FormHelperText,
    Select,
    MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    inputLabel: {
        fontSize: 18,
        color: '#0C5456',
        width: 'max-content'
    },
    input: {
        backgroundColor: '#F8F8F8',
        color: '#53B7B9',
        width:'100%',
        textAlign:'center',
    },
  }));

function CustomInput(props) {
    const {label,error, required, width,...other} = props;
    const classes = useStyles();
    return (
        <FormControl  style={{margin: '16px 20px 8px 0px', width}} error={typeof(error)=="undefined" ? false : true} required={required?true:false}>
            <InputLabel shrink className={classes.inputLabel}>{label}</InputLabel>
            <Input
                {...other}
                className={classes.input}
                inputProps={{ min: "0", max: "9999", step: "1" }}
                disableUnderline
                
            />
            <FormHelperText id="component-error-text">{error && error.message}</FormHelperText>
        </FormControl>
    );
}

function CustomSelect(props) {
    const {label, error, required, width, rows, value, ...other} = props;
    const classes = useStyles();
    return (
        <FormControl  style={{margin: '16px 20px 8px 0px', width}} error={typeof(error)=="undefined" ? false : true} required={required?true:false}>
            <InputLabel shrink className={classes.inputLabel}>{label}</InputLabel>
            <Select
                {...other}
                defaultValue={value=='' ? "Selecione" : value }
                input={<Input className={classes.input} disableUnderline />}
                >
                <MenuItem value={'Selecione'} disabled>Selecione</MenuItem>
                {rows.map((row,key) => {
                    return (
                        <MenuItem key={key} value={row.label}>{row.label}</MenuItem>
                    )
                })}
            </Select>
            <FormHelperText id="component-error-text">{error && error.message}</FormHelperText>
        </FormControl>
    );
}

function CustomSelector(props) {
    const {children, label, error, required, width, value, ...other} = props;
    const classes = useStyles();
    return (
        <FormControl  style={{margin: '16px 20px 8px 0px', width}} error={typeof(error)=="undefined" ? false : true} required={required?true:false}>
            <InputLabel shrink className={classes.inputLabel}>{label}</InputLabel>
                <Select
                {...other}
                defaultValue={value=='' ? "Selecione" : value }
                input={<Input className={classes.input} disableUnderline />}
                >
                <MenuItem value={'Selecione'} disabled>Selecione</MenuItem>
                {children}
            </Select>
            <FormHelperText id="component-error-text">{error && error.message}</FormHelperText>
        </FormControl>
    );
}




CustomInput.propTypes = {
    label: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    required: PropTypes.func.isRequired,
    width: PropTypes.func.isRequired,
    rows: PropTypes.func.isRequired,
};

CustomSelect.propTypes = {
    label: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    required: PropTypes.func.isRequired,
    width: PropTypes.func.isRequired,
    rows: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
};
CustomSelector.propTypes = {
    label: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    required: PropTypes.func.isRequired,
    width: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
};
export {CustomInput, CustomSelect, CustomSelector};
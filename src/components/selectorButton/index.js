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
        backgroundColor: '#349698',
        color: 'white',
        borderRadius: '3px',
        width:'100%',
        textAlign:'center',
    },
  }));

export default function SelectorButton(props) {
  const {children, error, required, width, value, ...other} = props;
  const classes = useStyles();
  return (
    <Select
      {...other}
      defaultValue={value=='' ? "Selecione" : value }
      input={<Input className={classes.input} disableUnderline />}
      >
      <MenuItem value={'Selecione'} disabled>Selecione</MenuItem>
      {children}
    </Select>

  );
}
SelectorButton.propTypes = {
  error: PropTypes.func.isRequired,
  required: PropTypes.func.isRequired,
  width: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};

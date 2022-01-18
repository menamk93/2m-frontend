import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'inherit'
  },
  secondaryElement: {
    color: '#888888',
    fontSize: '15px'
  },
  checkbox: {
      height:'30px', 
      paddingRight:'20px',
  }
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const {data, onChange,keyValue, labelName, defaultValue}     = props
  const [checked, setChecked] = React.useState(defaultValue);
  React.useEffect(() => {
    handleChange()
  },[checked]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const handleChange = () => {
    onChange(checked)
  }
  return (
    <List className={classes.root}>
      {data.map(value => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} className={classes.checkbox} dense button onClick={(handleToggle(value))}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
                
              />
            </ListItemIcon>
            <ListItemText id={value[keyValue]} primary={value[labelName]}   />
          </ListItem>
        );
      })}
    </List>
  );
}
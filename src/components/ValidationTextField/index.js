import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './style.css';

const ValidationTextField = withStyles({
    root: {
        backgroundColor: 'white',
        
      '& .MuiOutlinedInput-notchedOutline' : {
        border: '1px solid #9D9D9C',
        borderRadius: '3px',
      },
      '& label.Mui-focused': {
        color: '#0C5456',
      },
      '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
          borderColor: 'green',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#0C5456',
          boxShadow: "0px 2px 4px #00000029",
        },
      },
    },
  })(TextField);
  
export default ValidationTextField;
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0C5456',
      },
      secondary: {
        main: '#349698',
      },
    },
    typography: {
      fontFamily: 'Hind',
      fontSize: 12,
    },
    overrides: {
      MuiTableRow: {
        hover:{
          '&$hover:hover': {
            backgroundColor: '#ECFEFF',
          },
        }
      },
      MuiPaginationItem: {
        page:{ 
          '&$selected' : {
            backgroundColor:'white',
            color: '#53B7B9'
          }
        },
      },
      MuiButton: {
        root:{
          textTransform: 'initial',
        }
      },
      MuiInputBase: {
        input: {
          textIndent: '10px',
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #F8F8F8 inset !important',
            WebkitTextFillColor: '#53B7B9',
            '&:$hover':{
              WebkitBoxShadow: '0 0 0 100px #F8F8F8 inset !important',
              WebkitTextFillColor: '#53B7B9',
            },
            '&:$focus': {
              WebkitBoxShadow: '0 0 0 100px #F8F8F8 inset !important',
              WebkitTextFillColor: '#53B7B9',
            },
            '&:$active':{
              WebkitBoxShadow: '0 0 0 100px #F8F8F8 inset !important',
              WebkitTextFillColor: '#53B7B9',
            },
          },
        }
      },
    },
  });
export default theme;


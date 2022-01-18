const styles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      width: '130px',
    },
    input: {
      height: '48px',
    },
    return: {
      margin: theme.spacing(3, 0, 2),
      width: '130px',
      backgroundColor:'white',
    },
    buttonContainer: {
      flexDirection:'row',
      display:'flex',
      justifyContent: 'space-between'
    },
    title: {
      fontWeight: '100',
    },
    subtitle: {
      fontWeight: '400',
      marginLeft: '10px',
    },
  });

export default styles;
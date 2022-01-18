const styles = theme => ({
    container: {
      width: '500px',    
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      width: '168px',
    },
    return: {
        margin: theme.spacing(3, 0, 2),
        width: '168px',
        backgroundColor:'white',
    },
    input: {
        height: '48px',
    },
    buttonContainer: {
        flexDirection:'row',
        display:'flex',
        justifyContent: 'space-between',
        width:'50%',
    },
    title: {
        fontWeight: '100',
    },
    subtitle: {
        fontWeight: '400',
        marginLeft: '10px',
    },
    iconContainer: {
      marginTop:'25px',
      marginLeft: '10px',
      display:'flex',
      justifyContent:"center",
      height: '80px',
    },
  });

export default styles;
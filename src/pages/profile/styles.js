const styles = theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    body: {
      marginTop: '10px',
    },
    containerTitle: {
      flexDirection: 'column',
    },
    title: {
      fontWeight: '100',
    },
    subtitle: {
      marginLeft: '1px',
      fontWeight: '100',
      color: '#349698',
    },
    bodyContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 3
    },
    sideBodyContainer: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1
    },
    paper: {
        width: '80%',
        boxShadow: '3px 3px 8px #00000008',
        height: '300px',
        padding: 48,
      },
      inputButton: {
        width: '168px',
        marginTop: '20px'
      },
  });
  
  export default styles;
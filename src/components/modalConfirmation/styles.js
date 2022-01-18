const styles = theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: '6px',
      padding: '1% 1% 1% 1%',
      boxShadow: '3px 3px 8px #00000008',
      width: 600,
      height: 200,
    },
    returnButton: {
        width: '150px',
        height: 'fit-content',
        backgroundColor:'white',
    },
    inputButton: {
        width: '150px',
        height: 'fit-content',
    },
  });
  
export default styles
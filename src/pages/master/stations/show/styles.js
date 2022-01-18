const styles = theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    body: {
      marginTop: '10px',
    },
    title: {
      fontWeight: '100',
    },
    title2: {
      fontWeight: 500,
      marginLeft: '20px',
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
    button : {
      textTransform: 'none',
      fontFamily: 'hind',
      fontWeight: '100',
      width:'240px',
      height:'36px',
      marginTop:'10px',
  },
  select: {
    backgroundColor: '#349698',
    color: 'white',
    borderRadius: '3px',
    width:'96px',
    height: '36px',
    textAlign:'center',
    marginLeft: '20px',
    fontSize: '18px',
  },
});
  
  export default styles;
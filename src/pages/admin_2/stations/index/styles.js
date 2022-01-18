const styles = theme => ({
    body: {
      marginTop: '60px',
    },
    containerTitle: {
      flexDirection: 'row',
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
    root: {
      width: '100%',
      boxShadow: '3px 3px 8px #00000008'
    },
    container: {
      height: 500,
    },
    tableContainer: {
      height: 500,
      marginBottom: '30px',
    },
    tableHeader: {
      backgroundColor: 'white',
      borderBottom: 'none',
      color: '#0C5456',
      fontFamily: 'hind',
      fontSize: '16px',
    },
    tableWhiteRow: {
      backgroundColor: 'white',
      borderBottom: 'none',
      padding: 'none',
      color: 'inherit'
    },
    columnItems: {
      borderBottom: '1px solid #F8F8F8',
      fontFamily: 'hind',
      fontSize: '14px',
      color: 'inherit',
      fontWeight: 'inherit',
    },
    columnItemsName: {
      borderBottom: '1px solid #F8F8F8',
      fontFamily: 'hind',
      fontSize: '14px',
      color: 'inherit',
      fontWeight: 'inherit',
      '&:hover': {
        color: '#0C5456',
        cursor: 'pointer',
        fontWeight: 500,
      }
    },
    columnItems2: {
      borderBottom: 'none',
    },
    tableRow: {
      fontWeight: '100',
      '&:hover': {
        color: '#53B7B9',
      }
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    button : {
      textTransform: 'none',
      fontFamily: 'hind',
      fontWeight: '100',
      marginTop:'10px',
    },
    paginationText: {
      textTransform: 'capitalize',
      fontWeight: '100',
      color :'#5D5D5D',
    },
    equalizerButton: {
      backgroundColor: '#8AD68E',
      minWidth: '5px',
      padding: '8px',
      marginRight:'10px',
      '&:hover': {
        backgroundColor: '#0C5456',
      }
    },
    editButton: {
      backgroundColor: '#53B7B9',
      minWidth: '5px',
      padding: '8px',
      marginRight:'10px',
      '&:hover': {
        backgroundColor: '#0C5456',
      }
    },
    deleteButton: {
      backgroundColor: '#F66565',
      minWidth: '5px',
      padding: '8px', 
      marginRight:'10px',
      '&:hover':{
        backgroundColor: '#b82020',
      }
    },
    filterButton: {
      backgroundColor: '#53B7B9',
      height: 'fit-content',
      textTransform: 'none',
      fontFamily: 'hind',
      fontWeight: '100',
    },
    searchBar: {
      backgroundColor: 'white',
      width: '30%',
      height: 'fit-content',
      marginLeft: '15px', 
      paddingLeft: '10px',
      borderRadius: '3px',
      border:'1px solid transparent',
      
    },
    inputFocused: {
        transition: '.5s',
        border:'1px solid #9D9D9C',
        
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    dateInput: {
      backgroundColor: '#F8F8F8',
      marginLeft: '10px',
      color: '#53B7B9',
      padding: 5,
      width: '95%',
    },
    filterInput: {
      backgroundColor: '#F8F8F8',
      color: '#53B7B9',
      textAlign:'center',
      width: '100%',
      height: '50%',
      margin: 0,
    },
    returnButton: {
      width: '168px',
      height: 'fit-content',
      backgroundColor:'white',
    },
    inputButton: {
      width: '168px',
      height: 'fit-content',
    },
    input: {
      backgroundColor: '#F8F8F8',
      color: '#53B7B9',
      width:'100%',
      textAlign:'center',
  },
  });

  export default styles;
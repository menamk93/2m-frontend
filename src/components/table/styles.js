const styles = theme => ({
    root: {
      width: '100%',
    },
    container: {
      height: 500,
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
    columnItens: {
      borderBottom: '1px solid #F8F8F8',
      fontFamily: 'hind',
      fontSize: '18px',
      color: 'inherit',
      fontWeight: 'inherit',
    },
    columnItens2: {
      borderBottom: 'none',
    },
    tableRow: {
      fontWeight: '100',
      '&:hover': {
        color: '#53B7B9',
        fontWeight: '400',

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
  });

export default styles;

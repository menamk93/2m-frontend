const styles = theme => ({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 600,
    },
    tableHeader: {
      height: '100px',
    },
    columnHeader: {
      backgroundColor: 'white',
      borderBottom: 'none',
      color: '#0C5456',
      fontFamily: 'hind',
      fontSize: '16px',
    },
    columnItens: {
      borderBottom: '1px solid #F8F8F8',
      fontFamily: 'hind',
      fontSize: '18px',
      color: 'inherit',
      fontWeight: 'inherit',
    },
    tableRow: {
      fontWeight: '100',
      '&:hover': {
        color: '#0C5456',
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
  });

export default styles;

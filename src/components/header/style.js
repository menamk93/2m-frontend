const styles = theme => ({

appBar: {
    width: '100%',
    height: '72px',
    boxShadow: 'none',
    backgroundColor: 'white',
    alignItems: 'flex-end', 
  },
  root: {
    width: '100%',
    height: '72px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '50px',
    height: '100%',
    margin: '0px 20px',
    alignItems: 'center',
    '&:hover': {
      color: '#53B7B9 !important', 
      cursor: 'pointer',
    },
  },
  userNameTypography: {
    fontSize: '16px',
    color: '#3A3A3A',
    transition: '.5s',
    '&:hover': {
      color: '#53B7B9', 
      transition: '.5s',
    },
  },
  toolBar: {
    height: "100%",
    padding: 'unset',

  },
  exitContainer: {
    display: 'flex',
    height: '100%',
  },
  exitButton: {
    display: 'flex',
    height: '100%',
    weight: 1,
    borderRadius: 0,
    '&:hover':{
      backgroundColor:'#ECFEFF',
    },
  },
});

export default styles;
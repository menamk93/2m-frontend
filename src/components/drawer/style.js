const drawerWidth = 120;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    paddingTop: 264,
    boxShadow: '3px 3px 8px #00000008',
    borderRight: '0px',
    '& .MuiDrawer-paperAnchorDockedLeft' : {
      borderRight: '0px',
    },
    '& .MuiPaper-elevation0' : {
      boxShadow: "3px 3px 8px #00000008",
      opacity: 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    width:'100',
    justifyContent:'center',
    alignItems:'center',
    height: '72px',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  list : {
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'flex',
  },    
  listItem: {
    flex: 1,
    width: '120px',
    height: '120px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    transition: '.5s',

  },
  listItemSelected:{
    flex: 1,
    width: '120px',
    height: '120px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    border: 'solid #53B7B9 ',
    borderLeftWidth: '4px',
    borderRightWidth: '0',
    borderTopWidth: '0',
    borderBottomWidth: '0',
    backgroundColor: '#ECFEFF',
    '&:hover': {
      backgroundColor: '#ECFEFF',
    },
    transition: '.5s',
    
  },
  listIcons: {
    alignItems: 'center',
    minWidth: 0,
    flexDirection: 'column',
  },
  group: {
    display: 'flex',
    flex: 1, 
    alignItems:'center',
  },
  body: {
    display: 'flex',
    flex: 1,
  },
  listItemTypography: {
    fontWeight: '100',
    fontSize: '14px',
  }
});

export default styles;
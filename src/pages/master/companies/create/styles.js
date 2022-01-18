const styles = theme => ({
  body: {
    marginTop: '60px',
  },
  card: {
    width: '100%',
    boxShadow: '3px 3px 8px #00000008',
    height: '450px',
    padding: 48,
  },
  containerTitle: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: '100',
  },
  textField: {
    width: '70%',
  },
  mediumTextField: {
    width: '50%',
    marginRight:20,
  },
  smallTextField: {
    width: '20%',
  },
  telephoneInput: {
    width: '40%',
  },
  input: {
    backgroundColor: '#F8F8F8',
    color: '#53B7B9',
    width:'100%',
    height: '100%',
    marginTop: 40,
    textAlign:'center',
  },
  inputLabel: {
    fontSize: 18,
    color: '#0C5456',
  },
  formControl: {
    margin: '16px 20px 8px 0px',
    width: '20%',
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
  buttonContainer: {
    marginTop: 30,
  },
  deleteButton: {
    backgroundColor: '#DF4545',
    height: 'fit-content',
    width: '168px',
    color: 'white',
    '&:hover':{
      backgroundColor: '#b82020',
    } 
  },
});

  export default styles;
import React, { Component } from 'react';
import { 
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Container,
  Link as MaterialLink
} from '@material-ui/core';
import ValidationTextField from '../../../components/ValidationTextField';
import styles from './styles';
import logo from '../../../assets/Grupo656.png'
import { withStyles } from '@material-ui/core/styles';
import authenticationService  from '../../../services/authenticationService';
import {
  withRouter,
  Link
} from 'react-router-dom';

class login extends Component {

  constructor(props) {
    super(props);
    // redirect to home if already logged in
    if (authenticationService.currentUserValue) { 
      this.props.history.push('/');
    }
  }
  state = {
    email: '',
    password: '',
    error: '',
  };

  handleInputChange = e => {
    this.setState({email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({password: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
   
    const {email, password} = this.state;

    if(!email.length ||  !password.length) 
      return this.setState({error: "insira email e senha válida"})
    const response  =  await authenticationService.login(
      this.state.email, 
      this.state.password
    )
    if(response) return this.setState({error: response})
      
    this.props.history.push('/');
  };


  render() {
    const { classes } = this.props;
    return( 
      <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo}  alt={'H2Metric'}/>
        <form className={classes.form} noValidate onSubmit={this.handleSubmit} > 
          <ValidationTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              className : classes.input 
            }}
            value = {this.state.email}
            onChange={this.handleInputChange}
          />
          <ValidationTextField
            error={this.state.error ? true : false}
            helperText={this.state.error ? this.state.error : ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              className : classes.input 
            }}
            value = {this.state.password}
            onChange={this.handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <MaterialLink component={Link} to="/forgotPassword" >
                Esqueceu sua senha?
              </MaterialLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    
    
    );
  }
}

export default withStyles(styles)(withRouter(login));
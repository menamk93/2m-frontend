import React, { Component } from 'react';
import { 
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';
import ValidationTextField from '../../../components/ValidationTextField';
import styles from './styles';
import logo from '../../../assets/Grupo656.png'
import { withStyles } from '@material-ui/core/styles';
import api from '../../../services/api';
import {
    withRouter,
    Link,
} from 'react-router-dom';
import ModalSucess from '../../../components/modalSuccess'

class forgotPassword extends Component {

  state = {
    email: '',
    error: '',
    open: false,
  };

  handleInputChange = e => {
    this.setState({email: e.target.value });
  };
  handleCloseModal = () => {
    this.setState({open: false})
    this.props.history.push('/');
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const {email} = this.state;

    if( (! /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) 
        return this.setState({error:'Email invalido'});
    else this.setState({error: ''})
      const response  =  await api.post('/password/email',{
        email,
      });
        this.setState({open:true})
    };


  render() {
    const { classes } = this.props;
    return( 
      <Container component="main" maxWidth="xs" >
        <ModalSucess 
        open={this.state.open}
        title="Instruções de como resetar sua senha foram enviadas para seu email!"
        onClose={this.handleCloseModal}
        />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant='h4' className={classes.title}>Vamos localizar sua conta</Typography>
        <Typography color="secondary" variant='h6' className={classes.subtitle}>Insira seu e-mail</Typography>
        <form className={classes.form} noValidate onSubmit={this.handleSubmit} > 
          <ValidationTextField
            error = { this.state.error ? true : false}
            helperText={this.state.error ? this.state.error : ''}
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
        <Grid container className={classes.buttonContainer}>
            <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={'/login'}
                className={classes.return}
            >
                Voltar
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Enviar
            </Button>
        </Grid>
        </form>
      </div>
    </Container>
    );
  }
}

export default withStyles(styles)(withRouter(forgotPassword));
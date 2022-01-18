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
import ReplayIcon from '@material-ui/icons/Replay';
import ValidationTextField from '../../../components/ValidationTextField';
import styles from './styles';
import logo from '../../../assets/Grupo656.png'
import { withStyles } from '@material-ui/core/styles';
import api from '../../../services/api';
import {
    withRouter,
    Link,
} from 'react-router-dom';

class recoverPassword extends Component {

  state = {
    email: '',
  };

  handleInputChange = e => {
    this.setState({email: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
   
    // const response  =  await api.post('/password/email',{
    //   email,
    // });
        
        // localStorage.setItem('token', response.data.data.token);
        // var token = localStorage.getItem('token');
        this.props.history.push('/changePassword');
    };


  render() {
    const { classes } = this.props;
    return( 
      <Container component={Grid} maxWidth="md"  >
      <CssBaseline />
        <Typography variant='h4' className={classes.title}>Enviamos um código de verificação para o seu e-mail</Typography>
        <Typography color="secondary" variant='h6' className={classes.subtitle}>Digite o código recebido. Se não encontrar nosso e-mail, verifique a pasta de lixo eletrônico</Typography>
        <form className={classes.form} noValidate onSubmit={this.handleSubmit} > 
            <Grid container direction="row" >
                <Grid container className={classes.buttonContainer}>
                <ValidationTextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    maxWidth='xm'
                    required
                    id="email"
                    label="Código"
                    name="code"
                    autoComplete={false}
                    autoFocus
                    InputProps={{
                    className : classes.input 
                    }}
                    value = {this.state.email}
                    onChange={this.handleInputChange}
                />
                    <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to={'/forgotPassword'}
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
                <Grid item className={classes.iconContainer}>
                    <ReplayIcon  color="primary" />
                    <Typography color="secondary" variant='h6' component={Link}>
                        Enviar um novo código 
                    </Typography>
                </Grid>
            </Grid>
        </form>
    </Container>
    );
  }
}

export default withStyles(styles)(withRouter(recoverPassword));
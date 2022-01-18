import React from 'react';
import { 
  Button,
  CssBaseline,
  Grid,
  Container,
  Typography,
} from '@material-ui/core';
import ValidationTextField from '../../../components/ValidationTextField';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import {
  withRouter,
  useHistory,
  useLocation,
  Link,
} from 'react-router-dom';
import api from '../../../services/api';
import ModalSucess from '../../../components/modalSuccess'

function ChangePassword(props){

  let history = useHistory();
  const { classes } = props;

  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);
    
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const handleEmailChange = value => {
    setEmail(value);
  };
  const handlePasswordChange = value => {
    setPassword(value);
  };
  const handlePasswordConfirmationChange = value => {
    setPasswordConfirmation(value );
  };
  const handleCloseModal =()=> {
    setOpen(false)
    history.push('/');
  }
  
  const handleSubmit = async (e) => {
    if (password != passwordConfirmation) setError('senhas não conferem')
    if (password < 8 ) setError('senha precisa ser maior ou igual a 8 caracteres')
    await api.post('/password/reset',{
      'email' : email,
      'password' : password,
      'password_confirmation' : passwordConfirmation,
      'token' : query.get("token")
    }).then(res => {
      setOpen(true)
    }).catch(err => {
      alert('Informações invalidas ou token expirou')
    })
  };

    return( 
      <Container component="main" maxWidth="xs" >
        <ModalSucess 
        open={open}
        title="Senha modificada com sucesso! Realize o login."
        onClose={handleCloseModal}
        />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant='h4' className={classes.title}>Defina sua nova senha</Typography>
        <Typography color="secondary" variant='h6' className={classes.subtitle}>Ela deve conter no mínimo 8 caracteres</Typography>
       
        <ValidationTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Seu email"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              className : classes.input 
            }}
            value = {email}
            onChange={event => handleEmailChange(event.target.value)}
          />
          <ValidationTextField
            error = { error ? true : false}
            helperText={error ? error : ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            label="Senha"
            name="password"
            autoComplete="password"
            InputProps={{
              className : classes.input 
            }}
            value = {password}
            onChange={event => handlePasswordChange(event.target.value)}
          />

          <ValidationTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password_confirmation"
            type="password"
            label="Confirmar nova senha"
            name="password_confirmation"
            autoComplete="password_confirmation"
            autoFocus
            InputProps={{
              className : classes.input 
            }}
            value = {passwordConfirmation}
            onChange={event => handlePasswordConfirmationChange(event.target.value)}
          />
          <Grid container className={classes.buttonContainer}>
            <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={'/login'}
                className={classes.return}
            >
              Cancelar
            </Button>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
              Alterar Senha
            </Button>
          </Grid>
      </div>
    </Container>
    );
}

export default withStyles(styles)(withRouter(ChangePassword));
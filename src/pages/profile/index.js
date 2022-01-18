import React, { Component } from 'react';
import styles from './styles';
import { 
    Typography, 
    withStyles, 
    Paper,
    Grid,
    Button,
    MenuItem,
} from '@material-ui/core';
import {
    withRouter,
    useHistory,
  } from "react-router-dom";
import api from '../../services/api'
import {CustomInput}  from '../../components/customInput'
import { useForm } from 'react-hook-form'
import ModalSucess from '../../components/modalSuccess'
import authHeader from '../../helpers/authHeader'
import handleResponse from '../../helpers/handleResponse'

function Profile(props) {

  const {classes} = props;
  let history = useHistory();
  const { register, handleSubmit, errors, setValue,setError, watch} = useForm()
  const [values, setValues] = React.useState({
    name:'',
    email:'',
    password:'',
    password_confirmation:'',
  });
  const [confirmationModal,setConfirmationModal] = React.useState(false);
  React.useEffect(() => {
    getData()
  },[]);
  
  const getData = () =>{
    api.get(`user`,{
      headers: authHeader(), 
    }).then(res => {
        setValues(res.data.data)
    }).catch(error => handleResponse(error.response, props ))
  };
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const handleCloseModal = () => {
      setConfirmationModal(false)
      history.push('/')
  }
  const onSubmit = (data) => {
    if(typeof(data.password) == ''){
        delete data.password
        delete data.password_confirmation 
    }  
    api.put('user', {
      ...values
    },{
      headers: authHeader(), 
    })
    .then( response =>{
        if( typeof(response.errors) == 'undefined'){
          setConfirmationModal(true)
          return true;
        }
      }  
    )
    .catch(error => {
      handleResponse(error.response, props );
      handleErrors(error.response.data.errors);
    })
  };
  const handleErrors = (errs) => {
    Object.keys(errs).map( row => {

      if(row == 'email') setError(row,'','Email já está em uso')
      if(row == 'password') setError(row,'','As senhas não conferem')
    })
  }

    return (
      <Grid container className={classes.container}>
           <ModalSucess 
            open={confirmationModal}
            title="Edição realizada com sucesso!"
            onClose={handleCloseModal}
            />
        <Grid container className={classes.containerTitle}>
          <Typography variant='h3' className={classes.title}>Meu perfil</Typography>
          <Typography variant='h5' className={classes.subtitle}>Visualize e atualize suas informações de perfil</Typography> 
        </Grid>
        {values.name && 
        <Grid container spacing={2} direction={'column'}  className={classes.body} alignItems="center" component={'form'} onSubmit={handleSubmit(onSubmit)}> 
            <Paper className={classes.paper}>
            <Grid container direction="row">
                <Grid container xs="6">
                <CustomInput
                    width={'75%'}
                    defaultValue={values.name}
                    label="Nome completo"
                    name="name"
                    inputRef={register}
                    onChange={handleChange('name')}
                    error={errors.name}
                    />
                    <CustomInput
                        
                        width={'75%'}
                        defaultValue={values.email}
                        label="Email"
                        name="email"
                        inputRef={
                        register({ 
                            pattern:{ value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Email invalido" }                   
                        })}
                        onChange={handleChange('email')}
                        error={errors.email}
                    />
                </Grid>
                <Grid container xs="6">
                    <CustomInput
                    
                    width={'70%'}
                    defaultValue={values.password}
                    label="Nova senha"
                    name="password"
                    inputRef={register({ minLength: {value: 8, message: "Senha precisa ser maior de 8 digitos"  }})}
                    onChange={handleChange('password')}
                    error={errors.password}
                    type="password"
                    />
                    <CustomInput
                    
                    width={'70%'}
                    defaultValue={values.password_confirmation}
                    label="Confirmar senha"
                    name="password_confirmation"
                    inputRef={register({ 
                        minLength: {value: 8, message: "Senha precisa ser maior de 8 digitos"  },
                        validate: (value) => value === watch('password') || "As senhas não conferem"
                    })}
                    onChange={handleChange('password_confirmation')}
                    error={errors.password_confirmation}
                    type="password"
                    />
                    </Grid>
                </Grid>
            </Paper>
            <Grid container justify="flex-end" style={{width:'80%'}}>
                <Button 
                    type="submit"
                    variant="contained" 
                    color="primary"  
                    className={classes.inputButton}
                    >Salvar
                </Button>
          </Grid>
        </Grid>
}
      </Grid>
    );
}
export default withStyles(styles)(withRouter(Profile));
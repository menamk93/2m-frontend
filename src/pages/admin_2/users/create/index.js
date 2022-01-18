import React from 'react';
import styles from './styles';
import { 
  Grid,
  Paper,
  withStyles, 
  Button,
  Typography,
  MenuItem,
} from '@material-ui/core';
import {
  withRouter,
  useHistory,
} from "react-router-dom";
import api from '../../../../services/api'
import handleResponse from '../../../../helpers/handleResponse'
import authHeader from '../../../../helpers/authHeader'
import {NumberMask, PhoneMask}  from '../../../../components/maskInput'
import {CustomInput, CustomSelector}  from '../../../../components/customInput'
import ModalSucess from '../../../../components/modalSuccess'
import { useForm } from 'react-hook-form'
function Users(props) {

  let history = useHistory();
  const { register, handleSubmit, errors, setError, setValue, watch} = useForm()
  const {classes} = props;
  const [values, setValues] = React.useState({
    name:'',
    email:'',
    phone:'',
    cell_phone:'',
    role_id:'',
    active:'',
    password:'',
    password_confirmation:'',
  });
  React.useEffect(() => {
    register({name: 'active'}, {required: true});
    register({name: 'role_id'}, {required: true});
  }, [register])
  const [confirmationModal, setConfirmationModal] = React.useState(false)
  
  let roles = [
    {"label":"Admin 2","value":"3"},
    {"label":"Admin 1","value":"2"},
    {"label":"Técnico","value":"1"},
  ]
  let status = [
    {"label":"Ativo","value":"1"},
    {"label":"Inativo 2","value":"2"},
  ]

  const onSubmit = (data) => {
    api.post('adminTwo/user', {
      ...data
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
      handleErrors(error.response.data.errors)
    })
  };
  const handleErrors = (errs) => {
    Object.keys(errs).map( row => {

      if(row == 'email') setError(row,'','Email já está em uso')
      if(row == 'password') setError(row,'','As senhas não conferem')
    })
  }
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const handleCancel = () => {
    history.push('/user')
  }
  const handleCloseModal = () => {
    return history.push('/user')
  }
  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.containerTitle} justify="space-between">
        <Typography variant='h3' className={classes.title}>Cadastrar novo usuário</Typography>
      </Grid>
      <Grid container spacing={2} className={classes.body} component={'form'} onSubmit={handleSubmit(onSubmit)}>
        <ModalSucess 
        open={confirmationModal}
        title="Cadastro realizado com sucesso!"
        onClose={handleCloseModal}
        />
        <Paper className={classes.card}>
          <Grid container direction="row">
              <Grid container direction="column" xs={4}>
                <CustomInput
                  required
                  width={'75%'}
                  defaultValue={values.name}
                  label="Nome completo"
                  name="name"
                  inputRef={register}
                  onChange={handleChange('name')}
                  error={errors.name}
                />
                <CustomInput
                    required
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
                  <Grid item>
                    <CustomInput
                    width={'35%'}
                    margin="normal"
                    inputRef={
                      register({ 
                        pattern:{ value: /[/(][0-9]{2}[/)] [0-9]{4}[/-][0-9]{4}/,
                        message: "Telefone invalido"},                        
                    })}
                    defaultValue={values.phone}
                    label="Telefone"
                    name="phone"
                    onChange={handleChange('phone')}
                    inputComponent={PhoneMask}
                    error={errors.phone}
                  />
                  <CustomInput
                    width={'35%'}
                    required
                    margin="normal"
                    inputRef={
                      register({ 
                        pattern:{ value: /[/(][0-9]{2}[/)] [0-9]{5}[/-][0-9]{4}/,
                        message: "Celular invalido"},                        
                    })}
                    defaultValue={values.cell_phone}
                    label="Celular"
                    name="cell_phone"
                    onChange={handleChange('cell_phone')}
                    inputComponent={NumberMask}
                    error={errors.cell_phone}
                  />
                </Grid>
              </Grid>
              <Grid container direction="column" xs={4}>
                <Grid item>
                  <CustomSelector
                    required
                    width={'35%'}
                    defaultValue={values.role_id}
                    label="Permissão de acesso"
                    name="role_id"
                    inputRef={register}
                    onChange={e => setValue('role_id', e.target.value)}
                    error={errors.role_id}
                  >
                    {roles.map((role,key) => {
                    return (
                        <MenuItem key={key} value={role.value}>{role.label}</MenuItem>
                    )
                    })}
                  </CustomSelector>
                  <CustomSelector
                    required
                    width={'35%'}
                    defaultValue={values.active}
                    label="Status"
                    name="active"
                    inputRef={register}
                    onChange={e => setValue('active', e.target.value)}
                    error={errors.active}
                  >
                    <MenuItem key={1} value={1}>Ativo</MenuItem>
                    <MenuItem key={0} value={0}>Inativo</MenuItem>
                  </CustomSelector>
                </Grid>
              </Grid>
              <Grid container direction="column" xs={4}>
                <CustomInput
                  required
                  width={'70%'}
                  defaultValue={values.password}
                  label="Confirmar senha"
                  name="password"
                  inputRef={register({ minLength: {value: 8, message: "Senha precisa ser maior de 8 digitos"  }})}
                  onChange={handleChange('password')}
                  error={errors.password}
                  type="password"
                />
                <CustomInput
                  required
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
        <Grid container direction="row" justify="space-between" className={classes.buttonContainer}>
          <Button 
            variant="outlined"
            color="primary"
            className={classes.returnButton}
            onClick={handleCancel}
            >Cancelar
          </Button>
          <Button 
            type="submit"
            variant="contained" 
            color="primary"  
            className={classes.inputButton}
            >Salvar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
 
}



export default withStyles(styles)(withRouter(Users));
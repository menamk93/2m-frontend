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
import DeleteIcon from '@material-ui/icons/Delete'
import {
  withRouter,
  useHistory,
  useParams,
} from "react-router-dom";
import api from '../../../../services/api'
import handleResponse from '../../../../helpers/handleResponse'
import authHeader from '../../../../helpers/authHeader'
import {NumberMask, ZipcodeMask, CNPJMask,PhoneMask}  from '../../../../components/maskInput'
import {CustomInput, CustomSelect, CustomSelector}  from '../../../../components/customInput'
import ModalConfirmation from '../../../../components/modalConfirmation'
import ModalSucess from '../../../../components/modalSuccess'
import { useForm } from 'react-hook-form'
function Users(props) {

  let { id } = useParams();
  let history = useHistory();
  
  const {classes} = props;
  const [defaultValues, setDefaultValues] = React.useState()

  const [values, setValues] = React.useState({
    name:'',
    email:'',
    phone:'',
    cell_phone:'',
    corporate_name: '',
    role_id:'',
    type: '',
    active:'',
    password:'',
    password_confirmation:'',
  });
  const { register, handleSubmit, errors, setError, setValue, watch} = useForm()
  React.useEffect(() => {
    getData()
  },[]);

  const getData = () => {
    api.get(`adminTwo/user/${id}`,{
      headers: authHeader(), 
    }).then(res => {
      setValues(res.data.data)
      setDefaultValues(res.data.data)
    }).catch(error => handleResponse(error.response, props ))
  };

  React.useEffect(() => {
    register({name: 'active'}, {required: false});
    register({name: 'role_id'}, {required: false});
  }, [register])
  const [confirmationModal, setConfirmationModal] = React.useState(false)
  const [successModal, setSuccessModal] = React.useState(false)
  let roles = [
    {"label":"Admin 2","value":"3"},
    {"label":"Admin 1","value":"2"},
    {"label":"Técnico","value":"1"},
  ]
  let status = [
    {"label":"Ativo","value":"1"},
    {"label":"Inativo 2","value":"2"},
  ]
  React.useEffect(() => {
  },[])

  function handleDeleteRow() {
    setConfirmationModal(true)
  }
  function handleDelete() {
    setConfirmationModal(false)
    api.delete(`adminTwo/user/${id}`, 
    {
      headers: authHeader(), 
    })
    .then(res => {
      if( typeof(res.errors) == 'undefined'){
        setSuccessModal(true)
      }
    })
    .catch(error => handleResponse(error.response, props ))
  }
  const onSubmit = (data) => {
    if( data.password == "") {
      delete data.password 
      delete data.password_confirmation 
    }
    typeof(data.active)     == 'undefined'  && delete data.active 
    typeof(data.role_id)    == 'undefined'  && delete data.role_id
    api.put(`adminTwo/user/${id}`, {
      ...data
    },{
      headers: authHeader(), 
    })
    .then( response =>{
        if( typeof(response.errors) == 'undefined'){
          setSuccessModal(true)
          return true;
        }
      }  
    )
    .catch(error => {
      handleResponse(error.response, props );
    })
  };
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

  if(values.name){
    return (
      <Grid container className={classes.container}>
        <Grid container className={classes.containerTitle} justify="space-between">
          <Typography variant='h3' className={classes.title}>Editar informações do usuário</Typography>
          <Button
            variant="contained"
            className={classes.deleteButton}
            startIcon={<DeleteIcon />}
            onClick={handleDeleteRow}
          >
            Excluir usuário
          </Button>
        </Grid>
        <Grid container spacing={2} className={classes.body} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <ModalConfirmation
            title="Tem Certeza que deseja excluir os dados?" 
            open={confirmationModal}
            buttomName="Sim, excluir"
            handleConfirm={handleDelete}
          />
          <ModalSucess 
          open={successModal}
          title="Modificações realizada com sucesso!"
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
                      width={'35%'}
                      value={values.role_id}
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
                      width={'35%'}
                      value={ values.active ? 1 : 0 }
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
                    width={'70%'}
                    defaultValue={values.password}
                    label="Senha"
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
  }else {
    return null
  }
 
}



export default withStyles(styles)(withRouter(Users));
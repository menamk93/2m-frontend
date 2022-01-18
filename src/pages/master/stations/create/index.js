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
import brazilianStates from '../../../../helpers/brazilianStates'

import api from '../../../../services/api'
import handleResponse from '../../../../helpers/handleResponse'
import authHeader from '../../../../helpers/authHeader'
import {NumberMask, ZipcodeMask}  from '../../../../components/maskInput'
import {CustomInput, CustomSelect, CustomSelector}  from '../../../../components/customInput'
import ModalSucess from '../../../../components/modalSuccess'
import { useForm } from 'react-hook-form'
function Station(props) {

  let history = useHistory();
  const { register, handleSubmit, errors, setError, setValue, watch} = useForm()
  const {classes} = props;
  const [values, setValues] = React.useState({
    name:'',
    company_id:'',
    num_sensors:'',
    street:'',
    street_number:'',
    city:'',
    state:'',
    zipcode:'',
    manager_id:'',
    technician_id:'',
  });
  const [manager, setManager] = React.useState([])
  const [managers, setManagers] = React.useState([])
  const [technicians, setTechnicians] = React.useState([])
  const [technician, setTechnician] = React.useState([])
  React.useEffect(() => {
    register({name: 'company_id'}, {required: true});
    register({name: 'technician_id'}, {required: true});
    register({name: 'manager_id'}, {required: true});
    register({name: 'state'}, {required: true});
  }, [register])
  const [confirmationModal, setConfirmationModal] = React.useState(false)
  
  let roles = [
    {"label":"Master","value":"4"},
    {"label":"Admin 2","value":"3"},
    {"label":"Admin 1","value":"2"},
    {"label":"Técnico","value":"1"},
  ]
  let status = [
    {"label":"Ativo","value":"1"},
    {"label":"Inativo 2","value":"2"},
  ]
  const [companies, setCompanies] = React.useState([])

  React.useEffect(() => {
    getCompanies()
  },[])

  React.useEffect(() => {
    setManager({ 
      email:'',
      phone:'',
      cell_phone:'',
      company_id:''
    })
    setTechnician({ 
      email:'',
      phone:'',
      cell_phone:'',
      company_id:''
    })
    getManager(watch('company_id'))
    getTechnician(watch('company_id'))
    
  },[watch('company_id')])

  const getCompanies = () => {
    api.get('master/company',{
      headers: authHeader(), 
    }).then( response => {
      setCompanies(response.data.data)
    })
  }
  const getManager = (id) => {
    api.post(`master/company/getCompanyUsersByRole/${id}`,
    {
      role: 'admin_1'
    },
    {
      headers: authHeader(), 
    }).then( response => {
      setManagers(response.data.data)
    })
  }
  const getTechnician = (id) => {
    api.post(`master/company/getCompanyUsersByRole/${id}`,
    {
      role: 'technician'
    },
    {
      headers: authHeader(), 
    }).then( response => {
      setTechnicians(response.data.data)
    })
  }
  const onSubmit = (data) => {
    
    api.post('master/station', {
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
    console.log(values)
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const handleManagerChange = (value) => {
    setValue('manager_id', value.id)
    setManager({...value})
  }
  const handleTechnicianChange = (value) => {
    setValue('technician_id', value.id)
    setTechnician({...value})
  }
  const handleCancel = () => {
    history.push('/station')
  }
  const handleCloseModal = () => {
    return history.push('/station')
  }
  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.containerTitle} justify="space-between">
        <Typography variant='h3' className={classes.title}>Cadastrar novo posto</Typography>
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
                  label="Nome fantasia"
                  name="name"
                  inputRef={register}
                  onChange={handleChange('name')}
                  error={errors.name}
                />
                <Grid item>
                  <CustomSelector
                    required
                    width={'35%'}
                    defaultValue={values.company_id}
                    label="Empresa"
                    name="company_id"
                    inputRef={register}
                    onChange={e => setValue('company_id', e.target.value)}
                    error={errors.company_id}
                  >
                    {companies.map((company,key) => {
                      return (
                          <MenuItem key={key} value={company.id}>{company.corporate_name}</MenuItem>
                      )
                  })}
                  </CustomSelector>
                  <CustomInput
                    required
                    width={'35%'}
                    defaultValue={values.num_sensors}
                    label="Nº de poços monitorados"
                    name="num_sensors"
                    inputRef={register}
                    onChange={handleChange('num_sensors')}
                    error={errors.num_sensors}
                  />
                </Grid>
                <Grid item> 
                  <CustomInput
                    required
                    width={'50%'}
                    defaultValue={values.street}
                    label="Logradouro"
                    name="street"
                    inputRef={register}
                    onChange={handleChange('street')}
                    error={errors.street}
                  />
                  <CustomInput
                    required
                    type="number"
                    width={'20%'}
                    defaultValue={values.street_number}
                    label="Número"
                    inputRef={register}
                    name="street_number"
                    onChange={handleChange('street_number')}
                    error={errors.street_number}
                  />
                </Grid>
                <Grid item >
                  <CustomInput
                    required
                    width={'30%'}
                    defaultValue={values.city}
                    label="Cidade"
                    name="city"
                    inputRef={register}
                    onChange={handleChange('city')}
                    error={errors.city}
                  />
                  <CustomSelect
                    required
                    width={'15%'}
                    value={values.state}
                    label="Estado"
                    name="state"
                    inputRef={register}
                    onChange={e => setValue('state', e.target.value)}
                    error={errors.state}
                    rows={brazilianStates}
                  />
                  <CustomInput
                    required
                    width={'20%'}
                    defaultValue={values.zipcode}
                    inputComponent={ZipcodeMask}
                    label="CEP"
                    name="zipcode"
                    inputRef={
                      register({ 
                        pattern:{ value: /[0-9]{5}[/-][0-9]{3}/,
                        message: "CEP invalido"},                        
                    })}
                    onChange={handleChange('zipcode')}
                    error={errors.zipcode}
                  />
                </Grid>
              </Grid>
              <Grid container direction="column" xs={4}>
                <CustomSelector
                  required
                  width={'70%'}
                  defaultValue={values.manager_id}
                  label="Responsável pelo empreendimento"
                  name="manager_id"
                  inputRef={register}
                  onChange={e => handleManagerChange(e.target.value)}
                  error={errors.manager_id}
                >
                  {managers.map((user,key) => {
                    return (
                        <MenuItem key={key} value={user}>{user.name}</MenuItem>
                    )
                })}
                </CustomSelector>
                <CustomInput
                  disabled
                  width={'70%'}
                  value={manager.email}
                  label="E-mail"
                  inputRef={register}
                  name="manager_email"
                />
                <CustomInput
                  width={'70%'}
                  disabled
                  margin="normal"
                  value={manager.phone}
                  label="Telefone"
                  name="manager_phone"
                  inputComponent={NumberMask}
                />
                <CustomInput
                  width={'70%'}
                  disabled
                  margin="normal"
                  value={manager.cell_phone}
                  label="Celular"
                  name="manager_cell_phone"
                  inputComponent={NumberMask}
                />
              </Grid>
              <Grid container direction="column" xs={4}>
              <CustomSelector
                  required
                  width={'70%'}
                  defaultValue={values.technician_id}
                  label="Responsável técnico"
                  name="technician_id"
                  inputRef={register}
                  onChange={e => handleTechnicianChange(e.target.value)}
                  error={errors.technician_id}
                >
                  {technicians.map((technician,key) => {
                    return (
                        <MenuItem key={key} value={technician}>{technician.name}</MenuItem>
                    )
                })}
                </CustomSelector>
                <CustomInput
                  disabled
                  width={'70%'}
                  value={technician.email}
                  label="E-mail"
                  inputRef={register}
                  name="technician_email"
                />
                <CustomInput
                  disabled
                  width={'70%'}
                  margin="normal"
                  value={technician.phone}
                  label="Telefone"
                  name="technician_phone"
                  inputComponent={NumberMask}
                />
                <CustomInput
                  disabled
                  width={'70%'}
                  margin="normal"
                  value={technician.cell_phone}
                  label="Celular"
                  name="technician_cell_phone"
                  inputComponent={NumberMask}
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



export default withStyles(styles)(withRouter(Station));
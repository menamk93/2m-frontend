import React from 'react';
import styles from './styles';
import { 
  Grid,
  Paper,
  withStyles, 
  Button,
  Typography,
} from '@material-ui/core';
import {
  withRouter,
  useHistory,
} from "react-router-dom";
import api from '../../../../services/api'
import handleResponse from '../../../../helpers/handleResponse'
import authHeader from '../../../../helpers/authHeader'
import brazilianStates from '../../../../helpers/brazilianStates'
import {NumberMask, ZipcodeMask, CNPJMask, PhoneMask}  from '../../../../components/maskInput'
import {CustomInput, CustomSelect}  from '../../../../components/customInput'
import ModalSucess from '../../../../components/modalSuccess'
import { useForm } from 'react-hook-form'
import { validate } from 'cnpj';

function Companies(props) {
  let history = useHistory();
  const { register, handleSubmit, errors, setError, setValue} = useForm()
  const {classes} = props;
  const [values, setValues] = React.useState({
    corporate_name:'',
    corp_reg_number:'',
    state_registration:'',
    municipal_registration:'',
    street:'',
    street_number:'',
    city:'',
    state:'',
    zipcode:'',
    financier_name:'',
    financier_email:'',
    financier_phone: '',
    financier_cell_phone: '',
  });
  React.useEffect(() => {
  }, [values])

  React.useEffect(() => {
    register({name: 'state'}, {required: true});
  }, [register])
  const [confirmationModal, setConfirmationModal] = React.useState(false)
  
  const onSubmit = (data) => {
    api.post('master/company', {
      ...data
    },{
      headers: authHeader(), 
    })
    .then( response =>{
        if( typeof(response.errors) == 'undefined'){
          setConfirmationModal(true)
          return true;
        }
        handleErrors(response)
      }  
    )
    .catch(error => {
      handleResponse(error.response, props )
      handleErrors(error.response.data.errors)
    })
  };
  const handleErrors = (errs) => {
    for (let [key, value] of Object.entries(errs)) {
      setError(key,'',value)
    }
  }
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const handleCancel = () => {
    history.push('/company')
  }
  const handleCloseModal = () => {
    return history.push('/company')
  }
  const validateCNPJ = (value) => {
    const isvalid = validate(value)
    if (isvalid) return true
    setError("corp_reg_number", "invalid", "CNPJ inválido");
    return false
  }
  
  return (
    <Grid container className={classes.container}>
      <Grid container className={classes.containerTitle} justify="space-between">
        <Typography variant='h3' className={classes.title}>Cadastrar empresa</Typography>
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
                  width={'70%'}
                  defaultValue={values.corporate_name}
                  label="Razão social"
                  name="corporate_name"
                  inputRef={register({
                    required: true
                  })}
                  onChange={handleChange('corporate_name')}
                  error={errors.corporate_name}
                />
                <CustomInput
                    required
                    width={'70%'}
                    defaultValue={values.corp_reg_number}
                    label="CNPJ"
                    inputComponent={CNPJMask}
                    name="corp_reg_number"
                    inputRef={
                      register(
                        {
                          validate: value => validateCNPJ(value),
                          minLength: { value: 18, message:"CNPJ inválido"}
                        }
                        )
                    }
                    onChange={handleChange('corp_reg_number')}
                    error={errors.corp_reg_number}
                  />
                <CustomInput
                    required
                    width={'70%'}
                    defaultValue={values.state_registration}
                    label="Inscrição estadual"
                    name="state_registration"
                    inputRef={register}
                    onChange={handleChange('state_registration')}
                    error={errors.state_registration}
                  />
                  <CustomInput
                    required
                    width={'70%'}
                    defaultValue={values.municipal_registration}
                    label="Inscrição municipal"
                    name="municipal_registration"
                    inputRef={register}
                    onChange={handleChange('municipal_registration')}
                    error={errors.municipal_registration}
                  />
              </Grid>
              <Grid container direction="column" xs={4}>
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
                    inputRef={register({
                      max:{value: 9999 , message: "Insira um valor válido"},
                      min:{value: 1 , message: "Insira um valor válido"}
                      
                    
                    })}
                    name="street_number"
                    onChange={handleChange('street_number')}
                    error={errors.street_number}
                  />
                </Grid>
                <Grid item>
                  <CustomInput
                    required
                    width={'50%'}
                    defaultValue={values.city}
                    label="Cidade"
                    name="city"
                    inputRef={register}
                    onChange={handleChange('city')}
                    error={errors.city}
                  />
                  <CustomSelect
                    required
                    width={'20%'}
                    value={values.state}
                    label="Estado"
                    name="state"
                    inputRef={register}
                    onChange={e => setValue('state', e.target.value)}
                    error={errors.state}
                    rows={brazilianStates}
                  />
                </Grid>
                <CustomInput
                  required
                  width={'70%'}
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
              <Grid container direction="column" xs={4}>
                <CustomInput
                  required
                  width={'70%'}
                  defaultValue={values.financier_name}
                  label="Responsável financeiro"
                  name="financier_name"
                  inputRef={register}
                  onChange={handleChange('financier_name')}
                  error={errors.financier_name}
                />
                <CustomInput
                  required
                  width={'70%'}
                  defaultValue={values.financier_email}
                  label="E-mail"
                  name="financier_email"
                  inputRef={
                    register({ 
                      pattern:{ value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Email invalido" }                   
                  })}
                  onChange={handleChange('financier_email')}
                  error={errors.financier_email}
                />
                <CustomInput
                  width={'50%'}
                  required
                  margin="normal"
                  inputRef={
                    register({ 
                      pattern:{ value: /[/(][0-9]{2}[/)] [0-9]{4}[/-][0-9]{4}/,
                      message: "Telefone invalido"},                        
                  })}
                  defaultValue={values.financier_phone}
                  label="Telefone"
                  name="financier_phone"
                  onChange={handleChange('financier_phone')}
                  inputComponent={PhoneMask}
                  error={errors.financier_phone}
                />
                <CustomInput
                  width={'50%'}
                  required
                  margin="normal"
                  inputRef={
                    register({ 
                      pattern:{ value: /[/(][0-9]{2}[/)] [0-9]{5}[/-][0-9]{4}/,
                      message: "Celular invalido"},                        
                  })}
                  defaultValue={values.financier_cell_phone}
                  label="Celular"
                  name="financier_cell_phone"
                  onChange={handleChange('financier_cell_phone')}
                  inputComponent={NumberMask}
                  error={errors.financier_cell_phone}
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



export default withStyles(styles)(withRouter(Companies));
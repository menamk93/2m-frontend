import React from 'react';
import styles from './styles';
import { 
  Grid,
  Paper,
  withStyles, 
  Button,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import {
  withRouter,
  useParams,
  useHistory,
} from "react-router-dom";
import ModalSucess from '../../../../components/modalSuccess'
import ModalConfirmation from '../../../../components/modalConfirmation'
import api from '../../../../services/api'
import handleResponse from '../../../../helpers/handleResponse'
import authHeader from '../../../../helpers/authHeader'
import brazilianStates from '../../../../helpers/brazilianStates'
import {NumberMask, ZipcodeMask, CNPJMask, PhoneMask}  from '../../../../components/maskInput'
import {CustomInput, CustomSelect}  from '../../../../components/customInput'
import { useForm } from 'react-hook-form'
import { validate } from 'cnpj';

function Companies(props) {

  let { id } = useParams();
  const { register, handleSubmit, errors, setError} = useForm()
  const {classes} = props;
  let history = useHistory();
  const [loaded, setLoaded] = React.useState(0)
  const [confirmationModal, setConfirmationModal] = React.useState(false)
  const [successModal, setSuccessModal] = React.useState(false)
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
    getData()
  },[]);
  const getData = () =>{
    api.get(`master/company/${id}`,{
      headers: authHeader(), 
    }).then(res => {
      setValues(res.data.data[0])
      setLoaded(1)
    }).catch(error =>{ 
      handleResponse(error.response, props )
    })
  };
  const onSubmit = data => {
    api.put(`master/company/${id}`, {
      ...values
    },{
      headers: authHeader(), 
    })
    .then( response => {
      if(typeof(response.errors) == 'undefined'){
        setSuccessModal(true)
        return true;
      }}
    )
    .catch(error => {
      handleResponse(error.response, props )
      handleErrors(error.response.data.errors)

    })
  };
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const handleCloseModal = () => {
    return history.push('/company')
  }
  function handleDeleteRow() {
    setConfirmationModal(true)
  }
  const handleDelete = () => {
    setConfirmationModal(false)
    api.delete(`master/company/${id}`,{
      headers: authHeader(), 
    })
    .then(res => {
      if( typeof(res.errors) == 'undefined'){
        setSuccessModal(true)
      }
    })
    .catch(error => handleResponse(error.response, props ))
  };
  const handleCancel = () => {
    history.push('/company')
  }
  const handleErrors = (errs) => {
    for (let [key, value] of Object.entries(errs)) {
      setError(key,'',value)
      console.log(errors)

    }
  }
  const validateCNPJ = (value) => {
    const isvalid = validate(value)
    if (isvalid) return true
    setError("corp_reg_number", "invalid", "CNPJ inv??lido");
    return false
  }
  if(loaded){
    return (
      <Grid container className={classes.container}>
        <ModalConfirmation
            title="Tem Certeza que deseja excluir os dados?" 
            open={confirmationModal}
            buttomName="Sim, excluir"
            handleConfirm={handleDelete}
          />
          <ModalSucess 
            open={successModal}
            title="Modifica????es realizada com sucesso!"
            onClose={handleCloseModal}
          />
        <Grid container className={classes.containerTitle} justify="space-between">
          <Typography variant='h3' className={classes.title}>Editar informa????es da empresa</Typography>
          <Button
            variant="contained"
            className={classes.deleteButton}
            startIcon={<DeleteIcon />}
            onClick={handleDeleteRow}
          >
            Excluir empresa
          </Button>
        </Grid>
        <Grid container spacing={2} className={classes.body} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Paper className={classes.card}>
            <Grid container direction="row">
                <Grid container direction="column" xs={4}>
                  <CustomInput
                    required
                    width={'70%'}
                    defaultValue={values.corporate_name}
                    label="Raz??o social"
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
                            minLength: { value: 18, message:"CNPJ inv??lido"}
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
                      label="Inscri????o estadual"
                      name="state_registration"
                      inputRef={register}
                      onChange={handleChange('state_registration')}
                      error={errors.state_registration}
                    />
                   <CustomInput
                      required
                      width={'70%'}
                      defaultValue={values.municipal_registration}
                      label="Inscri????o municipal"
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
                      label="N??mero"
                      inputRef={register}
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
                      onChange={handleChange('state')}
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
                    label="Respons??vel financeiro"
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
                    width={'25%'}
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
                    width={'25%'}
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
  }else {
    return null
  }
}


export default withStyles(styles)(withRouter(Companies));
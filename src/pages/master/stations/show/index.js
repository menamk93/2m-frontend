import React from 'react';
import styles from './styles';
import { 
  Typography, 
  withStyles, 
  makeStyles,
  Button, 
  Select, 
  Input, 
  MenuItem,
  Menu,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '../../../../components/card';
import AlertsCard from '../../../../components/alertsCard';
import HorizontalBar from '../../../../components/horizontalBar';
import Thermometer from '../../../../components/thermometer';
import PhBar from '../../../../components/phBar';
import LineChart from '../../../../components/lineChart';
import LastUpdate from '../../../../components/lastUpdate';
import MyResponsiveLine from '../../../../components/MyResponsiveLine';
import ModalGeneric from '../../../../components/modalGeneric';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';
import api from '../../../../services/api'
import authHeader from '../../../../helpers/authHeader'
import handleResponse from '../../../../helpers/handleResponse'
import CheckboxList from  '../../../../components/checkboxList';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import authenticationService  from '../../../../services/authenticationService';
import ModalSucess from '../../../../components/modalSuccess'
import DateTimePicker from '../../../../components/dateTimePicker';
import {CustomInput}  from '../../../../components/customInput'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  withRouter,
  useHistory,
  useParams,
} from "react-router-dom";
import { useForm } from 'react-hook-form'

function Station (props){
  const {classes} = props
  let { id } = useParams();
  let history = useHistory();

  const [values, setValues] = React.useState({
    name: 'Posto exemplo',
    status: 'clear',
    lastUpdate: '10 de dezembro de 2019',
    text:'nenhum vazamento detectado',
  })
  const [condutivity, setCondutivity] = React.useState();
  const [condutivityInterval, setCondutivityInterval] = React.useState('today');
  const [pressure, setPreassure] = React.useState();
  const [pressureInterval, setPressureInterval] = React.useState('today');
  const [turbidity, setTurbidity] = React.useState();
  const [turbidityInterval, setTurbidityInterval] = React.useState('today');
  const [salinity, setSalinity] = React.useState();
  const [salinityInterval, setSalinityInterval] = React.useState('today');
  const [alert, setAlert] = React.useState(false)
  const [station, setStation] = React.useState(1)
  const [sensor, setSensor] = React.useState(1)
  const [sensorName, setSensorName] = React.useState('PM 1')
  const [sensors, setSensors] = React.useState([{}])
  const componentRef = React.useRef();
  React.useEffect(() => {
    getStation()
    getSensors()
  },[]);

  React.useEffect(() => {
    getData()
    setAlert(false)
    getAlerts()
  },[sensor]);

  const getStation = () => {
    api.get(`master/station/${id}`,{
      headers: authHeader(), 
    }).then(res => { 
      setStation(res.data.data)
    }).catch(error => handleResponse(error.response, props))
  };

  const getSensors = () => {
    api.get(`master/sensor/${id}`,{
      headers: authHeader(), 
    }).then(res => { 
      setSensors(res.data.data)
      setSensor(res.data.data[0].id)
      setSensorName(res.data.data[0].name)
    }).catch(error => handleResponse(error.response, props))
  };
  const getData = () => {
    api.get(`master/sensor/showByDate/${sensor}`,{
      headers: authHeader(), 
    }).then(res => {
      setValues(res.data.data)
      setCondutivity(res.data.data.condutivity)
      setPreassure(res.data.data.pressure)
      setTurbidity(res.data.data.turbidity)
      setSalinity(res.data.data.salinity)
    })
  }
  const getAlerts = () => {
    api.get(`/master/alert/getAlertFromSensor/${sensor}`,{
      headers: authHeader(), 
    }).then(res => {
      if(res.data.data.length != 0) {
        setAlert(true)
      }
    })
  }
  const handleChooseSensor = (value) => {
    setSensor(value)
  }
  const handleSendEmail = () => {

    let result;
    for (let index =  0; index < sensors.length; index++) {
      if(sensors[index].id == sensor) result = index + 1;
    } 

    api.post(`master/email/`,{
      email: 'ae',
      sensor: `PM ${result}`,
      station_name: station.name
    },{
      headers: authHeader(), 
    }).then(res => {
      
    })
  }

  if(typeof(values.condutivity) != 'undefined'){
    return (
        <Grid container className={classes.container} >
          <Grid container className={classes.containerTitle} alignItems="center">
            <Grid container xs={8} alignItems="center" >
              <Typography variant='h3' className={classes.title}>Atividade do posto</Typography>
              <Typography variant='h3' className={classes.title2}>|  {station.name}</Typography>
              <Select
                className={classes.select}
                value={sensor}
                onChange={(e) => handleChooseSensor(e.target.value)}
                input={<Input disableUnderline />}
                >
                {sensors.map( (val, key )=> {
                  return (
                    <MenuItem value={val.id}> PM {key+1}</MenuItem>
                  )
                })}
              </Select>
              <KeysButton sensors={sensors} name={station.name} />
            </Grid>
            <Grid container xs={4} justify="flex-end" style={{paddingRight:'16px'}}>
              <CustomMenu sensor={sensor} />
              <PrintButton id={'comp'} />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.body} ref={componentRef} id='comp'> 
            <Grid container item spacing={2} md={12} direction="row">
              <Card 
                header={<Typography variant='h5'>Última atualização</Typography>}
                body={<LastUpdate date={values.date} hour={values.time}  />}
                gridSize={3}
                bodyHeight={350}
              />
              {condutivity &&
                <Card 
                
                  header={
                    <Grid container  justify="space-between" style={{width:'80%'}} >
                      <Typography variant='h5'>Nível de contaminação</Typography> 
                      <CustomHeaderMenu  onChange={(value) => setCondutivityInterval(value) } />
                    </Grid>
                  }
                  body={<MyResponsiveLine data={condutivity[condutivityInterval]} dateInterval={condutivityInterval} limiar={0.5} />}
                  gridSize={6}
                  bodyHeight={350}
                />
              }
              <Card 
                header={<Typography variant='h5'>Alerta de vazamento</Typography>}
                body={ <Alert alert={alert} buttonStyle={classes.button}  handleAlert={e => handleSendEmail()} name={sensorName} stationName={station.name} stationId={station.id} /> }
                bodyHeight={350}
                gridSize={3}
              />          
            </Grid>
            <Grid container item spacing={2} md={12} direction="row">
              <Card 
                header={<Typography variant='h5'>Concentração de poluentes</Typography>}
                body={ <HorizontalBar percentage={values.voc} limit={100}  />}
                gridSize={5}
                bodyHeight={150}
              />
              <Card 
                header={<Typography variant='h5'>Temperatura</Typography>}
                gridSize={2}
                bodyHeight={150}
                body={ <Thermometer temperature={values.temperature} limit={40}   />}
              />
              <Card 
                header={<Typography variant='h5'>pH</Typography>}
                gridSize={5}
                body={<PhBar ph={values.ph} limit_up={8} limit_down={4}  />}
                bodyHeight={150}
                minWidth={500}
              />
              {pressure &&
              <Card 
                header={
                  <Grid container  justify="space-between" style={{width:'80%'}} >
                    <Typography variant='h5'>Pressão</Typography> 
                    <CustomHeaderMenu  onChange={(value) => setPressureInterval(value) } />
                  </Grid>
                }
                body={<LineChart limiar={15} data={pressure[pressureInterval]} dateInterval={pressureInterval}  legend={'KPA'}  />}
                gridSize={4}
              />
              }
              {turbidity &&
              <Card 
                header={
                  <Grid container  justify="space-between" style={{width:'80%'}} >
                    <Typography variant='h5'>Turbidez</Typography> 
                    <CustomHeaderMenu  onChange={(value) => setTurbidityInterval(value) } />
                  </Grid>
                }
                body={<LineChart limiar={15} data={turbidity[turbidityInterval]} dateInterval={turbidityInterval} legend={'NTU'}  />}
                gridSize={4}
              />
              } 
              {salinity &&
                <Card 
                  header={
                    <Grid container  justify="space-between" style={{width:'80%'}} >
                      <Typography variant='h5'>Salinidade</Typography> 
                      <CustomHeaderMenu  onChange={(value) => setSalinityInterval(value) } />
                    </Grid>
                  }
                  body={<LineChart limiar={15} data={salinity[salinityInterval]} dateInterval={salinityInterval} legend={'%'}  />}
                  gridSize={4}
                />          
              } 
            </Grid>
          </Grid>
        </Grid>
    );
  }
  return null;
}
const Alert = ({alert, text, buttonStyle, handleAlert, stationId, name, stationName}) => {
  let history = useHistory();

  if(alert){
    return (
      <Grid container justify="center">
        <AlertsCard status={'danger'} text={"Atenção! Possível vazamento detectado."}  />
        <SendAlert name={name} stationId={stationId} stationName={stationName} />
      </Grid>
    )
  } else {
    return (
      <Grid container justify="center">
        <AlertsCard status={'clear'} text={"Nenhuma ameaça de vazamento detectada"} />
        <Button variant="contained" color="primary" onClick={() => history.push('/alert')} disableElevation className={buttonStyle}>
          Histórico de alertas
        </Button>
      </Grid>
    )
  }
}
const CustomMenu = (prop) => {
  const useStyles = makeStyles(theme => ({
    button : {
      color: 'white',
      textAlign: 'center',
      backgroundColor: '#60B565',
      height: '36px',
      width: '138px',
      marginRight: '10px',
      '&:hover' : {
        backgroundColor: '#0C5456',
      },
    },
  }));
  const { sensor } = prop;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        className={classes.button} 
        onClick={handleClick}
        endIcon={<ExpandMoreIcon fontSize="large"/>}
        >
        Enviar dados
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <SendData open={false} sensor={sensor} />
        <SendFile open={false} sensor={sensor} />
      </Menu>
    </>
  )
}
const CustomHeaderMenu = (prop) => {

  const {onChange} = prop
  const useStyles = makeStyles(theme => ({
    select: {
      backgroundColor: '#fff',
      borderRadius: '3px',
      width:'96px',
      height: '36px',
      textAlign:'center',
      marginLeft: '20px',
      fontSize: '12px',
    },
  }));
  const classes = useStyles();
  
  return (
    <Select
    {...prop}
    className={classes.select}
    defaultValue='today'
    onChange={(event)=> onChange(event.target.value)}
    input={<Input className={classes.input} disableUnderline />}
    >
    <MenuItem value='today'>Hoje</MenuItem>
    <MenuItem value='threeDays'>Últimos 3 dias</MenuItem>
    <MenuItem value='sevenDays'>Últimos 7 dias</MenuItem>
  </Select>
  )
}
const pxToMm = (px) => {
  return Math.floor(px/document.getElementById('myMm').offsetHeight);
};

const mmToPx = (mm) => {
  return document.getElementById('myMm').offsetHeight*mm;
};
const PrintButton = ({id}) => {
  const useStyles = makeStyles(theme => ({
    button: {
      color: 'white',
      textAlign: 'center',
      backgroundColor: '#349698', 
      borderRadius: '3px',  height: '36px',
      width: '138px',
      marginRight: '10px',
        '&:hover' : {
          backgroundColor: '#0C5456',
        },
      }
  }));
  const classes = useStyles();

  const pdfGenerate = () => {
    const input = document.getElementById(id);
    const inputHeightMm = pxToMm(input.offsetHeight);
    const inputWidthMm = pxToMm(input.offsetWidth);
    html2canvas(input,{ allowTaint: true, useCORS: true, onrendered: function (canvas) {} } )
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({orientation: 'landscape'}, 'mm', [inputHeightMm, inputWidthMm +20]);
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save(`${id}.pdf`);
      });
    ;
  }
  return (
    <>
      <div id="myMm" style={{height: "1mm"}} />
      <Button
      startIcon={<GetAppIcon/>}
      contained
      color="primary"
      className={classes.button}
      onClick={() => pdfGenerate()}
      >
        Exportar gráficos
      </Button>
  </>
  )
}

const KeysButton = (prop) => {
  const useStyles = makeStyles(theme => ({
    keyButton : {
      textTransform: 'none',
      fontFamily: 'hind',
      fontWeight: '100',
      backgroundColor: '#53B7B9',
      minHeight: '36px',
      minWidth:'36px',
      marginLeft: '20px',
    },
    gridOption: {
      maxWidth:"none",
      width: '100%'
    },
    gridContent: {
      border: '1px solid #9D9D9C',
      borderRadius: '3px',
      maxWidth:"none",
      width: '100%',
      padding: '20px',
    },
    cardBar: {
      width: '0px',
      height: "30px",
      border: "3px solid #349698",
      opacity: "1",
      borderRadius: '20px',
    },
    title: {
      marginLeft: '20px',
    },
    inputButton: {
      marginTop: '20px',
      width: '168px',
    },
  }));
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const {name, sensors} = prop
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Button 
    variant="contained" 
    color="primary" 
    disableElevation 
    className={classes.keyButton}
    onClick={()=>handleClickOpen()}
   >
     <VpnKeyIcon/>
   </Button>
   <ModalGeneric 
    open={open} 
    onClose={()=>handleClose()}
    width={700}
    height={500}
   >
    <Grid container direction="column" style={{width: '100%'}}>
      <Grid container item xs={2} direction="row" alignItens="center" className={classes.gridOption}>
        <div className={classes.cardBar}/>
        <Typography variant='h4' className={classes.title}>Posto{name}</Typography>
      </Grid>
      <Grid item xs={7} className={classes.gridContent}>
        <Typography >Chaves de acesso dos sensores</Typography>
        <Grid style={{ height: '200px',overflowY: 'scroll', marginTop: '10px'}}>
          {sensors.map((val,key) => {
            return (
              <KeyRow  keys={key} code={val.access_key}/>
            )
          })}
        </Grid>
      </Grid>
      <Grid item xs={2} className={classes.gridOption} style={{textAlign: 'end'}}>
        <Button 
          variant="contained" 
          color="primary"  
          onClick={()=>handleClose()}
          className={classes.inputButton}
          >Ok
        </Button>
      </Grid>
    </Grid>   
  </ModalGeneric> 
   </>
  )
}
const KeyRow = (prop) => {

  const useStyles = makeStyles(theme => ({
    container : {
      marginTop: '20px',
    },
    key : {
      backgroundColor: '#53B7B9',
      borderRadius: '3px',
      color: 'white',
      width: '48px',
      height:'24px',
      fontSize: '16px',
      textAlign: 'center',
      maxWidth:"none",
    },
    code: {
      color: '#5D5D5D',
      fontWeight: '100',
      marginLeft: '20px',
    }
  }));
  const classes = useStyles();
  const {keys, code} = prop

return (
  <Grid container direction="row" className={classes.container}>
    <Grid className={classes.key}>PM {keys+1}</Grid>
    <Typography className={classes.code}>{code}</Typography>
  </Grid>
)

}
const SendAlert = (prop) => {
  const useStyles = makeStyles(theme => ({
    button : {
      color: 'white',
      textAlign: 'center',
      height: '36px',
      width: '240px',
      marginTop: '10px',
      '&:hover' : {
        backgroundColor: '#0C5456',
      },
    },
    gridOption: {
      maxWidth:"none",
      width: '100%',
      padding: '1%',
    },
    gridContent: {
      maxWidth:"none",
      width: '100%',
      padding: '5px',
      backgroundColor:'#F8F8F8',
      height: '200px',
      overflowY: 'scroll',
    },
    emailInputs: {
      maxWidth:"none",
      height: '50px',

      width: '100%',
      padding: '5px',
      backgroundColor:'#F8F8F8',
    },
    cardBar: {
      width: '0px',
      height: "30px",
      border: "3px solid #349698",
      opacity: "1",
      borderRadius: '20px',
    },
    title: {

      maxWidth:"none",
      textAlign: 'center',
      fontSize: '38px',
    },
    subTitle: {
      maxWidth:"none",
      marginLeft: '2px',
      color: '#349698',
      fontSize: '20px',
    },
    label: {
      fontSize: '16px',
    },
    tipLabel: {
      fontSize: '11px',
    },
    input: {
      backgroundColor: '#F8F8F8',
      color: '#53B7B9',
      width:'100%',
      textAlign:'center',
  },
    inputButton: {
      marginTop: '20px',
      height: 'fit-content',
      width: '168px',
    },
    returnButton: {
      marginTop: '20px',
      width: '168px',
      backgroundColor:'white',
      height: 'fit-content',
  },
  }));
  const [open, setOpen] = React.useState(false);
  const [emails, setEmails] = React.useState([]);
  const [emailInput, setEmailInput] = React.useState('');
  const [values, setValues] = React.useState(false);
  const classes = useStyles();
  const {name, sensors, stationId, stationName} = prop
  
  React.useEffect(() => {
    getData()
  },[]);
  
  const getData = () => {
      api.get(`master/station/getUsersEmails/${stationId}`,{
        headers: authHeader(), 
      }).then(res => {
        setValues(res.data.data)
      });
       
    }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (value) => {
    setEmails(value)
  }
  const handleSendEmail = (value) => {
    var emailList = ''
    emails.map(email => {
      if(emailList){
        emailList = `${emailList},${email.email}`
      }else {
        emailList = `${email.email}`
      }
    })
    var emailList = `${emailList},${emailInput}`

    api.post(`master/sendEmail/`,
    {
      station_name: stationName,
      sensor_name:       name,
      email:        emailList,
    },{
      headers: authHeader(), 
    }).then(res => {
      handleClose()
    });

  }
  const handleInputChange = (value) => {
    setEmailInput(value)
  }


  if (values){
  return (
    <>
    <Button 
    variant="contained" 
    color="primary" 
    disableElevation 
    className={classes.button}
    onClick={()=>handleClickOpen()}
   >
     Enviar alerta
   </Button>
   <ModalGeneric 
    open={open} 
    onClose={()=>handleClose()}
    width={948}
    height={600}
   >
    <Grid container direction="column" style={{width: '100%'}}>
      <Grid container item xs={2} direction="row" className={classes.gridOption}>
        <Typography className={classes.title}>Enviar alerta de vazamento</Typography>
        <Typography className={classes.subTitle}>Selecione os usuários a serem notificados</Typography>
      </Grid>
      <Grid item xs={7} className={classes.gridOption}>
        <Typography container item color="primary" className={classes.label}>Lista de usuários vinculados ao posto</Typography>
        <Grid container xs={8} className={classes.gridContent}>
          <CheckboxList data={values} onChange={ value => handleChange(value)}/>
        </Grid>
        <Typography container item color="primary" className={classes.label} style={{marginTop: '10px'}}>Adicionar outros contatos</Typography>
        <Input className={classes.input} value={emailInput} onChange={(e)=> handleInputChange(e.target.value)} disableUnderline />
        <Typography container item color="primary" className={classes.tipLabel}>Insira e-mails seguidos por vírgula. (Ex: Pedro@email,Jose@email)</Typography>
      </Grid>
      <Grid container item xs={2} className={classes.gridOption} justify="space-between">
        <Button 
          variant="outlined"
          color="primary"
          onClick={() => handleClose()}
          className={classes.returnButton}
        >Cancelar</Button>
        <Button 
          variant="contained" 
          color="primary"  
          onClick={()=>handleSendEmail()}
          className={classes.inputButton}
          >Enviar
        </Button>
      
      </Grid>
    </Grid>   
  </ModalGeneric> 
   </>
  )}
  return null
}
const SendFile = (prop) => {
  const useStyles = makeStyles(theme => ({
    button : {
      color: 'white',
      textAlign: 'center',
      height: '36px',
      width: '240px',
      marginTop: '10px',
      '&:hover' : {
        backgroundColor: '#0C5456',
      },
    },
    gridOption: {
      maxWidth:"none",
      width: '100%',
      padding: '1%',
    },
    gridContent: {
      maxWidth:"none",
      width: '100%',
      padding: '5px',
      backgroundColor:'#F8F8F8',
      height: '200px',
      overflowY: 'scroll',
    },
    emailInputs: {
      maxWidth:"none",
      height: '50px',

      width: '100%',
      padding: '5px',
      backgroundColor:'#F8F8F8',
    },
    cardBar: {
      width: '0px',
      height: "30px",
      border: "3px solid #349698",
      opacity: "1",
      borderRadius: '20px',
    },
    title: {
      maxWidth:"none",
      textAlign: 'center',
      fontSize: '30px',
    },
    subTitle: {
      maxWidth:"none",
      marginLeft: '2px',
      color: '#349698',
      fontSize: '20px',
    },
    label: {
      fontSize: '16px',
    },
    tipLabel: {
      fontSize: '11px',
    },
    input: {
      backgroundColor: '#F8F8F8',
      color: '#53B7B9',
      width:'60%',
      textAlign:'center',
      marginLeft: '5px',
  },
  searchButton: {
    width: '60px',
    padding: 'none',
    
  },
    inputButton: {
      marginTop: '20px',
      height: 'fit-content',
      width: '168px',
    },
    returnButton: {
      marginTop: '20px',
      width: '168px',
      backgroundColor:'white',
      height: 'fit-content',
  },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [file, setFile] = React.useState('a');
  let { id } = useParams();
  let history = useHistory();
  const { sensor } = prop;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseModal = () => {
    setConfirmationModal(false);
    window.location.reload()
  }

  const sendData = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sensor_id', sensor);
    api.post(`master/sensor/csvImport/`,formData,{
      headers: {
        Authorization: `Bearer ${authenticationService.currentUserValue.token}`,
        'Content-Type': 'multipart/form-data',
      } 
    }).then(res => {
      handleClose()
      setConfirmationModal(true);
    });
  }
  const inputFile = React.useRef(null) 
  const onButtonClick = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
   console.log(inputFile.current.files);
  };
  const onChangeHandler= event =>{
    setFile(event.target.files[0])
    console.log(event.target.files);

  }
  return (
    <>
    <MenuItem onClick={()=>{handleClickOpen()}}>Arquivo CSV</MenuItem>

    <ModalSucess 
      open={confirmationModal}
      title="Dados enviados com sucesso!"
      onClose={handleCloseModal}
    />
      <ModalGeneric 
        open={open} 
        onClose={()=>handleClose()}
        width={600}
        height={400}
      >
      <Grid container direction="column" style={{width: '100%'}}>
        <Grid container item xs={4} direction="row" className={classes.gridOption}>
          <Typography className={classes.title}>Enviar dados por arquivo CSV</Typography>
        </Grid>
        <Grid item xs={4} direction="row" justify="center" className={classes.gridOption}>
          <input type='file' id='file' accept=".csv" ref={inputFile} style={{display: 'none'}} onChange={(e) => onChangeHandler(e)}/>
          <Button color="primary"  variant="contained"  onClick={onButtonClick} className={classes.searchButton}><FindInPageIcon /></Button>
          <Input className={classes.input} disableUnderline value={file.name} disabled/>
        </Grid>
        <Grid container item xs={4} className={classes.gridOption} justify="space-between">
          <Button 
            variant="outlined"
            color="primary"
            onClick={handleClose}
            className={classes.returnButton}
          >Cancelar</Button>
          <Button 
            variant="contained" 
            color="primary"  
            onClick={()=>sendData()}
            className={classes.inputButton}
            >Enviar
          </Button>
        </Grid>
      </Grid>   
    </ModalGeneric> 
  </>
  )
}
const SendData = (prop) => {
  const useStyles = makeStyles(theme => ({
    button : {
      color: 'white',
      textAlign: 'center',
      height: '36px',
      width: '240px',
      marginTop: '10px',
      '&:hover' : {
        backgroundColor: '#0C5456',
      },
    },
    gridOption: {
      maxWidth:"none",
      width: '100%',
      padding: '1%',
    },
    gridContent: {
      maxWidth:"none",
      width: '100%',
      padding: '5px',
      backgroundColor:'#F8F8F8',
      height: '200px',
      overflowY: 'scroll',
    },
    emailInputs: {
      maxWidth:"none",
      height: '50px',

      width: '100%',
      padding: '5px',
      backgroundColor:'#F8F8F8',
    },
    cardBar: {
      width: '0px',
      height: "30px",
      border: "3px solid #349698",
      opacity: "1",
      borderRadius: '20px',
    },
    title: {
      maxWidth:"none",
      textAlign: 'center',
      fontSize: '30px',
    },
    subTitle: {
      maxWidth:"none",
      marginLeft: '2px',
      color: '#349698',
      fontSize: '20px',
    },
    label: {
      fontSize: '16px',
    },
    tipLabel: {
      fontSize: '11px',
    },
    input: {
      backgroundColor: '#F8F8F8',
      color: '#53B7B9',
      width:'60%',
      textAlign:'center',
      marginLeft: '5px',
    },
    inputButton: {
      marginTop: '20px',
      height: 'fit-content',
      width: '168px',
    },
    returnButton: {
      marginTop: '20px',
      width: '168px',
      backgroundColor:'white',
      height: 'fit-content',
  },
  }));
  const classes = useStyles();
  const [dateTime, setDateTime] = React.useState(null);
  const [values, setValues] = React.useState({
    condutivity: '',
    voc: '',
    temperature: '',
    pressure: '',
    ph:'',
    salinity: '',
    turbidity: '',
    alert,
  });
  const [open, setOpen] = React.useState('');
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [file, setFile] = React.useState('a');
  const { register, handleSubmit, setValue} = useForm()
  const { sensor } = prop;

  const handleChange = name => event => {
    console.log(values)
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseModal = () => {
    setConfirmationModal(false);
    window.location.reload()
  }

  const sendData = () => {
    
    api.post(`master/sensor`,{
    ...values,
    created_at: dateTime,
    sensor_id: sensor,
    },{
      headers: authHeader(), 
    }).then(res => {
      handleClose()
      setConfirmationModal(true);
    });
  }
  return (
    <>
    <MenuItem onClick={()=>{handleClickOpen()}}>Manualmente</MenuItem>

    <ModalSucess 
      open={confirmationModal}
      title="Dados enviados com sucesso!"
      onClose={handleCloseModal}
    />
      <ModalGeneric 
        open={open} 
        onClose={()=>handleClose()}
        width={900}
        height={500}
      >
      <Grid container direction="column" style={{width: '100%'}}>
        <Grid container item xs={2} direction="row" className={classes.gridOption}>
          <Typography className={classes.title}>Enviar dados</Typography>
        </Grid>
        <Grid item xs={8} direction="row" justify="center" className={classes.gridOption}>
          
          <DateTimePicker 
            width={'26%'}
            value={dateTime}
            label="Data e hora"
            onChange={(value) => setDateTime(value)}
          />
         <CustomInput
          type="number"
          width={'26%'}
          defaultValue={values.condutivity}
          label="Condutividade"
          name="condutivity"
          inputRef={register}
          onChange={handleChange('condutivity')}
        />
         <CustomInput
          type="number"
          width={'26%'}
          defaultValue={values.voc}
          label="Voc"
          name="voc"
          inputRef={register}
          onChange={handleChange('voc')}
        />
         <CustomInput
          type="number"
          width={'26%'}
          defaultValue={values.temperature}
          label="Temperatura"
          name="temperature"
          inputRef={register}
          onChange={handleChange('temperature')}
        />
         <CustomInput
          type="number"
          width={'26%'}
          defaultValue={values.pressure}
          label="Pressão"
          name="pressure"
          inputRef={register}
          onChange={handleChange('pressure')}
        />
         <CustomInput
          type="number"
          width={'26%'}
          defaultValue={values.ph}
          label="Ph"
          name="ph"
          inputRef={register}
          onChange={handleChange('ph')}
        />
        <CustomInput
          type="number"
          width={'26%'}
          defaultValue={values.salinity}
          label="Salinidade"
          name="salinity"
          inputRef={register}
          onChange={handleChange('salinity')}
        />
           
          <CustomInput
          type="number"
          width={'26%'}
          defaultValue={values.turbidity}
          label="Turbidez"
          name="turbidity"
          inputRef={register}
          onChange={handleChange('turbidity')}
        />
         <CustomInput
          type="number"
          width={'26%'}
          defaultValue={values.alert}
          label="Alerta"
          name="alert"
          inputRef={register}
          onChange={handleChange('alert')}
        />
        </Grid>
        <Grid container item xs={2} className={classes.gridOption} justify="space-between">
          <Button 
            variant="outlined"
            color="primary"
            onClick={handleClose}
            className={classes.returnButton}
          >Cancelar</Button>
          <Button 
            variant="contained" 
            color="primary"  
            onClick={()=>sendData()}
            className={classes.inputButton}
            >Enviar
          </Button>
        </Grid>
      </Grid>   
    </ModalGeneric> 
  </>
  )
}

export default withStyles(styles)(withRouter(Station));
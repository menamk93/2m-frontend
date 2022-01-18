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
import GetAppIcon from '@material-ui/icons/GetApp';
import api from '../../../../services/api'
import authHeader from '../../../../helpers/authHeader'
import handleResponse from '../../../../helpers/handleResponse'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  withRouter,
  useHistory,
} from "react-router-dom";

function Station (props){
  const {classes} = props

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
    api.get(`currentStation`,{
      headers: authHeader(), 
    }).then(res => { 
      setStation(res.data.data)
    }).catch(error => handleResponse(error.response, props))
  };

  const getSensors = () => {
    api.get(`sensors`,{
      headers: authHeader(), 
    }).then(res => { 
      setSensors(res.data.data)
      setSensor(res.data.data[0].id)
      setSensorName(res.data.data[0].name)
    }).catch(error => handleResponse(error.response, props))
  };
  const getData = () => {
    api.get(`sensor/showByDate/${sensor}`,{
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
    api.get(`alert/getAlertFromSensor/${sensor}`,{
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
        <Grid container className={classes.container}>
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
            </Grid>
            <Grid container xs={4} justify="flex-end" style={{paddingRight:'16px'}}>
            <PrintButton id={'comp'} />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.body} id={'comp'}> 
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
                  body={<MyResponsiveLine data={condutivity[condutivityInterval]} dateInterval={condutivityInterval} limiar={2} />}
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

const Alert = ({alert,  buttonStyle}) => {
  let history = useHistory();

  if(alert){
    return (
      <Grid container justify="center">
        <AlertsCard status={'danger'} text={"Atenção! Possível vazamento detectado."}  />
          <Button variant="contained" color="primary" disableElevation className={buttonStyle}  onClick={()=>  history.push('/alert')}>
            Histórico de alertas
          </Button>
      </Grid>
    )
  } else {
    return (
      <Grid container justify="center">
        <AlertsCard status={'clear'} text={"Nenhuma ameaça de vazamento detectada"} />
        <Button variant="contained" color="primary" disableElevation className={buttonStyle} onClick={()=> history.push('/alert')}>
          Histórico de alertas
        </Button>
      </Grid>
    )
  }
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



export default withStyles(styles)(withRouter(Station));
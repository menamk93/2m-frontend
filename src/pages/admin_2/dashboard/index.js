import React from 'react';
import styles from './styles';
import { Typography, withStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ResponsivePie from '../../../components/charts/pie';
import ResponsiveBar from '../../../components/charts/bars';
import Card from '../../../components/card';
import ColumnCard from '../../../components/columnCard';
import CardHeader from '../../../components/cardHeader';
import AlertsCard from '../../../components/alertsCard';
import {
  withRouter,
} from 'react-router-dom';
import api from '../../../services/api'
import handleResponse from '../../../helpers/handleResponse'
import authHeader from '../../../helpers/authHeader'

function Dashboard(props) {
  
  const [values, setValues] = React.useState({
    currentUser: JSON.parse(localStorage.getItem('currentUser')),
  });
  
  const [data, setData] = React.useState();
  const [alert, setAlert] = React.useState(false)

  React.useEffect(() => {
    getData()
    getAlerts()
  },[]);

  const getData = () =>{
    api.get(`adminTwo/company/dashboardData`,{
      headers: authHeader(), 
    }).then(res => {
      setData(res.data.data)
      console.log(res.data.data);
    }).catch(error => handleResponse(error.response, props ))
  };
  const getAlerts = () => {
    api.get(`adminTwo/alert/getAlertFromCompany`,{
      headers: authHeader(), 
    }).then(res => {
      if(res.data.data.length != 0) {
        setAlert(true)
      }
    })
  }
    const {classes} = props;
    return (
      <Grid container className={classes.container}>
        <Grid container className={classes.containerTitle}>
          <Typography variant='h3' className={classes.title}>Olá, {values.currentUser.name}!</Typography>
          <Typography variant='h5' className={classes.subtitle}>Confira as atualizações do seus indicadores hoje.</Typography> 
        </Grid>
        {data &&
        <Grid container spacing={2} className={classes.body}> 
          <Grid container item spacing={2} md={9} direction="row">
            <Card 
              header={
                <Typography variant='h5'>Número de postos</Typography>}
              body= { <ResponsivePie data={data.stations}  total={data.stations_count}/> }
              gridSize={6}
              minWidth={400}
            />
            <Card 
              header={
                <Typography variant='h5'>Número de poços</Typography>}
              body= { <ResponsivePie data={data.sensors}  total={data.sensors_count} /> }
              gridSize={6}
              minWidth={400}
            />
            <Card 
              header={ <CardHeader /> }
              body= { <ResponsiveBar data={data.users} /> }
              gridSize={12}
              minWidth={400}
            />          
          </Grid>
          <Grid container item md={3}>   
            <ColumnCard 
                header={<Typography variant='h5'>Alerta de vazamento</Typography>}
                body={ <Alert alert={alert} buttonStyle={classes.button} /> }
                gridSize={12}
                minWidth={400}
                />         
            </Grid>
        </Grid>
        }
      </Grid>
    );
}


const Alert = ({alert}) => {

  if(alert){
    return (
      <Grid container justify="center">
        <AlertsCard status={'danger'} text={"Atenção! Possível vazamento detectado."}  />
      </Grid>
    )
  } else {
    return (
      <Grid container justify="center">
        <AlertsCard status={'clear'} text={"Nenhuma ameaça de vazamento detectada"} />
      </Grid>
    )
  }
}

export default withStyles(styles)(withRouter(Dashboard));
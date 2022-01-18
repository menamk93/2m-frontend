import React, { Component } from 'react';
import styles from './styles';
import { Typography, withStyles, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ResponsivePie from '../../components/charts/pie';
import ResponsiveBar from '../../components/charts/bars';
import Card from '../../components/card';
import ColumnCard from '../../components/columnCard';
import CardHeader from '../../components/cardHeader';
import AlertsCard from '../../components/alertsCard';
import HorizontalBar from '../../components/horizontalBar';
import Thermometer from '../../components/thermometer';
import PhBar from '../../components/phBar';
import LineChart from '../../components/lineChart';
import LastUpdate from '../../components/lastUpdate';
import MyResponsiveLine from '../../components/MyResponsiveLine';
import {
  withRouter,
} from 'react-router-dom';

class station extends Component {
  
  state = { 
    firstName: 'Station',
    text: 'Nenhum vazamento detectado',
    lastUpdate: '10 de dezembro de 2019',
    status: 'clear',
  }
  

  render() {
    const {classes} = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid container className={classes.containerTitle}>
          <Typography variant='h3' className={classes.title}>Olá, {this.state.firstName}!</Typography>
          <Typography variant='h5' className={classes.subtitle}>Confira as atualizações do seus indicadores hoje.</Typography> 
        </Grid>
        <Grid container spacing={2} className={classes.body}> 
          <Grid container item spacing={2} md={12} direction="row">
            <Card 
              header={<Typography variant='h5'>Última atualização</Typography>}
              body={<LastUpdate />}
              gridSize={3}
              bodyHeight={350}
            />
            <Card 
              header={<Typography variant='h5'>Nível de contaminação</Typography>}
              body={<MyResponsiveLine/>}
              gridSize={6}
              bodyHeight={350}
            />
            <Card 
              header={<Typography variant='h5'>Alerta de vazamento</Typography>}
              body={ <Alert status={this.state.status}text={this.state.text} buttonStyle={classes.button} /> }
              bodyHeight={350}
              gridSize={3}
            />          
          </Grid>
          <Grid container item spacing={2} md={12} direction="row">
            <Card 
              header={<Typography variant='h5'>Concentração de poluentes</Typography>}
              body={ <HorizontalBar />}
              gridSize={5}
              bodyHeight={150}
            />
            <Card 
              header={<Typography variant='h5'>Temperatura</Typography>}
              gridSize={2}
              bodyHeight={150}
              body={ <Thermometer />}
            />
            <Card 
              header={<Typography variant='h5'>pH</Typography>}
              gridSize={5}
              body={<PhBar />}
              bodyHeight={150}
              minWidth={500}
            />
            <Card 
              header={<Typography variant='h5'>Pressão</Typography>}
              body={<LineChart limiar={15} legend={'KPA'}  />}
              gridSize={4}
            />
            <Card 
              header={<Typography variant='h5'>Turbidez</Typography>}
              body={<LineChart limiar={15} legend={'NTU'}  />}
              gridSize={4}
            />
            <Card 
              header={<Typography variant='h5'>Salinidade</Typography>}
              body={<LineChart limiar={15} legend={'%'}  />}
              gridSize={4}
            />           
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const Alert = ({status, text, buttonStyle}) => {
  return (
    <Grid container justify="center">
      <AlertsCard status={status} text={text} />
      <Button variant="contained" color="primary" disableElevation className={buttonStyle}>
        Histórico de alertas
      </Button>
    </Grid>
  )
}


export default withStyles(styles)(withRouter(station));
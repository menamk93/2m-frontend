import React, { Component } from 'react';
import styles from './styles';
import { Typography, withStyles } from '@material-ui/core';
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

const data = [
  {
    "id": "sass",
    "label": "sass",
    "value": 216,
  },
  {
    "id": "stylus",
    "label": "stylus",
    "value": 312,
  },
  {
    "id": "java",
    "label": "java",
    "value": 103,
  },
  {
    "id": "scala",
    "label": "scala",
    "value": 418,
  }
];


const data_bar = [
  {
    "country": "Jan",
    "Administrador 2": 104,
    "Responsável Técnico": 62,
    "Administrador 1": 80,
  },
  {
    "country": "Fev",
    "Administrador 2": 151,
    "Responsável Técnico": 174,
    "Administrador 1": 7,

  },
  {
    "country": "Mar",
    "Administrador 2": 14,
    "Responsável Técnico": 159,
    "Administrador 1": 79,
  },
  {
    "country": "Abr",
    "Administrador 2": 104,
    "Responsável Técnico": 142,
    "Administrador 1": 127,
  },
  {
    "country": "Mai",
    "Administrador 2": 18,
    "Administrador 1": 120,
    "Responsável Técnico": 76,

  },
  {
    "country": "Jun",
    "Administrador 2": 40,
    "Administrador 1": 48,
    "Responsável Técnico": 124,
  
  },
  {
    "country": "Jul",
    "Administrador 2": 58,
    "Administrador 1": 183,
    "Responsável Técnico": 21,
  
  },
  {
    "country": "Ago",
    "Administrador 2": 58,
    "Administrador 1": 183,
    "Responsável Técnico": 21,
  
  },
  {
    "country": "Set",
    "Administrador 2": 58,
    "Administrador 1": 183,
    "Responsável Técnico": 21,
  
  },
  {
    "country": "Out",
    "Administrador 2": 0,
    "Administrador 1": 0,
    "Responsável Técnico": 21,
  
  },
  {
    "country": "Nov",
    "Administrador 2": 0,
    "Administrador 1": 183,
    "Responsável Técnico": 21,
  
  },
  {
    "country": "Dez",
    "Administrador 2": 58,
    "Administrador 1": 183,
    "Responsável Técnico": 0,
  },
]

class dashboard extends Component {
  
  state = { 
    firstName: 'Pedro',
    text: 'Nenhuma ameaça de vazamento detectada',
    lastUpdate: '10 de dezembro de 2019',
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
          <Grid container item spacing={2} md={9} direction="row">
            <Card 
              header={
                <Typography variant='h5'>Número de postos</Typography>}
              body= { <ResponsivePie data={data} /> }
              gridSize={6}
              minWidth={400}
            />
            <Card 
              header={
                <Typography variant='h5'>Número de poços</Typography>}
              body= { <ResponsivePie data={data} /> }
              gridSize={6}
              minWidth={400}
            />
            <Card 
              header={ <CardHeader /> }
              body= { <ResponsiveBar data={data_bar} /> }
              gridSize={12}
              minWidth={400}
            />          
          </Grid>
          <Grid container item md={3}>   
            <ColumnCard 
                header={ <Typography variant='h5'>Alertas de vazamento</Typography> }
                body= { <AlertsCard status={'clear'} text={this.state.text} lastUpdate={this.state.lastUpdate}  />}
                gridSize={12}
                minWidth={400}
              />         
            </Grid>
        </Grid>
      </Grid>
    );
  }
}


export default withStyles(styles)(withRouter(dashboard));
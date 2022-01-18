import React from 'react';
import {Grid, Typography, withStyles} from '@material-ui/core/';


import styles from './styles';

const cardHeader = props => {

  const { classes } = props;

    return (
      <Grid className={classes.container}>
        <Grid container item md={6} >
          <Typography variant='h5'>Número de usuários</Typography>
        </Grid>
        <Grid  container item md={6} className={ classes.legendContainer} >
          <Grid item className={classes.item}>  
            <div style={{ 
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              backgroundColor: '#0C5456',
              marginRight:'5px',
              }} 
            />
            <Typography variant='h8'>Administrador 2</Typography>
          </Grid>
          <Grid item className={classes.item}>  
            <div style={{ 
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              backgroundColor: '#53B7B9',
              marginRight:'5px',
              }} 
            />
            <Typography variant='h8'>Administrador 1</Typography>
          </Grid>
          <Grid item className={classes.item}>  
            <div style={{ 
              height: '10px',
              width: '10px',
              borderRadius: '50%',
              backgroundColor: '#8AD68E',
              marginRight:'5px',
              }} 
            />
            <Typography variant='h8'>Responsável Técnico</Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }
export default withStyles(styles)(cardHeader);

import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles, Grid, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles';

function TransitionsModal(props) {


  const {classes, width, height} = props;
  const [ openup, setOpenup] = React.useState(false);
  React.useEffect(() => {
    setOpenup(props.open)
    
  }, [props.open]);
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openup}
        onClose={() => props.handleClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openup}>
          <Grid container direction="column" justify="center" className={classes.paper} style={{width, height}}>
            <Grid container xs={2} style={{width: '100%', maxWidth:"none"}} >
              <Typography variant="h3" style={{fontWeight:'100'}}>Filtrar por</Typography>
            </Grid>
            <Grid container xs={7} style={{maxWidth: '100%'}}>
              {props.children}
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(TransitionsModal);

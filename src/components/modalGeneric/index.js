import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles, Grid, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles';

function ModalGeneric(props) {


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
        onClose={()=> props.onClose()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openup}>
          <Grid container className={classes.paper} style={{width, height}}>
            {props.children}
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}

export default withStyles(styles)(ModalGeneric);

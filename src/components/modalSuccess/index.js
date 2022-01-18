import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles, Grid, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles';
import { ReactComponent as Success } from '../../assets/success_sign.svg';
import PropTypes from 'prop-types';

function ModalSuccess(props) {

  const {classes, title, open,onClose } = props;
  const [ openup, setOpenup] = React.useState(true);
  React.useEffect(() => {
    setOpenup(open)
  }, [open]);
  
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openup}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openup}>
          <Grid container direction="column" justify="center" className={classes.paper}>
            <Grid container xs={6} justify="center" alignContent="center" style={{width: '100%', maxWidth:"none",alignItems:'center'}} >
                <Success/>
              <Typography variant="h4" style={{fontWeight:'100', alignContent:"center", marginLeft:10 }}>{title}</Typography>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}

ModalSuccess.propTypes = {
    classes: PropTypes.func.isRequired,
    title: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
};

export default withStyles(styles)(ModalSuccess);

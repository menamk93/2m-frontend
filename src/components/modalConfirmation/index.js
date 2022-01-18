import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './styles';
import { ReactComponent as Alert } from '../../assets/alert_sign.svg';
import PropTypes from 'prop-types';

function ModalConfirmation(props) {


  const {classes, handleConfirm, title, buttomName,open } = props;
  const [ openup, setOpenup] = React.useState(true);
  React.useEffect(() => {
    setOpenup(open)
  }, [open]);
  
  const handleClose = () => {
    setOpenup(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openup}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openup}>
          <Grid container direction="column" justify="center" className={classes.paper}>
            <Grid container xs={6} justify="center" alignContent="center" style={{width: '100%', maxWidth:"none",alignItems:'center'}} >
                <Alert/>
              <Typography variant="h5" style={{fontWeight:'100', alignContent:"center", marginLeft:10 }}>{title}</Typography>
            </Grid>
            <Grid container xs={6} justify="space-around" alignItems="center" style={{maxWidth: '100%'}}>
                <Button 
                    variant="outlined"
                    color="primary"
                    onClick={() => handleClose()}
                    className={classes.returnButton}
                >
                    Cancelar
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"  
                    className={classes.inputButton}
                    onClick={() => handleConfirm()}
                >
                    {buttomName}
                </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </div>
  );
}

ModalConfirmation.propTypes = {
    classes: PropTypes.func.isRequired,
    
    handleConfirm: PropTypes.func.isRequired,
    title: PropTypes.func.isRequired,
    buttomName: PropTypes.func,
    open: PropTypes.func.isRequired,
};
ModalConfirmation.defaultProps = {
    buttomName: "Confirmar",
};


export default withStyles(styles)(ModalConfirmation);

import React from 'react';
import styles from './styles';
import { 
  Grid,
  Card, 
  withStyles, 
  Table, 
  TableBody, 
  Button,
  TableCell, 
  TableContainer, 
  TableRow,
  Typography,
  Input,
  Select,
  MenuItem,
} from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import api from '../../../../services/api'
import handleResponse from '../../../../helpers/handleResponse'
import authHeader from '../../../../helpers/authHeader'
import {Pagination} from '@material-ui/lab';
import EnhancedTableHead from '../../../../components/enhancedTableHead';
import CustomModal from '../../../../components/modal';
import DataPicker from '../../../../components/dataPicker';
import brazilianStates from '../../../../helpers/brazilianStates';

const columns = [
  {
    id: 'alert_date',
    label: 'Data da ocorrência',
    format: value => value.toLocaleString(),
  },
  {
    id: 'normalization_date',
    label: 'Normalização',
    format: value => value.toLocaleString(),
  },
  {
    id: 'sensor',
    label: 'Poço afetado',
    format: value => value.toLocaleString(),
  },
];

function Users(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('created_at');
  const [page, setPage] = React.useState(1);
  const [update, setUpdate] = React.useState(0);
  const [city, setCity] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [searchBar, setSearchBar] = React.useState('');
  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);
  const [numPages, setnumPages] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);


  React.useEffect(() => {
    getData(selectedFromDate,selectedToDate,city, state, orderBy, order)
  },[page, orderBy, order, update,searchBar]);
  
  const {classes} = props;
  let history = useHistory();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const  handleClose= () => {
    setOpen(false);
  };    
  const handleToDateChange = date => {
    setSelectedToDate(date);
  };
  const handleFromDateChange = date => {
    setSelectedFromDate(date);
  };

  const handleSearch = () => {
    setUpdate(update+1)
    setOpen(false)
  }
  const getData = (date_start,date_end,city, state,label="created_at", order="asc" ) =>{
    var data = {label, order}
    date_start && (data['date_start'] = date_start)
    date_end && (data['date_end'] =(date_end))
    state && (data['state'] =(state))
    city && (data['city'] =(city))
    data['corporate_name'] = searchBar

    api.post(`alert/listWithOrder/?page=${page}`, data,
    {
      headers: authHeader(), 
    })
    .then(res => {
      setRows(res.data.data)
      setPage(res.data.current_page)
      setnumPages(res.data.last_page)
    })
    .catch(error => handleResponse(error.response, props ))
  }
  const handleChangeState = data => {
    setState(data)
  }
  const handleChangeCity = data => {
    if (data == ''){
      return setCity(null);
    }
    return setCity(data)
    
  }
    return (
      <Grid container className={classes.container}>
        <CustomModal open={open} handleClose={() => handleClose()} width={'40%'} height={'40%'} >
          <Grid container >
            <Grid xs="4" item >
              <Typography color="primary" variant="h7">Período de cadastro</Typography>
                <Grid container direction="row" alignItems="center"> 
                  <Grid container xs="2">
                    <Typography>De</Typography>
                  </Grid>
                  <Grid container xs="10">
                    <DataPicker 
                      value={selectedFromDate}
                      onChange={(value) => handleFromDateChange(value)}
                    />
                   </Grid>
                </Grid>
                <Grid container direction="row" alignItems="center" style={{marginTop:'5%'}}> 
                  <Grid container xs="2">
                    <Typography>Até</Typography>
                  </Grid>
                  <Grid container xs="10">
                    <DataPicker 
                        value={selectedToDate}
                        onChange={(value) => handleToDateChange(value)}
                      />
                   </Grid>
                </Grid>
              </Grid>
            <Grid xs="4" container item direction="column" alignItems="center" >
              <Grid container direction="column" style={{marginLeft:'20%'}}>
                <Typography color="primary" variant="h7">Estado</Typography>
                <Select
                defaultValue={'Selecione'}
                onChange={event => handleChangeState(event.target.value)}
                input={<Input className={classes.filterInput} disableUnderline style={{width:'60%'}} />}
                >
                  <MenuItem value={'Selecione'} disabled>Selecione</MenuItem>
                  {brazilianStates.map(row => {
                    return (
                    <MenuItem value={row.value}>{row.label}</MenuItem>
                    )
                  })}
                </Select>
              </Grid>
            </Grid>
            <Grid xs="4" container  item direction="column" alignItems="center" >
              <Grid container item direction="column">
                <Typography color="primary" variant="h7">Cidade</Typography>
                <Input
                  className={classes.input}
                  placeholder="ex: Recife"
                  onChange={event => handleChangeCity(event.target.value)}
                  value={city}
                  disableUnderline
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="space-between">
            <Button 
              variant="outlined"
              color="primary"
              className={classes.returnButton}
              onClick={() => handleClose()}
              >Cancelar
            </Button>
            <Button 
              variant="contained" 
              color="primary"  
              className={classes.inputButton}
              onClick={handleSearch}
              >Buscar
            </Button>
          </Grid>
        </CustomModal>

        <Grid container className={classes.containerTitle}>
          <Typography variant='h3' className={classes.title}>Alertas</Typography>
        </Grid>
        <Grid container spacing={2} className={classes.body}> 
          <Grid container>
          <Card className={classes.root}>
            <TableContainer className={classes.tableContainer}>
              <Table stickyHeader aria-label="sticky table">
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  columns={columns}
                />
                <TableBody>
                  {rows.map(row => {
                    return (
                      <TableRow hover  key={row.code} className={classes.tableRow}>
                        <TableCell
                          align="left"
                          className={classes.tableWhiteRow, classes.columnItems2}
                          width={1}
                        />
                          <TableCell  className={classes.columnItems}>
                          {row.created_at}
                          </TableCell>
                          <TableCell  className={classes.columnItems}>
                            {row.normalization_date}
                          </TableCell>
                          <TableCell  className={classes.columnItems}>
                            {row.name}
                          </TableCell>
                          
                        <TableCell
                          align="right"
                          className={classes.tableWhiteRow, classes.columnItems2}
                          width={1}
                        />
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>     
          </Card>
          <Grid container direction="row">
            <Grid container xs={8} style={{marginTop: '1%'}}>
              <Button onClick={(event, page) => handleChangePage(event, page)}><Typography className={classes.paginationText}>Primeira</Typography></Button>
              <Pagination 
                shape="rounded" 
                count={numPages} 
                page={page}
                from={0}
                variant="caption"
                onChange={(event, page) => handleChangePage(event, page)}
              />
            <Button onClick={(event, page) => handleChangePage(event, numPages)}><Typography className={classes.paginationText} >Última</Typography></Button>
            </Grid>
            <Grid container justify="flex-end" xs={4}>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    );
 
}


export default withStyles(styles)(withRouter(Users));
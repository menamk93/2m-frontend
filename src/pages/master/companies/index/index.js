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
  InputAdornment,
  Select,
  MenuItem,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import api from '../../../../services/api'
import handleResponse from '../../../../helpers/handleResponse'
import authHeader from '../../../../helpers/authHeader'
import {Pagination, Skeleton } from '@material-ui/lab';
import EnhancedTableHead from '../../../../components/enhancedTableHead';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import FilterListIcon from '@material-ui/icons/FilterList';
import CustomModal from '../../../../components/modal';
import DataPicker from '../../../../components/dataPicker';
import brazilianStates from '../../../../helpers/brazilianStates';
import getCityByState from '../../../../helpers/getCityByState';
import {CustomInput}  from '../../../../components/customInput'
import ModalConfirmation from '../../../../components/modalConfirmation'
import ModalSucess from '../../../../components/modalSuccess'
import ModalGeneric from '../../../../components/modalGeneric';

const columns = [
  { id: 'corporate_name', label: 'Razão social'},
  {
    id: 'created_at',
    label: 'Cadastro',
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'state',
    label: 'Estado',
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'stations_count',
    label: 'Nº de postos monitorados',
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'functions',
    label: '',
    align: 'right',
    format: value => value.toFixed(2),
    sort: 'false',
  },
];

function Companies(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('created_at');
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [update, setUpdate] = React.useState(0);
  const [cities, setCities] = React.useState([]);
  const [city, setCity] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [searchBar, setSearchBar] = React.useState('');
  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);
  React.useEffect(() => {
    getData(selectedFromDate,selectedToDate,city, state, orderBy, order)
  },[page, orderBy, order, update,searchBar]);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [numPages, setnumPages] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [showData, setShowData] = React.useState('');
  const [deleteRow, setDeleteRow] = React.useState(null);
  const [confirmationModal, setConfirmationModal] = React.useState(false)
  const [sucessModal, setSuccessModal] = React.useState(false)

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
  const handleCreate = () => {
    history.push('company/create')
  }
  const handleToDateChange = date => {
    setSelectedToDate(date);
  };
  const handleFromDateChange = date => {
    setSelectedFromDate(date);
  };
  function handleEditRow(id) {
    history.push(`company/edit/${id}`)
  }
  function handleDeleteRow(id) {
    setDeleteRow(id)
    setConfirmationModal(true)
  }
  function handleDelete() {
    setConfirmationModal(false)
    api.delete(`master/company/${deleteRow}`, 
    {
      headers: authHeader(), 
    })
    .then(res => {
      if( typeof(res.errors) == 'undefined'){
        setSuccessModal(true)
        setUpdate(update+1)

      }
    })
    .catch(error => handleResponse(error.response, props ))
  }
  const handleSearch = () => {
    setUpdate(update+1)
    setOpen(false)
  }
  const getData = async (date_start,date_end,city, state,label="created_at", order="asc" ) =>{
    setLoading(true)
    var data = {label, order}
    date_start && (data['date_start'] = date_start)
    date_end && (data['date_end'] =(date_end))
    state && (data['state'] =(state))
    city && (data['city'] =(city))
    data['corporate_name'] = searchBar

    api.post(`master/company/listWithOrder/?page=${page}`, data,
    {
      headers: authHeader(), 
    })
    .then(res => {
      setRows(res.data.data)
      setPage(res.data.current_page)
      setnumPages(res.data.last_page)
      setRowsPerPage(res.data.per_page)
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
  const handleShow = (data) => {
    setShowData(data)
    setShow(true)
  }
  const handleCloseShow = () => {
    setShow(false)
  }

  return (
      <Grid container className={classes.container}>
        {showData && 
          <Show open={show} data={showData} onClose={()=> handleCloseShow() } />
        }
        <ModalConfirmation
          title="Tem Certeza que deseja excluir os dados?" 
          open={confirmationModal}
          buttomName="Sim, excluir"
          handleConfirm={handleDelete}
        />
        <ModalSucess 
        open={sucessModal}
        title="Dados excluídos com sucesso!"
        onClose={() => setSuccessModal(false)}
        />
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
                    <MenuItem value={row.label}>{row.label}</MenuItem>
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
          <Grid container xs={6}>
            <Typography variant='h3' className={classes.title} >Empresas</Typography>
          </Grid>
          <Grid container xs={6} justify="flex-end" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              className={classes.filterButton}
              startIcon={<FilterListIcon />}
              onClick={() => handleOpen()}
            >
              Filtrar
            </Button>
            <Input
              className={classes.searchBar}
              placeholder="Buscar"
              disableUnderline
              onChange={(event) => setSearchBar(event.target.value)}
              value={searchBar}
              classes={{focused: classes.inputFocused }}
              endAdornment = {
                <InputAdornment position="end">
                  <SearchIcon style={{color:'#0C5456'}} />
                </InputAdornment>
              }
            />
          </Grid>
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
                          <TableCell align={columns[0].align} className={classes.columnItemsName} onClick={()=> handleShow(row)}>
                          {row.corporate_name}
                          </TableCell>
                          <TableCell align={columns[1].align} className={classes.columnItems}>
                          {row.created_at}
                          </TableCell>
                          <TableCell align={columns[2].align} className={classes.columnItems}>
                          {row.state}
                          </TableCell>
                          <TableCell align={columns[3].align} className={classes.columnItems}>
                            {row.stations_count}
                          </TableCell>
                          <TableCell align={columns[4].align} className={classes.columnItems}>
                            <Button variant="contained" className={classes.editButton} onClick={() => handleEditRow(row.id)}>
                              <EditIcon  fontSize="small" style={{color:'white'}} />
                            </Button>
                            <Button  variant="contained" className={classes.deleteButton} onClick={() => handleDeleteRow(row.id)}>
                              <DeleteIcon  fontSize="small"  style={{color:'white'}}/>
                            </Button>
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
              <Button 
                variant="contained" 
                color="primary" 
                disableElevation 
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={handleCreate}
                >Cadastrar empresa
              </Button>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    );
 
}

const Show = (props) => {
  const useStyles = makeStyles(theme => ({
    button : {
      color: 'white',
      textAlign: 'center',
      height: '36px',
      width: '240px',
      marginTop: '10px',
      '&:hover' : {
        backgroundColor: '#0C5456',
      },
    },
    gridOption: {
      maxWidth:"none",
      width: '100%',
      padding: '1%',
    },
    gridBody: {
      maxWidth:"none",
      height: '100%',
      padding: '30px',
      border: '1px solid #DFDFDF',
      borderRadius: '3px',
    },
    gridContent: {
      maxWidth:"none",
      width: '100%',
      padding: '5px',
      backgroundColor:'#F8F8F8',
      height: '200px',
      overflowY: 'scroll',
    },
    emailInputs: {
      maxWidth:"none",
      height: '50px',

      width: '100%',
      padding: '5px',
      backgroundColor:'#F8F8F8',
    },
    cardBar: {
      width: '0px',
      height: "30px",
      border: "3px solid #349698",
      opacity: "1",
      borderRadius: '20px',
    },
    title: {
      maxWidth:"none",
      textAlign: 'center',
      fontSize: '30px',
    },
    subTitle: {
      maxWidth:"none",
      marginLeft: '2px',
      color: '#349698',
      fontSize: '20px',
    },
    label: {
      fontSize: '16px',
    },
    tipLabel: {
      fontSize: '11px',
    },
    input: {
      backgroundColor: '#F8F8F8',
      color: '#53B7B9',
      width:'60%',
      textAlign:'center',
      marginLeft: '5px',
  },
  searchButton: {
    width: '60px',
    padding: 'none',
    
  },
    inputButton: {
      marginTop: '20px',
      height: 'fit-content',
      width: '168px',
    },
    returnButton: {
      marginTop: '20px',
      width: '168px',
      backgroundColor:'white',
      height: 'fit-content',
  },
  label: {
    color: '#0C5456',
    fontSize: '16px',
    fontWeight: 500,

  },
  input: {
    color: '#888888',
    fontSize: '16px',
    fontWeight: 100,
    marginBottom: '14px',
  },
  multipleInput: {
    color: '#888888',
    fontSize: '14px',
    fontWeight: 100,
  },
  }));
  let history = useHistory();
  const handleEditRow = () =>  {
    history.push(`company/edit/${data.id}`)
  }
  
  const classes = useStyles();
  const { open, data, onClose } = props;
  return (
  <ModalGeneric 
  open={open} 
  onClose={()=>onClose()}
  width={1100}
  height={550}
 >
  <Grid container direction="column" style={{width: '100%'}}>
    <Grid container item xs={2} direction="row" className={classes.gridOption}>
      <Typography className={classes.title}>{data.corporate_name}</Typography>
    </Grid>
    <Grid container  xs={8} spacing={2} justify="space-between" className={classes.gridOption} style={{flexGrow: 1}}>
      <Grid item xs="4">
        <Paper elevation={0} className={classes.gridBody}>
          <Typography className={classes.label}>CNPJ</Typography>
          <Typography className={classes.input}>{data.corp_reg_number}</Typography>

          <Typography className={classes.label}>Inscrição estadual</Typography>
          <Typography className={classes.input}>{data.state_registration}</Typography>

          <Typography className={classes.label}>Inscrição municipal</Typography>
          <Typography className={classes.multipleInput}>{data.municipal_registration}</Typography>
        </Paper>
      </Grid>
      <Grid item xs="4">
        <Paper elevation={0} className={classes.gridBody}>
          <Typography className={classes.label}>Endereço</Typography>
          <Typography className={classes.multipleInput}>{data.street}, {data.street_number}</Typography>
          <Typography className={classes.multipleInput}>{data.city}, {data.state}</Typography>
          <Typography className={classes.input}>CEP {data.zipcode}</Typography>

          <Typography className={classes.label}>Postos monitorados</Typography>
          <Typography className={classes.multipleInput}>{data.stations_count}</Typography>
        </Paper>
      </Grid>
      <Grid item xs="4">
        <Paper elevation={0} className={classes.gridBody}>
          <Typography className={classes.label}>Responsável financeiro</Typography>
          <Typography className={classes.input}>{data.financier_name}</Typography>

          <Typography className={classes.label}>Contato</Typography>
          <Typography className={classes.multipleInput}>{data.financier_email}</Typography>
          <Typography className={classes.multipleInput}>{data.financier_cell_phone}</Typography>
          <Typography className={classes.multipleInput}>{data.financier_phone}</Typography>
        </Paper>
      </Grid>

    </Grid>
    <Grid container item xs={2} className={classes.gridOption} justify="space-between">
      <Button 
        variant="outlined"
        color="primary"
        onClick={() => onClose()}
        className={classes.returnButton}
      >Cancelar</Button>
      <Button 
        variant="contained" 
        color="primary"  
        onClick={()=>handleEditRow()}
        className={classes.inputButton}
        >Editar
      </Button>
    
    </Grid>
  </Grid>   
</ModalGeneric> 
  );
}


export default withStyles(styles)(withRouter(Companies));
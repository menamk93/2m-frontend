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
  Paper,
  makeStyles,
} from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import api from '../../../../services/api'
import handleResponse from '../../../../helpers/handleResponse'
import authHeader from '../../../../helpers/authHeader'
import {Pagination} from '@material-ui/lab';
import EnhancedTableHead from '../../../../components/enhancedTableHead';
import FilterListIcon from '@material-ui/icons/FilterList';
import CustomModal from '../../../../components/modal';
import DataPicker from '../../../../components/dataPicker';
import ModalConfirmation from '../../../../components/modalConfirmation'
import ModalSucess from '../../../../components/modalSuccess'
import EqualizerIcon from '@material-ui/icons/Equalizer';
import CheckboxList from '../../../../components/checkboxListFilter'
import ModalGeneric from '../../../../components/modalGeneric';

const columns = [
  { id: 'name', label: 'Nome fantasia'},
  {
    id: 'corporate_name',
    label: 'Empresa',
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'created_at',
    label: 'Cadastro',
    align: 'right',
    format: value => value.toLocaleString(),
  },
  {
    id: 'sensors_count',
    label: 'Nº de poços monitorados',
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

function Stations(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('created_at');
  const [page, setPage] = React.useState(1);
  const [update, setUpdate] = React.useState(0);
  const [searchBar, setSearchBar] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [selectedFromDate, setSelectedFromDate] = React.useState(null);
  const [selectedToDate, setSelectedToDate] = React.useState(null);
  const [numPages, setnumPages] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteRow, setDeleteRow] = React.useState(null);
  const [confirmationModal, setConfirmationModal] = React.useState(false)
  const [sucessModal, setSuccessModal] = React.useState(false)
  const [companies, setCompanies] = React.useState(null)
  const [selectedCompanies, setSelectedCompanies] = React.useState([])
  const [sensors, setSensors] = React.useState('')
  const [show, setShow] = React.useState(false);
  const [showData, setShowData] = React.useState('');
  React.useEffect(() => {
    getCompanies()
  },[]);

  React.useEffect(() => {
    getData(selectedFromDate,selectedToDate,orderBy, order)
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
  const handleCreate = () => {
    history.push('station/create')
  }
  const handleToDateChange = date => {
    setSelectedToDate(date);
  };
  const handleFromDateChange = date => {
    setSelectedFromDate(date);
  };
  const getCompanies = () => {
    api.get('master/company',{
      headers: authHeader(), 
    }).then( response => {
      setCompanies(response.data.data)
    })
  }
  const handleShow = (data) => {
    setShowData(data)
    setShow(true)
  }
  const handleCloseShow = () => {
    setShow(false)
  }
  function handleEditRow(id) {
    history.push(`station/edit/${id}`)
  }
  function handleCheckRow(id) {
    history.push(`station/${id}`)
  }
  
  function handleDeleteRow(id) {
    setDeleteRow(id)
    setConfirmationModal(true)
  }
  function handleDelete() {
    setConfirmationModal(false)
    api.delete(`master/station/${deleteRow}`, 
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
  const getData = async (date_start,date_end,label="created_at", order="asc" ) =>{
    var data = {label, order}

    if (selectedCompanies) {
      var companies = ''
      selectedCompanies.map(company => {
      if(companies){
        companies = `${companies},${company.id}`
      }else {
        companies = `${company.id}`
      }
    })
    data['company_id'] = companies
    }
    date_start && (data['date_start'] = date_start)
    date_end && (data['date_end'] =(date_end))
    sensors && (data['sensors_count'] = sensors)
    data['name'] = searchBar
    api.post(`master/station/listWithOrder/?page=${page}`, data,
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
  const handleChangeSensor = data => {
    setSensors(data)
  }
  const handleSelectedCompanies = (data) => {
    setSelectedCompanies(data);
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
        <CustomModal open={open} handleClose={() => handleClose()} width={'50%'} height={'40%'} >
          <Grid container spacing={2} >
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
              <Grid container direction="column" >
                <Typography color="primary" variant="h7">Empresas</Typography>
                <Grid className={classes.gridContent}>
                  <CheckboxList data={companies} keyValue="id" labelName="corporate_name" defaultValue={selectedCompanies} onChange={ value => handleSelectedCompanies(value)}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs="4" container  item direction="column" alignItems="center" >
              <Grid container item direction="column">
                <Typography color="primary" variant="h7">Nº de poços monitorados</Typography>
                <Input
                  type="number"
                  className={classes.input}
                  placeholder="ex: 4"
                  onChange={event => handleChangeSensor(event.target.value)}
                  value={sensors}
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
            <Typography variant='h3' className={classes.title}>Postos</Typography>
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
                          {row.name}
                          </TableCell>
                          <TableCell align={columns[1].align} className={classes.columnItems}>
                          {row.company.corporate_name}
                          </TableCell>
                          <TableCell align={columns[2].align} className={classes.columnItems}>
                          {row.created_at}
                          </TableCell>
                          <TableCell align={columns[3].align} className={classes.columnItems}>
                            {row.sensors_count}
                          </TableCell>
                          <TableCell align={columns[4].align} className={classes.columnItems}>
                            <Button variant="contained" className={classes.equalizerButton} onClick={() => handleCheckRow(row.id)} disabled={row.sensors_count ? false : true} >
                              <EqualizerIcon  fontSize="small" style={{color:'white'}} />
                            </Button>
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
                >Cadastrar posto
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
  show: {
    height: 'fit-content',
      width: '168px',
      backgroundColor: '#349698',
  }
  }));
  let history = useHistory();
  const handleEditRow = () =>  {
    history.push(`station/edit/${data.id}`)
  }
  const handleShowActivity = () => {
    history.push(`station/${data.id}`)
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
    <Grid container item xs={2} direction="row" justify="space-between" className={classes.gridOption}>
      <Typography className={classes.title}>{data.name}</Typography>
      <Button 
        disabled={data.sensors_count ? false : true}
        variant="contained" 
        color="primary" 
        startIcon={<EqualizerIcon />} 
        onClick={()=>handleShowActivity()}
        className={classes.show}
        >Ver atividade
      </Button>
    </Grid>
    <Grid container  xs={8} spacing={2} justify="space-between" className={classes.gridOption} style={{flexGrow: 1}}>
      <Grid item xs="4">
        <Paper elevation={0} className={classes.gridBody}>
          <Typography className={classes.label}>Empresa</Typography>
          <Typography className={classes.input}>{data.company.corporate_name}</Typography>

          <Typography className={classes.label}>Número de poços monitorados (PM)</Typography>
          <Typography className={classes.input}>{data.sensors_count} poços</Typography>

          <Typography className={classes.label}>Endereço</Typography>
          <Typography className={classes.multipleInput}>{data.street}, {data.street_number}</Typography>
          <Typography className={classes.multipleInput}>{data.city}, {data.state}</Typography>
          <Typography className={classes.multipleInput}>CEP {data.zipcode}</Typography>

        </Paper>
      </Grid>
      <Grid item xs="4">
        <Paper elevation={0} className={classes.gridBody}>
          <Typography className={classes.label}>Responsável pelo empreendimento</Typography>
          <Typography className={classes.input}>{data.manager.name}</Typography>

          <Typography className={classes.label}>Contato</Typography>
          <Typography className={classes.multipleInput}>{data.manager.email}</Typography>
          <Typography className={classes.multipleInput}>{data.manager.cell_phone}</Typography>
          <Typography className={classes.multipleInput}>{data.manager.phone}</Typography>
        </Paper>
      </Grid>
      <Grid item xs="4">
        <Paper elevation={0} className={classes.gridBody}>
          <Typography className={classes.label}>Responsável Técnico</Typography>
          <Typography className={classes.input}>{data.technician.name}</Typography>

          <Typography className={classes.label}>Contato</Typography>
          <Typography className={classes.multipleInput}>{data.technician.email}</Typography>
          <Typography className={classes.multipleInput}>{data.technician.cell_phone}</Typography>
          <Typography className={classes.multipleInput}>{data.technician.phone}</Typography>
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


export default withStyles(styles)(withRouter(Stations));
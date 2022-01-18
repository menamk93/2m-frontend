import React from 'react';
import styles from './styles';
import EnhancedTableHead from '../enhancedTableHead';
import EditIcon from '@material-ui/icons/Edit';
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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { PaginationItem, Pagination} from '@material-ui/lab';


function StickyHeadTable(props) {
  const {classes,rows, columns} = props
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [numPages, setnumPages] = React.useState(5);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  return (
    <Grid container>
      <Card className={classes.root}>
        <TableContainer className={classes.container}>
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
              {stableSort(rows, getComparator(order, orderBy)).slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover  key={row.code} className={classes.tableRow}>
                    <TableCell
                      align="left"
                      className={classes.tableWhiteRow, classes.columnItens2}
                      width={1}
                    />
                    {columns.map(column => {
                      const value = row[column.id];
                      
                      if(!column.button){
                      return (
                        <TableCell key={column.id} align={column.align} className={classes.columnItens}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )}
                      else{
                        return (
                        <TableCell key={column.id} align={column.align} className={classes.columnItens}>
                        </TableCell>
                        )
                      }
                    })}
                    <TableCell
                      align="right"
                      className={classes.tableWhiteRow, classes.columnItens2}
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
          <Button onClick={(event, page) => handleChangePage(event, 1)}><Typography className={classes.paginationText}>Primeira</Typography></Button>
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
            >Cadastrar empresa
          </Button>
        </Grid>
      </Grid>
    </Grid>

  );
}

export default withStyles(styles)(StickyHeadTable);
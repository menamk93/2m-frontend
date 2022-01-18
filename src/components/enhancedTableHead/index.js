import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import styles from './styles';

export default function EnhancedTableHead(props) {
    const { classes,  order, orderBy, onRequestSort, columns } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow style={{height:'80px'}} >
          <TableCell
            align="left"
            className={classes.tableWhiteRow, classes.tableHeader}
            width={1}
          />
          {columns.map(column => (
            <TableCell
              align={column.align}
              key={column.id}
              sortDirection={orderBy === column.id ? order : false}
              className={classes.tableHeader}
            >
              {! column.sort && 
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc'}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
                {orderBy === column.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
              }
            </TableCell>
          ))}
            <TableCell
            align="left"
            className={classes.tableWhiteRow, classes.tableHeader}
            width={1}
          />
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
  };
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import uuid from 'react-uuid';
import _useHttp from '../../hooks/_http';
import { Skeleton, Typography } from '@mui/material';
import styled from '@emotion/styled';

import ToolBar from './aync-tool-bar';

/**
 * Style Table Header
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.datatable?.headerBg,
    color: theme?.palette?.datatable?.color,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/**
 * Style Body Table 
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette?.datatable?.rowOdd,
  },
  '&:last-child th': {
    border: 0,
  },
}));

/**
 * Custom Table Header
 */
const EnhancedTableHead = (props) => {

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headers,
  } = props;

  /**
   * Handle sort header table
   */
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headers?.length ? headers.map((headCell) => {

          const allowShort = headCell.allowShort === undefined || headCell.allowShort === true;
          const visible = headCell.visible !== undefined ? headCell.visible : true;

          return (

            <StyledTableCell
              key={uuid()}
              align={headCell?.align || "start"}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ '&.MuiTableCell-root': { display: visible ? 'table-cell' : 'none' } }}
            >
              {allowShort && (

                <TableSortLabel
                  active={orderBy === headCell.sqlField}
                  direction={allowShort ? orderBy === headCell.sqlField ? order : 'asc' : undefined}
                  onClick={allowShort ? createSortHandler(headCell.sqlField) : undefined}
                  sx={{ fontSize: 13, fontWeight: 'bold' }}
                >
                  {headCell.label}
                  {orderBy === headCell.sqlField ? (<Box component="span" sx={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'} </Box>) : null}
                </TableSortLabel>
              )}

              {!allowShort && headCell.label}
            </StyledTableCell>
          );
        })
          :
          <></>
        }
      </TableRow>
    </TableHead>
  );
}

/**
 * Custom table body
 */
const TableRows = ({
  displayRecords,
  isSelected,
  handleClick,
  headers,
  checkColumn,
  pageSize
}) => {

  return displayRecords.map((row, index) => {

    const isItemSelected = isSelected(row[checkColumn]);
    const labelId = `enhanced-table-checkbox-${index}`;

    return (
      <StyledTableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={uuid()}
        selected={isItemSelected}
      >

        {headers?.length ? headers.map((head) => {

          const showIndex = head.id === 'index';
          const visible = head.visible !== undefined ? head.visible : true;

          const Row = () => {

            if (head.isHeader) {
              return (
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                  key={uuid()}
                  align="center"
                  sx={{ '&.MuiTableCell-root': { display: visible ? 'table-cell' : 'none' }, fontSize: 13 }}
                >
                  {row[head.id]}
                </TableCell>
              );
            } else {

              return !head?.Render ?
                <TableCell align={head.align} key={uuid()} sx={{ fontSize: 13 }}>{showIndex ? (index + 1) : row[head.id]}</TableCell>
                :
                <TableCell align={head.align} key={uuid()} sx={{ fontSize: 13 }}> {head.Render(row[head.id], row)}</TableCell>
            }
          };

          return <Row key={uuid()} />;
        })
          :
          <></>
        }
      </StyledTableRow>
    );
  });
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headers: PropTypes.array.isRequired,
};

/**
 * Full async table custom
 */
const AsyncDatatable = (props) => {

  const {
    ordinal = 'asc',
    setOrdinalBy,
    checkColumn = 'id',
    bannerText = 'Datatable',
    searchPlaceHolder = 'Search',
    setSelectedData,
    asyncURL,
    headers,
    hideAdd = false,
    isReloadData = false

  } = props;

  const [order, setOrder] = useState(ordinal);
  const [orderBy, setOrderBy] = useState(setOrdinalBy);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');
  const { data, loading, error, sendRequest } = _useHttp();

  let rows = useMemo(() => (data?.records ? data?.records : []), [data]);
  let rowCount = useMemo(() => (data?.totalRecord ? data?.totalRecord : 0), [data]);

  /**
   * Get row data
   */
  const getRows = useCallback(async (searchValue = '') => {

    const postData = {
      start: page * rowsPerPage,
      length: rowsPerPage,
      searchValue: searchValue,
      orderColumn: orderBy,
      ordinal: order,
    };

    await sendRequest(asyncURL, 'POST', postData);
  },
    [sendRequest, asyncURL, rowsPerPage, orderBy, order, page]
  );

  useEffect(() => {
    const identifier = setTimeout(async () => {
      getRows(searchText);
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchText, isReloadData, getRows]);


  useEffect(() => {
    setPage(0);
  }, [searchText]);


  /**
   * Short data
   */
  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [orderBy, order]
  );

  /**
   * Select all box 
   */
  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n[checkColumn]);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [rows, checkColumn]
  );

  const handleClick = useCallback((event, name) => {

    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  },
    [selected]
  );

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleChangeDense = useCallback((event) => {
    setDense(event.target.checked);
  }, []);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box
      sx={{
        width: '-webkit-fill-available'
      }}
    >
      <Paper
        sx={{
          padding: 0,
          width: '100%',
          mb: 2,
          '&.MuiPaper-root': {
            // borderRadius: '8px',
          },
        }}
      >
        <ToolBar
          setSelectedData={setSelectedData}
          numSelected={0}
          dense={dense}
          handleChangeDense={handleChangeDense}
          title={bannerText}
          searchPlaceHolder={searchPlaceHolder}
          setSearchText={setSearchText}
          searchText={searchText}
          hideAdd={hideAdd}
        />

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            // aria-labelledby="tableTitle"
            aria-labelledby="sticky table"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows ? 0 : rows.length}
              headers={headers}
            />

            <TableBody>

              {loading ? Array(rowsPerPage).fill(null).map(() => (

                <TableRow key={uuid()} style={{ height: dense ? 33 : 53 }}>

                  {headers?.length ? headers.filter((h) => h.visible !== false).map((h) => (

                    <TableCell key={uuid()} sx={{ textAlign: 'center', padding: '0.8rem 1rem' }}>
                      <Skeleton
                        key={uuid()}
                        variant="rectangular"
                        width="100%"
                        height={30}
                      />
                    </TableCell>
                  ))
                    :
                    <></>
                  }
                </TableRow>

              ))
                :
                <>
                  <TableRows
                    displayRecords={rows}
                    isSelected={isSelected}
                    handleClick={handleClick}
                    headers={headers}
                    checkColumn={checkColumn}
                    pageSize={rowsPerPage}
                  />
                  {

                    (!error && rows.length === 0) ? (
                      <TableRow
                        style={{
                          height: (dense ? 33 : 53) * 2,
                        }}
                      >
                        <TableCell
                          colSpan={headers.length + 1}
                          sx={{ textAlign: 'center' }}
                        >
                          <Typography variant="error">There are no records display</Typography>
                        </TableCell>
                      </TableRow>
                    ) : ""
                  }
                  {error && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * 2,
                      }}
                    >
                      <TableCell
                        colSpan={headers.length + 1}
                        sx={{ textAlign: 'center' }}
                      >
                        <Typography variant="error">{error}</Typography>
                      </TableCell>
                    </TableRow>
                  )}

                </>

              }
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default AsyncDatatable;

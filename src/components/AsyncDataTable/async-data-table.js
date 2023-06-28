import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import { TableBody, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import uuid from 'react-uuid';
import _useHttp from '../../hooks/_http';
import { Divider, Skeleton, Typography } from '@mui/material';

import ToolBar from './async-tool-bar';
import EnhancedTableHead from './async-table-head';
import TableRows from './async-table-row';

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
    isReloadData = false,
    onHandleAddNewEvent,
    handleApproveEvent,
    handleReviewEvent,
    handleAssessmentEvent,
    handleEditEvent,
    handleLinkEvent,
    handleStatusEvent,
    handleResultEvent,
    useTableActions
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
          handleAddNewEvent={onHandleAddNewEvent}
          title={bannerText}
          searchPlaceHolder={searchPlaceHolder}
          setSearchText={setSearchText}
          searchText={searchText}
          useActions={useTableActions}
        />

        <Divider />

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
              rowCount={rows ? 0 : rows?.length}
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
                    actions={useTableActions}
                    handleApproveEvent={(record) => handleApproveEvent(record)}
                    handleEditEvent={(record) => handleEditEvent(record)}
                    handleReviewEvent={(record) => handleReviewEvent(record)}
                    handleAssessmentEvent={(record) => handleAssessmentEvent(record)}
                    handleLinkEvent={(record) => handleLinkEvent(record)}
                    handleStatusEvent={(key,record) => handleStatusEvent(key,record)}
                    handleResultEvent={(key,record) => handleResultEvent(key,record)}
                  />
                  {

                    (!error && rows?.length === 0) ? (
                      <TableRow
                        style={{
                          height: (dense ? 20 : 33) * 2,
                        }}
                      >
                        <TableCell
                          colSpan={headers?.length + 1}
                          sx={{ textAlign: 'center' }}
                        >
                          <Typography variant="error">Data Empty...!</Typography>
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
                        colSpan={headers?.length + 1}
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
          rowsPerPageOptions={[5, 10, 25, 50, 100, 500]}
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

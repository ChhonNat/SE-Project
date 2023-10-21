import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import _useHttp from '../../hooks/_http';
import EnhancedTableHead from './async-table-head';
import TableRows from './async-table-row';
import ToolBar from './async-tool-bar';

import { Divider, TableBody, TableRow, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';


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
    handleViewEvent,
    handleViewFileEvent,
    handleViewSecFileEvent,
    handleViewThirdFileEvent,
    handleEditEvent,
    handleLinkEvent,
    handleMoreEvent,
    onHandleAddNewEvent,
    onHandleRefreshEvent,
    useTableActions,
    handleDeleteEvent,
    filter
  } = props;


  const [order, setOrder] = useState(ordinal);
  const [orderBy, setOrderBy] = useState(setOrdinalBy);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const { data, loading, error, message, sendRequest, totalRecords } = _useHttp();
  const [initialData, setInitialData] = useState([]);


  useEffect(() => {

    if (!loading && !error) {
      setInitialData([...data]);
    }
  }, [loading, error, message])


  let rows = useMemo(() => (data ? data : initialData), [data]);
  let rowCount = useMemo(() => (totalRecords ? totalRecords : 0), [data]);

  /**
   * Get row data
   */
  const getRows = useCallback(async (searchValue = '') => {

    let postData = {
      // start: page * rowsPerPage,
      // length: rowsPerPage,
      // searchValue: searchValue,
      // orderColumn: orderBy,
      // ordinal: order,
      searchParams: {
        searchValue: searchValue
      },
      columnOrder: "ordering",
      orderBy: "ASC",
      limit: rowsPerPage,
      offset: page * rowsPerPage
    };

    // add custom filter
    if (filter && Object.keys(filter) && Object.keys(filter)?.length) {
      postData = {
        ...postData,
        ...filter,
      }
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
          handleRefreshEvent={onHandleRefreshEvent}
          title={bannerText}
          searchPlaceHolder={searchPlaceHolder}
          setSearchText={setSearchText}
          searchText={searchText}
          useActions={useTableActions}
        />


        {loading ?
          <Box sx={{ width: '100%' }}><LinearProgress /></Box>
          :
          <Divider />
        }
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
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
              <TableRows
                displayRecords={rows}
                isSelected={isSelected}
                handleClick={handleClick}
                headers={headers}
                checkColumn={checkColumn}
                page={page}
                pageSize={rowsPerPage}
                actions={useTableActions}
                handleViewEvent={(record) => handleViewEvent(record)}
                handleViewFileEvent={(record) => handleViewFileEvent(record)}
                handleViewSecFileEvent={(record) => handleViewSecFileEvent(record)}
                handleViewThirdFileEvent={(record) => handleViewThirdFileEvent(record)}
                handleEditEvent={(record) => handleEditEvent(record)}
                handleLinkEvent={(record) => handleLinkEvent(record)}
                handleMoreEvent={(eName, record) => handleMoreEvent(eName, record)}
                handleDeleteEvent={(record) => handleDeleteEvent(record)}
              />
              {

                (!error && rows?.length === 0) ? (
                  <TableRow
                    style={{
                      height: (dense ? 20 : 33) * 2,
                    }}
                  >
                    <TableCell
                      align='center'
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
                // style={{
                //   height: (dense ? 33 : 53) * 2,
                // }}
                >
                  <TableCell
                    align='center'
                    colSpan={headers?.length + 1}
                    sx={{ textAlign: 'center' }}
                  >
                    <Typography variant="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              )}
              {/* {
                loading ?
                  <>
                  </>
                  // Array(rowsPerPage).fill(null).map(() => (

                  //   <TableRow key={uuid()} style={{ height: dense ? 23 : 53 }}>

                  //     {headers?.length ? headers.filter((h) => h.visible !== false).map((h) => (

                  //       <TableCell
                  //         align='center'
                  //         key={uuid()}
                  //         sx={{ textAlign: 'center', padding: '0.1rem 0.1rem' }}
                  //       >
                  //         <Skeleton
                  //           key={uuid()}
                  //           variant="rectangular"
                  //           width="100%"
                  //           height={25}
                  //         />
                  //       </TableCell>
                  //     ))
                  //       :
                  //       <></>
                  //     }
                  //   </TableRow>

                  // ))
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
                      handleViewEvent={(record) => handleViewEvent(record)}
                      handleViewFileEvent={(record) => handleViewFileEvent(record)}
                      handleViewSecFileEvent={(record) => handleViewSecFileEvent(record)}
                      handleEditEvent={(record) => handleEditEvent(record)}
                      handleLinkEvent={(record) => handleLinkEvent(record)}
                      handleMoreEvent={(eName, record) => handleMoreEvent(eName, record)}
                    />
                    {

                      (!error && rows?.length === 0) ? (
                        <TableRow
                          style={{
                            height: (dense ? 20 : 33) * 2,
                          }}
                        >
                          <TableCell
                            align='center'
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
                          align='center'
                          colSpan={headers?.length + 1}
                          sx={{ textAlign: 'center' }}
                        >
                          <Typography variant="error">{error}</Typography>
                        </TableCell>
                      </TableRow>
                    )}

                  </>

              } */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {loading ?
          <Box sx={{ width: '100%' }}><LinearProgress /></Box>
          :
          <Divider/>
        } */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          showFirstButton="true"
          showLastButton="true"
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

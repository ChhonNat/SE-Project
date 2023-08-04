import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

import _useHttp from '../../hooks/_http';
import { HTTP_METHODS } from '../../constants/http_method';
import HeaderActionComponent from '../Page/header-action';

/**
 * Table Component
 * Require HeaderColumns to display in table header
 * Required bodyColumns to display data in table
 */

const TableComponent = (props) => {

    /**
     * Custom Table Headers from called component
     * Custom body columns from called component
     * Custom request endpoint from called component
     */
    const { headerColumns, useColumns, requestToEndPoint, buttonActions, useTableActions, postData } = props || {};

    const { data, loading, error, sendRequest } = _useHttp();
    const [bodyColumns, setBodyColumns] = useState(useColumns);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    /**
     * Get dynamic screen height
     */
    const screenHeight = useRef(window.innerHeight);
    const [autoHeighScreen, setAutoHeighScreen] = useState(500);
    useEffect(() => {
      setAutoHeighScreen(screenHeight?.current - 310);
    },[screenHeight?.current])

    /**
     * Dynamic load data to display in table
     */
    useEffect(() => {
        if (requestToEndPoint) {
            return;
            const fetchData = async () => {
                await sendRequest(requestToEndPoint, HTTP_METHODS.post, postData);
            };
            fetchData();
        }
    }, [requestToEndPoint]);

    /**
     * listen data load successfully
     */
    useEffect(() => {

        useColumns && useColumns.length ? setBodyColumns(useColumns) : data?.length && !loading ? setBodyColumns(data) : setBodyColumns([]);

    }, [data, loading, useColumns]);

    /**
     * Handle page change
     */
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    /**
     * Handle change record size in table
     */
    const handleChangeRecordSizePerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>

            {/* Header action component */}
            <HeaderActionComponent buttonActions={buttonActions} useActions={useTableActions} />

            {/* Table */}
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: autoHeighScreen }}>
                    <Table stickyHeader aria-label="sticky table" size='small'>
                        {/* Table header */}
                        <TableHead>
                            <TableRow>
                                {headerColumns && headerColumns.length && headerColumns.map((column) => (
                                    <TableCell
                                        key={column?.id}
                                        align={column?.align ? column?.align : 'inherit'}
                                        style={{ minWidth: column?.minWidth, fontWeight: 'bold', fontSize: 13, fontFamily: 'inherit' }}
                                    >
                                        {column?.label}
                                    </TableCell>
                                ))}

                                {
                                   useTableActions && Object.values(useTableActions || {}).length ?
                                        <TableCell
                                            align={'center'}
                                            style={{ fontWeight: 'bold', fontSize: 13, fontFamily: 'inherit' }}
                                        >
                                            Actions
                                        </TableCell>
                                        :
                                        <></>
                                }

                            </TableRow>
                        </TableHead>

                        {/* Table body */}
                        <TableBody>
                            {
                                loading ?

                                    <TableRow>
                                        <TableCell align='center'>Loading...</TableCell>
                                    </TableRow>

                                    :
                                    <>
                                        {/* 
                                        {
                                            currentPage && pageSize ?
                                                ((currentPage * pageSize) - pageSize) + (index + 1)
                                                :
                                                (index + 1)
                                        } */}
                                        {
                                            bodyColumns && bodyColumns.length ? bodyColumns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>

                                                        {headerColumns && headerColumns?.length && headerColumns.map((column) => {
                                                            const isUseIndex = column?.id === 'index';
                                                            const value = row[column?.id];
                                                            return (
                                                                <TableCell key={column?.id} align={column?.align ? column?.align : 'inherit'} sx={{ fontSize: 13, fontFamily: 'inherit' }}>

                                                                    {
                                                                        isUseIndex ? (index + 1)
                                                                            :
                                                                            column?.format && typeof value === 'number' ? column?.format(value) : value
                                                                    }
                                                                </TableCell>
                                                            );
                                                        })}

                                                        {
                                                            Object.values(useTableActions || {}).length ?
                                                                (
                                                                    <TableCell align={'center'} sx={{ fontSize: 13, fontFamily: 'inherit' }}>
                                                                        {useTableActions.edit && <BorderColorOutlinedIcon color='primary' fontSize='small'/>}
                                                                        {useTableActions.delete && <DeleteOutlineOutlinedIcon color='error' fontSize='small'/>}
                                                                    </TableCell>
                                                                )
                                                                :
                                                                <></>
                                                        }
                                                    </TableRow>
                                                );
                                            })
                                                :
                                                <TableRow>
                                                    <TableCell align='center'>Empty Data!</TableCell>
                                                </TableRow>
                                        }
                                    </>

                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* table footer */}
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={bodyColumns?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRecordSizePerPage}
                />

            </Paper>
        </>
    );
}

export default TableComponent;
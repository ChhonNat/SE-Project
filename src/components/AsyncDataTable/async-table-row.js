import React from 'react';
import styled from '@emotion/styled';
import { Tab, TableCell, TableRow, Typography } from '@mui/material';
import Moment from 'react-moment';
import uuid from 'react-uuid';
import AsyncTableAction from './async-table-action';

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
 * Custom table body
 */
const TableRows = ({
    displayRecords,
    isSelected,
    handleClick,
    handleApproveEvent,
    handleReviewEvent,
    handleEditEvent,
    headers,
    checkColumn,
    pageSize,
    actions
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

                {headers?.length ?
                    headers.map((head) => {

                        /**
                         * Show ranking index
                         */
                        const showIndex = head?.id === 'index';

                        /**
                         * Get header data type date => convert from unix date to IOS date
                         */
                        const typeDate = head?.type === 'date';

                        /**
                         * Get header type action display custom template action in table
                         */
                        const isAction = head?.id === 'action';

                        /**
                         * Get header type badge display badge style in table
                         */
                        const isBadge = head?.badge ? true : false;

                        /**
                         * Get header type status
                         */
                        const isStatus = head?.type === 'status';
                        const recordStatus = row[head.id] === 1 ? 'Active' : 'Inactive';


                        /**Map button action with the condidtion */
                        const buttonAction = {
                              approveCandidate: actions?.approveCandidate ? (typeof actions?.approveCandidate === 'boolean' ? actions?.approveCandidate : actions?.approveCandidate?.condition[row[actions?.approveCandidate?.field]]) : false,
                              reviewCandidate: actions?.reviewCandidate ? (typeof actions?.reviewCandidate === 'boolean' ? actions?.reviewCandidate : actions?.reviewCandidate?.condition[row[actions?.reviewCandidate?.field]]) : false,
                              create: actions?.create ? (typeof actions?.create === 'boolean' ? actions?.create : actions?.create?.condition[row[actions?.create?.field]]) : false,
                              edit: actions?.edit ? (typeof actions?.edit === 'boolean' ? actions?.edit : actions?.edit?.condition[row[actions?.edit?.field]]) : false,
                              delete: actions?.delete ? (typeof actions?.delete === 'boolean' ? actions?.delete : actions?.delete?.condition[row[actions?.delete?.field]]) : false,
                              passedInterview: actions?.passedInterview ? (typeof actions?.passedInterview === 'boolean' ? actions?.passedInterview : actions?.passedInterview?.condition[row[actions?.passedInterview?.field]]) : false,
                        };

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
                                    <TableCell align={head.align} key={uuid()} sx={{ fontSize: 13}}>

                                        {/* Use table index */}
                                        {showIndex && (index + 1)}

                                        {/* Use table date */}
                                        {typeDate ? row[head.id] ? <Moment format={head?.dateFormat}>{row[head.id]}</Moment> : '' : ''}

                                        {/* Use badge style */}
                                        {
                                            isStatus &&

                                            <Typography variant="h6" id="tableTitle" component="div"
                                                sx={{
                                                    background: '#f2eeee',
                                                    paddingLeft: 2,
                                                    paddingRight: 2,
                                                    borderRadius: 2,
                                                    fontWeight: 'bold',
                                                    width: 'max-content',
                                                    fontSize: 14,
                                                    color: head?.statusColor[row[head.id]],
                                                }}
                                            >
                                                {row[head.id]}
                                            </Typography>
                                        }

                                        {/* Use normal field */}
                                        {!showIndex && !typeDate && !isAction && !isStatus && !isBadge && row[head.id]}

                                        {/* Custom button actions */}
                                        {isAction &&
                                            <AsyncTableAction
                                                onHandleApproveCandidateEvent={() => handleApproveEvent(row)}
                                                onHandleReviewCandidateEvent={() => handleReviewEvent(row)}
                                                onHandleEditEvent={() => handleEditEvent(row)}
                                                useActions={buttonAction}
                                            />
                                        }

                                    </TableCell>
                                    :
                                    <TableCell
                                        align={head.align}
                                        key={uuid()}
                                        sx={{ fontSize: 13 }}>
                                        {head.Render(row[head.id], row)}
                                    </TableCell>
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

export default TableRows;
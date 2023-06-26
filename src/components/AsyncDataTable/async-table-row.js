import React from 'react';
import styled from '@emotion/styled';
import { Link, Tab, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import Moment from 'react-moment';
import uuid from 'react-uuid';
import AsyncTableAction from './async-table-action';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

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
    handleAssessmentEvent,
    handleEditEvent,
    handleLinkEvent,
    handleStatusEvent,
    headers,
    checkColumn,
    pageSize,
    actions
}) => {

    return displayRecords.map((row, index) => {

        const isItemSelected = isSelected(row[checkColumn]);
        const labelId = `enhanced-table-checkbox-${index}`;

        const checkButtonAction = (objData, condition) => {

            const trueCondition = [];

            if (condition && condition.length) {

                condition.forEach((ele, index) => {

                    const { values, field } = condition[index];
                    trueCondition.push(values.includes(row[field]));
                });
            }


            if (!trueCondition?.length)
                return false;

            if (trueCondition?.includes(false))
                return false;

            return true
        };


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

                        /**
                         * Get header type link
                         */
                        const isLink = head?.type === 'link';

                        /**
                         * get row is array or object;
                         */

                        const isArray = Array.isArray(row[head?.id]);
                        const arrayValue = isArray && row[head?.id]?.length ?
                            row[head?.id].map(function (ele) {
                                return ele[head?.arrayId] || ele;
                            }) : [];


                        /**Map button action with the condidtion */
                        const buttonAction = {
                            approveCandidate: actions?.approveCandidate ?
                                (
                                    typeof actions?.approveCandidate === 'boolean' ?
                                        actions?.approveCandidate :
                                        checkButtonAction(row, actions?.approveCandidate)
                                    // actions?.approveCandidate?.condition[row[actions?.approveCandidate?.field]]
                                )
                                :
                                false,
                            reviewCandidate: actions?.reviewCandidate ?
                                (
                                    typeof actions?.reviewCandidate === 'boolean' ?
                                        actions?.reviewCandidate :
                                        checkButtonAction(row, actions?.reviewCandidate)
                                )
                                :
                                false,
                            create: actions?.create ?
                                (typeof actions?.create === 'boolean' ? actions?.create : actions?.create?.condition[row[actions?.create?.field]])
                                :
                                false,
                            edit: actions?.edit ?
                                (
                                    typeof actions?.edit === 'boolean' ?
                                        actions?.edit :
                                        checkButtonAction(row, actions?.edit))
                                :
                                false,
                            delete: actions?.delete ?
                                (typeof actions?.delete === 'boolean' ? actions?.delete : actions?.delete?.condition[row[actions?.delete?.field]])
                                :
                                false,
                            passedInterview: actions?.passedInterview ?
                                (typeof actions?.passedInterview === 'boolean' ?
                                    actions?.passedInterview :
                                    checkButtonAction(row, actions?.passedInterview)
                                )
                                :
                                false,
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
                                    <TableCell align={head.align} key={uuid()} sx={{ fontSize: 13 }}>

                                        {/* Use table index */}
                                        {showIndex && (index + 1)}

                                        {/* Use table date */}
                                        {typeDate ? row[head.id] ? <Moment format={head?.dateFormat}>{row[head.id]}</Moment> : '' : ''}

                                        {/* Use badge style */}
                                        {
                                            isStatus &&
                                            <Tooltip title={actions?.editStatus?.[head?.id] ? 'Edit ' + head?.label : ''}>
                                                <Typography variant="h6" id="tableTitle" component="div"
                                                    sx={{
                                                        background: '#f5f5f5',
                                                        paddingLeft: 1,
                                                        paddingRight: 1,
                                                        borderRadius: 2,
                                                        fontWeight: 'bold',
                                                        width: 'max-content',
                                                        fontSize: 12,
                                                        color: head?.statusColor[row[head.id]],
                                                        cursor: actions?.editStatus?.[head?.id] ? 'pointer' : ''
                                                    }}
                                                    onClick={(e) =>
                                                        actions?.editStatus?.[head?.id] ? handleStatusEvent(head?.id, row) : e.preventDefault()
                                                    }
                                                >
                                                    {row[head.id]}
                                                </Typography>
                                            </Tooltip>
                                        }

                                        {/* Use link */}
                                        {
                                            isLink && <Link sx={{ cursor: 'pointer' }} onClick={() => handleLinkEvent(row)}>{row[head.id]}</Link>
                                        }

                                        {/* Use normal field */}
                                        {!showIndex && !typeDate && !isAction && !isStatus && !isBadge && !isLink &&
                                            (
                                                !isArray ?
                                                    row[head.id] :
                                                    arrayValue?.length ? arrayValue.toString() : ''
                                            )
                                        }

                                        {/* Custom button actions */}
                                        {isAction &&
                                            <AsyncTableAction
                                                onHandleApproveCandidateEvent={() => handleApproveEvent(row)}
                                                onHandleReviewCandidateEvent={() => handleReviewEvent(row)}
                                                onHandleAssessmentCandidateEvent={() => handleAssessmentEvent(row)}
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
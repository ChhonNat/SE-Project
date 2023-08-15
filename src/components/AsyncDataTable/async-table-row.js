import React from "react";
import styled from "@emotion/styled";
import {
  Link,
  Tab,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Moment from "react-moment";
import uuid from "react-uuid";
import AsyncTableAction from "./async-table-action";
import { CheckBox } from "@mui/icons-material";

/**
 * Style Body Table
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette?.datatable?.rowOdd,
  },
  "&:last-child th": {
    border: 0,
  },
}));

/**
 * Custom table body
 */
const TableRows = ({
  displayRecords,
  isSelected,
  handleViewEvent,
  handleViewFileEvent,
  handleViewSecFileEvent,
  handleViewThirdFileEvent,
  handleEditEvent,
  handleMoreEvent,
  handleLinkEvent,
  headers,
  checkColumn,
  pageSize,
  actions,
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

      if (!trueCondition?.length) return false;

      if (trueCondition?.includes(false)) return false;

      return true;
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
        {/* <TableCell padding="checkbox">
          <CheckBox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell> */}

        {headers?.length ? (
          headers.map((head) => {
            /**
             * Show ranking index
             */
            const showIndex = head?.id === "index";

            /**
             * Get header data type date => convert from unix date to IOS date
             */
            const typeDate = head?.type === "date";

            /**
             * Get header type action display custom template action in table
             */
            const isAction = head?.id === "action";

            /**
             * Get header type badge display badge style in table
             */
            const isBadge = head?.badge ? true : false;

            /**
             * Get header type status
             */
            const isStatus = head?.type === "status";
            const recordStatus = row[head.id] === 1 ? "Active" : "Inactive";

            /**
             * Get header type link
             */
            const isLink = head?.type === "link";

            /**
             * get row is array or object;
             */
            const isArray = Array.isArray(row[head?.id]);

            const isObject = typeof row[head?.id] === "object";

            const arrayValue =
              isArray && row[head?.id]?.length
                ? row[head?.id].map(function (ele) {
                    return ele[head?.arrayId] || ele;
                  })
                : [];

            /**Map button action with the condidtion */
            const buttonAction = {
              view: actions?.view
                ? typeof actions?.view === "boolean"
                  ? actions?.view
                  : checkButtonAction(row, actions?.view)
                : false,

              viewFile: actions?.viewFile
                ? typeof actions?.viewFile === "boolean"
                  ? actions?.viewFile
                  : checkButtonAction(row, actions?.viewFile)
                : false,

              viewSecFile: actions?.viewSecFile
                ? typeof actions?.viewSecFile === "boolean"
                  ? actions?.viewSecFile
                  : checkButtonAction(row, actions?.viewSecFile)
                : false,
              viewThirdFile: actions?.viewThirdFile
                ? typeof actions?.viewThirdFile === "boolean"
                  ? actions?.viewThirdFile
                  : checkButtonAction(row, actions?.viewThirdFile)
                : false,
              edit: actions?.edit
                ? typeof actions?.edit === "boolean"
                  ? actions?.edit
                  : checkButtonAction(row, actions?.edit)
                : false,

              delete: actions?.delete
                ? typeof actions?.delete === "boolean"
                  ? actions?.delete
                  : actions?.delete?.condition[row[actions?.delete?.field]]
                : false,

              create: actions?.create
                ? typeof actions?.create === "boolean"
                  ? actions?.create
                  : actions?.create?.condition[row[actions?.create?.field]]
                : false,

              moreOption: actions?.moreOption,
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
                    sx={{
                      "&.MuiTableCell-root": {
                        display: visible ? "table-cell" : "none",
                        lineHeight: "1.75rem",
                        paddingY: "unset !important",
                      },
                      fontSize: 13,
                    }}
                  >
                    {row[head.id]}
                  </TableCell>
                );
              } else {
                return !head?.Render ? (
                  <>
                    <TableCell
                      align={head.align ? head?.align : "left"}
                      key={uuid()}
                      sx={{
                        fontSize: 13,
                        color: head?.textColor
                          ? head?.textColor[row[head.id]]
                          : "",
                        "&.MuiTableCell-root": {
                          lineHeight: "1.75rem",
                          paddingY: "unset !important",
                        },
                      }}
                    >
                      {/* Use table index */}
                      {showIndex && index + 1}

                      {/* Use table date */}
                      {typeDate ? (
                        row[head.id] ? (
                          <Moment format={head?.dateFormat}>
                            {row[head.id]}
                          </Moment>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}

                      {/* Use badge style */}
                      {isStatus && (
                        <Tooltip
                          title={
                            actions?.editStatus?.[head?.id]
                              ? "Edit " + head?.label
                              : ""
                          }
                        >
                          <Typography
                            variant="h6"
                            id="tableTitle"
                            component="div"
                            sx={{
                              background: "#f5f5f5",
                              paddingLeft: 1,
                              paddingRight: 1,
                              borderRadius: 2,
                              fontWeight: "bold",
                              width: "max-content",
                              fontSize: 12,
                              color: head?.statusColor[row[head.id]],
                              cursor: actions?.editStatus?.[head?.id]
                                ? "pointer"
                                : "",
                            }}
                          >
                            {row[head.id]}
                          </Typography>
                        </Tooltip>
                      )}

                      {/* Use link */}
                      {isLink && (
                        <Link
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleLinkEvent(row)}
                        >
                          {!isObject
                            ? row[head.id]
                            : row[head?.id] && row[head?.id][head?.obj?.name]}
                        </Link>
                      )}

                      {/* Use normal field */}
                      {!showIndex &&
                        !typeDate &&
                        !isAction &&
                        !isStatus &&
                        !isBadge &&
                        !isLink &&
                        (!isArray
                          ? !isObject
                            ? row[head?.id]
                            : row[head?.id] && row[head?.id][head?.obj?.name] 
                            || row[head?.orId] && row[head?.orId][head?.obj?.name]
                          : arrayValue?.length
                          ? arrayValue.join(",\r\n").toString()
                          : "")}

                      {/* Custom button actions */}
                      {isAction && (
                        <AsyncTableAction
                          onHandleViewEvent={() => handleViewEvent(row)}
                          onHandleViewFileEvent={() => handleViewFileEvent(row)}
                          onHandleViewSecFileEvent={() =>
                            handleViewSecFileEvent(row)
                          }
                          onHandleViewThirdFileEvent={() =>
                            handleViewThirdFileEvent(row)
                          }
                          onHandleEditEvent={() => handleEditEvent(row)}
                          onHandleMoreEvent={(eventName) =>
                            handleMoreEvent(eventName, row)
                          }
                          useActions={buttonAction}
                          row={row}
                        />
                      )}
                    </TableCell>
                  </>
                ) : (
                  <TableCell
                    align={head.align ? head.align : "left"}
                    key={uuid()}
                    sx={{ fontSize: 13 }}
                  >
                    {head.Render(row[head.id], row)}
                  </TableCell>
                );
              }
            };

            return <Row key={uuid()} />;
          })
        ) : (
          <></>
        )}
      </StyledTableRow>
    );
  });
};

export default TableRows;

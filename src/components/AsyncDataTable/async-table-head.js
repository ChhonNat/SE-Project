import styled from "@emotion/styled";
import { Box } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import React from "react";
import uuid from "react-uuid";
import { appConfig } from "../../constants/app_cont";

/**
 * Style Table Header
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme?.palette?.datatable?.headerBg || appConfig.systemColor,
    color: theme?.palette?.datatable?.color || '#fff',

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
        {/* <TableCell padding="checkbox">
          <CheckBox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {headers?.length ? (
          headers.map((headCell) => {
            const allowShort =
              headCell.allowShort === undefined || headCell.allowShort === true;
            const visible =
              headCell.visible !== undefined ? headCell.visible : true;

            return (
              <StyledTableCell
                key={uuid()}
                align={headCell?.align || "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{
                  "&.MuiTableCell-root": {
                    display: visible ? "table-cell" : "none",
                  },
                }}
              >
                {allowShort && (
                  <TableSortLabel
                    // active={orderBy === headCell.sqlField}
                    direction={
                      allowShort
                        ? orderBy === headCell.sqlField
                          ? order
                          : "asc"
                        : undefined
                    }
                    onClick={
                      allowShort
                        ? createSortHandler(headCell.sqlField)
                        : undefined
                    }
                    sx={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: orderBy === headCell.sqlField ? "#f5f5f5" : "#fff",
                      "&:hover": {
                        color: "#dedede", // Change font color to red on hover
                      },
                    }}
                  >
                    {headCell.label}
                    {orderBy === headCell.sqlField ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "desc" ? "sorted descending" : "sorted ascending"}{" "}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                )}

                {!allowShort && headCell.label}
              </StyledTableCell>

            );
          })
        ) : (
          <></>
        )}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.prototype = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headers: PropTypes.array.isRequired,
};

export default EnhancedTableHead;

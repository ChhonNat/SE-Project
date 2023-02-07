//===============sideBar=======================================================================================================
import "../../App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TablePagination from "@mui/material/TablePagination";
import InterviewRow from "./interviewRow";
import appStyle from "../../constants/styles";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - interviewRecord.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columnName = [
    "Candidate Id",
    "Full Name",
    "Gender",
    "Position",
    "Department",
    "Interview Date",
    "Result",
    "Position Offer",
    "Offer Salary",
    "Join Date",
    "Action",
  ];

  const interviewRecord = [
    {
      cadidateId: "3844",
      name: "Chheng Neang",
      gender: "F",
      position: "Web Developer",
      dept: "IT",
      joinDate: "01/Jan/2023",
    },
    {
      cadidateId: "3456",
      name: "KIV Chanrotha",
      gender: "M",
      position: "Web Developer",
      dept: "IT",
      joinDate: "01/Jan/2023",
    },
    {
      cadidateId: "6789",
      name: "Sang Hang",
      gender: "M",
      position: "Web Developer",
      dept: "IT",
      joinDate: "01/Jan/2023",
    },
    {
      cadidateId: "5342",
      name: "ABC",
      gender: "M",
      position: "Web Developer",
      dept: "IT",
      joinDate: "01/Jan/2023",
    },
  ];

  return (
    <Box style={appStyle} component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid
        style={{ border: "none" }}
        container
        spacing={2}
        columns={12}
        sx={{
          "--Grid-borderWidth": "1px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "divider",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "divider",
          },
        }}
      >
        <Grid xs={6} style={{ border: "none" }}>
          Interview Record
        </Grid>
        <Grid xs={6} style={{ border: "none", textAlign: "right" }}>
          <span className="supDescr material-symbols-outlined">
            <SortIcon className="supDescr" style={{ width: "20px" }} /> Sort
          </span>
          <span className="supDescr">
            &ensp;&ensp;&ensp;&ensp;
            <FilterListIcon
              className="supDescr"
              style={{ width: "20px" }}
            />{" "}
            Filter
          </span>
        </Grid>
      </Grid>{" "}
      <br></br>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table"
          pageSize={2}
          rowsPerPageOptions={[2]}
          checkboxSelection
        >
          <TableHead>
            <TableRow>
              {columnName.map((cName) => {
                return <TableCell>{cName}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {interviewRecord.map((ir) => {
              return (
                <InterviewRow
                  cadidateId={ir.cadidateId}
                  name={ir.name}
                  gender={ir.gender}
                  position={ir.position}
                  dept={ir.dept}
                  joinDate={ir.joinDate}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={interviewRecord.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

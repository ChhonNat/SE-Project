//===============sideBar=======================================================================================================
import "../App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SortIcon from "@mui/icons-material/Sort";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import TableFooter from "@mui/material/TableFooter";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TablePagination from "@mui/material/TablePagination";
import user from "./Max-R_Headshot.jpg";

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

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      style={{ marginTop: "4%", width: "80%", float: "right" }}
      component="main"
      sx={{ flexGrow: 1, p: 3 }}
    >
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
          ALL TIME
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
              <TableCell>User</TableCell>
              <TableCell></TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className="tableHover">
              <TableCell style={{ width: "30px" }}>
                <img src={user} className="w-10 bord_rad_img" alt="user1" />
              </TableCell>
              <TableCell>
                Contact Email not Linked <br></br>
                <p className="supDescr">Updated 1 day ago</p>
              </TableCell>
              <TableCell>
                Tom Cruise<br></br>
                <p className="supDescr">on 24.05.2019</p>
              </TableCell>
              <TableCell>
                May 26, 2019<br></br>
                <p className="supDescr">6:30 PM</p>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="error" size="small">
                  High
                </Button>
              </TableCell>
              <TableCell>
                <MoreVertIcon className="supDescr threedot" />
              </TableCell>
            </TableRow>
            <TableRow className="tableHover">
              <TableCell style={{ width: "30px" }}>
                <img src={user} className="w-10 bord_rad_img" alt="facebook" />
              </TableCell>
              <TableCell>
                Adding Images to Featured Posts<br></br>
                <p className="supDescr">Updated 1 day ago</p>
              </TableCell>
              <TableCell>
                Tom Cruise<br></br>
                <p className="supDescr">on 24.05.2019</p>
              </TableCell>
              <TableCell>
                May 26, 2019<br></br>
                <p className="supDescr">6:30 PM</p>
              </TableCell>
              <TableCell>
                <Button variant="contained" className="yellow" size="small">
                  low
                </Button>
              </TableCell>
              <TableCell>
                <MoreVertIcon className="supDescr threedot" />
              </TableCell>
            </TableRow>
            <TableRow className="tableHover">
              <TableCell style={{ width: "30px" }}>
                <img src={user} className="w-10 bord_rad_img" alt="facebook" />
              </TableCell>
              <TableCell>
                Adding Images to Featured Posts<br></br>
                <p className="supDescr">Updated 1 day ago</p>
              </TableCell>
              <TableCell>
                Tom Cruise<br></br>
                <p className="supDescr">on 24.05.2019</p>
              </TableCell>
              <TableCell>
                May 26, 2019<br></br>
                <p className="supDescr">6:30 PM</p>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="success" size="small">
                  Normal
                </Button>
              </TableCell>
              <TableCell>
                <MoreVertIcon className="supDescr threedot" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

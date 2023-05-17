//===============sideBar=======================================================================================================
import "../../App.css";
import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//body==============================
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//appBar==============================

export default function MiniDrawer() {
  //table==================
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
  ];

  return (
    <Box sx={{ display: "flex" }} style={{ width: "85%", float: "right" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={12}>
            <Grid xs={3}>
              <Item className="hoverBorder">
                <span className="textDescri">Morning</span>
                <br></br>
                <br></br>
                07:00 AM<br></br>
                12:10 PM<br></br>
              </Item>
            </Grid>
            <Grid xs={3}>
              <Item className="hoverBorder">
                <span className="textDescri">Afternoon</span>
                <br></br>
                <br></br>
                12:00 PM<br></br>
                06:10 PM<br></br>
              </Item>
            </Grid>
            <Grid xs={3}>
              <Item className="hoverBorder">
                <span className="textDescri">Evening</span>
                <br></br>
                <br></br>
                00:00 AM<br></br>
                00:00 PM<br></br>
              </Item>
            </Grid>
            <Grid xs={3}>
              <Item className="hoverBorder">
                <span className="textDescri">Your Shift</span>
                <br></br>
                <br></br>
                M: 08:00 - 12:00<br></br>
                A: 12:00 - 06:00 PM<br></br>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <br></br>
        <Typography>Public Holiday</Typography>
        <p className="supDescr">as of December 2022</p>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid
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
            <Grid className="dayWeekTitle" xs={1.71}>
              Monday
            </Grid>
            <Grid className="dayWeekTitle" xs={1.71}>
              Tuesday
            </Grid>
            <Grid className="dayWeekTitle" xs={1.71}>
              Wednesday
            </Grid>
            <Grid className="dayWeekTitle" xs={1.71}>
              Thursday
            </Grid>
            <Grid className="dayWeekTitle" xs={1.71}>
              Friday
            </Grid>
            <Grid className="dayWeekTitle" xs={1.71}>
              Saturday
            </Grid>
            <Grid className="holidayTitle" xs={1.71}>
              Sunday
            </Grid>
          </Grid>
          <br></br>
          <Grid
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
            <Grid xs={1.71} className="dayWeek">
              1<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek dayLeave">
              2<br></br>
              <br></br>
              <span className="textDescri">On leave</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              3<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              4<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              5<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              6<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek dayHoliday">
              7<br></br>
              <br></br>
              <span className="textDescriHoliday">Holiday</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              8<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              9<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              10<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek dayHoliday">
              11<br></br>
              <br></br>
              <span className="textDescriHoliday">
                Winter Solstice Festival
              </span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              12<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              13<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek dayHoliday">
              14<br></br>
              <br></br>
              <span className="textDescriHoliday">Holiday</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              15<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek dayLeave">
              16<br></br>
              <br></br>
              <span className="textDescri">On leave</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              17<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              18<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              19<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              20<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek dayHoliday">
              21<br></br>
              <br></br>
              <span className="textDescriHoliday">Holiday</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              22<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              23<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              24<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              25<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              26<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              27<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek dayHoliday">
              28<br></br>
              <br></br>
              <span className="textDescriHoliday">Holiday</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              29<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              30<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
            <Grid xs={1.71} className="dayWeek">
              31<br></br>
              <br></br>
              <span className="textDescri">Woking normaly</span>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid
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
            <Grid xs={6}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Request that requires your actions <br></br>
                        <p className="supDescr">
                          Group: <span style={{ color: "black" }}>Support</span>
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        <a href="#" className="viewDetail">
                          View details
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        className="tableHover"
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid xs={6}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ border: "none" }}>
                        Request that requires your actions <br></br>
                        <p className="supDescr">This month</p>
                      </TableCell>
                      <TableCell align="right" style={{ border: "none" }}>
                        <a href="#" className="viewDetail">
                          View all
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow style={{ border: "none" }}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ color: "gray", fontSize: "12px" }}
                      >
                        Create new task
                      </TableCell>
                      <TableCell align="right">
                        <a href="#" className="iconPlus">
                          +
                        </a>
                      </TableCell>
                    </TableRow>
                    <TableRow className="tableHover">
                      <TableCell component="th" scope="row">
                        <Checkbox label="Label" />
                        Finish ticket update
                      </TableCell>
                      <TableCell align="right" style={{ color: "gray" }}>
                        <Button variant="contained" color="error" size="small">
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow className="tableHover">
                      <TableCell component="th" scope="row">
                        <Checkbox label="Label" />
                        Create new ticket example
                      </TableCell>
                      <TableCell align="right" style={{ color: "gray" }}>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                        >
                          Approved
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

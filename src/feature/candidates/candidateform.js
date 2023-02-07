import * as React from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function BasicTextFields() {
  const [gender, setGender] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [business, setBusiness] = React.useState("");
  const [receivedFr, setReFr] = React.useState("");
  const [shortlistWeek, setShWe] = React.useState("");
  const [shortlistedReesult, setShRe] = React.useState("");

  const handleChangeGe = (event) => {
    setGender(event.target.value);
  };
  const handleChangePo = (event) => {
    setPosition(event.target.value);
  };
  const handleChangeDe = (event) => {
    setDepartment(event.target.value);
  };
  const handleChangeBu = (event) => {
    setBusiness(event.target.value);
  };
  const handleChangeReFr = (event) => {
    setReFr(event.target.value);
  };
  const handleChangeShWe = (event) => {
    setShWe(event.target.value);
  };
  const handleChangeShRe = (event) => {
    setShRe(event.target.value);
  };

  const columnGender = ["Male", "Female"];
  const columnPosition = ["Web Developer", "Senior Web Developer"];
  const columnDepartment = ["Information Technology", "Human Resource"];
  const columnBusiness = ["MJQE", "MMN"];
  const columnReceived = ["CHHENG Neang", "CHRIC Minea"];
  const columnShortlistWe = [
    "First Week",
    "Second Week",
    "Third Week",
    "Four Week",
  ];
  const columnShortlistRe = ["Pass", "Fail"];

  // const [firstName, setUserfirstName] = useState("");

  return (
    <Box
      style={{
        marginTop: "6%",
        width: "81%",
        float: "right",
      }}
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid xs={6} style={{ border: "none" }}>
        Candidate From
      </Grid>
      <TextField
        id="first-name"
        label="First Name"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        id="last-name"
        InputLabelProps={{
          shrink: true,
        }}
        label="Last Name"
        variant="outlined"
      />

      <FormControl fullWidth>
        <InputLabel id="department-id-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          value={gender}
          label="Gender"
          onChange={handleChangeGe}
        >
          {columnGender.map((cName) => {
            return <MenuItem value={cName}>{cName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <TextField
        id="phone-number"
        InputLabelProps={{
          shrink: true,
        }}
        label="Phone Number"
        variant="outlined"
      />
      <TextField
        id="department-id"
        InputLabelProps={{
          shrink: true,
        }}
        label="Last Name"
        variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="department-id-label">Position</InputLabel>
        <Select
          labelId="Position-id-label"
          id="Position-id"
          value={position}
          label="Position"
          onChange={handleChangePo}
        >
          {columnPosition.map((cName) => {
            return <MenuItem value={cName}>{cName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="department-id-label">Department</InputLabel>
        <Select
          labelId="department-id-label"
          id="department-id"
          value={department}
          label="Department"
          onChange={handleChangeDe}
        >
          {columnDepartment.map((cName) => {
            return <MenuItem value={cName}>{cName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="department-id-label">Business</InputLabel>
        <Select
          labelId="business-id-label"
          id="business-id"
          value={business}
          label="Business"
          onChange={handleChangeBu}
        >
          {columnBusiness.map((cName) => {
            return <MenuItem value={cName}>{cName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="received-id-label">Received From</InputLabel>
        <Select
          labelId="received-from-id-label"
          id="received-id"
          value={receivedFr}
          label="Received From"
          onChange={handleChangeReFr}
        >
          {columnReceived.map((cName) => {
            return <MenuItem value={cName}>{cName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="received-id-label">Shortlist Week </InputLabel>
        <Select
          labelId="shortlist-week-label"
          id="shortlist-week"
          value={shortlistWeek}
          label="ShortlistWeek"
          onChange={handleChangeShWe}
        >
          {columnShortlistWe.map((cName) => {
            return <MenuItem value={cName}>{cName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="received-id-label">Shortlist Result </InputLabel>
        <Select
          labelId="shortlisted_result_id_label"
          id="shortlisted_result_id"
          value={shortlistedReesult}
          label="shortlisted_result_id"
          onChange={handleChangeShRe}
        >
          {columnShortlistRe.map((cName) => {
            return <MenuItem value={cName}>{cName}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <TextField
        id="location"
        InputLabelProps={{
          shrink: true,
        }}
        label="Location"
        variant="outlined"
      />
      <TextField
        id="applied-date"
        label="Applied date"
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="file-part"
        label="File Part"
        type="file"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="shortlist-date"
        label="Shortlist date"
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {/* <FormControl fullWidth>
        <InputLabel id="department-id-label">Recruiter</InputLabel>
        <Select
          labelId="recruiter-id-label"
          id="recruiter-id"
          value={age}
          label="Recruiter id"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl> */}
      <hr
        style={{
          width: "100%",
          float: "right",
        }}
      />
      <br></br>
      <Button className="btn-submit" variant="outlined" color="success">
        Save
      </Button>
      <Button className="btn-submit" variant="outlined" color="error">
        Cancel
      </Button>
    </Box>
  );
}

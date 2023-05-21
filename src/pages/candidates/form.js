import React, { useState } from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CustomSelect from "../../components/select/select";
import { API_URL } from "../../constants/apiUrl";
import { LOCAL_STORAGE_KEYS } from "../../constants/localStorage";
import { candidateService } from "../../services/candidate.service";
import { useForm } from "react-hook-form";

export default function BasicTextFields() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [business, setBusiness] = useState("");
  const [receivedFr, setReceivedFr] = useState("");
  const [recruiter, setRecruiter] = useState("");
  const [shortlistWeek, setShWe] = useState("");
  const [shortlistedReesult, setShRe] = useState("");

  const genders = [{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }];

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  const shrinkOpt = { shrink: true };

  const handleCreateCandidate = data => console.log(errors);

  return (
    <Box sx={{ width: '100%' }} component="form" onSubmit={handleSubmit(handleCreateCandidate)} >
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>

          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={shrinkOpt}
            required
            {...register("first_name", { required: true })}
          />
          {errors?.first_name?.type === "required" && <p style={{ fontSize: 10, color: 'red' }}>This field is required</p>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={shrinkOpt}
             {...register("last_name", { required: true })}
          />
            {errors?.last_name?.type === "required" && <p style={{ fontSize: 10, color: 'red' }}>This field is required</p>}
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            id={'department-id'}
            label={'Gender'}
            value={gender}
            handleOnChange={(e) => setGender(e?.target?.value)}
            size={'small'}
            isRequire={true}
            customDatas={genders}
            {...register('gender',{required:true})}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField id="phone-number"
            label="Phone Number"
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={shrinkOpt}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            id="position-id"
            label={'Position'}
            value={position}
            size={'small'}
            handleOnChange={(e) => setPosition(e?.target?.value)}
            callToApi={API_URL.position.get}
            dataStorage={LOCAL_STORAGE_KEYS.position_data}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            id="department-id"
            label={'Department'}
            value={department}
            size={'small'}
            handleOnChange={(e) => setDepartment(e?.target?.value)}
            callToApi={API_URL.department.get}
            dataStorage={LOCAL_STORAGE_KEYS.department_data}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            id="business-id"
            label={'Business'}
            value={business}
            size={'small'}
            handleOnChange={(e) => setBusiness(e?.target?.value)}
            callToApi={API_URL.business.get}
            dataStorage={LOCAL_STORAGE_KEYS.business_data}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            id="received-id"
            label={'Received From'}
            value={receivedFr}
            size={'small'}
            handleOnChange={(e) => setReceivedFr(e?.target?.value)}
            callToApi={API_URL.receiveCategory.get}
            dataStorage={LOCAL_STORAGE_KEYS.receive_category_data}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            id="recruiter-id"
            label={'Recruiter'}
            value={recruiter}
            size={'small'}
            handleOnChange={(e) => setRecruiter(e?.target?.value)}
            callToApi={API_URL.recruiter.get}
            dataStorage={LOCAL_STORAGE_KEYS.recruiter_data}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="applied-date"
            label="Applied date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="file-part"
            label="File Part"
            type="file"
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
          />
        </Grid>
      </Grid>
      <br></br>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        columnGap={2}
      >
        <Button className="btn-submit" variant="contained" type="submit">
          Save
        </Button>
        <Button className="btn-submit" variant="contained" color="error">
          Cancel
        </Button>
      </Grid>
    </Box>
  );
}

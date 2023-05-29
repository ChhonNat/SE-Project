import React, { useCallback, useEffect, useState } from "react";
import "../../App.css";
import Box from "@mui/material/Box";
import { TextField, Button, Grid } from "@mui/material";
import SelectComponent from "../../components/Selector/select";
import { useController, useFieldArray, useForm, useWatch } from "react-hook-form";
import CandidateModel from "../../models/candidate.model";
import { API_URL } from "../../constants/api_url";

import { zodResolver } from '@hookform/resolvers/zod';
import { departmentService } from "../../services/department.service";
import { positionService } from "../../services/position.service";
import { filter } from "../../constants/api_filter";
import { globalService } from "../../services/global.service";


export default function CandidateForm() {

  const { register, handleSubmit, formState, setValue, watch } = useForm({ resolver: zodResolver(CandidateModel) });
  const watchCandidate = watch();

  const genders = [{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }];
  const shrinkOpt = { shrink: true };

  const { errors } = formState;

  const [listDepartments, setListDepartments] = useState([]);
  const [listPositions, setListPositions] = useState([]);
  const [listBusinesses, setListBusinesses] = useState([]);
  const [listReceivingCategories, setListReceivingCategories] = useState([]);
  const [listRecruiters, setListRecruiters] = useState([]);

  const [filterDep, setFilterDep] = useState(filter.department);
  const [filterPos, setFilterPos] = useState(filter.position);

  /**
   * Fetch department datas
   */
  useEffect(() => {
    fetchData(API_URL.department.get, setListDepartments);
  }, []);

  /**
   * Fetch position datas
   */
  useEffect(() => {
    fetchData(API_URL.position.get, setListPositions);
  }, [filterPos.search]);

  /**
   * Fetch business datas
   */
  useEffect(() => {
    fetchData(API_URL.business.get, setListBusinesses);
  }, []);

  /**
   * Fetch received categiry datas
   */
  useEffect(() => {
    fetchData(API_URL.receiveCategory.get, setListReceivingCategories);
  },[])

  /**
   * Fetch recruiter datas
   */
  useEffect(() => {
    fetchData(API_URL.recruiter.get, setListRecruiters);
  },[])

  const onError = (error, e) => console.log('>>>', error, e);
  const onSubmit = (data, e) => {
    console.log('data',data);
  }


  /**
   * Fetch data to listing in each selector
   */
  const fetchData = useCallback(async (url, setDatas) => {
    try {
      const req = await globalService.getData(url);

      const { success, data } = req?.data;
      success ? setDatas(data) : setDatas([]);

    } catch (error) {
      console.log(error)
    }
  }, []
  );

  return (
    <Box sx={{ width: '100%' }} component="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Input First Name */}
        <Grid item xs={12}>
          <TextField
            type="text"
            id="first-name"
            label="First Name"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={shrinkOpt}
            error={errors?.firstName}
            helperText={errors?.firstName?.message}
            {...register("firstName")}
          />
        </Grid>
        {/* Input Last Name */}
        <Grid item xs={12}>
          <TextField
            type="text"
            id="last-name"
            label="First Name"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={shrinkOpt}
            error={errors?.lastName}
            helperText={errors?.lastName?.message}
            {...register("lastName")}
          />
        </Grid>
        {/* Select Gender */}
        <Grid item xs={12}>
          <SelectComponent
            id={'gender-id'}
            label={'Gender'}
            size={'small'}
            customDatas={genders}
            value={watchCandidate?.gender || ""}
            returnValueAs={'name'}
            handleOnChange={(e) => setValue('gender', e?.target?.value)}
            err={errors?.gender?.message}
          />
        </Grid>
        {/* Input Phone Number */}
        <Grid item xs={12}>
          <TextField
            type="text"
            id="phone-name"
            label="Phone"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={shrinkOpt}
            error={errors?.phoneNumber}
            helperText={errors?.phoneNumber?.message}
            {...register("phoneNumber")}
          />
        </Grid>
        {/* Select Position */}
        <Grid item xs={12}>
          <SelectComponent
            id="position-id"
            label={'Position'}
            size={'small'}
            customDatas={listPositions}
            value={watchCandidate?.positionId || ""}
            handleOnChange={(e) => setValue('positionId', e?.target?.value)}
            err={errors?.positionId?.message}
          />
        </Grid>
        {/* Select Department */}
        <Grid item xs={12}>
          <SelectComponent
            id="department-id"
            label={'Department'}
            size={'small'}
            customDatas={listDepartments}
            value={watchCandidate?.departmentId || ""}
            handleOnChange={(e) => setValue('departmentId', e?.target?.value)}
            err={errors?.positionId?.message}
          />
        </Grid>
        {/* Select Business */}
        <Grid item xs={12}>
          <SelectComponent
            id="business-id"
            label={'Business'}
            size={'small'}
            customDatas={listBusinesses}
            value={watchCandidate?.businessId || ""}
            handleOnChange={(e) => setValue('businessId', e?.target?.value)}
            err={errors?.positionId?.message}
          />
        </Grid>
        {/* Input Location */}
        <Grid item xs={12}>
          <TextField
            id="location-id"
            label="Location"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={shrinkOpt}
            {...register("location")}
          />
        </Grid>
        {/* Select Received From Category */}
        <Grid item xs={12}>
          <SelectComponent
            id="received-id"
            label={'Received From'}
            size={'small'}
            customDatas={listReceivingCategories}
            value={watchCandidate?.receivedId || ""}
            handleOnChange={(e) => setValue('receivedId', e?.target?.value)}
            err={errors?.positionId?.message}
          />
        </Grid>
        {/* Select Recruiter */}
        <Grid item xs={12}>
          <SelectComponent
            id="recruiter-id"
            label={'Recruiter'}
            size={'small'}
            customDatas={listRecruiters}
            value={watchCandidate?.recruiterId || ""}
            handleOnChange={(e) => setValue('recruiterId', e?.target?.value)}
            err={errors?.positionId?.message}
          />
        </Grid>
        {/* Input Apply Date */}
        <Grid item xs={12}>
          <TextField
            type="date"
            id="apply-date-id"
            label="appliedDate"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={shrinkOpt}
            {...register("appliedDate")}
            error={errors?.appliedDate}
            helperText={errors?.appliedDate?.message}
          />
        </Grid>
        {/* Input Short List Date */}
        <Grid item xs={12}>
          <TextField
            type="date"
            id="short-list-date-id"
            label="shortListedDate"
            variant="outlined"
            fullWidth
            size="small"
            InputLabelProps={shrinkOpt}
            {...register("shortListedDate")}
            error={errors?.shortListedDate}
            helperText={errors?.shortListedDate?.message}
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

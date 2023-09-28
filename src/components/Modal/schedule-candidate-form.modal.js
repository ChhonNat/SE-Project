import React, { forwardRef, useCallback, useEffect, useState } from "react";
import TitleComponent from "../Page/title";
import FooterComponent from "../Page/footer";
import AsyncAutoComplete from "../AutoComplete/auto-complete";
import AsyncMultiAutoComplete from "../MultiAutoComplete/auto-complete";
import LabelRequire from "../Label/require";
import _useHttp from "../../hooks/_http";
import Swal from "sweetalert2";

import { STATUS } from "../../constants/status";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "../../constants/api_url";
import {
  Autocomplete,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { candidateService } from "../../services/candidate.service";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { Close } from "@mui/icons-material";
import { InterviewModel } from "../../models/interview.model";
import { ConverterService } from "../../utils/converter";
import { HTTP_METHODS } from "../../constants/http_method";

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateScheduleFormModal = (props) => {
  const shrinkOpt = { shrink: true };

  //map event when get event from home candidate
  const mapEventType = {
    setSuggestInterview: {
      title: "Are you sure?",
      subTitle: "You want to suggest schedule for interview.",
      actions: {
        submitLabel: "Confirm",
        submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
        select: false,
        getInterviewDetail: false,
      },
    },
    setSuggestSecondInterview: {
      title: "Are you sure?",
      subTitle: "You want to set second schedule for interview.",
      actions: {
        submitLabel: "Confirm",
        submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
        select: false,
        getInterviewDetail: true,
      },
    },
    confirmInterviewSchedule: {
      title: "Are you sure?",
      subTitle: "You want to set final schedule for interview.",
      actions: {
        submitLabel: "Confirm",
        submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
        select: false,
        getInterviewDetail: true,
      },
    },
  };

  //get props data
  const {
    open,
    onCloseModal,
    eventType,
    editData,
    handleEventSucceed,
    apiService,
  } = props;

  //use http hook
  const { data, loading, error, message, sendRequest } = _useHttp();

  //user react hook form
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    reset,
    setError,
    clearErrors,
  } = useForm({ resolver: zodResolver(InterviewModel.Invite) });

  const watchInterview = watch();
  const { errors } = formState;
  const [hours, setHours] = useState([]);
  const [minutes, setMinutes] = useState([]);

  useEffect(() => {
    clearErrors();

    if (open) {
      const stringH = [];
      const stringMin = [];
      const H = [...Array(23).keys()];
      const Min = [...Array(60).keys()];

      //Set hours
      H.forEach((value) => {
        value++;
        value < 10
          ? stringH.push({ h: "0" + value })
          : stringH.push({ h: String(value) });
      });
      setHours([...stringH]);

      //Set minute
      Min.forEach((value) => {
        value < 10
          ? stringMin.push({ min: "0" + value })
          : stringMin.push({ min: String(value) });
      });
      setMinutes([...stringMin]);
    }

    if (mapEventType[eventType]?.actions?.getInterviewDetail) {
      getInterviewDetail();
    } else {
      setValue(
        "interviewDate",
        ConverterService.convertUnixDateToMUI(new Date())
      );
      setValue("headDepartmentId", editData?.headDepartmentId);
      setValue("departments", [
        { id: editData?.departmentId, nameEn: editData?.departmentName },
      ]);
    }
  }, [open]);

  const getInterviewDetail = useCallback(async () => {
    await sendRequest(
      `${API_URL.interview.detail}${editData?.id}`,
      HTTP_METHODS.post
    );
  }, [editData?.id]);

  useEffect(() => {
    if (data?.id) {
      //to format data to display the same suggest interview date by HOD
      data.headDepartmentId = data?.headDepartment?.id;
      data.headDepartmentName = data?.headDepartment?.fullName;

      setValue(
        "interviewDate",
        ConverterService.convertUnixDateToMUI(data?.interviewDate)
      );
      setValue("headDepartmentId", data?.headDepartment?.id);
      setValue("departments", data?.departments);
      setValue("committees", data?.committees);
      setValue(
        "hour",
        ConverterService.padToNDigits(
          2,
          new Date(data?.interviewDate).getHours()
        )
      );
      setValue(
        "min",
        ConverterService.padToNDigits(
          2,
          new Date(data?.interviewDate).getMinutes()
        )
      );
    }
  }, [data]);

  const onError = (error) => {
    console.log("Input error", error);
    if (error?.hour) setError("hour", { message: "Hour is required!" });
    if (error?.min) setError("min", { message: "Minute is required!" });
  };

  const onSubmit = async (dataInput) => {
    try {
      let submitCandidate;
      const dataSubmit = {
        interviewDate: `${dataInput.interviewDate}T${dataInput.hour}:${dataInput?.min}`,
        headDepartmentId: dataInput?.headDepartmentId,
        committees: dataInput?.committees,
        remark: dataInput?.remark,
      };

      if (apiService)
        submitCandidate = await apiService(
          editData?.id,
          editData?.candidate?.id,
          dataSubmit
        );
      else
        submitCandidate = await candidateService.suggestScheduleInterview(
          editData?.id,
          dataSubmit
        );

      const { status, data } = submitCandidate;
      const { message } = data;

      if (status === HTTP_STATUS.success) {
        if (data?.status === DATA_STATUS.success) handleEventSucceed();

        Swal.fire({
          title: data?.status === DATA_STATUS.success ? "Success" : "Warning",
          text: message,
          icon: data?.status === DATA_STATUS.success ? "success" : "warning",
          confirmButtonText: "OK",
        });

        handleCloseModal();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseModal = () => {
    reset();
    clearErrors();
    onCloseModal();
  };

  return (
    <div>
      <Dialog
        TransitionComponent={TransitionModal}
        open={open}
        component="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        onClose={onCloseModal}
      >
        <DialogTitle>
          <TitleComponent
            title={mapEventType[eventType]?.title}
            subTitle={mapEventType[eventType]?.subTitle}
          />
          {onCloseModal ? (
            <IconButton
              aria-label="close"
              onClick={onCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          ) : null}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={4}>
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  id="interview-date"
                  label={<LabelRequire label="Interview Date" />}
                  variant="outlined"
                  type="date"
                  InputLabelProps={shrinkOpt}
                  error={errors?.interviewDate ? true : false}
                  helperText={errors?.interviewDate?.message || ""}
                  {...register("interviewDate")}
                />
              </Grid>

              <Grid item xs={3}>
                <Autocomplete
                  id="hour"
                  size="small"
                  freeSolo
                  options={hours.map((option) => option.h)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<LabelRequire label="Hour" />}
                      error={
                        errors?.hour && !watchInterview?.hour ? true : false
                      }
                      helperText={
                        errors?.hour?.message && !watchInterview?.hour
                          ? errors?.hour?.message
                          : ""
                      }
                    />
                  )}
                  onChange={(e, value) => setValue("hour", value)}
                  value={watchInterview?.hour || "01"}
                />
              </Grid>

              <Grid item xs={3}>
                <Autocomplete
                  id="minute"
                  size="small"
                  freeSolo
                  options={minutes.map((option) => option.min)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<LabelRequire label="Minute" />}
                      error={errors?.min && !watchInterview?.min ? true : false}
                      helperText={
                        errors?.min?.message && !watchInterview?.min
                          ? errors?.min?.message
                          : ""
                      }
                    />
                  )}
                  onChange={(e, value) => setValue("min", value)}
                  value={watchInterview?.min || "00"}
                />
              </Grid>

              <Grid item xs={2}>
                <Autocomplete
                  id="meridiem"
                  size="small"
                  freeSolo
                  options={["AM", "PM"].map((option) => option)}
                  renderInput={(params) => <TextField {...params} label="" />}
                  onChange={(e, value) => setValue("meridiem", value)}
                  yar
                  value={parseInt(watchInterview?.hour) > 12 ? "PM" : "AM"}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <AsyncAutoComplete
                  id="hod"
                  size="small"
                  label="Head Department"
                  limitTags={10}
                  customDatas={
                    mapEventType[eventType]?.actions?.getInterviewDetail
                      ? [data]
                      : [editData]
                  }
                  bindField={"headDepartmentName"}
                  value={editData?.id}
                  disabled={true}
                />
              </Grid>

              <Grid item xs={12}>
                {mapEventType[eventType]?.actions?.getInterviewDetail ? (
                  <>
                    {data?.departments && (
                      <AsyncMultiAutoComplete
                        id="department"
                        label="Department"
                        isRequire={true}
                        size="small"
                        limitTags={10}
                        callToApi={API_URL.lookup.department.get}
                        bindField={"nameEn"}
                        value={
                          !watchInterview?.departments?.length
                            ? data?.departments
                            : watchInterview?.departments
                        }
                        handleOnChange={(e, val) => {
                          val?.length ? setValue("departments", val?.length ? val : []) : setValue("departments",[])
                        }}
                        err={errors?.departments?.message}
                      />
                    )}
                  </>
                ) : (
                  <AsyncMultiAutoComplete
                    id="department"
                    label="Department"
                    isRequire={true}
                    size="small"
                    limitTags={10}
                    callToApi={API_URL.lookup.department.get}
                    bindField={"nameEn"}
                    value={
                      !watchInterview?.departments?.length
                        ? [
                            {
                              id: editData?.departmentId,
                              nameEn: editData?.departmentName,
                            },
                          ]
                        : watchInterview?.departments
                    }
                    handleOnChange={(e, val) => {
                      setValue("departments", val?.length ? val : []);
                    }}
                    err={errors?.departments?.message}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                {mapEventType[eventType]?.actions?.getInterviewDetail ? (
                  <>
                    {data?.committees && (
                      <AsyncMultiAutoComplete
                        id="key-person-committee"
                        label="Interviewer Committee"
                        isRequire={true}
                        size="small"
                        limitTags={10}
                        callToApi={
                          watchInterview?.departments?.length
                            ? API_URL.lookup.committee.get
                            : ""
                        }
                        reqBody={{
                          departments: watchInterview?.departments?.length
                            ? watchInterview?.departments?.map((ele) => ele.id)
                            : [],
                        }}
                        httpMethod={"post"}
                        bindField={"fullName"}
                        value={
                          !watchInterview?.committees?.length
                            ? data?.committees
                            : watchInterview?.committees
                        }
                        handleOnChange={(e, val) =>
                          setValue("committees", val?.length ? val : [])
                        }
                        err={errors?.committees?.message}
                      />
                    )}
                  </>
                ) : (
                  <AsyncMultiAutoComplete
                    id="key-person-committee"
                    label="Interviewer Committee"
                    isRequire={true}
                    size="small"
                    limitTags={10}
                    callToApi={
                      watchInterview?.departments?.length
                        ? API_URL.lookup.committee.get
                        : ""
                    }
                    reqBody={{
                      departments: watchInterview?.departments?.length
                        ? watchInterview?.departments?.map((ele) => ele?.id)
                        : [],
                    }}
                    httpMethod={"post"}
                    bindField={"fullName"}
                    value={watchInterview?.committees}
                    handleOnChange={(e, val) => {
                      setValue("committees", val?.length ? val : []);
                    }}
                    err={errors?.committees?.message}
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  id="Remark"
                  label="Remark"
                  multiline
                  minRows={2}
                  maxRows={10}
                  variant="outlined"
                  {...register("remark")}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <FooterComponent
            saveButtonType="submit"
            saveButtonLabel={mapEventType[eventType]?.actions?.submitLabel}
            handleCancel={onCloseModal}
            actions={{ cancel: true, submit: true }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CandidateScheduleFormModal;
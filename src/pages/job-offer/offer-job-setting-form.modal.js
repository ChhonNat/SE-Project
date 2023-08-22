import React, { forwardRef, useEffect } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import AsyncAutoComplete from "../../components/AutoComplete/auto-complete";
import LabelRequire from "../../components/Label/require";
import Swal from "sweetalert2";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { jobOfferService } from "../../services/job-offer.service";
import { ConverterService } from "../../utils/converter";
import { API_URL } from "../../constants/api_url";
import { JobOfferModel } from "../../models/job-offer.model";

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OfferJobFormModal = (props) => {
  const { modalType, open, onCloseModal, jobOffer, handleEventSucceed } = props;

  const mapModalType = {
    offer: {
      modalTitle: "Job Offer",
      saveActionLabel: "Offer",
      formModel: JobOfferModel.OfferModel,
      hideInputSalary: false,
      hideUploadFile: false,
      isOffer: true,
    },
    submitToHOD: {
      modalTitle: "Submit To Head Department",
      saveActionLabel: "Submit",
      formModel: JobOfferModel.SubmitToHOD,
      hideInputSalary: true,
      hideUploadFile: true,
      isSubmitToHOD: true,
      proStatus: "Submitted_HOD",
    },
    approveByHOD: {
      modalTitle: "Approve Job Offer",
      saveActionLabel: "Approve",
      formModel: JobOfferModel.ApproveModel,
      hideInputSalary: true,
      hideUploadFile: true,
      proStatus: "HOD_Approved",
    },
    rejectByHOD: {
      modalTitle: "Reject Job Offer",
      saveActionLabel: "Reject",
      formModel: JobOfferModel.RejectModel,
      hideInputSalary: true,
      hideUploadFile: true,
      proStatus: "HOD_Rejected",
    },
    rejectByHR: {
      modalTitle: "Reject Job Offer",
      saveActionLabel: "Reject",
      formModel: JobOfferModel.RejectModel,
      hideInputSalary: true,
      hideUploadFile: true,
      proStatus: "DHR_Rejected",
    },
    rejectByOFCCEO: {
      modalTitle: "Reject Job Offer",
      saveActionLabel: "Reject",
      formModel: JobOfferModel.RejectModel,
      hideInputSalary: true,
      hideUploadFile: true,
      proStatus: "OFCCEO_Rejected",
    },
    verify: {
      modalTitle: "Verify Job Offer",
      saveActionLabel: "Verify",
      formModel: JobOfferModel.VerifyModel,
      hideInputSalary: true,
      hideUploadFile: true,
      isOffer: false,
      proStatus: "DHR_Verified",
    },
    approveByOFCCEO: {
      modalTitle: "Approve Job Offer",
      saveActionLabel: "Approve",
      formModel: JobOfferModel.ApproveModel,
      hideInputSalary: true,
      hideUploadFile: true,
      isOffer: false,
      proStatus: "OFCCEO_Approved",
    },
    hire: {
      modalTitle: "Hire Applicant",
      saveActionLabel: "Hire",
      formModel: JobOfferModel.HireModel,
      hideInputSalary: true,
      hideUploadFile: false,
      isOffer: false,
      isHire: true,
    },
  };

  const formatKeyDate = [
    "signedOfferLetterDate",
    "signedContractDate",
    "joinedDate",
  ];

  const {
    register,
    handleSubmit,
    formState,
    reset,
    setError,
    watch,
    clearErrors,
    setValue,
  } = useForm({ resolver: zodResolver(mapModalType[modalType]?.formModel) });
  const { errors } = formState;

  const watchData = watch();

  useEffect(() => {
    reset();
    clearErrors();

    if (
      mapModalType[modalType]?.isOffer &&
      jobOffer?.id &&
      parseInt(jobOffer?.offerSalary) > 0
    ) {
      setValue("offerSalary", String(jobOffer?.offerSalary));
      setValue(
        "campusId",
        jobOffer?.offerCampus?.id
          ? jobOffer?.offerCampus?.id
          : jobOffer?.campus?.id
      );
      setValue(
        "positionId",
        jobOffer?.offerPostion?.id
          ? jobOffer?.offerPostion?.id
          : jobOffer?.position?.id
      );
      setValue(
        "positionLevelId",
        jobOffer?.offerPositionLevel?.id
          ? jobOffer?.offerPositionLevel?.id
          : jobOffer?.positionLevel?.id
      );
      setValue("remark", jobOffer?.remark);
    }
  }, [open]);

  const handleOnSubmit = async (submitData) => {
    const { id, candidate } = jobOffer;
    if (!id || !candidate?.id) return;

    const { offerSalary, remark, file } = submitData;
    let reqSubmit;
    let formSubmit = new FormData();

    if (!mapModalType[modalType]?.hideUploadFile) {
      if (!watchData?.file)
        return setError("file", { message: "Job offer form is required!" });

      if (watchData?.file) {
        const { file } = submitData;
        const oneByte = 1048576;
        const limitTenMB = 10 * oneByte;

        if (file?.size > limitTenMB)
          return setError("file", {
            message: "File is required maximum 10MB!",
          });
      }
    }

    if (mapModalType[modalType]?.isHire) {
      Object.keys(submitData).forEach((key) => {
        formSubmit.append(
          key,
          formatKeyDate.includes(key)
            ? ConverterService.convertDateToAPI(submitData[key])
            : submitData[key]
        );
      });

      reqSubmit = await jobOfferService.hire(
        id,
        candidate?.id,
        formSubmit,
        "multipart/form-data"
      );
    } else if (mapModalType[modalType]?.isOffer) {
      if (!offerSalary || parseFloat(offerSalary) < 0.1) {
        setError("offerSalary", { message: "Offer salary is required!" });
        return;
      }

      Object.keys(submitData).forEach((key) => {
        formSubmit.append(key, submitData[key]);
      });

      reqSubmit = await jobOfferService.jobOffer(
        id,
        candidate?.id,
        formSubmit,
        "multipart/form-data"
      );
    } else {
      reqSubmit = await jobOfferService.processJobOffer(id, candidate?.id, {
        processStatus: mapModalType[modalType]?.proStatus,
        remark: remark,
      });
    }

    const { status, data } = reqSubmit;
    const { message } = data;

    if (status === HTTP_STATUS.success) {
      if (data?.status === DATA_STATUS.success) handleEventSucceed();

      /**
       * Alert after request responses
       */
      Swal.fire({
        title: data?.status === DATA_STATUS.success ? "Success" : "Warning",
        text: message,
        icon: data?.status === DATA_STATUS.success ? "success" : "warning",
        confirmButtonText: "OK",
        size: 200,
      });

      reset();
      onCloseModal();
    }
  };

  const onError = (err) => {
    console.log("Input error", err);
    if (!mapModalType[modalType]?.hideUploadFile) {
      if (!watchData?.file)
        setError("file", { message: "Job offer form is required!" });

      if (watchData?.file) {
        const { file } = watchData;
        const oneByte = 1048576;
        const limitTenMB = 10 * oneByte;

        if (file?.size > limitTenMB)
          return setError("file", {
            message: "File is required maximum 10MB!",
          });
      }
    }

    if (!watchData?.offerSalary || parseFloat(watchData?.offerSalary) < 0.1) {
      setError("offerSalary", { message: "Offer salary is required!" });
    }
  };

  return (
    <div>
      <Dialog
        TransitionComponent={TransitionModal}
        open={open}
        component="form"
        fullWidth={true}
        onSubmit={handleSubmit(handleOnSubmit, onError)}
        onClose={onCloseModal}
      >
        <DialogTitle>
          <TitleComponent title={mapModalType[modalType]?.modalTitle} />
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
              {!mapModalType[modalType]?.hideUploadFile && (
                <Grid item xs={12}>
                  <TextField
                    type="file"
                    size="small"
                    label={<LabelRequire label={"Job Offer Letter"} />}
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: "100%" }}
                    onChange={(e) => {
                      setValue("file", e?.target?.files[0]);
                      clearErrors("file");
                    }}
                    error={errors?.file ? true : false}
                    helperText={errors?.file?.message}
                  >
                    Upload
                  </TextField>
                </Grid>
              )}

              {!mapModalType[modalType]?.hideInputSalary && (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      <LabelRequire label="Salary" />
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Amount"
                      size="small"
                      {...register("offerSalary")}
                      error={errors.offerSalary ? true : false}
                    />
                    <FormHelperText
                      id="error-password"
                      error={errors?.offerSalary ? true : false}
                    >
                      {errors?.offerSalary?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              )}

              {mapModalType[modalType]?.isOffer && (
                <>
                  <Grid item xs={12}>
                    <AsyncAutoComplete
                      id="campus-id"
                      label="Campus"
                      size="small"
                      callToApi={API_URL.lookup.campus.get}
                      bindField={"shortName"}
                      handleOnChange={(e, value) => {
                        setValue("campusId", value?.id);
                      }}
                      value={watchData?.campusId || null}
                      isRequire={true}
                      err={errors?.campusId?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AsyncAutoComplete
                      id="position-id"
                      label="Position"
                      size="small"
                      callToApi={API_URL.lookup.position.get}
                      bindField={"nameEn"}
                      handleOnChange={(e, value) => {
                        setValue("positionId", value?.id);
                      }}
                      value={watchData?.positionId || null}
                      isRequire={true}
                      err={errors?.positionId?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AsyncAutoComplete
                      id="position-level-id"
                      label="Position Level"
                      size="small"
                      callToApi={API_URL.lookup.positionLevel.get}
                      bindField={"nameEn"}
                      handleOnChange={(e, value) => {
                        setValue("positionLevelId", value?.id);
                      }}
                      value={watchData?.positionLevelId || null}
                      isRequire={true}
                      err={errors?.positionLevelId?.message}
                    />
                  </Grid>
                </>
              )}

              {mapModalType[modalType]?.isHire && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      type="date"
                      size="small"
                      label={<LabelRequire label={"Sign Offer Date"} />}
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: "100%" }}
                      error={errors?.signedOfferLetterDate ? true : false}
                      helperText={errors?.signedOfferLetterDate?.message}
                      {...register("signedOfferLetterDate")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      type="date"
                      size="small"
                      label={<LabelRequire label={"Sign Contract Date"} />}
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: "100%" }}
                      error={errors?.signedContractDate ? true : false}
                      helperText={errors?.signedContractDate?.message}
                      {...register("signedContractDate")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      type="date"
                      size="small"
                      label={<LabelRequire label={"Join Date"} />}
                      InputLabelProps={{ shrink: true }}
                      sx={{ width: "100%" }}
                      error={errors?.joinedDate ? true : false}
                      helperText={errors?.joinedDate?.message}
                      {...register("joinedDate")}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  id="Remark"
                  label="Remark"
                  multiline
                  variant="outlined"
                  size="small"
                  minRows={2}
                  maxRows={10}
                  {...register("remark")}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <FooterComponent
            saveButtonType="submit"
            saveButtonLabel={mapModalType[modalType]?.saveActionLabel}
            handleCancel={onCloseModal}
            actions={{ cancel: true, submit: true }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OfferJobFormModal;

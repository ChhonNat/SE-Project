import React, { forwardRef, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import SelectComponent from "../../../components/Selector/select";
import LabelRequire from "../../../components/Label/require";
import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";
import Swal from "sweetalert2";
import _useHttp from "../../../hooks/_http";

import {
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  DialogActions,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTP_METHODS } from "../../../constants/http_method";
import { ALERT_TIMER } from "../../../constants/app_config";
import { STATUS } from "../../../constants/status";
import { globalService } from "../../../services/global.service";
import { API_URL } from "../../../constants/api_url";
import { HTTP_STATUS } from "../../../constants/http_status";
import { KEY_POST } from "../../../constants/key_post";

import { Close } from "@mui/icons-material";
import { HeadDepartmentModel } from "../../../models/head-department.model";

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertHeadDepartmentForm = (props) => {
  const { openModal, onCloseModal, handleEventSucceed, title, editData } =
    props;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState,
    clearErrors,
    setError,
  } = useForm({
    resolver: zodResolver(
      editData?.id ? HeadDepartmentModel?.Update : HeadDepartmentModel?.Create
    ),
  });
  const { data, loading, error, message, sendRequest } = _useHttp();
  const watchData = watch();
  const { errors } = formState;

  const [listBusinessDivisions, setListBusinessDivisions] = useState([]);
  const [listDepartments, setListDepartments] = useState([]);
  const [listPositions, setListPositions] = useState([]);
  const [listPositionLevels, setListPositionLevels] = useState([]);

  useEffect(() => {

    reset();
    clearErrors();
    
    if (openModal) {
      if (editData?.id) {
        for (let key in editData) {
          setValue(key, editData[key]);
        }
      }

      //Fetch business unit
      fetchData(API_URL.lookup.businessUnit.get, setListBusinessDivisions);
      fetchData(API_URL.lookup.positionLevel.get, setListPositionLevels);

      if (editData?.id) {
        fetchData(
          API_URL.lookup.departmentById.get + editData?.businessUnitId,
          setListDepartments
        );
        fetchData(
          API_URL.lookup.positionById.get + editData?.departmentId,
          setListPositions
        );
      }
    }
  }, [openModal]);

  useEffect(() => {
    if (!loading) {
      Swal.fire({
        title: !error ? "Success" : "Error",
        text: message,
        icon: !error ? "success" : "error",
        confirmButtonText: "OK",
        timer: ALERT_TIMER,
      });

      if (!error) handleEventSucceed();

      handleCloseModal();
    }
  }, [data, error, loading, message]);

  const fetchData = useCallback(async (asyncUrl, setData) => {
    try {
      const reqData = await globalService.getData(asyncUrl);
      const { status, data } = reqData;
      const { success } = data;

      if (status === HTTP_STATUS.success) {
        success ? setData(data?.data) : setData([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onError = (data) => {
    console.log(data);

    if (data?.departmentId)
      setError("departmentId", { message: "Department is required!" });

    if (data?.positionId)
      setError("positionId", { message: "Position is required!" });
  };

  const submit = async (data) => {
    let postData = {};

    Object.keys(data).forEach((key) => {
      if (KEY_POST.headDepartment.includes(key)) {
        postData[key] = data[key];
      }
    });

    await sendRequest(
      !editData?.id
        ? API_URL.headDepartment.create
        : API_URL.headDepartment.edit + editData?.id,
      !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put,
      postData
    );
  };

  const handleCloseModal = () => {
    reset();
    clearErrors();
    onCloseModal();
  };

  return (
    <>
      <Dialog
        maxWidth="sm"
        TransitionComponent={TransitionModal}
        open={openModal}
        component="form"
        onSubmit={handleSubmit(submit, onError)}
        onClose={onCloseModal}
      >
        <DialogTitle>
          <TitleComponent title={title} />
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
            {/* Input Fields */}
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="staff-id"
                  label={<LabelRequire label="Staff ID" />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("staffId")}
                  error={errors?.staffId ? true : false}
                  helperText={errors?.staffId?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="first-name"
                  label={<LabelRequire label="First Name" />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("firstName")}
                  error={errors?.firstName ? true : false}
                  helperText={errors?.firstName?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="last-name"
                  label={<LabelRequire label="Last Name" />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("lastName")}
                  error={errors?.lastName ? true : false}
                  helperText={errors?.lastName?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="phone"
                  label={<LabelRequire label="Phone Number" />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("phoneNumber")}
                  error={errors?.phoneNumber ? true : false}
                  helperText={errors?.phoneNumber?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectComponent
                  id="business-id"
                  label="Business Unit"
                  isRequire={true}
                  variant="outlined"
                  fullWidth
                  size="small"
                  customDatas={listBusinessDivisions}
                  value={watchData?.businessUnitId || ""}
                  bindField="nameEn"
                  handleOnChange={(e) => {
                    setValue("businessUnitId", e?.target?.value);
                    setValue("departmentId", null);
                    fetchData(
                      API_URL.lookup.departmentById.get + e?.target?.value,
                      setListDepartments
                    );
                  }}
                  err={errors?.businessUnitId?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <AsyncAutoComplete
                  id="department-id"
                  label="Department"
                  size="small"
                  // callToApi={API_URL.lookup.departmentById.get + editData?.businessUnitId}
                  customDatas={listDepartments}
                  bindField={"nameEn"}
                  handleOnChange={(e, value) => {
                    setValue("departmentId", value?.id ? value?.id : value);
                    setValue("positionId", null);
                    fetchData(
                      API_URL.lookup.positionById.get + value?.id,
                      setListPositions
                    );
                  }}
                  value={watchData?.departmentId || null}
                  isRequire={true}
                  err={errors?.departmentId?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectComponent
                  id="position-level-id"
                  label="Position Level"
                  isRequire={true}
                  variant="outlined"
                  fullWidth
                  size="small"
                  customDatas={listPositionLevels}
                  value={watchData?.positionLevelId || ""}
                  bindField="nameEn"
                  handleOnChange={(e) => {
                    setValue("positionLevelId", e?.target?.value);
                  }}
                  err={errors?.positionLevelId?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectComponent
                  id="position-id"
                  label="Position"
                  isRequire={true}
                  variant="outlined"
                  fullWidth
                  size="small"
                  customDatas={listPositions}
                  value={watchData?.positionId || ""}
                  bindField="nameEn"
                  handleOnChange={(e) =>
                    setValue("positionId", e?.target?.value)
                  }
                  err={errors?.positionId?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  minRows={2}
                  maxRows={10}
                  variant="outlined"
                  {...register("description")}
                />
              </Grid>

              {editData?.id && (
                <Grid item xs={12}>
                  <SelectComponent
                    id="status-id"
                    label={"Status"}
                    size={"small"}
                    customDatas={[STATUS.RECORD.ACTIVE, STATUS.RECORD.INACTIVE]}
                    value={watchData?.status || ""}
                    handleOnChange={(e) => setValue("status", e?.target?.value)}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* Footer Page */}
          <FooterComponent
            saveButtonType="submit"
            saveButtonLabel={editData?.id ? "Update" : "Save"}
            actions={{ cancel: true, submit: true }}
            handleCancel={handleCloseModal}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpsertHeadDepartmentForm;

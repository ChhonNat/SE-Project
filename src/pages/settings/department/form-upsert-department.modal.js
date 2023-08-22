import React, { forwardRef, useEffect } from "react";
import Box from "@mui/material/Box";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import SelectComponent from "../../../components/Selector/select";
import { DepartmentModel } from "../../../models/department.model";
import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";
import LabelRequire from "../../../components/Label/require";
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
import { API_URL } from "../../../constants/api_url";
import { KEY_POST } from "../../../constants/key_post";

import { Close } from "@mui/icons-material";

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertDepartmentFormModal = (props) => {
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
      editData?.id ? DepartmentModel?.Update : DepartmentModel.Create
    ),
  });
  const { data, loading, error, message, sendRequest } = _useHttp();
  const watchData = watch();
  const { errors } = formState;

  useEffect(() => {

    reset();
    clearErrors();

    if (editData?.id && openModal) {
      for (let key in editData) {
        setValue(key, editData[key]);
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

  const onError = (data) => {
    if (data?.businessUnitId)
      setError("businessUnitId", { message: "Primary business is required!" });
  };

  const submit = async (data) => {
    let postData = {};

    Object.keys(data).forEach((key) => {
      if (KEY_POST.department.includes(key) && !editData?.id) {
        postData[key] = data[key];
      } else {
        postData[key] = data[key];
      }
    });

    await sendRequest(
      !editData?.id
        ? API_URL.department.create
        : API_URL.department.edit + editData?.id,
      !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put,
      postData
    );
  };

  const handleCloseModal = () => {
    reset();
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
                  id="code"
                  label={<LabelRequire label="Code" />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("code")}
                  error={errors?.code ? true : false}
                  helperText={errors?.code?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="name-en"
                  label={<LabelRequire label="Name" />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("nameEn")}
                  error={errors?.nameEn ? true : false}
                  helperText={errors?.nameEn?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="name-kh"
                  label={<LabelRequire label="Name(KH)" />}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...register("nameKh")}
                  error={errors?.nameKh ? true : false}
                  helperText={errors?.nameKh?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <AsyncAutoComplete
                  id="primary-business-id"
                  label="Business Unit"
                  size="small"
                  callToApi={API_URL.lookup.businessUnit.get}
                  bindField={"nameEn"}
                  handleOnChange={(e, value) => {
                    setValue("businessUnitId", value?.id ? value?.id : value);
                  }}
                  value={watchData?.businessUnitId || null}
                  isRequire={true}
                  err={errors?.businessUnitId?.message}
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
                  size="small"
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

export default UpsertDepartmentFormModal;

import React, { forwardRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import LabelRequire from "../../../components/Label/require";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import SelectComponent from "../../../components/Selector/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  TextField
} from "@mui/material";
import { useForm } from "react-hook-form";
import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";
import { API_URL } from "../../../constants/api_url";
import { DATA_STATUS } from "../../../constants/data_status";
import { HTTP_STATUS } from "../../../constants/http_status";
import { KEY_POST } from "../../../constants/key_post";
import { vdoModel } from "../../../models/vdo.model";
import { VdoService } from "../../../services/vdo.service.";
import { ConverterService } from "../../../utils/converter";

const shrinkOpt = { shrink: true };

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertDisplaySetting = (props) => {
  const { open, onCloseModal, handleEventSucceed, display } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
    watch,
    setError,
  } = useForm({
    resolver: zodResolver(display?.id ? vdoModel.Update : vdoModel.Create),
  });

  const watchDisplay = watch();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [isSubmitForm, setIsSubmitForm] = useState(false);

  const formatKeys = ["birthDate", "roles", "department"];

  useEffect(() => {

    reset();
    clearErrors();

    if (display?.id && open) {
      Object.keys(display).forEach((key) => {
        if (KEY_POST.display.includes(key)) {
          if (formatKeys.includes(key)) {
            key === 'department' ? setValue('departmentId', display[key]?.id) : setValue(key, ConverterService.convertUnixDateToMUI(display[key]));
          } else {
            setValue(key, display[key]);
          }
        }
      });
    }
  }, [open]);

  const handleMouseDownPwd = (event) => {
    event.preventDefault();
  };

  const handleShowPwd = () => {
    setShowPwd(!showPwd);
  };

  const handleShowConfirmPwd = () => {
    setShowConfirmPwd(!showConfirmPwd);
  };

  const onError = (data) => {
    setIsSubmitForm(true);
    console.log("Error: ", data);
  };

  const submit = async (data) => {
    if (display?.id) {
      if (watchDisplay?.password || watchDisplay?.confirmPassword) {
        if (watchDisplay?.password !== watchDisplay?.confirmPassword) {
          setError("confirmPassword", {
            message: "Confirm password doesn't match!",
          });
          return false;
        }
      }
    }

    const submitData = {};

    Object.keys(data).forEach((key) => {
      if (KEY_POST.display.includes(key) && !display?.id) {
        if (formatKeys[0] === key) {
          submitData[key] = ConverterService.convertDateToAPI(data[key]);
        } else {
          submitData[key] = data[key];
        }
      } else {
        if (formatKeys.includes(key)) {
          if (formatKeys[0] === key) {
            submitData[key] = ConverterService.convertDateToAPI(data[key]);
          }

          if (formatKeys[1] === key) {
            const oldRoles = [...display?.roles];
            const mapRole = {};

            if (oldRoles?.length) {
              oldRoles.forEach((ele) => {
                if (!ele?.id) {
                  mapRole = {};
                }

                mapRole[ele?.id] = ele;
              });
            }

            if (typeof data[key] === "string") data[key] = oldRoles;

            data[key] = data[key].map((ele) => {
              const isObject = typeof ele === "object";
              return isObject
                ? { id: ele?.id, recId: ele?.recId }
                : {
                  id: mapRole[ele] ? mapRole[ele]?.id : ele,
                  recId: mapRole[ele] ? mapRole[ele]?.recId : 0,
                };
            });

            submitData[key] = data[key];
          }
        } else {
          submitData[key] = data[key];
        }
      }
    });

    try {
      let submitVdo;

      if (display?.id)
        submitVdo = await VdoService.updateUser(display?.id, submitData);
      else
        submitVdo = await VdoService.createUser(submitData);

      const { status, data } = submitVdo;
      const { message } = data;

      if (status === HTTP_STATUS.success) {
        if (data?.status === DATA_STATUS.success) handleEventSucceed();

        /**
         * Alert after request responses
         */
        Swal.fire({
          title: data?.status === DATA_STATUS.success ? "Success" : "Error",
          text: message,
          icon: data?.status === DATA_STATUS.success ? "success" : "error",
          confirmButtonText: "OK",
          size: 200,
        });

        handleCloseModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    reset();
    clearErrors();
    onCloseModal();
  };

  const [t, setT] = useState(null);

  return (
    <Dialog
      maxWidth="sm"
      TransitionComponent={TransitionModal}
      open={open}
      component="form"
      onSubmit={handleSubmit(submit, onError)}
      onClose={onCloseModal}
    >
      <DialogTitle>
        <TitleComponent title={display?.id ? "Edit Video" : "Add New Video"} />
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
            <Grid item xs={12}>
              <TextField
                label={<LabelRequire label="Video Link" />}
                sx={{ width: "100%" }}
                {...register("link")}
                size="small"
                error={errors?.link ? true : false}
                helperText={errors?.link?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label={<LabelRequire label="Description" />}
                sx={{ width: "100%" }}
                {...register("decsription")}
                size="small"
                error={errors?.decsription ? true : false}
                helperText={errors?.decsription?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <AsyncAutoComplete
                id="service_id"
                label="Service"
                size="small"
                callToApi={API_URL.lookup.department.get}
                bindField={"name"}
                handleOnChange={(e, value) => {
                  setValue("serviceId", value?.id);
                }}
                value={watchDisplay?.serviceId || null}
                isRequire={true}
                err={errors?.serviceId?.message}
              />
            </Grid>
            {display?.id && (
              <Grid item xs={12}>
                <SelectComponent
                  label="Status"
                  customDatas={["Active", "Inactive"]}
                  size="small"
                  handleOnChange={(e) => setValue("status", e?.target?.value)}
                  value={watchDisplay?.status}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <FooterComponent
          saveButtonType="submit"
          saveButtonLabel={display?.id ? "Update" : "Save"}
          actions={{ cancel: true, submit: true }}
          handleCancel={handleCloseModal}
        />
      </DialogActions>
    </Dialog>
  );
};

export default UpsertDisplaySetting;

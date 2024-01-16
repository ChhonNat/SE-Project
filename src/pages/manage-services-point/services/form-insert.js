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
import { HTTP_STATUS } from "../../../constants/http_status";
import { KEY_POST } from "../../../constants/key_post";
import { ServiceModel } from "../../../models/service.model";
import { Service } from "../../../services/service.service";

const shrinkOpt = { shrink: true };

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertServiceForm = (props) => {
  const { open, onCloseModal, handleEventSucceed, service } = props;

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
    resolver: zodResolver(service?.id ? ServiceModel.Update : ServiceModel.Create),
  });

  const watchService = watch();

  useEffect(() => {

    reset();
    clearErrors();

    if (service?.id && open) {
      Object.keys(service).forEach((key) => {
        if (KEY_POST.service.includes(key)) {
          setValue(key, service[key]);
        }
      });
    }
  }, [open]);

  const onError = (data) => {
    console.log("Error: ", data);
  };

  const submit = async (data) => {
    console.log(data);
    const submitData = {};

    Object.keys(data).forEach((key) => {
      if (KEY_POST.service.includes(key) && service?.id) {
        if (key === "status") {
          if (data[key].toLowerCase() === "inactive") submitData[key] = 0;
          else submitData[key] = 1;
        } else submitData[key] = data[key];
      } else {
        submitData[key] = data[key];
      }
    });

    try {
      let submitService;

      if (service?.id)
        submitService = await Service.updateService(service?.id, submitData);
      else
        submitService = await Service.createService(submitData);

      const { status, data } = submitService;
      const { message, success } = data;

      if (status === HTTP_STATUS.success) {
        if (success) {
          handleEventSucceed();
          Swal.fire({
            title: success ? "Success" : "Error",
            text: message,
            icon: success ? "success" : "error",
            confirmButtonText: "OK",
          });

          handleCloseModal();
        } else {
          Swal.fire({
            title: success ? "Success" : "Error",
            text: message,
            icon: success ? "success" : "error",
            confirmButtonText: "OK",
          });
        }
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
        <TitleComponent title={service?.id ? "Edit Service" : "Add New Service"} />
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
                label={<LabelRequire label="Name" />}
                sx={{ width: "100%" }}
                {...register("name")}
                size="small"
                error={errors?.name ? true : false}
                helperText={errors?.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<LabelRequire label="Description" />}
                sx={{ width: "100%" }}
                {...register("description")}
                size="small"
                error={errors?.description ? true : false}
                helperText={errors?.description?.message}
              />
            </Grid>

            {service?.id && (
              <Grid item xs={12}>
                <SelectComponent
                  label="Status"
                  customDatas={["Active", "Inactive"]}
                  size="small"
                  handleOnChange={(e) => setValue("status", e?.target?.value)}
                  value={watchService?.status}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <FooterComponent
          saveButtonType="submit"
          saveButtonLabel={service?.id ? "Update" : "Save"}
          actions={{ cancel: true, submit: true }}
          handleCancel={handleCloseModal}
        />
      </DialogActions>
    </Dialog>
  );
};

export default UpsertServiceForm;

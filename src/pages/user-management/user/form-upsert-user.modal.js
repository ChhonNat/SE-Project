import { zodResolver } from "@hookform/resolvers/zod";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
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
import React, { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import LabelRequire from "../../../components/Label/require";
import CheckboxesTags from "../../../components/MultiAutoComplete/CheckboxesTags";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import SelectComponent from "../../../components/Selector/select";
import { API_URL } from "../../../constants/api_url";
import { HTTP_STATUS } from "../../../constants/http_status";
import { KEY_POST } from "../../../constants/key_post";
import { UserModel } from "../../../models/user.model";
import { userService } from "../../../services/user.service";
import AsyncAutoComplete from './../../../components/AutoComplete/auto-complete';

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertUserForm = (props) => {
  const { open, onCloseModal, handleEventSucceed, user } = props;

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
    resolver: zodResolver(user?.id ? UserModel.Update : UserModel.Create),
  });

  const watchUser = watch();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  
  useEffect(() => {

    reset();
    clearErrors();

    if (user?.id && open) {
      // console.log(user);
      Object.keys(user).forEach((key) => {
        if (KEY_POST.user.includes(key)) {
          if (key === "rolesId") {
            setValue('roles', parseInt(user[key]));
          } else if (key === "permissions") {
            const tmp = user[key].split(',').map(permission => ({ name: permission.trim() }));
            const holdArr = tmp.map(item => item.name);
            console.log(holdArr);
            setValue(key, holdArr);
          } else {
            setValue(key, user[key]);
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
    console.log("Error: ", data);
  };

  const submit = async (data) => {
    // console.log(data);
    const submitData = {};

    Object.keys(data).forEach((key) => {
      if (KEY_POST.user.includes(key) && !user?.id) {
        // if(key.toLocaleLowerCase() === "roles")

        submitData[key] = data[key];
      } else {
        if (key === "status") {
          if (data[key].toLowerCase() === "inactive") {
            submitData[key] = 0;
          } else submitData[key] = 1;
        } else submitData[key] = data[key];
      }
    });

    try {
      let submitUser;

      if (user?.id)
        submitUser = await userService.updateUser(user?.id, submitData);
      else submitUser = await userService.createUser(submitData);
      const { status, data } = submitUser;
      const { message } = data;

      if (status === HTTP_STATUS.success) {
        if (data?.success) handleEventSucceed();

        /**
         * Alert after request responses
         */
        Swal.fire({
          title: data?.success ? "Success" : "Error",
          text: message,
          icon: data?.success ? "success" : "error",
          confirmButtonText: "OK",
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
        <TitleComponent title={user?.id ? "Edit Uer" : "Add New User"} />
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
                type="text"
                label={<LabelRequire label="Username" />}
                sx={{ width: "100%" }}
                {...register("username")}
                size="small"
                error={errors?.username ? true : false}
                helperText={errors?.username?.message}
              // disabled={user?.id}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<LabelRequire label="Phone Number" />}
                sx={{ width: "100%" }}
                {...register("phone_number")}
                size="small"
                error={errors?.phone_number ? true : false}
                helperText={errors?.phone_number?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label={<LabelRequire label="Email" />}
                sx={{ width: "100%" }}
                {...register("email")}
                size="small"
                error={errors?.email ? true : false}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <AsyncAutoComplete
                id="rolesID"
                label={<LabelRequire label="Roles" />}
                size="small"
                callToApi={API_URL.lookup.roles.get}
                bindField={"name"}
                handleOnChange={(e, value) => {
                  setValue("roles", value?.id);
                }}
                value={watchUser?.roles || null}
                err={errors?.roles?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <CheckboxesTags
                id="Permission_id"
                label={<LabelRequire label="Permissions" />}
                size="small"
                callToApi={API_URL.lookup.permissions.get}
                bindField={"name"}
                handleOnChange={(e, value) => {
                  const permissionNames = value.map(item => item.name);
                  setValue("permissions", permissionNames);
                }}
                value={
                  user.id
                    ? (
                      user?.permissions.split(',').map(permission => ({ name: permission.trim() }))
                    )
                    : watchUser?.permission
                }
                err={errors?.permissions?.message}
              />
            </Grid>

            {!user.id &&
              <>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    sx={{ width: "100%" }}
                    size="small"
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      error={errors?.password ? true : false}
                    >
                      {user?.id ? "Password" : <LabelRequire label="Password" />}
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      type={showPwd ? "text" : "password"}
                      sx={{ width: "100%" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPwd}
                            onMouseDown={handleMouseDownPwd}
                            edge="end"
                          >
                            {showPwd ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      size="small"
                      {...register("password")}
                      error={errors?.password_confirmed ? true : false}
                      helperText={errors?.password_confirmed?.message}
                    />
                    <FormHelperText
                      id="error-password"
                      error={errors?.password ? true : false}
                    >
                      {errors?.password?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    sx={{ width: "100%" }}
                    size="small"
                  >
                    <InputLabel
                      htmlFor="outlined-adornment-password"
                      error={errors?.password_confirmed ? true : false}
                    >
                      {user?.id ? (
                        "Confirm Password"
                      ) : (
                        <LabelRequire label="Confirm Password" />
                      )}
                    </InputLabel>
                    <OutlinedInput
                      id="password-id"
                      type={showConfirmPwd ? "text" : "password"}
                      sx={{ width: "100%" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowConfirmPwd}
                            onMouseDown={handleMouseDownPwd}
                            edge="end"
                          >
                            {showConfirmPwd ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      size="small"
                      {...register("password_confirmed")}
                      error={errors?.password_confirmed ? true : false}
                      helperText={errors?.password_confirmed?.message}
                    />
                    <FormHelperText
                      id="error-password"
                      error={errors?.password_confirmed ? true : false}
                    >
                      {errors?.password_confirmed?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </>
            }

            {user?.id && (
              <Grid item xs={12}>
                <SelectComponent
                  label="Status"
                  customDatas={["Active", "Inactive"]}
                  size="small"
                  handleOnChange={(e) => setValue("status", e?.target?.value)}
                  value={watchUser?.status}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <FooterComponent
          saveButtonType="submit"
          saveButtonLabel={user?.id ? "Update" : "Save"}
          actions={{ cancel: true, submit: true }}
          handleCancel={handleCloseModal}
        />
      </DialogActions>
    </Dialog>
  );
};

export default UpsertUserForm;

import React, { forwardRef, useEffect, useState } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import SelectComponent from "../../components/Selector/select";
import MultiSelectComponent from "../../components/MultiSelector/select";
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
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KEY_POST } from "../../constants/key_post";
import { userService } from "../../services/user.service.";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { UserModel } from "../../models/user.model";
import { ConverterService } from "../../utils/converter";
import { API_URL } from "../../constants/api_url";

const shrinkOpt = { shrink: true };

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertUserForm = (props) => {
  const { open, onCloseModal, handleEventSuccessed, user } = props;

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
    resolver: zodResolver(
      user?.id ? UserModel.UpdateModel : UserModel.CreateModel
    ),
  });

  const watchUser = watch();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [isSubmitForm, setIsSubmitForm] = useState(false);

  const formatKeys = ["birthDate", "roles"];

  useEffect(() => {
    reset();
    clearErrors();

    if (user?.id) {
      Object.keys(user).forEach((key) => {
        if (KEY_POST.user.includes(key)) {
          if (formatKeys.includes(key)) {
            setValue(key, ConverterService.convertUnixDateToMUI(user[key]));
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
    setIsSubmitForm(true);

    if (user?.id) {
      if (watchUser?.password || watchUser?.confirmPassword) {
        if (watchUser?.password !== watchUser?.confirmPassword)
          setError("confirmPassword", {
            message: "Confirm password doesn't match!",
          });
      }
    }

    if (!watchUser?.roles?.length)
      setError("roles", { message: "Role is required!" });
  };

  const submit = async (data) => {
    if (user?.id) {
      if (watchUser?.password || watchUser?.confirmPassword) {
        if (watchUser?.password !== watchUser?.confirmPassword) {
          setError("confirmPassword", {
            message: "Confirm password doesn't match!",
          });
          return false;
        }
      }
    }

    const submitData = {};

    Object.keys(data).forEach((key) => {
      if (KEY_POST.user.includes(key) && !user?.id) {
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
            const oldRoles = [...user?.roles];
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
      let submitUser;

      if (user?.id)
        submitUser = await userService.updateUser(user?.id, submitData);
      else submitUser = await userService.createUser(submitData);

      const { status, data } = submitUser;
      const { message } = data;

      if (status === HTTP_STATUS.success) {
        if (data?.status === DATA_STATUS.success) handleEventSuccessed();

        /**
         * Alert after request responses
         */
        Swal.fire({
          title: data?.status === DATA_STATUS.success ? "Success" : "Error",
          text: message,
          icon: data?.status === DATA_STATUS.success ? "success" : "error",
          confirmButtonText: "OK",
          // timer: ALERT_TIMER,
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
    >
      <DialogTitle>
        <TitleComponent title={user?.id ? "Edit user" : "Add new user"} />
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
                label={<LabelRequire label="Staff ID" />}
                sx={{ width: "100%" }}
                {...register("staffId")}
                size="small"
                error={errors?.staffId ? true : false}
                helperText={errors?.staffId?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<LabelRequire label="First Name" />}
                sx={{ width: "100%" }}
                {...register("firstName")}
                size="small"
                error={errors?.firstName ? true : false}
                helperText={errors?.firstName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={<LabelRequire label="Last Name" />}
                sx={{ width: "100%" }}
                {...register("secondName")}
                size="small"
                error={errors?.secondName ? true : false}
                helperText={errors?.secondName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelectComponent
                id="role-id"
                label="Role"
                isRequire={true}
                size="small"
                isSubmit={isSubmitForm}
                customDatas={[]}
                callToApi={API_URL.role.get}
                value={user?.id ? user?.roles : watchUser.roles}
                bindField="authority"
                handleEventChange={(e) => setValue("roles", e)}
                err={errors?.roles?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectComponent
                label={<LabelRequire label="Gender" />}
                customDatas={["Male", "Female"]}
                size="small"
                error={errors?.gender ? true : false}
                handleOnChange={(e) => setValue("gender", e?.target?.value)}
                value={watchUser?.gender}
                err={errors?.gender?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="date"
                label={<LabelRequire label="Birth Date" />}
                sx={{ width: "100%" }}
                InputLabelProps={shrinkOpt}
                {...register("birthDate")}
                size="small"
                error={errors?.birthDate ? true : false}
                helperText={errors?.birthDate?.message}
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
              <TextField
                type="phone"
                label={<LabelRequire label="Phone Number" />}
                sx={{ width: "100%" }}
                {...register("phoneNumber")}
                size="small"
                error={errors?.phoneNumber ? true : false}
                helperText={errors?.phoneNumber?.message}
              />
            </Grid>
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
                  error={errors?.confirmPassword ? true : false}
                  helperText={errors?.confirmPassword?.message}
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
                  error={errors?.confirmPassword ? true : false}
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
                  {...register("confirmPassword")}
                  error={errors?.confirmPassword ? true : false}
                  helperText={errors?.confirmPassword?.message}
                />
                <FormHelperText
                  id="error-password"
                  error={errors?.confirmPassword ? true : false}
                >
                  {errors?.confirmPassword?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

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
          saveButtunType="submit"
          saveButtonLabel={user?.id ? "Update" : "Save"}
          actions={{ cancel: true, submit: true }}
          handleCancel={handleCloseModal}
        />
      </DialogActions>
    </Dialog>
  );
};

export default UpsertUserForm;

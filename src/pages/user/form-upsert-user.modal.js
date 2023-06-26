import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React, { useState } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SelectComponent from "../../components/Selector/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UserModel from "../../models/user.model";

const shrinkOpt = { shrink: true };

const UpsertUserForm = (props) => {

    const { open, onCloseModal } = props;

    const { register, formState, clearErrors, setValue, watch } = useForm({resolver: zodResolver(UserModel)});
    const { errors } = formState;
    const watchUser = watch();

    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

    const handleMouseDownPwd = (event) => {
        event.preventDefault()
    };

    const handleShowPwd = () => {
        setShowPwd(!showPwd);
    };

    const handleShowConfirmPwd = () => {
        setShowConfirmPwd(!showConfirmPwd);
    }

    return (
        <Dialog
            maxWidth="sm"
            open={open}
        >
            <DialogTitle>
                <TitleComponent title="User" />
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <TextField
                                label="Staff ID"
                                sx={{ width: '100%' }}
                                {...register('staffId')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="First Name"
                                sx={{ width: '100%' }}
                                {...register('firstName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Last Name"
                                sx={{ width: '100%' }}
                                {...register('secondName')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectComponent
                                label="Gender"
                                customDatas={['Male', 'Female']}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                label="DOB"
                                sx={{ width: '100%' }}
                                InputLabelProps={shrinkOpt}
                                {...register('dob')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Email"
                                sx={{ width: '100%' }}
                                {...register('email')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="phone"
                                label="Phone Number"
                                sx={{ width: '100%' }}
                                {...register('phoneNumber')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                label="Username"
                                sx={{ width: '100%' }}
                                {...register('username')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" sx={{ width: '100%' }}>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="password-id"
                                    type={showPwd ? 'text' : 'password'}
                                    sx={{ width: '100%' }}
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
                                    {...register('password')}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl variant="outlined" sx={{ width: '100%' }}>
                                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="password-id"
                                    type={showConfirmPwd ? 'text' : 'password'}
                                    sx={{ width: '100%' }}
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
                                    {...register('confirmPassword')}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <FooterComponent
                    actions={{ cancel: true, submit: true }}
                    handleCancel={onCloseModal}
                />
            </DialogActions>
        </Dialog>
    )
}

export default UpsertUserForm;
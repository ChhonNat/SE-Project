import React, { forwardRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, Grid, Dialog, DialogTitle, DialogContent, Slide, DialogActions, IconButton } from "@mui/material";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import _useHttp from "../../../hooks/_http";
import { HTTP_METHODS } from "../../../constants/http_method";
import Swal from "sweetalert2";
import { ALERT_TIMER } from "../../../constants/app_config";
import SelectComponent from "../../../components/Selector/select";
import { STATUS } from "../../../constants/status";
import LabelRequire from "../../../components/Label/require";
import BusinessUnitModel from "../../../models/business-unit.model";
import { KEY_POST } from "../../../constants/key_post";
import { API_URL } from "../../../constants/api_url";
import { Close } from "@mui/icons-material";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertBusinessUnitForm = (props) => {

    const { openModal, onCloseModal, handleEventSuccessed, title, editData } = props;
    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors } = useForm({ resolver: zodResolver(BusinessUnitModel) });
    const { data, loading, error, message, sendRequest } = _useHttp();
    const watchData = watch();
    const { errors } = formState;

    useEffect(() => {

        if (editData?.id) {

            for (let key in editData) {
                setValue(key, editData[key])
            }
        }

    }, [openModal])

    const onError = (data) => console.log(data);

    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.businessUnit.includes(key)) {
                postData[key] = data[key];
            }
        });

        await sendRequest(!editData?.id ? API_URL.businessUnit.create : API_URL.businessUnit.edit + editData?.id, !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
    }

    useEffect(() => {

        if (!loading) {

            Swal.fire({
                title: !error ? 'Success' : 'Error',
                text: message,
                icon: !error ? 'success' : 'error',
                confirmButtonText: 'OK',
                timer: ALERT_TIMER
            });


            if (!error)
                handleEventSuccessed();

            handleCloseModal();

        }

    }, [data, error, loading, message])

    const handleCloseModal = () => {
        reset();
        clearErrors();
        onCloseModal();
    }

    return (

        <>
            <Dialog
                maxWidth="sm"
                TransitionComponent={TransitionModal}
                open={openModal}
                component="form"
                onSubmit={handleSubmit(submit, onError)}
            >
                <DialogTitle>
                    <TitleComponent title={title} />
                    {
                        onCloseModal ? (
                            <IconButton
                                aria-label="close"
                                onClick={onCloseModal}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <Close />
                            </IconButton>
                        ) :
                            null
                    }
                </DialogTitle>
                <DialogContent dividers>

                    <Box sx={{ width: '100%' }}>

                        {/* Input Fields */}
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {/* Select main business*/}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="main-business"
                                    label="Main Business"
                                    callToApi={API_URL.lookup.mainBusiness.get}
                                    bindField="nameEn"
                                    value={watchData?.mainBusinessUnitId}
                                    handleOnChange={(e) => setValue('mainBusinessUnitId', e?.target?.value)}
                                    err={errors?.mainBusinessUnitId?.message}
                                    isRequire={true}
                                    size="small"
                                />
                            </Grid>

                            {/* Code  */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="code"
                                    label={<LabelRequire label="Code" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    {...register('code')}
                                    error={errors?.code ? true : false}
                                    helperText={errors?.code?.message}
                                />
                            </Grid>

                            {/* English name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="name"
                                    label={<span>Name (EN) <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="small"

                                    {...register('nameEn')}
                                    error={errors?.nameEn ? true : false}
                                    helperText={errors?.nameEn?.message}
                                />
                            </Grid>
                            {/* Khmer name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="name"
                                    label={<span>Name (KH) <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="small"

                                    {...register('nameKh')}
                                    error={errors?.nameKh ? true : false}
                                    helperText={errors?.nameKh?.message}
                                />
                            </Grid>
                            {/* Phone number */}
                            <Grid item xs={12}>
                                <TextField
                                    type="phone"
                                    id="phone"
                                    label={<LabelRequire label="Phone" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"

                                    {...register('phone')}
                                    error={errors?.phone ? true : false}
                                    helperText={errors?.phone?.message}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    {...register('email')}
                                />
                            </Grid>

                            {/* Status */}
                            {editData?.id &&
                                <Grid item xs={12}>
                                    <SelectComponent
                                        id="status-id"
                                        label={'Status'}
                                        size={'small'}
                                        customDatas={[STATUS.RECORD.ACTIVE, STATUS.RECORD.INACTIVE]}
                                        value={watchData?.status || ""}
                                        handleOnChange={(e) => setValue('status', e?.target?.value)}
                                    />
                                </Grid>
                            }
                            {/* Address line EN */}
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="address-en"
                                    label="Address"
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    variant="outlined"
                                    {...register('addressEn')}
                                    size="small"
                                />
                            </Grid>

                            {/* Address line KH */}
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="address-kh"
                                    label="Address(KH)"
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    variant="outlined"
                                    {...register('addressKh')}
                                    size="small"
                                />
                            </Grid>

                            {/* Description */}
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="description"
                                    label="Description"
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    variant="outlined"
                                    {...register('description')}
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {/* Footer Page */}
                    <FooterComponent
                        saveButtunType="submit"
                        saveButtonLabel={editData?.id ? "Update" : "Save"}
                        actions={{ cancel: true, submit: true }}
                        handleCancel={handleCloseModal}
                    />
                </DialogActions>

            </Dialog >
        </>
    )
};

export default UpsertBusinessUnitForm;
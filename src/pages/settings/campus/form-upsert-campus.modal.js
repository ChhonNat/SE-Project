import React, { forwardRef, useEffect } from "react";
import Box from "@mui/material/Box";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import SelectComponent from "../../../components/Selector/select";
import LabelRequire from "../../../components/Label/require";
import Swal from "sweetalert2";
import _useHttp from "../../../hooks/_http";

import { CampusModel } from "../../../models/campus.model";
import { TextField, Grid, Dialog, DialogTitle, DialogContent, Slide, DialogActions, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTP_METHODS } from "../../../constants/http_method";
import { ALERT_TIMER } from "../../../constants/app_config";
import { STATUS } from "../../../constants/status";
import { Close } from "@mui/icons-material";
import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";
import { API_URL } from "../../../constants/api_url";
import { KEY_POST } from "../../../constants/key_post";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertCampusFormModal = (props) => {

    const { openModal, onCloseModal, handleEventSuccessed, title, editData } = props;
    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors } = useForm({
        resolver: zodResolver(editData?.id ? CampusModel.Update : CampusModel.Create)
    });
    const { data, loading, error, message, sendRequest } = _useHttp();
    const watchData = watch();
    const { errors } = formState;

    useEffect(() => {

        reset();
        clearErrors();

        if (editData?.id && openModal) {

            for (let key in editData) {
                setValue(key !== 'location' ? key : 'locationId', key !== 'location' ?  editData[key] : editData?.location?.id)
            }
        }

    }, [openModal])

    const onError = (data) => console.log(data);

    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.campus.includes(key)) {
                postData[key] = data[key];
            }
        });
        await sendRequest(!editData?.id ? API_URL.campus.create : `${API_URL.campus.update}${editData?.id}` , !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
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
                onClose={onCloseModal}
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

                            {/*Code */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="code"
                                    label={<LabelRequire label="Code" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    error={errors?.campusCode ? true : false}
                                    helperText={errors?.campusCode?.message}
                                    {...register('campusCode')}
                                />
                            </Grid>

                            {/* English name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="en-name"
                                    label={<LabelRequire label="Name (EN)" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    error={errors?.nameEn ? true : false}
                                    helperText={errors?.nameEn?.message}
                                    {...register('nameEn')}
                                />
                            </Grid>
                            {/* Khmer name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="kh-name"
                                    label={<LabelRequire label="Name (KH)" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    error={errors?.nameKh ? true : false}
                                    helperText={errors?.nameKh?.message}
                                    {...register('nameKh')}
                                />
                            </Grid>
                            {/*Short name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="short-name"
                                    label={<LabelRequire label="Short Name" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    error={errors?.shortName ? true : false}
                                    helperText={errors?.shortName?.message}
                                    {...register('shortName')}
                                />
                            </Grid>

                            {/* Select Location */}
                            <Grid item xs={12}>
                                <AsyncAutoComplete
                                    id="location"
                                    label="Location"
                                    size="small"
                                    callToApi={API_URL.lookup.location.get}
                                    bindField={'nameEn'}
                                    handleOnChange={(e, value) => {
                                        setValue('locationId', value?.id ? value?.id : value);
                                    }}
                                    value={watchData?.locationId || null}
                                    isRequire={true}
                                    err={errors?.locationId?.message}
                                />
                            </Grid>

                            {/*Address line */}
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="outlined-multiline-static"
                                    label="Address"
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    variant="outlined"
                                    {...register('address')}
                                />
                            </Grid>

                            {/* Description */}
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    variant="outlined"
                                    {...register('description')}
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

export default UpsertCampusFormModal;
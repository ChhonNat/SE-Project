import React, { forwardRef, useEffect } from "react";
import Box from "@mui/material/Box";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import SelectComponent from "../../../components/Selector/select";
import _useHttp from "../../../hooks/_http";
import Swal from "sweetalert2";

import { TextField, Grid, Dialog, DialogTitle, DialogContent, Slide, DialogActions, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTP_METHODS } from "../../../constants/http_method";
import { ALERT_TIMER } from "../../../constants/app_config";
import { STATUS } from "../../../constants/status";
import { Close } from "@mui/icons-material";
import LabelRequire from "../../../components/Label/require";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertFormModal = (props) => {

    const { openModal, onCloseModal, handleEventSucceed, title, model, editData, keyPosts, postUrl, putUrl, dataType } = props;
    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors } = useForm({ resolver: zodResolver(model) });
    const { data, loading, error, message, sendRequest } = _useHttp();
    const watchData = watch();
    const { errors } = formState;

    useEffect(() => {

        reset();
        clearErrors();

        if (editData?.id && openModal) {

            for (let key in editData) {
                setValue(key, editData[key])
            }
        }

    }, [openModal])

    const onError = (data) => console.log(data);

    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (keyPosts.includes(key)) {
                postData[key] = data[key];
            }
        });

        await sendRequest(!editData?.id ? postUrl : `${putUrl}${editData?.id}${dataType ? dataType : ''}`, !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
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
                handleEventSucceed();

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
                            {/* English name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="en-name"
                                    label={<LabelRequire label="Name (EN)" />}
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
                                    id="kh-name"
                                    label={<LabelRequire label="Name (KH)" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    {...register('nameKh')}
                                    error={errors?.nameKh ? true : false}
                                    helperText={errors?.nameKh?.message}
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

export default UpsertFormModal;
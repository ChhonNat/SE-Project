import React, { forwardRef, useCallback, useEffect, useState } from "react";
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
import { globalService } from "../../../services/global.service";
import { API_URL } from "../../../constants/api_url";
import { HTTP_STATUS } from "../../../constants/http_status";
import { KEY_POST } from "../../../constants/key_post";
import DepartmentModel from "../../../models/department.model";
import MultiSelectComponent from "../../../components/MultiSelector/select";
import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";
import LabelRequire from "../../../components/Label/require";
import { Close } from "@mui/icons-material";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertDepartmentForm = (props) => {

    const { openModal, onCloseModal, handleEventSuccessed, title, editData } = props;
    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors, setError } = useForm({ resolver: zodResolver(DepartmentModel) });
    const { data, loading, error, message, sendRequest } = _useHttp();
    const watchData = watch();
    const { errors } = formState;

    useEffect(() => {

        if (editData?.id && openModal) {

            for (let key in editData) {
                setValue(key, editData[key])
            }
        }

    }, [openModal])

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

    }, [data, error, loading, message]);

    const onError = (data) => {
        console.log(data);

        if(data?.businessUnitId)
        setError('businessUnitId',{message: 'Primary business is required!'});
        
    }

    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.department.includes(key) && !editData?.id) {
                postData[key] = data[key];

            } else {

                postData[key] = data[key];

            }
        });

        await sendRequest(!editData?.id ? API_URL.department.create : API_URL.department.edit + editData?.id, !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
    }

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

                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="name-en"
                                    label={<LabelRequire label="Name" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    {...register('nameEn')}
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
                                    {...register('nameKh')}
                                    error={errors?.nameKh ? true : false}
                                    helperText={errors?.nameKh?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <AsyncAutoComplete
                                    id="primary-business-id"
                                    label="Primary Business"
                                    size="small"
                                    callToApi={API_URL.lookup.businessUnit.get}
                                    bindField={'nameEn'}
                                    handleOnChange={(e, value) => {
                                        setValue('businessUnitId', value?.id ? value?.id : value);
                                    }}
                                    value={watchData?.businessUnitId || null}
                                    isRequire={true}
                                    err={errors?.businessUnitId?.message}
                                />
                                {/* <MultiSelectComponent
                                    id="business-id"
                                    label="Primary Business"
                                    isRequire={true}
                                    isSubmit={isSubmitForm}
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessDivisions || []}
                                    bindField="nameEn"
                                    handleEventChange={(e) => setValue('businessDivisions', e)}
                                    err={errors?.businessDivisions?.message}
                                /> */}
                                {/* <SelectComponent
                                    id="primary-business-id"
                                    label="Primary Business"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessDivisions || ""}
                                    bindField="nameEn"
                                    handleOnChange={(e) => setValue('businessDivisions', e?.target?.value)}
                                    err={errors?.businessDivisions?.message}
                                /> */}
                            </Grid>

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

export default UpsertDepartmentForm;
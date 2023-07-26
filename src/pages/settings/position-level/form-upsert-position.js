import React, { forwardRef, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import _useHttp from "../../../hooks/_http";
import Swal from "sweetalert2";
import SelectComponent from "../../../components/Selector/select";

import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";
import PositionLevelModel from "../../../models/position/position-level.model";

import { TextField, Grid, Dialog, DialogTitle, DialogContent, Slide, DialogActions, IconButton } from "@mui/material";
import { globalService } from "../../../services/global.service";
import { HTTP_STATUS } from "../../../constants/http_status";
import { API_URL } from "../../../constants/api_url";
import { KEY_POST } from "../../../constants/key_post";
import { STATUS } from "../../../constants/status";
import { ALERT_TIMER } from "../../../constants/app_config";
import { HTTP_METHODS } from "../../../constants/http_method";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertPositionLavelForm = (props) => {


    const { openModal, onCloseModal, handleEventSuccessed, title, editData } = props;
    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors } = useForm({ resolver: zodResolver(PositionLevelModel) });
    const { data, loading, error, message, sendRequest } = _useHttp();
    const { errors } = formState;
    const watchData = watch();

    const [listBusinessDivisions, setListBusinessDivisions] = useState([]);
    const [listDepartments, setListDepartments] = useState([]);
    const [isSubmitForm, setIsSubmitForm] = useState(false);

    useEffect(() => {

        if (openModal) {

            if (editData?.id) {

                for (let key in editData) {
                    setValue(key, editData[key])
                }
            }

            /**Fetch lookup data businesss and department  */
            fetchData(API_URL.lookup.businessUnit.get, setListBusinessDivisions);

        }

    }, [openModal])

    const onError = (data) => {
        setIsSubmitForm(true);
    }


    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.positionLevel.includes(key) && !editData?.id) {

                postData[key] = data[key];

            } else {

                postData[key] = data[key];
            }
        });


        await sendRequest(!editData?.id ? API_URL.positionLevel.create : API_URL?.positionLevel?.edit + editData?.id, !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
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

    const fetchData = useCallback(async (asyncUrl, setData) => {
        try {

            const reqData = await globalService.getData(asyncUrl);
            const { status, data } = reqData;
            const { success } = data;

            if (status === HTTP_STATUS.success) {
                success ? setData(data?.data) : setData([]);
            }

        } catch (error) {
            console.log(error);
        }
    }, []);

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
                                    id="name"
                                    label={<span>Name <b style={{ color: 'red' }}>*</b></span>}
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
                                    id="name"
                                    label={<span>Name(KH) <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    {...register('nameKh')}
                                    error={errors?.nameKh ? true : false}
                                    helperText={errors?.nameKh?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="primary-business-id"
                                    label="Primary Business"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessUnitId || ""}
                                    bindField="nameEn"
                                    handleOnChange={(e) => setValue('businessUnitId', e?.target?.value)}
                                    err={errors?.businessUnitId?.message}
                                />
                                {/* <MultiSelectComponent
                                    id="business-unit-id"
                                    label="Primary Business"
                                    isRequire={true}
                                    isSubmit={isSubmitForm}
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessDivisions || []}
                                    bindField="nameEn"
                                    handleEventChange={(e) => setValue('businessDivisions', e)}
                                    err={errors?.businessDivisions?.message}
                                /> */}
                            </Grid>
                            <Grid item xs={12}>

                                <AsyncAutoComplete
                                    id="department-id"
                                    label="Department"
                                    size="small"
                                    callToApi={API_URL.lookup.department.get}
                                    bindField={'nameEn'}
                                    handleOnChange={(e, value) => {
                                        setValue('departmentId', value?.id ? value?.id : value);
                                    }}
                                    value={watchData?.departmentId || null}
                                    isRequire={true}
                                    err={errors?.departmentId?.message}
                                />

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

export default UpsertPositionLavelForm;
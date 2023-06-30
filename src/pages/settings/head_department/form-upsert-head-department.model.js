import React, { forwardRef, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Grid, Dialog, DialogTitle, DialogContent, Slide, DialogActions } from "@mui/material";
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
import HeadDepartmentModel from "../../../models/head-department.model";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertHeadDepartmentForm = (props) => {

    const { openModal, onCloseModal, handleEventSuccessed, title, editData } = props;
    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors } = useForm({ resolver: zodResolver(HeadDepartmentModel) });
    const { data, loading, error, message, sendRequest } = _useHttp();
    const watchData = watch();
    const { errors } = formState;

    const [listBusinessDivisions, setListBusinessDivisions] = useState([]);
    const [listDepartments, setListDepartments] = useState([]);
    const [listPositions, setListPositions] = useState([]);

    useEffect(() => {

        if (editData?.id) {

            for (let key in editData) {
                setValue(key, editData[key])
            }
        }
        else {
            clearErrors();
        }

        //Fetch business division
        fetchData(API_URL.lookup.business.get, setListBusinessDivisions);


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
    }, [])

    const onError = (data) => console.log(data);

    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.headDepartment.includes(key)) {
                postData[key] = data[key];
            }
        });

        await sendRequest(!editData?.id ? API_URL.headDepartment.create : API_URL.headDepartment.edit + editData?.id, !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
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
                </DialogTitle>
                <DialogContent dividers>

                    <Box sx={{ width: '100%' }}>

                        {/* Input Fields */}
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="staff-id"
                                    label={<span>Staff ID <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    {...register('staffId')}
                                    error={errors?.staffId}
                                    helperText={errors?.staffId?.message}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="first-name"
                                    label={<span>First Name <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    {...register('firstName')}
                                    error={errors?.firstName}
                                    helperText={errors?.firstName?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="last-name"
                                    label={<span>Last Name <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    {...register('lastName')}
                                    error={errors?.lastName}
                                    helperText={errors?.lastName?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="phone"
                                    label={<span>Phone Number <b style={{ color: 'red' }}>*</b></span>}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    {...register('phoneNumber')}
                                    error={errors?.phoneNumber}
                                    helperText={errors?.phoneNumber?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <SelectComponent
                                    id="business-id"
                                    label="Business Unit"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessDivisionId || ""}
                                    handleOnChange={(e) => { 
                                        setValue('businessDivisionId', e?.target?.value);
                                        setValue('departmentId',null);
                                        fetchData(API_URL.lookup.departmentById.get+e?.target?.value, setListDepartments);
                                    }}
                                    err={errors?.businessDivisionId?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <SelectComponent
                                    id="department-id"
                                    label="Department"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listDepartments}
                                    value={watchData?.departmentId || ""}
                                    handleOnChange={(e) => {
                                        setValue('departmentId', e?.target?.value);
                                        setValue('positionId',null);
                                        fetchData(API_URL.lookup.positionById.get+e?.target?.value, setListPositions);
                                    }}
                                    err={errors?.departmentId?.message}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <SelectComponent
                                    id="position-id"
                                    label="Position"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listPositions}
                                    value={watchData?.positionId || ""}
                                    handleOnChange={(e) => setValue('positionId', e?.target?.value)}
                                    err={errors?.positionId?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    {...register('description')}
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

export default UpsertHeadDepartmentForm;
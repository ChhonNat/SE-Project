import React, { forwardRef, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SelectComponent from "../../../components/Selector/select";
import FooterComponent from "../../../components/Page/footer";
import TitleComponent from "../../../components/Page/title";
import AsyncAutoComplete from "../../../components/AutoComplete/auto-complete";
import CommitteeModel from "../../../models/committee.model";
import Swal from "sweetalert2";

import { TextField, Grid, Dialog, DialogTitle, DialogContent, Slide, DialogActions } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTP_METHODS } from "../../../constants/http_method";
import { ALERT_TIMER } from "../../../constants/app_config";
import { STATUS } from "../../../constants/status";
import { globalService } from "../../../services/global.service";
import { API_URL } from "../../../constants/api_url";
import { HTTP_STATUS } from "../../../constants/http_status";
import { KEY_POST } from "../../../constants/key_post";

import _useHttp from "../../../hooks/_http";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UpsertCommitteeForm = (props) => {

    const { openModal, onCloseModal, handleEventSuccessed, title, editData } = props;
    const { register, handleSubmit, reset, setValue, watch, formState, clearErrors, setError } = useForm({ resolver: zodResolver(CommitteeModel) });
    const { data, loading, error, message, sendRequest } = _useHttp();
    const watchData = watch();
    const { errors } = formState;

    const [listBusinessDivisions, setListBusinessDivisions] = useState([]);
    const [listDepartments, setListDepartments] = useState([]);
    const [listPositions, setListPositions] = useState([]);
    const [listPositionLevels, setListPositionLevels] = useState([]);


    useEffect(() => {

        if (openModal) {

            if (editData?.id) {

                for (let key in editData) {
                    setValue(key, editData[key])
                }
            }
            else {
                clearErrors();
            }

            //Fetch business unit
            fetchData(API_URL.lookup.businessUnit.get, setListBusinessDivisions);
            fetchData(API_URL.lookup.positionLevel.get, setListPositionLevels);

            if (editData?.id) {
                fetchData(API_URL.lookup.departmentById.get + editData?.businessUnitId, setListDepartments);
                fetchData(API_URL.lookup.positionById.get + editData?.departmentId, setListPositions);
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

    const onError = (data) => {
        console.log(data);

        if (data?.departmentId)
            setError('departmentId', { message: 'Department is required!' });

        if (data?.positionId)
            setError('positionId', { message: 'Position is required!' });
    }

    const submit = async (data) => {

        let postData = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.committeee.includes(key)) {
                postData[key] = data[key];
            }
        });

        await sendRequest(!editData?.id ? API_URL.committeee.create : API_URL.committeee.edit + editData?.id, !editData?.id ? HTTP_METHODS.post : HTTP_METHODS.put, postData);
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
                                    error={errors?.staffId ? true : false}
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
                                    error={errors?.firstName ? true : false}
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
                                    error={errors?.lastName ? true : false}
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
                                    error={errors?.phoneNumber ? true : false}
                                    helperText={errors?.phoneNumber?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <SelectComponent
                                    id="business-id"
                                    label="Primary Business"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listBusinessDivisions}
                                    value={watchData?.businessUnitId || ""}
                                    bindField="nameEn"
                                    handleOnChange={(e) => {
                                        setValue('businessUnitId', e?.target?.value);
                                        setValue('departmentId', null);
                                        fetchData(API_URL.lookup.departmentById.get + e?.target?.value, setListDepartments);
                                    }}
                                    err={errors?.businessUnitId?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AsyncAutoComplete
                                    id="department-id"
                                    label="Department"
                                    size="large"
                                    customDatas={listDepartments}
                                    bindField={'nameEn'}
                                    handleOnChange={(e, value) => {
                                        setValue('departmentId', value?.id ? value?.id : value);
                                        setValue('positionId', null);
                                        fetchData(API_URL.lookup.positionById.get + value?.id, setListPositions);
                                    }}
                                    value={watchData?.departmentId || null}
                                    isRequire={true}
                                    err={errors?.departmentId?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <SelectComponent
                                    id="position-level-id"
                                    label="Position Level"
                                    isRequire={true}
                                    variant="outlined"
                                    fullWidth
                                    size="meduim"
                                    customDatas={listPositionLevels}
                                    value={watchData?.positionLevelId || ""}
                                    bindField="nameEn"
                                    handleOnChange={(e) => {
                                        setValue('positionLevelId', e?.target?.value);
                                    }}
                                    err={errors?.positionLevelId?.message}
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
                                    bindField="nameEn"
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

export default UpsertCommitteeForm;
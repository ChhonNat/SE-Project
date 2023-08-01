import React, { forwardRef, useEffect, useState } from "react";
import TitleComponent from "../Page/title";
import FooterComponent from "../Page/footer";
import AsyncAutoComplete from "../AutoComplete/auto-complete";
import AsyncMultiAutoComplete from "../MultiAutoComplete/auto-complete";
import InviteInterviewModel from "../../models/interview/invite-interview.model";
import SelectComponent from "../Selector/select";
import _useHttp from "../../hooks/_http";
import Swal from "sweetalert2";

import { STATUS } from "../../constants/status";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "../../constants/api_url";
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, OutlinedInput, Select, Slide, TextField } from "@mui/material";
import { CandidateService } from "../../services/candidate.service";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { Close } from "@mui/icons-material";
import LabelRequire from "../Label/require";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateScheduleFormModal = (props) => {


    const { open, onCloseModal, eventType, editData, handleEventSuccessed, apiService } = props;
    const { register, handleSubmit, formState, setValue, watch, reset, setError, clearErrors } = useForm({ resolver: zodResolver(InviteInterviewModel) });

    const watchInterview = watch();
    const { errors } = formState;
    const [hours, setHours] = useState([]);
    const [minutes, setMinutes] = useState([]);

    useEffect(() => {

        if (open) {

            clearErrors();

            setValue('hour', '01');
            setValue('min', '00');
            setValue('meridiem', 'AM');

            const stringH = [];
            const stringMin = [];
            const H = [...Array(23).keys()];
            const Min = [...Array(60).keys()];

            H.forEach((value) => {
                value++;
                value < 10 ? stringH.push({ h: '0' + value }) : stringH.push({ h: String(value) });
            });
            setHours([...stringH]);

            Min.forEach((value) => {
                value < 10 ? stringMin.push({ min: '0' + value }) : stringMin.push({ min: String(value) });
            });
            setMinutes([...stringMin]);
        }

    }, [open])

    //map event when get event from home candidate
    const mapEventType = {
        "setScheduleTest": {
            title: "Are you sure?",
            subTitle: "You want to set schedule for test.",
            actions: {
                submitLabel: 'Confirm',
                submitStatus: STATUS.SUBMIT_STATUS.SUBMITTED_DHR,
                select: false
            }
        },
        "setScheduleInterview": {
            title: "Are you sure?",
            subTitle: "You want to set schedule for interview.",
            actions: {
                submitLabel: 'Confirm',
                submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
                select: false
            }
        },
        "setSecondRoundInterview": {
            title: "Are you sure?",
            subTitle: "You want to set second schedule for interview.",
            actions: {
                submitLabel: 'Confirm',
                submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
                select: false
            }
        },
        'setFinalScheduleInterview': {
            title: "Are you sure?",
            subTitle: "You want to set final schedule for interview.",
            actions: {
                submitLabel: 'Confirm',
                submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
                select: false
            }
        }
    };

    const onError = (error) => {
        console.log('Input error', error);
        if (error?.hour)
            setError('hour', { message: 'Hour is required!' })

        if (error?.min)
            setError('min', { message: 'Minute is required!' })
    };

    const onSubmit = async (dataInput) => {

        try {

            let submitCandidate;
            const dataSubmit = {
                interviewDate: `${dataInput.interviewDate}T${dataInput.hour}:${dataInput?.min}`,
                headDepartmentId: dataInput?.headDepartmentId,
                committees: dataInput?.committees,
                remark: dataInput?.remark
            };

            if (apiService)
                submitCandidate = await apiService(editData?.id, editData?.candidate?.id, dataSubmit)
            else
                submitCandidate = await CandidateService.inviteFirstInterview(editData?.id, dataSubmit);

            const { status, data } = submitCandidate;
            const { message } = data;

            if (status === HTTP_STATUS.success) {

                if (data?.status === DATA_STATUS.success)
                    handleEventSuccessed();

                Swal.fire({
                    title: data?.status === DATA_STATUS.success ? 'Success' : 'Error',
                    text: message,
                    icon: data?.status === DATA_STATUS.success ? 'success' : 'error',
                    confirmButtonText: 'OK',
                });

                handleCloseModal();
            }

        } catch (error) {
            console.log('error', error);
        }
    };

    const handleCloseModal = () => {
        reset();
        clearErrors();
        onCloseModal();
    }


    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={open}
                component="form"
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <DialogTitle>
                    <TitleComponent
                        title={mapEventType[eventType]?.title}
                        subTitle={mapEventType[eventType]?.subTitle}
                    />
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
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={4}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    size="small"
                                    id="interview-date"
                                    label={<LabelRequire label="Interview Date" />}
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.interviewDate ? true : false}
                                    helperText={errors?.interviewDate?.message || ''}
                                    {...register('interviewDate')}
                                />
                            </Grid>
                            <Grid item xs={3}>

                                <Autocomplete
                                    id="hour"
                                    size="small"
                                    freeSolo
                                    options={hours.map((option) => option.h)}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label={<LabelRequire label="Hour" />}
                                            error={errors?.hour && !watchInterview?.hour ? true : false}
                                            helperText={errors?.hour?.message && !watchInterview?.hour ? errors?.hour?.message : ''}
                                        />
                                    }
                                    onChange={(e, value) => setValue('hour', value)}
                                    value={watchInterview?.hour}
                                />

                            </Grid>

                            <Grid item xs={3}>

                                <Autocomplete
                                    id="minute"
                                    size="small"
                                    freeSolo
                                    options={minutes.map((option) => option.min)}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label={<LabelRequire label="Minute" />}
                                            error={errors?.min && !watchInterview?.min ? true : false}
                                            helperText={errors?.min?.message && !watchInterview?.min ? errors?.min?.message : ''}
                                        />}
                                    onChange={(e, value) => setValue('min', value)}
                                    value={watchInterview?.min}
                                />

                            </Grid>

                            <Grid item xs={2}>
                                <Autocomplete
                                    id="meridiem"
                                    size="small"
                                    freeSolo
                                    options={['AM', 'PM'].map((option) => option)}
                                    renderInput={(params) => <TextField {...params} label="" />}
                                    onChange={(e, value) => setValue('meridiem', value)} yar
                                    value={parseInt(watchInterview?.hour) > 12 ? 'PM' : 'AM'}
                                    disabled
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <AsyncAutoComplete
                                    id="hod-committee"
                                    size="small"
                                    label="HOD"
                                    limitTags={10}
                                    callToApi={API_URL.headDepartment.get}
                                    httpMethod={'post'}
                                    reqBody={{
                                        start: 0,
                                        length: 300,
                                        searchValue: "",
                                        orderColumn: "id",
                                        ordinal: "desc"
                                    }}
                                    bindField={'fullName'}
                                    value={watchInterview?.headDepartmentId}
                                    err={errors?.headDepartmentId?.message}
                                    handleOnChange={(e, val) => { setValue('headDepartmentId', val?.id) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AsyncMultiAutoComplete
                                    id="key-person-committee"
                                    label="Interviewer Committee"
                                    size="small"
                                    limitTags={10}
                                    callToApi={API_URL.committeee.get}
                                    httpMethod={'post'}
                                    reqBody={{
                                        start: 0,
                                        length: 300,
                                        searchValue: "",
                                        orderColumn: "id",
                                        ordinal: "desc"
                                    }}
                                    bindField={'fullName'}
                                    value={watchInterview?.committees}
                                    err={errors?.committees?.message}
                                    handleOnChange={(e, val) => setValue('committees', val?.length ? val.map(ele => ele.id) : [])}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="Remark"
                                    label="Remark"
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    variant="outlined"
                                    {...register('remark')}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType="submit"
                        saveButtonLabel={mapEventType[eventType]?.actions?.submitLabel}
                        handleCancel={onCloseModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateScheduleFormModal;
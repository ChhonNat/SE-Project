import React, { forwardRef } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import AsyncAutoComplete from "../../components/AutoComplete/auto-complete";
import AsyncMultiAutoComplete from "../../components/MultiAutoComplete/auto-complete";
import InviteInterviewModel from "../../models/invite-interview.model";
import _useHttp from "../../hooks/_http";
import { STATUS } from "../../constants/status";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "../../constants/api_url";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import { CandidateService } from "../../services/candidate.service";
import Swal from "sweetalert2";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateScheduleForm = (props) => {

    const { open, onCloseModal, eventType, candidate, handleEventSuccessed } = props;
    const { register, handleSubmit, formState, setValue, watch, reset, clearErrors } = useForm({ resolver: zodResolver(InviteInterviewModel) });

    const watchCandidate = watch();
    const { errors } = formState;

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

    const onError = (error, e) => {
        console.log('Input error', error);
    };

    const onSubmit = async (dataSubmit) => {
        // console.log('data submit', data);
        try {

            const submitCandidate = await CandidateService.inviteCandidateInterview(dataSubmit, candidate?.id);
            console.log('submit candidate',submitCandidate);

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
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    size="small"
                                    id="schedule"
                                    label="Schedule"
                                    variant="outlined"
                                    type="datetime-local"
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.interviewDate ? true : false}
                                    helperText={errors?.interviewDate?.message || ''}
                                    {...register('interviewDate')}
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
                                    value={watchCandidate?.headDepartmentId}
                                    err={errors?.headDepartmentId?.message}
                                    handleOnChange={(e, val) => { setValue('headDepartmentId', val?.id) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AsyncMultiAutoComplete
                                    id="key-person-committee"
                                    label="Key Person"
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
                                    value={watchCandidate?.committees}
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
                                    rows={2}
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

export default CandidateScheduleForm;
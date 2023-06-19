import React, { forwardRef, useEffect } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ConverterService } from "../../utils/converter";
import { KEY_POST } from "../../constants/key_post";
import { CandidateService } from "../../services/candidate.service";
import { HTTP_STATUS } from "../../constants/http_status";
import Swal from "sweetalert2";
import { DATA_STATUS } from "../../constants/data_status";
import { CandidateModel } from "../../models/candidate.model";
import { ALERT_TIMER } from "../../constants/app_config";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateInviteFormModal = (props) => {


    const { openApproveCandidateModal, onCloseApproveCandidateModal, candidate, handleEventSuccessed } = props;
    const { register, handleSubmit, setValue, watch , reset, formState} = useForm({ resolver: zodResolver(CandidateModel.Invite) });
    const { errors } = formState;

    useEffect(() => {

        if (candidate?.id) {

            for (let key in candidate) {

                if (key === 'shortlistDate') {
                    setValue(key, ConverterService.convertUnixDateToMUI(candidate[key]));
                } else if (key === 'appliedDate') {
                    setValue(key, ConverterService.convertUnixDateToMUI(candidate[key]))
                } else {
                    setValue(key, candidate[key]);
                }
            }
        }

    }, [candidate?.id])


    const error = (data) => console.log(data);

    const submit = async (data) => {

        const inviteCandidate = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.invite_candidate.includes(key)) {

                if (key === 'interviewDate')
                    data[key] = ConverterService.convertDateToAPI(data[key])

                inviteCandidate[key] = data[key];
            }
        });

        try {
            const submitCandidate = await CandidateService.inviteCandidate(inviteCandidate, candidate?.id);
            const { status, data } = submitCandidate;
            const { message } = data;

            if (status === HTTP_STATUS.success) {

                if(data?.status === DATA_STATUS.success)
                handleEventSuccessed();

                Swal.fire({
                    title: data?.status === DATA_STATUS.success ? 'Success' : 'Error',
                    text: message,
                    icon: data?.status === DATA_STATUS.success ? 'success' : 'error',
                    confirmButtonText: 'Text',
                    timer: ALERT_TIMER
                });

                handleCloseModal();
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleCloseModal = () => {
        reset();
        onCloseApproveCandidateModal();
    }


    return (
        <div>
            <Dialog
                maxWidth="sm"
                TransitionComponent={TransitionModal}
                open={openApproveCandidateModal}
                component="form"
                onSubmit={handleSubmit(submit, error)}
            >
                <DialogTitle>
                    <TitleComponent title="Invite to interview ?" />
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {/*Candidate Position */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="shortlist-result-id"
                                    label="Candidate Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('fullName')}
                                />
                            </Grid>

                            {/* Shortlist Date */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="date"
                                    id="shortlist-date-id"
                                    label="Date Shortlist"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('shortlistDate')}
                                />
                            </Grid>

                            {/* Shortlist Result */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="shortlist-result-id"
                                    label="Result Shortlist"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('shortlistResult')}
                                />
                            </Grid>

                            {/*Candidate Position */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="shortlist-result-id"
                                    label="Position Apply For"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('appliedPositionName')}
                                />
                            </Grid>

                            {/* Business Name*/}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="business-name-id"
                                    label="Business Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('businessDivisionName')}
                                />
                            </Grid>

                            {/* Department Name*/}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="department-name-id"
                                    label="Department Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('departmentName')}
                                />
                            </Grid>

                            {/* Select  department*/}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="head-department-id"
                                    label="Head Department"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('headDepartmentName')}
                                />
                            </Grid>

                            {/* Location*/}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="head-department-id"
                                    label="Location"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('appliedLocationName')}
                                />
                            </Grid>

                            {/* Interview date Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="interview-date-id"
                                    label="Interview Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('interviewDate')}
                                    error={errors?.interviewDate}
                                    helperText={errors?.interviewDate?.message}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        saveButtonLabel='Confirm'
                        handleCancel={handleCloseModal}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateInviteFormModal;
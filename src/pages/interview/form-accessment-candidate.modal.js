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
import InterviewModel from "../../models/interview.model";
import { ALERT_TIMER } from "../../constants/app_config";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateAssessmentFormModal = (props) => {


    const { openAssessmentCandidateModal, onCloseAssessmentCandidateModal, interview, handleEventSuccessed } = props;
    const { register, handleSubmit, setValue, formState } = useForm({ resolver: zodResolver(InterviewModel) });
    const { errors } = formState;

    useEffect(() => {

        if (interview?.id) {

            for (let key in interview) {

                if (key === 'interviewDate') {
                    setValue(key, ConverterService.convertUnixDateToMUI(interview[key]));
                } else {
                    setValue(key, interview[key]);
                }
            }
        }

    }, [interview?.id])


    const error = (data) => console.log(data);

    const submit = async (data) => {


        const assesssmentCandidate = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.make_assessment_candidate.includes(key)) {

                if (key === 'offerDate')
                    data[key] = ConverterService.convertDateToAPI(data[key])

                assesssmentCandidate[key] = data[key];
            }
        });


        try {
            const submitCandidate = await CandidateService.assessmentCandidate(assesssmentCandidate, interview?.id, interview?.candidateId);
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
                    timer: ALERT_TIMER
                });

                handleCloseModal();
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleCloseModal = () => {
        onCloseAssessmentCandidateModal();
    }


    return (
        <div>
            <Dialog
                maxWidth="sm"
                TransitionComponent={TransitionModal}
                open={openAssessmentCandidateModal}
                component="form"
                onSubmit={handleSubmit(submit, error)}
            >
                <DialogTitle>
                    <TitleComponent title="Make assessment ?" />
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
                                    {...register('candidateName')}
                                />
                            </Grid>

                            {/* Shortlist Date */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="date"
                                    id="interview-date-id"
                                    label="Interview Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('interviewDate')}
                                />
                            </Grid>

                            {/* Shortlist Result */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="interview-result-id"
                                    label="Interview Result"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('interviewResult')}
                                />
                            </Grid>

                            {/*Candidate Position */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="position-id"
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
                                    id="location-id"
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
                                    id="offer-date-id"
                                    label="Offer Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('offerDate')}
                                    error={errors?.offerDate ? true : false}
                                    helperText={errors?.offerDate?.message}
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
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateAssessmentFormModal;
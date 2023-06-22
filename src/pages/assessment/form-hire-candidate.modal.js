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
import { ALERT_TIMER } from "../../constants/app_config";
import { AssessmentModel } from "../../models/assessment.model";
import LabelRequire from "../../components/Label/require";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateHireFormModal = (props) => {


    const { openHireCandidateModal, onCloseHireCandidateModal, assessment, handleEventSuccessed } = props;
    const { register, handleSubmit, setValue, formState, clearErrors } = useForm({ resolver: zodResolver(AssessmentModel.Hire) });
    const { errors } = formState;

    useEffect(() => {

        if (assessment?.id) {

            for (let key in assessment) {

                if (key === 'offerDate') {
                    setValue(key, ConverterService.convertUnixDateToMUI(assessment[key]));
                } else {
                    setValue(key, assessment[key]);
                }
            }
        }

        clearErrors()
    }, [openHireCandidateModal])


    const error = (data) => console.log(data);

    const submit = async (data) => {

        const hireCandidate = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.hire_candidate.includes(key)) {

                if (key === 'joinDate')
                    data[key] = ConverterService.convertDateToAPI(data[key]);
                if (key === 'hireDate')
                    data[key] = ConverterService.convertDateToAPI(data[key]);

                    hireCandidate[key] = data[key];
            }
        });

        try {
            const submitCandidate = await CandidateService.hireCandidate(hireCandidate, assessment?.id, assessment?.interviewId ,assessment?.candidateId);
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
        onCloseHireCandidateModal();
    }


    return (
        <div>
            <Dialog
                maxWidth="sm"
                TransitionComponent={TransitionModal}
                open={openHireCandidateModal}
                component="form"
                onSubmit={handleSubmit(submit, error)}
            >
                <DialogTitle>
                    <TitleComponent title="Hire this candidate ?" />
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

                            {/*Offer Candidate Position */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="offer-position-id"
                                    label="Offer Position"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('offerPositionName')}
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
                                    {...register('offerLocationName')}
                                />
                            </Grid>

                            
                            {/*Hired date Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="hire-date-id"
                                    label={<LabelRequire label="Hire Date" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.hireDate}
                                    helperText={errors?.hireDate?.message}
                                    {...register('hireDate')}
                                />
                            </Grid>

                            {/* Offer date Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="join-date-id"
                                    label={<LabelRequire label="Join Date" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.joinDate}
                                    helperText={errors?.joinDate?.message}
                                    {...register('joinDate')}
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

export default CandidateHireFormModal;
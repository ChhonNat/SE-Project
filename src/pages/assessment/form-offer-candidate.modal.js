import React, { forwardRef, useCallback, useEffect, useState } from "react";
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
import { API_URL } from "../../constants/api_url";
import { globalService } from "../../services/global.service";
import SelectComponent from "../../components/Selector/select";
import { AssessmentModel } from "../../models/assessment.model";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateOfferFormModal = (props) => {


    const { openOfferCandidateModal, onCloseOfferCandidateModal, assessment, handleEventSuccessed } = props;
    const { register, handleSubmit, setValue, formState, watch } = useForm({ resolver: zodResolver(AssessmentModel.Offer) });
    const { errors } = formState;
    const watchCandidate = watch();

    const [listAssessmentStatuses, setListAssessmentStatuses] = useState([]);

    /**
     * Fields need to format to display in MUI date and submit to DB
     */
    const fieldDateFormat = [
        "offerDate",
        "submitOPSOfficeDate",
        "submitCEOOfficeDate",
        "receivedOPSOfficeDate",
        "receivedCEOOfficeDate",
        "signedOfferDate",
        "signedContractDate"
    ];

    useEffect(() => {

        if (assessment?.id) {

            for (let key in assessment) {

                if (fieldDateFormat.includes(key)) {
                    setValue(key, ConverterService.convertUnixDateToMUI(assessment[key] ? assessment[key] : new Date()));
                } else {
                    setValue(key, assessment[key]);
                }
            }
        }

    }, [assessment?.id])


    const error = (data) => console.log(data);

    // Submit offer candidate method
    const submit = async (data) => {

        const offerCandidate = {};

        Object.keys(data).forEach((key) => {

            if (KEY_POST.offer_assessment_candidate.includes(key)) {

                if (fieldDateFormat.includes(key)) {

                    offerCandidate[key] = ConverterService.convertDateToAPI(data[key]);
                } else {

                    offerCandidate[key] = data[key];
                }
            }
        });

        try {
            const submitCandidate = await CandidateService.editAssessmentCandidate(offerCandidate, assessment?.id);
            const { status, data } = submitCandidate;
            const { message, success } = data;

            if (status === HTTP_STATUS.success) {

                handleEventSuccessed();

                Swal.fire({
                    title:success ? 'Success' : 'Error',
                    text: message,
                    icon: success ? 'success' : 'error',
                    confirmButtonText: 'Text',
                    timer: ALERT_TIMER
                });

                onCloseOfferCandidateModal();
            }
        } catch (error) {
            console.log(error);
        }

    };


    useEffect(() => {
        fetchData(API_URL.assessment.lookup.get);
    }, []);

    /**
     * Fetch data to listing in each selector
     */
    const fetchData = useCallback(async (url) => {
        try {

            const req = await globalService.getData(url);
            const { success, data } = req?.data;

            if (success) {

                setListAssessmentStatuses(data?.assessmentStatuses);

            } else {

                setListAssessmentStatuses([]);
            }
        } catch (error) {
            console.log(error)
        }
    }, []);


    return (
        <div>
            <Dialog
                maxWidth="sm"
                TransitionComponent={TransitionModal}
                open={openOfferCandidateModal}
                component="form"
                onSubmit={handleSubmit(submit, error)}
            >
                <DialogTitle>
                    <TitleComponent title="Offer Candidate" />
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {/*Offer salary */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="offer-salary-id"
                                    label="Offer Salary ($)"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('offerSalary')}
                                />
                            </Grid>

                            {/*Offer Date*/}
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
                                    error={errors?.hireDate}
                                    helperText={errors?.hireDate?.message}
                                />
                            </Grid>

                            {/*Osubmit OPS Office Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="submit-OPS-office-date-id"
                                    label="Submit OPS Office Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('submitOPSOfficeDate')}
                                />
                            </Grid>

                            {/*submit CEO Office Date*/}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="submit-CEO-office-date-id"
                                    label="Submit CEO Office Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('submitCEOOfficeDate')}
                                />
                            </Grid>

                            {/*Received OPS Office Date*/}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="received-OPS-office-date-id"
                                    label="Received OPS Office Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('receivedOPSOfficeDate')}
                                />
                            </Grid>

                            {/*Received CEO Office Date*/}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="received-CEO-office-date-id"
                                    label="Received CEO Office Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('receivedCEOOfficeDate')}
                                />
                            </Grid>

                            {/*signed Offer Date*/}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="signed-offer-date-id"
                                    label="Signed Offer Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('signedOfferDate')}
                                />
                            </Grid>


                            {/*signed Contract Date*/}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="signed-contract-date-id"
                                    label="Signed Contract Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('signedContractDate')}
                                    error={errors?.signedContractDate}
                                    helperText={errors?.signedContractDate?.message}
                                />
                            </Grid>

                            {/*Status */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="status-id"
                                    label={'Status'}
                                    size={'small'}
                                    customDatas={listAssessmentStatuses}
                                    value={watchCandidate?.status || ""}
                                    handleOnChange={(e) => setValue('status', e?.target?.value)}
                                    err={errors?.status?.message}
                                />
                            </Grid>

                            {/* Remark*/}
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="outlined-multiline-static"
                                    label="Remark"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    {...register('remark')}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        saveButtonLabel='Confirm'
                        handleCancel={onCloseOfferCandidateModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateOfferFormModal;
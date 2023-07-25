import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import SelectComponent from "../../components/Selector/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InterviewModel from "../../models/interview.model";
import { ConverterService } from "../../utils/converter";
import { globalService } from "../../services/global.service";
import { API_URL } from "../../constants/api_url";
import { KEY_POST } from "../../constants/key_post";
import { CandidateService } from "../../services/candidate.service";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import Swal from "sweetalert2";
import { ALERT_TIMER } from "../../constants/app_config";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateResultFormModal = (props) => {

    const { openResultCandidateModal, onCloseResultCandidateModal, handleEventSuccessed, candidate } = props;
    const { register, handleSubmit, formState, watch, setValue } = useForm({ resolver: zodResolver(InterviewModel) });
    const watchCandidate = watch();
    const errors = formState;

    const [listInterviewResults, setListInterviewResults] = useState([]);
    const [listInterviewStatuses, setListInterviewStatuses] = useState([]);
    const [listChannels, setListChannels] = useState([]);


    useEffect(() => {

        if (candidate?.id) {
            Object.keys(candidate).forEach((key) => {

                if (key === 'interviewDate') {

                    setValue(key, ConverterService.convertUnixDateToMUI(candidate[key]))
                } else if (key === 'feedBackDate') {

                    setValue(key, ConverterService.convertUnixDateToMUI(candidate[key]))
                } else {

                    setValue(key, candidate[key]);
                }
            });
        }
    }, [candidate])

    useEffect(() => {
        fetchData(API_URL.interview.lookup.get);
    }, []);

    /**
     * Fetch data to listing in each selector
     */
    const fetchData = useCallback(async (url) => {
        try {

            const req = await globalService.getData(url);

            const { success, data } = req?.data;

            if (success) {

                setListInterviewResults(data?.interviewResults);
                setListInterviewStatuses(data?.interviewStatuses);
                setListChannels(data?.feedBackChannels);

            } else {
                setListInterviewResults([]);
                setListInterviewStatuses([]);
                setListChannels([]);
            }
        } catch (error) {
            console.log(error)
        }
    }, []);

    const onSubmit = async (dataCandidate) => {

        let resultCandidate = {};

        Object.keys(dataCandidate).forEach((key) => {
            if (KEY_POST.feedback_candidate.includes(key)) {

                if (key === 'interviewDate') {

                    resultCandidate[key] = ConverterService.convertDateToAPI(dataCandidate[key]);
                } else if (key === 'feedBackDate') {

                    resultCandidate[key] = ConverterService.convertDateToAPI(dataCandidate[key]);
                } else {

                    resultCandidate[key] = dataCandidate[key]
                }

            }
        })

        const submitCandidate = await CandidateService.editResultCandidate(resultCandidate, dataCandidate?.id);
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

            onCloseResultCandidateModal();
        }

    };

    const onError = (data) => {
        console.log('on error', data);
    }

    return (
        <Dialog
            maxWidth="sm"
            TransitionComponent={TransitionModal}
            open={openResultCandidateModal}
            component="form"
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <DialogTitle>
                <TitleComponent title="Edit Candidate" />
            </DialogTitle>
            <DialogContent dividers>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                        {/* Interview Date */}
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

                        {/*Feedback Date*/}
                        <Grid item xs={12}>
                            <TextField
                                type="date"
                                id="feedback-date-id"
                                label="Feedback Date"
                                variant="outlined"
                                fullWidth
                                size="small"
                                InputLabelProps={shrinkOpt}
                                {...register('feedBackDate')}
                            />
                        </Grid>

                        {/* Feedback channel*/}
                        <Grid item xs={12}>
                            <SelectComponent
                                id="feedback-channel-id"
                                label={'Feedback By Channel'}
                                size={'small'}
                                customDatas={listChannels}
                                value={watchCandidate?.feedBackChannel || ""}
                                handleOnChange={(e) => setValue('feedBackChannel', e?.target?.value)}
                                err={errors?.feedBackChannel?.message}
                            />
                        </Grid>

                        {/* Remark*/}
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                id="outlined-multiline-static"
                                label="Remark"
                                multiline
                                rows={5}
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
                    handleCancel={onCloseResultCandidateModal}
                    actions={{ cancel: true, submit: true }}
                />
            </DialogActions>
        </Dialog>
    )
};

export default CandidateResultFormModal;
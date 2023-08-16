import React, { forwardRef, useCallback, useEffect, useState } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import SelectComponent from "../../components/Selector/select";
import LabelRequire from "../../components/Label/require";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { globalService } from "../../services/global.service";
import { API_URL } from "../../constants/api_url";
import { STATUS } from "../../constants/status";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slide, TextField } from "@mui/material";
import { interviewService } from "../../services/interview.service";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { Close } from "@mui/icons-material";
import { InterviewModel } from "../../models/interview.model";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InterViewEvaluateFormModal = (props) => {

    const {
        open,
        onCloseModal,
        interview,
        handleEventSucceed,
        selectLabel,
        eventType
    } = props;
    const { register, handleSubmit, setValue, formState, reset, watch, setError, clearErrors } = useForm({ resolver: zodResolver(InterviewModel.Evaluate) });
    const { errors } = formState;
    const watchInterview = watch();

    const [listInterviewResults, setListInterviewResults] = useState([]);

    //map event when get event from home interview
    const mapEventType = {
        "firstRoundEvaluate": {
            title: "Evaluate first interview",
            subTitle: "",
            actions: {
                submitLabel: 'Evaluate',
                select: false
            }
        },
        "secondRoundEvaluate": {
            title: "Evaluate second interview",
            subTitle: "",
            actions: {
                submitLabel: 'Evaluate',
                select: false
            }
        },
    };


    useEffect(() => {

        if (open) {
            setValue('interviewProcess', interview?.interviewProcess);
            fetchData(API_URL.lookup.interview.get);
        }
    }, [open])

    /**
     * Fetch data to listing in each selector
     */
    const fetchData = useCallback(async (url) => {

        try {

            const req = await globalService.getData(url);
            const { success, data } = req?.data;

            if (success && data?.hasOwnProperty('interviewResults')) {

                data?.interviewResults?.length ?
                    setListInterviewResults(data?.interviewResults?.filter((result) => {
                        return !result.includes(STATUS.INTERVIEW_RESULT.WAITING) &&
                            !result.includes(STATUS.INTERVIEW_RESULT.CANCELLED)
                    }))
                    :
                    setListInterviewResults([]);
            }

        } catch (error) {
            console.log(error)
        }
    }, []);


    const handleOnSubmit = async (submitData) => {

        const formSubmit = new FormData();

        Object.keys(submitData).forEach((key) => {
            formSubmit.append(key, submitData[key]);
        });

        const reqSubmitEvaluate = await interviewService.evaluateInterview(interview?.id, interview?.candidate?.id, formSubmit, 'multipart/form-data');

        const { status, data } = reqSubmitEvaluate;
        const { message } = data;

        if (status === HTTP_STATUS.success) {

            if (data?.status === DATA_STATUS.success)
                handleEventSucceed();

            /**
             * Alert after request responses
             */
            Swal.fire({
                title: data?.status === DATA_STATUS.success ? 'Success' : 'Error',
                text: message,
                icon: data?.status === DATA_STATUS.success ? 'success' : 'error',
                confirmButtonText: 'OK',
                size: 200
            })

            handleCloseModal();
        }

    };

    const handleCloseModal = () => {
        reset();
        clearErrors();
        onCloseModal();
    }

    const onError = (errData) => {

        if (!watchInterview?.file)
            setError('file', { message: 'File is required!' });
    };


    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={open}
                component="form"
                fullWidth={true}
                onSubmit={handleSubmit(handleOnSubmit, onError)}
                onClose={onCloseModal}
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
                            <Grid item xs={12}>
                                <TextField
                                    type='file'
                                    size='small'
                                    label={<LabelRequire label={"Evaluate Form"} />}
                                    InputLabelProps={{ shrink: true }}
                                    sx={{ width: '100%' }}
                                    onChange={(e) => {
                                        setValue('file', e?.target?.files[0]);
                                        clearErrors('file');
                                    }}
                                    error={errors?.file ? true : false}
                                    helperText={errors?.file?.message}
                                >
                                    Upload
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <SelectComponent
                                    id={'status-id'}
                                    label={selectLabel}
                                    size={'small'}
                                    customDatas={listInterviewResults}
                                    value={watchInterview?.interviewResult || ""}
                                    handleOnChange={(e) => setValue('interviewResult', e?.target?.value)}
                                    err={errors?.interviewResult?.message}
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
                        saveButtunType='submit'
                        saveButtonLabel='Evaluate'
                        handleCancel={onCloseModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default InterViewEvaluateFormModal;
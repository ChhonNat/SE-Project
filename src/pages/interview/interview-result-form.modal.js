import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import InterviewModel from "../../models/interview.model";
import SelectComponent from "../../components/Selector/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { globalService } from "../../services/global.service";
import { API_URL } from "../../constants/api_url";
import { STATUS } from "../../constants/status";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InterViewResultFormModal = (props) => {

    const {
        open,
        onCloseModal,
        candidate,
        handleEventSuccessed,
        title,
        selectLabel,
        statuses,
        eventType
    } = props;
    const { register, handleSubmit, setValue, formState, reset, watch } = useForm({ resolver: zodResolver(InterviewModel) });
    const { errors } = formState;
    const watchCandidate = watch();

    const [listInterviewResults, setListInterviewResults] = useState([]);

    //map event when get event from home candidate
    const mapEventType = {
        "firstRoundEvaluate": {
            title: "Are you sure?",
            subTitle: "You want to evaluate first interview result.",
            actions: {
                submitLabel: 'Confirm',
                select: false
            }
        },
        "secondRoundEvaluate": {
            title: "Are you sure?",
            subTitle: "You want to evaluate second interview result.",
            actions: {
                submitLabel: 'Confirm',
                select: false
            }
        },
    };


    useEffect(() => {
        if (open)
            fetchData(API_URL.interview.lookup.get);
    }, [open])

    /**
     * Fetch data to listing in each selector
     */
    const fetchData = useCallback(async (url) => {

        try {

            const req = await globalService.getData(url);
            const { success, data } = req?.data;

            if (success && data.hasOwnProperty('interviewResults')) {
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

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={open}
                component="form"
                fullWidth={true}
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
                                <SelectComponent
                                    id={'status-id'}
                                    label={selectLabel}
                                    size={'small'}
                                    customDatas={listInterviewResults}
                                    value={watchCandidate?.shortlistResult || ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="Remark"
                                    label="Remark"
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        saveButtonLabel='Confirm'
                        handleCancel={onCloseModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default InterViewResultFormModal;
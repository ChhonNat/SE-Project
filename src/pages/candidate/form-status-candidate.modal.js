import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide } from "@mui/material";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InterviewModel from "../../models/interview.model";
import SelectComponent from "../../components/Selector/select";
import { globalService } from "../../services/global.service";
import { API_URL } from "../../constants/api_url";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateStatusFormModal = (props) => {


    const { open, onCloseModal, candidate, handleEventSuccessed, title, selectLabel, statuses } = props;
    const { register, handleSubmit, setValue, formState, reset, watch } = useForm({ resolver: zodResolver(InterviewModel) });
    const { errors } = formState;
    const watchCandidate = watch();

    const [shortlistResults, setShortlistResults] = useState([]);
    const [candidateStatuses, setCandidateStatuses] = useState([]);
    const config = {
        "Edit shortlist result": {
            datas: shortlistResults
        },
        "Edit status": {
            datas: candidateStatuses
        }
    };


    useEffect(() => {
        fetchData(API_URL.candidate.lookup.get);
    }, [open])

    /**
     * Fetch data to listing in each selector
     */
    const fetchData = useCallback(async (url) => {

        try {

            const req = await globalService.getData(url);
            const { success, data } = req?.data;

            if (success) {
                setShortlistResults(data?.candidateStatuses);
                setCandidateStatuses(data?.shortlistResults);
            } else {
                setShortlistResults([]);
                setCandidateStatuses([]);
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
                    <TitleComponent title={title} />
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12}>
                                <SelectComponent
                                    id={'status-id'}
                                    label={selectLabel}
                                    size={'small'}
                                    customDatas={config[title].datas}
                                    value={watchCandidate?.shortlistResult || ""}
                                    handleOnChange={
                                        (e) => setValue('shortlistResult', e?.target?.value)
                                    }
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

export default CandidateStatusFormModal;
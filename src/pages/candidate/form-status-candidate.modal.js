import React, { forwardRef } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide } from "@mui/material";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InterviewModel from "../../models/interview.model";
import SelectComponent from "../../components/Selector/select";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateStatusFormModal = (props) => {


    const { open, onCloseModal, candidate, handleEventSuccessed, title, selectLabel, statuses } = props;
    const { register, handleSubmit, setValue, formState, reset, watch } = useForm({ resolver: zodResolver(InterviewModel) });
    const { errors } = formState;
    const watchCandidate = watch();

    return (
        <div>
            <Dialog
                maxWidth="md"
                TransitionComponent={TransitionModal}
                open={open}
                component="form"
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
                                    isRequire={true}
                                    size={'small'}
                                    customDatas={statuses}
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
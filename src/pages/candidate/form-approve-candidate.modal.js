import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import React, {forwardRef} from "react";
import TitleComponent from "../../components/Page/title";
import SelectComponent from "../../components/Selector/select";
import FooterComponent from "../../components/Page/footer";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateApproveFormModal = ({openApproveCandidateModal, onCloseApproveCandidateModal}) => {

    return (
        <div>
            <Dialog
                maxWidth="md"
                TransitionComponent={TransitionModal}
                open={openApproveCandidateModal}
                component="form"
                // onSubmit={handleSubmit(onSubmit, onError)}
            >
                <DialogTitle>
                    <TitleComponent title="Approve Candidate" />
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

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
                                    // error={errors?.shortListedDate}
                                    // helperText={errors?.shortListedDate?.message}
                                />
                            </Grid>

                             {/* Select businesss */}
                             <Grid item xs={12}>
                                <SelectComponent
                                    id="business-id"
                                    label={'Business Division'}
                                    size={'small'}
                                    // value={watchCandidate?.recruiterId || ""}
                                    // handleOnChange={(e) => setValue('recruiterId', e?.target?.value)}
                                    // err={errors?.positionId?.message}
                                />
                            </Grid>

                            {/* Select  department*/}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="department-id"
                                    label={'Department'}
                                    size={'small'}
                                    // value={watchCandidate?.receivedId || ""}
                                    // handleOnChange={(e) => setValue('receivedId', e?.target?.value)}
                                    // err={errors?.positionId?.message}
                                />
                            </Grid>

                           
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        handleCancel={onCloseApproveCandidateModal}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateApproveFormModal;
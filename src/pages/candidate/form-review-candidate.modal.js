import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import TitleComponent from "../../components/Page/title";
import SelectComponent from "../../components/Selector/select";
import FooterComponent from "../../components/Page/footer";
import { globalService } from "../../services/global.service";
import { API_URL } from "../../constants/api_url";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CandidateModel } from "../../models/candidate.model";
// import CandidateModel from "../../models/candidate.model";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateReviewFormModal = (props) => {

    const { openReviewCandidateModal, onCloseReviewCandidateModal, candidate, modalTitle } = props;
    const { register, setValue, watch } = useForm({ resolver: zodResolver(CandidateModel.Create) });
    const watchCandidate = watch();

    const [listShortlistResults, setShortlistResults] = useState([]);


    useEffect(() => {

        if (candidate?.id) {

            for (let key in candidate) {

                if (key === 'appliedDate') {

                    const appliedDate = new Date(candidate[key]);
                    setValue(key, appliedDate.getFullYear() + '-' + appliedDate.getMonth() + '-' + appliedDate.getDate());
                } else {

                    setValue(key, candidate[key]);
                }
            }
        }

    }, [candidate?.id])

    useEffect(() => {
        fetchData(API_URL.candidate.lookup.get, setShortlistResults);
    }, [])

    const fetchData = useCallback(async (url, setData) => {
        try {
            const req = await globalService.getData(url);

            const { success, data } = req.data;
            success ? setData(data?.shortlistResults) : setData([]);

        } catch (error) {
            console.log(error);
        }
    }, [])


    return (
        <div>
            <Dialog
                fullScreen={true}
                maxWidth="lg"
                TransitionComponent={TransitionModal}
                open={openReviewCandidateModal}
                component="form"
            >
                <DialogTitle>
                    <TitleComponent title={modalTitle} />
                </DialogTitle>
                
                <DialogContent dividers>

                    <embed src="sample.pdf"
                        style={
                            {
                                width: '-webkit-fill-available',
                                height: '70vh',
                            }}
                    />

                    <Box sx={{ width: '100%' }} paddingTop={5}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {/* Shortlist Date */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="department-id"
                                    label={'Review Result'}
                                    size={'small'}
                                    customDatas={listShortlistResults}
                                    value={watchCandidate?.shortlistResult || ''}
                                    handleOnChange={(e) => setValue('shortlistResult', e?.target?.value)}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        handleCancel={onCloseReviewCandidateModal}
                        saveButtonLabel={'Confirm'}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateReviewFormModal;
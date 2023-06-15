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
import CandidateModel from "../../models/candidate.model";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateApproveFormModal = (props) => {
    const { openApproveCandidateModal, onCloseApproveCandidateModal, candidate } = props;

    const { register, setValue, watch } = useForm({ resolver: zodResolver(CandidateModel) });
    const watchCandidate = watch();

    const [listHeadDepartments, setListHeadDepartments] = useState([]);


    useEffect(() => {

        if (candidate?.id) {

            for (let key in candidate) {

                if (key === 'shortListDate') {

                    const appliedDate = new Date(candidate[key]);
                    setValue(key, appliedDate.getFullYear() + '-' + appliedDate.getMonth() + '-' + appliedDate.getDate());
                } else {

                    setValue(key, candidate[key]);
                }
            }
        }

    }, [candidate?.id])

    useEffect(() => {
        fetchData(API_URL.lookup.headDepartment.get, setListHeadDepartments);
    }, [])

    const fetchData = useCallback(async (url, setData) => {
        try {
            const req = await globalService.getData(url)
            const { success, data } = req.data;
            success ? setData(data) : setData([]);

        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div>
            <Dialog
                maxWidth="sm"
                TransitionComponent={TransitionModal}
                open={openApproveCandidateModal}
                component="form"
            >
                <DialogTitle>
                    <TitleComponent title="Invite to interview ?" />
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {/* Shortlist Date */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="date"
                                    id="shortlist-date-id"
                                    label="Shortlist Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('shortListDate')}
                                />
                            </Grid>

                            {/* Shortlist Result */}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="shortlist-result-id"
                                    label="Shortlist Result"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('shortListResult')}
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
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        saveButtonLabel='Confirm'
                        handleCancel={onCloseApproveCandidateModal}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateApproveFormModal;
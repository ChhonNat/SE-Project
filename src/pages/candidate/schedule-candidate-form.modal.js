import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import SelectComponent from "../../components/Selector/select";
import { globalService } from "../../services/global.service";
import { API_URL } from "../../constants/api_url";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import _useHttp from "../../hooks/_http";
import { HTTP_METHODS } from "../../constants/http_method";
import Swal from "sweetalert2";
import { STATUS } from "../../constants/status";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/roles";
import AsyncAutoComplete from "../../components/AutoComplete/auto-complete";
import AsyncMultiAutoComplete from "../../components/MultiAutoComplete/auto-complete";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const shrinkOpt = { shrink: true };

const CandidateScheduleForm = (props) => {

    const user = useSelector((state) => state?.userAuthendicated);

    const { open, onCloseModal, eventType, candidate, handleEventSuccessed } = props;
    const { data, loading, message, error, sendRequest } = _useHttp();
    const [shortlistResult, setShortlistResult] = useState('');
    const [shortlistResults, setShortlistResults] = useState([]);
    const [remark, setRemark] = useState('');
    const [errors, setErrors] = useState({ shortlistResult: { isError: false, message: '' } });

    //map event when get event from home candidate
    const mapEventType = {
        "setScheduleTest": {
            title: "Are you sure?",
            subTitle: "Set schedule to test this candidate.",
            actions: {
                submitLabel: 'Confirm',
                submitStatus: STATUS.SUBMIT_STATUS.SUBMITTED_DHR,
                select: false
            }
        },
        "setScheduleInterview": {
            title: "Are you sure?",
            subTitle: "Set schedule to interview this candidate.",
            actions: {
                submitLabel: 'Confirm',
                submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
                select: false
            }
        }
    };


    useEffect(() => {

        if (open) {

            const fetctData = async () => {

                setShortlistResults([]);

                try {

                    const reqLookup = await globalService.getData(API_URL.candidate.lookup.get);
                    const { success, data } = reqLookup?.data;

                    if (success) {

                        if (data?.shortlistResults?.length && user?.roles?.length) {

                            const filterResultStatusByRole = data?.shortlistResults.filter((resultStatus) => {

                                if (user?.roles?.includes(ROLE.ROLE_TA_TEAM))
                                    return !resultStatus.includes(STATUS.SHORTLIST_RESULT.WAITING);

                                if (user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER))
                                    return !resultStatus.includes(STATUS.SHORTLIST_RESULT.WAITING) && !resultStatus.includes(STATUS.SHORTLIST_RESULT.BLACKLIST);
                            })

                            setShortlistResults(filterResultStatusByRole);
                        } else {

                            setShortlistResults([]);
                        }
                    }

                } catch (error) {
                    console.log(error);
                }

            };
            fetctData();
        } else {
            setErrors({});
        }
    }, [open])

    useEffect(() => {
        setShortlistResult(candidate?.shortlistResult);
    }, [candidate?.shortlistResult])


    //submit method 
    //There are two case, shortlist result and sumit candidate
    const handleSubmit = async (status) => {

        if (eventType && eventType === 'shortlistCandidate') {

            if (!shortlistResult) {
                return setErrors({ shortlistResult: { isError: true, message: 'Shortlist result is required!' } });
            }

            const postData = {
                shortlistResult: shortlistResult,
                remark: remark
            };
            await sendRequest(API_URL.candidate.shortlist + candidate?.id + '/shortlist', HTTP_METHODS.put, postData);
        } else {

            const postData = {
                submitStatus: status,
                remark: remark,
            };
            await sendRequest(API_URL.candidate.sumitToOFFCEO + candidate?.id + '/submit', HTTP_METHODS.put, postData);
        }

    }

    useEffect(() => {

        if (!loading) {
            onCloseModal();
            handleEventSuccessed();
            setErrors({});
            Swal.fire({
                title: error ? 'Warning' : 'Success',
                text: error ? error : message,
                icon: error ? 'warning' : 'success',
                confirmButtonText: 'OK',
            });
            console.log(data);
        }
    }, [loading, data, message, error]);


    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={open}
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
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="schedule"
                                    label="Schedule"
                                    variant="outlined"
                                    type="date"
                                    InputLabelProps={shrinkOpt}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AsyncMultiAutoComplete
                                    id="hod-committee"
                                    label="HOD"
                                    limitTags={10}
                                    value={[]}
                                    handleOnChange={(e, val) => console.log(val)}
                                    callToApi={API_URL.headDepartment.get}
                                    httpMethod={'post'}
                                    reqBody={
                                        {
                                            start: 0,
                                            length: 300,
                                            searchValue: "",
                                            orderColumn: "id",
                                            ordinal: "desc"
                                        }
                                    }
                                    bindField={'fullName'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <AsyncMultiAutoComplete
                                    id="key-person-committee"
                                    label="Key Person"
                                    limitTags={10}
                                    value={[]}
                                    handleOnChange={(e, val) => console.log(val)}
                                    callToApi={API_URL.committeee.get}
                                    httpMethod={'post'}
                                    reqBody={
                                        {
                                            start: 0,
                                            length: 300,
                                            searchValue: "",
                                            orderColumn: "id",
                                            ordinal: "desc"
                                        }
                                    }
                                    bindField={'fullName'}
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
                                    onChange={(e) => setRemark(e?.target?.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtonLabel={mapEventType[eventType]?.actions?.submitLabel}
                        handleCancel={onCloseModal}
                        handleSave={() => handleSubmit(mapEventType[eventType]?.actions?.submitStatus)}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateScheduleForm;
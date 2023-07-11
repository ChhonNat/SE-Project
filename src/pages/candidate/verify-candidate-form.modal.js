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

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateVerifyForm = (props) => {

    const { open, onCloseModal, eventType, candidate, handleEventSuccessed } = props;
    const { data, loading, message, error, sendRequest } = _useHttp();
    const [shortlistResult, setShortlistResult] = useState('');
    const [shortlistResults, setShortlistResults] = useState([]);
    const [remark, setRemark] = useState('');
    const [errors, setErrors] = useState({ shortlistResult: { isError: false, message: '' }});

    //map event when get event from home candidate
    const mapEventType = {
        "submitToOFFCEO": {
            title: "Are you sure?",
            subTitle: "You want submit to office CEO.",
            actions: {
                submitLabel: 'Submit To OFFCEO',
                submitStatus: 'Submitted_OFCCEO',
                reject: false,
                select: false
            }
        },
        "verifyByOFFCEO": {
            title: "Are you sure?",
            subTitle: "You want to verify this candidate.",
            actions: {
                submitLabel: 'Verify',
                submitStatus: 'OFCCEO_Verified',
                rejectStatus: 'OFCCEO_Rejected',
                reject: true,
                select: false
            }
        },
        "submitToTA": {
            title: "Are you sure?",
            subTitle: "You want to submit this candidate to TA.",
            actions: {
                submitLabel: 'Submit To TA',
                submitStatus: 'Sent_TA_Team',
                reject: false,
                select: false
            }
        },
        "submitToHOD": {
            title: "Are you sure?",
            subTitle: "You want to submit this candidate to HOD",
            actions: {
                submitLabel: "Submit to HOD",
                submitStatus: "Submitted_HOD",
                reject: false,
                select: false
            }
        },
        'shortlistCandidate': {
            title: "Are you sure?",
            subTitle: "You want to shortlist this candidate",
            actions: {
                submitLabel: 'Confirm',
                reject: false,
                select: true
            }
        }
    }


    useEffect(() => {

        if (open) {

            const fetctData = async () => {

                setShortlistResult('');
                setShortlistResults([]);

                try {

                    const reqLookup = await globalService.getData(API_URL.candidate.lookup.get);
                    const { success, data } = reqLookup?.data;

                    if (success) {
                        setShortlistResults(data?.shortlistResults);
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


    //submit method 
    //There are two case, shortlist result and sumit candidate
    const handleSubmit = async (status) => {

        if (eventType && eventType === 'shortlistCandidate') {

            if(!shortlistResult){
                return setErrors({ shortlistResult : { isError: true, message: 'Shortlist result is required!' }});
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
                            {
                                mapEventType[eventType]?.actions?.select &&
                                <Grid item xs={12}>
                                    <SelectComponent
                                        id="status-shortlist"
                                        label="Shortlist Result"
                                        value={shortlistResult}
                                        handleOnChange={(e) => setShortlistResult(e?.target?.value)}
                                        customDatas={shortlistResults}
                                        isRequire={true}
                                        err={errors?.shortlistResult?.message}
                                    />
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="outlined-multiline-static"
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
                        handleReject={() => handleSubmit(mapEventType[eventType]?.actions?.rejectStatus)}
                        actions={{ cancel: true, reject: mapEventType[eventType]?.actions?.reject, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateVerifyForm;
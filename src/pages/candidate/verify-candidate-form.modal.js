import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InterviewModel from "../../models/interview.model";
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
    const [remark, setRemark] = useState('');

    //map event when get event from home candidate
    const mapEventType = {
        "submitToOFFCEO": {
            title: "Are you sure?",
            subTitle: "You want submit to office CEO.",
            actions: {
                submitLabel: 'Submit To OFFCEO',
                submitStatus: 'Submitted_OFCCEO',
                reject: false
            }
        },
        "verifyByOFFCEO": {
            title: "Are you sure?",
            subTitle: "You want to verify this candidate.",
            actions: {
                submitLabel: 'Verify',
                submitStatus: 'OFCCEO_Verified',
                rejectStatus: 'OFCCEO_Rejected',
                reject: true
            }
        },
        "submitToTA": {
            title: "Are you sure?",
            subTitle: "You want to submit this candidate to TA.",
            actions: {
                submitLabel: 'Submit To TA',
                submitStatus: 'Sent_TA_Team',
                reject: false
            }
        },
        "submitToHOD": {
            title: "Are you sure?",
            subTitle: "You want to submit this candidate to HOD",
            actions: {
                submitLabel: "Submit to HOD",
                submitStatus: "Submitted_HOD",
                reject: false
            }
        }
    }

    const handleSubmit = async (status) => {

        const postData = {
            submitStatus: status,
            remark: remark,
        };

        await sendRequest(API_URL.candidate.sumitToOFFCEO + candidate?.id + '/submit', HTTP_METHODS.put, postData);
    }

    useEffect(() => {

        if (!loading) {
            onCloseModal();
            handleEventSuccessed();
            Swal.fire({
                title: error ? 'Warning' : 'Success',
                text: error ? error : message,
                icon: error ? 'warning' : 'success',
                confirmButtonText: 'OK',
            });
        }
    }, [loading, data, message, error])

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
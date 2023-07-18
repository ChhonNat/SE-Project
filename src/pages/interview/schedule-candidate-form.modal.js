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

const CandidateScheduleFormModal = (props) => {

    const { open, onCloseModal, eventType, candidate, handleEventSuccessed } = props;

    //map event when get event from home candidate
    const mapEventType = {
        "setSecondRoundInterview": {
            title: "Are you sure?",
            subTitle: "You want to set schedule for second interview.",
            actions: {
                submitLabel: 'Confirm',
                submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
                select: false
            }
        },
        "finalSecondRoundSchedule": {
            title: "Are you sure?",
            subTitle: "You want to set final schedule for second interview.",
            actions: {
                submitLabel: 'Confirm',
                submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
                select: false
            }
        },
    };

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
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtonLabel={mapEventType[eventType]?.actions?.submitLabel}
                        handleCancel={onCloseModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default CandidateScheduleFormModal;
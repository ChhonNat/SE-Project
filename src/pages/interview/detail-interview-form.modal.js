import React, { useEffect, useCallback, useState, Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FooterComponent from '../../components/Page/footer';
import TitleComponent from '../../components/Page/title';
import _useHttp from '../../hooks/_http';
import moment from 'moment';

import { Box, Grid, IconButton, Slide } from '@mui/material';
import { API_URL } from '../../constants/api_url';
import { HTTP_METHODS } from '../../constants/http_method';
import { PulseLoader } from 'react-spinners';
import { MAP_ROLE_NAME } from '../../constants/roles';
import { Close } from '@mui/icons-material';

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const InterviewFormDetailModal = (props) => {

    const mapKeyToView = {

        interviewDate: { rank: 1, label: 'Interview At', type: 'date' },
        interviewResult: { rank: 1, label: 'Interview Result' },
        invitedAt: { rank: 1, label: 'Invited At' },
        invitedBy: { rank: 1, label: 'Invited By' },
        remark: { rank: 1, label: 'Remark' },
        status: { rank: 1, label: 'Status' },
        candidate: { rank: 1, fullName: { label: 'Full Name' } },

        applicantCode: { rank: 1, label: 'Application Code' },
        firstName: { rank: 3, label: 'First Name' },
        lastName: { rank: 4, label: 'Last Name' },
        fullName: { rank: 2, label: 'Full Name' },
        gender: { rank: 5, label: 'Gender' },
        phoneNumber: { rank: 6, label: 'Phone Number' },
        email: { rank: 7, label: 'Email' },
        appliedPositionName: { rank: 8, label: 'Applied Position' },
        appliedPositionLevelName: { rank: 9, label: 'Applied Position Level' },
        departmentName: { rank: 11, label: 'Department' },
        headDepartmentName: { rank: 12, label: 'Head Department' },
        businessUnitName: { rank: 10, label: 'Business Unit' },
        receivedChannel: { rank: 12, label: 'Received Channel' },
        shortlistResult: { rank: 13, label: 'Shortlist Result' },
        createdAt: { rank: 14, label: 'Created At', type: 'date' },
        createdBy: { rank: 15, label: 'Created By' },
        updatedAt: { rank: 16, label: 'Updated At', type: 'date' },
        updatedBy: { rank: 17, label: 'Updated By' },
        status: { rank: 18, label: 'Status' },
        submitStatus: { rank: 19, label: 'Process Status' },
        submitDetails: { rank: 20, label: 'Processed Details' },
        shortlistDetails: { rank: 21, label: 'Shortlisted Details' }
    };

    const { openCandidateModal, onCloseCandidateModal, interview } = props;
    const { data, loading, message, error, sendRequest } = _useHttp();
    const [candidateDetail, setCandidateDetail] = useState({});

    const getCandidateDetail = useCallback(async () => {
        await sendRequest(API_URL.interview.detail + interview?.id, HTTP_METHODS.post);
    }, [interview?.id, sendRequest])



    useEffect(() => {

        if (openCandidateModal)
            getCandidateDetail();

    }, [getCandidateDetail, openCandidateModal]);


    //Listen after hook post data complete
    useEffect(() => {
        if (!loading && !error && data) {
            setCandidateDetail(data);
        } else {
            setCandidateDetail({});
        }
    }, [loading, data, message, error]);


    //Group object in candidate detail by role
    const groupByRole = (data) => {

        return data.reduce((obj, curObj) => {
            const { userRole } = curObj;
            if (obj[userRole]) {
                obj[userRole].push(curObj);
            } else {
                obj[userRole] = [curObj];
            }
            return obj;
        }, {})
    }

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={openCandidateModal}
                PaperProps={{sx: { minWidth: '50vw' }}}
            >
                {
                    loading ?
                        <PulseLoader />
                        :
                        <>
                            <DialogTitle>
                                <TitleComponent title="Candidate Details" />
                                {
                                    onCloseCandidateModal ? (
                                        <IconButton
                                            aria-label="close"
                                            onClick={onCloseCandidateModal}
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                color: (theme) => theme.palette.grey[500],
                                            }}
                                        >
                                            <Close />
                                        </IconButton>
                                    ) :
                                        null
                                }
                            </DialogTitle>
                            <DialogContent dividers>

                                <Box sx={{ width: '100%' }}>

                                    <Grid
                                        container
                                        rowSpacing={2}
                                        columnSpacing={{
                                            xs: 1,
                                            sm: 2,
                                            md: 3
                                        }}
                                        sx={{
                                            marginBottom: '2rem'
                                        }}
                                    >

                                        {

                                            Object.keys(candidateDetail).sort((a, b) => { return mapKeyToView[a]?.rank - mapKeyToView[b]?.rank }).
                                                map((key, index) => (
                                                    <React.Fragment key={index}>
                                                        {
                                                            mapKeyToView[key] &&
                                                            typeof candidateDetail[key] !== 'object' &&
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                md={12}
                                                                sx={{

                                                                    fontSize: 14,
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <label
                                                                    style={{
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >
                                                                    {mapKeyToView[key].label}:
                                                                </label>
                                                                <label>
                                                                    {
                                                                        mapKeyToView[key]?.type === 'date' ?
                                                                            moment(candidateDetail[key]).format('MMM DD, YYYY hh:mm:ss A')
                                                                            :
                                                                            candidateDetail[key]
                                                                    }
                                                                </label>
                                                            </Grid>
                                                        }

                                                    </React.Fragment>

                                                ))
                                        }

                                    </Grid>

                                    <Grid
                                        container
                                        rowSpacing={2}
                                        columnSpacing={{
                                            xs: 1,
                                            sm: 2,
                                            md: 3
                                        }}
                                    >

                                        {
                                            Object.keys(candidateDetail)
                                                .sort((a, b) => {
                                                    return mapKeyToView[a]?.rank - mapKeyToView[b]?.rank
                                                })

                                                .map((key, index) => (
                                                    <React.Fragment key={index}>

                                                        {
                                                            mapKeyToView[key] &&
                                                                key === 'submitDetails' &&
                                                                // candidateDetail[key].length > 0 &&
                                                                typeof candidateDetail[key] === 'object' ?
                                                                <>
                                                                    <Grid item xs={12}>
                                                                        <label
                                                                            style={{
                                                                                fontWeight: 'bold',
                                                                                fontSize: '1.25rem'
                                                                            }}
                                                                        >
                                                                            {mapKeyToView[key].label}
                                                                        </label>
                                                                        <hr></hr>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        {
                                                                            Object.keys(groupByRole(candidateDetail[key]))
                                                                                .map((keyRole, indexRole) => (
                                                                                    <Fragment key={indexRole}>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            paddingBottom={1}
                                                                                            sx={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                                                                            <label
                                                                                                style={{
                                                                                                    fontWeight: 'bold',
                                                                                                    fontSize: '1rem'
                                                                                                }}
                                                                                            >
                                                                                                {MAP_ROLE_NAME[keyRole]}
                                                                                            </label>
                                                                                        </Grid>
                                                                                        <Grid
                                                                                            container
                                                                                            spacing={{ xs: 2, md: 2 }}
                                                                                            columns={{ xs: 4, sm: 8, md: 12 }}
                                                                                            marginBottom={3}
                                                                                        >
                                                                                            {
                                                                                                groupByRole(candidateDetail[key])[keyRole]
                                                                                                    .map((submitDetail, indexSubmitDetail) => (
                                                                                                        <Fragment key={indexSubmitDetail}>
                                                                                                            <Grid
                                                                                                                item
                                                                                                                xs={6}
                                                                                                                key={index}
                                                                                                            >
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    xs={12}
                                                                                                                    sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                >
                                                                                                                    <label style={{ fontWeight: 'bold', fontSize: 13 }}>Processed Status:</label>
                                                                                                                    <label style={{ fontSize: 13 }}>{submitDetail?.submitStatus || submitDetail?.shortlistResult}</label>
                                                                                                                </Grid>

                                                                                                                {
                                                                                                                    submitDetail?.submittedAt && <>

                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            rowSpacing={2}
                                                                                                                            sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                        >
                                                                                                                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>Submitted At:</label>
                                                                                                                            <label style={{ fontSize: 13 }}>{moment(submitDetail?.submittedAt || submitDetail?.shortlistedAt).format('MMM DD, YYYY hh:mm:ss A')}</label>
                                                                                                                        </Grid>

                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                        >
                                                                                                                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>Submitted By:</label>
                                                                                                                            <label style={{ fontSize: 13 }}>{submitDetail?.username}, {submitDetail?.staffId}</label>
                                                                                                                        </Grid>
                                                                                                                    </>
                                                                                                                }
                                                                                                                {
                                                                                                                    submitDetail?.approvedAt && <>

                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                        >
                                                                                                                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>Approved At:</label>
                                                                                                                            <label style={{ fontSize: 13 }}>{moment(submitDetail?.submittedAt || submitDetail?.shortlistedAt).format('MMM DD, YYYY hh:mm:ss A')}</label>
                                                                                                                        </Grid>

                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                        >
                                                                                                                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>Approved By:</label>
                                                                                                                            <label style={{ fontSize: 13 }}>{submitDetail?.username}, {submitDetail?.staffId}</label>
                                                                                                                        </Grid>
                                                                                                                    </>
                                                                                                                }

                                                                                                                {
                                                                                                                    submitDetail?.rejectedAt && <>

                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                        >
                                                                                                                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>Rejected At:</label>
                                                                                                                            <label style={{ fontSize: 13 }}>{moment(submitDetail?.submittedAt || submitDetail?.shortlistedAt).format('MMM DD, YYYY hh:mm:ss A')}</label>
                                                                                                                        </Grid>

                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                        >
                                                                                                                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>Rejected By:</label>
                                                                                                                            <label style={{ fontSize: 13 }}>{submitDetail?.username}, {submitDetail?.staffId}</label>
                                                                                                                        </Grid>
                                                                                                                    </>
                                                                                                                }

                                                                                                                {
                                                                                                                    submitDetail?.verifiedAt && <>

                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                        >
                                                                                                                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>Verified At:</label>
                                                                                                                            <label style={{ fontSize: 13 }}>{moment(submitDetail?.submittedAt || submitDetail?.shortlistedAt).format('MMM DD, YYYY hh:mm:ss A')}</label>
                                                                                                                        </Grid>

                                                                                                                        <Grid
                                                                                                                            item
                                                                                                                            xs={12}
                                                                                                                            sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                        >
                                                                                                                            <label style={{ fontWeight: 'bold', fontSize: 13 }}>Verified By:</label>
                                                                                                                            <label style={{ fontSize: 13 }}>{submitDetail?.username}, {submitDetail?.staffId}</label>
                                                                                                                        </Grid>
                                                                                                                    </>
                                                                                                                }

                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    xs={12}
                                                                                                                    sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                >
                                                                                                                    <label style={{ fontWeight: 'bold', fontSize: 13 }}>Remark:</label>
                                                                                                                    <label style={{ fontSize: 13 }}>{submitDetail?.remark}</label>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </Fragment>
                                                                                                    )
                                                                                                    )
                                                                                            }
                                                                                        </Grid>

                                                                                    </Fragment>
                                                                                ))

                                                                        }
                                                                    </Grid>
                                                                </>
                                                                :
                                                                <>

                                                                </>
                                                        }
                                                    </React.Fragment>

                                                ))
                                        }

                                    </Grid>

                                    <Grid
                                        container
                                        rowSpacing={2}
                                        columnSpacing={{
                                            xs: 1,
                                            sm: 2,
                                            md: 3
                                        }}
                                    >

                                        {

                                            Object.keys(candidateDetail)
                                                .sort((a, b) => {
                                                    return mapKeyToView[a]?.rank - mapKeyToView[b]?.rank
                                                })

                                                .map((key, index) => (
                                                    <React.Fragment key={index}>

                                                        {
                                                            mapKeyToView[key] &&
                                                                key === 'shortlistDetails' &&
                                                                // candidateDetail[key].length > 0 &&
                                                                typeof candidateDetail[key] === 'object' ?
                                                                <>
                                                                    <Grid item xs={12}>
                                                                        <label
                                                                            style={{
                                                                                fontWeight: 'bold',
                                                                                fontSize: '1.25rem'
                                                                            }}
                                                                        >
                                                                            {mapKeyToView[key].label}
                                                                        </label>
                                                                        <hr></hr>
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        {
                                                                            Object.keys(groupByRole(candidateDetail[key]))
                                                                                .map((keyRole, indexRole) => (
                                                                                    <Fragment key={indexRole}>
                                                                                        <Grid
                                                                                            item
                                                                                            xs={12}
                                                                                            paddingBottom={1}
                                                                                            sx={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                                                                            <label
                                                                                                style={{
                                                                                                    fontWeight: 'bold',
                                                                                                    fontSize: '1rem'
                                                                                                }}
                                                                                            >
                                                                                                {MAP_ROLE_NAME[keyRole]}
                                                                                            </label>
                                                                                        </Grid>
                                                                                        <Grid
                                                                                            container
                                                                                            spacing={{ xs: 2, md: 3 }}
                                                                                            columns={{ xs: 4, sm: 8, md: 12 }}
                                                                                            paddingBottom={5}
                                                                                        >
                                                                                            {
                                                                                                groupByRole(candidateDetail[key])[keyRole]
                                                                                                    .map((submitDetail, indexSubmitDetail) => (
                                                                                                        <Fragment key={indexSubmitDetail}>
                                                                                                            <Grid
                                                                                                                item
                                                                                                                xs={6}
                                                                                                                key={index}
                                                                                                            >
                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    xs={12}
                                                                                                                    sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                >
                                                                                                                    <label style={{ fontWeight: 'bold', fontSize: 13 }}>Shortlisted Result:</label>
                                                                                                                    <label style={{ fontSize: 13 }}>{submitDetail?.shortlistResult}</label>
                                                                                                                </Grid>



                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    xs={12}
                                                                                                                    sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                >
                                                                                                                    <label style={{ fontWeight: 'bold', fontSize: 13 }}>Shortlisted At:</label>
                                                                                                                    <label style={{ fontSize: 13 }}>{moment(submitDetail?.shortlistedAt).format('MMM DD, YYYY hh:mm:ss A')}</label>
                                                                                                                </Grid>

                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    xs={12}
                                                                                                                    sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                >
                                                                                                                    <label style={{ fontWeight: 'bold', fontSize: 13 }}>Shortlisted By:</label>
                                                                                                                    <label style={{ fontSize: 13 }}>{submitDetail?.username}, {submitDetail?.staffId}</label>
                                                                                                                </Grid>


                                                                                                                <Grid
                                                                                                                    item
                                                                                                                    xs={12}
                                                                                                                    sx={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}
                                                                                                                >
                                                                                                                    <label style={{ fontWeight: 'bold', fontSize: 13 }}>Remark:</label>
                                                                                                                    <label style={{ fontSize: 13 }}>{submitDetail?.remark}</label>
                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </Fragment>
                                                                                                    )
                                                                                                    )
                                                                                            }
                                                                                        </Grid>

                                                                                    </Fragment>
                                                                                ))
                                                                        }
                                                                    </Grid>
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </React.Fragment>

                                                ))
                                        }

                                    </Grid>

                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <FooterComponent
                                    saveButtunType='submit'
                                    handleCancel={onCloseCandidateModal}
                                    saveButtonLabel={candidateDetail?.id ? 'Update' : 'Save'}
                                    cancelButtonLabel="Close"
                                    actions={{ cancel: true, }}
                                />
                            </DialogActions>
                        </>
                }

            </Dialog>
        </div>
    );
}

export default InterviewFormDetailModal;
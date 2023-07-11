import React, { useEffect, useCallback, useState, Fragment } from 'react';

import { Box, Grid, Slide } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FooterComponent from '../../components/Page/footer';
import TitleComponent from '../../components/Page/title';
import _useHttp from '../../hooks/_http';
import { API_URL } from '../../constants/api_url';
import { HTTP_METHODS } from '../../constants/http_method';
import { PulseLoader } from 'react-spinners';
import moment from 'moment';

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const mapKeyToView = {
    'applicantCode': { ranking: 1, label: 'Application Code' },
    'firstName': { ranking: 3, label: 'First Name' },
    'lastName': { ranking: 4, label: 'Last Name' },
    'fullName': { ranking: 2, label: 'Full Name' },
    'gender': { ranking: 5, label: 'Gender' },
    'phoneNumber': { ranking: 6, label: 'Phone Number' },
    'email': { ranking: 7, label: 'Email' },
    'appliedPositionName': { ranking: 8, label: 'Applied Position' },
    'appliedPositionLevelName': { ranking: 9, label: 'Applied Position Level' },
    'departmentName': { ranking: 11, label: 'Department' },
    'headDepartmentName': { ranking: 12, label: 'Head Department' },
    'businessUnitName': { ranking: 10, label: 'Business' },
    'receivedChannel': { ranking: 12, label: 'Received Channel' },
    'shortlistResult': { ranking: 13, label: 'Shortlist Result' },
    'createdAt': { ranking: 14, label: 'Created At', type: 'date' },
    'createdBy': { ranking: 15, label: 'Created By' },
    'updatedAt': { ranking: 16, label: 'Updated At', type: 'date' },
    'updatedBy': { ranking: 17, label: 'Updated By' },
    'status': { ranking: 18, label: 'Status' },
    'submitStatus': { ranking: 19, label: 'Submitted Status' },
    'submitDetails': {
        ranking: 20,
        label: 'Submit Details',
        mapSubmitDetail: {
            'username': {
                ranking: 1,
                label: 'Submitted By'
            },
            'submitStatus': {
                ranking: 3,
                label: 'Submitted Status'
            },
            'submittedAt': {
                ranking: 4,
                label: 'Submitted At',
                type: 'date'
            },
            'verifiedAt': {
                ranking: 4,
                label: 'Submitted At',
                type: 'date'
            },
            'remark': {
                ranking: 5,
                label: 'Remark'
            },
            'staffId': {
                ranking: 6,
                label: 'Staff ID'
            }
        }
    },
    'shortlistDetails': {
        ranking: 20,
        label: 'Submit Details',
        mapSubmitDetail: {
            'username': {
                ranking: 1,
                label: 'Shortlisted By'
            },
            'shortlistResult': {
                ranking: 3,
                label: 'Shortlist Result'
            },
            'shortlistedAt': {
                ranking: 4,
                label: 'Shortlisted At',
                type: 'date'
            },
            'remark': {
                ranking: 5,
                label: 'Remark'
            },
            'staffId': {
                ranking: 6,
                label: 'Staff ID'
            }
        }
    }
};

const mapRoleName = {
    'ROLE_TA': 'TA',
    'ROLE_TA_ADMIN': 'TA Admin',
    'ROLE_OFCCEO_ADMIN': 'OFCCEO',
    'ROLE_HIRING_MANAGER': 'Head of Department',
    'ROLE_SUPER_ADMIN': 'Super Admin',
    'ROLE_ADMIN': 'Admin',
};

const CandidateFormDetailModal = (props) => {

    const { openCandidateModal, onCloseCandidateModal, candidate } = props;
    const { data, loading, message, error, sendRequest } = _useHttp();
    const [candidateDetail, setCandidateDetail] = useState({});

    useEffect(() => {

        if (openCandidateModal)
            getCandidateDetail();

    }, [openCandidateModal]);

    const getCandidateDetail = useCallback(async () => {
        await sendRequest(API_URL.candidate.detail + candidate?.id, HTTP_METHODS.post);
    }, [candidate?.id])

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

        return data.reduce((acc, cur) => {

            const { userRole } = cur;

            if (acc[userRole]) {
                acc[userRole].push(cur);
            } else {
                acc[userRole] = [cur];
            }
            return acc;

        }, {})
    }

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={openCandidateModal}
            >
                {
                    loading ?
                        <PulseLoader />
                        :
                        <>
                            <DialogTitle>
                                <TitleComponent title="Candidate Detail" />
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
                                    >
                                        {
                                            Object.keys(candidateDetail)
                                                .sort((a, b) => {
                                                    return mapKeyToView[a]?.ranking - mapKeyToView[b]?.ranking
                                                }).map((key, index) => (
                                                    <React.Fragment key={index}>
                                                        {
                                                            mapKeyToView[key] && typeof candidateDetail[key] !== 'object' &&
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                sx={{
                                                                    fontFamily: 'Roboto',
                                                                    fontSize: 14,
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between'
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
                                                        {
                                                            mapKeyToView[key] && typeof candidateDetail[key] === 'object' &&
                                                            <Grid item xs={12}>
                                                                {
                                                                    candidateDetail[key]?.length ?
                                                                        Object.keys(groupByRole(candidateDetail[key]))
                                                                            .map((keyRole, indexRole) => (
                                                                                <Fragment key={indexRole}>
                                                                                    <Grid item xs={12} paddingTop={5}>
                                                                                        <label
                                                                                            style={{
                                                                                                fontWeight: 'bold',
                                                                                                fontSize: 14,
                                                                                                fontFamily: 'Roboto'
                                                                                            }}
                                                                                        >
                                                                                            {mapRoleName[keyRole]}:
                                                                                        </label>
                                                                                    </Grid>
                                                                                    <hr></hr>
                                                                                    {
                                                                                        groupByRole(candidateDetail[key]) &&
                                                                                        groupByRole(candidateDetail[key])[keyRole].length &&
                                                                                        groupByRole(candidateDetail[key])[keyRole]
                                                                                            .map((submitDetail, indexSubmitDetail) => (
                                                                                                <Fragment key={indexSubmitDetail}>
                                                                                                    <Grid
                                                                                                        container
                                                                                                        columnSpacing={{
                                                                                                            xs: 1,
                                                                                                            sm: 2,
                                                                                                            md: 3
                                                                                                        }}
                                                                                                        paddingBottom={2}
                                                                                                    >
                                                                                                        {
                                                                                                            Object.keys(submitDetail)
                                                                                                                .sort((a, b) => {
                                                                                                                })
                                                                                                                .map((keySubmitDetail, indexKeySubmitDe) =>
                                                                                                                (mapKeyToView[key].mapSubmitDetail[keySubmitDetail] &&

                                                                                                                    <Grid
                                                                                                                        key={indexKeySubmitDe}
                                                                                                                        item
                                                                                                                        xs={6}
                                                                                                                        paddingBottom={1}
                                                                                                                        sx={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Roboto' }}>
                                                                                                                        <label
                                                                                                                            style={{
                                                                                                                                fontWeight: 'bold',
                                                                                                                                fontSize: 14
                                                                                                                            }}
                                                                                                                        >
                                                                                                                            {mapKeyToView[key]?.mapSubmitDetail[keySubmitDetail]?.label}:
                                                                                                                        </label>
                                                                                                                        <label style={{ fontSize: 14 }}>
                                                                                                                            {
                                                                                                                                mapKeyToView[key]?.mapSubmitDetail[keySubmitDetail]?.type === 'date' ?
                                                                                                                                    moment(submitDetail[keySubmitDetail]).format('MMM DD, YYYY hh:mm:ss A')
                                                                                                                                    :
                                                                                                                                    submitDetail[keySubmitDetail]
                                                                                                                            }
                                                                                                                        </label>
                                                                                                                    </Grid>

                                                                                                                ))
                                                                                                        }
                                                                                                    </Grid>
                                                                                                </Fragment>
                                                                                            ))
                                                                                    }

                                                                                </Fragment>
                                                                            ))
                                                                        : <></>
                                                                }
                                                            </Grid>
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

export default CandidateFormDetailModal;
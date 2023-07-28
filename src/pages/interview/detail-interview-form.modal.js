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

        candidateName: { rank: 1, label: 'Candidate' },
        positionName: { rank: 2, label: 'Position' },
        positionLevel: { rank: 3, label: 'Position Level' },
        departmentName: { rank: 4, label: 'Department' },
        headDepartmentName: { rank: 5, label: 'Head Department' },
        businessUnitName: { rank: 6, label: 'Business Unit' },
        invitedAt: { rank: 7, label: 'Invited At', type: 'date' },
        invitedBy: { rank: 8, label: 'Invited By' },
        interviewDate: { rank: 9, label: 'Interview At', type: 'date' },
        interviewResult: { rank: 10, label: 'Interview Result' },
        interviewProcess: { rank: 11, label: 'Interview Process' },
        status: { rank: 12, label: 'Status' },
        remark: { rank: 13, label: 'Remark' },

        committees: { rank: 14, label: 'Interviewer Committee' },
        evaluationDetails: { rank: 15, label: 'Evaluated Details' }

    };

    const { openCandidateModal, onCloseCandidateModal, interview } = props;
    const { data, loading, message, error, sendRequest } = _useHttp();
    const [interviewDetail, setInterviewDetail] = useState({});

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

            data.candidateName = data?.candidate?.fullName;
            data.businessUnitName = data?.businessUnit?.nameEn;
            data.positionName = data?.appliedPosition?.nameEn;
            data.positionLevel = data?.appliedPositionLevel?.nameEn;
            data.departmentName = data?.department?.nameEn;
            data.headDepartmentName = data?.headDepartment?.fullName;

            setInterviewDetail(data);

        } else {
            setInterviewDetail({});
        }
    }, [loading, data, message, error]);

    useEffect(() => {
        console.log(interviewDetail);
    }, [interviewDetail])


    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={openCandidateModal}
                PaperProps={{ sx: { minWidth: '50vw' } }}
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
                                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                        sx={{ marginBottom: '2rem' }}
                                    >
                                        {Object.keys(interviewDetail).sort((a, b) => { return mapKeyToView[a]?.rank - mapKeyToView[b]?.rank }).
                                            map((key, index) => (
                                                <React.Fragment key={index}>
                                                    {
                                                        mapKeyToView[key] && (
                                                            typeof interviewDetail[key] !== 'object' ?
                                                                <Grid
                                                                    item
                                                                    xs={6}
                                                                    sx={{ fontSize: 14, display: 'flex', justifyContent: 'space-between' }}
                                                                >
                                                                    <label
                                                                        style={{ fontWeight: 'bold' }}
                                                                    >
                                                                        {mapKeyToView[key]?.label}:
                                                                    </label>
                                                                    <label>
                                                                        {mapKeyToView[key]?.type === 'date' ?
                                                                            moment(interviewDetail[key]).format('MMM DD, YYYY hh:mm:ss A')
                                                                            :
                                                                            interviewDetail[key]
                                                                        }
                                                                    </label>
                                                                </Grid>
                                                                :
                                                                <>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        paddingBottom={4}
                                                                    >
                                                                        <label
                                                                            style={{
                                                                                fontWeight: 'bold',
                                                                                fontSize: '1.25rem'
                                                                            }}
                                                                        >
                                                                            {mapKeyToView[key]?.label}:
                                                                        </label>
                                                                        <hr></hr>
                                                                        
                                                                        {
                                                                            key === 'committees' && interviewDetail[key] && interviewDetail[key].length &&
                                                                            interviewDetail[key].map((intDetail) => (
                                                                                <Grid
                                                                                    item
                                                                                    xs={6}
                                                                                    sx={{ fontSize: 14, display: 'flex', justifyContent: 'space-between' }}
                                                                                    paddingTop={2}
                                                                                >
                                                                                    <label
                                                                                        style={{ fontWeight: 'bold' }}
                                                                                    >
                                                                                        Interviewer By:
                                                                                    </label>
                                                                                    <label
                                                                                    >
                                                                                        {intDetail?.fullName}, {intDetail?.staffId}
                                                                                    </label>
                                                                                </Grid>
                                                                            ))
                                                                        }

                                                                        {
                                                                            key === 'evaluationDetails' && interviewDetail[key] && interviewDetail[key].length ?
                                                                            interviewDetail[key].map((intDetail) => (
                                                                                <>
                                                                                    <Grid
                                                                                        item
                                                                                        xs={6}
                                                                                        spacing={2}
                                                                                        paddingTop={4}
                                                                                        paddingBottom={1}
                                                                                        sx={{ 
                                                                                            fontSize: 14, 
                                                                                            display: 'flex', 
                                                                                            justifyContent: 'space-between' 
                                                                                        }}
                                                                                    >
                                                                                        <label
                                                                                            style={{ fontWeight: 'bold' }}
                                                                                        >
                                                                                            Evaluation Result:
                                                                                        </label>
                                                                                        <label
                                                                                        >
                                                                                            {intDetail?.interviewResult}
                                                                                        </label>
                                                                                    </Grid>
                                                                                    <Grid
                                                                                        item
                                                                                        paddingBottom={1}
                                                                                        xs={6}
                                                                                        sx={{ fontSize: 14, display: 'flex', justifyContent: 'space-between' }}
                                                                                    >
                                                                                        <label
                                                                                            style={{ fontWeight: 'bold' }}
                                                                                        >
                                                                                            Evaluation At:
                                                                                        </label>
                                                                                        <label
                                                                                        >
                                                                                            {moment(intDetail?.evaluatedAt).format('MMM DD, YYYY hh:mm:ss A')}
                                                                                        </label>
                                                                                    </Grid>
                                                                                    <Grid
                                                                                        item
                                                                                        xs={6}
                                                                                        paddingBottom={1}
                                                                                        sx={{ fontSize: 14, display: 'flex', justifyContent: 'space-between' }}
                                                                                    >
                                                                                        <label
                                                                                            style={{ fontWeight: 'bold' }}
                                                                                        >
                                                                                            Evaluation By:
                                                                                        </label>
                                                                                        <label
                                                                                        >
                                                                                            {intDetail?.username}, {intDetail?.staffId}
                                                                                        </label>
                                                                                    </Grid>
                                                                                    <Grid
                                                                                        item
                                                                                        xs={6}
                                                                                        paddingBottom={1}
                                                                                        sx={{ fontSize: 14, display: 'flex', justifyContent: 'space-between' }}
                                                                                    >
                                                                                        <label
                                                                                            style={{ fontWeight: 'bold' }}
                                                                                        >
                                                                                            Remark:
                                                                                        </label>
                                                                                        <label
                                                                                        >
                                                                                            {intDetail?.remark}
                                                                                        </label>
                                                                                    </Grid>
                                                                                </>
                                                                            ))
                                                                            :
                                                                            <></>
                                                                        }

                                                                    </Grid>

                                                                </>
                                                        )
                                                    }
                                                </React.Fragment>
                                            ))}
                                    </Grid>
                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <FooterComponent
                                    saveButtunType='submit'
                                    handleCancel={onCloseCandidateModal}
                                    saveButtonLabel={interviewDetail?.id ? 'Update' : 'Save'}
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
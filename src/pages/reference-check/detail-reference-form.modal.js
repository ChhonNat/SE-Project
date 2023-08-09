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
import { Close } from '@mui/icons-material';

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ReferenceFormDetailModal = (props) => {

    const mapKeyToView = {

        candidateName: { rank: 1, label: 'Candidate' },
        positionName: { rank: 2, label: 'Position' },
        positionLevel: { rank: 3, label: 'Position Level' },
        departmentName: { rank: 4, label: 'Department' },
        headDepartmentName: { rank: 5, label: 'Head Department' },
        businessUnitName: { rank: 6, label: 'Business Unit' },
        invitedAt: { rank: 7, label: 'Invited At', type: 'date' },
        invitedBy: { rank: 8, label: 'Invited By' },
        status: { rank: 9, label: 'Status' },
        remark: { rank: 10, label: 'Remark' },
        processedAt: { rank: 11, label: 'Proccessed At', type: 'date' },
        processedBy: { rank: 12, label: 'Proccessed By' },

        referenceCheckDetails: { rank: 13, label: 'Reference Check History' },

    };

    const { openReferenceDetailModal, onCloseReferenceDetailModal, reference } = props;
    const { data, loading, message, error, sendRequest } = _useHttp();
    const [referenceDetail, setReferenceDetail] = useState({});

    const getCandidateDetail = useCallback(async () => {
        await sendRequest(API_URL.referenceCheck.detail + reference?.id, HTTP_METHODS.post);
    }, [reference?.id, sendRequest])


    useEffect(() => {

        if (openReferenceDetailModal)
            getCandidateDetail();

    }, [getCandidateDetail, openReferenceDetailModal]);


    //Listen after hook post data complete
    useEffect(() => {
        if (!loading && !error && data) {

            data.candidateName = data?.candidate?.fullName;
            data.businessUnitName = data?.businessUnit?.nameEn;
            data.positionName = data?.position?.nameEn;
            data.positionLevel = data?.positionLevel?.nameEn;
            data.departmentName = data?.department?.nameEn;
            data.headDepartmentName = data?.headDepartment?.fullName;

            setReferenceDetail(data);

        } else {
            setReferenceDetail({});
        }
    }, [loading, data, message, error]);

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={openReferenceDetailModal}
                PaperProps={!loading ? { sx: { minWidth: '50vw' } } : {}}
                onClose={onCloseReferenceDetailModal}
            >
                {
                    loading ?
                        <PulseLoader />
                        :
                        <>
                            <DialogTitle>
                                <TitleComponent title="Reference Check Details" />
                                {
                                    onCloseReferenceDetailModal ? (
                                        <IconButton
                                            aria-label="close"
                                            onClick={onCloseReferenceDetailModal}
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
                                        {
                                            Object.keys(referenceDetail).sort((a, b) => { return mapKeyToView[a]?.rank - mapKeyToView[b]?.rank }).
                                                map((key, index) => (
                                                    <React.Fragment key={index}>
                                                        {
                                                            mapKeyToView[key] && (
                                                                typeof referenceDetail[key] !== 'object' &&
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
                                                                            moment(referenceDetail[key]).format('MMM DD, YYYY hh:mm:ss A')
                                                                            :
                                                                            referenceDetail[key]
                                                                        }
                                                                    </label>
                                                                </Grid>
                                                            )
                                                        }
                                                    </React.Fragment>
                                                ))
                                        }
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
                                                {mapKeyToView['referenceCheckDetails']?.label}
                                            </label>
                                            <hr></hr>

                                            {
                                                referenceDetail['referenceCheckDetails']
                                                    && referenceDetail['referenceCheckDetails'].length ?
                                                    referenceDetail['referenceCheckDetails'].map((intDetail, indexIntDetail) => (
                                                        <Fragment key={indexIntDetail}>
                                                            <Grid
                                                                item
                                                                xs={6}
                                                                paddingTop={2}
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
                                                                    Checked Result:
                                                                </label>
                                                                <label
                                                                >
                                                                    {intDetail?.checkResult}
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
                                                                    Given Result At:
                                                                </label>
                                                                <label
                                                                >
                                                                    {moment(intDetail?.givenResultAt).format('MMM DD, YYYY hh:mm:ss A')}
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
                                                                    Given Result By:
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
                                                        </Fragment>
                                                    ))
                                                    :
                                                    <></>
                                            }

                                        </Grid>

                                    </Grid>
                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <FooterComponent
                                    saveButtunType='submit'
                                    handleCancel={onCloseReferenceDetailModal}
                                    saveButtonLabel={referenceDetail?.id ? 'Update' : 'Save'}
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

export default ReferenceFormDetailModal;
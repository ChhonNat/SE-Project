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

const JobOfferFormDetailModal = (props) => {


    const { openModal, onCloseModal, editJobOffer } = props;
    const { data, loading, message, error, sendRequest } = _useHttp();
    const [jobOfferDetail, setJobOfferDetail] = useState({});

    const keyDisplays = [
        'candidateName',
        'positionName',
        'positionLevel',
        'departmentName',
        'headDepartmentName',
        'businessUnitName',
        'offerSalary',
        'offerDate',
        'processedAt',
        'processedBy',
        'processStatus',
        'status',
        'remark',
        'processDetails',
    ];

    const mapKeyStringToView = {
        candidateName: { rank: 1, label: 'Candidate' },
        positionName: { rank: 2, label: 'Position' },
        positionLevel: { rank: 3, label: 'Position Level' },
        departmentName: { rank: 4, label: 'Department' },
        headDepartmentName: { rank: 5, label: 'Head Department' },
        businessUnitName: { rank: 6, label: 'Business Unit' },
        offerSalary: { rank: 6, label: 'Offered Salary($)' },
        offerDate: { rank: 7, label: 'Offered At', type: 'date' },
        processedAt: { rank: 9, label: 'Processed At', type: 'date', dateFormat: 'MMM DD, YYYY hh:mm A' },
        processedBy: { rank: 9, label: 'Process By' },
        processStatus: { rank: 11, label: 'Process Status' },
        status: { rank: 12, label: 'Status' },
        remark: { rank: 13, label: 'Remark' },
    };

    const mapKeyArrayToView = {
        processDetails: { rank: 2, label: 'Processed History' }
    };


    const getJobOfferDetail = useCallback(async () => {
        await sendRequest(API_URL.jobOffer.detail + editJobOffer?.id, HTTP_METHODS.post);
    }, [editJobOffer?.id, sendRequest])



    useEffect(() => {

        if (openModal)
            getJobOfferDetail();

    }, [getJobOfferDetail, openModal]);


    //Listen after hook post data complete
    useEffect(() => {
        if (!loading && !error && data) {

            data.candidateName = data?.candidate?.fullName;
            data.businessUnitName = data?.businessUnit?.nameEn;
            data.positionName = data?.position?.nameEn;
            data.positionLevel = data?.positionLevel?.nameEn;
            data.departmentName = data?.department?.nameEn;
            data.headDepartmentName = data?.headDepartment?.fullName;

            setJobOfferDetail(data);

        } else {
            setJobOfferDetail({});
        }
    }, [loading, data, message, error]);

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={openModal}
                PaperProps={!loading ? { sx: { minWidth: '50vw' } } : {}}
                onClose={onCloseModal}
            >
                {
                    loading ?
                        <PulseLoader />
                        :
                        <>
                            <DialogTitle>
                                <TitleComponent title="Job Offer Details" />
                                {
                                    onCloseModal ? (
                                        <IconButton
                                            aria-label="close"
                                            onClick={onCloseModal}
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
                                            keyDisplays
                                                .map((key, index) => {
                                                    if (mapKeyStringToView[key] && typeof jobOfferDetail[key] !== 'object') {
                                                        return <Grid
                                                            key={index}
                                                            item
                                                            xs={6}
                                                            sx={{ fontSize: 14, display: 'flex', justifyContent: 'space-between' }}
                                                        >
                                                            <label
                                                                style={{ fontWeight: 'bold' }}
                                                            >
                                                                {mapKeyStringToView[key]?.label}:
                                                            </label>
                                                            <label>
                                                                {mapKeyStringToView[key]?.type === 'date' ?
                                                                    moment(jobOfferDetail[key]).format(mapKeyStringToView[key]?.dateFormat ? mapKeyStringToView[key]?.dateFormat : 'MMM DD, YYYY hh:mm:ss A')
                                                                    :
                                                                    jobOfferDetail[key]
                                                                }
                                                            </label>
                                                        </Grid>

                                                    }
                                                    if (mapKeyArrayToView[key] && typeof jobOfferDetail[key] == 'object') {
                                                        return <Grid
                                                            key={index}
                                                            item
                                                            xs={12}
                                                        >
                                                            <label
                                                                style={{
                                                                    fontWeight: 'bold',
                                                                    fontSize: '1.25rem'
                                                                }}
                                                            >
                                                                {mapKeyArrayToView[key]?.label}
                                                            </label>
                                                            <hr></hr>
                                                            {
                                                                key === 'processDetails' && jobOfferDetail[key] && jobOfferDetail[key].length ?
                                                                    jobOfferDetail[key].map((jOB) => (
                                                                        <>
                                                                            <Grid
                                                                                item
                                                                                xs={6}
                                                                                spacing={2}
                                                                                paddingTop={1}
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
                                                                                    Process Status:
                                                                                </label>
                                                                                <label
                                                                                >
                                                                                    {jOB?.processStatus}
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
                                                                                    Offered At:
                                                                                </label>
                                                                                <label
                                                                                >
                                                                                    {moment(jOB?.offeredAt).format('MMM DD, YYYY hh:mm A')}
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
                                                                                    Offered By:
                                                                                </label>
                                                                                <label
                                                                                >
                                                                                    {jOB?.username}, {jOB?.staffId}
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
                                                                                    {jOB?.remark}
                                                                                </label>
                                                                            </Grid>
                                                                        </>
                                                                    ))
                                                                    :
                                                                    <></>
                                                            }

                                                        </Grid>

                                                    }
                                                })
                                        }

                                    </Grid>
                                </Box>

                            </DialogContent>
                            <DialogActions>
                                <FooterComponent
                                    saveButtunType='submit'
                                    handleCancel={onCloseModal}
                                    saveButtonLabel={jobOfferDetail?.id ? 'Update' : 'Save'}
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

export default JobOfferFormDetailModal;
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
import { Close } from '@mui/icons-material';

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const HireFormDetailModal = (props) => {


    const { openModal, onCloseModal, editHire } = props;
    const { data, loading, message, error, sendRequest } = _useHttp();
    const [hireDetail, setHireDetail] = useState({});

    const keyDisplays = [
        'candidateName',
        'positionName',
        'departmentName',
        'headDepartmentName',
        'businessUnitName',
        'offerSalary',
        'hiredAt',
        'hiredBy',
        'signedOfferLetterDate',
        'signedContractDate',
        'joinedDate',
        'status',
        'remark'
    ];

    const mapKeyStringToView = {
        candidateName: { rank: 1, label: 'Candidate' },
        positionName: { rank: 2, label: 'Position' },
        departmentName: { rank: 4, label: 'Department' },
        headDepartmentName: { rank: 5, label: 'Head Department' },
        businessUnitName: { rank: 6, label: 'Business Unit' },
        offerSalary: { rank: 6, label: 'Offered Salary($)' },
        hiredAt: { rank: 7, label: 'Hired At', type: 'date' },
        hiredBy: { rank: 9, label: 'Hired By' },
        signedOfferLetterDate: { rank: 7, label: 'Signed Offer Letter Date', type: 'date' },
        signedContractDate: { rank: 7, label: 'Signed Contract Date', type: 'date' },
        joinedDate: { rank: 7, label: 'Joined Date', type: 'date' },
        status: { rank: 12, label: 'Status' },
        remark: { rank: 13, label: 'Remark' }
    };

    useEffect(() => {

        if (openModal) {

            editHire.candidateName = editHire?.candidate?.fullName;
            editHire.businessUnitName = editHire?.businessUnit?.nameEn;
            editHire.positionName = editHire?.position?.nameEn;
            editHire.departmentName = editHire?.department?.nameEn;
            editHire.headDepartmentName = editHire?.headDepartment?.fullName;
            setHireDetail(editHire);
        }
    }, [openModal, editHire]);

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={openModal}
                PaperProps={{ sx: { minWidth: '50vw' } }}
                onClose={onCloseModal}
            >
                <DialogTitle>
                    <TitleComponent title="Hire Details" />
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
                                        if (mapKeyStringToView[key] && typeof hireDetail[key] !== 'object') {
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
                                                        moment(hireDetail[key]).format(mapKeyStringToView[key]?.dateFormat ? mapKeyStringToView[key]?.dateFormat : 'MMM DD, YYYY hh:mm:ss A')
                                                        :
                                                        hireDetail[key]
                                                    }
                                                </label>
                                            </Grid>

                                        }
                                    })
                            }

                        </Grid>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtonType='submit'
                        handleCancel={onCloseModal}
                        saveButtonLabel={hireDetail?.id ? 'Update' : 'Save'}
                        cancelButtonLabel="Close"
                        actions={{ cancel: true, }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default HireFormDetailModal;
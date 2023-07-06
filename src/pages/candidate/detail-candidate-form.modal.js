import * as React from 'react';

import { Box, Grid, Slide } from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FooterComponent from '../../components/Page/footer';
import TitleComponent from '../../components/Page/title';
import { ConverterService } from '../../utils/converter';

const shrinkOpt = { shrink: true };

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateFormDetailModal = (props) => {

    const { openCandidateModal, onCloseCandidateModal, candidate } = props;

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
        'submitStatus': { ranking: 19, label: 'Submit Status' },
    };

    const ordering = Object.values(mapKeyToView).sort((a, b) => {
        return a.ranking - b.ranking;
    })

    console.log('ordering', ordering);


    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={openCandidateModal}
            >
                <DialogTitle>
                    <TitleComponent title="Detail Candidate" />
                </DialogTitle>
                <DialogContent dividers>

                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {
                                Object.keys(candidate)
                                    .sort((a, b) => { return mapKeyToView[a]?.ranking - mapKeyToView[b]?.ranking })
                                    .map((key, index) => (
                                        <React.Fragment key={index}>
                                            {
                                                mapKeyToView[key] &&
                                                <Grid item xs={6}>
                                                    <TextField
                                                        type={mapKeyToView[key]?.type === 'date' ? 'date' : 'text'}
                                                        id={key}
                                                        label={mapKeyToView[key].label}
                                                        fullWidth
                                                        size="small"
                                                        InputLabelProps={shrinkOpt}
                                                        value={mapKeyToView[key]?.type === 'date' ? ConverterService.convertUnixDateToMUI(candidate[key]) : candidate[key]}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                        variant="standard"
                                                    />
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
                        saveButtonLabel={candidate?.id ? 'Update' : 'Save'}
                        actions={{ cancel: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CandidateFormDetailModal;
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FooterComponent from '../../components/Page/footer';
import TitleComponent from '../../components/Page/title';
import { Box, Grid, Slide} from '@mui/material';
import SelectComponent from '../../components/Selector/select';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import CandidateModel from '../../models/candidate.model';

const genders = [{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }];
const shrinkOpt = { shrink: true };

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateFormModal = ({ openCandidateModal, onCloseCandidateModal, modalTitle }) => {

    const { register, handleSubmit, formState, setValue, watch } = useForm({ resolver: zodResolver(CandidateModel) });
    const watchCandidate = watch();
    const { errors } = formState;

    const onError = (error, e) => console.log('>>>', error, e);
    const onSubmit = (data, e) => {
        console.log('data', data);
    }

    register('')

    return (
        <div>
            <Dialog 
                TransitionComponent={TransitionModal}
                open={openCandidateModal} 
                component="form" 
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <DialogTitle>
                    <TitleComponent title={modalTitle} />
                </DialogTitle>
                <DialogContent dividers>
                    <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {/* Input First Name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="first-name"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.firstName}
                                    helperText={errors?.firstName?.message}
                                    {...register("firstName")}
                                />
                            </Grid>
                            {/* Input Last Name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="last-name"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.lastName}
                                    helperText={errors?.lastName?.message}
                                    {...register("lastName")}
                                />
                            </Grid>
                            {/* Select Gender */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id={'gender-id'}
                                    label={'Gender'}
                                    size={'small'}
                                    customDatas={genders}
                                    value={watchCandidate?.gender || ""}
                                    returnValueAs={'name'}
                                    handleOnChange={(e) => setValue('gender', e?.target?.value)}
                                    err={errors?.gender?.message}
                                />
                            </Grid>
                            {/* Input Phone Number */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="phone-name"
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.phoneNumber}
                                    helperText={errors?.phoneNumber?.message}
                                    {...register("phoneNumber")}
                                />
                            </Grid>
                            {/* Input Email */}
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.email}
                                    helperText={errors?.email?.message}
                                    {...register("email")}
                                />
                            </Grid>
                            {/* Select Position */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="position-id"
                                    label={'Position'}
                                    size={'small'}
                                    // customDatas={listPositions}
                                    value={watchCandidate?.positionId || ""}
                                    handleOnChange={(e) => setValue('positionId', e?.target?.value)}
                                    err={errors?.positionId?.message}
                                />
                            </Grid>
                            {/* Select Department */}
                            {/* <Grid item xs={12}>
                                <SelectComponent
                                    id="department-id"
                                    label={'Department'}
                                    size={'small'}
                                    // customDatas={listDepartments}
                                    value={watchCandidate?.departmentId || ""}
                                    handleOnChange={(e) => setValue('departmentId', e?.target?.value)}
                                    err={errors?.positionId?.message}
                                />
                            </Grid> */}
                            {/* Select Business */}
                            {/* <Grid item xs={12}>
                                <SelectComponent
                                    id="business-id"
                                    label={'Business'}
                                    size={'small'}
                                    // customDatas={listBusinesses}
                                    value={watchCandidate?.businessId || ""}
                                    handleOnChange={(e) => setValue('businessId', e?.target?.value)}
                                    err={errors?.positionId?.message}
                                />
                            </Grid> */}
                            {/* Input Location */}
                            <Grid item xs={12}>
                                <TextField
                                    id="location-id"
                                    label="Location"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register("location")}
                                />
                            </Grid>
                            {/* Select Received From Category */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="received-id"
                                    label={'Received From'}
                                    size={'small'}
                                    // customDatas={listReceivingCategories}
                                    value={watchCandidate?.receivedId || ""}
                                    handleOnChange={(e) => setValue('receivedId', e?.target?.value)}
                                    err={errors?.positionId?.message}
                                />
                            </Grid>
                            {/* Select Recruiter */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="recruiter-id"
                                    label={'Recruiter'}
                                    size={'small'}
                                    // customDatas={listRecruiters}
                                    value={watchCandidate?.recruiterId || ""}
                                    handleOnChange={(e) => setValue('recruiterId', e?.target?.value)}
                                    err={errors?.positionId?.message}
                                />
                            </Grid>
                            {/* Input Apply Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="apply-date-id"
                                    label="appliedDate"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register("appliedDate")}
                                    error={errors?.appliedDate}
                                    helperText={errors?.appliedDate?.message}
                                />
                            </Grid>
                            {/* Input Short List Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="short-list-date-id"
                                    label="shortListedDate"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register("shortListedDate")}
                                    error={errors?.shortListedDate}
                                    helperText={errors?.shortListedDate?.message}
                                />
                            </Grid>
                          
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        handleCancel={onCloseCandidateModal}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CandidateFormModal;
import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Grid, Slide } from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import FooterComponent from '../../components/Page/footer';
import TitleComponent from '../../components/Page/title';
import SelectComponent from '../../components/Selector/select';
import CandidateModel from '../../models/candidate.model';
import { globalService } from '../../services/global.service';
import { API_URL } from '../../constants/api_url';


const shrinkOpt = { shrink: true };

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateFormModal = (props) => {

    const { openCandidateModal, onCloseCandidateModal, modalTitle, candidate } = props;
    const { register, handleSubmit, formState, setValue, watch } = useForm({ resolver: zodResolver(CandidateModel) });
    const watchCandidate = watch();
    const { errors } = formState;
    const onError = (error, e) => console.log('>>>', error, e);
    const onSubmit = (data, e) => {
        console.log('data', data);
    }


    const [listGenders, setListGenders] = useState([]);
    const [listPositions, setListPositions] = useState([]);
    const [listLocations, setListLocations] = useState([]);
    const [listBusinesses, setListBusinesses] = useState([]);
    const [listDepartments, setListDepartments] = useState([]);
    const [listHeadDepartments, setListHeadDepartments] = useState([]);

    const [open, setOpen] = useState(true);

    useEffect(() => {


        if (candidate?.id) {

            for (let key in candidate) {

                if (key === 'appliedDate') {

                    const appliedDate = new Date(candidate[key]);
                    setValue(key, appliedDate.getFullYear() + '-' + appliedDate.getMonth() + '-' + appliedDate.getDate());
                } else {

                    setValue(key, candidate[key]);
                }
            }
        }

    }, [candidate?.id])

    /**
     * Fetch position datas
     */
    useEffect(() => {

        /**Fetch position data */
        fetchData(API_URL.candidate.lookup.get, setListGenders, 'gender');

        /**Fetch position data */
        fetchData(API_URL.lookup.position.get, setListPositions);
        /**Fetch location data */
        fetchData(API_URL.lookup.location.get, setListLocations);
        /**Fetch business data */
        fetchData(API_URL.lookup.business.get, setListBusinesses);
        /**fetch department data */
        fetchData(API_URL.lookup.department.get, setListDepartments);
        /**Fetch recruiter data */
        fetchData(API_URL.lookup.headDepartment.get, setListHeadDepartments);
    }, []);

    /**
     * Fetch data to listing in each selector
     */
    const fetchData = useCallback(async (url, setDatas, callFrom) => {
        try {

            const req = await globalService.getData(url);
            const { success, data } = req?.data;

            if(callFrom === 'gender'){
                success && data?.genders ? setDatas(data?.genders) : setDatas([]);
            } else {
                success ? setDatas(data) : setDatas([]);
            }

        } catch (error) {
            console.log(error)
        }
    }, []);


    const handleClick = () => {
        setOpen(!open);
    };

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
                                    customDatas={listGenders}
                                    value={watchCandidate?.gender || ""}
                                    // returnValueAs={'name'}
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

                            {/* Input Apply Date */}
                            <Grid item xs={12}>

                                <TextField
                                    format={'DD-MM-YYYY'}
                                    type="date"
                                    id="apply-date-id"
                                    label="Apply Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register("appliedDate")}
                                    error={errors?.appliedDate}
                                    helperText={errors?.appliedDate?.message}
                                />
                            </Grid>

                            {/* Select Position */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="position-id"
                                    label={'Apply Position'}
                                    size={'small'}
                                    customDatas={listPositions}
                                    value={watchCandidate?.appliedPositionId || ""}
                                    handleOnChange={(e) => setValue('appliedPositionId', e?.target?.value)}
                                    err={errors?.appliedPositionId?.message}
                                />
                            </Grid>

                            {/* Input Location */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="location-id"
                                    label={'Apply Location'}
                                    size={'small'}
                                    customDatas={listLocations}
                                    value={watchCandidate?.appliedLocationId || ""}
                                    handleOnChange={(e) => setValue('appliedLocationId', e?.target?.value)}
                                    err={errors?.appliedLocationId?.message}
                                />
                            </Grid>

                            {/*Select Business */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="business-id"
                                    label={'Business Name'}
                                    size={'small'}
                                    customDatas={listBusinesses}
                                    value={watchCandidate?.businessDivisionId || ''}
                                    handleOnChange={(e) => setValue('businessDivisionId', e?.target?.value)}
                                // err={errors?.businessDivisionId?.message}
                                />
                            </Grid>

                            {/*Select Department */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="department-id"
                                    label={'Department Name'}
                                    size={'small'}
                                    customDatas={listDepartments}
                                    value={watchCandidate?.departmentId || ''}
                                    handleOnChange={(e) => setValue('departmentId', e?.target?.value)}
                                // err={errors?.departmentId?.message}
                                />
                            </Grid>

                            {/* Select  department*/}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="department-id"
                                    label={'Head Department'}
                                    size={'small'}
                                    customDatas={listHeadDepartments}
                                    handleOnChange={(e) => setValue('headDepartmentId', e?.target?.value)}
                                    value={watchCandidate?.headDepartmentId || ""}
                                // err={errors?.positionId?.message}
                                />
                            </Grid>

                            {/*Upload file*/}
                            <Grid item xs={12}>
                                <TextField type='file' label="Upload CV" accept=".pdf" InputLabelProps={{ shrink: true }}>
                                    Upload
                                </TextField>
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
import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, FormLabel, Grid, IconButton, RadioGroup, Slide } from '@mui/material';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FooterComponent from '../../components/Page/footer';
import TitleComponent from '../../components/Page/title';
import SelectComponent from '../../components/Selector/select';
// import CandidateModel from '../../models/candidate.model';
import { globalService } from '../../services/global.service';
import { API_URL } from '../../constants/api_url';
import { CandidateService } from '../../services/candidate.service';
import { HTTP_STATUS } from '../../constants/http_status';

import Swal from 'sweetalert2';
import { DATA_STATUS } from '../../constants/data_status';
import { ConverterService } from '../../utils/converter';
import { KEY_POST } from '../../constants/key_post';
import { STATUS } from '../../constants/status';
import { CandidateModel } from '../../models/candidate.model';


const shrinkOpt = { shrink: true };

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateFormModal = (props) => {

    const { openCandidateModal, onCloseCandidateModal, modalTitle, candidate, handleEventSuccessed } = props;
    const { register, handleSubmit, formState, setValue, watch, reset } = useForm({
        resolver: zodResolver(CandidateModel.Create),
        defaultValues: candidate?.id ? {} : {
            firstName: 'test',
            lastName: 'test',
            gender: 'Male',
            phoneNumber: '099887766',
            email: 'test@gmail.com',
            appliedDate: '2023-06-16',
            shortListedDate: '2023-06-16',
            appliedPositionId: 1,
            departmentId: 1,
            headDepartmentId: 1,
            businessDivisionId: 1,
            appliedLocationId: 1,
            shortlistResult: 'Passed',
            receivedChannel: 'Telegram',
            status: 'CV_Reviewed'
        }
    });
    const watchCandidate = watch();
    const { errors } = formState;

    const [listGenders, setListGenders] = useState([]);
    const [listPositions, setListPositions] = useState([]);
    const [listLocations, setListLocations] = useState([]);
    const [listBusinesses, setListBusinesses] = useState([]);
    const [listDepartments, setListDepartments] = useState([]);
    const [listHeadDepartments, setListHeadDepartments] = useState([]);
    const [listReceivedFromChannels, setListReceivedFromChannels] = useState([]);

    console.log('Candidate',candidate);

    /**
     * Form use for edit data
     * Add existed candidate data to form
     */
    useEffect(() => {

        if (candidate?.id) {

            for (let key in candidate) {

                // setValue(key, candidate[key]);

                if (key === 'appliedDate') {

                    const appliedDate = ConverterService.convertUnixDateToMUI(candidate[key]);
                    setValue(key, appliedDate);

                } else if (key === 'shortlistDate') {

                    const shortlistDate = ConverterService.convertUnixDateToMUI(candidate[key]);
                    setValue(key, shortlistDate);

                } else if (KEY_POST.update_candidate.includes(key)) {

                    setValue(key, candidate[key]);
                }
            }

        }


    }, [candidate])

    /**
     * Fetch position datas
     */
    useEffect(() => {

        /**Fetch position data */
        fetchData(API_URL.candidate.lookup.get, null, 'multi');

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
    const fetchData = useCallback(async (url, setDatas, dataType) => {
        try {

            const req = await globalService.getData(url);
            const { success, data } = req?.data;

            if (dataType === 'multi') {
                if (success) {
                    setListGenders(data?.genders);
                    setListReceivedFromChannels(data?.receivedChannels);
                } else {
                    setListGenders([]);
                    setListReceivedFromChannels([]);
                }
            } else {
                success ? setDatas(data) : setDatas([]);
            }

        } catch (error) {
            console.log(error)
        }
    }, []);

    /**Check form error */
    const onError = (error, e) => console.log('>>>', error, e);

    /**
     * METHOD: create candidate
     * @param {*} data candidate data
     */

    const onSubmit = async (data) => {

        const submitFormData = new FormData();

        /**Transfer all candidate data to form data */
        Object.keys(data).forEach((key) => {

            if (key === 'appliedDate') {

                /**format appliedDate */
                const appliedDate = ConverterService.convertDateToAPI(data[key]);
                submitFormData.append(key, appliedDate);

            } else if (key === 'shortlistDate') {

                /**
                 * format shorListedDate
                 *  */
                const shortlistDate = ConverterService.convertDateToAPI(data[key]);
                submitFormData.append(key, shortlistDate)

            } else {
                submitFormData.append(key, data[key]);
            }
        });

        try {

            let submitCandidateForm;

            if (candidate?.id) {
                submitCandidateForm = await CandidateService.updateCandidate(submitFormData, candidate?.id, 'multipart/form-data');
            } else {

                submitCandidateForm = await CandidateService.createCandidate(submitFormData, 'multipart/form-data');
            }

            const { status, data } = submitCandidateForm;
            const { message } = data;

            if (status === HTTP_STATUS.success) {

                if (data?.status === DATA_STATUS.success)
                    handleEventSuccessed();

                /**
                 * Alert after request responses
                 */
                Swal.fire({
                    title: data?.status === DATA_STATUS.success ? 'Success' : 'Error',
                    text: message,
                    icon: data?.status === DATA_STATUS.success ? 'success' : 'error',
                    confirmButtonText: 'OK',
                    timer: 1500,
                    size: 200
                })

                handleCloseModal();

            }

        } catch (error) {
            console.log('catch error', error);
        }
    }

    /**
     * Handle close form modal
     */
    const handleCloseModal = () => {
        // reset();
        onCloseCandidateModal();
    }

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

                            {/*Upload file*/}
                            <Grid item xs={12}>
                                <TextField type='file' label="Upload CV" accept=".pdf" InputLabelProps={{ shrink: true }}>
                                    Upload
                                </TextField>
                            </Grid>
                            {/* Input CV code */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="application-code"
                                    label="Application Code"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                // error={errors?.firstName}
                                // helperText={errors?.firstName?.message}
                                // {...register("firstName")}
                                />
                            </Grid>
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
                                    type="date"
                                    id="apply-date-id"
                                    label="Applied Date"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    inputProps={{ format: 'MM/DD/YYYY' }}
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.appliedDate}
                                    helperText={errors?.appliedDate?.message}
                                    {...register("appliedDate")}
                                />
                            </Grid>

                            {/* Select Position */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="position-id"
                                    label={'Position Apply For'}
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
                                    label={'Location'}
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
                                    label={'Business Division'}
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
                                    label={'Department'}
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

                            {/* Select  CV received from*/}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="cv-received-from-id"
                                    label={'CV Received From'}
                                    size={'small'}
                                    customDatas={listReceivedFromChannels}
                                    handleOnChange={(e) => setValue('receivedChannel', e?.target?.value)}
                                    value={watchCandidate?.receivedChannel || ""}
                                />
                            </Grid>

                            {/* Input Apply Date */}
                            <Grid item xs={12}>
                                <TextField
                                    type="date"
                                    id="shortlist-date-id"
                                    label="Date Shortlist"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    inputProps={{ format: 'MM/DD/YYYY' }}
                                    InputLabelProps={shrinkOpt}
                                    error={errors?.shortlistDate}
                                    helperText={errors?.shortlistDate?.message}
                                    {...register("shortlistDate")}
                                />
                            </Grid>

                            {/* Control review candidate checkbox */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 14 }}>
                                        Review CV yet?
                                    </FormLabel>
                                    <FormGroup aria-label="position" row>
                                        <FormControlLabel
                                            value={STATUS.CANDIDATE.CV_REVIEWED}
                                            control={
                                                <Checkbox
                                                    onChange={(e) => {
                                                        setValue('status', e?.target?.checked ? STATUS.CANDIDATE.CV_REVIEWED : STATUS.CANDIDATE.PENDING)
                                                        setValue('shortlistResult', STATUS.SHORTLIST_RESULT.PENDING)
                                                    }}
                                                    checked={watchCandidate?.status === STATUS.CANDIDATE.CV_REVIEWED ? true : false}
                                                />
                                            }
                                            label=""
                                            labelPlacement="end"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            {/* Control review candidate result */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel id="row-radio-buttons-group-label" sx={{ fontSize: 14 }}>
                                        Shortlist Result
                                    </FormLabel>
                                    <RadioGroup row
                                        value={watchCandidate?.shortlistResult || candidate?.shortlistResult}
                                        onChange={(e) => {
                                            setValue('shortlistResult', e?.target?.value)
                                        }}
                                    >

                                        <FormControlLabel
                                            value={STATUS.SHORTLIST_RESULT.PENDING}
                                            control={<Radio />}
                                            label="Pending"
                                            labelPlacement="end"
                                        />

                                        <FormControlLabel
                                            value={STATUS.SHORTLIST_RESULT.FAILED}
                                            control={<Radio />}
                                            label="Failed"
                                            labelPlacement="end"
                                        />

                                        <FormControlLabel
                                            value={STATUS.SHORTLIST_RESULT.PASSED}
                                            control={<Radio />}
                                            label="Passed"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        handleCancel={handleCloseModal}
                        saveButtonLabel={candidate?.id ? 'Update' : 'Save'}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CandidateFormModal;
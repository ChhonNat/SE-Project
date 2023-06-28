import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';

import { set, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, FormLabel, Grid, IconButton, RadioGroup, Slide } from '@mui/material';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link'

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
// import { ALERT_TIMER } from '../../constants/app_config';
import LabelRequire from '../../components/Label/require';
import CandidateReviewCVModal from '../../components/CV/view-cv.modal';


const shrinkOpt = { shrink: true };

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateFormModal = (props) => {

    const { openCandidateModal, onCloseCandidateModal, modalTitle, candidate, handleEventSuccessed } = props;
    const { register, handleSubmit, formState, setValue, watch, reset, clearErrors } = useForm({
        resolver: zodResolver(CandidateModel.Create)
    });
    const watchCandidate = watch();
    const { errors } = formState;

    const [listGenders, setListGenders] = useState([]);
    const [listPositions, setListPositions] = useState([]);
    const [listLocations, setListLocations] = useState([]);
    const [listBusinesses, setListBusinesses] = useState([]);
    const [listDepartments, setListDepartments] = useState([]);
    const [listReceivedFromChannels, setListReceivedFromChannels] = useState([]);

    const [headDepartment, setHeadDepartment] = useState('');
    const [openCVModal, setOpenCVModal] = useState(false);

    /**
     * Form use for edit data
     * Add existed candidate data to form
     */
    useEffect(() => {

        if (candidate?.id) {

            for (let key in candidate) {

                if (KEY_POST.view_candidate.includes(key)) {

                    if (key === 'appliedDate') {

                        const appliedDate = ConverterService.convertUnixDateToMUI(candidate[key]);
                        setValue(key, appliedDate);

                    }
                    // else if (key === 'shortlistDate') {

                    //     const shortlistDate = ConverterService.convertUnixDateToMUI(candidate[key]);
                    //     setValue(key, shortlistDate);

                    // } 
                    else {
                        setValue(key, candidate[key]);
                    }
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

        /**Fetch location data */
        fetchData(API_URL.lookup.location.get, setListLocations);

        /**Fetch business data */
        fetchData(API_URL.lookup.business.get, setListBusinesses);

        /**fetch department data */
        if (candidate?.id && candidate?.businessDivisionId)
            fetchData(API_URL.lookup.departmentById.get + candidate?.businessDivisionId, setListDepartments);

        /**Fetch position data */
        if (candidate?.id && candidate?.departmentId)
            fetchData(API_URL.lookup.positionById.get + candidate?.departmentId, setListPositions);

    }, [openCandidateModal]);


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

                    if (!candidate?.id)
                        setValue('applicantCode', ConverterService.convertApplicationCode(data?.IncreasedAppNumber));


                } else {
                    setListGenders([]);
                    setListReceivedFromChannels([]);
                    setValue('applicantCode', null);
                }
            } else if (dataType === 'headDepartment') {

                if (success) {

                    setValue('headDepartmentId', data?.id ? data?.id : null);
                    setValue('headDepartmentName', data?.fullName ? data?.fullName : null);
                } else {
                    setValue('headDepartmentName', null);
                    setValue('headDepartmentId', null);
                }
            }
            else {
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

            if (KEY_POST.update_candidate.includes(key)) {
                if (key === 'appliedDate') {

                    /**format appliedDate */
                    const appliedDate = ConverterService.convertDateToAPI(data[key]);
                    submitFormData.append(key, appliedDate);

                }
                // else if (key === 'shortlistDate') {

                //     /**
                //      * format shorListedDate
                //      *  */
                //     const shortlistDate = ConverterService.convertDateToAPI(data[key]);
                //     submitFormData.append(key, shortlistDate)

                // } 
                else {
                    submitFormData.append(key, data[key]);
                }
            }
        });

        try {

            let submitCandidateForm;

            if (candidate?.id) {
                submitCandidateForm = await CandidateService.editCandidate(submitFormData, candidate?.id, 'multipart/form-data');
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
                    // timer: ALERT_TIMER,
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
        clearErrors();
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

                            {/* Input First Name */}
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    id="first-name"
                                    label={<LabelRequire label="First Name" />}
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
                                    label={<LabelRequire label="Last Name" />}
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
                                    isRequire={true}
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
                                    label={<LabelRequire label="Phone" />}
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
                            <Grid item xs={12} paddingBottom={2}>
                                <TextField
                                    type="email"
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register("email")}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Link sx={{cursor:'pointer'}} onClick={() => setOpenCVModal(true)}>{candidate?.cvFile}</Link>
                            </Grid>

                            {
                                candidate?.id &&
                                <Grid item xs={12}  paddingBottom={2}>
                                    {/* Control review candidate checkbox */}
                                    <FormControl component="fieldset">
                                 
                                        <FormGroup aria-label="position" row>
                                            <FormControlLabel
                                                value={STATUS.CANDIDATE.CV_REVIEWED}
                                                label="Review CV yet?"
                                                control={
                                                    <Checkbox
                                                        onChange={(e) => {
                                                            setValue('status', e?.target?.checked ? STATUS.CANDIDATE.CV_REVIEWED : STATUS.CANDIDATE.PENDING)
                                                            setValue('shortlistResult', STATUS.SHORTLIST_RESULT.PENDING)
                                                        }}
                                                        checked={watchCandidate?.status === STATUS.CANDIDATE.CV_REVIEWED ? true : false}
                                                    />
                                                }

                                                labelPlacement="end"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            }

                            {/*Upload file*/}
                            <Grid item xs={6}>
                                <TextField
                                    type='file'
                                    size='small'
                                    label={<LabelRequire label={candidate?.id ? "Update CV" : "Upload CV"} />}
                                    inputProps={{ accept: "application/pdf" }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setValue('file', e?.target?.files[0])}
                                    error={errors?.file}
                                    helperText={errors?.file?.message}
                                >
                                    Upload
                                </TextField>
                            </Grid>

                            {/* Select  CV received from*/}
                            <Grid item xs={6}>
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
                                    id="apply-date-id"
                                    label={<LabelRequire label="Applied Date" />}
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

                            {/* Input Location */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="location-id"
                                    label={'Location'}
                                    isRequire={true}
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
                                    label={<LabelRequire label='Business Division' />}
                                    size={'small'}
                                    customDatas={listBusinesses}
                                    value={watchCandidate?.businessDivisionId || ''}
                                    handleOnChange={(e) => {
                                        setValue('businessDivisionId', e?.target?.value);
                                        setValue('departmentId', null);
                                        setValue('appliedPositionId', null);
                                        setListDepartments([]);
                                        setListPositions([]);
                                        fetchData(API_URL.lookup.departmentById.get + e?.target?.value, setListDepartments);
                                    }}
                                    err={errors?.businessDivisionId?.message}
                                />
                            </Grid>

                            {/*Select Department */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="department-id"
                                    label={<LabelRequire label='Department' />}
                                    size={'small'}
                                    customDatas={listDepartments}
                                    value={watchCandidate?.departmentId || ''}
                                    handleOnChange={(e) => {
                                        setValue('departmentId', e?.target?.value);
                                        setValue('appliedPositionId', null);
                                        setListPositions([]);
                                        fetchData(API_URL.lookup.headDepartment.get + e?.target?.value, setHeadDepartment, 'headDepartment');
                                        fetchData(API_URL.lookup.positionById.get + e?.target?.value, setListPositions);
                                    }}
                                    err={errors?.departmentId?.message}
                                />
                            </Grid>

                            {/* Select  department*/}
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    type="text"
                                    id="head-department"
                                    label={<LabelRequire label="Head Department" />}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={shrinkOpt}
                                    {...register('headDepartmentName')}
                                    error={errors?.headDepartmentName}
                                    helperText={errors?.headDepartmentName?.message}
                                />

                                {/* <SelectComponent
                                    id="department-id"
                                    label={'Head Department'}
                                    size={'small'}
                                    customDatas={[headDepartment]}
                                    handleOnChange={(e) => setValue('headDepartmentId', e?.target?.value)}
                                    value={watchCandidate?.headDepartmentId || ""}
                                // err={errors?.positionId?.message}
                                /> */}
                            </Grid>

                            {/* Select Position */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="position-id"
                                    label={'Apply Position'}
                                    isRequire={true}
                                    size={'small'}
                                    customDatas={listPositions}
                                    value={watchCandidate?.appliedPositionId || ""}
                                    handleOnChange={(e) => setValue('appliedPositionId', e?.target?.value)}
                                    err={errors?.appliedPositionId?.message}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        handleCancel={handleCloseModal}
                        saveButtonLabel={candidate?.id ? 'Update' : 'Save'}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>

            <CandidateReviewCVModal 
                id={candidate?.id}
                openReviewCVModal={openCVModal}
                onCloseReviewCVModal={() => setOpenCVModal(false)}
            />
        </div>
    );
}

export default CandidateFormModal;
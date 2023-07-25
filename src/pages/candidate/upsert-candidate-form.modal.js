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
import LabelRequire from '../../components/Label/require';
import CandidateReviewCVModal from '../../components/CV/view-cv.modal';
import AsyncAutoComplete from '../../components/AutoComplete/auto-complete';


const shrinkOpt = { shrink: true };

const TransitionModal = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateFormModal = (props) => {

    const { openCandidateModal, onCloseCandidateModal, modalTitle, candidate, handleEventSuccessed } = props;
    const { register, handleSubmit, formState, setValue, watch, reset, clearErrors, setError } = useForm({
        resolver: zodResolver(candidate?.id ? CandidateModel.Create : CandidateModel?.Update)
    });
    const watchCandidate = watch();
    const { errors } = formState;

    const [listGenders, setListGenders] = useState([]);
    const [listPositions, setListPositions] = useState([]);
    const [listPositionLevels, setListPositionLevels] = useState([]);
    const [listLocations, setListLocations] = useState([]);
    const [listBusinesses, setListBusinesses] = useState([]);
    const [listDepartments, setListDepartments] = useState([]);
    const [listReceivedFromChannels, setListReceivedFromChannels] = useState([]);

    const [headDepartment, setHeadDepartment] = useState('');
    const [openCVModal, setOpenCVModal] = useState(false);

    /**
     * Fetch position datas
     */
    useEffect(() => {

        if (openCandidateModal) {
            /**Fetch position data */
            fetchData(API_URL.candidate.lookup.get, null, 'multi');

            /**Fetch location data */
            fetchData(API_URL.lookup.location.get, setListLocations);

            /**Fetch business data */
            fetchData(API_URL.lookup.businessUnit.get, setListBusinesses);

            /**Fetch position level */
            fetchData(API_URL.lookup.positionLevel.get, setListPositionLevels)

            /**fetch department data */
            if (candidate?.id && candidate?.businessUnitId)
                fetchData(API_URL.lookup.departmentById.get + candidate?.businessUnitId, setListDepartments);

            /**Fetch position data */
            if (candidate?.id && candidate?.departmentId)
                fetchData(API_URL.lookup.positionById.get + candidate?.departmentId, setListPositions);

            //Case edit candidate map candidate info to register form
            if (candidate?.id) {

                for (let key in candidate) {

                    if (KEY_POST.view_candidate.includes(key)) {

                        if (key === 'appliedDate') {

                            const appliedDate = ConverterService.convertUnixDateToMUI(candidate[key]);
                            setValue(key, appliedDate);

                        } else {
                            setValue(key, candidate[key]);
                        }
                    }
                }

            }
        }

    }, [openCandidateModal, candidate]);


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
                    // setValue('applicantCode', null);
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
    const onError = (error, e) => {

        console.log('error', error);

        if (!watchCandidate?.file) {

            if (!candidate?.id)
                setError('file', { message: 'File is required!' })

        } else {

            const { file } = watchCandidate;
            const oneByte = 1048576;
            const limitTenMB = 10 * oneByte;

            if (file?.size > limitTenMB) {
                setError('file', { message: 'File is required maximum 10MB!' })
            }
        }
    }

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
        reset();
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
                                    // InputLabelProps={shrinkOpt}
                                    error={errors?.firstName ? true : false}
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
                                    // InputLabelProps={shrinkOpt}
                                    error={errors?.lastName ? true : false}
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
                                    // InputLabelProps={shrinkOpt}
                                    error={errors?.phoneNumber ? true : false}
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
                                    // InputLabelProps={shrinkOpt}
                                    {...register("email")}
                                />
                            </Grid>

                            {/*Upload file*/}
                            <Grid item xs={6}>
                                <TextField
                                    type='file'
                                    size='small'
                                    label={<LabelRequire label={candidate?.id ? "Update CV" : "Upload CV"} />}
                                    inputProps={{ accept: "application/pdf" }}
                                    InputLabelProps={shrinkOpt}
                                    onChange={(e) => setValue('file', e?.target?.files[0])}
                                    error={errors?.file ? true : false}
                                    helperText={errors?.file?.message}
                                >
                                    Upload
                                </TextField>
                            </Grid>

                            {
                                candidate?.id && <>

                                    <Grid item xs={6}>
                                        <div style={{ paddingTop: 10, display: 'flex', justifyContent: 'end' }}>
                                            <Link sx={{ cursor: 'pointer' }} onClick={() => setOpenCVModal(true)}>{candidate?.applicantCode + '.pdf'}</Link>
                                        </div>
                                    </Grid>

                                    {/* <Grid item xs={6}>
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
                                    </Grid> */}
                                </>
                            }

                            {/* Select  CV received from*/}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="cv-received-from-id"
                                    label={'CV Received From'}
                                    size={'small'}
                                    customDatas={listReceivedFromChannels}
                                    handleOnChange={(e) => setValue('receivedChannel', e?.target?.value)}
                                    value={watchCandidate?.receivedChannel || ""}
                                    isRequire={true}
                                    err={errors?.receivedChannel?.message}
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
                                    error={errors?.appliedDate ? true : false}
                                    helperText={errors?.appliedDate?.message}
                                    {...register("appliedDate")}
                                />
                            </Grid>

                            {/* Input Location */}
                            {/* <Grid item xs={12}>
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
                                <br></br>
                            </Grid> */}

                            {/*Select Business */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="business-id"
                                    label={<LabelRequire label='Business Unit' />}
                                    size={'small'}
                                    customDatas={listBusinesses}
                                    value={watchCandidate?.businessUnitId || ''}
                                    bindField="nameEn"
                                    handleOnChange={(e) => {
                                        setValue('businessUnitId', e?.target?.value);
                                        setValue('departmentId', null);
                                        setValue('appliedPositionId', null);
                                        setListDepartments([]);
                                        setListPositions([]);
                                        fetchData(API_URL.lookup.departmentById.get + e?.target?.value, setListDepartments);
                                    }}
                                    err={errors?.businessUnitId?.message}
                                />
                            </Grid>

                            {/*Select Department */}
                            <Grid item xs={12}>

                                <AsyncAutoComplete
                                    id="department-id"
                                    label="Department"
                                    size="small"
                                    bindField={'nameEn'}
                                    handleOnChange={(e, value) => {
                                        setValue('departmentId', value?.id);
                                        setValue('appliedPositionId', null);
                                        console.log(value);
                                        fetchData(`/api/v1/head-departments/business-unit/${watchCandidate?.businessUnitId}/department/` + value?.id, setHeadDepartment, 'headDepartment');
                                        setListPositions([]);
                                        fetchData(API_URL.lookup.positionById.get + value?.id, setListPositions);
                                    }}
                                    customDatas={listDepartments}
                                    value={watchCandidate?.departmentId || null}
                                    isRequire={true}
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
                                    // InputLabelProps={shrinkOpt}
                                    {...register('headDepartmentName')}
                                    error={errors?.headDepartmentName ? true : false}
                                    helperText={errors?.headDepartmentName?.message}
                                />

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
                                    bindField="nameEn"
                                    handleOnChange={(e) => setValue('appliedPositionId', e?.target?.value)}
                                    err={errors?.appliedPositionId?.message}
                                />
                            </Grid>

                            {/* Select position level */}
                            <Grid item xs={12}>
                                <SelectComponent
                                    id="position-level-id"
                                    label={'Apply Position Level'}
                                    isRequire={true}
                                    size={'small'}
                                    customDatas={listPositionLevels}
                                    value={watchCandidate?.appliedPositionLevelId || ""}
                                    bindField="nameEn"
                                    handleOnChange={(e) => setValue('appliedPositionLevelId', e?.target?.value)}
                                    err={errors?.appliedPositionLevelId?.message}
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
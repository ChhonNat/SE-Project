import React, { forwardRef, useEffect } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import { JobOfferModel } from "../../models/job-offer.model";
import Swal from "sweetalert2";

import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Slide, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { jobOfferService } from "../../services/job-offer.service";
import LabelRequire from "../../components/Label/require";
import { ConverterService } from "../../utils/converter";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OfferJobFormModal = (props) => {

    const {
        modalType,
        open,
        onCloseModal,
        jobOffer,
        handleEventSuccessed,
    } = props;

    const mapModalType = {
        "offer": {
            modalTitle: "Job Offer",
            saveActionLabel: 'Offer',
            formModel: JobOfferModel.OfferModel,
            hideInputSalary: false,
            isOffer: true
        },
        "verify": {
            modalTitle: "Verify Job Offer",
            saveActionLabel: 'Verify',
            formModel: JobOfferModel.VerifyModel,
            hideInputSalary: true,
            isOffer: false,
            proStatus: 'DHR_Verified'
        },
        "approve": {
            modalTitle: "Approve Job Offer",
            saveActionLabel: 'Approve',
            formModel: JobOfferModel.ApproveModel,
            hideInputSalary: true,
            isOffer: false,
            proStatus: 'OFCCEO_Approved'
        },
        'hire': {
            modalTitle: 'Hire Applicant',
            saveActionLabel: 'Hire',
            formModel: JobOfferModel.HireModel,
            hideInputSalary: true,
            isOffer: false,
            isHire: true
        }
    }

    const { register, handleSubmit, formState, reset, setError, watch, clearErrors, setValue } = useForm({ resolver: zodResolver(mapModalType[modalType]?.formModel) });
    const { errors } = formState;


    useEffect(() => {

        reset();
        clearErrors();

        if (jobOffer?.id && mapModalType[modalType]?.isOffer)
            setValue('offerSalary', jobOffer?.offerSalary);

    }, [open])


    const handleOnSubmit = async (submitData) => {

        let reqSubmit;
        const { offerSalary, remark } = submitData;
        const { id, candidate } = jobOffer;

        if (!id || !candidate?.id)
            return;

        if (mapModalType[modalType]?.isHire) {

            let formSubmit = new FormData();
            const { file, signedOfferLetterDate, signedContractDate, joinedDate } = submitData;

            if (!file || !signedOfferLetterDate || !signedContractDate || !joinedDate) {

                if (!file)
                    setError('file', { message: 'Job offer form is required!' })

                if (!signedOfferLetterDate)
                    setError('signedOfferLetterDate', { message: 'Sign offer date is required!' });

                if (!signedContractDate)
                    setError('signedContractDate', { message: 'Sign contract date is required!' });

                if (!joinedDate)
                    setError('joinedDate', { message: 'Join date is required!' });

                return;

            } else {

                if (submitData?.file) {

                    const { file } = submitData;
                    const oneByte = 1048576;
                    const limitTenMB = 10 * oneByte;

                    if (file?.size > limitTenMB)
                        return setError('file', { message: 'File is required maximum 10MB!' })
                }

                formSubmit.append('file', file);
                formSubmit.append('signedOfferLetterDate', ConverterService.convertDateToAPI(submitData?.signedOfferLetterDate));
                formSubmit.append('signedContractDate', ConverterService.convertDateToAPI(submitData?.signedContractDate));
                formSubmit.append('joinedDate', ConverterService.convertDateToAPI(submitData?.joinedDate));
                formSubmit.append('remark', submitData?.remark);

                reqSubmit = await jobOfferService.hire(id, candidate?.id, formSubmit, 'multipart/form-data')

            }


        } else if (mapModalType[modalType]?.isOffer) {

            if (!offerSalary || parseFloat(offerSalary) < 0.1) {
                setError('offerSalary', { message: 'Offer salary is required!' })
                return;
            }
            reqSubmit = await jobOfferService.jobOffer(id, candidate?.id, { offerSalary: parseFloat(offerSalary), remark: remark });

        } else {

            reqSubmit = await jobOfferService.processJobOffer(id, candidate?.id, { processStatus: mapModalType[modalType]?.proStatus, remark: remark });
        }

        const { status, data } = reqSubmit;
        const { message } = data;

        if (status === HTTP_STATUS.success) {

            if (data?.status === DATA_STATUS.success)
                handleEventSuccessed();

            /**
             * Alert after request responses
             */
            Swal.fire({
                title: data?.status === DATA_STATUS.success ? 'Success' : 'Warning',
                text: message,
                icon: data?.status === DATA_STATUS.success ? 'success' : 'warning',
                confirmButtonText: 'OK',
                size: 200
            })

            reset();
            onCloseModal();

        }

    };

    const onError = (err) => {
        console.log('Input error', err);
    };

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={open}
                component="form"
                fullWidth={true}
                onSubmit={handleSubmit(handleOnSubmit, onError)}
                onClose={onCloseModal}
            >
                <DialogTitle>
                    <TitleComponent
                        title={mapModalType[modalType]?.modalTitle}
                    />
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
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            {!mapModalType[modalType]?.hideInputSalary &&
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Amount"
                                            size="small"
                                            {...register('offerSalary')}
                                            error={errors.offerSalary ? true : false}
                                        />
                                        <FormHelperText id="error-password"
                                            error={errors?.offerSalary ? true : false} >
                                            {errors?.offerSalary?.message}
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            }
                            {
                                mapModalType[modalType]?.isHire && (
                                    <>
                                        <Grid item xs={12}>
                                            <TextField
                                                type='file'
                                                size='small'
                                                label={<LabelRequire label={"Job Offer Form"} />}
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ width: '100%' }}
                                                onChange={(e) => {
                                                    setValue('file', e?.target?.files[0]);
                                                    clearErrors('file');
                                                }}
                                                error={errors?.file ? true : false}
                                                helperText={errors?.file?.message}
                                            >
                                                Upload
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                type='date'
                                                size='small'
                                                label={<LabelRequire label={"Sign Offer Date"} />}
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ width: '100%' }}
                                                error={errors?.signedOfferLetterDate ? true : false}
                                                helperText={errors?.signedOfferLetterDate?.message}
                                                {...register('signedOfferLetterDate')}
                                            /
                                            >

                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                type='date'
                                                size='small'
                                                label={<LabelRequire label={"Sign Contract Date"} />}
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ width: '100%' }}
                                                error={errors?.signedContractDate ? true : false}
                                                helperText={errors?.signedContractDate?.message}
                                                {...register('signedContractDate')}
                                            /
                                            >

                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                type='date'
                                                size='small'
                                                label={<LabelRequire label={"Join Date"} />}
                                                InputLabelProps={{ shrink: true }}
                                                sx={{ width: '100%' }}
                                                error={errors?.joinedDate ? true : false}
                                                helperText={errors?.joinedDate?.message}
                                                {...register('joinedDate')}
                                            /
                                            >
                                        </Grid>

                                    </>
                                )
                            }
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="Remark"
                                    label="Remark"
                                    multiline
                                    variant="outlined"
                                    size="small"
                                    minRows={2}
                                    maxRows={10}
                                    {...register('remark')}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtunType='submit'
                        saveButtonLabel={mapModalType[modalType]?.saveActionLabel}
                        handleCancel={onCloseModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default OfferJobFormModal;
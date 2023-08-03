import React, { forwardRef, useEffect } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import JobOfferModel from "../../models/job-offer.model";
import Swal from "sweetalert2";

import { Box, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Slide, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { jobOfferService } from "../../services/job-offer.service";

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

    const { register, handleSubmit, formState, reset, setError, watch, clearErrors, setValue } = useForm({ resolver: zodResolver(JobOfferModel) });
    const { errors } = formState;

    const mapModalType = {
        "offer": {
            modalTitle: "Job Offer",
            hideInputSalary: false,
            isOffer: true
        },
        "verify": {
            modalTitle: "Verify Job Offer",
            hideInputSalary: true,
            isOffer: false,
            proStatus: 'DHR_Verified'
        },
        "approve": {
            modalTitle: "Approve Job Offer",
            hideInputSalary: true,
            isOffer: false,
            proStatus: 'OFCCEO_Approved'
        }
    }

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


        if (mapModalType[modalType]?.isOffer) {

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
                title: data?.status === DATA_STATUS.success ? 'Success' : 'Error',
                text: message,
                icon: data?.status === DATA_STATUS.success ? 'success' : 'error',
                confirmButtonText: 'OK',
                size: 200
            })

            reset();
            onCloseModal();

        }

    };

    const onError = (data) => {
        console.log(console.log(data));
    };

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={open}
                component="form"
                fullWidth={true}
                onSubmit={handleSubmit(handleOnSubmit, onError)}
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
                                            helperText={errors?.offerSalary?.message}
                                        />
                                    </FormControl>
                                </Grid>
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
                        saveButtonLabel='Offer'
                        handleCancel={onCloseModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default OfferJobFormModal;
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import SelectComponent from "../../components/Selector/select";
import LabelRequire from "../../components/Label/require";
import _useHttp from "../../hooks/_http";
import Swal from "sweetalert2";
import { ReferenceModel } from "../../models/reference.model";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slide, TextField } from "@mui/material";
import { referenceService } from "../../services/reference.service";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { API_URL } from "../../constants/api_url";
import { HTTP_METHODS } from "../../constants/http_method";
import { STATUS } from "../../constants/status";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ReferenceResultFormModal = (props) => {

    const {
        open,
        onCloseModal,
        reference,
        handleEventSucceed,
        selectLabel,
    } = props;

    const { register, handleSubmit, setValue, formState, reset, watch, setError, clearErrors } = useForm({ resolver: zodResolver(ReferenceModel.Verify) });
    const { errors } = formState;
    const watchReference = watch();
    const { data, loading, error, message, sendRequest } = _useHttp();
    const [listInterviewResults, setListInterviewResults] = useState();

    useEffect(() => {
        clearErrors();
        reset();

        if (open) {

            const fetchData = async () => {
                await sendRequest(API_URL.lookup.referenceCheck.get, HTTP_METHODS.get);
            }

            fetchData();
        }


    }, [open])


    useEffect(() => {
        if (!loading) {
            if (data?.hasOwnProperty('checkResults')) {
                const filterResults = !data?.checkResults?.length ?
                    [] :
                    data?.checkResults?.filter((result) => result !== STATUS.REFERENCE_RESULT.WAITING);
                setListInterviewResults(filterResults);
            }
        }
    }, [data, error, loading, message]);


    const onError = (dataError) => {
        console.log('input error', dataError);
        if (!watchReference.file)
            setError('file', { message: 'File is required!' });
    };

    const onSubmit = async (dataSubmit) => {

        try {

            const formSubmit = new FormData();

            Object.keys(dataSubmit).forEach((key) => {
                formSubmit.append(key, dataSubmit[key]);
            });

            const submitRefCheck = await referenceService.evaluateResult(reference?.id, reference?.candidate?.id, formSubmit, 'multipart/form-data');

            const { status, data } = submitRefCheck;
            const { message } = data;

            if (status === HTTP_STATUS.success) {

                if (data?.status === DATA_STATUS.success)
                    handleEventSucceed();

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

                onCloseModal();
            }

        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={open}
                component="form"
                fullWidth={true}
                onSubmit={handleSubmit(onSubmit, onError)}
                onClose={onCloseModal}
            >
                <DialogTitle>
                    <TitleComponent
                        title={'Are you sure?'}
                        subTitle={'You want to verify on reference.'}
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
                            <Grid item xs={12}>
                                <TextField
                                    type='file'
                                    size='small'
                                    label={<LabelRequire label={"Reference Form"} />}
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
                                <SelectComponent
                                    id={'status-id'}
                                    label={selectLabel}
                                    size={'small'}
                                    isRequired={true}
                                    customDatas={listInterviewResults}
                                    handleOnChange={(e) => setValue('checkResult', e?.target?.value)}
                                    value={watchReference?.checkResult}
                                    err={errors?.checkResult?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="Remark"
                                    label="Remark"
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    variant="outlined"
                                    {...register('remark')}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtonType='submit'
                        saveButtonLabel='Confirm'
                        handleCancel={onCloseModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default ReferenceResultFormModal;
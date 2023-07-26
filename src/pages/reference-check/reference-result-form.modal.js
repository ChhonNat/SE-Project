import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slide, TextField } from "@mui/material";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import SelectComponent from "../../components/Selector/select";
import VerifyReferenceModel from "../../models/verify-reference.model";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { globalService } from "../../services/global.service";
import { API_URL } from "../../constants/api_url";
import { STATUS } from "../../constants/status";
import { Close } from "@mui/icons-material";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ReferenceResultFormModal = (props) => {

    const {
        open,
        onCloseModal,
        candidate,
        handleEventSuccessed,
        title,
        selectLabel,
        statuses,
        eventType
    } = props;

    const { register, handleSubmit, setValue, formState, reset, watch, clearErrors } = useForm({ resolver: zodResolver(VerifyReferenceModel) });
    const watchCandidate = watch();
    const { errors } = formState;
    const [listInterviewResults, setListInterviewResults] = useState(['Positive', 'Negative']);

    useEffect(() => {

        console.log('candidate', candidate);

        clearErrors();
        reset();
    }, [open])

    const onError = (data) => {
        console.log('input error', data);
    }

    const onSubmit = (data) => {
        console.log('data to submit', data);
    }

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={open}
                component="form"
                fullWidth={true}
                onSubmit={handleSubmit(onSubmit, onError)}
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
                                <SelectComponent
                                    id={'status-id'}
                                    label={selectLabel}
                                    size={'small'}
                                    isRequired={true}
                                    customDatas={listInterviewResults}
                                    handleOnChange={(e) => setValue('result', e?.target?.value)}
                                    value={watchCandidate?.result}
                                    err={errors?.result?.message}
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
                        saveButtunType='submit'
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
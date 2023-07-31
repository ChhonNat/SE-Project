import React, { forwardRef, useState } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import _useHttp from "../../hooks/_http";
import Swal from "sweetalert2";

import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Slide, TextField } from "@mui/material";
import { referenceService } from "../../services/reference.service";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OfferJobFormModalFormModal = (props) => {

    const {
        openOfferJobModal,
        onCloseOfferJobModal,
        reference,
        handleEventSuccessed
    } = props;

    const [remark, setRemark] = useState('');

    const handleSubmit = async () => {

        const { id, interview, candidate } = reference;

        if(!id || interview?.id || candidate?.id)
        return;

        try {

            const submitJobOffer = await referenceService.offerJob(id,interview?.id,candidate?.id, {remark: remark});

            const { status, data } = submitJobOffer;
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

                onCloseOfferJobModal();
            }

        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <div>
            <Dialog
                TransitionComponent={TransitionModal}
                open={openOfferJobModal}
                component="form"
                fullWidth={true}
            >
                <DialogTitle>
                    <TitleComponent
                        title={'Job Offer'}
                    />
                    {
                        onCloseOfferJobModal ? (
                            <IconButton
                                aria-label="close"
                                onClick={onCloseOfferJobModal}
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
                                    sx={{ width: '100%' }}
                                    id="Remark"
                                    label="Remark"
                                    multiline
                                    minRows={2}
                                    maxRows={10}
                                    variant="outlined"
                                    onChange={(e) => setRemark(e?.target?.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        saveButtonLabel='Process'
                        handleSave={handleSubmit}
                        handleCancel={onCloseOfferJobModal}
                        actions={{ cancel: true, submit: true }}
                    />
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default OfferJobFormModalFormModal;
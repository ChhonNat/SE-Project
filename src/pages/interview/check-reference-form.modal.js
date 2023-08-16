import React, { forwardRef, useState } from "react";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import { interviewService } from "../../services/interview.service";
import { HTTP_STATUS } from "../../constants/http_status";
import { DATA_STATUS } from "../../constants/data_status";
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slide, TextField } from "@mui/material";
import Swal from "sweetalert2";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ReferenceCheckModal = (props) => {

    const { openReferenceCheckModal, onCloseReferenceCheckModal,handleEventSucceed, interview } = props;
    const [remark, setRemark] = useState('');

    const handleSubmit = async () => {

        try {
            const reqRefCheck = await interviewService.referenceCheck(interview?.id,interview?.candidate?.id, { remark: remark });
            const { status, data } = reqRefCheck;
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

                onCloseReferenceCheckModal();
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <Dialog
            component="form"
            open={openReferenceCheckModal}
            TransitionComponent={TransitionModal}
            onClose={onCloseReferenceCheckModal}
            fullWidth={true}
        >
            <DialogTitle>
                <TitleComponent title="Reference Check" />
            </DialogTitle>
            <DialogContent>
                <Grid item xs={12} paddingTop={2}>
                    <TextField
                        sx={{ width: '100%', padding: 0 }}
                        id="Remark"
                        label="Remark"
                        multiline
                        minRows={2}
                        maxRows={10}
                        variant="outlined"
                        onChange={(e) => setRemark(e?.target?.value)}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <FooterComponent
                    handleCancel={onCloseReferenceCheckModal}
                    saveButtonLabel={'Process'}
                    actions={{ cancel: true, submit: true }}
                    handleSave={handleSubmit}
                />
            </DialogActions>
        </Dialog>
    )
};

export default ReferenceCheckModal;
import React, { forwardRef } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import TitleComponent from "../Page/title";
import FooterComponent from "../Page/footer";
import apiLink from "../../constants/app_cont";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CandidateReviewCVModal = (props) => {

    const { openReviewCVModal, onCloseReviewCVModal, id, modalTitle } = props;

    const downloadCV =  `${apiLink}/api/v1/candidates/download?id=${id}`

    return (
        <>
            <Dialog
                fullScreen={true}
                TransitionComponent={TransitionModal}
                open={openReviewCVModal}
                sx={{ margin: 1 }}
            >
                <DialogTitle>
                    <TitleComponent title={modalTitle} />
                </DialogTitle>

                <DialogContent dividers>

                    <embed
                        src={downloadCV}
                        style={
                            {
                                webkitWidth: '-webkit-fill-available',
                                height: '100%',
                                width: '100%'
                            }}
                    />

                </DialogContent>
                <DialogActions>
                    <FooterComponent
                        handleCancel={onCloseReviewCVModal}
                        actions={{ cancel: true, submit: false }}
                    />
                </DialogActions>
            </Dialog>
        </>
    )
};

export default CandidateReviewCVModal;
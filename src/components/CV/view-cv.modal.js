import React, { forwardRef, useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import TitleComponent from "../Page/title";
import FooterComponent from "../Page/footer";
import { CandidateService } from "../../services/candidate.service";
import { HTTP_STATUS } from "../../constants/http_status";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CandidateReviewCVModal = (props) => {

    const { openReviewCVModal, onCloseReviewCVModal, candidate, modalTitle } = props;
    // const [cvFile, setCvFile] = useState();

    // useEffect(() => {

    //     if (candidate?.id) {
    //         downloadCVFile(candidate?.id);
    //     }

    // }, [candidate]);

    // const downloadCVFile = async (canId) => {

    //     try {
    //         await CandidateService.downloadCVFile(canId)
    //             .then((result) => {
    //                 const { status, data } = result;
    //                 console.log(result);
    //             }).catch((err) => {
    //                 console.log(err);
    //             })

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };


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
                        src={`http://172.168.0.38:8585/api/v1/candidates/download?id=${candidate?.id}`}
                        style={
                            {
                                width: '-webkit-fill-available',
                                height: '100%',
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
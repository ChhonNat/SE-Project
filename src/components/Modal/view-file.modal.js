import React, { forwardRef } from "react";
import TitleComponent from "../Page/title";
import FooterComponent from "../Page/footer";
import apiLink from "../../constants/app_cont";
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide } from "@mui/material";
import { Close } from "@mui/icons-material";
import { API_URL } from "../../constants/api_url";

const TransitionModal = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ViewFileModal = (props) => {

    const { openModal, onCloseModal, id, modalTitle, downloadFileUrl  } = props;

    const url = downloadFileUrl ? `${apiLink}${downloadFileUrl}${id}` : `${apiLink}${API_URL.candidate.downloadCVFile}${id}`

    return (
        <>
            <Dialog
                fullScreen={true}
                TransitionComponent={TransitionModal}
                open={openModal}
                sx={{ margin: 1 }}
                onClose={onCloseModal}
            >
                <DialogTitle>
                    <TitleComponent title={modalTitle} />
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
                        ):
                        null
                    }
                </DialogTitle>

                <DialogContent dividers>

                    <embed
                        src={url}
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
                        handleCancel={onCloseModal}
                        actions={{ cancel: true, submit: false }}
                        cancelButtonLabel="Close"
                    />
                </DialogActions>
            </Dialog>
        </>
    )
};

export default ViewFileModal;
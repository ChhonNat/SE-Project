import React, { forwardRef, useEffect, useState } from "react";
import TitleComponent from "../Page/title";
import FooterComponent from "../Page/footer";
import apiLink from "../../constants/app_cont";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import { Block, Close } from "@mui/icons-material";
import { API_URL } from "../../constants/api_url";
import axiosAPI from "../../services/http.service";
import { HTTP_STATUS } from "../../constants/http_status";

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewFileModal = (props) => {
  const { openModal, onCloseModal, id, modalTitle, downloadFileUrl } = props;

  // const url = downloadFileUrl ? `${apiLink}${downloadFileUrl}${id}` : `${apiLink}${API_URL.candidate.downloadCVFile}${id}`;
  const url = downloadFileUrl
    ? `${downloadFileUrl}${id}`
    : `${API_URL.candidate.downloadCVFile}${id}`;
  const [displayPdf, setDisplayPdf] = useState("");

  useEffect(() => {
    getFileToDisplay();
  }, []);

  const getFileToDisplay = async () => {
    try {
      const reqFile = await axiosAPI.get(url, { responseType: "arraybuffer" });
      const { status } = reqFile;

      if (status === HTTP_STATUS.success) {
        const { data } = reqFile;
        const blob = new Blob([data], { type: "application/pdf" });
        const blobToPdf = window.URL.createObjectURL(blob) + "#view=FitW";
        setDisplayPdf(blobToPdf);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          {onCloseModal ? (
            <IconButton
              aria-label="close"
              onClick={onCloseModal}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          ) : null}
        </DialogTitle>

        <DialogContent dividers>
          <embed
            src={displayPdf}
            style={{
              webkitWidth: "-webkit-fill-available",
              height: "100%",
              width: "100%",
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
  );
};

export default ViewFileModal;

import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { API_URL } from "../../constants/api_url";
import { appConfig } from "../../constants/app_cont";
import { docEntryService } from "../../services/doc-entry.service";
import FooterComponent from "../Page/footer";
import TitleComponent from "../Page/title";

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewFileModal = (props) => {

  const { openModal, onCloseModal, id, fileName, modalTitle, downloadFileUrl } = props;

  const url = `${API_URL.docEntry.viewFile}`;

  const [lstDocEntryFiles, setLstDocEntryFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [displayPdf, setDisplayPdf] = useState("");

  useEffect(() => {
    if (id) {
      getAllFile();
    }
  }, [id]);

  const getAllFile = async () => {

    setLoading(true);

    try {

      const reqAllDocEntryFile = await docEntryService.getAllDocEntryFile(id);
      const { data } = reqAllDocEntryFile;
      const { success } = data;

      if (success) {

        setLstDocEntryFiles(data?.data || []);
        setLoading(false);
      } else {
        setLstDocEntryFiles([]);
        setLoading(false);
      }

    } catch (error) {
      setLstDocEntryFiles([]);
      setLoading(false);
      console.log(error);
    }

  };

  // useEffect(() => {
  //   if (lstDocEntryFiles?.length) {
  //     getFileToDisplay()
  //   }
  // }, [lstDocEntryFiles]);

  // const getFileToDisplay = async () => {

  //   try {

  //     const reqFile = await axiosAPI.get(`${url}${lstDocEntryFiles[0]?.fileName}`, { responseType: "arraybuffer" });
  //     const { status } = reqFile;

  //     if (status === HTTP_STATUS.success) {

  //       const { data } = reqFile;

  //       const blob = new Blob([data], { type: "application/pdf" });
  //       const blobToPdf = window.URL.createObjectURL(blob) + "#view=FitW";
  //       setDisplayPdf(blobToPdf);

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
          {
            !loading && lstDocEntryFiles?.length ?
              lstDocEntryFiles.map((ele) =>
                <embed
                  src={`${appConfig.apiLink}/api/v1/documents/view?fileName=${ele?.fileName}`}
                  style={{
                    webkitWidth: "-webkit-fill-available",
                    height: "100%",
                    width: "100%",
                  }}
                />
              )
              :
              <embed
                src={`${appConfig.apiLink}/api/v1/documents/view?fileName=${fileName}`}
                style={{
                  webkitWidth: "-webkit-fill-available",
                  height: "100%",
                  width: "100%",
                }}
              />
          }

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

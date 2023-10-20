import React, { forwardRef, useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import SelectComponent from "../../components/Selector/select";
import { globalService } from "../../services/global.service";
import { API_URL } from "../../constants/api_url";
import TitleComponent from "../../components/Page/title";
import FooterComponent from "../../components/Page/footer";
import _useHttp from "../../hooks/_http";
import { HTTP_METHODS } from "../../constants/http_method";
import Swal from "sweetalert2";
import { STATUS } from "../../constants/status";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/roles";
import { AssignmentLateRounded, Close } from "@mui/icons-material";

const TransitionModal = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateProcessForm = (props) => {
  const user = useSelector((state) => state?.userAuthendicated);

  const { open, onCloseModal, eventType, candidate, handleEventSucceed } =
    props;
  const { data, loading, message, error, sendRequest } = _useHttp();
  const [shortlistResult, setShortlistResult] = useState("");
  const [shortlistResults, setShortlistResults] = useState([]);
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState({
    shortlistResult: { isError: false, message: "" },
  });

  //map event when get event from home candidate
  const mapEventType = {
    submitToDHR: {
      title: "Are you sure?",
      subTitle: "You want submit to director of HR.",
      actions: {
        submitLabel: "Process",
        submitStatus: STATUS.SUBMIT_STATUS.SUBMITTED_DHR,
        select: false,
      },
    },
    verifyByDHR: {
      title: "Are you sure?",
      subTitle: "You want to verify this candidate.",
      actions: {
        submitLabel: "Verify",
        submitStatus: STATUS.SUBMIT_STATUS.DHR_VERIFIED,
        select: false,
      },
    },
    rejectByDHR: {
      title: "Are you sure?",
      subTitle: "You want to reject this candidate.",
      actions: {
        submitLabel: "Confirm",
        submitStatus: STATUS.SUBMIT_STATUS.DHR_REJECTED,
        select: false,
      },
    },
    approveByOFFCEO: {
      title: "Are you sure?",
      subTitle: "You want to approve this candidate.",
      actions: {
        submitLabel: "Approve",
        submitStatus: STATUS.SUBMIT_STATUS.OFCCEO_APPROVED,
        select: false,
      },
    },
    rejectByOFFCEO: {
      title: "Are you sure?",
      subTitle: "You want to reject this candidate.",
      actions: {
        submitLabel: "Confirm",
        submitStatus: STATUS.SUBMIT_STATUS.OFCCEO_REJECTED,
        select: false,
      },
    },
    submitToHOD: {
      title: "Are you sure?",
      subTitle: "You want to submit this candidate to HOD",
      actions: {
        submitLabel: "Process",
        submitStatus: STATUS.SUBMIT_STATUS.SUBMITTED_HOD,
        select: false,
      },
    },
    shortlistCandidate: {
      title: "Are you sure?",
      subTitle: "You want to shortlist this candidate",
      actions: {
        submitLabel: "Confirm",
        select: true,
      },
    },
    // "submitToTA": {
    //     title: "Are you sure?",
    //     subTitle: "You want to submit this candidate to TA.",
    //     actions: {
    //         submitLabel: 'Confirm',
    //         submitStatus: 'Sent_TA_Team',
    //         select: false
    //     }
    // },
  };

  useEffect(() => {
    if (open) {
      const fetctData = async () => {
        setShortlistResults([]);

        try {
          const reqLookup = await globalService.getData(
            API_URL.lookup.candidate.get
          );
          const { success, data } = reqLookup?.data;

          if (success) {
            if (data?.shortlistResults?.length && user?.roles?.length) {
              const filterResultStatusByRole = data?.shortlistResults.filter(
                (resultStatus) => {
                  if (user?.roles?.includes(ROLE.ROLE_TA_TEAM))
                    return !resultStatus.includes(
                      STATUS.SHORTLIST_RESULT.WAITING
                    );

                  if (user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER))
                    return (
                      !resultStatus.includes(STATUS.SHORTLIST_RESULT.WAITING) &&
                      !resultStatus.includes(STATUS.SHORTLIST_RESULT.BLACKLIST)
                    );
                }
              );

              setShortlistResults(filterResultStatusByRole);
            } else {
              setShortlistResults([]);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetctData();
    } else {
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    setShortlistResult(candidate?.shortlistResult);
  }, [candidate?.shortlistResult]);

  //submit method
  //There are two case, shortlist result and sumit candidate
  const handleSubmit = async (status) => {
    if (eventType && eventType === "shortlistCandidate") {
      if (
        !shortlistResult ||
        shortlistResult === STATUS.SHORTLIST_RESULT.WAITING
      ) {
        setErrors({
          shortlistResult: {
            isError: true,
            message: "Shortlist result is required!",
          },
        });

        return;
      } else {
        const postData = {
          shortlistResult: shortlistResult,
          remark: remark,
        };

        await sendRequest(
          API_URL.candidate.shortlist + candidate?.id + "/shortlist",
          HTTP_METHODS.put,
          postData
        );
      }
    } else {
      const postData = {
        submitStatus: status,
        remark: remark,
      };
      await sendRequest(
        API_URL.candidate.submitToOFFCEO + candidate?.id + "/submit",
        HTTP_METHODS.put,
        postData
      );
    }
  };

  useEffect(() => {
    if (!loading) {
      onCloseModal();
      handleEventSucceed();
      setErrors({});
      Swal.fire({
        title: error ? "Warning" : "Success",
        text: error ? error : message,
        icon: error ? "warning" : "success",
        confirmButtonText: "OK",
      });
    }
  }, [loading, data, message, error]);

  return (
    <div>
      <Dialog
        TransitionComponent={TransitionModal}
        open={open}
        fullWidth={true}
        onClose={onCloseModal}
      >
        <DialogTitle>
          <TitleComponent
            title={mapEventType[eventType]?.title}
            subTitle={mapEventType[eventType]?.subTitle}
          />
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
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {mapEventType[eventType]?.actions?.select && (
                <Grid item xs={12}>
                  <SelectComponent
                    id="status-shortlist"
                    label="Shortlist Result"
                    size="small"
                    value={shortlistResult}
                    handleOnChange={(e) => setShortlistResult(e?.target?.value)}
                    customDatas={shortlistResults}
                    isRequire={true}
                    err={errors?.shortlistResult?.message}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
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
            saveButtonLabel={mapEventType[eventType]?.actions?.submitLabel}
            handleCancel={onCloseModal}
            handleSave={() =>
              handleSubmit(mapEventType[eventType]?.actions?.submitStatus)
            }
            actions={{ cancel: true, submit: true }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CandidateProcessForm;
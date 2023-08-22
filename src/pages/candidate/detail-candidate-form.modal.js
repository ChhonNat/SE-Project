import React, { useEffect, useCallback, useState, Fragment } from "react";

import {
  Box,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import FooterComponent from "../../components/Page/footer";
import TitleComponent from "../../components/Page/title";
import _useHttp from "../../hooks/_http";
import moment from "moment";

import { API_URL } from "../../constants/api_url";
import { HTTP_METHODS } from "../../constants/http_method";
import { PulseLoader } from "react-spinners";
import { MAP_ROLE_NAME } from "../../constants/roles";
import { Close, ExpandLess, ExpandMore } from "@mui/icons-material";

const TransitionModal = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CandidateFormDetailModal = (props) => {
  const { openCandidateModal, onCloseCandidateModal, candidate } = props;
  const { data, loading, message, error, sendRequest } = _useHttp();
  const [candidateDetail, setCandidateDetail] = useState({});

  const stringKeyDisplays = [
    "applicantCode",
    "campusName",
    "fullName",
    "departmentName",
    "gender",
    "headDepartmentName",
    "phoneNumber",
    "status",
    "email",
    "businessUnitName",
    "appliedPositionName",
    "createdAt",
    "appliedPositionLevelName",
    "createdBy",
    "receivedChannel",
    "updatedAt",
    "shortlistResult",
  ];
  const collapseKeyDisplays = [
    "submitDetails",
    "shortlistDetails",
    "interviews",
    "referenceCheck",
    "jobOffer",
    "hireApplicant",
  ];

  const mapKeyToView = {
    applicantCode: { label: "Application Code" },
    fullName: { label: "Full Name" },
    gender: { label: "Gender" },
    phoneNumber: { label: "Phone Number" },
    email: { label: "Email" },
    appliedPositionName: { label: "Applied Position" },
    appliedPositionLevelName: { label: "Applied Position Level" },
    departmentName: { label: "Department" },
    headDepartmentName: { label: "Head Department" },
    businessUnitName: { label: "Business Unit" },
    campusName: { label: "Campus" },
    receivedChannel: { label: "Received From Channel" },
    shortlistResult: { label: "Shortlist Result" },
    createdAt: { label: "Created At", type: "date" },
    createdBy: { label: "Created By" },
    updatedAt: { label: "Updated At", type: "date" },
    status: { label: "Status" },
    submitStatus: { label: "Process Status" },
    submitDetails: { label: "CV Process Details", subLabel: "Processed History" },
    shortlistDetails: { label: "CV Shortlist Details", subLabel: "Shortlisted History" },
    interviews: { label: "Interview Details", subLabel: "Interviewed History" },
    referenceCheck: { label: "Reference Check Details", subLabel: "Processed History" },
    jobOffer: { label: "Job Offer Details", subLabel: "Job Offered History" },
    hireApplicant: { label: "Hire Applicant Details", subLabel: "Hired Applicant History" },
  };

  const mapStepInterviewLabel = {
    First_Interview: { label: "First Interview" },
    Second_Interview: { label: "Second Interview" },
  };

  const getCandidateDetail = useCallback(async () => {
    await sendRequest(
      API_URL.candidate.detail + candidate?.id,
      HTTP_METHODS.post
    );
  }, [candidate?.id, sendRequest]);

  useEffect(() => {
    if (openCandidateModal) getCandidateDetail();
  }, [getCandidateDetail, openCandidateModal]);

  //Listen after hook post data complete
  useEffect(() => {
    if (!loading && !error && data) {
      data.campusName = data?.campus?.shortName;
      setCandidateDetail(data);
    } else {
      setCandidateDetail({});
    }
  }, [loading, data, message, error]);

  //Group object in candidate detail by role
  const groupData = (data) => {
    return data.reduce((obj, curObj) => {
      const { userRole } = curObj;

      if (obj[userRole]) obj[userRole].push(curObj);
      else obj[userRole] = [curObj];

      return obj;
    }, {});
  };

  const [openCollapse, setOpenCollape] = useState(true);
  const [collapseIndex, setCollapeIndex] = useState(0);

  const handleClick = (index) => {
    setCollapeIndex(index);
    collapseIndex === index ? setOpenCollape(!openCollapse) : setOpenCollape(true);
  };

  const GridDisplayLabelValue = (props) => {
    const { index, xs, fontSize, fontWeight, label, value } = props;
    return (
      <Grid
        key={index}
        item
        xs={xs ? xs : 12}
        sx={{
          fontSize: fontSize ? fontSize : 13,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label style={{ fontWeight: fontWeight ? fontWeight : "bold" }}>
          {label}
        </label>
        <label>{value}</label>
      </Grid>
    );
  };

  return (
    <div>
      <Dialog
        TransitionComponent={TransitionModal}
        open={openCandidateModal}
        PaperProps={!loading ? { sx: { minWidth: "60vw" } } : {}}
        onClose={onCloseCandidateModal}
      >
        {loading ? (
          <PulseLoader />
        ) : (
          <>
            <DialogTitle>
              <TitleComponent title="Candidate Details" />
              {onCloseCandidateModal ? (
                <IconButton
                  aria-label="close"
                  onClick={onCloseCandidateModal}
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
              <Box>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{
                    xs: 1,
                    sm: 2,
                    md: 3,
                  }}
                  sx={{
                    marginBottom: "2rem",
                  }}
                >
                  {/* display value from string in object */}
                  {stringKeyDisplays.map((key, index) => (
                    <GridDisplayLabelValue
                      xs={6}
                      fontSize={14}
                      index={index}
                      label={mapKeyToView[key]?.label}
                      value={
                        mapKeyToView[key]?.type === "date"
                          ? moment(candidateDetail[key]).format(
                            "MMM DD, YYYY hh:mm:ss A"
                          )
                          : candidateDetail[key]
                      }
                    />
                  ))}
                  {collapseKeyDisplays.map((key, index) => {
                    return (
                      <Grid
                        key={index}
                        item
                        xs={12}
                        sx={{
                          fontSize: 14,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <List
                          sx={{
                            width: "100%",
                            bgcolor: "background.paper",
                          }}
                          component="nav"
                          aria-labelledby="nested-list-subheader"
                        >
                          <ListItemButton
                            onClick={() => handleClick(index)}
                            sx={{ borderBottom: 1 }}
                          >
                            <ListItemText
                              primary={
                                <label style={{ fontWeight: "bold" }}>
                                  {mapKeyToView[key]?.label}
                                </label>
                              }
                            />
                            {openCollapse && [index].includes(collapseIndex) ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </ListItemButton>
                          <Collapse
                            in={openCollapse && [index].includes(collapseIndex)}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              <ListItemButton sx={{ pl: 4, cursor: 'default' }} disableTouchRipple>
                                <ListItemText
                                  primary={
                                    <Grid item xs={12}>
                                      <br></br>
                                      {
                                        candidateDetail[key] &&
                                        <GridDisplayLabelValue
                                          label={mapKeyToView[key]?.subLabel}
                                          fontSize={15}
                                        />
                                      }
                                      <br></br>
                                      {candidateDetail[key]?.length ? (
                                        Object.keys(
                                          groupData(candidateDetail[key])
                                        ).map((keyRole, indexRole) => (
                                          <Fragment key={indexRole}>
                                            {
                                              MAP_ROLE_NAME[keyRole] &&
                                              <GridDisplayLabelValue
                                                xs={6}
                                                fontSize={14}
                                                label={MAP_ROLE_NAME[keyRole]}
                                              />
                                            }

                                            <Grid
                                              container
                                              spacing={{ xs: 2, md: 2 }}
                                              columns={{ xs: 4, sm: 8, md: 12 }}
                                              marginBottom={3}
                                            >
                                              {groupData(candidateDetail[key])[
                                                keyRole
                                              ].map(
                                                (detail, indexSubmitDetail) => (
                                                  <Fragment
                                                    key={indexSubmitDetail}
                                                  >
                                                    <Grid
                                                      item
                                                      xs={6}
                                                      key={index}
                                                    >
                                                      {key ===
                                                        "submitDetails" && (
                                                          <>
                                                            {
                                                              [
                                                                { label: "Processed Status :", value: detail?.submitStatus, enable: true, fontWeight: 'normal', fontWeight: 'normal' },
                                                                { label: "Submitted At :", value: moment(detail?.submittedAt).format("MMM DD, YYYY hh:mm:ss A"), enable: detail?.submittedAt, fontWeight: 'normal' },
                                                                { label: "Submitted By :", value: detail?.username + ", " + detail?.staffId, enable: detail?.submittedAt, fontWeight: 'normal' },
                                                                { label: "Approved At :", value: moment(detail?.submittedAt).format("MMM DD, YYYY hh:mm:ss A"), enable: detail?.approvedAt, fontWeight: 'normal' },
                                                                { label: "Approved By :", value: detail?.username + ", " + detail?.staffId, enable: detail?.approvedAt, fontWeight: 'normal' },
                                                                { label: "Rejected At :", value: moment(detail?.submittedAt).format("MMM DD, YYYY hh:mm:ss A"), enable: detail?.rejectedAt, fontWeight: 'normal' },
                                                                { label: "Rejected By :", value: detail?.username + ", " + detail?.staffId, enable: detail?.rejectedAt, fontWeight: 'normal' },
                                                                { label: "Verified At :", value: moment(detail?.submittedAt).format("MMM DD, YYYY hh:mm:ss A"), enable: detail?.verifiedAt, fontWeight: 'normal' },
                                                                { label: "Verified By :", value: detail?.username + ", " + detail?.staffId, enable: detail?.verifiedAt, fontWeight: 'normal' },
                                                                { label: "Remark :", value: detail?.remark, enable: true, fontWeight: 'normal' }
                                                              ].map((ele) => <>
                                                                {
                                                                  ele?.enable && <GridDisplayLabelValue
                                                                    label={ele?.label}
                                                                    value={ele?.value}
                                                                    fontWeight={ele?.fontWeight}
                                                                  />
                                                                }

                                                              </>)
                                                            }
                                                          </>
                                                        )}

                                                      {key ===
                                                        "shortlistDetails" && (
                                                          <>
                                                            {
                                                              [
                                                                { label: "Shortlisted Result :", value: detail?.shortlistResult, enable: detail?.shortlistResult, fontWeight: 'normal' },
                                                                { label: "Shortlisted At :", value: moment(detail?.shortlistedAt).format("MMM DD, YYYY hh:mm:ss A"), enable: detail?.shortlistedAt, fontWeight: 'normal' },
                                                                { label: "Submitted By :", value: detail?.username + ", " + detail?.staffId, enable: detail?.shortlistedAt, fontWeight: 'normal' },
                                                                { label: "Remark :", value: detail?.remark, enable: true, fontWeight: 'normal' }
                                                              ].map((ele) => <>
                                                                {
                                                                  ele?.enable && <GridDisplayLabelValue
                                                                    label={ele?.label}
                                                                    value={ele?.value}
                                                                    fontWeight={ele?.fontWeight}
                                                                  />
                                                                }

                                                              </>)
                                                            }
                                                          </>
                                                        )}

                                                      {key === "interviews" && (
                                                        <Grid item xs={12}>
                                                          {Object.keys(
                                                            groupData(
                                                              candidateDetail[
                                                              key
                                                              ]
                                                            )
                                                          ).map(
                                                            (
                                                              keyRole,
                                                              indexRole
                                                            ) => (
                                                              <Fragment
                                                                key={indexRole}
                                                              >
                                                                <Grid
                                                                  container
                                                                  spacing={{
                                                                    xs: 2,
                                                                    md: 3,
                                                                  }}
                                                                  columns={{
                                                                    xs: 4,
                                                                    sm: 8,
                                                                    md: 12,
                                                                  }}
                                                                  paddingBottom={
                                                                    5
                                                                  }
                                                                >
                                                                  {groupData(
                                                                    candidateDetail[
                                                                    key
                                                                    ]
                                                                  )[
                                                                    keyRole
                                                                  ].map(
                                                                    (
                                                                      interviewDetail,
                                                                      indexSubmitDetail
                                                                    ) => (
                                                                      <Fragment
                                                                        key={
                                                                          indexSubmitDetail
                                                                        }
                                                                      >
                                                                        <Grid
                                                                          item
                                                                          key={index}
                                                                        >
                                                                          {[
                                                                            { label: mapStepInterviewLabel[interviewDetail?.interviewProcess].label, enable: true, isBreakLine: true, fontSize: 14 },
                                                                            { label: "Interviewed Result :", value: interviewDetail?.interviewResult, enable: true, fontWeight: 'normal' },
                                                                            { label: "Interviewed At :", value: moment(interviewDetail?.interviewDate).format("MMM DD, YYYY hh:mm A"), enable: true, fontWeight: 'normal' },
                                                                            { label: "Invited At :", value: moment(interviewDetail?.invitedAt).format("MMM DD, YYYY hh:mm:ss A"), enable: true, fontWeight: 'normal' },
                                                                            { label: "Invited By :", value: interviewDetail?.username + ", " + interviewDetail?.staffId, enable: true, fontWeight: 'normal' },
                                                                            { label: "Committees :", value: interviewDetail?.committees?.map((com, index) => (<span>{com?.fullName}{index + 1 === interviewDetail?.committees?.length ? "" : ",  "}</span>)), enable: true, fontWeight: 'normal' },
                                                                            { label: "Departments :", value: interviewDetail?.departments?.map((dep, index) => (<span>{dep?.nameEn}{index + 1 === interviewDetail?.departments?.length ? "" : ",  "}</span>)), enable: true, fontWeight: 'normal' },
                                                                            { label: "Remark :", value: interviewDetail?.remark, enable: true, fontWeight: 'normal', isBreakLine: true },
                                                                            { label: "Evaluated History", enable: true, fontSize: 12 },
                                                                          ].map((ele) => <>
                                                                            {
                                                                              ele?.enable && <GridDisplayLabelValue
                                                                                label={ele?.label}
                                                                                value={ele?.value}
                                                                                fontSize={ele?.fontSize}
                                                                                fontWeight={ele?.fontWeight}
                                                                              />
                                                                            }
                                                                            {
                                                                              ele?.isBreakLine && <br></br>
                                                                            }
                                                                          </>)
                                                                          }
                                                                          {
                                                                            interviewDetail?.evaluationDetails?.length ?
                                                                              interviewDetail?.evaluationDetails?.map(
                                                                                (
                                                                                  evaluate,
                                                                                  index
                                                                                ) => (
                                                                                  <>
                                                                                    <Grid
                                                                                      container
                                                                                      columns={{
                                                                                        xs: 4,
                                                                                        sm: 8,
                                                                                        md: 12,
                                                                                      }}
                                                                                      marginTop={
                                                                                        1
                                                                                      }
                                                                                    >
                                                                                      {
                                                                                        [
                                                                                          { label: " - Evaluated Result :", value: evaluate?.interviewResult, fontWeight: 'normal', fontSize: 12 },
                                                                                          { label: " - Evaluated At :", value: moment(evaluate?.evaluatedAt).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal', fontSize: 12 },
                                                                                          { label: " - Evaluated By :", value: evaluate?.username + ",  " + evaluate?.staffId, fontWeight: 'normal', fontSize: 12 },
                                                                                          { label: " - Remark :", value: evaluate?.remark, fontWeight: 'normal' }
                                                                                        ].map((evalEle) => (
                                                                                          <>
                                                                                            <GridDisplayLabelValue
                                                                                              fontSize={evalEle?.fontSize}
                                                                                              fontWeight={evalEle?.fontWeight}
                                                                                              label={evalEle?.label}
                                                                                              value={evalEle?.value}
                                                                                            />
                                                                                          </>
                                                                                        ))
                                                                                      }
                                                                                    </Grid>
                                                                                  </>
                                                                                )
                                                                              ) : <></>
                                                                          }
                                                                        </Grid>
                                                                      </Fragment>
                                                                    )
                                                                  )}
                                                                </Grid>
                                                              </Fragment>
                                                            )
                                                          )}
                                                        </Grid>
                                                      )}
                                                    </Grid>
                                                  </Fragment>
                                                )
                                              )}
                                            </Grid>
                                          </Fragment>
                                        ))
                                      ) : (
                                        <>

                                          {key === "referenceCheck" && candidateDetail[key] &&
                                            <>
                                              {
                                                [
                                                  { label: "Result :", value: candidateDetail[key]?.checkResult, fontWeight: 'normal' },
                                                  { label: "Processed At :", value: moment(candidateDetail[key]?.processedAt).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal' },
                                                  { label: "Processed By:", value: candidateDetail[key]?.processedBy + ", " + candidateDetail[key]?.staffId, fontWeight: 'normal' },
                                                  { label: "Remark:", value: candidateDetail[key]?.remark, isBreakLine: true, fontWeight: 'normal' },
                                                  { label: "Reference Checked History", isBreakLine: true }
                                                ].map((ele) => (
                                                  <Grid
                                                    container
                                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                                  >
                                                    <Grid item xs={6} key={index}>
                                                      <Grid item xs={12}>
                                                        <GridDisplayLabelValue fontWeight={ele?.fontWeight} label={ele?.label} value={ele?.value} />
                                                      </Grid>
                                                      {
                                                        ele?.isBreakLine && <br></br>
                                                      }
                                                    </Grid>
                                                  </Grid>
                                                ))
                                              }
                                              {
                                                candidateDetail[key]?.referenceCheckDetails?.length ?
                                                  candidateDetail[key]?.referenceCheckDetails?.map(
                                                    (
                                                      reference,
                                                      index
                                                    ) => (
                                                      <Grid item xs={6} key={index}>
                                                        <Grid item xs={12}>
                                                          {
                                                            [
                                                              { label: " - Checked Result :", value: reference?.checkResult, fontWeight: 'normal', fontSize: 12 },
                                                              { label: " - Given Result At :", value: moment(reference?.givenResultAt).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal', fontSize: 12 },
                                                              { label: " - Given Result By :", value: reference?.username + ",  " + reference?.staffId, fontWeight: 'normal', fontSize: 12 },
                                                              { label: " - Remark :", value: reference?.remark, fontWeight: 'normal', fontSize: 12 }
                                                            ].map((evalEle) => (
                                                              <>
                                                                <GridDisplayLabelValue
                                                                  fontWeight={evalEle?.fontWeight}
                                                                  label={evalEle?.label}
                                                                  value={evalEle?.value}
                                                                />
                                                              </>
                                                            ))
                                                          }
                                                        </Grid>
                                                      </Grid>
                                                    )
                                                  ) : <></>
                                              }
                                            </>
                                          }

                                          {key === "jobOffer" && candidateDetail[key] &&
                                            <>
                                              {
                                                [
                                                  { label: "Status :", value: candidateDetail[key]?.status, fontWeight: 'normal' },
                                                  { label: "Processed At :", value: moment(candidateDetail[key]?.processedAt).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal' },
                                                  { label: "Processed By :", value: candidateDetail[key]?.processedBy + ", " + candidateDetail[key]?.staffId, fontWeight: 'normal' },
                                                  { label: "Offer At :", value: moment(candidateDetail[key]?.offerDate).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal' },
                                                  { label: "Offer Campus :", value: candidateDetail[key]?.offerCampus?.shortName, fontWeight: 'normal' },
                                                  { label: "Offer Position :", value: candidateDetail[key]?.offerPosition?.nameEn, fontWeight: 'normal' },
                                                  { label: "Offer Position Level :", value: candidateDetail[key]?.offerPositionLevel?.nameEn, fontWeight: 'normal' },
                                                  { label: "Remark :", value: candidateDetail[key]?.remark, fontWeight: 'normal', isBreakLine: true },
                                                  { label: "Processed History", isBreakLine: true }
                                                ].map((ele) => (
                                                  <Grid
                                                    container
                                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                                  >
                                                    <Grid item xs={6} key={index}>
                                                      <Grid item xs={12}>
                                                        <GridDisplayLabelValue
                                                          fontSize={ele?.fontSize}
                                                          fontWeight={ele?.fontWeight}
                                                          label={ele?.label}
                                                          value={ele?.value} />
                                                        {
                                                          ele?.isBreakLine && <br></br>
                                                        }
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                ))
                                              }
                                              {
                                                candidateDetail[key]?.processDetails?.length ?
                                                  candidateDetail[key]?.processDetails?.map(
                                                    (
                                                      jobOffered,
                                                      index
                                                    ) => (

                                                      <Grid item xs={6} key={index}>
                                                        <Grid item xs={12}>
                                                          {
                                                            [
                                                              { label: " - Processed Status :", value: jobOffered?.processStatus, fontWeight: 'normal', fontSize: 12 },
                                                              { label: " - Processed At :", value: moment(jobOffered?.processedAt).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal', fontSize: 12 },
                                                              { label: " - Processed By :", value: jobOffered?.username + ",  " + jobOffered?.staffId, fontWeight: 'normal', fontSize: 12 },
                                                              { label: " - Remark :", value: jobOffered?.remark, fontWeight: 'normal', fontSize: 12, isBreakLine: true }
                                                            ].map((jobOfferedEle) => (
                                                              <>
                                                                <GridDisplayLabelValue
                                                                  fontWeight={jobOfferedEle?.fontWeight}
                                                                  label={jobOfferedEle?.label}
                                                                  value={jobOfferedEle?.value}
                                                                />
                                                                {
                                                                  jobOfferedEle?.isBreakLine && <br></br>
                                                                }
                                                              </>
                                                            ))
                                                          }
                                                        </Grid>
                                                      </Grid>
                                                    )
                                                  ) : <></>
                                              }
                                            </>
                                          }

                                          {key === "hireApplicant" && candidateDetail[key] &&
                                            <>
                                              {
                                                [
                                                  { label: "Status :", value: candidateDetail[key]?.status, fontWeight: 'normal' },
                                                  { label: "Hired At :", value: moment(candidateDetail[key]?.hiredAt).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal' },
                                                  { label: "Hired By :", value: candidateDetail[key]?.hiredAt + ", " + candidateDetail[key]?.staffId, fontWeight: 'normal' },
                                                  { label: "Signed Offer Letter At :", value: moment(candidateDetail[key]?.signedOfferLetterDate).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal' },
                                                  { label: "Signed Contract At :", value: moment(candidateDetail[key]?.signedContractDate).format("MMM DD, YYYY hh:mm A"), fontWeight: 'normal' },
                                                  { label: "Remark :", value: candidateDetail[key]?.remark, fontWeight: 'normal' },
                                                ].map((ele) => (
                                                  <Grid
                                                    container
                                                    columns={{ xs: 4, sm: 8, md: 12 }}
                                                  >
                                                    <Grid item xs={6} key={index}>
                                                      <Grid item xs={12}>
                                                        <GridDisplayLabelValue
                                                          fontSize={ele?.fontSize}
                                                          fontWeight={ele?.fontWeight}
                                                          label={ele?.label}
                                                          value={ele?.value} />
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>
                                                ))
                                              }
                                            </>
                                          }

                                        </>
                                      )}
                                    </Grid>
                                  }
                                />
                              </ListItemButton>
                            </List>
                          </Collapse>
                        </List>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <FooterComponent
                saveButtonType="submit"
                handleCancel={onCloseCandidateModal}
                saveButtonLabel={candidateDetail?.id ? "Update" : "Save"}
                cancelButtonLabel="Close"
                actions={{ cancel: true }}
              />
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default CandidateFormDetailModal;

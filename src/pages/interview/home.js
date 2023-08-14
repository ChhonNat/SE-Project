import React, { useState } from "react";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";
import InterViewEvaluateFormModal from "./interview-evaluate-form.modal";
import CandidateScheduleFormModal from "../../components/Modal/schedule-candidate-form.modal";
import InterviewFormDetailModal from "./detail-interview-form.modal";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { CalendarMonth } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/roles";
import { TABLE_CONFIG } from "../../utils/table-config";
import { API_URL } from "../../constants/api_url";
import { STATUS } from "../../constants/status";
import ReferenceCheckModal from "./check-reference-form.modal";
import { interviewService } from "../../services/interview.service";

const HomeInterview = () => {
  const user = useSelector((state) => state?.userAuthendicated);

  const [isReload, setIsReload] = useState(false);
  const [editInterview, setEditInterview] = useState({});
  const [openFileModal, setOpenFileModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openInterviewEvaluateModal, setOpenInterviewEvaluateModal] =
    useState(false);
  const [openInterviewDetailModal, setOpenInterviewDetailModal] =
    useState(false);
  const [openReferenceCheckModal, setOpenReferenceCheckModal] = useState(false);

  const [verifyTypeModal, setVerifyTypeModal] = useState("");

  const mapMoreButtonEventName = {
    firstRoundEvaluate: {
      handleAction: () => setOpenInterviewEvaluateModal(true),
    },
    secondRoundEvaluate: {
      handleAction: () => setOpenInterviewEvaluateModal(true),
    },
    setSecondRoundInterview: {
      handleAction: () => setOpenScheduleModal(true),
    },
    referenceCheck: {
      handleAction: () => setOpenReferenceCheckModal(true),
    },
    finalInterviewSchedule: {
      handleAction: () => setOpenScheduleModal(true),
    },
    // "printInterviewForm": {
    //     handleAction: () => window.print()
    // },
    // "finalSecondRoundSchedule": {
    //     handleAction: () => setOpenScheduleModal(true)
    // }
  };

  return (
    <>
      {/* 
                properties::
                asyncUrl: 'request data url' 
                headers: 'Table header display in table'
                bannerText: 'Table title'
                searchPlaceHolder: 'Search input place holder'
                ordinal: 'Ordering data in table asc or desc'
                setOrdinalBy: 'Field use to ordering data in table'
                isReloadData: 'Listen table reload'
                useTableActions: 'Enable button actions in table'
                onHandleAddNewEvent: 'Listen button add new event'
                customActions: 'Custom button event in table'
            */}
      <AsyncDatatable
        asyncURL={API_URL.interview.get}
        headers={TABLE_CONFIG.tblInterview}
        bannerText="All Interviews"
        searchPlaceHolder="Search"
        ordinal="asc"
        setOrdinalBy="id"
        isReloadData={isReload ? true : false}
        useTableActions={{
          search: true,
          refresh: true,
          view: true,
          viewFile: [
            {
              field: "interviewResult",
              values: [
                STATUS.INTERVIEW_RESULT.PASSED,
                STATUS.INTERVIEW_RESULT.FAILED,
                STATUS.INTERVIEW_RESULT.KEEP_IN_REVIEW,
              ],
            },
          ],
          moreOption: {
            buttons: [
              {
                name: "Confirm Interview Schedule",
                eventName: "finalInterviewSchedule",
                icon: <CalendarMonth />,
                hidden: !user?.roles
                  ? true
                  : user?.roles?.includes(ROLE.ROLE_TA_TEAM)
                  ? false
                  : true,
                enable: true,
              },
              {
                name: "Evaluate 1st Interview",
                eventName: "firstRoundEvaluate",
                icon: <UploadFileIcon />,
                hidden: !user?.roles
                  ? true
                  : [ROLE.ROLE_HIRING_MANAGER].some((role) =>
                      user?.roles.includes(role)
                    )
                  ? false
                  : true,
                enable: [
                  {
                    field: "interviewProcess",
                    values: [STATUS.INTERVIEW_PROCESS.FIRST_INTERVIEW],
                  },
                ],
              },
              {
                name: "Invite 2nd Interview",
                eventName: "setSecondRoundInterview",
                icon: <CalendarMonth />,
                hidden: !user?.roles
                  ? true
                  : [ROLE.ROLE_HIRING_MANAGER].some((role) =>
                      user?.roles.includes(role)
                    )
                  ? false
                  : true,
                enable: [
                  {
                    field: "interviewProcess",
                    values: [STATUS.INTERVIEW_PROCESS.FIRST_INTERVIEW],
                  },
                  {
                    field: "status",
                    values: [STATUS.INTERVIEW_STATUS.EVALUATED],
                  },
                  {
                    field: "interviewResult",
                    values: [STATUS.INTERVIEW_RESULT.PASSED],
                  },
                ],
              },
              {
                name: "Evaluate 2nd Interview",
                eventName: "secondRoundEvaluate",
                icon: <UploadFileIcon />,
                hidden: !user?.roles
                  ? true
                  : [ROLE.ROLE_HIRING_MANAGER].some((role) =>
                      user?.roles?.includes(role)
                    )
                  ? false
                  : true,
                enable: [
                  {
                    field: "interviewProcess",
                    values: [STATUS.INTERVIEW_PROCESS.SECOND_INTERVIEW],
                  },
                ],
              },
              {
                name: "Reference Check",
                eventName: "referenceCheck",
                icon: <HowToRegIcon />,
                hidden: !user?.roles
                  ? true
                  : [ROLE.ROLE_HIRING_MANAGER].some((role) =>
                      user?.roles?.includes(role)
                    )
                  ? false
                  : true,
                enable: [
                  {
                    field: "interviewResult",
                    values: [STATUS.INTERVIEW_RESULT.PASSED],
                  },
                ],
              },
            ],
          },
        }}
        onHandleRefreshEvent={() => setIsReload(!isReload)}
        handleMoreEvent={(eName, data) => {
          if (!eName) return false;

          setEditInterview(data);
          setVerifyTypeModal(eName);
          mapMoreButtonEventName[eName].handleAction();
        }}
        handleLinkEvent={(data) => {
          setVerifyTypeModal("viewCV");
          setEditInterview(data);
          setOpenFileModal(true);
        }}
        handleViewFileEvent={(data) => {
          setVerifyTypeModal("viewEvaluateForm");
          setEditInterview(data);
          setOpenFileModal(true);
        }}
        handleViewEvent={(data) => {
          setEditInterview(data);
          setOpenInterviewDetailModal(true);
        }}
      />

      {/* Second interview schedule modal */}
      {openScheduleModal && (
        <CandidateScheduleFormModal
          eventType={verifyTypeModal}
          apiService={interviewService.confirmScheduleInterview}
          editData={editInterview}
          open={openScheduleModal}
          onCloseModal={() => setOpenScheduleModal(false)}
          handleEventSuccessed={() => setIsReload(!isReload)}
        />
      )}
      {/* Inter view result modal */}
      {openInterviewEvaluateModal && (
        <InterViewEvaluateFormModal
          eventType={verifyTypeModal}
          interview={editInterview}
          open={openInterviewEvaluateModal}
          onCloseModal={() => setOpenInterviewEvaluateModal(false)}
          handleEventSuccessed={() => setIsReload(!isReload)}
        />
      )}

      {/* Review candidate form */}
      {openFileModal && (
        <ViewFileModal
          modalTitle={
            verifyTypeModal === "viewCV" ? "Review CV" : "Review Evaluate Form"
          }
          id={
            verifyTypeModal === "viewCV"
              ? editInterview?.candidate?.id
              : editInterview?.id
          }
          downloadFileUrl={
            verifyTypeModal === "viewCV"
              ? null
              : API_URL.interview.downloadEvaluateForm
          }
          openModal={openFileModal}
          onCloseModal={() => setOpenFileModal(false)}
        />
      )}

      {/* View detail */}
      {openInterviewDetailModal && (
        <InterviewFormDetailModal
          interview={editInterview}
          openCandidateModal={openInterviewDetailModal}
          onCloseCandidateModal={() => setOpenInterviewDetailModal(false)}
        />
      )}

      {/* Reference check modal */}
      {openReferenceCheckModal && (
        <ReferenceCheckModal
          interview={editInterview}
          openReferenceCheckModal={openReferenceCheckModal}
          onCloseReferenceCheckModal={() => setOpenReferenceCheckModal(false)}
          handleEventSuccessed={() => setIsReload(!isReload)}
        />
      )}
    </>
  );
};

export default HomeInterview;

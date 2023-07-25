import React, { useState } from "react";


import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import CandidateReviewCVModal from "../../components/CV/view-cv.modal";
import InterViewResultFormModal from "./interview-result-form.modal";
import CandidateScheduleFormModal from "./schedule-candidate-form.modal";

import GradingIcon from '@mui/icons-material/Grading';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { CalendarMonth } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/roles";
import { TABLE_CONFIG } from "../../utils/table-config";
import { API_URL } from "../../constants/api_url";

const HomeInterview = () => {

    const user = useSelector((state) => state?.userAuthendicated);

    const [isReload, setIsReload] = useState(false);
    const [editCandidate, setEditCandidate] = useState({});
    const [openReviewCVModal, setOpenReviewCVModal] = useState(false);
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const [openInterviewResultModal, setOpenInterviewResultModal] = useState(false);
    const [verifyTypeModal, setVerifyTypeModal] = useState('');

    const mapMoreButtonEventName = {
        "printInterviewForm": {
            handleAction: () => window.print()
        },
        "firstRoundEvaluate": {
            handleAction: () => setOpenInterviewResultModal(true)
        },
        "secondRoundEvaluate": {
            handleAction: () => setOpenInterviewResultModal(true)
        },
        "setSecondRoundInterview": {
            handleAction: () => setOpenScheduleModal(true)
        },
        "finalSecondRoundSchedule": {
            handleAction: () => setOpenScheduleModal(true)
        }
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
                    moreOption: {
                        buttons: [
                            {
                                name: 'Attach 1st Evaluate Form',
                                eventName: 'attachFirstEvalForm',
                                icon: <AttachFileIcon />,
                                hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER) ? false : true,
                                enable: true
                            },
                            {
                                name: 'Evaluate 1st Interview',
                                eventName: 'firstRoundEvaluate',
                                icon: <GradingIcon color="info" />,
                                hidden: !user?.roles ? true : [ROLE.ROLE_HIRING_MANAGER].some((role) => user?.roles.includes(role)) ? false : true,
                                enable: true
                            },
                            {
                                name: 'Invite 2nd Interview',
                                eventName: 'setSecondRoundInterview',
                                icon: <CalendarMonth />,
                                hidden: !user?.roles ? true : [ROLE.ROLE_HIRING_MANAGER].some((role) => user?.roles.includes(role)) ? false : true,
                                enable: true
                            },
                            {
                                name: 'Attach 2nd Evaluate Form',
                                eventName: 'attachSecondEvalForm',
                                icon: <AttachFileIcon />,
                                hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER) ? false : true,
                                enable: true
                            },
                            {
                                name: 'Evaluate 2nd Interview',
                                eventName: 'secondRoundEvaluate',
                                icon: <GradingIcon color="info" />,
                                hidden: !user?.roles ? true : [ROLE.ROLE_HIRING_MANAGER].some((role) => user?.roles.includes(role)) ? false : true,
                                enable: true
                            },
                            // {
                            //     name: 'Print Form',
                            //     eventName: 'printInterviewForm',
                            //     icon: <Print />,
                            //     hidden: false,
                            //     enable: true
                            // },
                            // {
                            //     name: 'Final Second Round Schedule',
                            //     eventName: 'finalSecondRoundSchedule',
                            //     icon: <CalendarMonth />,
                            //     hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_TA_TEAM) ? false : true,
                            //     enable: true
                            // }
                        ]
                    }
                }}
                handleMoreEvent={(eName, data) => {
                    if (!eName)
                        return false;

                    setEditCandidate(data);
                    setVerifyTypeModal(eName);
                    mapMoreButtonEventName[eName].handleAction();
                }}

                handleLinkEvent={(data) => {
                    setEditCandidate(data);
                    setOpenReviewCVModal(true);
                }}
            />

            {/* Second interview schedule modal */}
            <CandidateScheduleFormModal
                eventType={verifyTypeModal}
                candidate={editCandidate}
                open={openScheduleModal}
                onCloseModal={() => setOpenScheduleModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Inter view result modal */}
            <InterViewResultFormModal
                eventType={verifyTypeModal}
                candidate={editCandidate}
                open={openInterviewResultModal}
                onCloseModal={() => setOpenInterviewResultModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Review candidate form */}
            <CandidateReviewCVModal
                modalTitle="Review CV"
                id={editCandidate?.candidateId}
                openReviewCVModal={openReviewCVModal}
                onCloseReviewCVModal={() => setOpenReviewCVModal(false)}
            />

            {/* Update Candidate Result */}
            {/* <CandidateResultFormModal
                openResultCandidateModal={openResultModal}
                onCloseResultCandidateModal={() => setOpenResultModal(false)}
                candidate={editCandidate}
                handleEventSuccessed={() => setIsReload(!isReload)}
            /> */}

            {/* /**Make accessment modal */}
            {/* <CandidateAssessmentFormModal
                openAssessmentCandidateModal={openAssessmentModal}
                onCloseAssessmentCandidateModal={() => setOpenAssessmentModal(false)}
                interview={editCandidate}
                handleEventSuccessed={() => setIsReload(!isReload)}
            /> */}


            {/* Edit candidate result and status */}
            {/* <CandidateStatusFormModal
                title={modalStatusTitle}
                open={openModalStatus}
                onCloseModal={() => setOpenModalStatus(false)}
            /> */}

        </>
    )
};

export default HomeInterview;
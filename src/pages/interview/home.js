import React, { useState } from "react";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";
import InterViewEvaluateFormModal from "./interview-evaluate-form.modal";
import CandidateScheduleFormModal from "../../components/Modal/schedule-candidate-form.modal";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileOpenIcon from '@mui/icons-material/FileOpen';

import { CalendarMonth } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/roles";
import { TABLE_CONFIG } from "../../utils/table-config";
import { API_URL } from "../../constants/api_url";
import { CandidateService } from "../../services/candidate.service";
import { STATUS } from "../../constants/status";

const HomeInterview = () => {

    const user = useSelector((state) => state?.userAuthendicated);

    const [isReload, setIsReload] = useState(false);
    const [editCandidate, setEditCandidate] = useState({});
    const [openFileModal, setOpenFileModal] = useState(false);
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const [openInterviewResultModal, setOpenInterviewResultModal] = useState(false);
    const [verifyTypeModal, setVerifyTypeModal] = useState('');

    const mapMoreButtonEventName = {
        "firstRoundEvaluate": {
            handleAction: () => setOpenInterviewResultModal(true)
        },
        "secondRoundEvaluate": {
            handleAction: () => setOpenInterviewResultModal(true)
        },
        "setSecondRoundInterview": {
            handleAction: () => setOpenScheduleModal(true)
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
                    view: true,
                    viewFile: [
                        {
                            field: 'interviewResult',
                            values: [
                                STATUS.INTERVIEW_RESULT.PASSED,
                                STATUS.INTERVIEW_RESULT.FAILED,
                                STATUS.INTERVIEW_RESULT.KEEP_IN_REVIEW
                            ]
                        }
                    ],
                    moreOption: {
                        buttons: [
                            {
                                name: 'Evaluate 1st Interview',
                                eventName: 'firstRoundEvaluate',
                                icon: <UploadFileIcon />,
                                hidden: !user?.roles ? true : [ROLE.ROLE_HIRING_MANAGER].some((role) => user?.roles.includes(role)) ? false : true,
                                enable: [
                                    {
                                        field: 'interviewProcess',
                                        values: [STATUS.INTERVIEW_PROCESS.FIRST_INTERVIEW]
                                    }
                                ]
                            },
                            {
                                name: 'Invite 2nd Interview',
                                eventName: 'setSecondRoundInterview',
                                icon: <CalendarMonth />,
                                hidden: !user?.roles ? true : [ROLE.ROLE_HIRING_MANAGER].some((role) => user?.roles.includes(role)) ? false : true,
                                enable: [
                                    {
                                        field: 'interviewProcess',
                                        values: [STATUS.INTERVIEW_PROCESS.FIRST_INTERVIEW]
                                    },
                                    {
                                        field: 'status',
                                        values: [STATUS.INTERVIEW_STATUS.INVITED]
                                    }
                                ]
                            },
                            {
                                name: 'Evaluate 2nd Interview',
                                eventName: 'secondRoundEvaluate',
                                icon: <UploadFileIcon />,
                                hidden: !user?.roles ? true : [ROLE.ROLE_HIRING_MANAGER].some((role) => user?.roles?.includes(role)) ? false : true,
                                enable: [
                                    {
                                        field: 'interviewProcess',
                                        values: [STATUS.INTERVIEW_PROCESS.SECOND_INTERVIEW]
                                    }
                                ]
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
                    setVerifyTypeModal('viewCV')
                    setEditCandidate(data);
                    setOpenFileModal(true);
                }}

                handleViewFileEvent={(data) => {
                    setVerifyTypeModal('viewEvaluateForm')
                    setEditCandidate(data);
                    setOpenFileModal(true)
                }}
            />

            {/* Second interview schedule modal */}
            <CandidateScheduleFormModal
                eventType={verifyTypeModal}
                apiService={CandidateService.inviteSecondInterview}
                candidate={editCandidate}
                open={openScheduleModal}
                onCloseModal={() => setOpenScheduleModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Inter view result modal */}
            <InterViewEvaluateFormModal
                eventType={verifyTypeModal}
                interview={editCandidate}
                open={openInterviewResultModal}
                onCloseModal={() => setOpenInterviewResultModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Review candidate form */}
            <ViewFileModal
                modalTitle={verifyTypeModal === 'viewCV' ? "Review CV" : "Review Evaluate Form"}
                id={verifyTypeModal === 'viewCV' ? editCandidate?.candidate?.id : editCandidate?.id}
                downloadFileUrl={API_URL.interview.downloadEvaluateForm}
                openModal={openFileModal}
                onCloseModal={() => setOpenFileModal(false)}
            />
        </>
    )
};

export default HomeInterview;
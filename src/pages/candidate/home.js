import React, { useState } from "react";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import ViewFileModal from "../../components/Modal/view-file.modal";

import CandidateFormModal from "./upsert-candidate-form.modal";
import CandidateFormDetailModal from "./detail-candidate-form.modal";
import CandidateProcessForm from "./process-candidate-form.modal";
import CandidateScheduleFormModal from "../../components/Modal/schedule-candidate-form.modal";

import NextPlanIcon from '@mui/icons-material/NextPlan';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useSelector } from "react-redux";
import { ROLE } from "../../constants/roles";
import { STATUS } from "../../constants/status";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
// import { ContentCopy, Difference } from "@mui/icons-material";

const HomeCandidate = () => {

    const user = useSelector((state) => state?.userAuthendicated);
    const [selectedData, setSelectedData] = useState({ open: false, row: {} });
    const [isReload, setIsReload] = useState(false);

    const [editCandidate, setEditCandidate] = useState({});
    const [detailCandidate, setDetailCandidate] = useState({});

    const [openUpsertCandidateModal, setOpenUpsertCandidateModal] = useState(false);
    const [openCandidateDetailModal, setOpenCandidateDetailModal] = useState(false);
    const [openReviewCVModal, setOpenReviewCVModal] = useState(false);
    const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const [openProcessModal, setOpenProcessModal] = useState(false);

    const [verifyTypeModal, setVerifyTypeModal] = useState('');

    // Handle click each candidate to update the info
    const handleEditCandidate = (candidate) => {
        setEditCandidate(candidate);
        setOpenUpsertCandidateModal(true);
    };

    //handle review candidate before shortlist
    const handleReviewCandidate = (candidate) => {
        setEditCandidate(candidate);
        setOpenReviewCVModal(true);
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
                setSelectedData={setSelectedData}
                asyncURL={API_URL.candidate.get}
                headers={TABLE_CONFIG.tblCandidate}
                bannerText="All Candidates"
                searchPlaceHolder="Search"
                ordinal="asc"
                setOrdinalBy="id"
                isReloadData={isReload ? true : false}
                useTableActions={
                    {
                        //Actions Tool bar table
                        search: true,
                        create: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_TA_ADMIN) ? true : false,
                        refresh: true,
                        //action each table rows
                        view: true,
                        edit: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_TA_ADMIN) ? true : false,
                        delete: false,
                        moreOption: {
                            buttons: [
                                // {
                                //     name: 'Clone Info',
                                //     eventName: 'cloneInfo',
                                //     icon: <Difference />,
                                //     hidden: !user?.roles ? true : user?.roles.includes(ROLE.ROLE_TA_ADMIN) ? false : true,
                                //     enable: true
                                // },
                                {
                                    name: 'Submit to DHR',
                                    eventName: 'submitToDHR',
                                    icon: <NextPlanIcon color="info" />,
                                    hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_TA_ADMIN) ? false : true,
                                    enable: [
                                        {
                                            field: 'submitStatus',
                                            values: [STATUS.SUBMIT_STATUS.WAITING,STATUS.SUBMIT_STATUS.DHR_REJECTED]
                                        },
                                    ]
                                },
                                {
                                    name: 'Verify',
                                    eventName: 'verifyByDHR',
                                    icon: <DoneAllIcon color="info" />,
                                    hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_HR_MANAGER) ? false : true,
                                    enable: [
                                        {
                                            field: 'submitStatus',
                                            values: [STATUS.SUBMIT_STATUS.SUBMITTED_DHR, STATUS.SUBMIT_STATUS.DHR_REJECTED]
                                        }
                                    ]
                                },
                                {

                                    name: 'Reject',
                                    eventName: 'rejectByDHR',
                                    icon: <ClearIcon color="info" />,
                                    hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_HR_MANAGER) ? false : true,
                                    enable: [
                                        {
                                            field: 'submitStatus',
                                            values: [STATUS.SUBMIT_STATUS.SUBMITTED_DHR, STATUS.SUBMIT_STATUS.DHR_VERIFIED]
                                        }
                                    ]
                                },
                                {
                                    name: 'Approve',
                                    eventName: 'approveByOFFCEO',
                                    icon: <DoneAllIcon color="info" />,
                                    hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_OFCCEO_ADMIN) ? false : true,
                                    enable: [
                                        {
                                            field: 'submitStatus',
                                            values: [STATUS.SUBMIT_STATUS.DHR_VERIFIED, STATUS.SUBMIT_STATUS.OFCCEO_REJECTED]
                                        }
                                    ]
                                },
                                {
                                    name: 'Reject',
                                    eventName: 'rejectByOFFCEO',
                                    icon: <ClearIcon color="info" />,
                                    hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_OFCCEO_ADMIN) ? false : true,
                                    enable: [
                                        {
                                            field: 'submitStatus',
                                            values: [STATUS.SUBMIT_STATUS.DHR_VERIFIED, STATUS.SUBMIT_STATUS.OFCCEO_APPROVED]
                                        }
                                    ]
                                },
                                {
                                    name: 'Shortlist',
                                    eventName: 'shortlistCandidate',
                                    icon: <CheckCircleOutlineIcon color="info" />,
                                    hidden: !user?.roles ? true : [ROLE.ROLE_TA_TEAM, ROLE.ROLE_HIRING_MANAGER].some((role) => user?.roles.includes(role)) ? false : true,
                                    enable: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_TA_TEAM) ?
                                        [
                                            {
                                                field: 'submitStatus',
                                                values: [STATUS.SUBMIT_STATUS.OFCCEO_APPROVED]
                                            }
                                        ]
                                        :
                                        [
                                            {
                                                field: 'submitStatus',
                                                values: [STATUS.SUBMIT_STATUS.SUBMITTED_HOD]
                                            },
                                            {
                                                field: 'status',
                                                values: [STATUS.CANDIDATE.SHORTLISTED]
                                            }
                                        ]

                                },
                                {
                                    name: 'Invite Interview',
                                    eventName: user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER) ? 'setScheduleInterview' : 'setFinalScheduleInterview',
                                    icon: <CalendarMonthIcon />,
                                    hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_HIRING_MANAGER) ? false : true,
                                    enable: !user?.roles ? false : (user?.roles?.includes(ROLE.ROLE_TA_TEAM) ?
                                        [
                                            {
                                                field: 'status',
                                                values: [STATUS.CANDIDATE.IN_INTERVIEW]
                                            }
                                        ]
                                        :
                                        [
                                            {
                                                field: 'status',
                                                values: [STATUS.CANDIDATE.SHORTLISTED]
                                            },
                                            {
                                                field: 'shortlistResult',
                                                values: [STATUS.SHORTLIST_RESULT.PASSED]
                                            }
                                        ]
                                    ),
                                },
                                {
                                    name: 'Submit To HOD',
                                    eventName: 'submitToHOD',
                                    icon: <NextPlanIcon color="info" />,
                                    hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_TA_TEAM) ? false : true,
                                    enable: [
                                        {
                                            field: 'submitStatus',
                                            values: [STATUS.SUBMIT_STATUS.OFCCEO_APPROVED]
                                        },
                                        {
                                            field: 'shortlistResult',
                                            values: !user?.roles ? [] : [STATUS.SHORTLIST_RESULT.PASSED, STATUS.SHORTLIST_RESULT.FAILED, STATUS.SHORTLIST_RESULT.BLACKLIST, STATUS.SHORTLIST_RESULT.KEEP_IN_POOL]
                                        }
                                    ]
                                },
                            ]
                        },
                    }
                }

                onHandleAddNewEvent={() => setOpenUpsertCandidateModal(true)}
                onHandleRefreshEvent={() => setIsReload(!isReload)}

                handleViewEvent={(data) => {
                    setDetailCandidate(data);
                    setOpenCandidateDetailModal(true);
                }}
                handleEditEvent={(data) => handleEditCandidate(data)}
                handleLinkEvent={(data) => handleReviewCandidate(data)}
                handleMoreEvent={(eName, data) => {
                    if (!eName)
                        return false;

                    setEditCandidate(data);
                    setVerifyTypeModal(eName);

                    eName === 'setScheduleTest' ||
                        eName === 'setScheduleInterview' ||
                        eName === 'setFinalScheduleInterview'
                        ? setOpenScheduleModal(true) : setOpenProcessModal(true);
                }}
            />

            {/* Upsert candidate form */}
            <CandidateFormModal
                candidate={editCandidate}
                openCandidateModal={openUpsertCandidateModal}
                onCloseCandidateModal={() => {
                    setEditCandidate({});
                    setOpenUpsertCandidateModal(false)
                }}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />


            {/* View candiate detail */}
            <CandidateFormDetailModal
                candidate={detailCandidate}
                openCandidateModal={openCandidateDetailModal}
                onCloseCandidateModal={() => setOpenCandidateDetailModal(false)}
            />

            {/* Review candidate form */}
            <ViewFileModal
                modalTitle="Review CV"
                id={editCandidate?.id}
                openModal={openReviewCVModal}
                onCloseModal={() => setOpenReviewCVModal(false)}
            />

            {/* Update candidate process status */}
            <CandidateProcessForm
                eventType={verifyTypeModal}
                candidate={editCandidate}
                open={openProcessModal}
                onCloseModal={() => setOpenProcessModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Schedule candidate  */}
            <CandidateScheduleFormModal
                eventType={verifyTypeModal}
                editData={editCandidate}
                open={openScheduleModal}
                onCloseModal={() => setOpenScheduleModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

        </>
    )
};

export default HomeCandidate;
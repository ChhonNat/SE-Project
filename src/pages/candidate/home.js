import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ROLE } from "../../constants/roles";
import { STATUS } from "../../constants/status";
import { API_URL } from "../../constants/api_url";

import { TABLE_CONFIG } from "../../utils/table-config";

import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import CandidateReviewCVModal from "../../components/CV/view-cv.modal";
import CandidateStatusFormModal from "../../components/Candidate/edit-candidate-status";

import CandidateFormModal from "./upsert-candidate-form.modal";
import CandidateInviteFormModal from "./form-invite-candidate.modal";
import CandidateFormDetailModal from "./detail-candidate-form.modal";

import CandidateVerifyForm from "./verify-candidate-form.modal";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

const HomeCandidate = () => {

    const user = useSelector((state) => state?.userAuthendicated);
    const [selectedData, setSelectedData] = useState({ open: false, row: {} });
    const [isReload, setIsReload] = useState(false);

    const [editCandidate, setEditCandidate] = useState({});
    const [detailCandidate, setDetailCandidate] = useState({});

    const [modalTitle, setModalTitle] = useState('');

    const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const [openEditCandidateModal, setOpenEditCandidateModal] = useState(false);
    const [openCandidateDetailModal, setOpenCandidateDetailModal] = useState(false);
    const [openApproveCandidateModal, setOpenApproveCandidateModal] = useState(false);
    const [openReviewCVModal, setOpenReviewCVModal] = useState(false);
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [openVerifyModal, setOpenVerifyModal] = useState(false);
    const [verifyTypeModal, setVerifyTypeModal] = useState('');


    const mapMoreButtonEventName = {
        "submitToDHR": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "verifyByDHR": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "rejectByDHR": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "approveByOFFCEO": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "rejectByOFFCEO": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "submitToTA": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "submitToHOD": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "shortlistCandidate": {
            handleAction: () => setOpenVerifyModal(true)
        }
    };

    // Handle click each candidate to update the info
    const handleEditCandidate = (candidate) => {
        setEditCandidate(candidate);
        setOpenEditCandidateModal(true);
    };

    // handle click each candidate to update shortlist
    const handleShortlistCandidate = (candidate) => {

        setEditCandidate(candidate);
        setOpenApproveCandidateModal(true);
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

                        //action each table rows
                        view: true,
                        edit: !user?.roles ? false : user?.roles?.includes(ROLE.ROLE_TA_ADMIN) ? true : false,
                        delete: false,
                        moreOption: {
                            buttons: [
                                {
                                    name: 'Submit to DHR',
                                    eventName: 'submitToDHR',
                                    icon: <NextPlanIcon color="info" />,
                                    hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_TA_ADMIN) ? false : true,
                                    enable: [
                                        {
                                            field: 'submitStatus',
                                            values: [STATUS.SUBMIT_STATUS.WAITING]
                                        },
                                        // {
                                        //     field: 'status',
                                        //     values: [STATUS.CANDIDATE.CV_REVIEWED]
                                        // }
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
                                    enable: true
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
                                        }
                                    ]
                                },

                                // {
                                //     name: 'Submit To TA',
                                //     eventName: 'submitToTA',
                                //     icon: <NextPlanIcon color="info" />,
                                //     hidden: !user?.roles ? true : user?.roles?.includes(ROLE.ROLE_OFCCEO_ADMIN) ? false : true,
                                //     enable: [
                                //         {
                                //             field: 'submitStatus',
                                //             values: [STATUS.SUBMIT_STATUS.OFFCEO_APPROVED]
                                //         }
                                //     ]
                                // },

                            ]
                        },
                    }
                }

                onHandleAddNewEvent={() => setOpenAddCandidateModal(true)}

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
                    mapMoreButtonEventName[eName].handleAction();
                }}

                handleApproveEvent={(data) => handleShortlistCandidate(data)}
                handleReviewEvent={(data) => handleEditCandidate(data)}
                handleResultEvent={(data) => {
                    setModalTitle('Edit shortlist result');
                    setOpenStatusModal(true);
                }}
                handleStatusEvent={(data) => {
                    setModalTitle('Edit status');
                    setOpenStatusModal(true);
                }}
            />

            {/* Create new candidate form */}
            <CandidateFormModal
                modalTitle="New Candidate"
                openCandidateModal={openAddCandidateModal}
                onCloseCandidateModal={() => {
                    setEditCandidate({});
                    setOpenAddCandidateModal(false)
                }}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Edit candidate form */}
            <CandidateFormModal
                modalTitle="Edit Candidate"
                candidate={editCandidate}
                openCandidateModal={openEditCandidateModal}
                onCloseCandidateModal={() => {
                    setEditCandidate({})
                    setOpenEditCandidateModal(false)
                }
                }
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* View candiate detail */}
            <CandidateFormDetailModal
                candidate={detailCandidate}
                openCandidateModal={openCandidateDetailModal}
                onCloseCandidateModal={() => setOpenCandidateDetailModal(false)}
            />


            {/* Approve candidate form */}
            <CandidateInviteFormModal
                candidate={editCandidate}
                openApproveCandidateModal={openApproveCandidateModal}
                onCloseApproveCandidateModal={() => setOpenApproveCandidateModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

            {/* Review candidate form */}
            <CandidateReviewCVModal
                modalTitle="Review CV"
                id={editCandidate?.id}
                openReviewCVModal={openReviewCVModal}
                onCloseReviewCVModal={() => setOpenReviewCVModal(false)}
            />

            {/* Update candidate status */}
            <CandidateStatusFormModal
                title={modalTitle}
                candidate={editCandidate}
                open={openStatusModal}
                onCloseModal={() => setOpenStatusModal(false)}
            />

            {/* Update candidate submit */}
            <CandidateVerifyForm
                eventType={verifyTypeModal}
                candidate={editCandidate}
                open={openVerifyModal}
                onCloseModal={() => setOpenVerifyModal(false)}
                handleEventSuccessed={() => setIsReload(!isReload)}
            />

        </>
    )
};

export default HomeCandidate;
import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/api_url";
import { TABLE_CONFIG } from "../../utils/table-config";
import AsyncDatatable from "../../components/AsyncDataTable/async-data-table";
import CandidateFormModal from "./upsert-candidate-form.modal";
import CandidateInviteFormModal from "./form-invite-candidate.modal";
import CandidateReviewCVModal from "../../components/CV/view-cv.modal";
import { STATUS } from "../../constants/status";
import CandidateStatusFormModal from "../../components/Candidate/edit-candidate-status";
import CandidateFormDetailModal from "./detail-candidate-form.modal";
import { HowToRegOutlined } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import CandidateVerifyForm from "./verify-candidate-form.modal";
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import CheckIcon from '@mui/icons-material/Check';

const HomeCandidate = () => {

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
        "submitToOFFCEO": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "verifyByOFFCEO": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "submitToTA": {
            handleAction: () => setOpenVerifyModal(true)
        },
        "submitToHOD": {
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
                        create: true,

                        //action each table rows
                        view: true,
                        edit: true,
                        delete: false,
                        moreOption: {
                            buttons: [
                                {
                                    name: 'Submit To OFFCEO',
                                    eventName: 'submitToOFFCEO',
                                    icon: <SendIcon color="info" />,
                                    enable: true
                                    // visibility: [
                                    //     {
                                    //         field: 'shortlistResult',
                                    //         values: [STATUS.SHORTLIST_RESULT.PASSED]
                                    //     },
                                    //     {
                                    //         field: 'status',
                                    //         values: [STATUS.CANDIDATE.CV_REVIEWED]
                                    //     },
                                    // ],
                                },
                                {
                                    name: 'Verify By OFFCEO',
                                    eventName: 'verifyByOFFCEO',
                                    icon: <HowToRegOutlined color="success" />,
                                    enable: true
                                },
                                {
                                    name: 'Submit To TA',
                                    eventName: 'submitToTA',
                                    icon: <SendTimeExtensionIcon color="info" />,
                                    enable: true
                                },
                                {
                                    name: 'Submit To HOD',
                                    eventName: 'submitToHOD',
                                    icon: <CheckIcon />,
                                    enable: true
                                }
                            ]
                        },
                        // approveCandidate: [
                        //     {
                        //         field: 'shortlistResult',
                        //         values: [STATUS.SHORTLIST_RESULT.PASSED]
                        //     },
                        //     {
                        //         field: 'status',
                        //         values: [STATUS.CANDIDATE.CV_REVIEWED]
                        //     }
                        // ],
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
                onCloseCandidateModal={() => setOpenEditCandidateModal(false)}
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